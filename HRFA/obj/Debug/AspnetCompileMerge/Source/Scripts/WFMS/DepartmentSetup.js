/* File Created: October 3, 2016 */
/*********************************************************************************************************
<Name> Seleena Tandukar
/*********************************************************************************************************/

function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
        self.OfficeNameEng = ko.observable(data.OfficeNameEng);
        self.IRDCode = ko.observable(data.IRDCode);
        self.HouseNo = ko.observable(data.HouseNo);
        self.StreetName = ko.observable(data.StreetName);
        self.WardNo = ko.observable(data.WardNo);
        self.Vdc = ko.observable(data.Vdc);
        self.FaxNo = ko.observable(data.FaxNo);
        self.PhoneNo = ko.observable(data.PhoneNo);
        self.DistrictCode = ko.observable(data.DistrictCode);
        self.Email = ko.observable(data.Email);
        self.Address = ko.observable(data.Address);
        self.OfficeType = ko.observable(data.OfficeType);
        self.ParentID = ko.observable(data.ParentID);
        self.PayingOfficeCode = ko.observable(data.PayingOfficeCode);
        self.NewPayingOfficeCode = ko.observable(data.NewPayingOfficeCode);
        self.OfficeName = ko.observable(data.OfficeName);

    }
}


function Department(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCD = ko.observable(data.OfficeCD);
        self.DeptID = ko.observable(data.DeptID);
        self.DeptDesc = ko.observable(data.DeptDesc);
        self.ParentOffID = ko.observable(data.ParentOffID);
        self.ParentDeptID = ko.observable(data.ParentDeptID);
        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Action = ko.observable(data.Action);
    }

}
var DepartmentSetupViewModel = function () {
    var self = this;
    //Office 
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.OfficeNameEng = ko.observable();
    self.IRDCode = ko.observable();
    self.HouseNo = ko.observable();
    self.StreetName = ko.observable();
    self.WardNo = ko.observable();
    self.Vdc = ko.observable();
    self.FaxNo = ko.observable();
    self.PhoneNo = ko.observable();
    self.DistrictCode = ko.observable();
    self.Email = ko.observable();
    self.Address = ko.observable();
    self.OfficeType = ko.observable();
    self.ParentID = ko.observable();
    self.PayingOfficeCode = ko.observable();
    self.NewPayingOfficeCode = ko.observable();
    self.OfficeName = ko.observable();

    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();

    //Department
    self.OfficeCD = ko.observable();
    self.DeptID = ko.observable();
    self.DeptDesc = ko.observable();
    self.ParentOffID = ko.observable();
    self.ParentDeptID = ko.observable();
    self.Status = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.Action = ko.observable();

    self.Departments = ko.observableArray([]);
    self.SelectedDepartment = ko.observable();
    self.SelectedLstDepart = ko.observable();

    //--------------------------------------------------------------
    //NB: To Load all the offices 
    //--------------------------------------------------------------
    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'args': null },
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

    //--------------------------------------------------------------
    //NB: To Save the Department 
    //--------------------------------------------------------------
    self.SaveDepartment = function () {
        if (self.Validation()) {
            
            var args = {
                OfficeCD: self.SelectedOffice().OfficeCode,
                DeptDesc: self.DeptDesc(),
                ParentOffID: self.SelectedOffice().ParentID,
                DeptID: self.SelectedLstDepart() != undefined ? self.SelectedLstDepart().DeptID : null,
                ParentDeptID: self.SelectedDepartment() != undefined ? self.SelectedDepartment().DeptID : null,
                EntryBy: 'admin', // get the logged on user
                //ENTRY_DATE: '2016.10.04' // get todays date 
                Action: self.Action() == "E" ? "E" : "A"
            }

            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/COMMON/DepartmentHandler.ashx',

                data: { 'method': 'SaveDepartmentSetup', 'args': JSON.stringify(ko.toJS(args)) },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    msg(result.Message, "ALERT");
                    //self.Action('');
                    self.ClearControls();
                    self.GetDepartment();

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    //--------------------------------------------------------------
    //NB: To get Department according to office selected
    //--------------------------------------------------------------
    self.GetDepartment = function () {
        if (self.SelectedOffice() != undefined) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/COMMON/DepartmentHandler.ashx',

                data: { 'method': 'GetDepartment', 'officeCode': self.SelectedOffice().OfficeCode, 'deptID': null },
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
    }
    //--------------------------------------------------------------
    //NB: To get department details according to department selected
    //--------------------------------------------------------------
    self.GetDepartmentDetails = function () {
        if (self.SelectedLstDepart() != undefined) {
            self.Action("E");
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/COMMON/DepartmentHandler.ashx',

                data: { 'method': 'GetDepartment', 'officeCode': self.SelectedOffice().OfficeCode, 'deptID': self.SelectedLstDepart().DeptID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = result.ResponseData[0];
                    console.log("data", ko.toJS(data));
                    self.DeptDesc(data.DeptDesc);

                    var DepartIndex = 0;
                    var DeptID = data.ParentDeptID;
                    if (DeptID != 0) {
                        for (var j = 0; j < self.Departments().length; j++) {
                            if (ko.toJS(self.Departments()[j].DeptID) === DeptID) {
                                DepartIndex = j;

                            }
                        }
                        self.SelectedDepartment(self.Departments()[DepartIndex]);
                    }
                    else {
                        self.SelectedDepartment(null);
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    //--------------------------------------------------------------
    //NB: To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.DeptDesc("");
        self.DeptID("");
        self.ParentDeptID("");
        self.SelectedDepartment(null);
        self.SelectedLstDepart(null);
        self.Action("");
    }
    self.ClearAllControls = function () {
        self.ClearControls();
        self.Departments.removeAll();
        self.SelectedOffice(null);
    }

    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {
        self.DeptDesc($("#txtDeptDesc").val());
        var errMsg = "";
        var objFocus = null;
        if (Validate.empty(self.SelectedOffice())) {
            errMsg += "Please select the Office !!!<br>";
        }

        if (Validate.empty(self.DeptDesc())) {
            errMsg += "Please fill the Department Name !!!<br>";
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
    ko.applyBindings(new DepartmentSetupViewModel());
})