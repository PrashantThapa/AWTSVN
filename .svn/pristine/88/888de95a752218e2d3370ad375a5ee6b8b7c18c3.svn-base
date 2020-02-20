

function OfficeSetup(data) {
    var self = this;
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
    self.ParentOffice = ko.observable(data.ParentOffice);

    self.Action = ko.observable(data.Action);
};

function OfficeSetupViewModel() {
    var self = this;
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.OfficeNameEng = ko.observable();

    self.PhoneNo = ko.observable();
    self.Email = ko.observable();
    self.Address = ko.observable();
    self.ParentID = ko.observable();
    self.PayingOffCode = ko.observable();
    self.NewPayingOffCode = ko.observable();
    self.OffName = ko.observable(); 
    self.Action = ko.observable();


    self.ParentOrganization = ko.observableArray([]);
    self.SelectedParentOrganization = ko.observable();
    
    self.Offices = ko.observableArray([]);
    self.OfficeUserArray = ko.observableArray([]);
    self.SelectedOffice = ko.observable();

    self.selectedItem = ko.observable();
    self.getFocused = ko.observable();
    self.setFocus = ko.observable();

    self.GetOfficeDetails = function () {
        if (self.SelectedOffice() != undefined) {

            var btnSave = $("#btnSave");
            btnSave.text('Update');

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
                data: { 'method': 'GetAllOffice', 'officeCode': self.SelectedOffice() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
  
                    var data = result.ResponseData[0];
                    self.OfficeNameNep(data.OfficeNameNep);
                    self.Address(data.Address);
                    self.PhoneNo(data.PhoneNo);
                    self.Email(data.Email);
                    self.SelectedParentOrganization(data.ParentOffice.OfficeCode);

                },

                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }

            });
        }

        else {
            self.ClearControl();
            var btnSave = $("#btnSave");
            btnSave.text('Save');

        }
    }
    
    //GetOffices 

    self.GetOffices = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new OfficeSetup(item)
                });

                self.Offices(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }

        });
    } 

    self.DeleteOffice = function (officesetup) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
              $.ajax({
                type: 'GET',
                dataType: "json",
                cache: false,
                url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
                data: { 'method': 'DeleteOffice', 'officeCode': officesetup.SelectedOffice, 'token': $("#token").text() },
                contentType: "application/json; character=utf-8",
                success: function (result) {
                    waitMsg.hide();
                    msg(result.Message);

                    if (result.IsSucess) {
                        msg(result.Message);
                        self.GetOffices();
                    }
                    else {
                        if (!result.IsToken)
                            msg(result.Message, "WARNING", null, ClearSession);
                        else
                            msg(result.Message, "WARNING");
                    }

                },
                error: function (err) {
                    waitMsg.hide();
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
                });
            }
        });
    }
    //SaveOffice

    self.SaveOffice = function () {
        self.SetNepali();
//        if (self.Validation()) {
            if ($("#btnSave").text() == 'Save') {

                parentOffice = {
                    OfficeCode: self.SelectedParentOrganization()
                }
                var row = {
                    OfficeCode: null,
                    OfficeNameNep: self.OfficeNameNep(),
                    Address: self.Address(),
                    PhoneNo: self.PhoneNo(),
                    Email: self.Email(),
                    ParentOffice: parentOffice,
                    Action: "A"
                }; /// <reference path="../../Modules/WFMS/ShiftSetup.aspx" />


                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
                    data: { 'method': 'SaveOffice', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
                            msg(result.Message);
                            self.ClearControl();
                            self.GetOffices();
                        }
                        else {
                            msg(result.Message);
                        }
                    },
                    error: function (err) {
                        msg("Failed error");
                        //console.log(err);
                    }
                });
            }
            else {
                parentOffice = {
                    OfficeCode: self.SelectedParentOrganization()
                }
                var row = {
                    OfficeCode: self.SelectedOffice(),
                    OfficeNameNep: self.OfficeNameNep(),
                    Address: self.Address(),
                    PhoneNo: self.PhoneNo(),
                    Email: self.Email(),
                    ParentOffice: parentOffice,
                    Action: "E"
                }; /// <reference path="../../Modules/WFMS/ShiftSetup.aspx" />


                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
                    data: { 'method': 'SaveOffice', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
                            msg(result.Message);
                            self.ClearControl();
                            self.GetOffices();
                        }
                        else {
                            msg(result.Message);
                        }
                    },
                    error: function (err) {
                        msg("Failed error");
                        //console.log(err);
                    }
                });

            }
//        }
    }
    self.Validation = function () {
        var errMsg = "";

        if (Validate.empty(self.OfficeNameNep())) {
            errMsg += "Please fill Office Name!!!\n";

        }
        if (Validate.empty(self.Address())) {
            errMsg += "Please fill Office Address!!!\n";

        }
        if (Validate.empty(self.PhoneNo())) {
            errMsg += "Please fill Office Phone no.!!!\n";

        }
        if (Validate.empty(self.Email())) {
            errMsg += "Please fill Office Email !!!\n";

        }

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }

    }

    self.CancelOffice = function () {
        self.ClearControl();
        console.log(self.SelectedParentOrganization());
    }

    self.ClearControl = function () {
        self.OfficeNameNep("");
        self.Address("");
        self.PhoneNo("");
        self.Email("");

        self.SelectedOffice("");
        self.SelectedParentOrganization("");
    }

    

    self.SetNepali = function () {
        self.OfficeNameNep($("#txtOfficeName").val());
        self.Address($("#txtOfficeAddress").val());
        self.PhoneNo($("#txtOfficePhone").val());
//        self.Email($("#txtOfficeEmail").val());
    }



    self.GetOffices();
};

$(document).ready(function () {
    ValidateSession();
ko.applyBindings(new OfficeSetupViewModel());

})