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



function CostCenterViewModel() {
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


    $.ajax({

        dataType: "json",
        cache: false,
        url: '../../../Handlers/ACCOUNT/GLGroupHandler.ashx',
        data: { 'method': 'GetGLGroup' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {

                return new GLGroup(item)
            });

            self.Categories(mappedTask);



        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");

        }
    });


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
        if (self.SelectedCategory() == undefined || self.SelectedCategory() == "") {
            errMsg += "Please Select Category !!!<br>";
        }
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
        self.SelectedCategory("");
        self.FromDate("");
        self.ToDate("");

    }

    self.ViewReport = function () {
        if (self.Validation()) {
            var data = {
                OfficeCode: self.SelectedOffice(),
                CategoryID: self.SelectedCategory(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate()
            };
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "../../../Reporting/Account/ReportHandlers/CostCenterWiseExpenditure.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            self.Cancel();
        }
    };
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new CostCenterViewModel());

});