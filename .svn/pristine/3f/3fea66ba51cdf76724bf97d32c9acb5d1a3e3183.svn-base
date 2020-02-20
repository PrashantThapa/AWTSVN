function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
        self.ParentID = ko.observable(data.ParentID);
        self.OfficeName = ko.observable(data.OfficeName);
    }
}


function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);

        //   self.OfficeCD = ko.observable(data.OfficeCD);

        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
        //        self.CostCenterNameEng = ko.observable(data.CostCenterNameEng);

        //        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Action = ko.observable(data.Action);
    }
}




function CostCenterViewModel() {
    var self = this;

    self.OfficeCode = ko.observable();

    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.CostCenterNameEng = ko.observable();
    self.Status = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.Action = ko.observable("A");

    self.ParentOffID = ko.observable();
    self.ParentCostCenterID = ko.observable();

    self.ParentID = ko.observable();
    self.OfficeName = ko.observable();

    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();

    self.AssignedCostCenters = ko.observableArray([]);

    self.CostCenters = ko.observableArray([]);
    self.SelectedCostCenter = ko.observable();

    //    self.CostCenterss = ko.observable();

    self.SelectedCostCenterDetails = ko.observable();

    //--------------------------------------------------------------
    //NB: To Load all the offices 
    //--------------------------------------------------------------
    self.GetAllCostCenter = function () {
        if (self.SelectedCostCenter != null) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/FAMS/CostCenterHandler.ashx',
                data: { 'method': 'GetAllCostCenter', 'CostCenterID': null },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new CostCenter(item)
                    });

                    self.CostCenters(mappedTask);


                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GetAllCostCenter();

    //--------------------------------------------------------------
    //NB: To Load all the offices 
    //--------------------------------------------------------------
    self.GetOffices = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
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
    }

    self.GetOffices();

    //--------------------------------------------------------------
    //NB: To get Cost Center according to office selected
    //--------------------------------------------------------------
    //self.GetCostCenter = function () {
    //    if (self.SelectedOffice() == undefined || self.SelectedOffice() == null) {
    //        self.CostCenterName('');
    //        self.SelectedCostCenter('');
    //        self.SelectedOffice('');
    //        self.CostCenters([]);
    //        self.Action("A");
    //    }
    //    else{
    //        $.ajax({
    //            dataType: "json",
    //            cache: false,
    //            url: '/Handlers/FAMS/CostCenterHandler.ashx',

    //            data: { 'method': 'GetCostCenter', 'officeCode': self.SelectedOffice(), 'CostCenterID': null },
    //            contentType: "application/json; charset=utf-8",
    //            success: function (result) {
    //                var mappedTask = $.map(result.ResponseData, function (item) {
    //                    return new CostCenter(item)
    //                });

    //                self.CostCenters(mappedTask);
    //                

    //            },
    //            error: function (err) {
    //                msg(err.status + " - " + err.statusText, "FAILURE");

    //            }
    //        });
    //    }
    //    
    //}

    //    self.GetCostCenter();

    //--------------------------------------------------------------
    //NB: To Save the CostCenter
    //--------------------------------------------------------------
    self.SaveCostCenter = function () {
        //        self.SetNepali();

        if (self.Validation()) {
            //             self.CostCenterName($("#txtCostCenter").val());

            var office = {
                OfficeCode: ko.toJS(self.SelectedOffice())
            }

            var costcenter = {
                CostCenterID: ko.toJS(self.SelectedCostCenter()).CostCenterID
            }

            console.log(ko.toJS(self.SelectedCostCenter()).CostCenterID);
            var args = {

                Office: office,
                //                CostCenterID: self.CostCenterID(),
                //                CostCenterName: self.CostCenterName(),
                CostCenterID: ko.toJS(self.SelectedCostCenter()).CostCenterID,

                //                Status: "A",
                FromDate: null,
                ToDate: null,
                EntryBy: $("#user").text(),
                EntryDate: null,
                Action: self.Action()
            };

            $.ajax({
                type: 'GET',
                dataType: "json",
                cache: false,
                url: '/Handlers/FAMS/CostCenterHandler.ashx',

                data: { 'method': 'SaveCostCenter', 'args': JSON.stringify(ko.toJS(args)) },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    msg(result.Message, "ALERT");
                    //                    self.GetCostCenter();
                    //                    self.CostCenterName('');
                    //                    self.SelectedCostCenter('');

                    self.ClearControl();
                    self.GetCostCenterDetails();
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    self.GetCostCenterDetails = function () {
        if (self.SelectedOffice() != null) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/FAMS/CostCenterHandler.ashx',
                data: { 'method': 'GetCostCenter', 'officeCode': self.SelectedOffice(), 'CostCenterID': null },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new CostCenter(item)
                    });

                    self.AssignedCostCenters(mappedTask);


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

    //    self.AssignedGetCostCenterDetails = function () {
    //        //        
    //        if (self.SelectedCostCenterDetails() != undefined && self.SelectedCostCenterDetails() != undefined) {
    //            self.Action("E");
    //            $.ajax({
    //                dataType: "json",
    //                cache: false,
    //                async: false,
    //                url: '/Handlers/FAMS/CostCenterHandler.ashx',
    //                data: { 'method': 'GetCostCenter', 'officeCode': self.SelectedOffice(), 'CostCenterID': null},
    //                contentType: "application/json; charset=utf-8",
    //                success: function (result) {
    //                    console.log(ko.toJS(result));
    //                    var data = result.ResponseData[0];
    //                    self.SelectedOffice(data.Office.OfficeCode);
    //                    //self.SelectedCostCenter(data.CostCenterID);
    //                },
    //                error: function (err) {
    //                    msg(err.status + " - " + err.statusText, "FAILURE");

    //                }
    //            });
    //        }
    //        //        else {
    //        //            self.ClearControl();
    //        //        }
    //    }

    //--------------------------------------------------------------
    //NB: To Clear Controls
    //--------------------------------------------------------------
    self.ClearControl = function () {

        self.SelectedCostCenter('');
        self.Action("A");

    }

    self.ClearCostCenter = function () {
        self.SetNepali();
        self.ClearControl();

    }

    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        //       if (self.SelectedOffice() == undefined)
        if (Validate.empty(self.SelectedOffice())) {
            errMsg += "Please select office!!!<br>";
        }

        if (Validate.empty(self.SelectedCostCenter())) {
            errMsg += "Please select Cost center!!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    //    self.SetNepali = function () {
    //        self.CostCenterName($("#txtCostCenter").val());
    //    }



}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new CostCenterViewModel());
})