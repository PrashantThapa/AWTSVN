
function Award(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.PostID = ko.observable(data.PostID);
    self.PostSeq = ko.observable(data.PostSeq);
    self.SeqNo = ko.observable(data.SeqNo);
    self.Award = ko.observable(data.Award);
    self.AwardDate = ko.observable(data.AwardDate);
    self.Remarks = ko.observable(data.Remarks);
    self.RStatus = ko.observable(data.RStatus);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
}

function AwardViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.PostID = ko.observable();
    self.PostName = ko.observable();
    self.PostSeq = ko.observable();
    self.Award = ko.observable();
    self.AwardDate = ko.observable();
    self.Remarks = ko.observable();
    self.RStatus = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CheckEmp = ko.observable();
    self.GridEmpName = ko.observable();

   self.SaveAward = function () {
        self.SetNepaliValues();
        if (self.ValidateAward()) {

            var office = {
                OfficeCode: self.OfficeCode()
            }

            var post = {
                PostID: self.PostID()
            }

            var officedarbandi = {
                PostSeq: self.PostSeq()
            }

            var award = {
                EmpID: self.EmpID(),
                Office: office,
                Post: post,
                OfficePostDarbandi: officedarbandi,
                AwardDate: self.AwardDate(),
                Award: self.Award(),
                RStatus: "F",
                EntryBy: $("#user").text(),
                EntryDate: null,
                Remarks: self.Remarks(),
                Action: 'A',
                OldSubmissionNo:self.SubmissionNo()
            }

            var url = "../../../Handlers/PIS/AwardHandler.ashx";
            var appID = "PIS";
            var modID = "EMPAWD";
            var data = { 'method': 'SaveAward', 'args': JSON.stringify(ko.toJS(award)), 'appID': appID, 'modID': modID };
            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
                msg(obj.Message);
                
                    self.ClearControl();
              

            });
        }
    }

    self.CancelAward = function () {
        self.SetNepaliValues();
        self.ClearControl();
    }

    self.SetNepaliValues = function () {
        self.Remarks($("#txtRemarks").val());
        self.Award($("#txtAward").val());
    }

    self.ValidateAwardPost = function () {
        if (self.SubmissionNo() != undefined || self.SubmissionNo() != "") {
            return true;
        }
        var errMsg = "";
        if (Validate.empty(self.EmpID())) {
            errMsg += "Please select employee!!!\n";
        }

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.ValidateAward = function () {
        var errMsg = "";
        if (Validate.empty(self.EmpID())) {
            errMsg += "Please select employee!!!\n";
        }
        if (Validate.empty(self.AwardDate())) {
            errMsg += "Please fill award date!!!\n";
        }
        if (Validate.empty(self.Award())) {
            errMsg += "Please fill award!!!\n";
        }

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.GetAwardBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }


        else {
            if (editable == 'Y') {

            }
            else {
                $('#lblOffice').hide();
                //$('#divDdlOffice').hide();
                //$('#lblEmpName').hide();
                //$('#divTxtEmpName').hide();
                $('button').hide();
                $('form').find('input, select, textarea').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/AwardHandler.ashx',
                data: { 'method': 'GetAward', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("Submission number is not valid !!!");
                    }
                    else {
                   
                        self.EmpID(data.ResponseData[0].EmpID);
                        self.EmployeeName(data.ResponseData[0].EmployeeName);
                        self.AwardDate(data.ResponseData[0].AwardDate);
                        $("#txtAward").val(data.ResponseData[0].Award);
                        $("#txtRemarks").val(data.ResponseData[0].Remarks);
                        self.ShowCurrentPost();
                        

                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }

    self.ShowCurrentPost = function () {
        self.SetNepaliValues();
        if (self.ValidateAwardPost()) {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/PIS/PromotionHandler.ashx',
                data: { 'method': 'GetOfficeEmpPost', 'empID': self.EmpID() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = result.ResponseData[0];
                    self.OfficeNameNep(data.Office.OfficeNameNep);
                    self.GridEmpName(self.EmployeeName());
                    self.PostName(data.Post.PostDesc);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.GetAwardBySubmissionNo();

    self.ClearControl = function () {
        self.Award("");
        self.AwardDate("");
        self.Remarks("");
        self.EmpID("");
        self.EmployeeName("");
        self.OfficeNameNep("");
        self.GridEmpName("");
        self.PostName("");
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
    ValidateSession();
    var awardViewModel = new AwardViewModel();
    ko.applyBindings(awardViewModel, document.getElementById("AwardForm"));
})