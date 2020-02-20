
function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function OfficePost(data) {
    if (data != undefined) {
        var self = this;

        //self.OfficeCode = ko.observable(data.OfficeCode);
        //self.OfficeNameNep = ko.observable(data.OfficeNameNep);
        self.EMP_NAME = ko.observable(data.EMP_NAME);
        self.SYMBOL_NO = ko.observable(data.SYMBOL_NO);
        self.EMP_ID = ko.observable(data.EMP_ID);
        self.POST_ID = ko.observable(data.POST_ID);
        self.FROM_DATE = ko.observable(data.FROM_DATE);
        self.TO_DATE = ko.observable(data.TO_DATE);
        self.OFFICE_CD = ko.observable(data.OFFICE_CD);
        self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
        self.POST_DESC = ko.observable(data.POST_DESC);
    }
}

var EmployeePostViewModel = function () {

    var self = this;

    self.SymbolNo = ko.observable();

    self.SelectedOffice = ko.observable();

    self.Offices = ko.observableArray([]);

    self.OfficePosts = ko.observableArray([]);


    //Load Office
    $.ajax({
        dataType: "json",
        url: '/Handlers/Reporting/PIS/ReportHandlers/OfficePostHandler.ashx',
        data: { 'method': 'GetAllOffice', 'officeCode': null },
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Office(item)

            });
            self.Offices(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });
    self.Cancel = function () {
        self.SelectedOffice("");
        self.SymbolNo("");
    }
    self.ViewReportEmployeePost = function () {

        $.ajax({
            async: true,   // this will solve the problem
            dataType: "json",
            url: '/Handlers/Reporting/PIS/ReportHandlers/OfficePostHandler.ashx',
            data: { 'method': 'GetReportPost', 'officecd': self.SelectedOffice(), 'SymbolNo': self.SymbolNo() },
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new OfficePost(item)

                });
                //debugger;
                self.OfficePosts(mappedTask);
                //console.log('detail', ko.toJS(self.Infos()[0]).);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText);
            }
        });

        self.SelectedOffice(null);
        self.SymbolNo('');
    }
};


$(document).ready(function () {

    ValidateSession();

    var epvm = new EmployeePostViewModel();
    ko.applyBindings(epvm);

});