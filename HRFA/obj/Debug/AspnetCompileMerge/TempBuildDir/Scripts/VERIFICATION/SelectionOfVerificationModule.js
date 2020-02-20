/*********************************************************************************
Copyright © DCGC , 2015
*********************************************************************************
Project              :DCGC  
File                 :SelectionofverificationModule.js 
Description          :This Page contain the User SelectionofverificationModule Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
Jitendra Kumar(jitendraakshay@gmail.com)       2015-03-24                                                                
*********************************************************************************/
/* ============================================ First Step :: Defining Structure ============================================ */

//Structure of Application
var Application = function(data) {
    var self = this;
    self.ApplicationID = ko.observable(data.ApplicationID);
    self.ApplicationDescription = ko.observable(data.ApplicationDescription);
};

//Structure of Module
var Module = function (data) {
    var self = this;

    self.ApplicationID = ko.observable(data.ApplicationID);
    self.ModuleID = ko.observable(data.ModuleID);
    self.ModuleDesc = ko.observable(data.ModuleDesc);
    self.FromDate = ko.observable(data.FromDate);
    self.LevelOfVerification = ko.observable(data.LevelOfVerification);
    self.EntryBy = ko.observable(data.EntryBy);
    self.Action = ko.observable(data.Action);
};

/* ============================================ Second Step :: Defining ViewModel ============================================ */
var ViewModelForVerificationModule = function () {

    var self = this;

    //Application
    self.ApplicationID = ko.observable();
    self.ApplicationDescription = ko.observable();

    //Module
    self.ModuleID = ko.observable();
    self.ModuleDesc = ko.observable();
    self.ModuleType = ko.observable();
    self.MenuName = ko.observable();
    self.McRestricted = ko.observable();
    self.FunCD = ko.observable();
    self.FunDesc = ko.observable();

    //Accessories - 1
    self.LevelOfVerification = ko.observable();
    self.FromDate = ko.observable();

    //Accessories - 2
    self.Action = ko.observable();

    //Accessories (Arrays) - 3
    self.LoadApplicationLst = ko.observableArray([]);
    self.ModulesLst = ko.observableArray([]);
    self.DetailLst = ko.observableArray([]);

    //Accessories - 4
    self.selectedApplication = ko.observable();
    self.selectedModule = ko.observable();

    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);
    /* --------------------------------------------------------------------------------------------------------- */

    //Loading Initial Data

    $("#loader").show();
    $.ajax({
        type: 'GET',
        dataType: "json",
        cache: false,
        url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
        data: { 'method': 'GetAllApplication', 'args': null },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {
                return new Application(item)
            });
            self.LoadApplicationLst(mappedTask);
            $("#loader").hide();
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");

        }
    });
    /* --------------------------------------------------------------------------------------------------------- */

    /**
    MethodName:  GetModule
    This method helps to get all respective modules by Application ID
    */
    self.GetModule = function () {
        var applicationID = ko.toJS(self.selectedApplication());
        $.ajax({
            type: 'GET',
            dataType: "json",
            cache: false,
            url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
            data: { 'method': 'GetMuduleByApplicationID', 'appID': applicationID },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Module(item)
                });
                self.ModulesLst.removeAll();
                self.LevelOfVerification("");
                self.FromDate("");
                self.DetailLst.removeAll();
                self.ModulesLst(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }; //Endof GetModule
    /* --------------------------------------------------------------------------------------------------------- */

    /**
    MethodName:  GetVMDetails
    This method list details for selected application and module
    Params: ApplicationID, ModuleID
    */

    self.GetVMDetails = function () {
        var applicationID = ko.toJS(self.selectedApplication());
        var moduleID = ko.toJS(self.selectedModule());

        if (moduleID != undefined) {

            clearAttributeSetupFields();

            $.ajax({
                type: 'GET',
                dataType: "json",
                cache: false,
                url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
                data: { 'method': 'GetVerificationModuleDetails', 'appID': applicationID, 'modID': moduleID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    self.DetailLst.removeAll();
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Module(item);
                    });
                    self.DetailLst(mappedTask);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }; //Endof GetVMDetails
    /* --------------------------------------------------------------------------------------------------------- */

    //Button Operation: Add - 1
    self.Add = function () {

        if (self.validation()) {

            var ApplicationID = ko.toJS(self.selectedApplication());
            var ModuleID = ko.toJS(self.selectedModule());

            if (ApplicationID == "" || ApplicationID == undefined) {
                msg("Please select Application", "WARNING");
                return false;
            }
            if (ModuleID == "" || ModuleID == undefined) {
                msg("Please select Module", "WARNING");
                return false;
            }


            var moduleIds = self.ModuleID();
            var FromDate = self.FromDate();

            self.DetailLst.push(new Module({
                ApplicationID: ApplicationID,
                ModuleID: ModuleID,
                LevelOfVerification: self.LevelOfVerification(),
                FromDate: FromDate,
                EntryBy: self.EntryBy(),
                Action: "A"
            }));
        }
        clearAttributeSetupFields();
    };
    /* --------------------------------------------------------------------------------------------------------- */

    //Button Operation: Delete - 2

    self.Delete = function () {
        self.DetailLst.remove(item);
    };


    /* --------------------------------------------------------------------------------------------------------- */

    self.Save = function () {

        var jsonData = ko.toJS(self.DetailLst);
        //checking if new data is added for saving...

        $("#loader").show();
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/VERIFICATION/SelectionOfVerificationModule.ashx',
            data: { 'method': 'SaveSelectionofVerificationModule', 'args': JSON.stringify(jsonData) },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#loader").hide();
                if (result.IsSucess) {
                    msg(result.Message, "SUCCESS", "Success");
                    self.ClearControls();
                }
                else {
                    msg(result.Message, "WARNING");
                }
            },
            error: function (err) {
                alert(err.status + " - " + err.statusText);
            }
        }); //endof $.ajax...


    }; //end of function
    /* --------------------------------------------------------------------------------------------------------- */

    //Button Operation: Cancel - 2
    self.Cancel = function () {
        clearAttributeSetupFields();
    };
    /* --------------------------------------------------------------------------------------------------------- */

    //Validation - 1
    self.validateNumberOnly = function (ss) {
        var self = this;

        var numexp;
        var jsonData = ko.toJS(ss);
        var lblofverification = jsonData.LevelOfVerification;

        if (lblofverification == "" || lblofverification == undefined) {
            msg("Please fill Level of Verification !!!");
            return false;
        };

        numexp = /^[0-9]+$/;
        if (lblofverification == numexp) {
            return true;
        }
        else {
            msg("Entry must be a number !!!", "WARNING");
            return false;
        }

    };
    /* --------------------------------------------------------------------------------------------------------- */

    //Validation - 2 
    self.validateDate = function (dataDate) {
        var self = this;
        var objDate = ko.toJS(dataDate.FromDate);
        if (objDate == "" || objDate == undefined) {
            msg("Please fill From Date !!!");
        }
    };
    /* --------------------------------------------------------------------------------------------------------- */

    //Validation - 3
    self.validation = function () {
        var errMsg = "";

        var applicationID = ko.toJS(self.selectedApplication());
        var moduleID = ko.toJS(self.selectedModule());

        if (applicationID = "" || applicationID == undefined) {
            errMsg = "Please select Application !!!<br>";
        }
        if (moduleID = "" || moduleID == undefined) {
            errMsg += "Please select Module !!!<br>";
        }
        if (self.LevelOfVerification() == "" || self.LevelOfVerification() == undefined) {
            errMsg += "Please fill Level of Verification !!!<br>";
        }

        if (self.FromDate() == "" || self.FromDate() == undefined) {
            errMsg += "Please fill From Date !!!";
        }


        if (errMsg !== "") {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }
    };
    /* --------------------------------------------------------------------------------------------------------- */

    self.ClearControls = function () {
        self.selectedApplication('');
        self.selectedModule('');
        self.LevelOfVerification("");
        self.FromDate("");
    }

    //Clearing
    var clearAttributeSetupFields = function () {
        self.LevelOfVerification("");
        self.FromDate("");
    }
    /* --------------------------------------------------------------------------------------------------------- */


};          // Endof ViewModelForVerificationModule


/* ============================================ Third Step :: Binding ============================================ */
$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new ViewModelForVerificationModule());
});

