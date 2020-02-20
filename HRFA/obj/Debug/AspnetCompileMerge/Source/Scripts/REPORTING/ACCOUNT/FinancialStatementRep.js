/*********************************************************************************
Copyright © HRFA PCS System  2016
*********************************************************************************
Project              : Copyright © HRFA PCS System  2016  
File                 :AccountChartSetup.js 
Description          :This Page contain the Account Chart Setup Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
shanjeev sah                                 10/01/2015                                                              
*********************************************************************************/
//jshint esversion: 6
function Office(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
}

function GLGroup(data) {
    var self = this;
    self.GroupID = ko.observable(data.GroupID);
    self.GroupName = ko.observable(data.GroupName);

}

function Schedule(data) {
    var self = this;
    self.ScheduleID = ko.observable(data.ScheduleID);
    self.ScheduleName = ko.observable(data.ScheduleName);
}

function BranchTrialBalanceViewModel() {
    var self = this;
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.Action = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Offices = ko.observableArray([]);
    self.Schedules = ko.observableArray([]);

    self.SelectedOffice = ko.observable();
    self.SelectedCategory = ko.observable();
    self.SelectedSchedule = ko.observable();
    self.Categories = ko.observableArray([]);
    self.Days = ko.observable();
    self.VoucherTypes = ko.observableArray([
        { 'VoucherTypeName': 'Balance Sheet Central', 'VoucherTypeID': '1' },
        { 'VoucherTypeName': 'Income Statement Central', 'VoucherTypeID': '2' },
        { 'VoucherTypeName': 'Trial Balance Central', 'VoucherTypeID': '3' },
        // { 'VoucherTypeName': 'Expense Trial Balance Branch', 'VoucherTypeID': '4'},
        // { 'VoucherTypeName': 'Income Trial Balance Branch', 'VoucherTypeID': '5' },
        // { 'VoucherTypeName': 'Store Sales and Other Deposit Branch', 'VoucherTypeID': '7' },
        // { 'VoucherTypeName': 'New Connection Deposit Branch', 'VoucherTypeID': '6'},
        { 'VoucherTypeName': 'Schedule Report', 'VoucherTypeID': '8'}
    ]);
    self.SelectedVoucherType = ko.observable();
    self.VoucherTypeName = ko.observable();
    self.VoucherTypeID = ko.observable();

    self.GetSchedule = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/ACCOUNT/ScheduleHandler.ashx',
            data: { 'method': 'GetSchedule', 'ScheduleID': null },
            contentType: "application/json; charset=utf-8",
            success: result => self.Schedules(result.ResponseData.map(item => new Schedule(item))),
            error: err => msg(err.status + " - " + err.statusText, "FAILURE")
        });

    };

    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {
                return new Office(item);
            });
            self.Offices(mappedTask);
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");
        }
    });

    self.Validation = function () {
        var errMsg = "";
        var objFocus = null;
        // self.SelectedOffice(self.SelectedOffice() || null);

        if (!self.SelectedVoucherType())
            errMsg += "Please Select Report Type  !!!<br>";

        if (!self.ToDate())
            errMsg += "Please Enter Up To Date !!!<br>";

        if (errMsg) {
             msg(errMsg,"WARNING");
            return false;
        }
        else
            return true;
    };

    self.Cancel = function () {
        self.SelectedOffice("");
        self.ToDate("");
        self.SelectedVoucherType("");
    };

    self.ViewReport = function () {
        if (self.Validation()) {
            var ScheduleID = (self.SelectedSchedule())? ko.toJS(self.SelectedSchedule()).ScheduleName : null;
            var data = {
                OfficeCode: null,
                ScheduleID: ScheduleID,
                ToDate: self.ToDate(),
                VoucherTypeID: self.SelectedVoucherType(),
                VoucherTypeName: ko.toJS(self.SelectedVoucherType()).VoucherTypeName
            }

            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = (self.SelectedVoucherType() == 8)?
                "../../../Reporting/Account/ReportHandlers/ScheduleAccountHandler.ashx"
                : "../../../Reporting/Account/ReportHandlers/FinancialStatementRepHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            self.Cancel();
        }
    };

    self.checkCentralBranch = _ => {
        if (self.SelectedVoucherType() == 8) {
            self.GetSchedule();
            $('#selSchedule').show();
        } else {
            self.Schedules([]);
            $('#selSchedule').hide();
        }
    };
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BranchTrialBalanceViewModel());

});