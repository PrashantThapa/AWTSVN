
function Employee(data) {
    var self = this;

    self.EmpId = ko.observable(data.EmpId);
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.OfficeCd = ko.observable(data.OfficeCd);
    self.OfficeName = ko.observable(data.OfficeName);
    self.Status = ko.observable(data.Status);
    self.SymbolNo = ko.observable(data.SymbolNo.toString());
    self.NameEnglish = ko.observable(data.NameEnglish);
    self.NameNepali = ko.observable(data.NameNepali);
    self.Dob = ko.observable(data.Dob);
    self.Gender = ko.observable(data.Gender);
    self.MStatus = ko.observable(data.MStatus);
    self.MStatusId = ko.observable(data.MStatusId);
    self.Contact = ko.observable(data.Contact);
    self.PostId = ko.observable(data.PostId);
    self.PostDesc = ko.observable(data.PostDesc);
    self.Level = ko.observable(data.Level);
    self.PersonImage = ko.observable(data.PersonImage);
    self.Action = ko.observable(data.Action);
    self.EntryBy = ko.observable(data.EntryBy);
    self.PageNumber = ko.observable(data.PageNumber);
    self.PageSize = ko.observable(data.PageSize);
    self.TotalPage = ko.observable(data.TotalPage);
    self.submissionNo = ko.observable(data.submissionNo);
};
var EmployeesViewModel = function () {
    var self = this;
    self.Employees = ko.observableArray([]);
    //self.filter = ko.observable();
    self.PageNumber = ko.observable(1);
    self.PageSize = ko.observable(10);
    self.TotalPage = ko.observable();
    self.submissionNo = ko.observable();
    self.SymbolNo = ko.observable();
    self.NameEng = ko.observable();
    self.searchSubClicked = ko.observable();
    self.SelectedEmployee = ko.observableArray([]);
    self.filter = ko.observable('');


    var stringStartsWith = function (string, startsWith) {
        string = string || "";
        console.log('stringValue',string);
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };



    self.LoadEmployee = function () {
        waitMsg("Loading");
        waitMsg.show();
        //debugger;
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/PIS/EmployeeSearchHandler.ashx',
            data: {
                'method': 'GetEmployeeRegistered', 'officeCode': $('#offcode').text(), 'pageNumber': ko.toJS(self.PageNumber())
                , 'pageSize': null
                , 'submissionNo': ko.toJS(self.submissionNo())
            },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                //waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        self.TotalPage(item.TotalPage);                        
                        return new Employee(item);
                    });
                    self.Employees(mappedTask);
                    waitMsg.hide();
                }
                else {
                    waitMsg.hide();
                }
            },
            error: function (err) {
                waitMsg.hide();
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }

    self.LoadEmployee();


    self.EditEmployee = function (employee) {
        self.SelectedEmployee(employee);
        window.location = "/Modules/PIS/EmployeeD.aspx?SubmissionNumber=" + ko.toJS(employee).submissionNo + "&MenuOptions=F&Editable=G"
    }

    self.AddEmployee = function () {
        window.location = "/Modules/PIS/EmployeeD.aspx?MenuOptions=F";
    };
    self.DeleteEmployee = function () {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();

                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/PIS/EmployeeRegistrationHandler.ashx',
                    data: { 'method': 'DeleteEmployee', 'SubmissionNo': ko.toJS(self.SelectedEmployee()).SubmissionNo },
                    success: function (result) {
                        waitMsg.hide();
                        if (result.IsSucess) {
                            self.Employess.remove(self.SelectedEmployee());
                            msg(result.Message);
                        }
                        else {

                        }

                    },
                    error: function (err) {
                        waitMsg.hide();
                        msg(err.status + "-" + err.statusText);
                    }
                });
            }
        });
    }

    function onChange(newPageValue) {
        self.PageNumber(newPageValue);
        self.LoadEmployee();

    }

    self.filteredItems = ko.computed(function () {
        var filter = self.filter().toLowerCase();
        console.log(filter);
        if (!filter) {
            return self.Employees();
        } else {
            self.submissionNo(filter);


            return ko.utils.arrayFilter(self.Employees(), function (item) {
                console.log(item);
                //self.submissionNo(item.SubmissionNo());
                //self.SymbolNo(item.SymbolNo());
                // self.NameEng(item.NameEnglish());
                // self.LoadEmployee();
                return stringStartsWith(item.SubmissionNo(), filter) ||
                    stringStartsWith(item.SymbolNo(), filter) ||
                    stringStartsWith(item.NameEnglish().toLowerCase(), filter);
                //console.log('filter');
                //return self.Employees();
            });
            return self.Employees();
        }
    }, self);

    self.TotalPage.subscribe(function (newValue) {
        $('#smart-paginator').smartpaginator({
            totalrecords: newValue,
            recordsperpage: 10,
            initval: 1,
            next: 'Next',
            prev: 'Prev',
            first: 'First',
            last: 'Last',
            theme: 'green',
            onchange: onChange
        });
    });
};

$(document).ready(function () {

    ValidateSession();
    var evm = new EmployeesViewModel();
    ko.applyBindings(evm);

});