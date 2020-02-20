


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

    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.UserId = ko.observable(data.UserId);
    self.Password = ko.observable(data.Password);
    self.UserName = ko.observable(data.UserName);
    self.Address = ko.observable(data.Address);
    self.PhoneNo = ko.observable(data.PhoneNo);
    self.Email = ko.observable(data.Email);
    self.OldId = ko.observable(data.OldId);
    self.SubmissionFor = ko.observable(data.SubmissionFor);
    self.Action = ko.observable(data.Action);

}

function SubmissionionViewModel() {
    var self = this;

    self.SubmissionNo = ko.observable();
    self.UserId = ko.observable();
    self.Password = ko.observable();
    self.UserName = ko.observable();
    self.Address = ko.observable();
    self.PhoneNo = ko.observable();
    self.Email = ko.observable();
    self.OldId = ko.observable();
    self.SubmissionFor = ko.observable();
    self.Action = ko.observable("A");
    self.ConformPassword = ko.observable();

    
    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.SubmissionNo("");
        self.UserId("");
        self.Password("");
        self.UserName("");
        self.Address("");
        self.PhoneNo("");
        self.Email("");
        self.OldId("");
        self.SubmissionFor("");
        self.Action("");
        self.ConformPassword("");
 };

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
 self.Validation = function () {

     var errMsg = "";
     var objFocus = null;
     // console.log("password>>",self.Password());
     if (ko.toJS(self.UserId()) === "" || ko.toJS(self.UserId()) === undefined) {
         errMsg = "Please Enter User ID !!!<br>";
         objFocus = self.UserId;
     }

     if (ko.toJS(self.Password()) === "" || ko.toJS(self.Password()) === undefined || ko.toJS(self.Password().length) < 5) {

         errMsg += "Please Enter Password with minimum five characters !!!<br>";
     }
     if (ko.toJS(self.UserName()) === "" || ko.toJS(self.UserName()) === undefined) {

         errMsg += "Please Enter User Name !!!<br>";
     }
     //        if (ko.toJS(self.Password().length) < 5 || ko.toJS(self.Password()) == undefined) {

     //            errMsg += "Please Enter Password with minimum five characters!!!<br>";
     //        }
     if (ko.toJS(self.ConformPassword()) !== ko.toJS(self.Password()) || ko.toJS(self.ConformPassword()) === undefined) {
         errMsg += "Entered Password and Confirm Password must be same <br>";
     }
     //console.log(ko.toJS(self.Email));
     if (ko.toJS(self.Email) !== undefined && ko.toJS(self.Email) !== "") {

         if (Validate.email(self.Email())) {
             errMsg += "Please Enter Valid Email !!!<br>";
         }

     }
     var captchVal  = $("#Captcha").val();
     //alert("Here" + captchVal);
     if (captchVal === "") {
         errMsg += "Please Enter Captcha code !!!";
     }

     //console.log('length', self.Password().length);
     /*
     if (self.UserId() == self.Password()) {

     errMsg += "User Name and Password cannot be same !!!<br>";
     }
     */
     if (errMsg !== "") {
          msg(errMsg,"WARNING");

         return false;
     }
     else {
         return true;
     }

 };

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearSubmission = function () {
        self.ClearControls();
        self.Submissions.removeAll();
    };
    //--------------------------------------------------------------
    //NB: To Save
    //--------------------------------------------------------------

    self.SaveSubmission = function (Submission) {
        var captcha = $("#Captcha").val();
        if (self.Validation()) {
            sub = {
                SubmissionNo: self.SubmissionNo(),
                UserId: self.UserId(),
                Password: self.Password(),
                UserName: self.UserName(),
                Address: self.Address(),
                PhoneNo: self.PhoneNo(),
                Email: self.Email(),
                SubmissionFor: "BFIREG",
                OldId: "1",
                Action: "A"
            };


            $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: '../../Handlers/COMMON/SubmissionHandler.ashx',
                data: { 'method': 'SaveSubmissionWithCaptcha', 'args': JSON.stringify(ko.toJS(sub)), 'captcha': captcha },
                contentType: "applicaton/json; character=utf -8",

                success: function (result) {

					if (result.IsSucess) {
						
						msg(result.Message  ,"SUCCESS");
						var url = "/Modules/DLISM/BIFRegistration.aspx?submissionNo=" + result.Message + "&status=N";
						window.location = url;
                    }
					else {
						msg("ओहो! सबमिशन नंबर सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!", "WARNING");
                    }


                },
				error: function (err) {
					msg("ओहो! सबमिशन नंबर सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!", "WARNING");
                }

            });

        }
      
    };


}

$(document).ready(function () {
 ko.applyBindings(new SubmissionionViewModel());
});