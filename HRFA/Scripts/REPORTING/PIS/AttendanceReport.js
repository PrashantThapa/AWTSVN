﻿function EmployeeAtt(data) {
    var self = this;

    self.ATT_DATE = ko.observable(data.ATT_DATE);
    self.OUT_TIME = ko.observable(data.OUT_TIME);
    self.IN_TIME = ko.observable(data.IN_TIME);
    self.EMP_ID = ko.observable(data.EMP_ID);
    self.EMP_NAME = ko.observable(data.EMP_NAME);
    self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
   
};

function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
};


function Season(data) {
    var self = this;
    if (data !== null && data !== undefined) {
    self.SEASON = ko.observable(data.SEASON);
    self.SeasonFromDate = ko.observable(data.SeasonFromDate);
    self.SeasonToDate = ko.observable(data.SeasonToDate);
    self.SeasonInTime = ko.observable(data.SeasonInTime);
    self.SeasonOutTime = ko.observable(data.SeasonOutTime);
    }
};


function AttendanceReportViewModel() {
    var self = this;
    
    self.Offices = ko.observableArray([]);
    self.Seasons = ko.observableArray([]);
    self.EmployeeAtts = ko.observableArray([]);
    self.SelectedOffice = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.ShowReport = ko.observable(false);
    self.SelectedDate = ko.observable();


    self.ViewReport = function (data, event) {
        if (self.Validation()) {
            self.ShowAttendance();
        }
    }

    var value = "";

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
    self.Cancel = function () {
        self.SelectedOffice("");
    }
    self.GetSeason = function (param1) {
        self.Seasons([]);
        $.ajax({
            dataType: "json",
            cache: false,
            async: false, 
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetSeason', 'param1':param1},
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedSeason = $.map(result.ResponseData.ResponseData, function (item) {
                    console.log(result.ResponseData.ResponseData);
                    return new Season(item)
                });
                self.Seasons(mappedSeason);
                console.log('get tt', ko.toJS(self.Seasons()));

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }

        });
    }

   
    self.ShowAttendance = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/PIS/EmployeeAttendanceHandler.ashx',
            data: {
                'method': 'ShowAttendance', 'OfficeCode': self.SelectedOffice(), 'FromDate': self.FromDate(), 'ToDate': self.ToDate()
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                waitMsg.hide();

                var mappedTask = $.map(data.ResponseData, function (item) {
                    return new EmployeeAtt(item)

                });
                mappedTask.forEach(function (e) {
                    if (typeof e === "object") {
                        var a = ko.toJS(e)

                        //e["Status"] = a.IN_TIME > '09:45:00' ? "late" : "ontime";
                        //e["Status"] = Seasons().FROMDATE   a.ATT_DATE > '09:45:00' ? "late" : "ontime";
                        self.GetSeason(a.ATT_DATE);
                        console.log('test tt', ko.toJS(self.Seasons()));
                        //b = ko.toJS(self.Seasons());
                        e["Status"] = a.IN_TIME > (ko.toJS(self.Seasons()))[0].SeasonInTime ? "late" : "ontime";
                        //console.log(a.IN_TIME);
                        debugger;

                        

                        var d1 = new Date(Date.parse("2017-05-02T" + a.IN_TIME));

                        var d2 = new Date(Date.parse("2017-05-02T" + a.OUT_TIME));

                        var d3 = new Date(Date.parse("2017-05-02T" + (ko.toJS(self.Seasons()))[0].SeasonInTime));

                        var d4 = new Date(Date.parse("2017-05-02T" + (ko.toJS(self.Seasons()))[0].SeasonOutTime));

                        //d1 = new Date(Date.parse("2017-05-02T10:45"));
                        //d2 = new Date(Date.parse("2017-05-02T12:15"));

                        //var difference = ((new Date(d1)) - (new Date(d2)));
                        var diff = new Date(d2 - d1);
                        var d0 = new Date(0);


                        var differ = diff.getHours() - d0.getHours();
                        var differmin = diff.getMinutes() - d0.getMinutes();
                        var differsec = diff.getSeconds() - d0.getSeconds();

                        var workinghours = new Date(d4 - d3);
                        var infohour = workinghours.getHours() - d0.getHours();
                        var infominutes = workinghours.getMinutes();
                        //console.log(d1, d2);
                        //var minutes = difference / (60000);
                        //console.log('diff', diff);
                        console.log('differ', differ);
                        //console.log('differmin', differmin);
                        //console.log('differsec', differsec);
                        //console.log('yo chai total hai', minutes);
                        console.log((ko.toJS(self.Seasons())[0].SEASON));
                        
                        if ((ko.toJS(self.Seasons())[0].SeasonInTime) = 'Summer')
                {
                        var summertime = (new Date(d4 - d3)).getHours() - d0.getHours();
                        e["WorkingHours"] = summertime + "hours";
                        console.log(summertime - differ);

                        e["Difference"] = (differ = summertime) ? (differmin + " mins") : ((summertime - differ) + "hours" + differmin + " mins");
                        //e["Remarks"] = (differmin > 1) ? Math.abs(differmin) + " " + "Minutes More" : " " + Math.abs(differmin) + " " + "Minutes Less";
                        }
                        else ((ko.toJS(self.Seasons())[0].SEASON) = 'Winter')
                        {
                        var wintertime = (new Date(d4 - d3)).getHours() - d0.getHours();

                        e["WorkingHours"] = wintertime + "hours";
                        e["Difference"] = (differ = summertime) ? (differmin + " mins") : ((summertime - differ) + "hours" + differmin + " mins");
                        //e["Remarks"] = (differmin > 1 ? Math.abs(differmin) + " " + "Minutes More" : " " + Math.abs(differmin) + " " + "Minutes Less");
                        }

                        }
                        });
           
                self.EmployeeAtts(mappedTask);

                self.ShowReport(true);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }


    self.Validation = function () {
        var errMsg = "";
        var objFocus = null;
        if (!self.SelectedOffice()) {
            errMsg += "Please select office<br>";
        }
        if (!self.FromDate()) {
            errMsg += "Please fill from date<br>";
        }
        if (!self.ToDate()) {
            errMsg += "Please fill to date<br>";
        }
        
        if (errMsg !== "") {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }
    };

}
$(document).ready(function () {
	ValidateSession();
	var attObj = new AttendanceReportViewModel();
	ko.applyBindings(attObj);
	var currentDate = new Date();
	//var bsDate = calenderFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
	var datePattern = "%y.%m.%d";
	//formattedCurrDate = calenderFunctions.bsDateFormat(datePattern, bsDate.bsYear, bsDate.bsMonth, bsDate.bsDate);
	//// otvm.TranDate(formattedCurrDate);
	//checkFronNepDate = element => (valFutureDate(element, 'Y', true)) ? true : attObj.FromDate(formattedCurrDate); 
	//checkToNepDate = element => (valFutureDate(element, 'Y', true)) ? true : attObj.FromDate(formattedCurrDate); 
});
var specialChars = [8, 35, 36, 37, 38, 39, 40, 46, 9, 116];
checkNumber = (x, y = x.which || x.keyCode) => (('0123456789०१२३४५६७८९').split('').map(x => x.charCodeAt(0)).concat(specialChars).includes(y));