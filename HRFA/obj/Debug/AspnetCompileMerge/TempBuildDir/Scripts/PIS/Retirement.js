

function Retirement(data) {
    var self = this;
    self.RetirmentTypeID = ko.observable(data.RetirmentTypeID);
    self.RetirmentTypeName = ko.observable(data.RetirmentTypeName);
    self.RetirmentTypeEnglish = ko.observable(data.RetirmentTypeEnglish);      
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Action = ko.observable(data.Action);
}
function RetirementType(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.RetirementType = ko.observable(data.RetirementType);
    self.RetirementDate = ko.observable(data.RetirementDate);
    self.Remarks = ko.observable(data.Remarks);
    self.RStatus = ko.observable(data.RStatus);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
}
function RetirementViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.PostName = ko.observable();
    self.RetirementType = ko.observable();
    self.RetirementDate = ko.observable();
    self.Remarks = ko.observable();
    self.RStatus = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CheckEmp = ko.observable();
    self.GridEmpName = ko.observable();
    self.SelectedRetirement = ko.observable();
    self.RetirementTypes = ko.observable([]);

    self.GetRetirementType = function () {
        $.ajax({
            dataType: "json",
            url: '../../Handlers/PIS/RetirementHandler.ashx',
            data: { 'method': 'GetRetirementType', 'RetirementTypeId': '' },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    return new Retirement(item)
                });
                self.RetirementTypes(mappedTasks);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText);
            }
        });

    }

    self.SetNepaliValues = function () {
        self.Remarks($("#txtRemarks").val());
    }

    self.ValidateRetirementPost = function () {

        if (self.SubmissionNo() != undefined || self.SubmissionNo() != "") {
            return true;
        }
        var errMsg = "";

        if (Validate.empty(self.EmpID())) {
            errMsg += "Please select employee!!!\n";
        }

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.GetRetirementBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }
        else {
            if (editable == 'Y') {

            }
            else {
                $('#lblOffice').hide();
                $('#divDdlOffice').hide();
                $('#lblEmpName').hide();
                $('#divTxtEmpName').hide();
                $('button').hide();
                $('form').find('input, select, textarea').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/RetirementHandler.ashx',
                data: { 'method': 'GetRetirement', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("Submission number is not valid !!!");
                    }
                    else {
                        self.EmpID(data.ResponseData[0].EmpID);
                        self.RetirementDate(data.ResponseData[0].RetirementDate);

                        self.SelectedRetirement(data.ResponseData[0].RetirementType);
                        self.EmployeeName(data.ResponseData[0].EmployeeName);
                        self.ShowCurrentPost();
                        self.Remarks(data.ResponseData[0].Remarks);

                       

                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }
 
    self.ShowCurrentPost = function () {
        self.SetNepaliValues();
        if (self.ValidateRetirementPost()) {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/PIS/PromotionHandler.ashx',
                data: { 'method': 'GetOfficeEmpPost', 'empID': self.EmpID() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = result.ResponseData[0];
                    self.OfficeNameNep(data.Office.OfficeNameNep);
                    self.GridEmpName(self.EmployeeName());
                    self.PostName(data.Post.PostDesc);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.SaveRetirement = function () {
        self.SetNepaliValues();
        if (self.ValidateRetirementSave()) {
            var retirement = {
                OldSubmissionNo: self.SubmissionNo(),
                    EmpID: self.EmpID(),
                    RetirementDate: self.RetirementDate(),
                    RetirementType: self.SelectedRetirement(),
                    FromDate: null,
                    ToDate: null,
                    RStatus: "F",
                    EntryBy: $("#user").text(),
                    EntryDate: null,
                    Remarks: self.Remarks(),
                    Action: 'A'
                }
                var appID = "PIS";
                var modID = "EMPRTM";

            var url = "../../../Handlers/PIS/RetirementHandler.ashx";
            var data = { 'method': 'SaveRetirement', 'args': JSON.stringify(ko.toJS(retirement)), 'appID': appID, 'modID': modID };
            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
                msg(obj.Message);

                    self.ClearControl();


            });
        }
    }

    self.CancelRetirement = function () {
        self.SetNepaliValues();
        self.ClearControl();
    }
    self.GetRetirementType();
    self.GetRetirementBySubmissionNo();
 
    self.ValidateRetirementSave = function () {
        var errMsg = "";

        if (Validate.empty(self.EmpID())) {
            errMsg += "Please select employee!!!\n";
        }
        if (Validate.empty(self.RetirementDate())) {
            errMsg += "Please fill Retirement date!!!\n";
        }
        if (Validate.empty(self.SelectedRetirement())) {
            errMsg += "Please select retirement type!!!\n";
        }

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.ClearControl = function () {
        self.SelectedRetirement("");
        self.RetirementDate("");
        self.Remarks("");
        self.EmpID("");
        self.EmployeeName("");
        self.OfficeNameNep("");
        self.GridEmpName("");
        self.PostName("");
    }

    $('#modalEmpSearch').on('hidden.bs.modal', function () {
        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);
        self.OfficeCode(GOfficeCD);
        self.OfficeNameNep(GOfficeName);
        self.GridEmpName(GEmpName);
        self.PostName(GPostDesc);
    })
}

$(document).ready(function () {
    ValidateSession();
    var retirementViewModel = new RetirementViewModel();
    ko.applyBindings(retirementViewModel, document.getElementById("RetirementForm"));
})