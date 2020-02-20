function ShowEmployeeHoliday(data) {
    if (data != undefined) {
        var self = this;
        self.HOLIDAY_ID = ko.observable(data.HOLIDAY_ID);
        self.HOLIDAY_DESC = ko.observable(data.HOLIDAY_DESC);
        self.FROM_DATE = ko.observable(data.FROM_DATE);
        self.TO_DATE = ko.observable(data.TO_DATE);
        self.FIXED_HOLIDAYS = ko.observable(data.FIXED_HOLIDAYS);
    }
}
function HolidayReportViewModel() {
    var self = this;

    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.ShowReport = ko.observable(false);
    self.ShowEmployeeHolidays = ko.observableArray([]);
    self.ViewReport = function (data, event) {
        self.ShowHoliday();
    }

    var value = "";

    self.ShowHoliday = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/Reporting/PIS/ReportHandlers/HolidayHandler.ashx',
            data: {
                'method': 'GetHolidayReport', 'fromdate': self.FromDate(), 'todate': self.ToDate()
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {
                    return new ShowEmployeeHoliday(item)
                });
                self.ShowEmployeeHolidays(mappedTask);
                self.ShowReport(true);
            },

            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }

    self.Cancel = function () {
        self.FromDate("");
        self.ToDate("");


        self.Validation = function () {
            var errMsg = "";

            if (Validate.empty(self.FromDate())) {
                errMsg = "Please fill from date<br>";
            }
            if (Validate.empty(self.ToDate())) {
                errMsg = "Please fill to date<br>";
            }

            if (errMsg !== "") {
                msg(errMsg, "WARNING");
                return false;
            }
            else {
                return true;
            }
        }

    }
}
$(document).ready(function () {
    PortalValidateSession();
    holObj = new HolidayReportViewModel();
    ko.applyBindings(holObj);
    var currentDate = new Date();
    var bsDate = calenderFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    var datePattern = "%y.%m.%d";
    formattedCurrDate = calenderFunctions.bsDateFormat(datePattern, bsDate.bsYear, bsDate.bsMonth, bsDate.bsDate);

    checkFronNepDate = element => (valFutureDate(element, 'N', true)) ? true : holObj.FromDate(formattedCurrDate);
    checkToNepDate = element => (valFutureDate(element, 'N', true)) ? true : holObj.FromDate(formattedCurrDate);
});
var specialChars = [8, 35, 36, 37, 38, 39, 40, 46, 9, 116];
checkNumber = (x, y = x.which || x.keyCode) => (('0123456789०१२३४५६७८९').split('').map(x => x.charCodeAt(0)).concat(specialChars).includes(y));