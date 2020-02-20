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
function CostCenter(data) {
    var self = this;

    self.CostCenterID = ko.observable(data.CostCenterID);
    self.CostCenterName = ko.observable(data.CostCenterName);


};




function TrialViewModel() {
    var self = this;
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.Action = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable([]);
    self.CostCenters = ko.observableArray([]);
    self.SelectedCostCenter = ko.observable([]);
    self.Days = ko.observable();

    self.ViewReport = function (data, event) {
        self.ShowTrial();

    }
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
    self.GetCostCenter = function () {

        var OfficeCD = self.SelectedOffice();
        if (OfficeCD != undefined && OfficeCD != "") {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/FAMS/BudgetRequestHandler.ashx',
                data: { 'method': 'GetCostCenter', 'OfficeCD': OfficeCD },
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

    self.ValidateDate = function () {
        if (!Validate.empty(self.FromDate()) && !Validate.empty(self.ToDate())) {
            self.GetDateDifference(self.FromDate(), self.ToDate());
            if (self.Days() < 0) {
                msg("FromDate must be less or equal to ToDate!!!");
                self.ToDate('');
                self.Days('');
            }
        }
    }

    self.Validation = function () {


        var errMsg = "";
        var objFocus = null;
        if (self.SelectedOffice() == undefined || self.SelectedOffice() == "") {
            errMsg += "Please Select Office !!!<br>";
         }
//        if (self.SelectedCostCenter() == undefined || self.SelectedCostCenter() == "") {
//            errMsg += "Please Select Cost Center !!!<br>";
//        }
        if (self.FromDate() == undefined || self.FromDate() == "") {
            errMsg += "Please Enter From Date !!!<br>";
        }
        if (self.ToDate() == undefined || self.ToDate() == "") {
            errMsg += "Please Enter To Date !!!<br>";
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
        self.SelectedCostCenter("");
        self.FromDate("");
        self.ToDate("");

    }

    self.ShowTrial = function () {
        if (self.Validation()) {
            var data = {
                OfficeCode: self.SelectedOffice(),
                CostCenterID: self.SelectedCostCenter(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate()
            }
            
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "../../../Reporting/Account/ReportHandlers/TrialBalanceHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            self.SelectedOffice("");
            self.SelectedCostCenter("");
            self.FromDate("");
            self.ToDate("");
        }
    }
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new TrialViewModel());

});