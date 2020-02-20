ko.bindingHandlers.returnAction = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        $(element).keydown(function (e) {
            if (e.which === 13) {
                value(viewModel);
            }
        });
    }
};


var LoginViewModel = function LoginViewModel() {
    var self = this;
    self.UserID = ko.observable('');
    self.Password = ko.observable('');
    self.userlogin = ko.observableArray([]);
    $("#txtUserID").focus();
    $('#txtUserIDS').focus();

    self.EmpID = ko.observable();
    self.UserID = ko.observable();
    self.Password = ko.observable();
    self.RoleID = ko.observable();
    self.UType = ko.observable("E");

    self.Password.subscribe(function (value) {

    });

    self.Reset = function () {
        self.UserID("");
        self.Password("");
        $("#txtUserID").focus();

    }
    self.reset = function () {
        self.UserID("");
        self.Password("");
        $("#txtUserIDS").focus();

    }

    self.UserID.subscribe(function (value) {
    });
    self.LoginUser = function () {

        //if (self.UserID() == "HR_OWNER") {
        //    msg("Not a authiorized UserName.","WARNING");
        //}
        //else 

        {
                    var jsonData = {
                        UserID: self.UserID().toUpperCase(),
                        Password: self.Password()
                    };

                    $.ajax({
                        dataType: "json",
                        cache: false,
                        url: '../../../Handlers/SECURITY/LoginHandler.ashx',
                        data: { 'method': 'LogIn', 'args': JSON.stringify(jsonData) },
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result.IsSucess) {

                                if (self.UserID().trim() == self.Password().trim()) {

                                    var warnMsg = "Username and Password cannot be same so change the Password !!!";

                                    msg(warnMsg, "WARNING", null, function () { window.location = "../../Modules/SECURITY/UserChangePassword.aspx" });
                                    return;

                                }
                                else {
                                    window.location = "../../AdminHome.aspx";
                                }
                            }

                            else {
                                msg(result.Message, "WARNING");
                            }
                        },
                        error: function (err) {
                            msg("Oops Error while login to Portal !!!", "WARNING");
                        }

                    });
         
                }
            
    };

    self.loginUser = function () {
        var UType = self.UType(); //Distinguish -  self-contributor OR Employer

        var EmpID = $.trim(self.EmpID());
        var UserID = $.trim(self.UserID());
        var Password = $.trim(self.Password());      
        var UType = "E";
        $("#txtUserID").focus();

        var LoginDetails = {
            EmpID: EmpID,
            UserID: UserID,
            Password: Password,
            UType: UType,
        };

        waitMsg("Trying to Login...");
        waitMsg.show();

        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '../../Handlers/COMMON/PortalLoginHandler.ashx',
            data: { 'method': 'PortalLogin', 'args': JSON.stringify(LoginDetails) },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                waitMsg.hide();
                if (data.IsSucess) {
                    var EmpID = data.ResponseData.EmpID;

                    if (EmpID == null || EmpID == undefined) {
                        msg("Oops No Office is assigned to this User!!!", "WARNING");
                        return;
                    }
                    ;
                    if (UserID.trim() == Password.trim()) {
                        var User = data.ResponseData.UserID;

                        var warnMsg = "Username and Password cannot be same so change the Password!!!";

                        msg(warnMsg, "WARNING", null, function () { window.location = "/Modules/COMMON/PortalChangePassword.aspx?userID=" + User + "&empID=" + EmpID; });
                        return;




                    }
                    $("#userID").text(data.ResponseData.UserID);
                    $("#empID").text(data.ResponseData.EmpID);

                    if (UType == "E")
                        window.location = "/PortalHome.aspx";
                    else
                        window.location = "/PortalHome.aspx";


                } else {
                    msg("Oops Error while login to Portal !!!", "WARNING");
                }
            },
            error: function (err) {
                msg("Oops Error while login to Portal !!!", "WARNING");
            }
        });
        }

};

$(document).ready(function () {
    sessionStorage.clear();
    ko.applyBindings(new LoginViewModel());
});