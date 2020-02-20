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



var PurchaseOrder = function (data) {
    var self = this;
    if (data != undefined) {
        self.OldSubmissionNo = ko.observable();
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

var PurchaseOrderViewModel = function () {

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
    self.PurchaseOrders = ko.observableArray([]);

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


    self.AddPurchaseOrder = function () {
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

            var purchaseOrderInfo = self.selectedItem();

            if (purchaseOrderInfo != undefined || purchaseOrderInfo != null) {

                var action = self.Action() == "A" ? "A" : "E";

                purchaseOrderInfo.PurchaseDate(self.PurchaseDate());
                purchaseOrderInfo.Vendor(vendor);
                purchaseOrderInfo.Item(item);
                purchaseOrderInfo.Quantity(self.Quantity());
                purchaseOrderInfo.Unit(unit);
                purchaseOrderInfo.UnitPrice(self.UnitPrice());
                purchaseOrderInfo.Amount(amount);
                purchaseOrderInfo.Action(action);

                self.selectedItem(null);
                $("#btnAddPurchaseOrder").text('Add');
                self.Action('');

            }

            else {
                for (var i = 0; i < self.PurchaseOrders().length; i++) {
                    if (self.PurchaseDate() == self.PurchaseOrders()[i].PurchaseDate() &&
                        ko.toJS(self.SelectedVendor).VendorID == self.PurchaseOrders()[i].Vendor().VendorID &&
                        ko.toJS(self.SelectedItem).ItemID == self.PurchaseOrders()[i].Item().ItemID) {
                        msg("राखिएको डेटा पहिले नै  अवस्थित छ !!!","WARNING");
                        return;
                    }
                }

                var purchaseOrder = {
                    OldSubmissionNo: self.SubmissionNo(),
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
                    Action: "A"
                }

                self.PurchaseOrders.push(new PurchaseOrder(purchaseOrder));
            }
            self.ClearControls();
        }
    }


    self.EditPurchaseOrder = function (purchaseorder) {

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

        self.PurchaseDate(purchaseorder.PurchaseDate());
        self.Quantity(purchaseorder.Quantity());
        self.UnitPrice(purchaseorder.UnitPrice());

        if (purchaseorder.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.selectedItem(purchaseorder);
        $("#btnAddPurchaseOrder").text('Update');
    }


    self.DeletePurchaseOrder = function (purchaseorder) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PurchaseOrders.remove(purchaseorder);
            }
        });
    };

    self.GetPurchaseOrderBySubmissionNo = function () {
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
                url: '../../Handlers/FAMS/PurchaseOrderHandler.ashx',
                data: { 'method': 'GetPurchaseOrderBySubmissionNo', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("Submission number has no value.");
                    }
                    else {
                        var mappedTask = $.map(data.ResponseData, function (item) {

                            return new PurchaseOrder(item)

                        });
                        self.PurchaseOrders(mappedTask);

                        if (editable == 'Y') {
                            for (var i = 0; i < self.PurchaseOrders().length; i++) {
                                self.PurchaseOrders()[i].OldSubmissionNo(self.SubmissionNo());
                                self.PurchaseOrders()[i].Action("A");
                                self.PurchaseOrders()[i].RStatus("F");
                            }
                        }
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });

        }
    }


    self.GetPurchaseOrderBySubmissionNo();



    self.SubmitPurchaseOrder = function () {
        if (self.PurchaseOrders().length > 0) {
            var url = "../../Handlers/FAMS/PurchaseOrderHandler.ashx";
            var method = "SavePurchaseOrder";
            var appID = "FAMS";
            var modID = "PURORDER";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.PurchaseOrders)), 'appID': appID, 'modID': modID };
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
        else {
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
        if (Validate.empty(self.Quantity())) {
            errMsg += "कृपया मात्रा भर्नुहोस !!!<br>";
        }
        if (self.SelectedUnit() == undefined) {
            errMsg += "कृपया एकाइ छान्नुहोस् !!!<br>";
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
    }



};

$(document).ready(function () {

    ValidateSession();
    var povm = new PurchaseOrderViewModel();
    ko.applyBindings(povm);

});