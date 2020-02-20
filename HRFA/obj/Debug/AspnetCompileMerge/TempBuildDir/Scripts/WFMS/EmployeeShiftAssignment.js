/*****************************************************************************************
Copyright © HRFA , 2016
******************************************************************************************
Project              : Human Resource
File                 : EmployeeShiftAssignment.js
Description          : This File contains knockoutjs code to Save Employee Shift Assignment
*******************************************************************************************
<Name>                                          <Date>         
Sangam Pokhrel   		                      2016.10.18                                                          
*******************************************************************************************/

function EmployeeShift(data) {
    if (data != undefined) {
        var self = this;
        self.EmpID = ko.observable(data.EmpID);
        self.EmployeeName = ko.observable(data.EmployeeName);
        self.OfficeCode = ko.observable(data.Office.OfficeCode);
        self.OfficeNameNep = ko.observable(data.Office.OfficeNameNep);
        self.DeptID = ko.observable(data.Department.DeptID);
        self.DeptDesc = ko.observable(data.Department.DeptDesc);
        self.ShiftID = ko.observable(data.Shift.ShiftID);
        self.ShiftName = ko.observable(data.Shift.ShiftName);
        self.FromDate = ko.observable(data.Shift.FromDate);
        self.EmpShFromDate = ko.observable(data.EmpShFromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);
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
        self.FromDate = ko.observable(data.FromDate);
    }
}

function EmployeeShiftAssignmentViewModel() {
	var self = this;
	self.OfficeCode = ko.observable();
	self.DeptID = ko.observable();
	self.ShiftID = ko.observable();
	self.FromDate = ko.observable();
	self.EmpShFromDate = ko.observable();
	self.ToDate = ko.observable();
	self.EntryBy = ko.observable();
	self.EntryDate = ko.observable();
	self.Status = ko.observable();
	self.OfficeNameNep = ko.observable();
	self.DeptDesc = ko.observable();
	self.ShiftName = ko.observable();
	self.EmployeeName = ko.observable();
	self.EmpID = ko.observable();
	self.Action = ko.observable();
	self.EditMode = ko.observable(true);
	self.OfficeCD = ko.observable();
	self.Departments = ko.observableArray([])
	self.Shifts = ko.observableArray([]);
	self.EmployeeList = ko.observableArray([]);

	self.SelectedDepartment = ko.observable();
	self.SelectedShift = ko.observable();

	self.SaveEmployeeShift = function () {
	    if (self.ValidateShiftSubmit()) {
	        var employeeShifts = [];
	        for (var i = 0; i < self.EmployeeList().length; i++) {
	            var Office = { OfficeCode: self.EmployeeList()[i].OfficeCode };
	            var Department = { DeptID: self.EmployeeList()[i].DeptID };
                var Shift = {
                    ShiftID: self.EmployeeList()[i].ShiftID,
                    FromDate: self.EmployeeList()[i].FromDate
	            }

	            var employeeShift = {
	                EmpID: self.EmployeeList()[i].EmpID,
	                Office: Office,
	                Department: Department,
	                Shift: Shift,
	                EmpShFromDate: self.EmployeeList()[i].EmpShFromDate,
	                ToDate: null,
	                EntryBy: $("#user").text(),
	                EntryDate: null,
	                Status: "A",
	                Action: self.EmployeeList()[i].Action
	            }
	            employeeShifts.push(employeeShift);
	        }

	        var url = "../../../Handlers/WFMS/EmployeeShiftAssignmentHandler.ashx";
	        var data = { 'method': 'SaveEmployeeShiftAssignment', 'args': JSON.stringify(ko.toJS(employeeShifts)) };
	        $.post(url, data, function (result) {
	            var obj = jQuery.parseJSON(result);
	            msg(obj.Message);
	            if (obj.Message == "Successfully Saved." || obj.Message == "Successfully Updated.") {
	                self.ClearControl();
	            }
	        });
	    }
	}

	self.AddEmployeeShift = function () {
	    if (self.ValidateShiftAdd()) {
	        var Office = {
	            OfficeCode: self.OfficeCD(), 
                OfficeNameNep: self.OfficeNameNep()
                };
	        var Department = {
	            DeptID: self.SelectedDepartment().DeptID(),
	            DeptDesc: self.SelectedDepartment().DeptDesc()
                };
	        var Shift = {
	            ShiftID: self.SelectedShift().ShiftID(),
	            ShiftName: self.SelectedShift().ShiftName(),
	            FromDate: self.SelectedShift().FromDate()
	        }
	        var empListData = {
	            EmployeeName: self.EmployeeName(),
	            EmpID: self.EmpID(),
                EmpShFromDate: null,
	            Shift: Shift,
	            FromDate: self.SelectedShift().FromDate(),
	            Office: Office,
                Department: Department,
                Action: "A"
	        }
            //console.log(self.EmployeeList()[0].ShiftName());
	        for (var i = 0; i < self.EmployeeList().length; i++) {
	            if (empListData.EmpID == self.EmployeeList()[i].EmpID() && empListData.Shift.ShiftID == self.EmployeeList()[i].ShiftID() && empListData.Department.DeptID == self.EmployeeList()[i].DeptID()) {
	                msg("A Employee cannot be assigned the same shift twice !!!");
	                return;
	            }
	        }
	        self.EmployeeList.push(new EmployeeShift(empListData));
	    }
	}

	self.UpdateEmpShift = function () {
	    self.EditMode(true);
	}

	self.SelectEmpList = function (item) {
	    for (var i = 0; i < self.Departments().length; i++) {
	        if (item.DeptID() === self.Departments()[i].DeptID()) {
	            self.SelectedDepartment(self.Departments()[i]);
	        }
	    }
	    self.GetDepartmentShift();
	    //console.log(item);
	    for (var i = 0; i < self.Shifts().length; i++) {
	        if (item.ShiftID() === self.Shifts()[i].ShiftID()) {
	            self.SelectedShift(self.Shifts()[i]);
	        }
	    }
	}

	self.DelEmpList = function (item) {
	    if (item.Action() === "A") {
	        self.EmployeeList.pop(item);
	    }
	    else {
	        for (var i = 0; i < self.EmployeeList().length; i++) {
	            if (item.EmpID() === self.EmployeeList()[i].EmpID() && item.ShiftID() === self.EmployeeList()[i].ShiftID() && item.DeptID() === self.EmployeeList()[i].DeptID()) {
	                self.EmployeeList()[i].Action("E");
	            }
	        }
	    }
	    
	    //self.EmployeeList()[item]
	}

	self.CancelEmployeeShift = function () {
	    self.ClearControl();
	}

	self.GetEmployeeShift = function () {
	    if (self.EditMode() && self.OfficeCD() != undefined) {
	        $.ajax({
	            dataType: "json",
	            cache: false,
	            url: '../../../Handlers/WFMS/EmployeeShiftAssignmentHandler.ashx',
	            data: { 'method': 'GetEmployeeShift', 'empID': null },
	            contentType: "application/json; charset=utf-8",
	            success: function (result) {
	                var mappedTask = $.map(result.ResponseData, function (item) {
	                    return new EmployeeShift(item)
	                });
	                self.EmployeeList(mappedTask);
	            },
	            error: function (err) {
	                msg(err.status + " - " + err.statusText, "FAILURE");
	            }
	        });
	    }
	}

    self.GetDepartmentByOfficeCD = function () {
        if (self.OfficeCD() != undefined) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/COMMON/DepartmentHandler.ashx',
                data: { 'method': 'GetDepartment', 'officeCode': self.OfficeCD(), 'deptID': null },
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
        else {
            self.Departments([]);
            self.EmployeeList([]);
        }
    }

    self.GetDepartmentShift = function () {
        if (self.SelectedDepartment() != undefined) {
            waitMsg("Loading");
            waitMsg.show();
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/WFMS/EmployeeShiftAssignmentHandler.ashx',
                data: { 'method': 'GetDepartmentShift', 'officeCD': self.OfficeCD(), 'deptID': self.SelectedDepartment().DeptID() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Shift(item)
                    });

                    self.Shifts(mappedTask);
                    waitMsg.hide();
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
        else {
            self.Shifts([]);
        }
    }

	self.ValidateShiftAdd = function () {
	    var errMsg = "";

	    if (Validate.empty(self.SelectedDepartment())) {
	        errMsg += "Please select Department !!!\n";
	    }
	    if (Validate.empty(self.SelectedShift())) {
	        errMsg += "Please select Shift !!!\n";
	    }
	    if (Validate.empty(self.EmpID())) {
	        errMsg += "Please select Employee ID !!!\n";
	    }
	    
	    if (errMsg === "") {
	        return true;
	    }
	    else {
	         msg(errMsg,"WARNING");
	        return false;
	    }
	}

	self.ValidateShiftSubmit = function () {
	    var errMsg = "";
	    var lstChangeCnt = 0;
	    for (var i = 0; i < (ko.toJS(self.EmployeeList())).length; i++) {
	        if (ko.toJS(self.EmployeeList())[i].Action != null) {
	            lstChangeCnt++;
	        }
	    }
	    if (Validate.empty(self.EmployeeList())) {
	        errMsg = "Please add Employee Shift !!!\n";
	    }
	    else if (lstChangeCnt === 0) {
	        errMsg = "Please either Add or Remove the Employee shift!!!\n";
	    }
	    if (errMsg === "") {
	        return true;
	    }
	    else {
	         msg(errMsg,"WARNING");
	        return false;
	    }
	}

	self.ClearControl = function () {
	    self.SelectedDepartment("");
	    self.SelectedShift("");
	    self.EmpID("");
	    self.EmployeeName("");
	    self.Departments([]);
	    self.EmployeeList([]);
	    self.OfficeCD(null);
	    self.EditMode(true);
	}

	$('#modalEmpSearch').on('hidden.bs.modal', function () {
	    self.EmpID(GEmpID);
	    self.EmployeeName(GEmpName);
	    self.OfficeCD(GOfficeCD);
	    self.OfficeNameNep(GOfficeName);
	    self.GetDepartmentByOfficeCD();
	    self.GetEmployeeShift();
	})
}

$(document).ready(function () {
    ValidateSession();
	var employeeShiftAssignmentViewModel = new EmployeeShiftAssignmentViewModel();
	ko.applyBindings(employeeShiftAssignmentViewModel, document.getElementById("EmpShiftAssignmentForm"));		
})