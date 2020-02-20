function structureRole(data){
    var self = this;
    self.RoleID = ko.observable(data.RoleID);
    self.RoleDescription = ko.observable(data.RoleDescription);
    self.Action = ko.observable(data.Action);
};


function OfficeStructure(data) {
    var self = this;
    self.Address = ko.observable(data.Address);
    self.DistrictCode = ko.observable(data.DistrictCode);
    self.Email = ko.observable(data.Email);
    self.FaxNo = ko.observable(data.FaxNo);
    self.HouseNo = ko.observable(data.HouseNo);
    self.IRDCode = ko.observable(data.IRDCode);
    self.NewPayingOfficeCode = ko.observable(data.NewPayingOfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    self.OfficeNameEng = ko.observable(data.OfficeNameEng);
    self.OfficeType = ko.observable(data.OfficeType);
    self.OfficeName = ko.observable(data.OfficeName);
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.ParentID = ko.observable(data.ParentID);
    self.PayingOfficeCode = ko.observable(data.PayingOfficeCode);
    self.PhoneNo = ko.observable(data.PhoneNo);
    self.StreetName = ko.observable(data.StreetName);
    self.Vdc = ko.observable(data.Vdc);
    self.WardNo = ko.observable(data.WardNo);

}

//#endregion

//#region Structure for office users

function GetOfficeUser(data) {
    var self = this;
    self.UserID = ko.observable(data.UserID);
    self.UserName = ko.observable(data.UserName);
}

//#endregion

//#region Structure for application

function ApplicationStructure(data) {
    var self = this;
    self.ApplicationID = ko.observable(data.ApplicationID);
    self.ApplicationDescription = ko.observable(data.ApplicationDescription);
    self.OrderCode = ko.observable(data.OrderCode);
}

//#endregion

//#region Structure for designation
function GetDesignation(data) {
    var self = this;
    self.DesID = ko.observable(data.DesID);
    self.DesName = ko.observable(data.DesName);
    self.DesNameEng = ko.observable(data.DesNameEng);
    self.Status = ko.observable(data.Status);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
}
//#endregion

//#region Structure for User Details

function UserDetails(data) {
    var self = this;
    if (data != null) {
        self.ApplicationID = ko.observable(data.ApplicationID);
        self.AccountStatus = ko.observable(data.AccountStatus);
        self.Action = ko.observable(data.Action);
        self.AuthBy = ko.observable(data.AuthBy);
        self.AuthDate = ko.observable(data.AuthDate);
        self.AuthNo = ko.observable(data.AuthNo);
        self.CreatedBy = ko.observable(data.CreatedBy);
        self.CreatedDate = ko.observable(data.CreatedDate);
        self.DatabaseAccessUserName = ko.observable(data.DatabaseAccessUserName);
        self.DatabaseAccessUserPassword = ko.observable(data.DatabaseAccessUserPassword);
        self.EmpID = ko.observable(data.EmpID);
        self.EmployeeName = ko.observable(data.EmployeeName);
        self.IPAddress = ko.observable(data.IPAddress);
        self.LoggedIn = ko.observable(data.LoggedIn);
        self.Machine = ko.observable(data.Machine);
        self.Menus = ko.observable(data.Menus);
        self.OfficeUser = ko.observable(data.OfficeUser);
        self.Password = ko.observable(data.Password);
        self.Remarks = ko.observable(data.Remarks);
        self.TranDate = ko.observable(data.TranDate);
        self.UserName = ko.observable(data.UserName);
        self.UserID = ko.observable(data.UserID);
        self.UserNameNep = ko.observable(data.UserNameNep);
        self.UserRoles = ko.observable(data.UserRoles);
        self.UserStatus = ko.observable(data.UserStatus);
        self.UserDesignation = ko.observable(data.UserDesignation);
        self.UserModuleFunctions = ko.observable(data.UserModuleFunctions);
    }
}

//#endregion

//#region Structure for User Designation

function UserDesignation(data) {
    var self = this;
    if (data != null) {

        self.Action = ko.observable(data.Action);
        self.AuthorizationBy = ko.observable(data.AuthorizationBy);
        self.AuthorizationDate = ko.observable(data.AuthorizationDate);
        self.AuthorizationNo = ko.observable(data.AuthorizationNo);
        self.DES_ID = ko.observable(data.DES_ID);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.UserID = ko.observable(data.UserID);
    }
}

function UserStatus(data) {
    var self = this;
    self.UserID = ko.observable(data.UserID);
    self.UserStatus = ko.observable(data.UserStatus);
    self.FromDate = ko.observable(data.FromDate);
    self.SeqNo = ko.observable(data.SeqNo);
    self.ToDate = ko.observable(data.ToDate);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.AuthNo = ko.observable(data.AuthNo);
    self.AuthBy = ko.observable(data.AuthBy);
    self.AuthDate = ko.observable(data.AuthDate);
    self.Action = ko.observable(data.Action);
}


function UserViewModel() {
    var self = this;

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.OfficeNameEng = ko.observable();
    self.UserID = ko.observable();
    self.UserName = ko.observable();
    self.UserNameNep = ko.observable();
    self.EmployeeName = ko.observable();
    self.Password = ko.observable();
    self.ConfirmPassword = ko.observable();
    self.Action = ko.observable();
    self.RoleID = ko.observable();
    self.RoleDescription = ko.observable();
    self.RoleLST = ko.observableArray([]);
    self.EmpID = ko.observable();
    self.SelectedRole = ko.observableArray([]);
    self.CheckSource = ko.observable();


    self.OfficeArray = ko.observableArray([]);
    self.OfficeUserArray = ko.observableArray([]);
    self.SelectedOffice = ko.observable();
    self.SelectedUser = ko.observable();
    self.AccountStatus = ko.observable();
    self.selectedItem = ko.observable();
    self.getFocused = ko.observable();
    self.setFocus = ko.observable();

    self.GetOffice = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new OfficeStructure(item)
                });

                self.OfficeArray(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }

        });
    };

    self.GetRoles = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/SECURITY/Role.ashx',
            data: { 'method': 'GetRoles' },
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



    self.GetOfficeUsers = function () {
        waitMsg("Loading");
        waitMsg.show();
   

        //}
        if (ko.toJS(self.SelectedOffice()) != undefined) {

            var officeCode = ko.toJS(self.SelectedOffice().OfficeCode);


            $.ajax({
                dataType: "json",
                url: '../../../Handlers/SECURITY/UserHandler.ashx',
                data: { 'method': 'GetOfficeUsers', 'offcode': officeCode },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTasks = $.map(result.ResponseData, function (item) {
                        return new GetOfficeUser(item)
                    });
                    self.OfficeUserArray(mappedTasks);
                }
            });
        }
        waitMsg.hide();
        self.OfficeUserArray([]);
        //self.UserDetailsArray(null);
        //self.SelectedTransferredOffice(null);
        //document.getElementById("ddlTransferedTo").disabled = true;

    };

    //self.TranDate(getDate());
    //if (self.SelectedUser() == undefined) {
    //    $('#ddlTransferedTo').attr("disabled", "true");
    //}
    self.GetUserDetails = function () {

        if (ko.toJS(self.SelectedUser()) == undefined) {
            self.ClearControls();
            self.TranDate(getDate());
        }
        else {

            $("#txtUserID").attr("disabled", true);
            $("#txtUserNameNep").attr("disabled", true);
            $("#txtUserNameEng").attr("disabled", true);
            $("#txtPassword").attr("disabled", true);
            $("#txtConformPassword").attr("disabled", true);
            var userID = self.SelectedUser().UserID;

            $.ajax({
                dataType: "json",
                url: '../../../Handlers/SECURITY/UserHandler.ashx',
                data: { 'method': 'GetUserDetails', 'userid': userID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    debugger;
                    var data = ko.toJS(result.ResponseData);

                    //var data = result.ResponseData[0];
                    self.UserID(data.UserID);
                    self.UserName(data.UserName);
                    self.UserNameNep(data.UserNameNep);
                    self.EmployeeName(data.EmployeeName);
                    self.AccountStatus(data.AccountStatus);
                    self.Password(data.Password);
                    self.ConfirmPassword(data.ConfirmPassword);
                    self.Password("*****");
                    self.ConfirmPassword("*****");

                    
                },
                error: function (err) {
                    msg("Oops!error occured while obtaining users detail!!!", "WARNING");

                }
            });

        }

    };


    self.ResetPassword = function () {
        var User = {
            UserID: self.UserID(),
            Password: self.UserID()
        }

        var url = "../../../Handlers/SECURITY/UserHandler.ashx";
        var method = "SaveChangePassword";

        var data = { 'method': method, 'user': JSON.stringify(User) };
        $.post(url, data,
            function (result) {
                var obj = jQuery.parseJSON(result);
                if (obj.IsSucess) {
                    msg("Password changed!!!", "WARNING");
                    self.GetUserDetails();
                }
                else {
                    msg("Oops!Error occured while changing password !!!", "WARNING");
                }

            });
    }

    self.DeleteOffice = function (officesetup) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
                    data: { 'method': 'DeleteOffice', 'officeCode': officesetup.SelectedOffice, 'token': $("#token").text() },
                    contentType: "application/json; character=utf-8",
                    success: function (result) {
                        waitMsg.hide();
                        msg(result.Message);

                        if (result.IsSucess) {
                            msg(result.Message);
                            self.GetOffice();
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
    }

    
    //#region Function to Save User
    self.SaveUser = function () {
        
        var datas = {
            userName: self.UserNameNep(),
            userId: self.UserID(),
            userNameEnglish: self.UserName(),
            OfficeCode: ko.toJS(self.SelectedOffice()).OfficeCode,
            Password: self.Password(),
            empID: self.EmpID(),
            roleID: ko.toJS(self.SelectedRole()).RoleID,
            AccountStatus: self.AccountStatus()
        }
        debugger;


        var url = "/Handlers/SECURITY/UserHandler.ashx";
        var data = { 'method': 'SaveUser', 'args': JSON.stringify(datas) };
        $.post(url, data,
            function (result) {
                var obj = jQuery.parseJSON(result);
                msg(obj.Message);
                if (obj.Message == "Successfully Updated !!!" || obj.Message == "User Created Successfully !!!") {
                    self.ClearControls();

                }

            });

    }

    //#endregion
    //#endregion

    //#region Function to Clear Controls

    //self.ClearControls = function () {
    //    self.AddRoleArray([]);
    //    self.AddedApplicationArray([]);
    //    //self.SelectedOffice(null);
    //    self.SelectedUser(null);
    //    self.SelectedApplication(null);
    //    self.SelectedTransferredOffice(null);
    //    document.getElementById("ddlTransferedTo").disabled = true;
    //    self.UserID(null);
    //    self.UserName(null);
    //    self.UserNameNep(null);
    //    self.EmpID(null);
    //    self.EmployeeName(null);
    //    self.Password(null);
    //    self.TranDate(null);
    //    self.SelectedDesignation(null);
    //    self.Password(null);
    //    self.ConfirmPassword(null);
    //    self.AccountStatus(null);
    //    $("#txtUserID").attr("disabled", false);
    //    $("#txtUserNameNep").attr("disabled", false);
    //    $("#txtUserNameEng").attr("disabled", false);
    //    $("#txtPassword").attr("disabled", false);
    //    $("#txtConformPassword").attr("disabled", false);
    //}

    self.Validation = function () {
        var errMsg = "";

        if (Validate.empty(self.OfficeNameNep())) {
            errMsg += "Please fill office name !!!\n";

        }
        if (Validate.empty(self.Address())) {
            errMsg += "Please fill office address!!!\n";

        }
        if (Validate.empty(self.PhoneNo())) {
            errMsg += "Please fill office phone number!!!\n";

        }
        if (Validate.empty(self.Email())) {
            errMsg += "Please fill office email!!!\n";

        }

        if (errMsg === "") {
            return true;
        }
        else {
            msg(errMsg, "WARNING");
            return false;
        }

    }

    self.CancelOffice = function () {
        self.ClearControl();
        console.log(self.SelectedParentOrganization());
    }

    self.ClearControl = function () {
        self.OfficeNameNep("");
        self.Address("");
        self.PhoneNo("");
        self.Email("");

        self.SelectedOffice("");
        self.SelectedParentOrganization("");
    }



    self.SetNepali = function () {
        self.OfficeNameNep($("#txtOfficeName").val());
        self.Address($("#txtOfficeAddress").val());
        self.PhoneNo($("#txtOfficePhone").val());
        //        self.Email($("#txtOfficeEmail").val());
    }



    self.GetOffice();
    self.GetRoles();

    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
        if (self.CheckSource() === "employee") {
            GEmpID = self.EmpID();
            GEmpName = self.EmployeeName();
        }
    })

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {
            self.EmpID(GEmpID);
            self.EmployeeName(GEmpName);
            // $("#ddlOffice").attr("disabled", false);
            //self.ShowImpStatus();


        }

    })

   
};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new UserViewModel(), document.getElementById('UsersForm'));

})