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
function Submission(data) {
    var self = this;

    self.UserId = ko.observable(data.UserId);
    self.Password = ko.observable(data.Password);
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.SubmissionFor = ko.observable(data.SubmissionFor);
   
};

var LoginWithSubmissionNo = function () {
    var self = this;
    self.UserId = ko.observable();
    self.Password = ko.observable();
    self.SubmissionNo = ko.observable();
    self.SubmissionFor = ko.observable();

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.SubmissionNo("");
        self.UserId("");
        self.Password("");
        self.SubmissionFor("");

    };

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;

        if (self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
			errMsg = "Please Check your Submission number !!!";
            objFocus = self.SubmissionNo;
        }
        if (self.UserId() == "" || self.UserId() == undefined) {

			errMsg += "Please check your Name!!!>";
        }

        if (self.Password() == "" || self.Password() == undefined) {

			errMsg += "Please check Password !!!";
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
    //NB: To Save
    //--------------------------------------------------------------

    self.LoginSubmissionNo = function () {        
        if (self.Validation()) {
            $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: '../../Handlers/COMMON/SubmissionHandler.ashx',
                data: { 'method': 'LogInWithSubmissionNo', 'userId': self.UserId(), 'password': self.Password(), 'submissionNo': self.SubmissionNo() },
                contentType: "applicaton/json; character=utf -8",

                success: function (result) {
                    if (result.IsSucess) {
                        var url = "/Modules/DLISM/BIFRegistration.aspx?submissionNo=" + self.SubmissionNo() + "&status=N";
                        window.location = url;
                    }
                    else {
						 msg("Oops! Error occured while login with Submission No.!","WARNING");
                    }


                },
                error: function (err) {
                    msg("Oops! Error occured while login with Submission No. !!!","WARNING");
                }

            });

        }

    };


};

$(document).ready(function () {
  //  ValidateSession();
    ko.applyBindings(new LoginWithSubmissionNo());
});