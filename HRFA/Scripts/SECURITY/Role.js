var structureApplication=function Application(data){
   var self=this;
   self.ApplicationID = ko.observable(data.ApplicationID);
   self.ApplicationDescription = ko.observable(data.ApplicationDescription);
};

var structureRole = function Role(data) {
    var self = this;
    //self.ApplicationID = ko.observable(data.ApplicationID);
    self.RoleID = ko.observable(data.RoleID);
    self.RoleDescription = ko.observable(data.RoleDescription);
    //self.DbRole = ko.observable(data.DbRole);
    self.Action = ko.observable(data.Action);
};

//NB: ModuleFunctions
var ModuleFunctionsStructure = function ModuleFunctions(data) {
    var self = this;
   
    self.ApplicationID = ko.observable(data.ApplicationID);
    self.ModuleID = ko.observable(data.ModuleID);
    self.FunDesc = ko.observable(data.FunDesc);
    self.FromDate = ko.observable(data.FromDate);
    self.RoleID = ko.observable(data.RoleID);
    self.DBRole = ko.observable(data.DBRole);
    self.ModuleDesc = ko.observable(data.ModuleDesc);
    self.FunCD = ko.observable(data.FunCD);
    self.Action = ko.observable(data.Action);
    self.FromDate = ko.observable(data.FromDate);
    if (data.FromDate == "" || self.FromDate == undefined) {

        self.makecheck = ko.observable(false);
    }
    else {

        self.makecheck = ko.observable(true);
    }   
};

//NB: VIEWMODEL goes here---------------------------------------------------------------------------------------------------------------------(1)

var ViewModelRole = function VMRole() {
    var self = this;
    self.ApplicationID = ko.observable();
    self.ApplicationDescription = ko.observable();

    //NB: Clearing structureRole
    self.RoleID = ko.observable();
    self.RoleDescription = ko.observable();
    self.DbRole = ko.observable();

    //NB: Clearing RoleModuleFunction
    self.ApplicationID = ko.observable();
    self.ModuleID = ko.observable();
    self.ModuleDesc = ko.observable();
    self.ModuleType = ko.observable();
    self.MenuName = ko.observable();
    self.McRestricted = ko.observable();
    self.FunCD = ko.observable();
    self.FunDesc = ko.observable();
    self.Action = ko.observable();
    self.FromDate = ko.observable();

    self.GlobalAction = ko.observable();

    //NB: List ----------------------------------------------------------------------------------------------(5)
    self.ApplicationLST = ko.observableArray([]);
    self.RoleModuleFunctionLST = ko.observableArray([]);
    self.RoleLST = ko.observableArray([]);

    self.RoleModuleFnToAdd = ko.observableArray([]);  //only temporary lst


    //NB: End of List ---------------------------------------------------------------------------------------(5;)

    // NB: Event---------------------------------------------------------------------------------------------(6)
    self.selectedApplForRole = ko.observable();

    self.shouldShowMessage = ko.observable(true);
    self.selectedItem = ko.observable();
    self.makecheck = ko.observable();

    // NB: End of Event--------------------------------------------------------------------------------------(6;) 

    //NB: Loading Application OnPageLoad---------------------------------------------------------------------(4)

    $("#loader").show();
    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
        data: { 'method': 'GetAllApplication', 'args': null },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {
                console.log("testitem>>>", item);
                return new structureApplication(item)
            });

            self.ApplicationLST(mappedTask);
            $("#loader").hide();


        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");

        }
    });


    //NB: End of Loading Application OnPageLoad--------------------------------------------------------------(4;)


    //NB: Clicking Application-Row And Getting Roles--------------------------------------(7)
    self.GetRoles = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/SECURITY/Role.ashx',
            data: { 'method': 'GetRoles'},
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#loader").hide();
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new structureRole(item)
                });
                //self.RoleLST.removeAll();
                self.RoleLST(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

        //NB: Loading Roles

    };

    //NB: End of Clicking Application Row And Getting Roles--------------------------------------(7;)

    //NB: Validation ---------------------------------------------------------------------------------------------(9)

    self.validation = function () {
        var errMsg = "";

        var applicationID = ko.toJS(self.selectedApplForRole());

        //if (applicationID = "" || applicationID == undefined) {
        //    errMsg = "Please select Application !!!<br>";
        //}

        if (self.RoleID() == "" || self.RoleID() == undefined) {
            errMsg += "Please RoleID !!!<br>";
        }

        if (self.RoleDescription() == "" || self.RoleDescription() == undefined) {
            errMsg += "Please fill Role-Description !!!<br>";
        }
        //if (self.DbRole() == "" || self.DbRole() == undefined) {
        //    errMsg += "Please fill DB-Role !!!";
        //}

        if (errMsg !== "") {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }

    };
    //NB:End of Validation---------------------------------------------------------------------------------------(9;)


    //NB: Clicking Role-Row and putting values into fields for edit and also getting Role_Module_Function-----------------------------------------------(10)

    self.ClickRoleRowToGetData = function (datas) {
        var data = ko.toJS(datas);

        self.GlobalAction(datas.Action);

       
        //        alert(ko.toJS(self.GlobalAction()));
        console.log("roleisnew", data.RoleID);
        var roleID = data.RoleID;
        self.shouldShowMessage(false);
        self.RoleID(data.RoleID);
        self.RoleDescription(data.RoleDescription);
        self.selectedItem(datas);

        console.log("data>>", ko.toJS(data));

        //self.makecheck(true);

        $('#btnAdd').text('Update');

        $("#loader").show();
        //self.RoleModuleFunctionLST.removeAll();
        // self.RoleLST.removeAll();

       

        console.log(applicationID + " " + roleID);

        //NB: End of Clicking Application Row And Getting ModuleFunction And Roles--------------------------------------(7;)
    };
    //NB: Clicking Role-Row and putting values into fields for edit and also getting Role_Module_Function---------------------------------------------(10;)

    //NB: Clicking Add Button and addind into Role-Grid--------------------------------------------------------------(8)
    self.Add = function () {
        var applicationID = ko.toJS(self.selectedApplForRole());
        var rel = self.selectedItem();

        //--------------------------------------------------------------
        // NB: Edit Case
        //--------------------------------------------------------------
        if (rel != undefined) {

            console.log("edit>>", ko.toJS(rel));

            // NB: Validate Controls
            if (self.validation()) {

                //NB: Edit
                //var action = self.Action() == "A" ? "A" : "E";
                // alert("action" + self.Action());
                //rel.ApplicationID(applID);
                rel.RoleID(self.RoleID());
                rel.RoleDescription(self.RoleDescription());
                //rel.DbRole(self.DbRole());
                rel.Action(rel.Action());

                // clear out the selected Relation
                self.selectedItem(null);

                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                //self.ClearControls();
                self.ClearRole();
            }
        }
        else {
            // NB: Validate Controls
            if (self.validation()) {

                // NB: New Add Case
                rel = {
                    ApplicationID: applicationID,
                    RoleID: self.RoleID(),
                    RoleDescription: self.RoleDescription(),
                    DbRole: self.DbRole(),
                    Action: "A"
                };

                // check to see that the relation doesn't already exist in our list
                if (self.RoleLST.indexOf(rel) > -1) {
                    return;
                }

                self.RoleLST.push(new structureRole(rel));

                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                //self.ClearControls();
                self.ClearRole();
            }
        }

    };

    self.GetRoles()
    self.ClearControls = function () {
        self.RoleID("");
        self.RoleDescription("");
        self.DbRole("");
        self.RoleLST([]);
        self.RoleModuleFunctionLST([]);
        self.RoleModuleFnToAdd([]);
        var btnAdd = $("#btnAdd");
        btnAdd.text("Add");
        $("#green").hide();
        self.selectedApplForRole('');
        self.shouldShowMessage(true);
        self.selectedItem(null);
    }

    self.ClearRole = function () {
        self.RoleID("");
        self.RoleDescription("");
        self.DbRole("");
        var btnAdd = $("#btnAdd");
        btnAdd.text("Add");
        $("#green").hide();
        self.RoleModuleFunctionLST([]);
        self.RoleModuleFnToAdd([]);
        self.shouldShowMessage(true);
        self.selectedItem(null);
    }
    //NB: End of Clicking Add Button and addind into Role-Grid-------------------------------------------------------(8;)

    // NB:  checking Role-Module-Function and pushing in temtorary List(Assigned)
    self.RMFtoADD = function (dataofRMF) {


        console.log("RMF", ko.toJS(dataofRMF));

        if (self.RoleID() == "" || self.RoleID() == undefined) {
            msg("Please select Role", "WARNING");
            return false;
        }
        var act;
        if (dataofRMF.makecheck() == true) {
            act = "A"
        }
        else {
            act = "D"
        }

        console.log(ko.toJS(self.RoleModuleFnToAdd()));

        var json = ko.toJS(self.RoleModuleFnToAdd);
        console.log("getDate", ko.toJS(getDate()));

        var newAddedValue = {
            ApplicationID: dataofRMF.ApplicationID(),
            RoleID: self.RoleID(),
            ModuleID: dataofRMF.ModuleID(),
            DbRole: self.DbRole(),
            ModuleDesc: dataofRMF.ModuleDesc(),
            //            ModuleType: dataofRMF.ModuleType(),
            // MenuName: dataofRMF.MenuName(),
            // McRestricted: dataofRMF.McRestricted(),
            FunCD: dataofRMF.FunCD(),
            FunDesc: dataofRMF.FunDesc(),
            FromDate: dataofRMF.FromDate(),
            Action: act

        };


        self.RoleModuleFnToAdd.push(newAddedValue);
        console.log("yahoohoo>>", ko.toJS(self.RoleModuleFnToAdd()));

        console.log(ko.toJS(self.RoleModuleFnToAdd()));

    };

    //NB: Saving Roles--------------------------------------------------------------------(12)

    getRoles = function () {
        var jsonData = self.RoleLST();
        var obj = {};
        var data = [];

        for (var i in jsonData) {
            obj = jsonData[i];
            data.push(obj);
        }
        return data;
    };

    var roles = getRoles();

    self.SaveRoles = function () {
        if (self.RoleID() == "" || self.RoleID() == undefined) {
            msg("Please select Role", "WARNING");
            return false;
        }

        //        if (ko.toJS(self.RoleID()) != undefined) {
        //            selfAction = "E";
        //        }
        //        else {
        //            selfAction = "A"
        //        }

        //        alert(ko.toJS(self.GlobalAction()));

        console.log(ko.toJS(self.RoleModuleFnToAdd()));
        var role = {
            //ApplicationID: self.ApplicationID(),
            RoleID: self.RoleID(),
            RoleDescription: self.RoleDescription(),
            //DbRole: self.DbRole(),
            Action: ko.toJS(self.GlobalAction()) === 'E'? ko.toJS(self.GlobalAction()):'A',
            //RoleModFunLst: ko.toJS(self.RoleModuleFnToAdd())
        };

        method = 'SaveRoles';
        var url = "/Handlers/SECURITY/Role.ashx";

        var data = { 'method': method, 'args': JSON.stringify(role) };
        $.post(url, data,
            function (result) {
                waitMsg.hide();
                var obj = jQuery.parseJSON(result);
                msg(obj.Message, "ALERT");
                self.ClearControls();
                self.GetRoles();
                //                self.ApplicationID("");
                //                self.RoleID("");
                //                self.RoleDescription("");
                //                self.DbRole("");
                //                self.GlobalAction("");
                //                self.RoleModuleFnToAdd("");
                //                var btnAdd = $("button.icon-ok");
                //                btnAdd.removeClass("icon-ok").addClass("icon-add");
                //                btnAdd.text("Add");

            });

    };
    //NB: End of Saving Roles-------------------------------------------------------------(12;)

};
//NB: End of VIEWMODEL goes here--------------------------------------------------------------------------------------------------------------(1;)

//NB: Binding Goes Here------------------------------------------------------------------------------------------------------------------------(3)
$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new ViewModelRole);
});
//NB: End of Binding Goes Here-----------------------------------------------------------------------------------------------------------------(3;)