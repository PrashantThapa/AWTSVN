//function EmployeeSearchSpecificModal(data) {
//    if (data != undefined) {
//        var self = this;
//        self.SymbolNo = ko.observable(data.SymbolNo);
//        self.EmpID = ko.observable(data.EmpID);
//        self.EmpName = ko.observable(data.EmployeeName);
//        self.OfficeName = ko.observable(data.Office.OfficeNameNep);
//        self.OfficeCD = ko.observable(data.Office.OfficeCode);
//        self.PostID = ko.observable(data.Post.PostID);
//        self.PostDesc = ko.observable(data.Post.PostDesc);
//        self.PostSeq = ko.observable(data.OfficeDarabandi.PostSeq);
//    }
//}

//function OfficeSearchSpecificModal(data) {
//    if (data != undefined) {
//        var self = this;
//        self.OfficeCode = ko.observable(data.OfficeCode);
//        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
//        self.OfficeNameEng = ko.observable(data.OfficeNameEng);
//    }
//}

////Global Variables Declare
//var GEmpID;
//var GEmpName;
//var GOfficeCD;
//var GOfficeName;
//var GPostID;
//var GPostDesc;
//var GPostSeq;
//var GFormID = null;

//function EmployeeSearchViewModel() {
//    var self = this;
//    self.EmpID = ko.observable();
//    self.EmpName = ko.observable();
//    self.FirstNameNep = ko.observable();
//    self.MiddleNameNep = ko.observable();
//    self.LastNameNep = ko.observable();
//    self.FirstNameEng = ko.observable();
//    self.MiddleNameEng = ko.observable();
//    self.LastNameEng = ko.observable();
//    self.Offices = ko.observable();
//    self.SelectedOffice = ko.observable();
//    self.EmployeeList = ko.observableArray([]);

//    self.GetOffices = function () {
//        if (GFormID === null) {
//            $('#tblEmpSearchRes th:nth-child(2)').show();
//            $('#divOfficeList').show();
//            GOfficeCD = $("#officeCD").text();
            
//            $.ajax({
//                dataType: "json",
//                cache: false,
//                url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
//                data: { 'method': 'GetPortalOffice', 'officeCode': GOfficeCD },
//                contentType: "application/json; charset=utf-8",
//                success: function (result) {
//                    var mappedTask = $.map(result.ResponseData, function (item) {
//                        return new OfficeSearchSpecificModal(item)
//                    });

//                    self.Offices(mappedTask);
//                },
//                error: function (err) {
//                    msg(err.status + " - " + err.statusText, "FAILURE");
//                }

//            });
//        }
//    }

//    self.SearchEmployee = function () {
//        self.SetNepaliValue();
//        if (self.Validation()) {
//            var person = {
//                FirstName: self.FirstNameNep(),
//                MiddleName: self.MiddleNameNep(),
//                LastName: self.LastNameNep(),
//                FirstNameEn: self.FirstNameEng(),
//                MiddleNameEn: self.MiddleNameEng(),
//                LastNameEn: self.LastNameEng()
//            }

//            var Office = { OfficeCode: self.SelectedOffice() };
//            var employee = {
//                SymbolNo: self.EmpID(),
//                Office: Office,
//                Person: person,
//                FormID: GFormID
//            }
//            $.ajax({
//                dataType: "json",
//                cache: false,
//                url: '../../../Handlers/PIS/EmployeeSearchHandler.ashx',
//                data: { 'method': 'SearchPortalEmployee', 'args': JSON.stringify(employee) },
//                contentType: "application/json; charset=utf-8",
//                success: function (result) {
//                    if (result.ResponseData.length == 0) {
//                        if (!Validate.empty(self.SelectedOffice()) && Validate.empty(self.EmpID()) &&
//                            Validate.empty(self.FirstNameNep()) && Validate.empty(self.MiddleNameNep()) &&
//                            Validate.empty(self.LastNameNep()) && Validate.empty(self.FirstNameEng()) &&
//                            Validate.empty(self.FirstNameEng()) && Validate.empty(self.MiddleNameEng()) &&
//                            Validate.empty(self.LastNameEng())) {
//                            msg("यस कार्यालयमा कुनै पनि कर्मचारी छैनन्!");
//                        }
//                        else if (Validate.empty(self.SelectedOffice())) {
//                            msg("उक्त कर्मचारीको बिवरण डेटाबेसमा छैन!");
//                        }
//                        else {
//                            msg("यस कार्यालयमा उक्त कर्मचारीको बिवरण छैन!")
//                        }
//                    }
//                    var mappedTask = $.map(result.ResponseData, function (item) {
//                        return new EmployeeSearchSpecificModal(item)
//                    });
//                    self.EmployeeList(mappedTask);
//                    if (GFormID === 'A') {
//                        $('#tblEmpSearchRes td:nth-child(2)').hide();
//                    }
//                },
//                error: function (err) {
//                    msg(err.status + " - " + err.statusText, "FAILURE");
//                }
//            });
//        }
//    }

//    self.SelectEmployee = function (item) {
//        GEmpID = item.EmpID();
//        GEmpName = item.EmpName();
//        GOfficeCD = item.OfficeCD();
//        GOfficeName = item.OfficeName();
//        GPostID = item.PostID();
//        GPostDesc = item.PostDesc();
//        GPostSeq = item.PostSeq();
//        $('#modalPortalEmpSearch').modal('toggle');
//        GFormID = null;
//    }

//    self.ClearEmployee = function () {
//        self.SetNepaliValue();
//        self.ClearControl();
//    }

//    self.Validation = function () {
//        var errMsg = "";

//        if (Validate.empty(self.EmpID()) &&
//            Validate.empty(self.FirstNameNep()) &&
//            Validate.empty(self.MiddleNameNep()) &&
//            Validate.empty(self.LastNameNep()) &&
//            Validate.empty(self.FirstNameEng()) &&
//            Validate.empty(self.MiddleNameEng()) &&
//            Validate.empty(self.LastNameEng()) &&
//            Validate.empty(self.SelectedOffice())) {
//            errMsg += "कृपया कम्तिमा एक क्षेत्र भर्नुहोस्!\n";
//        }

//        if (errMsg === "") {
//            return true;
//        }
//        else {
//             msg(errMsg,"WARNING");
//            return false;
//        }
//    }

//    self.SetNepaliValue = function () {
//        if ($("#txtEmpID").val() != "") {
//            self.EmpID($("#txtEmpID").val());
//        }
//        else {
//            self.EmpID(null);
//        }
//        if ($("#txtFirstNameNep").val() != "") {
//            self.FirstNameNep($("#txtFirstNameNep").val());
//        }
//        else {
//            self.FirstNameNep(null);
//        }
//        if ($("#txtMiddleNameNep").val() != "") {
//            self.MiddleNameNep($("#txtMiddleNameNep").val());
//        }
//        else {
//            self.MiddleNameNep(null);
//        }
//        if ($("#txtLastNameNep").val() != "") {
//            self.LastNameNep($("#txtLastNameNep").val());
//        }
//        else {
//            self.LastNameNep(null);
//        }
//    }

//    self.ClearControl = function () {
//        self.EmpID(null);
//        self.FirstNameNep(null);
//        self.MiddleNameNep(null);
//        self.LastNameNep(null);
//        self.FirstNameEng(null);
//        self.MiddleNameEng(null);
//        self.LastNameEng(null);
//        self.EmployeeList([]);
//        self.SelectedOffice(null);
//    }
//    $('#modalPortalEmpSearch').on('shown.bs.modal', function () {
//        self.GetOffices();
//    })

//}

//$(document).ready(function () {

//    PortalValidateSession();
//    var employeeSearchViewModel = new EmployeeSearchViewModel();
//    ko.applyBindings(employeeSearchViewModel, document.getElementById("modalPortalEmpSearch"));

//})

function EmployeeSearchSpecificModal(data) {
    console.log('employeeData', data);
    if (data != undefined) {
        var self = this;
        self.SymbolNo = ko.observable(data.SymbolNo);
        self.EmpID = ko.observable(data.EmpID);
        self.EmpName = ko.observable(data.EmployeeName);
        self.OfficeName = ko.observable(data.Office.OfficeNameNep);
        self.OfficeCD = ko.observable(data.Office.OfficeCode);
        self.PostID = ko.observable(data.Post.PostID);
        self.PostDesc = ko.observable(data.Post.PostDesc);
        self.PostSeq = ko.observable(data.OfficeDarabandi.PostSeq);
    }
}

function OfficeSearchSpecificModal(data) {
    if (data != undefined) {
        var self = this;
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
        self.OfficeNameEng = ko.observable(data.OfficeNameEng);
    }
}

//Global Variables Declare
var GEmpID;
var GEmpName;
var GOfficeCD;
var GOfficeName;
var GPostID;
var GPostDesc;
var GPostSeq;
var GFormID = null;

function EmployeeSearchViewModel() {
    var self = this;
    self.EmpID = ko.observable();
    self.EmpName = ko.observable();
    self.FirstNameNep = ko.observable();
    self.MiddleNameNep = ko.observable();
    self.LastNameNep = ko.observable();
    self.FirstNameEng = ko.observable();
    self.MiddleNameEng = ko.observable();
    self.LastNameEng = ko.observable();
    self.Offices = ko.observable();
    self.SelectedOffice = ko.observable();
    self.EmployeeList = ko.observableArray([]);

    self.GetOffices = function () {
        if (GFormID === null) {
            $('#tblEmpSearchRes th:nth-child(2)').show();
            $('#divOfficeList').show();
            GOfficeCD = $("#officeCD").text();

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
                data: { 'method': 'GetPortalOffice', 'officeCode': GOfficeCD },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new OfficeSearchSpecificModal(item)
                    });

                    self.Offices(mappedTask);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }

            });
        }
    }

    self.SearchEmployee = function () {
        self.SetNepaliValue();
        if (self.Validation()) {
            var person = {
                FirstName: self.FirstNameNep(),
                MiddleName: self.MiddleNameNep(),
                LastName: self.LastNameNep(),
                FirstNameEn: self.FirstNameEng(),
                MiddleNameEn: self.MiddleNameEng(),
                LastNameEn: self.LastNameEng()
            }

            var Office = { OfficeCode: self.SelectedOffice() };
            var employee = {
                SymbolNo: self.EmpID(),
                Office: Office,
                Person: person,
                FormID: GFormID
            }
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/PIS/EmployeeSearchHandler.ashx',
                data: { 'method': 'SearchPortalEmployee', 'args': JSON.stringify(employee) },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.ResponseData.length == 0) {
                        if (!Validate.empty(self.SelectedOffice()) && Validate.empty(self.EmpID()) &&
                            Validate.empty(self.FirstNameNep()) && Validate.empty(self.MiddleNameNep()) &&
                            Validate.empty(self.LastNameNep()) && Validate.empty(self.FirstNameEng()) &&
                            Validate.empty(self.FirstNameEng()) && Validate.empty(self.MiddleNameEng()) &&
                            Validate.empty(self.LastNameEng())) {
                            msg("No employee in this office");
                        }
                        else if (Validate.empty(self.SelectedOffice())) {
                            msg("No information of this information on the database!");
                        }
                        else {
                            msg("No information about this employee in this office")
                        }
                    }
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new EmployeeSearchSpecificModal(item)
                    });
                    self.EmployeeList(mappedTask);
                    if (GFormID === 'A') {
                        $('#tblEmpSearchRes td:nth-child(2)').hide();
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.SelectEmployee = function (item) {
        GEmpID = item.EmpID();
        GEmpName = item.EmpName();
        GOfficeCD = item.OfficeCD();
        GOfficeName = item.OfficeName();
        GPostID = item.PostID();
        GPostDesc = item.PostDesc();
        GPostSeq = item.PostSeq();
        $('#modalPortalEmpSearch').modal('toggle');
        GFormID = null;
    }

    self.ClearEmployee = function () {
        self.SetNepaliValue();
        self.ClearControl();
    }

    self.Validation = function () {
        var errMsg = "";

        if (Validate.empty(self.EmpID()) &&
            Validate.empty(self.FirstNameNep()) &&
            Validate.empty(self.MiddleNameNep()) &&
            Validate.empty(self.LastNameNep()) &&
            Validate.empty(self.FirstNameEng()) &&
            Validate.empty(self.MiddleNameEng()) &&
            Validate.empty(self.LastNameEng()) &&
            Validate.empty(self.SelectedOffice())) {
            errMsg += "Please fill atleast one field!\n";
        }

        if (errMsg === "") {
            return true;
        }
        else {
            msg(errMsg, "WARNING");
            return false;
        }
    }

    self.SetNepaliValue = function () {
        if ($("#txtEmpID").val() != "") {
            self.EmpID($("#txtEmpID").val());
        }
        else {
            self.EmpID(null);
        }
        if ($("#txtFirstNameNep").val() != "") {
            self.FirstNameNep($("#txtFirstNameNep").val());
        }
        else {
            self.FirstNameNep(null);
        }
        if ($("#txtMiddleNameNep").val() != "") {
            self.MiddleNameNep($("#txtMiddleNameNep").val());
        }
        else {
            self.MiddleNameNep(null);
        }
        if ($("#txtLastNameNep").val() != "") {
            self.LastNameNep($("#txtLastNameNep").val());
        }
        else {
            self.LastNameNep(null);
        }
    }

    self.ClearControl = function () {
        self.EmpID(null);
        self.FirstNameNep(null);
        self.MiddleNameNep(null);
        self.LastNameNep(null);
        self.FirstNameEng(null);
        self.MiddleNameEng(null);
        self.LastNameEng(null);
        self.EmployeeList([]);
        self.SelectedOffice(null);
    }
    $('#modalPortalEmpSearch').on('shown.bs.modal', function () {
        self.GetOffices();
    })

}

$(document).ready(function () {

    PortalValidateSession();
    var employeeSearchViewModel = new EmployeeSearchViewModel();
    ko.applyBindings(employeeSearchViewModel, document.getElementById("modalPortalEmpSearch"));

})





