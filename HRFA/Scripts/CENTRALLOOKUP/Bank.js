//-----------------------------------------//
// Coded by: Om Shrestha   2016.12.18
//-----------------------------------------//

function Bank(data) {
    var self = this;

    self.BankID = ko.observable(data.BankID);
    self.BankName = ko.observable(data.BankName);
    self.BankNameEn = ko.observable(data.BankNameEn);
    self.BankCategory = ko.observable(data.BankCategory);
    self.BankAddress = ko.observable(data.BankAddress);
    self.BankAddressEn = ko.observable(data.BankAddressEn);
    self.Status = ko.observable(data.Status);
    self.FromDate = ko.observable(data.FromDate);
    self.Action = ko.observable(data.Action);
    self.EntryBy = ko.observable(data.EntryBy);

};

function BankViewModel() {

    var self = this;

    self.BankID = ko.observable();
    self.BankName = ko.observable();
    self.BankNameEn = ko.observable();
    self.BankCategory = ko.observable();
    self.BankAddress = ko.observable();
    self.BankAddressEn = ko.observable();
    self.Status = ko.observable(true);
    self.FromDate = ko.observable();
    self.Banks = ko.observableArray([]);
    self.Action = ko.observable("");
    self.selectedItem = ko.observable();
    var entryBy = $("#user").text();
    //--------------------------------------------------------------
    // To Add New Data to  Grid
    //--------------------------------------------------------------

    self.AddBank = function () {

        var errMsg = "";

        var add = self.selectedItem();
        self.BankName($("#BankName").val());
        self.BankAddress($('#BankAddress').val());
    
        if (add != undefined) {

            if (self.Validation()) {

                add.BankName(self.BankName());
                add.BankNameEn(self.BankNameEn());
                add.BankCategory(self.BankCategory());
                add.BankAddress(self.BankAddress());
                add.BankAddressEn(self.BankAddressEn());
                add.Status(self.Status());
                var action = self.Action() == "A" ? "A" : "E";
                add.Action(action);
                self.selectedItem(null);
                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");
                self.ClearControls();
            }
        }

        //---------in case of adding new record to grid----------------
        else {
            
            if (self.Validation()) {
                add = {
                    BankName: self.BankName(),
                    BankNameEn: self.BankNameEn(),
                    BankCategory: self.BankCategory(),
                    BankAddress: self.BankAddress(),
                    BankAddressEn: self.BankAddressEn(),
                    Status: self.Status(),
                    FromDate: null,
                    Action: "A",
                    EntryBy: entryBy

                };

                if (self.Banks.indexOf(add) > -1) {
                    return;
                }

                self.Banks.push(new Bank(add));


                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");
                //--clearing controls------
                self.ClearControls();

            }
        }

    };

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.BankID("");
        self.BankName("");
        $('#BankName').val("");
        self.BankNameEn("");
        self.BankCategory("");
        self.BankAddress("");
        $('#BankAddress').val("");
        self.BankAddressEn("");
        self.FromDate(null);
        self.Action("");
        self.selectedItem(null);
        self.Status(true);
        var btnAdd = $("button.icon-ok");
        btnAdd.removeClass("icon-ok").addClass("icon-add");
        btnAdd.text("Add");
    };
    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;
        if (Validate.empty(self.BankName())) {
            errMsg = "Please fill Bank Name !!! <br>";
        }
        if (Validate.empty(self.BankNameEn())) {

            errMsg += "Please fill Bank Name in English!!!<br>";
        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }

    };

    //--------------------------------------------------------------
    // To Load Data Intially
    //--------------------------------------------------------------

    self.LoadControls = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/BankHandler.ashx',
            data: { 'method': 'GetAllBank', 'bankid': null, 'token':$("#token").text() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Bank(item)
                    });
                    self.Banks(mappedTask);
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
    //--------------------------------------------------------------
    // To Remove Grid Data
    //--------------------------------------------------------------
    self.DeleteBank = function (bank) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/CENTRALLOOKUP/BankHandler.ashx',
                    data: { 'method': 'DeleteBank', 'bankid': bank.BankID, 'token':$("#token").text() },
                    success: function (result) {
                        waitMsg.hide();
                        if (result.IsSucess) {
                            self.Banks.remove(bank);
                            msg(result.Message);
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
    };


    //--------------------------------------------------------------
    //NB: To Edit Grid Data
    //--------------------------------------------------------------

    self.EditBank = function (bank) {

        self.BankID(bank.BankID());
        self.BankName(bank.BankName());
        self.BankNameEn(bank.BankNameEn());
        self.BankCategory(bank.BankCategory());
        self.BankAddress(bank.BankAddress());
        self.BankAddressEn(bank.BankAddressEn());
        self.FromDate(bank.FromDate());
        self.Status(bank.Status());
        if (bank.Action() == "A") {
            self.Action("A");
        }
        else {
            self.Action("E");
        }
        self.selectedItem(bank);
        var btnAdd = $("button.icon-add");
        btnAdd.removeClass("icon-add").addClass("icon-ok");
        btnAdd.text("Update");

    }


    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearBank = function () {
        self.ClearControls();
        self.Banks.removeAll();
    };


    //--------------------------------------------------------------
    //NB: To Save
    //--------------------------------------------------------------

    self.SaveBank = function (Bank) {
        waitMsg("Saving");
        waitMsg.show();

        var jsonData = FilteredJson(ko.toJS(self.Banks));
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: '../../Handlers/CENTRALLOOKUP/BankHandler.ashx',
            data: { 'method': 'SaveBank', 'bank': JSON.stringify(jsonData), 'token':$("#token").text() },
            contentType: "applicaton/json; character=utf -8",

            success: function (result) {
                waitMsg.hide();
                msg(result.Message);

                if (result.IsSucess) {
                    msg(result.Message);
                    self.LoadControls();
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

    };
    self.LoadControls();
};


$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BankViewModel());
});