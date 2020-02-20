

$("#userID").val(getUrlParamVal('userID'));
$("#empID").val(getUrlParamVal('empID'));



function ChangePassword(data) {
    var self = this;

    self.UserID = ko.observable(data.UserID);
    self.EmpID = ko.observable(data.BFIID);
    self.OldPassword = ko.observable(data.OldPassword);
    self.NewPassword = ko.observable(data.NewPassword);
    self.ConfPassword = ko.observable(data.ConfPassword);

}

function ChangePasswordViewModel() {
    var self = this;
    var userid = getUrlParamVal('userID');
    var empid = getUrlParamVal('empID');

   
    self.UserID = ko.observable(userid);
    self.EmpID = ko.observable(empid);
   

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


        if (self.Validation()) {
            waitMsg("Saving");
            waitMsg.show();

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
						msg("Password saved sucessfully !!", "SUCCESS");
						window.location = "/HRFAPortalHome.aspx";
						self.ClearControls();
						ClearSessionPortal();
      //                  callback = function () {
      //                      window.location = "/HRFAPortalHome.aspx";
      //                      self.ClearControls();
      //                      ClearSessionPortal();
						//}
						

                    }
                    else {
                        if (!result.IsToken)
							 msg("Oops! Error occured while saving password!!!", "WARNING");
                        else
                            msg("Oops! Error occured!", "WARNING");
                        self.ClearControls();
                    }

                },
                error: function (err) {
                    waitMsg.hide();
                    msg("Oops! Error occured while saving password!!!","WARNING");
                }


            });



        };
    };
};


$(document).ready(function () {

     
   PortalValidateSession();

    ko.applyBindings(new ChangePasswordViewModel());
});