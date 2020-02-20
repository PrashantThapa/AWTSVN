

//#region Application Structure

var structureApplication = function Application(data) {
    var self = this;
    self.ApplicationID = ko.observable(data.ApplicationID);
    self.ApplicationDescription = ko.observable(data.ApplicationDescription);
};


//#endregion

//#region Module Structure

var structureModule = function (data) {
    var self = this;
    self.ModuleID = ko.observable(data.ModuleID);
    self.ModuleDesc = ko.observable(data.ModuleDesc);
    self.LevelOfVerification = ko.observable(data.LevelOfVerification);
    self.ApplicationID = ko.observable(data.ApplicationID);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);

};

//#endregion

//#region User verification structure

var structureUserVerification = function (data) {
    var self = this;
    if (data != undefined) {
        self.ApplicationID = ko.observable(data.ApplicationID);
        self.ModuleID = ko.observable(data.ModuleID);
        self.VMFromDate = ko.observable(data.VMFromDate);
        self.UserID = ko.observable(data.UserID),
        self.VerifyLevel = ko.observable(data.VerifyLevel);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.shouldShowMessage = ko.observable(data.shouldShowMessage);
        self.Action = ko.observable(data.Action);
    }
};

//#endregion

//#region User Structure

var structureUser = function (data) {
    var self = this;
    if (data != undefined) {
        self.UserID = ko.observable(data.UserID);
        self.UserName = ko.observable(data.UserName);
        self.AccountStatus = ko.observable(data.AccountStatus);
        self.TranDate = ko.observable(data.TranDate);
        self.Machine = ko.observable(data.Machine);
        self.IPAddress = ko.observable(data.IPAddress);
        self.Remarks = ko.observable(data.Remarks);
        self.CreatedBy = ko.observable(data.CreatedBy);
        self.CreatedDate = ko.observable(data.CreatedDate);
        self.EmpID = ko.observable(data.EmpID);
        self.AuthNo = ko.observable(data.AuthNo);
        self.AuthBy = ko.observable(data.AuthBy);
        self.AuthDate = ko.observable(data.AuthDate);
        self.UserNameNep = ko.observable(data.UserNameNep);
        self.Action = ko.observable(data.Action);
        self.Password = ko.observable(data.Password);
        self.ConPassword = ko.observable(data.ConPassword);
        self.IsCheck = ko.observable(data.IsCheck);
        self.count = ko.observable(data.count);

    }
};


//#endregion


//#region User Verification View Model

var ViewModelUserVerification = function VMUserVerification() {

    //#region Observable Declaration

    var self = this;
    self.ApplicationID = ko.observable();
    self.ApplicationDescription = ko.observable();
    self.ModuleID = ko.observable();
    self.LevelOfVerification = ko.observable();
    self.ApplicationID = ko.observable();
    self.ModuleID = ko.observable();
    self.ModuleDesc = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.VerifyLevel = ko.observable();
    self.Action = ko.observable();
    self.VMFromDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.UserID = ko.observable();
    self.UserName = ko.observable();
    self.AccountStatus = ko.observable();
    self.TranDate = ko.observable();
    self.Machine = ko.observable();
    self.IPAddress = ko.observable();
    self.Remarks = ko.observable();
    self.CreatedBy = ko.observable();
    self.CreatedDate = ko.observable();
    self.EmpID = ko.observable();
    self.AuthNo = ko.observable();
    self.AuthBy = ko.observable();
    self.AuthDate = ko.observable();
    self.UserNameNep = ko.observable();
    self.Action = ko.observable();
    self.Password = ko.observable();
    self.ConPassword = ko.observable();
    self.IsCheck = ko.observable();
    self.count = ko.observable();
    self.userLstLst = ko.observable();
    self.selectedApplication = ko.observable();
    self.selectedModule = ko.observable();
    self.selectedModules = ko.observableArray([]);

    //#endregion

    //#region Array Declaration

    self.ApplicationArray = ko.observableArray([]);
    self.ModuleArray = ko.observableArray([]);
    self.UserVerificationLst = ko.observableArray([]);
    self.UserLst = ko.observableArray([]);
    self.Genders = ko.observableArray(['Male', 'Female', 'Third']);


    //#endregion

    //#region Function to get Application List
    self.GetApplication = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
            data: { 'method': 'GetAllApplication', 'args': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new structureApplication(item);
                });

                self.ApplicationArray(mappedTask);
                waitMsg.hide();
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
    //#endregion

    //#region Function to get Modules

    self.GetModule = function () {
        waitMsg("Loading");
        waitMsg.show();
        var applicationID = ko.toJS(self.selectedApplication().ApplicationID);
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/VERIFICATION/UserVerificationHandler.ashx',
            data: { 'method': 'GetMuduleByApplicationID', 'appID': applicationID },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new structureModule(item)
                });
                self.ModuleArray(mappedTask);
                waitMsg.hide();
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }

    //#endregion

    //#region Funcation to get user verification to the grid

    self.GetUserVerification = function (modID) {
        waitMsg("Loading");
        waitMsg.show();
        var applicationID = ko.toJS(self.selectedApplication().ApplicationID);
        var moduleID = ko.toJS(modID.ModuleID);
        self.selectedModule(moduleID);
        self.selectedModules(modID);
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
            data: { 'method': 'GetUserVerificationModules', 'appID': applicationID, 'modID': moduleID },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new structureUserVerification(item)
                });
                self.UserVerificationLst(mappedTask);
                //console.log(ko.toJS(self.UserVerificationLst()));
                waitMsg.hide();
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    };

    //#endregion

    //#region Function to get users

    self.GetUserList = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            url: '/Handlers/SECURITY/UserHandler.ashx',
            data: { 'method': 'GetOfficeUsersUV', 'offcode': null },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    return new structureUser(item)
                });
                self.UserLst(mappedTasks);
                waitMsg.hide();
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText);
            }
        });

    }

    //#endregion

    //#region Function to add new blank row to the user grid

    // var moduleID = ko.toJS(modID.ModuleID);
    //  self.selectedModule(moduleID);
    self.AddUserVerification = function () {
        var user = ko.toJS(self.UserVerificationLst());
        // if (self.validateUser(user)) {
       // console.log(self.selectedModules());
        console.log(ko.toJS(self.selectedModules().ModuleID))
		console.log('selectedModule',self.selectedModules())
       // return;
        var userVerification = {
            Action: "A",
            ApplicationID: ko.toJS(self.selectedApplication().ApplicationID),
            EntryBy: $("#user").text(), //getUser()
            EntryDate: getDate(),
            FromDate: self.FromDate(),
            ModuleID: ko.toJS(self.selectedModules().ModuleID),//ko.toJS(self.ModuleArray()[0].ModuleID),
            ToDate: "",
            UserID: self.UserID(),
            VMFromDate: ko.toJS(self.selectedModules().FromDate),
            VerifyLevel: self.VerifyLevel()
		}		
        //console.log(self.UserVerificationLst().length);
        var flag = false;
        for (var i = 0; i < self.UserVerificationLst().length; i++) {
            if ((ko.toJS(self.UserVerificationLst()[i].UserID) == self.UserID()) && (ko.toJS(self.UserVerificationLst()[i].ModuleID) == ko.toJS(self.UserVerificationLst()[0].ModuleID))) {
                flag = true;
                msg("User Already Assigned For The Same Module !!!", "WARNING");
            }
        }
		if (flag == false) {			
            self.UserVerificationLst.push(new structureUserVerification(userVerification));
            self.ClearControls();
        }
        // }
    };

    //#endregion

    //#region Function to remove users

    self.removeUVRow = function (rowItem) {
        var rowData = ko.toJS(rowItem);
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();



                if (rowData.Action == "A") {
                    self.UserVerificationLst.remove(rowItem);
                    waitMsg.hide();
                }
                if (rowData.Action == "E") {
                    $.ajax({
                        dataType: "json",
                        cache: false,
                        url: '../../../Handlers/VERIFICATION/UserVerificationHandler.ashx',
                        data: { 'method': 'DeleteUserVerification', 'applicationId': rowData.ApplicationID, 'moduleId': rowData.ModuleID, 'vmFromDate': rowData.VMFromDate, 'userId': rowData.UserID, 'verifyLebel': rowData.VerifyLevel, 'fromDate': rowData.FromDate, 'token': $("#token").val() },
                        success: function (result) {
                            waitMsg.hide();
                            if (result.IsSucess) {
                                self.UserVerificationLst.remove(rowItem);
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
            }
        });


    };


    //#endregion

    //#region Function to submit user verification

    self.SaveUserVerification = function () {

        var url = "/Handlers/VERIFICATION/UserVerificationHandler.ashx";
        var data = { 'method': 'SaveUserVerification', 'args': JSON.stringify(ko.toJS(self.UserVerificationLst)) };
        $.post(url, data,
                                                        function (result) {
                                                            var obj = jQuery.parseJSON(result);
                                                            msg(obj.Message);

                                                        });

    }

    //#endregion

    //#region Function for validation

    self.validateUser = function (user) {

        var errMsg = "";
        var objFocus = null;
        // console.log(user);
        if (user.length < 1) {
            errMsg = "Please Select Module !!!<br>";
        }
        if (ko.toJS(self.UserID()) == undefined) {
            errMsg += "Please Select User !!!<br>";
        }
        if (self.VerifyLevel() == undefined || self.VerifyLevel() > user[0].VerifyLevel || self.VerifyLevel() == "") {
            errMsg += "Verify Level Can Be Equal Or Less Than Module Verify Level!!!<br>";
        }
        if (self.VerifyLevel() < 1) {
            errMsg += "Verify Must Be Greater Than 0!!!<br>";
        }
        if (self.FromDate() == undefined || self.FromDate() == "") {
            errMsg += "Please Enter From Date!!!<br>";
        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    //#endregion

    //#region Function to clear controls

    self.ClearControls = function () {
        self.UserID(null);
        self.VerifyLevel("");
        self.FromDate("");

    }

    //#endregion

    //#region Function Call

    self.GetApplication();
    self.GetUserList();

    //#endregion

};

//#endregion


$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new ViewModelUserVerification());  

});

