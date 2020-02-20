function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);


};

function LeaveReport(data) {
    var self = this;

    self.EMP_ID = ko.observable(data.EMP_ID);
    self.APP_NO_OF_DAYS = ko.observable(data.APP_NO_OF_DAYS);
    self.L_TYPE_ID = ko.observable(data.L_TYPE_ID);
    self.APP_DATE = ko.observable(data.APP_DATE);
    self.APP_FROM_DATE = ko.observable(data.APP_FROM_DATE);
    self.APP_TO_DATE = ko.observable(data.APP_TO_DATE);
    self.SYMBOL_NO = ko.observable(data.SYMBOL_NO);
    self.LEAVE_TYPE_NAME = ko.observable(data.LEAVE_TYPE_NAME);
    self.REMARKS = ko.observable(data.REMARKS);
    self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
    self.EMP_NAME = ko.observable(data.EMP_NAME);
}
function LeaveRequestReportViewModel() {
    var self = this;

    self.Offices = ko.observable([]);
    self.SelectedOffice = ko.observable([]);
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Days = ko.observable();
    self.LeaveReports = ko.observableArray([]);
    self.CancellationFromDate = ko.observable();
    self.CancellationToDate = ko.observable();
    self.ViewReport = function (data, event) {
        self.ShowAttendance();
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
    self.GetDateDifference = function (date1, date2, type) {
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
                    if (type == "date") {
                        self.Days(days);
                    }
                    else if (type == "changedate") {
                        self.CancellationNoOfDays(days + 1);
                        if (days < 0) {
                            msg("End date should be greater or equal to start date", "FAILURE");
                            self.ToDate('');
                        }
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }
    self.ValidateToDate = function () {




        if (Validate.empty(self.FromDate())) {

            msg("Please fill cancel start date!!!<br>", "FAILURE");
        }
      

        if (!Validate.empty(self.FromDate()) && !Validate.empty(self.ToDate())) {
            self.GetDateDifference(self.FromDate(), self.ToDate(), "date");
            console.log(self.Days());
            if (self.Days() < 0) {
                msg("To date should be greater or equal to From date!!!");
                self.ToDate('');
               
                self.Days('');
            }
            self.GetDateDifference(self.CancellationFromDate(), self.CancellationToDate(), "changedate");
        }
    }
    self.Cancel = function () {
        self.SelectedOffice("");
        self.FromDate("");
        self.ToDate("");

    }
    
    self.ShowAttendance = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/Reporting/PIS/ReportHandlers/LeaveReportHandler.ashx',
            data: { 'method': 'GetLeaveReport', 'officecd': self.SelectedOffice(), 'appfromdt': self.FromDate(), 'apptodt': self.ToDate() },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {
                    return new LeaveReport(item)

                });
                //debugger;
                self.LeaveReports(mappedTask);
                //console.log('detail', self.EmployeeQuals());
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }

    self.Validation = function () {
        var errMsg = "";
        var objFocus = null;
        if (Validate.empty(self.SelectedOffice())) {
            errMsg += "Please select office<br>";
        }
        if (Validate.empty(self.FromDate())) {
            errMsg += "Please select from date <br>";
        }
        if (Validate.empty(self.ToDate())) {
            errMsg += "Please select end date<br>";
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
    ko.applyBindings(new LeaveRequestReportViewModel());
});