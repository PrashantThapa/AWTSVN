function ShowAttendence(data) {
    if (data != undefined) {
        var self = this;
        self.POST_DESC = ko.observable(data.POST_DESC);
        self.POST_DESC_ENG = ko.observable(data.POST_DESC_ENG);
        self.POST_ID = ko.observable(data.POST_ID);
        self.ATT_DATE = ko.observable(data.ATT_DATE);
        self.IN_TIME = ko.observable(data.IN_TIME);
        self.OUT_TIME = ko.observable(data.OUT_TIME);
        self.SYMBOL_NO = ko.observable(data.SYMBOL_NO);
        self.EMP_NAME = ko.observable(data.IN_TEMP_NAMEIME);
        self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
        self.OFFICE_CD = ko.observable(data.OFFICE_CD);
    }
}

function AttendenceViewModel() {
    var self = this;
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.ShowReport = ko.observable(false);

    self.ViewReport = function () {

        if (self.Validation()) {

            self.officeCD = $("#officeCD").text();
            self.empID = $("#empID").text();
           
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/Reporting/PortalReport/AttendenceHandler.ashx',
                data: {
                    'method': 'GetAttendenceReport', 'fromdate': self.FromDate(), 'todate': self.ToDate(), 'officeCD': self.officeCD, 'symbolNO': self.empID
                },
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new ShowAttendence(item)
                    });
                    self.ShowAttendences(mappedTask);
                    self.ShowReport(true);
                },

                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    };

    self.Validation = function () {
        var ErrMsg = '';
        if (!self.FromDate()) {
            ErrMsg += 'Please enter From Date<br>';
        }
        if (!self.ToDate()) {
            ErrMsg += 'Please enter To Date<br>';
        }
        if (ErrMsg) {
            msg(ErrMsg, "WARNING");
            return false;
        } else {
            return true;
        }
    };

    self.Cancel = function () {
        self.FromDate(null);
        self.ToDate(null);
    };


}
$(document).ready(function () {
    PortalValidateSession();
    ko.applyBindings(new AttendenceViewModel());
});