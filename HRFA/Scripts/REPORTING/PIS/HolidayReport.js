
function HolidayReport(data) {
    if (data != undefined) {
        var self = this;

        self.HOLIDAY_DESC = ko.observable(data.HOLIDAY_DESC);
        self.HOLIDAY_ID = ko.observable(data.HOLIDAY_ID);
        self.FROM_DATE = ko.observable(data.FROM_DATE);
        self.TO_DATE = ko.observable(data.TO_DATE);
        self.FIXED_HOLIDAYS = ko.observable(data.FIXED_HOLIDAYS);

    }
}

function HolidayReportViewModel() {
    var self = this;

    //    self.Year = ko.observable();

    //self.FromDate = ko.observable();
    //self.ToDate = ko.observable();
    self.fromdate = ko.observable();
    self.todate = ko.observable();
    self.HolidayReports = ko.observableArray([]);

    self.ViewReport = function (data, event) {
        self.ShowHoliday();
    }

    var value = "";

    self.ShowHoliday = function () {
        //debugger;
        $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/Reporting/PIS/ReportHandlers/HolidayHandler.ashx',
                data: { 'method': 'GetHolidayReports', 'fromdate': self.fromdate(), 'todate': self.todate() },
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new HolidayReport(item)

                    });
                    //debugger;
                    self.HolidayReports(mappedTask);

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });

        }
    }
    self.Cancel = function () {
        self.fromdate("");
        self.todate("");      

	}
	self.Validation = function () {
		var errMsg = "";
		var objFocus = null;
		//        if (Validate.empty(self.Year())) {
		//            errMsg = "कृपया साल भर्नुहोस् <br>";
		//        }

		if (Validate.empty(self.FromDate())) {
			errMsg = "Please fill from date<br>";
		}
		if (Validate.empty(self.ToDate())) {
			errMsg = "Please fill to date<br>";
		}

		if (errMsg !== "") {
			 msg(errMsg,"WARNING");
			return false;
		}
		else {
			return true;
		}
	}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new HolidayReportViewModel());
});
