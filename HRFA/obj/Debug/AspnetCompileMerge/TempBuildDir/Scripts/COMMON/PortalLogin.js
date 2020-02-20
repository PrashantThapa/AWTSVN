
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
var ContributorLogin = function (data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.UserID = ko.observable(data.UserID);
    self.Password = ko.observable(data.Password);
    self.UType = ko.observable(data.UType);
    self.AccountStatus = ko.observable(data.AccountStatus);

};



var ContributorLoginModel = function () {

    var self = this;

    /************************* Initialization *************************/
    self.EmpID = ko.observable();
    self.UserID = ko.observable();
    self.Password = ko.observable();
    self.UType = ko.observable("E");
    /************************* End of: Initialization *************************/



    /************************* Button Clicked Operations *************************/
    self.ContributorLogin = function () {

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
            UType: UType
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
						 msg("Oops! No Office Is Assigned For This User!!!","WARNING");						
                        return;
					}
					;
                    if (UserID.trim() == Password.trim()) {
						var User = data.ResponseData.UserID;

						var warnMsg = "Username And Password Couldnot Be Same!!";

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
					 msg("Error While Login Portal!!!","WARNING");		
                }
            },
            error: function (err) {
                msg("Error While Login Portal!!!","WARNING");	
            }
        });

    };

    self.Reset = function () {
        self.ClearFields();
    };
    /************************* End of: Button Clicked Operations *************************/

    self.Reset = function () {
        self.UserID("");
        self.Password("");
        $("#txtUserID").focus();

    }


    /************************* Clear Fields *************************/
    self.ClearFields = function () {
        self.SSID("");
        self.UserID("");
        self.Password("");
    };
    /************************* End of: Clear Fields *************************/
};


$(window).on('load',function () {
    ko.applyBindings(new ContributorLoginModel());
});

