
var Vendor = function (data) {
    var self = this;
    if (data != undefined) {
        self.VendorID = ko.observable(data.VendorID);
        self.VendorName = ko.observable(data.VendorName);
    }
}

var Item = function (data) {
    var self = this;
    if (data != undefined) {
        self.ItemID = ko.observable(data.ItemID);
        self.ItemDesc = ko.observable(data.ItemDesc);
    }
}

var Unit = function (data) {
    var self = this;
    if (data != undefined) {
        self.UnitID = ko.observable(data.UnitID);
        self.UnitDesc = ko.observable(data.UnitDesc);
    }
}



var BlanketPurchase = function (data) {
    var self = this;
    if (data != undefined) {
        self.OldSubmissionNo = ko.observable();
        self.AgreementDate = ko.observable(data.AgreementDate);
        self.AgreementYear = ko.observable(data.AgreementYear);
        self.Vendor = ko.observable(data.Vendor);
        self.Item = ko.observable(data.Item);
        self.Quantity = ko.observable(data.Quantity);
        self.Unit = ko.observable(data.Unit);
        self.UnitPrice = ko.observable(data.UnitPrice);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.RStatus = ko.observable(data.RStatus);
        self.Action = ko.observable(data.Action);
    }
}

var BlanketPurchaseViewModel = function () {

    var self = this;

    self.AgreementDate = ko.observable();
    self.AgreementYear = ko.observable();
    self.Quantity = ko.observable();
    self.UnitPrice = ko.observable();

    self.SelectedVendor = ko.observable();
    self.SelectedItem = ko.observable();
    self.SelectedUnit = ko.observable();

    self.Vendors = ko.observableArray([]);
    self.Items = ko.observableArray([]);
    self.Units = ko.observableArray([]);
    self.BlanketPurchases = ko.observableArray([]);

    var entryby = $('#user').text();
    self.EntryBy = ko.observable(entryby);
    self.Action = ko.observable();
    self.selectedItem = ko.observable();
    self.SubmissionNo = ko.observable();


    //Load Vendor
    $.ajax({
        dataType: "json",
        url: '../../Handlers/FAMS/VendorHandler.ashx',
        data: { 'method': 'GetVendor', 'vendorID': null },
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Vendor(item)

            });
            self.Vendors(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });

    //Load Item
    $.ajax({
        dataType: "json",
        url: '../../Handlers/FAMS/ItemHandler.ashx',
        data: { 'method': 'GetItem', 'itemID': null },
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Item(item)

            });
            self.Items(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });


    //Load Unit
    $.ajax({
        dataType: "json",
        url: '../../Handlers/FAMS/UnitHandler.ashx',
        data: { 'method': 'GetUnit', 'unitID': null },
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Unit(item)

            });
            self.Units(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });


    self.AddBlanketPurchase = function () {
        if (self.Validation()) {

            var vendor = {
                VendorID: ko.toJS(self.SelectedVendor).VendorID,
                VendorName: ko.toJS(self.SelectedVendor).VendorName
            }

            var item = {
                ItemID: ko.toJS(self.SelectedItem).ItemID,
                ItemDesc: ko.toJS(self.SelectedItem).ItemDesc
            }

            var unit = {
                UnitID: ko.toJS(self.SelectedUnit).UnitID,
                UnitDesc: ko.toJS(self.SelectedUnit).UnitDesc
            }

            var blanketPurchaseInfo = self.selectedItem();

            if (blanketPurchaseInfo != undefined || blanketPurchaseInfo != null) {

                var action = self.Action() == "A" ? "A" : "E";

                blanketPurchaseInfo.AgreementDate(self.AgreementDate());
                blanketPurchaseInfo.AgreementYear(self.AgreementYear());
                blanketPurchaseInfo.Vendor(vendor);
                blanketPurchaseInfo.Item(item);
                blanketPurchaseInfo.Quantity(self.Quantity());
                blanketPurchaseInfo.Unit(unit);
                blanketPurchaseInfo.UnitPrice(self.UnitPrice());
                blanketPurchaseInfo.Action(action);

                self.selectedItem(null);
                $("#btnAddBlanketPurchase").text('Add');
                self.Action('');

            }

            else {
                for (var i = 0; i < self.BlanketPurchases().length; i++) {
                    if (self.AgreementDate() == self.BlanketPurchases()[i].AgreementDate() &&
                        ko.toJS(self.SelectedVendor).VendorID == self.BlanketPurchases()[i].Vendor().VendorID &&
                        ko.toJS(self.SelectedItem).ItemID == self.BlanketPurchases()[i].Item().ItemID) {
                        msg("राखिएको डेटा पहिले नै  अवस्थित छ !!!","WARNING");
                        return;
                    }
                }

                var blanketPurchase = {
                    AgreementDate: self.AgreementDate(),
                    AgreementYear: self.AgreementYear(),
                    Vendor: vendor,
                    Item: item,
                    Quantity: self.Quantity(),
                    Unit: unit,
                    UnitPrice: self.UnitPrice(),
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    RStatus: "F",
                    Action: "A"
                }

                self.BlanketPurchases.push(new BlanketPurchase(blanketPurchase));
            }
            console.log(ko.toJS(self.BlanketPurchases()));
            self.ClearControls();
        }
    }


    self.EditBlanketPurchase = function (blanketpurchase) {

        for (var i = 0; i < self.Vendors().length; i++) {
            if (ko.toJS(self.Vendors()[i].VendorID) === blanketpurchase.Vendor().VendorID) {
                self.SelectedVendor(self.Vendors()[i]);
            }
        }

        for (var i = 0; i < self.Items().length; i++) {
            if (ko.toJS(self.Items()[i].ItemID) === blanketpurchase.Item().ItemID) {
                self.SelectedItem(self.Items()[i]);
            }
        }

        for (var i = 0; i < self.Units().length; i++) {
            if (ko.toJS(self.Units()[i].UnitID) === blanketpurchase.Unit().UnitID) {
                self.SelectedUnit(self.Units()[i]);
            }
        }

        self.AgreementDate(blanketpurchase.AgreementDate());
        self.AgreementYear(blanketpurchase.AgreementYear());
        self.Quantity(blanketpurchase.Quantity());
        self.UnitPrice(blanketpurchase.UnitPrice());

        if (blanketpurchase.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.selectedItem(blanketpurchase);
        $("#btnAddBlanketPurchase").text('Update');
    }


    self.DeleteBlanketPurchase = function (blanketpurchase) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.BlanketPurchases.remove(blanketpurchase);
            }
        });
    };




    self.SubmitBlanketPurchase = function () {
        if (self.BlanketPurchases().length > 0) {
            var url = "../../Handlers/FAMS/BlanketPurchaseHandler.ashx";
            var method = "SaveBlanketPurchase";
            var appID = "FAMS";
            var modID = "BLANKETPUR";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.BlanketPurchases)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                            self.ClearControls();
                                            self.BlanketPurchases([]);
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }

                                    });

        }
        else {

        }
    }


    self.GetBlanketPurchaseBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }

        else {
            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, select').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                url: '../../Handlers/FAMS/BlanketPurchaseHandler.ashx',
                data: { 'method': 'GetBlanketPurchaseBySubmissionNo', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                         msg("सबमिशन नम्बरमा कुनै डाटा छैन।","WARNING");
                    }
                    else {
                        var mappedTask = $.map(data.ResponseData, function (item) {

                            return new BlanketPurchase(item)

                        });
                        self.BlanketPurchases(mappedTask);

                        if (editable == 'Y') {
                            for (var i = 0; i < self.BlanketPurchases().length; i++) {
                                self.BlanketPurchases()[i].OldSubmissionNo(self.SubmissionNo());
                                self.BlanketPurchases()[i].EntryBy(self.EntryBy());
                                self.BlanketPurchases()[i].Action("A");
                                self.BlanketPurchases()[i].RStatus("F");
                            }
                        }
                        console.log(ko.toJS(self.BlanketPurchases()));
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });

        }
    }


    self.GetBlanketPurchaseBySubmissionNo();



    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.AgreementDate())) {
            errMsg += "कृपया सम्झौता मिति भर्नुहोस् !!!<br>";
        }
        if (Validate.empty(self.AgreementYear())) {
            errMsg += "कृपया सम्झौता वर्ष भर्नुहोस् !!!<br>";
        }
        if (self.SelectedVendor() == undefined) {
            errMsg += "कृपया विक्रेता छान्नुहोस् !!!<br>";
        }
        if (self.SelectedItem() == undefined) {
            errMsg += "कृपया आइटम छान्नुहोस् !!!<br>";
        }
        if (Validate.empty(self.Quantity())) {
            errMsg += "कृपया मात्रा भर्नुहोस् !!!<br>";
        }
        if (self.SelectedUnit() == undefined) {
            errMsg += "कृपया एकाइ छान्नुहोस् !!!<br>";
        }
        if (Validate.empty(self.UnitPrice())) {
            errMsg += "कृपया एकाइ मूल्य भर्नुहोस् !!!<br>";
        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }
    }

    self.ClearControls = function () {
        self.AgreementDate('');
        self.AgreementYear('');
        self.Quantity('');
        self.UnitPrice('');
        self.SelectedVendor('');
        self.SelectedItem('');
        self.SelectedUnit('');
    }



};

$(document).ready(function () {

    ValidateSession();
    var bpvm = new BlanketPurchaseViewModel();
    ko.applyBindings(bpvm);

});