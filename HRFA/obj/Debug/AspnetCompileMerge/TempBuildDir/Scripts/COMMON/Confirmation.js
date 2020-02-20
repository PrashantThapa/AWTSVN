
var Collection = function (data) {
    var self = this;

    //For Employer
    self.Employer = ko.observable(data.Employer);

    //Accessories - 1
    self.TranNo = ko.observable(data.TranNo);
    self.TranDate = ko.observable(data.TranDate);
    self.TotalAmount = ko.observable(data.TotalAmount);
    self.IntAmount = ko.observable(data.IntAmount);
    self.PenAmount = ko.observable(data.PenAmount);
    self.ContFromDate = ko.observable(data.ContFromDate);
    self.ContToDate = ko.observable(data.ContToDate);
    //Accessories - 2
    self.EntryBy = ko.observable(data.EntryBy);
    self.Status = ko.observable(data.Status);
    self.Action = ko.observable(data.Action);

    self.CollWrapperHeads = ko.observableArray(data.CollWrapperHeads);
    self.CollVoucherInfos = ko.observableArray(data.CollVoucherInfos); //Voucher info   

    self.SubmissionNo = ko.observable(data.SubmissionNo);

    self.DiaglogValues = ko.observable(data.DiaglogValues);

};


//function DisplayModel(value) {
//    
//    $("#Sfor").text(value);
//    $("#DisplayConfirmForm").modal({ // wire up the actual modal functionality and show the dialog
//        "backdrop": "static",
//        "keyboard": true,
//        "show": true // ensure the modal is shown immediately
//    })
//}
function WindowDisplay(value) {    
    if (value == null)
        window.location == window.location.origin + "/PortalHome.aspx";
    else
        window.location = window.location.origin + "/PortalHome.aspx?C=" + value;
}


var ConfirmationModel = function () {

    var self = this;

    var EmployerID = $("#empid").text();

    //User Details
    self.UserID = ko.observable();
    self.UserName = ko.observable();
    self.Password = ko.observable();

    //Collection
    self.Collection = ko.observable();
    self.EmployerID = ko.observable();

    //Text box values
    self.SubmissionNo = ko.observable();
    self.SubmissionEntryBox = ko.observable();

    //Display(for visibility) ON/OFF
    self.SubmissionNoDisplay = ko.observable(false);
    self.SubmissionEntryBoxDisplay = ko.observable(false);


    /************************* Button Clicked Operations *************************/
    self.YesBtnClicked = function () {
        self.SubmissionNoDisplay(false);
        self.SubmissionEntryBoxDisplay(true);
    };






    self.GetSubmissionNo = function () {
        var userDetail = {
            UserId: "DCGC_MAIN",
            UserName: "DCGC_MAIN",
            Password: "DCGC_MAIN",
            SubmissionFor: "PC", //$("#Sfor").text(),
            Action: "A"
        };

        self.SubmissionEntryBoxDisplay(false);
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '../../../Handlers/COMMON/SubmissionHandler.ashx',
            data: { 'method': 'SaveSubmission', 'args': JSON.stringify(userDetail) },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (result) {
                if (result.IsSucess) {
                    self.SubmissionNo(result.Message);
                    self.SubmissionNoDisplay(true);
                    self.SubmissionEntryBoxDisplay(false);
                    msg("Submission number saved sucessfully","WARNING");
                }
                else {
                    self.SubmissionNoDisplay(false);
					self.SubmissionEntryBoxDisplay(false);
					msg("Oops! Error occured while getting submission number! ...","WARNING");
                    
                }
            },
            error: function (err) {
				 msg("Oops! Error Occured while generating submission number!...","WARNING");
            }
        });
    };

    self.SubmitSubmissionNo = function () {

        var submissionNo = self.SubmissionEntryBox();
        if (submissionNo == undefined || submissionNo == '') {
			 msg("Submission number incorrect","WARNING");
        } else {
            var UId = $("#user").text();
            switch ($("#Sfor").text()) {

                case 'PC': //pc ko case 
                    $.ajax({
                        type: 'GET',
                        dataType: "json",
                        url: '../../../Handlers/DLISM/PremiumCollection.ashx',
                        data: { 'method': 'GetCollTranHead', 'submissionNo': submissionNo, "employerID": EmployerID, "userID": UId },
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result.IsSucess) {
                                window.location = window.location.origin + "/Modules/DLISM/PremiumCollection.aspx?SubmissionNumber=" + submissionNo;
                            }
							else {
								 msg("Submission number incorrect !!! ","WARNING");

                            }

                        },
                        error: function (err) {
							 msg("Oops! Error occured while saving submission number!...","WARNING");
                        }
                    });
                    break;
                case 'PC':
                    window.location = window.location.origin + "/Modules/DLISM/PremiumCollection.aspx?SubmissionNumber=" + submissionNo;
                    break;

            }
        }



    };





    self.Clear = function () {
        self.SubmissionNoDisplay(false);
        self.SubmissionEntryBoxDisplay(false);
    };

    self.Cancel = function () {
        self.SubmissionEntryBoxDisplay(false);
    };

    self.Ok = function () {
        sessionStorage.setItem("Success", false);
       
        switch (self.DiaglogValues) {
            case 'PC':
                window.location = window.location.origin + "/Modules/DLISM/PremiumCollection.aspx?SubmissionNumber=" + self.SubmissionNo() + "&BFIID=" + $("#BFIID").text();
                break;

            case 'PO':
                window.location = window.location.origin + "/Modules/DLISM/PayoutDetailDataUploader.aspx?SubmissionNumber=" + self.SubmissionNo() + "&BFIID=" + $("#BFIID").text();
                break;
        }
    }



    self.ShowDiaglog = function (DiaglogValue) {
        self.DiaglogValues = DiaglogValue;
        $("#DisplayConfirmForm").modal({ // wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        })
    }




};


$(document).ready(function () {
    //if (getUrlParamVal('C') != "") {
   //     DisplayModel(getUrlParamVal('C'));
   // }
//    $("#DisplayPremForm").click(function () {     // menu ID click garda    
//        WindowDisplay("PC");
//    });

//    $("#DisplaySubNoForm").click(function () {     // menu ID click garda    
//        WindowDisplay("PDDU");
//    });

    ko.applyBindings(new ConfirmationModel());

});
