function EmpLeaveApplication(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.LeaveTypeID = ko.observable(data.LeaveTypeID);
    self.ApplicationDate = ko.observable(data.ApplicationDate);
    self.PostID = ko.observable(data.PostID);
    self.OfficeCD = ko.observable(data.OfficeCD);
    self.EFromDate = ko.observable(data.EFromDate);
    self.PFromDate = ko.observable(data.PFromDate);
    self.AppFromDate = ko.observable(data.AppFromDate);
    self.AppToDate = ko.observable(data.AppToDate);
    self.AppNoOfDays = ko.observable(data.AppNoOfDays);
    self.LeaveReason = ko.observable(data.LeaveReason);
    self.AppStatus = ko.observable(data.AppStatus);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.RStatus = ko.observable(data.RStatus);
    self.IsHalfDay = ko.observable(data.IsHalfDay);
}

function EmployeeLeaveDetail(data) {
    var self = this;
    self.LeaveTypeNameNep = ko.observable(data.LeaveTypeNameNep);
    self.TotalLeave = ko.observable(data.TotalLeave);
    self.AvailableLeave = ko.observable(data.AvailableLeave);
}

function LeaveType(data) {
    var self = this;
    self.LeaveTypeID = ko.observable(data.LeaveTypeID);
    self.LeaveTypeName = ko.observable(data.LeaveTypeName);
    self.LeaveTypeNameNep = ko.observable(data.LeaveTypeNameNep);
}

function PortalEmpApplicationViewModel() {
    var self = this;
    var empID = $("#empID").text();

    self.EmpID = ko.observable(empID);
    self.LeaveTypeID = ko.observable();
    self.ApplicationDate = ko.observable();
    self.PostID = ko.observable();
    self.OfficeCD = ko.observable();
    self.EFromDate = ko.observable();
    self.PFromDate = ko.observable();
    self.AppFromDate = ko.observable();
    self.AppToDate = ko.observable();
    self.AppNoOfDays = ko.observable();
    self.LeaveReason = ko.observable();
    self.AppStatus = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.RStatus = ko.observable();
    self.LeaveTypeID = ko.observable();
    self.LeaveTypeName = ko.observable();
    self.EmployeeName = ko.observable();
    self.TempEmpName = ko.observable();
    self.ForwardToID = ko.observable();
    self.ForwardToName = ko.observable();
    self.CheckSource = ko.observable();
    self.LeaveTypes = ko.observableArray([]);
    self.SelectedLeaveType = ko.observable();
    self.ANoOfDays = ko.observable();

    self.LeaveTypeID = ko.observable();
    self.LeaveTypeName = ko.observable();
    self.LeaveTypes = ko.observableArray([]);
    self.SelectedLeaveType = ko.observable();
    self.IsHalfDay = ko.observable(false);
    self.GetLeaveType = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/COMMON/LeaveTypeHandler.ashx',
            data: { 'method': 'GetLeaveType', 'LeaveTypeValues': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    if (item.LeaveTypeID !== 1)
                        return new LeaveType(item)

                });
                self.LeaveTypes(mappedTask);
                console.log(mappedTask);
            },
            error: function (err) {
                msg("Oops! error occured while obtaining data...", "WARNING");
            }
        });
    }
    self.EmployeeLeaveDetails = ko.observableArray([]);
    self.LeaveTypeChangeEvent = function (value) {
        if (self.SelectedLeaveType() === 2) {
            self.IsHalfDay(true);
        } else {
            self.IsHalfDay(false);
        }

        console.log('changed value', self.SelectedLeaveType());
    }
    self.GetEmployeeLeaveTypes = function (empID) {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/COMMON/LeaveTypeHandler.ashx',
            data: { 'method': 'GetEmployeeLeaves', 'EMPID': empID },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new EmployeeLeaveDetail(item)

                });
                self.EmployeeLeaveDetails([]);
                if (mappedTask !== null && mappedTask !== undefined) {
                    self.EmployeeLeaveDetails(mappedTask);
                }
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }
    /* 
     self.GetLeaveTypePostWise = function () {
         
         $.ajax({
             dataType: "json",
             cache: false,
             async: false,
             url: '../../../Handlers/PIS/EmpLeaveApplicationHandler.ashx',
             data: { 'method': 'GetPortalLeaveTypePostWise', 'empID': self.EmpID() },
             contentType: "application/json; charset=utf-8",
             success: function (result) {
                 var mappedTask = $.map(result.ResponseData, function (item) {
                     return new LeaveType(item.LeaveType)
                 });
                 self.LeaveTypes(mappedTask);
                 var data = result.ResponseData;
                 if (data.length > 0) {
                     self.PostID(data[0].PostID);
                     self.OfficeCD(data[0].OfficeCD);
                     self.PFromDate(data[0].PFromDate);
                 }
             },
             error: function (err) {
                 msg(err.status + " - " + err.statusText, "FAILURE");
             }
         });
     }
     */
    // self.GetLeaveTypePostWise();
    self.GetLeaveType();


    self.GetDateDifference = function (date1, date2) {
        if (date1 != undefined && date2 != undefined) {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
                data: { 'method': 'GetDaysDifferenceWithHoliday', 'date1': date1, 'date2': date2 },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var days = result.ResponseData;
                    if (days < 0) {
                        msg("Leave start date should be equal or smaller then leave end date");
                        self.AppToDate(null);
                        return;
                    }
                    var daysNepali = ((days));
                    self.AppNoOfDays(daysNepali);
                    self.ANoOfDays(daysNepali);

                },
                error: function (err) {
                    msg("Oops! error occured while obtaining data...", "WARNING");
                }
            });
        }
    }
    self.SaveApplication = function () {
        self.SetNepaliValues();
        if (self.ValidateApplication()) {
            var LeaveType = { LeaveTypeID: self.SelectedLeaveType() }
            var empLeaveApplication = {
                EmpID: self.EmpID(),
                LeaveType: LeaveType,
                ApplicationDate: self.ApplicationDate(),
                PostID: self.PostID(),
                //OfficeCD: self.OfficeCD(),
                OfficeCD: $("#officeCD").text(),
                EFromDate: self.EFromDate(),
                PFromDate: self.PFromDate(),
                AppFromDate: self.AppFromDate(),
                AppToDate: self.AppToDate(),
                AppNoOfDays: getNumEng(self.AppNoOfDays()),
                LeaveReason: self.LeaveReason(),
                AppStatus: "I",
                EntryBy: $("#userID").text(),
                EntryDate: null,
                RStatus: "I",
                ForwardedTo: self.ForwardToID(),
                Action: "A",
                IsHalfDay: self.IsHalfDay
            }

            var url = "../../Handlers/PIS/EmpLeaveApplicationHandler.ashx";
            var data = {
                'method': 'SavePortalEmpLeaveApplication', 'args': JSON.stringify(ko.toJS(empLeaveApplication))
            };
            console.log(data);
            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
                if (obj.Message === "Successfully Saved." || obj.Message === "Successfully Updated.") {
                    msg('Data saved!!!', "SUCCESSS");
                    self.ClearControl();
                } else {
                    debugger;
                    msg(" Oops! error occured while saving data ...", "FAILURE");
                }

            });
        }
    }

    self.ConvertDateToEnglish = function (date) {
        var dateElement = date.split(".");
        var day = getNumEng(dateElement[2]);
        var month = getNumEng(dateElement[1]);
        var year = getNumEng(dateElement[0]);

        return year + "." + month + "." + day;
    }

    self.IsNoofDays = function () {

        if (self.ANoOfDays() < self.AppNoOfDays()) {
            msg("Total no of days should be small or equals!!!");
        }
    }

    self.DisplayNoofDays = function () {
        self.SetNepaliValues();
        if (!Validate.empty(self.AppFromDate()) && !Validate.empty(self.AppToDate())) {
            self.GetDateDifference(self.AppFromDate(), self.AppToDate());
        }
    }

    self.ClearApplication = function () {
        self.ClearControl();
    }

    self.ValidateApplication = function () {
        var errMsg = "";

        if (Validate.empty(self.ApplicationDate())) {
            errMsg += "Please fill application date!!!\n";
        }
        if (Validate.empty(self.SelectedLeaveType())) {
            errMsg += "Please select leave type!!!\n";
        }
        if (Validate.empty(self.AppFromDate())) {
            errMsg += "Please fill leave start date!!!\n";
        }
        if (Validate.empty(self.AppToDate())) {
            errMsg += "Please fill leave end date!!!\n";
        }
        if (Validate.empty(self.AppNoOfDays())) {
            errMsg += "Please fill total days!!!\n";
        }
        if (Validate.empty(self.ForwardToID())) {
            errMsg += "Please select employee to forward!!!\n";
        }
        //        if (!Validate.empty(self.ForwardToID()) && !Validate.empty(self.EmpID())) {
        //            if (self.ForwardToID() == self.EmpID()) {
        //                errMsg += "फर्वार्ड गरिने कर्मचारी  र कर्मचारी मिल्दो जुल्दो हुँदैन !!!<br>";
        //            }
        //        }

        if (errMsg === "") {
            return true;
        }
        else {
            msg(errMsg, "WARNING");
            return false;
        }
    }

    self.ClearControl = function () {
        self.EmpID(null);
        self.ApplicationDate(null);
        self.AppFromDate(null);
        self.AppToDate(null);
        self.AppNoOfDays(null);
        self.LeaveReason(null);
        self.EmployeeName(null);
        self.ForwardToID(null);
        self.ForwardToName(null);
        self.SelectedLeaveType(null);
        self.TempEmpName(null);
        self.LeaveTypes([]);
    }

    self.SetNepaliValues = function () {
        self.ApplicationDate($("#txtApplicationDate").val());
        self.AppFromDate($("#txtFromDate").val());
        self.AppToDate($("#txtToDate").val());
        self.AppNoOfDays($("#txtNoofDays").val());
        self.LeaveReason($("#txtLeaveReason").val());
    }
    self.GetEmployeeLeaveTypes($("#empID").text());
    self.EmpID($("#empID").text());
    self.EmployeeName($("#UserName").text());

    $('#modalPortalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
    })

    $('#modalPortalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {


        }
        else if (self.CheckSource() === "forwardedto") {
            self.ForwardToID(GEmpID);
            self.ForwardToName(GEmpName);
        }
    })



}

$(document).ready(function () {
    PortalValidateSession();
    var pEmpLeaveAppViewModel = new PortalEmpApplicationViewModel();
    ko.applyBindings(pEmpLeaveAppViewModel, document.getElementById("PortalEmpLeaveApplication"));
})