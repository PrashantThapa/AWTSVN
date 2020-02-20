
function Office(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
}

function CostCenter(data) {
    var self = this;
    self.CostCenterID = ko.observable(data.CostCenterID);
    self.CostCenterName = ko.observable(data.CostCenterName);
}

function OfficeCompanyAccChartSub(data) {
    var self = this;
    self.AccCode = ko.observable(data.AccountChart.AcNo);
    self.AccName = ko.observable(data.AccountChart.AccName);
}

function VoucherViewModel() {
    var self = this;
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.Action = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.UpToDate = ko.observable();
    self.Offices = ko.observableArray([]);
    self.Year = ko.observable();
    self.SelectedMonth = ko.observable();
    
    self.Months = ko.observableArray([
        { 'MonthID': 1, 'MonthName': 'Baisakh' },
        { 'MonthID': 2, 'MonthName': 'Jestha' },
        { 'MonthID': 3, 'MonthName': 'Ashad' },
        { 'MonthID': 4, 'MonthName': 'Shrawan' },
        { 'MonthID': 5, 'MonthName': 'Bhadra' },
        { 'MonthID': 6, 'MonthName': 'Aswin' },
        { 'MonthID': 7, 'MonthName': 'Kartik' },
        { 'MonthID': 8, 'MonthName': 'Mangsir' },
        { 'MonthID': 9, 'MonthName': 'Poush' },
        { 'MonthID': 10, 'MonthName': 'Magh' },
        { 'MonthID': 11, 'MonthName': 'Falgun' },
        { 'MonthID': 12, 'MonthName': 'Chaitra' }
    ]);

    self.SelectedOffice = ko.observable();
    self.CostCenters = ko.observableArray([]);
    self.SelectedCostCenter = ko.observable();
    self.SelectedReportType = ko.observable();
    self.hasSubs = ko.observable(false);

    self.Days = ko.observable();
    self.SelectedGlCode = ko.observable();
    self.SelectedGLCodeSubsidary = ko.observable();
    self.GlCodeList = ko.observableArray([]);
    self.GLCodeSubsidarysLst = ko.observableArray([]);

    self.reportDivs = ['divOffice', 'divFunctionUnit', 'divGl', 'divFromDateToDate', 'divYearMonth', 'divUptoDate'];
    self.reportDivs.forEach(div => $('#'+div).hide());

    self.selectReportType = function () {
        self.SelectedOffice(null);
        var type = self.SelectedReportType();
        if (type)
            self.reportDivs.forEach(div => type.showDivs.find(x => x == div)? $('#'+div).show() : $('#'+div).hide());
        else
            self.reportDivs.forEach(div => $('#'+div).hide());
    };

    self.enableSubs = ko.computed( () => {
        try {
            return ko.toJS(self.SelectedGlCode()).HaveSubs == 'Y';
        } catch (e) {
            return false;
        }
    });

    self.ViewReport = function () {
        self.SelectedReportType().method();
    };

    self.GetOffice = function () {
        $.ajax({
            dataType: 'json',
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice' },
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Office(item);
                });
                self.Offices(mappedTask);
            },
            error: function (err) {
                msg(err.status + ' - ' + err.statusText, 'FAILURE');
            }
        });
    };

    self.GetOffice();

    self.GetCostCenter = function () {
        self.GetACChartWithOfficeCostcenter();

        var OfficeCD = (self.SelectedOffice())? self.SelectedOffice().OfficeCode() : null;
        if (OfficeCD) {
            $.ajax({
                dataType: 'json',
                cache: false,
                url: '../../../Handlers/FAMS/BudgetRequestHandler.ashx',
                data: { 'method': 'GetCostCenter', 'OfficeCD': OfficeCD },
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new CostCenter(item);
                    });
                    self.CostCenters(mappedTask);
                },
                error: function (err) {
                    msg(err.status + ' - ' + err.statusText, 'FAILURE');
                }
            });
        }
    };

    self.GetACChartWithOfficeCostcenter = function () {
        if (self.SelectedOffice() == undefined) {
            self.GlCodeList([]);
            self.SelectedGLCodeSubsidary(null);
            self.hasSubs(false);
            return;
        }
        else {
            $.ajax({
                dataType: 'json',
                cache: false,
                async: false,
                url: '../../../Handlers/Account/OfficeCompanyAccChartHandler.ashx',
                data: { 'method': 'GetOfficeComanyAcchartLedger', 'OfficeID': self.SelectedOffice().OfficeCode(), 'companyID': self.SelectedCostCenter(), 'P_all': 'Y', 'token': $('#token').text(), 'VType': 'JV' },
                contentType: 'application/json; charset=utf-8',
                success: result => self.GlCodeList(result.ResponseData.map(x => x.AccountChart)),
                error: err => msg(err.status + ' - ' + err.statusText, 'FAILURE')
            });
        }
    };

    self.GetGLCodeSubsidary = function () {
        var selectedTGl = ko.toJS(self.SelectedGlCode());
        if (selectedTGl) {
            var glcode = selectedTGl.AccCode;
            self.hasSubs(selectedTGl.HaveSubs == 'Y');
            $.ajax({
                type: 'GET',
                async: false,
                dataType: 'json',
                url: '/Handlers/ACCOUNT/OfficeCompanyAccChartHandler.ashx',
                data: { 'method': 'GetGLCodewithSubsidary', 'OfficeID': self.SelectedOffice().OfficeCode(), 'AccCode': glcode },
                contentType: 'application/json; charset=utf-8',
                success: data => self.GLCodeSubsidarysLst(data.ResponseData.map(x => new OfficeCompanyAccChartSub(x))),
                error: err => msg(err.status + ' - ' + err.statusText, 'FAILURE')
            });
        } else
            self.GLCodeSubsidarysLst([]);
    };

    self.validations = {
        'divOffice': [[self.SelectedOffice], 'Select', ['Office']],
        'divFunctionUnit': [[]],
        'divGl': [[]],
        'divFromDateToDate': [[self.FromDate, self.ToDate], 'Enter', ['From Date', 'To Date']],
        'divYearMonth': [[self.Year, self.SelectedMonth], 'Select' ['year', 'Month']],
        'divUptoDate': [[self.ToDate], 'Enter', ['Up To Date']]
    };

    self.Validation = function () {
        var errMsg = '';
        var reqDivs = self.SelectedReportType().showDivs;
        reqDivs.forEach(b => self.validations[b][0].forEach((func, i) => {
            if (!func()) errMsg += 'Please ' + self.validations[b][1] + ' ' + self.validations[b][2][i] + ' !!!<br>';
        }));

        return errMsg ? !!msg(errMsg, 'WARNING') : true;
    };

    self.GetDateDifference = function (date1, date2) {
        if (date1 != undefined && date2 != undefined) {
            $.ajax({
                dataType: 'json',
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
                data: { 'method': 'GetDaysDifference', 'date1': date2, 'date2': date1 },
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    var days = result.ResponseData;
                    self.Days(days);
                },
                error: function (err) {
                    msg(err.status + ' - ' + err.statusText, 'FAILURE');
                }
            });
        }
    };

    self.ValidateDate = function () {
        if (!Validate.empty(self.FromDate()) && !Validate.empty(self.ToDate())) {
            self.GetDateDifference(self.FromDate(), self.ToDate());
            if (self.Days() < 0) {
                msg('FromDate must be less or equal to ToDate!!!');
                self.ToDate('');
                self.Days('');
            }
        }
    };

    self.Cancel = function () {
        self.SelectedOffice(null);
        self.SelectedCostCenter('');
        self.FromDate('');
        self.ToDate('');
        self.SelectedGlCode('');
    };
    //
    self.ViewLedger = function () {
        if (self.Validation()) {
            var OfficeCode = self.SelectedOffice().OfficeCode();
            var CostCenterID = self.SelectedCostCenter();
            var GLCode = (self.SelectedGlCode()) ? self.SelectedGlCode().AccCode : null;
            var FromDate = self.FromDate();
            var ToDate = self.ToDate();
            var data = {
                OfficeCode,
                CostCenterID,
                GLCode,
                FromDate,
                ToDate
            };
            var hght = screen.height;
            var url = '../../../Reporting/Account/ReportHandlers/AccountLedgerHandler.ashx';
            var winOption = 'width=900,resizable=yes,scrollbars=yes,left=' + 230 + ',height=' + hght + '';
            OpenWindowWithPost(url, winOption, 'NewFile', data);
            //self.Cancel();
            waitMsg.hide();
        }
    };

    self.ViewSubsLedger = function () {
        var OfficeCode = self.SelectedOffice().OfficeCode();
        var CostCenterID = self.SelectedCostCenter();
        var GLCode = (self.SelectedGlCode())? self.SelectedGlCode().AccCode : null;
        var FromDate = self.FromDate();
        var ToDate = self.ToDate();
        var SubsidiaryCode = (self.SelectedGLCodeSubsidary())? parseInt(ko.toJS(self.SelectedGLCodeSubsidary()).AccCode) : null;
        if (self.Validation()) {
            var data = {
                OfficeCode,
                CostCenterID,
                GLCode,
                SubsidiaryCode,
                FromDate,
                ToDate
            };
            var hght = screen.height;
            var url = '../../../Reporting/Account/ReportHandlers/SubsideryAccountLedgerHandler.ashx';
            var winOption = 'width=900,resizable=yes,scrollbars=yes,left=' + 230 + ',height=' + hght + '';
            OpenWindowWithPost(url, winOption, 'NewFile', data);
            //self.Cancel();
            waitMsg.hide();
        }
    };

    self.ViewSubsidiary = function () {
        var OfficeCode = self.SelectedOffice().OfficeCode();
        var AccCode = (self.SelectedGlCode())? self.SelectedGlCode().AccCode : null;
        var SubAccNo = (self.SelectedGLCodeSubsidary())? parseInt(ko.toJS(self.SelectedGLCodeSubsidary()).AccCode) : null;
        var FromDate = self.FromDate();
        var ToDate = self.ToDate();
        var OfficeName =  self.SelectedOffice().OfficeNameNep();
        if (self.Validation()) {
            var data = {
                OfficeCode,
                AccCode,
                FromDate,
                ToDate,
                SubAccNo,
                OfficeName
            };
            var hght = screen.height;

            var url = '../../../Reporting/Account/ReportHandlers/SubsideryAccountReportHandler.ashx';
            var winOption = 'width=900,resizable=yes,scrollbars=yes,left=' + 230 + ',height=' + hght + '';
            OpenWindowWithPost(url, winOption, 'NewFile', data);
            //self.Cancel();
            waitMsg.hide();
        }
    };

    self.ViewConsFuncLedger = function () {
        if (self.Validation()) {
            var data = {
                OfficeCode: self.SelectedOffice().OfficeCode(),
                CategoryID: 2,
                FromDate: self.FromDate(),
                ToDate: self.ToDate()
            };
            var hght = screen.height;
            var url = '../../../Reporting/Account/ReportHandlers/CostCenterWiseExpenditure.ashx';
            var winOption = 'width=900,resizable=yes,scrollbars=yes,left=' + 230 + ',height=' + hght + '';
            OpenWindowWithPost(url, winOption, 'NewFile', data);
            self.Cancel();
        }
    };

    self.ViewFuncLedger = function () {
        if (self.Validation()) {
            var CostID = self.SelectedCostCenter() || null;
            var data = {
                OfficeCode: self.SelectedOffice().OfficeCode(),
                CostcenterID: CostID,
                Year:self.Year(),
                MonthID: ko.toJS(self.SelectedMonth()).MonthID,
                MonthName:ko.toJS(self.SelectedMonth()).MonthName
            };
            var hght = screen.height;
            var url = '../../../Reporting/Account/ReportHandlers/FunctionUnitExpReportHandler.ashx';
            var winOption = 'width=900,resizable=yes,scrollbars=yes,left=' + 230 + ',height=' + hght + '';
            OpenWindowWithPost(url, winOption, 'NewFile', data);
        }        
    };

    self.ViewBranchReport = function () {
        if (self.Validation()) {
            var data = {
                OfficeCode: self.SelectedOffice().OfficeCode(),
                OfficeNameNep: self.SelectedOffice().OfficeNameNep(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                VoucherTypeID: self.SelectedReportType().ReportTypeID,
                VoucherTypeName: self.SelectedReportType().ReportTypeName
            };
            console.log(data);
            var hght = screen.height;
            var url = '../../../Reporting/Account/ReportHandlers/FinancialStatementRepHandler.ashx';
            var winOption = 'width=900,resizable=yes,scrollbars=yes,left=' + 230 + ',height=' + hght + '';
            OpenWindowWithPost(url, winOption, 'NewFile', data);
            self.Cancel();
        }
    };
    
    self.ReportTypes = [
        { ReportTypeName: 'Account Ledger', ReportTypeID: 1, method: self.ViewLedger, showDivs: ['divOffice', 'divFunctionUnit', 'divGl', 'divFromDateToDate'] },
        { ReportTypeName: 'Subsidiary Ledger', ReportTypeID: 2, method: self.ViewSubsLedger, showDivs: ['divOffice', 'divFunctionUnit', 'divGl', 'divFromDateToDate'] },
        { ReportTypeName: 'Subsidiary Summary Report', ReportTypeID: 3, method: self.ViewSubsidiary, showDivs: ['divOffice', 'divFunctionUnit', 'divGl', 'divFromDateToDate'] },
        { ReportTypeName: 'Consolidated Functional Unit Ledger', ReportTypeID: 8, method: self.ViewConsFuncLedger, showDivs: ['divOffice', 'divFromDateToDate'] },
        { ReportTypeName: 'Functional Unit Ledger', ReportTypeID: 9, method: self.ViewFuncLedger, showDivs: ['divOffice', 'divFunctionUnit', 'divYearMonth'] },
        { ReportTypeName: 'Expense Trial Balance Branch', ReportTypeID: 4, method: self.ViewBranchReport, showDivs: ['divOffice', 'divFromDateToDate'] },
        { ReportTypeName: 'Income Trial Balance Branch', ReportTypeID: 5, method: self.ViewBranchReport, showDivs: ['divOffice', 'divFromDateToDate'] },
        { ReportTypeName: 'Store Sales and Other Deposit Branch', ReportTypeID: 6, method: self.ViewBranchReport, showDivs: ['divOffice', 'divFromDateToDate'] },
        { ReportTypeName: 'New Connection Deposit Branch', ReportTypeID: 7, method: self.ViewBranchReport, showDivs: ['divOffice', 'divFromDateToDate'] }
    ];

}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new VoucherViewModel());
});