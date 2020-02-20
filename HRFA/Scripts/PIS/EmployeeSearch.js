function EmployeeSearchSpecificModal(data) {
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


function EmployeeListAll(data) {
    if (data != undefined) {
        var self = this;
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameEng = ko.observable(data.OfficeNameEng);
        self.FnameNep = ko.observable(data.FnameNep);
        self.LnameNep = ko.observable(data.LnameNep)
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
    self.SymbolNo = ko.observable();
    self.PageNumber = ko.observable();
    self.PageSize = ko.observable();
    //    self.Office = ko.observable();
    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();
    self.EmployeeList = ko.observableArray([]);
    self.EmployeeListsAll = ko.observableArray([]);

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();

    self.GetOffices = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new OfficeSearchSpecificModal(item)
                });

                self.Offices(mappedTask);
            },
            error: function (err) {
                msg("Error occured while obtaining data...", "WARNING");
            }

        });
    }

    self.GetEmployeelist = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/PIS/EmployeeSearchHandler.ashx',
            data: { 'method': 'GetEmployeelist', 'PageNumber': '1', 'PageSize': '10' },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new EmployeeListAll(item)
                });

                self.EmployeeListsAll(mappedTask);
            },
            error: function (err) {
                msg("Error occured while obtaining data...", "WARNING");
            }

        });
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

            var office = { OfficeCode: self.SelectedOffice() }

            var employee = {
                SymbolNo: self.SymbolNo(),
                Office: office,
                Person: person,
                FormID: GFormID
            }

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/PIS/EmployeeSearchHandler.ashx',
                data: { 'method': 'SearchEmployee', 'args': JSON.stringify(employee) },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new EmployeeSearchSpecificModal(item)
                    });
                    self.EmployeeList(mappedTask);
                    if (GFormID === 'A') {
                        $('#tblEmpSearchRes td:nth-child(2)').hide();
                    }
                },
                error: function (err) {
                    msg("Error occured while obtaining data...", "WARNING");
                }
            });
        }
    }


    self.GetOffices();
    //self.GetEmployeelist();
    


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

            var office = { OfficeCode: self.SelectedOffice() }

            var employee = {
                SymbolNo: self.SymbolNo(),
                Office: office,
                Person: person,
                FormID: GFormID
            }

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/PIS/EmployeeSearchHandler.ashx',
                data: { 'method': 'SearchEmployee', 'args': JSON.stringify(employee) },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.ResponseData !== null && result.ResponseData !== undefined && result.ResponseData.length == 0) {
                        if (!Validate.empty(self.SelectedOffice()) && Validate.empty(self.EmpID()) &&
                            Validate.empty(self.FirstNameNep()) && Validate.empty(self.MiddleNameNep()) &&
                            Validate.empty(self.LastNameNep()) && Validate.empty(self.FirstNameEng()) &&
                            Validate.empty(self.FirstNameEng()) && Validate.empty(self.MiddleNameEng()) &&
                            Validate.empty(self.LastNameEng())) {
                            msg("This office doesnot have any employee!", "WARNING");
                        }
                        else if (Validate.empty(self.SelectedOffice())) {
                            msg("This office doesnot have any information of this employee", "WARNING");
                        }
                        else {
                            msg("This office doesnot have any information of this employee", "WARNING");
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
                    msg("Error occured while obtaining data...", "WARNING");
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
        $('#modalEmpSearch').modal('toggle');
        GFormID = null;
    }

    self.ClearEmployee = function () {
        self.SetNepaliValue();
        self.ClearControl();
    }

    self.Validation = function () {
        var errMsg = "";

        if (GFormID !== 'A') {
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
    $('#modalEmpSearch').on('shown.bs.modal', function () {
        self.GetOffices();
        self.SearchEmployee();
    })

}

$(document).ready(function () {

    //ValidateSession();
    var employeeSearchViewModel = new EmployeeSearchViewModel();
    ko.applyBindings(employeeSearchViewModel, document.getElementById("modalEmpSearch"));

})


