
function ChangePassword(data) {
    var self = this;

    self.UserID = ko.observable(data.UserID);
    self.EmpID = ko.observable(data.EmpID);
    self.OldPassword = ko.observable(data.OldPassword);
    self.NewPassword = ko.observable(data.NewPassword);
    self.ConfPassword = ko.observable(data.ConfPassword);

}

function ChangePasswordViewModel() {
    var self = this;


    var user = $("#userID").text();
    var empID = $("#empID").text();

    self.UserID = ko.observable(user); 
    self.EmpID = ko.observable(empID);

    console.log(self.EmpID());

    self.OldPassword = ko.observable();
    self.NewPassword = ko.observable();
    self.ConfPassword = ko.observable();
    self.ChangePasswords = ko.observableArray([]);

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
      
        self.OldPassword("");
        self.NewPassword("");
        self.ConfPassword("");

    };

    self.ClearChangePassword = function () {
        self.ClearControls();
        self.ChangePasswords.removeAll();


    };
    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------

    self.Ok = function () { }
    self.ShowDiaglog = function () { }


    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;


        if (ko.toJS(self.NewPassword()) == "" || ko.toJS(self.NewPassword()) == undefined || ko.toJS(self.NewPassword().length) < 5) {

            errMsg += "Please Enter New Password with minimum five characters !!!<br>";
        }
        if (ko.toJS(self.ConfPassword()) == "" || ko.toJS(self.ConfPassword()) == undefined || ko.toJS(self.ConfPassword().length) < 5) {

            errMsg += "Please Enter Confirm New Password with minimum five characters !!!<br>";
        }

        if (ko.toJS(self.ConfPassword()) != ko.toJS(self.NewPassword()) || ko.toJS(self.ConfPassword()) === undefined) {
            errMsg += "Entered New Password and Confirm  New Password must be same <br>";
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };


    //--------------------------------------------------------------


    //To Save Change Password
    //--------------------------------------------------------------
    self.SaveChangePassword = function (ChangePassword) {
        var ChangePasswords = {
            UserID: self.UserID(),
            EmpID: self.EmpID(),
            OldPassword: self.OldPassword(),
            NewPassword: self.NewPassword(),
            ConfPassword: self.ConfPassword()

        };


        
            debugger;
            $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: '../../Handlers/COMMON/PortalLoginHandler.ashx',
                data: { 'method': 'SaveChangePassword', 'changepass': JSON.stringify(ChangePasswords) },
                contentType: "applicaton/json; character=utf -8",

                success: function (result) {
                    waitMsg.hide();

                    if (result.IsSucess) {
                        callback = function () {
                            window.location = "/PortalHome.aspx";
                            self.ClearControls();
                        }
						 msg("Password Saved!!!", "SUCCESS");

                    }
                    else {
                        if (!result.IsToken)
							 msg("Oops Error While saving Password!!!", "WARNING");
                        else
                            msg("Oops Error While saving Password !!!","WARNING");
                        self.ClearControls();
                    }

                },
                error: function (err) {
                    waitMsg.hide();
                    msg("Oops Error While saving Password !!!","WARNING");
                }


            });



        };
    };
   
$(document).ready(function () {

    PortalValidateSession();
    ko.applyBindings(new ChangePasswordViewModel());
});