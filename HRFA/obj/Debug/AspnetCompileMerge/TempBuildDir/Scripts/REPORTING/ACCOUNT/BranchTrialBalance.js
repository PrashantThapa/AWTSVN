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
function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
};

function GLGroup(data) {
    var self = this;
    self.GroupID = ko.observable(data.GroupID);
    self.GroupName = ko.observable(data.GroupName);

}

function BranchTrialBalanceViewModel() {
    var self = this;
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.Action = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable([]);
    self.SelectedCategory = ko.observable([]);
    self.Categories = ko.observableArray([]);
    self.Days = ko.observable();
    self.VoucherTypes = ko.observableArray([{ 'VoucherTypeName': 'Branch Expense Trial Balance', 'VoucherTypeID': '1' }, { 'VoucherTypeName': 'Balance Sheet', 'VoucherTypeID': '2' }, { 'VoucherTypeName': 'Income Statement', 'VoucherTypeID': '3' },{ 'VoucherTypeName': 'Branch Income Trial Balance', 'VoucherTypeID': '4' }, { 'VoucherTypeName': 'Trial Balance', 'VoucherTypeID': '5'}]);
    self.SelectedVoucherType = ko.observable();

    self.VoucherTypeName = ko.observable();
    self.VoucherTypeID = ko.observable();


    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice' },
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




    self.Validation = function () {


        var errMsg = "";
        var objFocus = null;
        if (self.SelectedOffice() == undefined || self.SelectedOffice() == "") {
            errMsg += "Please Select Office !!!<br>";
        }

        if (self.SelectedVoucherType() == undefined || self.SelectedVoucherType() == "") {
            errMsg += "Please Select Report Type  !!!<br>";
        }
        
        if (self.ToDate() == undefined || self.ToDate() == "") {
            errMsg += "Please Enter Up To Date !!!<br>";
        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }


    }


    self.Cancel = function () {
        self.SelectedOffice("");
        self.ToDate("");
        self.SelectedVoucherType("");

    }

    self.ViewReport = function () {
        if (self.Validation()) {
            var data = {
                OfficeCode: self.SelectedOffice(),
                ToDate: self.ToDate(),
                VoucherTypeID: self.SelectedVoucherType(),
                VoucherTypeName:ko.toJS(self.SelectedVoucherType()).VoucherTypeName
              // VoucherTypeName:self.SelectedVoucherType().VoucherTypeName
 }

            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "../../../Reporting/Account/ReportHandlers/BranchTrialBalanceHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            self.Cancel();
        }
    }
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BranchTrialBalanceViewModel());

});