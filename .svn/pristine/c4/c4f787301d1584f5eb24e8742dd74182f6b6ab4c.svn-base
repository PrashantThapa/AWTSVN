

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
        self.BlanketPurchaseID = ko.observable(data.BlanketPurchaseID);
        self.AgreementDate = ko.observable(data.AgreementDate);
        self.AgreementYear = ko.observable(data.AgreementYear);
        self.Vendor = ko.observable(data.Vendor);
        self.Item = ko.observable(data.Item);
        self.Quantity = ko.observable(data.Quantity);
        self.QuantityRecieved = ko.observable(data.QuantityRecieved);
        self.Unit = ko.observable(data.Unit);
        self.UnitPrice = ko.observable(data.UnitPrice);
    }
}



var BlanketPurchaseOrder = function (data) {
    var self = this;
    if (data != undefined) {
        self.BlanketPurchaseID = ko.observable(data.BlanketPurchaseID);
        self.PurchaseDate = ko.observable(data.PurchaseDate);
        self.Vendor = ko.observable(data.Vendor);
        self.Item = ko.observable(data.Item);
        self.Quantity = ko.observable(data.Quantity);
        self.Unit = ko.observable(data.Unit);
        self.UnitPrice = ko.observable(data.UnitPrice);
        self.Amount = ko.observable(data.Amount);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.RStatus = ko.observable(data.RStatus);
        self.Action = ko.observable(data.Action);
    }
}

var BlanketPurchaseOrderViewModel = function () {

    var self = this;

    self.PurchaseDate = ko.observable();
    self.Quantity = ko.observable();
    self.UnitPrice = ko.observable();
    self.BlanketPurchaseID = ko.observable();

    self.SelectedVendor = ko.observable();
    self.SelectedItem = ko.observable();
    self.SelectedUnit = ko.observable();

    self.Vendors = ko.observableArray([]);
    self.Items = ko.observableArray([]);
    self.Units = ko.observableArray([]);
    self.BlanketPurchases = ko.observableArray([]);
    self.BlanketPurchaseOrders = ko.observableArray([]);

    var entryby = $('#user').text();
    self.EntryBy = ko.observable(entryby);
    self.Action = ko.observable();
    self.selectedItem = ko.observable();
    self.SubmissionNo = ko.observable();
    self.QuantityDiff = ko.observable();


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


    //Load Blanket Purchase
    self.GetBlanketPurchase = function () {
        $.ajax({
            dataType: "json",
            async: false,
            url: '../../Handlers/FAMS/PurchaseOrderHandler.ashx',
            data: { 'method': 'GetBlanketPurchase', 'blanketPurchaseID': null },
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new BlanketPurchase(item)

                });
                self.BlanketPurchases(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText);
            }
        });
    }

    self.GetBlanketPurchase();




    self.SelectBlanketPurchaseOrder = function (purchaseorder) {

        for (var i = 0; i < self.Vendors().length; i++) {
            if (ko.toJS(self.Vendors()[i].VendorID) === purchaseorder.Vendor().VendorID) {
                self.SelectedVendor(self.Vendors()[i]);
            }
        }

        for (var i = 0; i < self.Items().length; i++) {
            if (ko.toJS(self.Items()[i].ItemID) === purchaseorder.Item().ItemID) {
                self.SelectedItem(self.Items()[i]);
            }
        }

        for (var i = 0; i < self.Units().length; i++) {
            if (ko.toJS(self.Units()[i].UnitID) === purchaseorder.Unit().UnitID) {
                self.SelectedUnit(self.Units()[i]);
            }
        }

        self.QuantityDiff(purchaseorder.Quantity() - purchaseorder.QuantityRecieved());
        self.Quantity(self.QuantityDiff());
        self.UnitPrice(purchaseorder.UnitPrice());
        self.BlanketPurchaseID(purchaseorder.BlanketPurchaseID());

    }



    self.SubmitBlanketPurchaseOrder = function () {
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

            var amount = self.Quantity() * self.UnitPrice();

            var blanketPurchaseOrder = {
                PurchaseDate: self.PurchaseDate(),
                Vendor: vendor,
                Item: item,
                Quantity: self.Quantity(),
                Unit: unit,
                UnitPrice: self.UnitPrice(),
                Amount: amount,
                FromDate: "",
                ToDate: "",
                EntryBy: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "A",
                BlanketPurchaseID: self.BlanketPurchaseID()
            }

            self.BlanketPurchaseOrders.push(new BlanketPurchaseOrder(blanketPurchaseOrder));

            var url = "../../Handlers/FAMS/PurchaseOrderHandler.ashx";
            var method = "SavePurchaseOrder";
            var appID = "FAMS";
            var modID = "PURORDER";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.BlanketPurchaseOrders)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                            self.ClearControls();
                                            self.PurchaseOrders([]);
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }

                                    });
        }
    }


    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.PurchaseDate())) {
            errMsg += "कृपया खरिद मिति भर्नुहोस !!!<br>";
        }
        if (self.SelectedVendor() == undefined) {
            errMsg += "कृपया विक्रेता छान्नुहोस् !!!<br>";
        }
        if (self.SelectedItem() == undefined) {
            errMsg += "कृपया आइटम छान्नुहोस् !!!<br>";
        }
        if (self.SelectedUnit() == undefined) {
            errMsg += "कृपया एकाइ छान्नुहोस् !!!<br>";
        }
        if (Number(self.Quantity()) > Number(self.QuantityDiff())) {
            errMsg += "बाकि मात्रा भन्दा मात्रा ठुलो हुनु हुँदैन !!!<br>";
        }
        if (Validate.empty(self.Quantity())) {
            errMsg += "कृपया मात्रा भर्नुहोस !!!<br>";
        }
        if (Validate.empty(self.UnitPrice())) {
            errMsg += "कृपया एकाइ मूल्य भर्नुहोस !!!<br>";
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
        self.PurchaseDate('');
        self.Quantity('');
        self.UnitPrice('');
        self.SelectedVendor('');
        self.SelectedItem('');
        self.SelectedUnit('');
        self.BlanketPurchases([]);
        self.GetBlanketPurchase();
    }


};

$(document).ready(function () {

    ValidateSession();
    $("#ddlVendor").attr('disabled', 'disabled');
    $("#ddlItem").attr('disabled', 'disabled');
    $("#ddlUnit").attr('disabled', 'disabled');
    var bpovm = new BlanketPurchaseOrderViewModel();
    ko.applyBindings(bpovm);

});