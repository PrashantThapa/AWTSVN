
function Office(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
}

function Post(data) {
    var self = this;
    self.PostID = ko.observable(data.PostID);
    self.PostDesc = ko.observable(data.PostDesc);
}

function Employee(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.EmployeeName = ko.observable(data.EmployeeName);
}

function Deputation(data) {
    var self = this;
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.EmpID = ko.observable(data.EmpID);
    self.EmpName = ko.observable(data.EmpName);
//    self.DeputationOffice = ko.observable(data.DeputationOffice);
    self.DepoFromDate = ko.observable(data.DepoFromDate);
    self.DepoToDate = ko.observable(data.DepoToDate);
    self.Responsibilities = ko.observable(data.Responsibilities);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.RStatus = ko.observable(data.RStatus);
    self.Action = ko.observable(data.Action);

    self.OldSubmissionNo = ko.observable(data.OldSubmissionNo);

}

function DeputationViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmpName = ko.observable();
 //   self.DeputationOffice = ko.observable();
    self.DepoFromDate = ko.observable();
    self.DepoToDate = ko.observable();
    self.Responsibilities = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.RStatus = ko.observable();
    self.Action = ko.observable();

    self.EmployeeName = ko.observable();

    self.grdOfficeCode = ko.observable();
    self.grdEmployeeID = ko.observable();
    self.grdPostID = ko.observable();

    self.grdOfficeName = ko.observable();
    self.grdEmployeeName = ko.observable();
    self.grdPostDesc = ko.observable();

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();

    self.UnitID = ko.observable();
    self.UnitName = ko.observable();

    self.Days = ko.observable();

    self.OldSubmissionNo = ko.observable();


    self.Validation = function () {
        var errMsg = "";


//        if (Validate.empty(self.EmpID())) {
//            errMsg += "कृपया कर्मचारी आईडी भर्नुहोस्!\n";
//        }

        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name!!!\n";
        }
        if (Validate.empty(self.DepoFromDate())) {
            errMsg += "Please fill effective date!!!\n";
        }

        if (Validate.empty(self.Responsibilities())) {
            errMsg += "Please fill Responsibilities!!!\n";
        }
        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    // Save Deputation
    self.SaveDeputation = function () {
        //        
        self.SetNepali();
        console.log(self.OfficeCode());
        if (self.Validation()) {
            var DeputationOffice = { OfficeCode: self.OfficeCode() };
            var row = {

                OldSubmissionNo: self.SubmissionNo(),

                EmpID: self.EmpID(),

                Office: DeputationOffice,

                DepoFromDate: self.DepoFromDate(),
                DepoToDate: self.DepoToDate(),
                Responsibilities: self.Responsibilities(),

                EntryBy: $("#user").text(),
                EntryDate: null,
                RStatus: "F",
                Action: "A"
            };

            var url = "/Handlers/PIS/DeputationHandler.ashx";
            var method = "SaveDeputation";
            var appID = "PIS";
            var modID = "EMPDEPT";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(row)), 'appID': appID, 'modID': modID };

            $.post(url, data,
                                function (result) {
                                    var obj = jQuery.parseJSON(result);
                                    if (obj.IsSucess) {
                                        msg(obj.Message);
                                        self.ClearControl();
                                    }


                                    else {
                                        msg(obj.Message, "WARNING");
                                    }
                                });
        }
    }
    self.GetDeputationBySubNo = function () {

        
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));

        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }
        else {
            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');

                $("#loader").hide();
                
            }

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PIS/DeputationHandler.ashx',
                data: { 'method': 'GetDeputationBySubNo', 'SubmissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (result) {

                    if (result.ResponseData.length > 0) {

                        self.EmpID(result.ResponseData[0].EmpID);
                        self.EmployeeName(result.ResponseData[0].EmpName);

                        self.OfficeCode(result.ResponseData[0].Office.OfficeCode);

                        self.grdOfficeCode(result.ResponseData[0].Office.OfficeCode);
                        self.grdOfficeName(result.ResponseData[0].Office.OfficeNameNep);

                        self.grdEmployeeID(result.ResponseData[0].EmpID);
                        self.grdEmployeeName(result.ResponseData[0].EmpName);
                        console.log(self.grdEmployeeName());
                       
                        self.grdPostID(result.ResponseData[0].Post.PostID);
                        self.grdPostDesc(result.ResponseData[0].Post.PostDesc);

                        self.DepoFromDate(result.ResponseData[0].DepoFromDate);
                        self.DepoToDate(result.ResponseData[0].DepoToDate);
                        self.Responsibilities(result.ResponseData[0].Responsibilities);

                    }
                    else {
						msg("No valid submission number !");
                    }

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GetDeputationBySubNo();

    // Date Validation

    self.GetDateDifference = function (date1, date2) {
        if (date1 != undefined && date2 != undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
                data: { 'method': 'GetDaysDifference', 'date1': date2, 'date2': date1 },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var days = result.ResponseData;
                    self.Days(days);

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.ValidateToDate = function () {


        if (self.DepoFromDate() == "" || self.DepoFromDate() === undefined) {

            msg("Please fill effective date!!!<br>", "FAILURE");
            // self.ApproveDate('');
        }
        if (self.DepoToDate() == "" || self.DepoToDate() === undefined) {
            msg("Please fill last effective date!!!<br>", "FAILURE");
            // self.CancellationToDate('');
        }

        if (!Validate.empty(self.DepoToDate()) && !Validate.empty(self.DepoFromDate())) {

            self.GetDateDifference( self.DepoFromDate(), self.DepoToDate());
            console.log(self.Days());

            if (self.Days() < 0) {
                msg("effective date should be greater or equals  to last effective date!!!");
                self.DepoToDate('');
                self.Days('');
            }
        }
    }


    // For Nepali Typing 
    self.SetNepali = function () {
        self.Responsibilities($("#txtArea").val());
    }



    self.ClearControl = function () {
        self.DepoFromDate("");
        self.DepoToDate("");
        self.Responsibilities("");

        self.EmpID("");
        self.EmployeeName("");
        self.grdOfficeName("");
        self.grdEmployeeName("");
        self.grdPostDesc("");

    };

    self.CancelDeputation = function () {
       self.ClearControl();
    }



    $('#modalEmpSearch').on('hidden.bs.modal', function () {

        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);
        self.OfficeCode(GOfficeCD);
        self.grdEmployeeName(GEmpName);
        self.grdOfficeName(GOfficeName);
        self.grdPostDesc(GPostDesc);
    })
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new DeputationViewModel(), document.getElementById('DeputationForm'));

})

