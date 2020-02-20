function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);


};

function PostReport(data) {
    var self = this;
    self.OFFICE_CD = ko.observable(data.OFFICE_CD);
    self.POST_ID = ko.observable(data.POST_ID);
    self.TOTAL_SEAT = ko.observable(data.TOTAL_SEAT);
    self.OCCUPIED = ko.observable(data.OCCUPIED);
    self.VACANT = ko.observable(data.VACANT);
    self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
    self.POST_DESC = ko.observable(data.POST_DESC);
}

function Posts(data) {
    var self = this;

    self.PostID = ko.observable(data.PostID);
    self.PostDesc = ko.observable(data.PostDesc);

};

function OfficeReportViewModel() {
    var self = this;
    self.PostsLST = ko.observable([]);
    self.PostID = ko.observable();
    self.Offices = ko.observable([]);
    self.SelectedOffice = ko.observable([]);
    self.SelectedPost = ko.observable([]);
    self.PostReports = ko.observableArray([]);
    self.ViewReport = function (data, event) {
        self.ViewReportEmployeePost();        //self.ShowTrialBalance();
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
        self.SelectedPost("");
    }
    self.GetPost = function () {

        var OfficeCD = self.SelectedOffice();
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/COMMON/OfficePostHandler.ashx',
            data: { 'method': 'GetOfficePostList', 'OfficeCD': OfficeCD },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new Posts(item)
                });
                self.PostsLST(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
    self.ViewReport = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '/Handlers/Reporting/PIS/ReportHandlers/OfficePostReportHandler.ashx',
            data: {'method': 'GetPostReport', 'officecd': self.SelectedOffice(), 'postid': ko.toJS(self.PostsLST())[0].PostID },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new PostReport(item)
                });
                
                self.PostReports(mappedTask);

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
            errMsg = "Please select office<br>";
        }
        if (Validate.empty(self.SelectedPost())) {
            errMsg += "Please select post<br>";

        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");
            return false;
        }
        else {
            return true;
        }
    };


}
$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new OfficeReportViewModel());
});