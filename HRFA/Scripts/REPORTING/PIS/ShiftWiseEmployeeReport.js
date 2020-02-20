function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function Department(data) {
    var self = this;
    if (data != undefined) {
        self.DeptID = ko.observable(data.DeptID);
        self.DeptDesc = ko.observable(data.DeptDesc);
    }   
}

function ShiftWiseEmp(data) {
    var self = this;
    if (data != undefined) {
        self.OFFICE_CD = ko.observable(data.OFFICE_CD);
        self.DEPT_ID = ko.observable(data.DEPT_ID);
        self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
        self.DEPT_DESC = ko.observable(data.DEPT_DESC);
        self.SHIFT_NAME = ko.observable(data.SHIFT_NAME);
        self.SHIFT_TIMING = ko.observable(data.SHIFT_TIMING);
        self.EMP_NAME = ko.observable(data.EMP_NAME);
    }   
    
}

var ShiftWiseEmployeeViewModel = function () {
    var self = this;
    self.SelectedOffice = ko.observable();
    self.Offices = ko.observableArray([]);

    self.SelectedLstDepart = ko.observable();
    self.Departments = ko.observableArray([]);
    self.ShiftWiseEmps = ko.observableArray([]);

    //Load Office
    $.ajax({
        dataType: "json",
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
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
        self.SelectedLstDepart("");


    }
    //--------------------------------------------------------------
    //NB: To get Department according to office selected
    //--------------------------------------------------------------
    self.GetDepartment = function () {
        if (self.SelectedOffice() != undefined) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/COMMON/DepartmentHandler.ashx',
                async: false,
                data: { 'method': 'GetDepartment', 'officeCode': self.SelectedOffice(), 'deptID': null },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Department(item)
                    });

                    self.Departments(mappedTask);
//                    console.log(ko.toJS(self.Departments));

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    self.ViewReportShiftWiseEmployee = function () {
      
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Reporting/PIS/ReportHandlers/ShiftWiseEmployeeInfoHandler.ashx',
            async: false,
            data: { 'method': 'GetShiftWiseReport', 'officecd': self.SelectedOffice(), 'deptid': self.SelectedLstDepart },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new ShiftWiseEmp(item)
                });

                self.ShiftWiseEmps(mappedTask);
                //                    console.log(ko.toJS(self.Departments));

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });


    }

}

$(document).ready(function () {

    ValidateSession();
    var swevm = new ShiftWiseEmployeeViewModel();
    ko.applyBindings(swevm);
});