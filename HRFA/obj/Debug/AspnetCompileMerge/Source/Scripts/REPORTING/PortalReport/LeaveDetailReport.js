function LeaveDetailReport(data) {
    if (data != undefined) {
        var self = this;
        self.EMP_ID = ko.observable(data.EMP_ID);
        self.APP_NO_OF_DAYS = ko.observable(data.APP_NO_OF_DAYS);
        self.APP_FROM_DATE = ko.observable(data.APP_FROM_DATE);
        self.REMARKS = ko.observable(data.REMARKS);
        self.L_TYPE_ID = ko.observable(data.L_TYPE_ID);
        self.FORWARDED_TO = ko.observable(data.FORWARDED_TO);
        self.APP_STATUS = ko.observable(data.APP_STATUS);
        self.LEAVE_TYPE_NAME = ko.observable(data.LEAVE_TYPE_NAME);
        self.APP_TO_DATE = ko.observable(data.APP_TO_DATE);
        self.APP_DATE = ko.observable(data.APP_DATE);
        self.EMP_NAME = ko.observable(data.EMP_NAME);
        self.FORWARDED_EMP = ko.observable(data.FORWARDED_EMP);
        self.C_FROM_DATE = ko.observable(data.C_FROM_DATE);
        self.C_NO_OF_DAYS = ko.observable(data.C_NO_OF_DAYS);
        self.C_TO_DATE = ko.observable(data.C_TO_DATE);
        self.CANCEL_DATE = ko.observable(data.CANCEL_DATE);
        self.CANCEL_REASON = ko.observable(data.CANCEL_REASON);
    }
}

function LeaveDetailViewModel() {
    var self = this;
    self.ShowReport = ko.observable(false);
    self.LeaveDetailReports = ko.observableArray([]);
  
    self.ViewReport = function () {

        self.empID = $("#empID").text();

            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/Reporting/PortalReport/LeaveDetailHandler.ashx',
                data: {
                    'method': 'GetLeaveDetail', 'empId': self.empID
                },
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new LeaveDetailReport(item)

                    });
                    self.LeaveDetailReports(mappedTask);
                    self.ShowReport(true);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    self.Cancel = function () {
}



}
$(document).ready(function () {
    PortalValidateSession();
    ko.applyBindings(new LeaveDetailViewModel());
});