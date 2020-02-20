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
function Schedule(data) {
    var self = this;
    self.ScheduleID = ko.observable(data.ScheduleID);
    self.ScheduleName = ko.observable(data.ScheduleName);
}
function Office(data) {
    var self = this;
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    self.OfficeCode = ko.observable(data.OfficeCode);
}
/*********************View Model Begin ******************************************/
function ScheduleAccountReportViewModel() {
    var self = this;
    // cost center
    self.OfficeCode = ko.observable();
    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.CostCenterNameEng = ko.observable();
    self.CostCenters = ko.observableArray([]);
    self.SelectedCostCenter = ko.observable();
    self.ParentOffID = ko.observable();
    self.ParentCostCenterID = ko.observable();
    self.ParentID = ko.observable();
    self.OfficeName = ko.observable();
    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();
    self.OfficeArray = ko.observableArray([]);
   
   

   
    self.ToDate = ko.observable();

    self.ScheduleID = ko.observable();
    self.ScheduleName = ko.observable();
    self.Schedule = ko.observable();
    self.Schedules = ko.observableArray([]);
    self.SelectedSchedule = ko.observable();
    
self.GetOffice = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
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

    }
    self.GetOffice();
   self.GetSchedule = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/ACCOUNT/ScheduleHandler.ashx',
            data: { 'method': 'GetSchedule', 'ScheduleID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Schedule(item)

                });
                self.Schedules(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

    };
    self.GetSchedule();

    /*********************for Print Begin ************************************/

    self.PrintScheduleAccountReport = function () {

       if (self.ValidationPrint()) {

            var ScheduleNo;
            var officecode;

            if (self.SelectedSchedule() == undefined) {
                ScheduleNo = null;
            }
            else {
                ScheduleNo = ko.toJS(self.SelectedSchedule()).ScheduleName
            }
            if (self.SelectedOffice() == undefined) {
                officecode = null;
            }
            else {
                officecode = ko.toJS(self.SelectedOffice()).OfficeCode
            }
            var data = {
                OfficeCode: officecode,
                ScheduleID: ScheduleNo,
                ToDate: self.ToDate()
            }
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);

            var url = "../../../Reporting/Account/ReportHandlers/ScheduleAccountHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            //self.Cancel();
            waitMsg.hide();
        }
    }

    /********************* End Print ************************************************************/

    /*********************Clear Print controls Begin *******************************************/
    self.CleaRPRintControls = function () {
        self.SelectedOffice(null);
        self.SelectedSchedule(null);
        self.ToDate("");
    };

    /*********************Clear Print controls End ******************************************/

  /*********************Validation Submit Begin ******************************************/

    self.ValidationPrint = function () {
        var errMsg = "";
        var objFocus = null;

        if (!self.ToDate()) {
            errMsg += "Please Enter Date !!!<br>";

        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    /*********************Validation Submit End ******************************************/
}
/*********************View Model End ******************************************/
$(document).ready(function () {

    ValidateSession();
    ko.applyBindings(new ScheduleAccountReportViewModel());

});