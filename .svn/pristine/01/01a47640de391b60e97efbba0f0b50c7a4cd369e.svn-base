
function Appraisal(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.PostID = ko.observable(data.PostID);
    self.PostSeq = ko.observable(data.PostSeq);
    self.SeqNo = ko.observable(data.SeqNo);
    self.Appraisal = ko.observable(data.Appraisal);
    self.AppraisalDate = ko.observable(data.AppraisalDate);
    self.Remarks = ko.observable(data.Remarks);
    self.RStatus = ko.observable(data.RStatus);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
}

function Category(data) {
    var self = this;
    self.id = ko.observable(data.id);
    self.name = ko.observable(data.name);
    self.points = ko.observable(data.points);
    self.givenPoints = ko.observable(data.givenPoints);
}

function AppraisalViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.PostID = ko.observable();
    self.PostName = ko.observable();
    self.PostSeq = ko.observable();
    self.Appraisal = ko.observable();
    self.AppraisalDate = ko.observable();
    self.Remarks = ko.observable();

    self.AppraisalCategories = ko.observableArray([
        new Category({ id: 1, name: "Discipline", points: 5, givenPoints: 0 }),
        new Category({ id: 2, name: "Communication", points: 5, givenPoints: 0 }),
        new Category({ id: 3, name: "Knowledge", points: 5, givenPoints: 0 }),
        new Category({ id: 4, name: "Performance", points: 5, givenPoints: 0 }),
    ]);

    self.RStatus = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CheckEmp = ko.observable();
    self.GridEmpName = ko.observable();

    self.ChangableCategory = ko.observable(new Category({ id: 0, name: "", points: 0 }));
    self.SaveCategory = function () {
        // validate this category

        var url = "../../../Handlers/PIS/AppraisalHandler.ashx";
        var appID = "PIS";
        var modID = "EMPAWD";
        var data = { 'method': 'SaveAppraisalCategory', 'args': JSON.stringify(ko.toJS(self.ChangableCategory())), 'appID': appID, 'modID': modID };
        $.post(url, data, function (result) {
            var obj = jQuery.parseJSON(result);
            msg(obj.Message);
            self.ClearAppraisalCategory();
        });
    }
    self.ClearAppraisalCategory = function () {
        self.ChangableCategory(new Category({ id: 0, name: "", points: 0 }));
    }

    self.SaveAppraisal = function () {
        //self.SetNepaliValues();
        //if (self.ValidateAppraisal()) {

        var office = {
            OfficeCode: self.OfficeCode()
        }

        var post = {
            PostID: self.PostID()
        }

        var officedarbandi = {
            PostSeq: self.PostSeq()
        }

        var Appraisal = {
            EmpID: self.EmpID(),
            Office: office,
            Post: post,
            OfficePostDarbandi: officedarbandi,
            AppraisalDate: self.AppraisalDate(),
            AppraisalCategories: self.AppraisalCategories(),
            Appraisal: self.Appraisal(),
            RStatus: "F",
            EntryBy: $("#user").text(),
            EntryDate: null,
            Remarks: self.Remarks(),
            Action: 'A',
            OldSubmissionNo: self.SubmissionNo()
        }

        var url = "../../../Handlers/PIS/AppraisalHandler.ashx";
        var appID = "PIS";
        var modID = "EMPAWD";
        var data = { 'method': 'SaveAppraisal', 'args': JSON.stringify(ko.toJS(Appraisal)), 'appID': appID, 'modID': modID };
        $.post(url, data, function (result) {
            var obj = jQuery.parseJSON(result);
            msg(obj.Message);

            self.ClearControl();
        });
        //}
    }

    self.CancelAppraisal = function () {
        //self.SetNepaliValues();
        self.ClearControl();
    }

    // self.SetNepaliValues = function () {
    //     self.Remarks($("#txtRemarks").val());
    //     self.Appraisal($("#txtAppraisal").val());
    // }

    // self.ValidateAppraisalPost = function () {
    //     if (self.SubmissionNo() != undefined || self.SubmissionNo() != "") {
    //         return true;
    //     }
    //     var errMsg = "";
    //     if (Validate.empty(self.EmpID())) {
    //         errMsg += "Please select employee!!!\n";
    //     }

    //     if (errMsg === "") {
    //         return true;
    //     }
    //     else {
    //          msg(errMsg,"WARNING");
    //         return false;
    //     }
    // }

    // self.ValidateAppraisal = function () {
    //     var errMsg = "";
    //     if (Validate.empty(self.EmpID())) {
    //         errMsg += "Please select employee!!!\n";
    //     }
    //     if (Validate.empty(self.AppraisalDate())) {
    //         errMsg += "Please fill Appraisal date!!!\n";
    //     }
    //     if (Validate.empty(self.Appraisal())) {
    //         errMsg += "Please fill Appraisal!!!\n";
    //     }

    //     if (errMsg === "") {
    //         return true;
    //     }
    //     else {
    //          msg(errMsg,"WARNING");
    //         return false;
    //     }
    // }

    // self.GetAppraisalBySubmissionNo = function () {
    //     self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
    //     var editable = getUrlParamVal('Editable');

    //     if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
    //         return;
    //     }


    //     else {
    //         if (editable == 'Y') {

    //         }
    //         else {
    //             $('#lblOffice').hide();
    //             //$('#divDdlOffice').hide();
    //             //$('#lblEmpName').hide();
    //             //$('#divTxtEmpName').hide();
    //             $('button').hide();
    //             $('form').find('input, select, textarea').attr('disabled', 'disabled');
    //         }
    //         $.ajax({
    //             dataType: "json",
    //             url: '../../Handlers/PIS/AppraisalHandler.ashx',
    //             data: { 'method': 'GetAppraisal', 'submissionNo': self.SubmissionNo() },
    //             contentType: "application/json; charset=utf-8",
    //             async: false,
    //             success: function (data) {
    //                 if (data.ResponseData == null) {
    //                     msg("Submission number is not valid !!!");
    //                 }
    //                 else {

    //                     self.EmpID(data.ResponseData[0].EmpID);
    //                     self.EmployeeName(data.ResponseData[0].EmployeeName);
    //                     self.AppraisalDate(data.ResponseData[0].AppraisalDate);
    //                     $("#txtAppraisal").val(data.ResponseData[0].Appraisal);
    //                     $("#txtRemarks").val(data.ResponseData[0].Remarks);
    //                     self.ShowCurrentPost();


    //                 }
    //             },
    //             error: function (err) {
    //                 msg(err.status + " - " + err.statusText);
    //             }
    //         });
    //     }
    // }

    // self.ShowCurrentPost = function () {
    //     self.SetNepaliValues();
    //     if (self.ValidateAppraisalPost()) {
    //         $.ajax({
    //             dataType: "json",
    //             cache: false,
    //             async: false,
    //             url: '../../../Handlers/PIS/PromotionHandler.ashx',
    //             data: { 'method': 'GetOfficeEmpPost', 'empID': self.EmpID() },
    //             contentType: "application/json; charset=utf-8",
    //             success: function (result) {
    //                 var data = result.ResponseData[0];
    //                 self.OfficeNameNep(data.Office.OfficeNameNep);
    //                 self.GridEmpName(self.EmployeeName());
    //                 self.PostName(data.Post.PostDesc);
    //             },
    //             error: function (err) {
    //                 msg(err.status + " - " + err.statusText, "FAILURE");
    //             }
    //         });
    //     }
    // }

    // self.GetAppraisalBySubmissionNo();

    self.ClearControl = function () {
        self.Appraisal("");
        self.AppraisalDate("");
        self.Remarks("");
        self.EmpID("");
        self.EmployeeName("");
        self.OfficeNameNep("");
        self.GridEmpName("");
        self.PostName("");
        self.AppraisalCategories([]);
    }

    $('#modalEmpSearch').on('hidden.bs.modal', function () {
        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);
        self.OfficeCode(GOfficeCD);
        self.OfficeNameNep(GOfficeName);
        self.GridEmpName(self.EmployeeName());
        self.PostName(GPostDesc);
        self.PostID(GPostID);
        self.PostSeq(GPostSeq);
    })
}

$(document).ready(function () {
    //ValidateSession();
    //var AppraisalViewModel = new AppraisalViewModel();
    ko.applyBindings(new AppraisalViewModel(), document.getElementById("AppraisalForm"));

    $(document).on("click", "#apprLink, #cancel", () => {
        $("#hideable").toggle();
    });
})

