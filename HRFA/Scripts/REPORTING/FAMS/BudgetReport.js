function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
    }
}


function FiscalYear(data) {
    var self = this;
    self.FiscalYearName = ko.observable(data.FiscalYearName);
}
function IncomeType(data) {
    var self = this;
    self.IncomeTypeName = ko.observable(data.IncomeTypeName);
}
function BudgetReportViewModel() {
    var self = this;

    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();

    self.CostCenters = ko.observable([]);
    self.SelectedCostCenter = ko.observable();

    self.FiscalYears = ko.observableArray([]);
    self.SelectedFiscalYear = ko.observable();

    self.ReportTypes = ko.observableArray([
        { 'ReportTypeID': 'BReq', 'ReportTypeName': 'Budget Request' },
        { 'ReportTypeID': 'BApp', 'ReportTypeName': 'Budget Approve' },
        { 'ReportTypeID': 'BRel', 'ReportTypeName': 'Budget Release' },
        { 'ReportTypeID': 'BTran', 'ReportTypeName': 'Budget Transfer' }
    ]);
    self.SelectedReportType = ko.observable();

    self.IncomeTypeName = ko.observable();
    // self.IncomeTypes = ko.observableArray([]);
    self.IncomeTypes = ko.observableArray([{ 'IncomeTypeName': 'Cash Base' }, { 'IncomeTypeName': 'Bill Base'}]);
    self.SelectedIncomeType = ko.observable([]);

    $("#DivIncomeLabel").hide();
    $("#DivIncomeLst").hide();



    self.ShowIncomeType = function () {

        if (ko.toJS(self.SelectedCostCenter()) == undefined) {

            self.SelectedIncomeType("");
            $("#DivIncomeLabel").hide();
            $("#DivIncomeLst").hide();
        }
        else {

            if (ko.toJS(self.SelectedCostCenter()) == 8) {

                $("#DivIncomeLabel").show();
                $("#DivIncomeLst").show();
            }

        }
    } 



    self.GetFiscalYear = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/CENTRALLOOKUP/FiscalYearHandler.ashx',
            data: { 'method': 'GetFiscalYear', 'fiscalYearID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {


                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new FiscalYear(item)
                });

                self.FiscalYears(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }

    self.GetFiscalYear();

    self.GetOffices = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
            contentType: "application/json; charset=utf-8",
            async: false,
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
    }
    self.GetOffices();

    self.GetCostCenter = function () {

        if (self.SelectedOffice() == undefined || self.SelectedOffice() == null) {

            self.SelectedCostCenter('');
            self.SelectedOffice('');
            self.CostCenters([]);
            self.Action("A");
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/FAMS/CostCenterHandler.ashx',
                async: false,
                data: { 'method': 'GetCostCenter', 'officeCode': self.SelectedOffice(), 'CostCenterID': null },
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

    }

    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.SelectedFiscalYear())) {
            errMsg += "Please select Fiscel year!!!\n";
        }
        if (Validate.empty(self.SelectedOffice())) {
            errMsg += "Please select office!!!\n";
        }
        if (Validate.empty(self.SelectedCostCenter())) {
            errMsg += "Please select cost center!!!\n";
        }
        if (Validate.empty(self.SelectedReportType())) {
            errMsg += "Please select report type!!!\n";
        }

        if (errMsg == "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.ViewReport = function () {
        if (self.Validation()) {
            var incomeType = null;
            //= ko.toJS(self.SelectedIncomeType).IncomeTypeName
            if (self.SelectedIncomeType() === undefined) {
                incomeType = null;
            }
            else {
                incomeType = ko.toJS(self.SelectedIncomeType).IncomeTypeName;
            }


            var data = {
                fiscalyear: self.SelectedFiscalYear(),
                OfficeCode: self.SelectedOffice(),
                CostCenterID: self.SelectedCostCenter(),
                IncomeTypeName: incomeType
            }
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "";

            if (self.SelectedReportType() == 'BReq') {
                url = "../../../Reporting/FAMS/ReportHandlers/BudgetRequestHandler.ashx";
            }
            else if (self.SelectedReportType() == 'BApp') {
                url = "../../../Reporting/FAMS/ReportHandlers/BudgetApprovalHandler.ashx";
            }
            else if (self.SelectedReportType() == 'BRel') {
                url = "../../../Reporting/FAMS/ReportHandlers/BudgetReleaseHandler.ashx";
            }
            else if (self.SelectedReportType() == 'BTran') {
                url = "../../../Reporting/FAMS/ReportHandlers/BudgetTransferHandler.ashx";
            }
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);

        }
    }

    self.CancelReport = function () {
        self.SelectedFiscalYear('');
        self.SelectedOffice('');
        self.CostCenters('');
        self.SelectedReportType('');
    }
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BudgetReportViewModel());
});