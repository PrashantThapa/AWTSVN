var EmpDeputationReturnViewModel = function () {

    var self = this;

    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.grdEmployeeID = ko.observable();
    self.grdEmployeeName = ko.observable();
    self.grdOfficeCode = ko.observable();
    self.grdOfficeName = ko.observable();
    self.ReturnDate = ko.observable();
    self.Remarks = ko.observable();
    self.DeputationFromDate = ko.observable();

    var entryBy = $("#user").text();
    self.FromDate = ko.observable();
    self.EntryBy = ko.observable(entryBy);
    self.RStatus = ko.observable();
    self.Action = ko.observable();


    self.CheckSource = ko.observable();
    self.SubmissionNo = ko.observable();

    self.GetDeputation = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/PIS/DeputationHandler.ashx',
            data: { 'method': 'GetDeputationByID', 'empID': self.EmpID() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.ResponseData != "" && result.ResponseData != null) {
                    self.DeputationFromDate(result.ResponseData.DepoFromDate);
                }
                else {
                    msg("No deputation for this employee !!!");
                    self.DeputationFromDate('');
                }
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }


    self.SaveEmpDeputationReturn = function () {
        if (self.Validation()) {

            var office = {
                OfficeCode: self.grdOfficeCode(),
                OfficeNameNep: self.grdOfficeName()

            }

            var deputationReturn = {
                OldSubmissionNo: self.SubmissionNo(),
                EmpID: self.EmpID(),
                Office: office,
                DeputationFromDate: self.DeputationFromDate(),
                ReturnDate: self.ReturnDate(),
                Remarks: self.Remarks(),
                FromDate: "",
                ToDate: "",
                Entryby: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "A"

            }

            var url = "/Handlers/PIS/DeputationReturnHandler.ashx";
            var method = "SaveDeputationReturn";
            var appID = "PIS";
            var modID = "EMPDEPTRTN";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(deputationReturn)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }
                                        self.ClearControls();

                                    });
        }
    }


    self.GetDeputationReturnBySubmissionNo = function () {
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
                $('form').find('input, select, textarea').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/DeputationReturnHandler.ashx',
                data: { 'method': 'GetDeputationReturn', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                         msg("No data on submission number","WARNING");
                    }
                    else {
                        self.EmpID(data.ResponseData.EmpID);
                        self.EmployeeName(data.ResponseData.EmployeeName);
                        self.grdOfficeCode(data.ResponseData.Office.OfficeCode);
                        self.grdOfficeName(data.ResponseData.Office.OfficeNameNep);
                        self.grdEmployeeID(data.ResponseData.EmpID);
                        self.grdEmployeeName(data.ResponseData.EmployeeName);
                        self.ReturnDate(data.ResponseData.ReturnDate);
                        self.Remarks(data.ResponseData.Remarks);


                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }


    self.GetDeputationReturnBySubmissionNo();



    self.Validation = function () {
        self.SetNepaliValues();
        var errMsg = "";
        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name!!!<br>";
        }
        else {
            if (Validate.empty(self.DeputationFromDate())) {
                errMsg += "No deputation for this employee !!!<br>";
            }
        }
        if (Validate.empty(self.ReturnDate())) {
            errMsg += "Please fill return date!!!<br>";
        }



        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    self.SetNepaliValues = function () {
        self.Remarks($("#txtRemarks").val());
    }


    self.ClearControls = function () {
        self.grdOfficeCode('');
        self.grdOfficeName('');
        self.grdEmployeeID('');
        self.grdEmployeeName('');
        self.EmpID('');
        self.EmployeeName('');
        self.DeputationFromDate('');
        self.ReturnDate('');
        self.Remarks('');

    }

    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
        if (self.CheckSource() === "employee") {
            GEmpID = self.EmpID();
            GEmpName = self.EmployeeName();
            GOfficeCD = self.grdOfficeCode();
            GOfficeName = self.grdOfficeName();
        }
    })

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {
            var empid = self.EmpID();
            self.EmpID(GEmpID);
            self.EmployeeName(GEmpName);
            self.grdEmployeeID(GEmpID);
            self.grdEmployeeName(GEmpName);
            self.grdOfficeCode(GOfficeCD);
            self.grdOfficeName(GOfficeName);
            if (Validate.empty(self.EmpID()) || self.EmpID() == empid) {
            }
            else {
                self.GetDeputation();
            }
        }

    })

};

$(document).ready(function () {

    ValidateSession();
    var edrvm = new EmpDeputationReturnViewModel();
    ko.applyBindings(edrvm, document.getElementById('EmpDeputationReturnForm'));

});