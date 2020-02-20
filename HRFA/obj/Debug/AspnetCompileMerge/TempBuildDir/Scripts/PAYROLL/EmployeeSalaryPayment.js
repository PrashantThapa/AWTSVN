
var Office = function (data) {
    if (data != undefined) {
        var self = this;
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
        self.CostCenterNameEng = ko.observable(data.CostCenterNameEng);

        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Action = ko.observable(data.Action);
    }
}


var Bank = function (data) {
    if (data != undefined) {
        var self = this;
        self.BankID = ko.observable(data.BankID);
        self.BankName = ko.observable(data.BankName);
    }
}

var BankAccount = function (data) {
    if (data != undefined) {
        var self = this;
        self.AccountNo = ko.observable(data.AccountNo);
        self.AccCode = ko.observable(data.AccCode);
    }
}

self.EmpPayableAmount = function (data) {
    if (data != undefined) {
        var self = this;
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.SalaryYear = ko.observable(data.SalaryYear);
        self.SalaryMonth = ko.observable(data.SalaryMonth);
        self.EmpID = ko.observable(data.EmpID);
        self.EmployeeName = ko.observable(data.EmployeeName);
        self.PayableAmount = ko.observable(data.PayableAmount);
    }
}

self.PrintEmpPayableAmount = function () {
        //if (self.VerifyValidation()) {
        var OfficeCD = ko.toJS(self.SelectedOffice()).OfficeCode;
        if (self.SelectedCostCenter() != null) {
            var CostCenter = ko.toJS(self.SelectedCostCenter()).CostCenterID;
        }
        var data = {
            OfficeCode: OfficeCD,
            CostCenterID: CostCenter,
            Year: self.Year(),
            Month: self.SelectedMonth()
        }
        var hght = screen.height;
        var left = (screen.width / 2) - (900 / 2);
        var url = "../../../Reporting/PAYROLL/ReportHandlers/EmployeeSalaryPaymentHandler.ashx";
        var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
        OpenWindowWithPost(url, winOption, "NewFile", data);
        //}
    }

    self.ToggleBankAccount = function () {
        self.SelectedBank('');
        self.SelectedAccount('');
        if (self.PaymentType() == 'C') {
            $("#divBankAccount").hide();
            $("#ddlBankAccount").attr('disabled', true);
        }
        else if (self.PaymentType() == 'B') {
            $("#divBankAccount").show();

        }
    }

var EmpSalaryPaymentViewModel = function () {
    var self = this;
    self.Year = ko.observable();
    self.SelectedMonth = ko.observable();
    self.SelectedOffice = ko.observable();
    self.SelectedCostCenter = ko.observable();

    self.PaymentType = ko.observable();
    self.PayableDate = ko.observable();
    self.SelectedBank = ko.observable();
    self.SelectedAccount = ko.observable();
    self.TotalPayableAmount = ko.observable();
    self.PayableAmount = ko.observable();
    self.EmpID = ko.observable();

    self.Offices = ko.observableArray([]);
    self.EmpPayableAmounts = ko.observableArray([]);
    self.Banks = ko.observableArray([]);
    self.CostCenters = ko.observableArray([]);
    self.Accounts = ko.observableArray([]);
    self.Months = ko.observableArray([
        { 'MonthID': 1, 'MonthName': 'Baisakh' },
        { 'MonthID': 2, 'MonthName': 'Jestha' },
        { 'MonthID': 3, 'MonthName': 'Ashad' },
        { 'MonthID': 4, 'MonthName': 'Shrawan' },
        { 'MonthID': 5, 'MonthName': 'Bhadra' },
        { 'MonthID': 6, 'MonthName': 'Ashwin' },
        { 'MonthID': 7, 'MonthName': 'Kartik' },
        { 'MonthID': 8, 'MonthName': 'Mangsir' },
        { 'MonthID': 9, 'MonthName': 'Poush' },
        { 'MonthID': 10, 'MonthName': 'Magh' },
        { 'MonthID': 11, 'MonthName': 'Falgun' },
        { 'MonthID': 12, 'MonthName': 'Chaitra' }
    ]);

    var entryby = $("#user").text();
    self.EntryBy = ko.observable(entryby);
    self.SubmissionNo = ko.observable();

    //Load Offices
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'officeCode': null },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {
                return new Office(item)
            });

            self.Offices(mappedTask);
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");
        }

    });

    //Load Banks
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '../../../Handlers/CENTRALLOOKUP/BankHandler.ashx',
        data: { 'method': 'GetAllBank', 'bankid': null, 'token': null },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {
                return new Bank(item)
            });

            self.Banks(mappedTask);
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");
        }

    });

    //Load Bank Accounts
    self.GetBankAccount = function () {
        if (self.SelectedBank() == undefined || self.SelectedBank() == null) {
            $("#ddlBankAccount").attr('disabled', true);
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/CENTRALLOOKUP/BankAccountHandler.ashx',
                data: { 'method': 'GetBankLsts', 'BankId': self.SelectedBank().BankID, OfficeCD: self.SelectedOffice().OfficeCode() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new BankAccount(item)
                    });

                    self.Accounts(mappedTask);
                    $("#ddlBankAccount").attr('disabled', false);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }

            });
        }
    }

    self.CalculateTotal = function () {
        var total = 0;
        for (var i = 0; i < self.EmpPayableAmounts().length; i++) {
            total = total + self.EmpPayableAmounts()[i].PayableAmount();
        }
        self.TotalPayableAmount(total);
    }

    self.ViewEmpPayableAmount = function () {
        var costCenter = self.SelectedCostCenter() ? self.SelectedCostCenter().CostCenterID() : null;
        if (self.DetailsValidation()) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/PAYROLL/EmpSalaryPaymentHandler.ashx',
                data: { 'method': 'GetEmpPayableAmount', 'officeCode': self.SelectedOffice().OfficeCode, 'costCenter': costCenter, 'year': self.Year(), 'monthId': self.SelectedMonth() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new EmpPayableAmount(item)
                    });

                    self.EmpPayableAmounts(mappedTask);

                    self.CalculateTotal();
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }

            });
        }
    }

    self.ToggleBankAccount = function () {
        self.SelectedBank('');
        self.SelectedAccount('');
        if (self.PaymentType() == 'C') {
            $("#divBankAccount").hide();
            $("#ddlBankAccount").attr('disabled', true);
        }
        else if (self.PaymentType() == 'B') {
            $("#divBankAccount").show();

        }
    }

    self.SaveEmpSalaryPayment = function () {
        if (self.Validation()) {

            var office = {
                OfficeCode: self.SelectedOffice().OfficeCode,
                OfficeNameNep: self.SelectedOffice().OfficeNameNep
            }

            var bank;
            if (self.SelectedBank() == undefined || self.SelectedBank() == null) {
                bank = {
                    BankID: null,
                    BankName: ""
                }
            }
            else {
                bank = {
                    BankID: self.SelectedBank().BankID,
                    BankName: self.SelectedBank().BankName
                }
            }

            var bankaccount;
            if (self.SelectedAccount() == undefined || self.SelectedAccount() == null) {
                bankaccount = {
                    AccountNo: null
                }
            }
            else {
                bankaccount = {
                    AccountNo: self.SelectedAccount().AccountNo
                }
            }

            var empsalarypayment = {
                OldSubmissionNo: self.SubmissionNo(),
                Office: office,
                SalaryYear: self.Year(),
                SalaryMonth: self.SelectedMonth(),
                EmpPayableAmounts: self.EmpPayableAmounts(),
                EmpID: self.EmpID(),
                TotalPayableAmount: self.TotalPayableAmount(),
                PaymentType: self.PaymentType(),
                Bank: bank,
                BankAccount: bankaccount,
                PayableDate: self.PayableDate(),
                RStatus: "F",
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Action: "A",
                CostCenter: self.SelectedCostCenter()
            }

            var url = "/Handlers/PAYROLL/EmpSalaryPaymentHandler.ashx";
            var method = "SaveEmpSalaryPayment";
            var appID = "FAMS";
            var modID = "EMPSALPAY";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(empsalarypayment)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                            self.ClearControls();
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }

                                    });
        }
    }

    self.GetCostCenter = function () {
        if (ko.toJS(self.SelectedOffice()) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice()).OfficeCode;
        }
        else OfficeCD = null;
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '/Handlers/FAMS/CostCenterHandler.ashx',

            data: { 'method': 'GetCostCenter', 'officeCode': OfficeCD, 'CostCenterID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new CostCenter(item)
                });
                self.CostCenters(mappedTask);


            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

    }

    self.GetEmpSalPaymentBySubNo = function () {
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
                $('form').find('input, select').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PAYROLL/EmpSalaryPaymentHandler.ashx',
                data: { 'method': 'GetEmpSalaryPayment', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("Submission number is not valid.");
                    }
                    else {
                        for (var i = 0; i < self.Offices().length; i++) {
                            if (self.Offices()[i].OfficeCode() == data.ResponseData.Office.OfficeCode) {
                                self.SelectedOffice(self.Offices()[i]);
                            }
                        }

                        self.GetCostCenter();

                        for (var i = 0; i < self.CostCenters().length; i++) {
                            if (self.CostCenters()[i].CostCenterID() == data.ResponseData.CostCenter.CostCenterID) {
                                self.SelectedCostCenter(self.CostCenters()[i]);
                            }
                        }

                        self.Year(data.ResponseData.SalaryYear);
                        self.SelectedMonth(data.ResponseData.SalaryMonth);

                        var mappedTask = $.map(data.ResponseData.EmpPayableAmounts, function (item) {
                            return new EmpPayableAmount(item)
                        });
                        self.EmpPayableAmounts(mappedTask);

                        self.TotalPayableAmount(data.ResponseData.TotalPayableAmount);
                        self.PaymentType(data.ResponseData.PaymentType);
                        if (data.ResponseData.PaymentType == 'B') {
                            $("#divBankAccount").show();
                            for (var i = 0; i < self.Banks().length; i++) {
                                if (self.Banks()[i].BankID() == data.ResponseData.Bank.BankID) {
                                    self.SelectedBank(self.Banks()[i]);
                                }
                            }
                            self.GetBankAccount();
                            for (var i = 0; i < self.Accounts().length; i++) {
                                if (self.Accounts()[i].AccountNo() == data.ResponseData.BankAccount.AccountNo) {
                                    self.SelectedAccount(self.Accounts()[i]);
                                }
                            }
                        }

                        self.PayableDate(data.ResponseData.PayableDate);
                        if (editable == 'Y') {
                        }
                        else {
                            $("#ddlBankAccount").attr('disabled', true);
                        }
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }


    self.GetEmpSalPaymentBySubNo();



    self.DetailsValidation = function () {
        var errMsg = "";
        if (self.SelectedOffice() == undefined) {
            errMsg += "Please select office!!!<br>";
        }
        if (Validate.empty(self.Year())) {
            errMsg += "Please fill Year!!!<br>";
        }
        if (self.SelectedMonth() == undefined) {
            errMsg += "Please fill month !!!<br>";
        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }
    }


    self.Validation = function () {
        var errMsg = "";

        if (self.EmpPayableAmounts().length == 0) {
            errMsg += "There is no amount to pay in this date!!<br>";
        }
        if (Validate.empty(self.PaymentType())) {
            errMsg += "Please fill total deposited type !!!<br>";
        }

        else {
            if (self.PaymentType() == 'B') {
                if (self.SelectedBank() == undefined) {
                    errMsg += "Please  fill deposited bank !!!<br>";
                }
                if (self.SelectedAccount() == undefined) {
                    errMsg += "Please select deposited bank account!!!<br>";
                }
            }
        }

        if (Validate.empty(self.PayableDate())) {
            errMsg += "Please fill deposited date !!!<br>";
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
        self.SelectedOffice('');
        self.Year('');
        self.SelectedMonth('');
        self.EmpPayableAmounts([]);
        self.TotalPayableAmount(0);
        self.PaymentType('');
        self.SelectedBank('');
        self.SelectedAccount('');
        self.PayableDate('');
        $("#divBankAccount").hide();
        $("#ddlBankAccount").attr('disabled', true);
    }
}

$(document).ready(function () {

    ValidateSession();
    $("#divBankAccount").hide();
    $("#ddlBankAccount").attr('disabled', true);
    var espvm = new EmpSalaryPaymentViewModel();
    ko.applyBindings(espvm);

});
