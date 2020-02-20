

function Office(data) {
    if (data != undefined) {
        var self = this;
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function Department(data) {
    if (data != undefined) {
        var self = this;
        self.DeptID = ko.observable(data.DeptID);
        self.DeptDesc = ko.observable(data.DeptDesc);
    }
}

function Shift(data) {
    if (data != undefined) {
        var self = this;
        self.ShiftID = ko.observable(data.ShiftID);
        self.ShiftName = ko.observable(data.ShiftName);
        self.makecheck = ko.observable(false);
        self.FromDate = ko.observable(data.FromDate);
        self.Action = ko.observable(data.Action);
    }
}
function ShiftTemp(data) {
    if (data != undefined) {
        var self = this;
        self.ShiftID = ko.observable(data.ShiftID);
        self.ShiftName = ko.observable(data.ShiftName);
        self.makecheck = ko.observable(false);
        self.FromDate = ko.observable(data.FromDate);
        self.Action = ko.observable(data.Action);
    }
}


function DepartmentWiseShiftViewModel() {
    var self = this;
    self.DeptID = ko.observable();
    self.DeptDesc = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.DepartmentName = ko.observable();
    self.ShiftName = ko.observable();
    self.ShiftID = ko.observable();
    self.Action = ko.observable("A");
    self.ShiftsMap = ko.observableArray([]);
    self.Offices = ko.observableArray([]);
    self.Departments = ko.observableArray([])
    self.Shifts = ko.observableArray([]);
    self.makecheck = ko.observableArray([]);
    self.FromDate =ko.observable();
    self.SelectedOffice = ko.observable();
    self.SelectedDepartment = ko.observable();
    self.SelectedShift = ko.observable();

    self.ShiftModuleFnToAdd = ko.observableArray([]);


    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.ToDate = ko.observable();
    self.FromDate = ko.observable();
    self.Status = ko.observable("F");
    self.ClearControlShift = function () {
        self.ClearControl();
    }

    self.ToggletoADD = function (data) {

        var action;

        console.log(data.Action());
        if (data.Action() == "E") {

            if (data.makecheck() == false) {
                var newAddedValue = {
                    ShiftID: data.ShiftID(),
                    ShiftName: data.ShiftName(),
                    FromDate: data.FromDate(),
                    Action: "E"
             };

                self.ShiftModuleFnToAdd.push(newAddedValue);
            }

        }
        else {
            if ((data.Action() == "" || data.Action() == null) && data.makecheck() == true) {

                action = "A";
                var newAddedValue = {
                    ShiftID: data.ShiftID(),
                    ShiftName: data.ShiftName(),
                    FromDate: data.FromDate(),
                    Action: action

                };
                self.ShiftModuleFnToAdd.push(newAddedValue);
                
            }
            else {

                action = "D";

                self.ShiftModuleFnToAdd.remove(function (remove) {
                    return remove.ShiftID == ko.toJS(data).ShiftID;
                });
                
            }
        }

    }

       
    self.GetOffice = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
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
    }

    self.GetDepartmentByOfficeCD = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/Common/DepartmentHandler.ashx',
            data: { 'method': 'GetDepartment', 'officeCode': self.SelectedOffice(), 'deptID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Department(item)
                });

                self.Departments(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }

        });
    }

    self.GetDepartmentShift = function () {
        waitMsg("Loading");
        waitMsg.show();
        self.Shifts.removeAll();
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/Common/ShiftHandler.ashx',
            data: { 'method': 'GetShift' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new Shift(item)
                });
                self.Shifts.removeAll();
                self.Shifts(mappedTask);
                waitMsg.hide();
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }
    self.GetShifts = function () {

        if (self.SelectedDepartment() == "" || self.SelectedDepartment() == undefined) {
            for (var i = 0; i < self.Shifts().length; i++) {

                self.Shifts()[i].makecheck(false);
            };
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../Handlers/WFMS/EmployeeShiftAssignmentHandler.ashx',
                data: { 'method': 'GetDepartmentShift', 'officeCD': self.SelectedOffice(), 'deptID': self.SelectedDepartment() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new ShiftTemp(item)
                    });

                    self.ShiftsMap.removeAll();

                    self.ShiftsMap(mappedTask);
                    for (var i = 0; i < self.Shifts().length; i++) {

                        self.Shifts()[i].makecheck(false);
                        self.Shifts()[i].Action("");
                        self.Shifts()[i].makecheck(false);
                        for (var j = 0; j < self.ShiftsMap().length; j++) {


                            if (self.Shifts()[i].ShiftID() == self.ShiftsMap()[j].ShiftID()) {

                                self.Shifts()[i].FromDate(self.ShiftsMap()[j].FromDate());
                                self.Shifts()[i].Action("E");
                                self.Shifts()[i].makecheck(true);

                            }

                        }

                    };
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
      
    }

    self.Validate = function () {
        var errMsg = "";

        if (self.SelectedOffice() == "" || self.SelectedOffice() == undefined) {
            errMsg += "Please select Office !!!\n";
        }
        if (self.SelectedDepartment() == "" || self.SelectedDepartment() == undefined ) {

            errMsg += "Please select Department !!!\n";
        }
        if (ko.toJS(self.ShiftModuleFnToAdd()) == "" ||ko.toJS(self.ShiftModuleFnToAdd())== undefined ){
            errMsg += "Please select Shift !!!<br>";
        }
        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.SaveDeptWiseShift = function () {


        if (self.Validate()) {

           
            OfficeArray = {
                OfficeCode: self.SelectedOffice()
            }
            DeptArray = {
                DeptID: self.SelectedDepartment()
            }

            var args = {
                Office: OfficeArray,
                Dept: DeptArray,
                ShiftList: ko.toJS(self.ShiftModuleFnToAdd()),
                Action: self.Action(),
                EntryBy: self.EntryBy(),
                EntryDate: self.EntryDate(),
                Status: self.Status(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate()

            };



            method = 'SaveDeptWiseShiftType';
            var url = '../../../Handlers/WFMS/DeptWiseShiftHandler.ashx';

            var data = { 'method': method, 'args': JSON.stringify(args) };
            $.post(url, data,
                        function (result) {
                            waitMsg.hide();
                            var obj = jQuery.parseJSON(result);
                            msg(obj.Message, "ALERT");
                            self.ClearControl();


                        });
        }

    };
    self.CancelDeptWiseShift = function () {
        self.ClearControl();
        

    }
    self.ClearControl = function () {
        self.SelectedOffice("");
        self.SelectedDepartment("");
        self.SelectedShift("");
        self.ShiftModuleFnToAdd.removeAll();
        for (var i = 0; i < self.Shifts().length; i++) {

            self.Shifts()[i].makecheck(false);
        };

    }
   


    self.GetOffice();
    self.GetDepartmentShift();
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(DepartmentWiseShiftViewModel);
})