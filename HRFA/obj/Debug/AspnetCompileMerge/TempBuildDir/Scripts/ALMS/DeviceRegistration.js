
function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}
function DeviceRegistration(data) {
    var self = this;
    if (data != undefined) {
        self.Office=ko.observable(data.Office);
        self.IPAddress = ko.observable(data.IPAddress);
        self.DeviceName = ko.observable(data.DeviceName);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryDate = ko.observable(data.EntryDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.Action = ko.observable(data.Action); 
        self.Status = ko.observable(data.Status);
    }
}

function DeviceRegistrationViewModel() {
    var self = this;

        self.OfficeCode=ko.observable();
        self.IPAddress = ko.observable();
        self.DeviceName = ko.observable();
        self.FromDate = ko.observable();
        self.ToDate = ko.observable();
        self.EntryDate = ko.observable();
        self.EntryBy = ko.observable();
        self.Action = ko.observable();
        self.Status = ko.observable();

        var entryBy = $("#user").text();

        self.OfficeCode = ko.observable();
        self.OfficeNameNep = ko.observable();
        self.Offices = ko.observableArray([]);
        self.SelectedOffice = ko.observable();

        self.selectedItem = ko.observable();
        self.DeviceRegistrations=ko.observableArray([]);


        self.AddDeviceRegistration = function () {
            var errMsg = ""; ;

            var add = self.selectedItem();

            if (add) {

                if (self.Validation()) {

                    OfficeArray = {
                        OfficeCode: self.SelectedOffice().OfficeCode,
                        OfficeNameNep: self.SelectedOffice().OfficeNameNep
                    }
                    var action = self.Action() == "A" ? "A" : "E";
                    add.Office(OfficeArray);
                    add.IPAddress(self.IPAddress());
                    add.DeviceName(self.DeviceName());
                    add.Action(action);

                    //               self.DeviceRegistrations.push(new DeviceRegistration(add));
                    var btnAdd = $("button.icon-ok");
                    btnAdd.removeClass("icon-ok").addClass("icon-add");
                    btnAdd.text("Add");

                    //--clearing controls------

                    self.ClearControls();
                    //                self.DeviceRegistrations("");

                }
            }
            else {
                if (self.Validation()) {

                    OfficeArray = {
                        OfficeCode: self.SelectedOffice().OfficeCode,
                        OfficeNameNep: self.SelectedOffice().OfficeNameNep
                    }
                    add = {
                        Office: OfficeArray,
                        IPAddress: self.IPAddress(),
                        DeviceName: self.DeviceName(),

                        FromDate: self.FromDate(),
                        ToDate: self.ToDate(),
                        EntryBy: entryBy,
                        EntryDate: self.EntryDate(),
                        Action: "A"

                    };

                    self.DeviceRegistrations.push(new DeviceRegistration(add));

                    console.log(ko.toJS(DeviceRegistration(add)));

                    var btnAdd = $("button.icon-ok");
                    btnAdd.removeClass("icon-ok").addClass("icon-add");
                    btnAdd.text("Add");

                    //--clearing controls------

                    self.ClearControls();
                    //                self.DeviceRegistrations("");
                }
            }
        }

   

        //--------------------------------------------------------------
    //NB: To Edit Grid Data
    //--------------------------------------------------------------

        self.EditDeviceRegistration = function (device) {


            for (var i = 0; i < self.Offices().length; i++) {
                if (device.Office().OfficeCode == self.Offices()[i].OfficeCode()) {
                    self.SelectedOffice(self.Offices()[i]);
                }
            }
            self.IPAddress(device.IPAddress());
            self.DeviceName(device.DeviceName());

            console.log(ko.toJS(device.IPAddress()));
            //        self.Status(device.Status());

            if (device.Action() == "A") {
                self.Action("A");
            }
            else {
                self.Action("E");
            }
            self.selectedItem(device);



            var btnAdd = $("button.icon-add");
            btnAdd.removeClass("icon-add").addClass("icon-ok");
            btnAdd.text("Update");

        }

        //--------------------------------------------------------------
    // To Remove Grid Data
    //--------------------------------------------------------------
    self.DeleteDeviceRegistration = function (officeCode) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();

                //                console.log(ko.toJS(officeCode).IPAddress);
                //                return;
                var OfficeArray = {
                    OfficeCode: officeCode.Office().OfficeCode
//                    OfficeNameNep: self.SelectedOffice().OfficeNameNep
                };

//                console.log(officeCode.Office().OfficeCode);
//                return;

                var del = {
                    Office: OfficeArray,
                    IPAddress: ko.toJS(officeCode).IPAddress,
                    DeviceName: ko.toJS(officeCode).DeviceName
                };
                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/ALMS/DeviceRegistrationHandler.ashx',
                    data: { 'method': 'DeleteDeviceRegistration', 'del': JSON.stringify(del) },
                    success: function (result) {
                        waitMsg.hide();
                        if (result.IsSucess) {
                            self.DeviceRegistrations.remove(officeCode);
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
    //NB: To Save
    //--------------------------------------------------------------

    self.SaveDeviceRegistration = function (DeviceRegistration) {
        waitMsg("Saving");
        waitMsg.show();

        var jsonData = FilteredJson(ko.toJS(self.DeviceRegistrations()));
        console.log(ko.toJS(self.DeviceRegistrations()));
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: '../../Handlers/ALMS/DeviceRegistrationHandler.ashx',
            data: { 'method': 'SaveDeviceRegistration', 'officeCode': JSON.stringify(jsonData) },
            contentType: "applicaton/json; character=utf -8",

            success: function (result) {
                //                console.log(ko.toJS(result));
                if (result.IsSucess) {
                    msg(result.Message);
                    self.ClearControls();
                    self.SelectedOffice("");

                    self.DeviceRegistrations("");

                }
                else {

                    msg(result.Message, "WARNING");
                }

            },
            error: function (err) {
                waitMsg.hide();
                msg(err.status + " - " + err.statusText, "FAILURE");
            }

        });

    };

// Get Device Registration according to office

self.GetDeviceRegistration = function () {
    if (self.SelectedOffice() == undefined || self.SelectedOffice() == null) {
//        ClearControls();
//            self.SelectedOffice("");
            self.IPAddress("");
            self.DeviceName("");
    }
    else{
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/ALMS/DeviceRegistrationHandler.ashx',

            data: { 'method': 'GetDeviceRegistration', 'officeCode': self.SelectedOffice().OfficeCode },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if(result.ResponseData != null){
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new DeviceRegistration(item)
                });

                self.DeviceRegistrations(mappedTask);
                }

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
    
}


        //--------------------------------------------------------------
        //NB: To Load all the offices 
        //--------------------------------------------------------------
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

        self.Validation = function () {
            var errMsg = "";

            if (Validate.empty(self.SelectedOffice())) {
                errMsg += "Please Select Office Name !!!\n";
            }

            if (Validate.empty(self.DeviceName())) {
                errMsg += "Please Enter the Device Name !!!\n";
            }

            if (Validate.empty(self.IPAddress())) {
                errMsg += "Please Enter the IP Address !!!\n";
            }


            if (errMsg == "") {
                return true;
            }
            else {
                 msg(errMsg,"WARNING");
                return false;
            }
        }

        //--------------------------------------------------------------
        // To Clear Controls
        //--------------------------------------------------------------
        self.ClearControls = function () {
//            self.SelectedOffice("");
            self.IPAddress("");
            self.DeviceName("");

            self.selectedItem(null);


            var btnAdd = $("button.icon-ok");
            btnAdd.removeClass("icon-ok").addClass("icon-add");
            btnAdd.text("Add");
        };
        

        
        self.ClearDeviceRegistration = function () {
           self.ClearControls();

//           self.DeviceRegistrations("");
        };
    
 
};

$(document).ready(function () {
  ValidateSession();
    ko.applyBindings(new DeviceRegistrationViewModel());
});