var ChangePasswordViewModel = function () {
    var self = this;

    var user = $("#user").text();

    self.UserID = ko.observable(user);
    self.NewPassword = ko.observable();
    self.ConfirmPassword = ko.observable();
    self.isDisabled = ko.observable(true);




    self.ChangePassword = function () {
        if (self.Validation()) {
            var User = {
                UserID: self.UserID(),
                Password: self.NewPassword()

            };
            $.ajax({
                type: 'GET',
                dataType: "json",
                cache: false,
                url: '../../Handlers/SECURITY/UserHandler.ashx',
                data: { 'method': 'SaveChangePassword', 'user': JSON.stringify(User) },
                contentType: "application/json; character=utf-8",

                success: function (result) {
					if (result.IsSucess) {
						msg("पासवर्ड सुरक्षित भयो  !!!","SUCCESS");
                        
                        self.ClearControls();
                        ClearSession();
                        window.location = "../../Modules/SECURITY/Login.aspx";
                    }
                    else {
						 msg("ओहो! पासवर्ड सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                    }


                },
                error: function (err) {
                    waitMsg.hide();
					 msg("ओहो! पासवर्ड सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                }
            });

        }
    }

    self.Cancel = function () {
        self.ClearControls();
    }

    self.ClearControls = function () {
        self.NewPassword('');
        self.ConfirmPassword('');
    }

    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.NewPassword())) {
            errMsg += "Please Enter New Password !!!<br>";
        }
        if (Validate.empty(self.ConfirmPassword())) {
            errMsg += "Please Enter Confirm Password !!!<br>";
        }
        if (self.NewPassword() != self.ConfirmPassword()) {
            errMsg += "Passwords donot match!!!<br>"
        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }
    }

}

$(document).ready(function() {
 ValidateSession();
var ucp = new ChangePasswordViewModel();
ko.applyBindings(ucp);
})