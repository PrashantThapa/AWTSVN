function BudgetItem(data) {
    if (data != undefined) {
        var self = this;
        self.BudgetItemID = ko.observable(data.BudgetItemID);
        self.BudgetItemName = ko.observable(data.BudgetItemName);
        self.BudgetItemEng = ko.observable(data.BudgetItemEng);
        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);

        self.Action = ko.observable(data.Action);

    }
}

function BudgetItemViewModel() {
    var self = this;
    self.BudgetItemID = ko.observable();
    self.BudgetItemName = ko.observable();
    self.BudgetItemEng = ko.observable();
    self.Status = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.Action = ko.observable();

    self.BudgetItems = ko.observableArray([]);
    self.SelectedBudgetItem = ko.observable();


    self.SaveBudgetItem = function () {
        self.SetNepali();
        if (self.Validation()) {
            if ($("#btnSave").text() == 'Save') {

                var row = {
                    BudgetItemID: null,
                    BudgetItemName: self.BudgetItemName(),    
                    BudgetItemEng: self.BudgetItemEng(),               
                    Status: "A", 
                    FromDate: null,
                    ToDate: null,
                    EntryBy: $("#user").text(),
                    EntryDate: null,                
                    Action: "A"
                };

                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/FAMS/BudgetItemHandler.ashx',
                    data: { 'method': 'SaveBudgetItem', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
                            msg(result.Message);
                            self.ClearControl();
                            self.GetBudgetItem();
                        }
                        else {
                            msg(result.Message);
                        }
                    },
                    error: function (err) {
                        msg("Failed error");
                      
                    }
                });
            }

            else {
                var row = {
                    BudgetItemID: self.SelectedBudgetItem(),
                    BudgetItemName: self.BudgetItemName(),
                    BudgetItemEng: self.BudgetItemEng(),
             
                    Action: "E"
                };

                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/FAMS/BudgetItemHandler.ashx',
                    data: { 'method': 'SaveBudgetItem', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
                            msg(result.Message);
                            self.ClearControl();
                            self.GetBudgetItem();
                        }
                        else {
                            msg(result.Message);
                        }
                    },
                    error: function (err) {
                        msg("Failed error");
                      
                    }
                });

            }
        }
    }

    self.GetBudgetItem = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/FAMS/BudgetItemHandler.ashx',
            data: { 'method': 'GetBudgetItem', 'BudgetItemID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new BudgetItem(item)

                });

                

                self.BudgetItems(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });


    }

    self.BudgetItemDetails = function () {
        if (self.SelectedBudgetItem() != undefined) {

            var btnSave = $("#btnSave");
            btnSave.text('Update');

             $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/FAMS/BudgetItemHandler.ashx',
                data: { 'method': 'GetBudgetItem', 'BudgetItems': self.SelectedBudgetItem() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = result.ResponseData[0];
    
                    self.BudgetItemName(data.BudgetItemName);
                    self.BudgetItemEng(data.BudgetItemEng);


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


    self.Validation = function () {
        var errMsg = "";
        self.SetNepali();
        if (Validate.empty(self.BudgetItemName())) {
            errMsg += "कृपया बजेटको नाम भर्नुहोस् !!!\n";
        }
//        if (Validate.empty(self.BudgetItemEng())) {
//            errMsg += "कृपया बजेट शीर्षकको नाम अंग्रेजीमा भर्नुहोस् !!!\n";
//        }
        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.ClearControl = function () {
        self.BudgetItemName("");
        self.SelectedBudgetItem("");
        self.BudgetItemEng("");

    }

    self.CancelBudgetItem = function () {
       self.SetNepali();
       self.ClearControl();

    }

    self.SetNepali = function () {
        self.BudgetItemName($("#txtBudgetItem").val());
    }

   self.GetBudgetItem();
}

$(document).ready(function () {

    ValidateSession();
    ko.applyBindings(new BudgetItemViewModel());
})