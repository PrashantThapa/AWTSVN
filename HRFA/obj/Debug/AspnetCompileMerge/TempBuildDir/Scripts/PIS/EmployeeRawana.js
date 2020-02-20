function Type(data) {
    var self = this;

    self.ID = ko.observable(data.ID);
    self.Desc = ko.observable(data.Desc);


};


var EmployeeTransferViewModel = function () {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.ID = ko.observable();
    self.Desc = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable();
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.RawanaDate = ko.observable();
    self.SubmissionNo = ko.observable();
    self.DecisionDate = ko.observable();
    self.Reason = ko.observable();
    self.Types = ko.observable([
    { ID: 'APP', Desc: 'Appointemnt' },
    { ID: 'TRAN', Desc: 'Transfer' },
     { ID: 'DEPU', Desc: 'Deputation' }
    ]);
    self.isDisabled = ko.observable(true);
    self.SelectedType = ko.observable([]);


    self.GetEntity = function () {

        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() != "" && self.SubmissionNo() != undefined && self.SubmissionNo() != null) {
            
            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');
                $('#edit').css("display", "none");
                $('#delete').css("display", "none");
                $('#toggle').css("display", "none");
                $('button').hide();
            }
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PIS/EmployeeRawanaHandler.ashx',
                data: { 'method': 'GetRawanaBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                   
                   

                    self.SubmissionNo(result.ResponseData[0].SubmissionNo);
                    self.EmpID(result.ResponseData[0].EmpID);
                    self.EmployeeName(result.ResponseData[0].EmployeeName);
                    self.DecisionDate(result.ResponseData[0].DecisionDate);
                    self.SelectedType(result.ResponseData[0].RawanaType);
                    self.Reason(result.ResponseData[0].Reason);
                    self.RawanaDate(result.ResponseData[0].RawanaDate);

                    self.ToDate(result.ResponseData[0].ToDate);
                    self.Status(result.ResponseData[0].Status);
                    self.EntryBy(result.ResponseData[0].EntryBy);
                    self.EntryDate(result.ResponseData[0].EntryDate);


                    $("#loader").hide();

                },
                error: function (err) {
                    $('button').hide();                    
                    msg("Oops! error occured while obtaining data...","WARNING");

                }
            });
        }
    }
    self.GetEntity();



    self.SaveRawana = function () {
        if (self.Validation()) {

            var args = {

                EmpID: self.EmpID(),
                DecisionDate: self.DecisionDate(),
                Reason: $('#txtReason').val(),
                RawanaDate: self.RawanaDate(),
                RawanaType: self.SelectedType(),
                ToDate: self.ToDate(),
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Status: "F",
                Action: "A",
                OldSubmissionNo:self.SubmissionNo()
            };


            var url = "/Handlers/PIS/EmployeeRawanaHandler.ashx";
            var method = "SaveEmployeeRawana";
            var appID = "PIS";
            var modID = "EMPRWN";
            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(args)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
											msg(obj.Message, "SUCCESS");  
                                        }
                                        else {
                                            msg("Oops! error occured while saving data...","WARNING");
                                        }
                                        self.ClearControls();

                                    });
        }
    }

    self.Validation = function () {
        var errMsg = "";



        if (Validate.empty(self.EmpID())) {
            errMsg += "Please fill employee name!!!<br>";
        }
        if (self.SelectedType() == undefined) {
            errMsg += "Please select type!!!<br>";
        }
        if (Validate.empty(self.DecisionDate())) {
            errMsg += "Please fill decision date!!!<br>";
        }
        if (Validate.empty(self.RawanaDate())) {
            errMsg += "Please fill rawana date!!!<br>";
        }


        if (errMsg !== "") {
              msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    self.ClearControls = function () {
        self.DecisionDate('');
        self.RawanaDate('');
        self.Reason('');
        self.EmpID('');
        self.EmployeeName('');
        self.SelectedType('');



    }

    $('#modalEmpSearch').on('hidden.bs.modal', function () {
        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);


    });
};



$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new EmployeeTransferViewModel(), document.getElementById("EmployeeRawana"));
});