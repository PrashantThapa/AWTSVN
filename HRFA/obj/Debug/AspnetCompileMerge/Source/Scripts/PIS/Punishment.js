function Post(data) {
    var self = this;
    if (data != undefined) {
        self.PostID = ko.observable(data.Post.PostID);
        self.PostDesc = ko.observable(data.Post.PostDesc);
    }
}

function OfficeDarbandi(data) {
    var self = this;
    if (data != undefined) {
        self.PostSeq = ko.observable(data.PostSeq);
    }
}

var PunishmentViewModel = function () {
    var self = this;

    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.PostSeq = ko.observable();
    self.Punishment = ko.observable();
    self.PunishmentDate = ko.observable();
    self.Remarks = ko.observable();

    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);
    self.RStatus = ko.observable();
    self.Action = ko.observable();

    self.grdOfficeCode = ko.observable();
    self.grdOfficeName = ko.observable();
    self.grdEmployeeID = ko.observable();
    self.grdEmployeeName = ko.observable();
    self.grdPostID = ko.observable();
    self.grdPostDesc = ko.observable();

    self.CheckSource = ko.observable();
    self.SubmissionNo = ko.observable();



    self.SavePunishment = function () {
        if (self.Validation()) {
            var office = {
                OfficeCode: self.grdOfficeCode,
                OfficeNameNep: self.grdOfficeName
            }

            var post = {
                PostID: self.grdPostID(),
                PostDesc: self.grdPostDesc()
            }

            var officedarbandi = {
                PostSeq: self.PostSeq()
            }



            var punishment = {
                OldSubmissionNo: self.SubmissionNo(),
                Office: office,
                Post: post,
                OfficeDarbandi: officedarbandi,
                EmpID: self.EmpID(),
                Punishment: self.Punishment(),
                PunishmentDate: self.PunishmentDate(),
                Remarks: self.Remarks(),
                EntryBy: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "A"
            };

            var url = "/Handlers/PIS/PunishmentHandler.ashx";
            var method = "SavePunishment";
            var appID = "PIS";
            var modID = "EMPPNS";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(punishment)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }
                                        self.ClearControls();

                                    });
        }
    }


    self.GetPunishmentBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }


        else {
            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, select, textarea').attr('disabled', 'disabled');
            }

            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/PunishmentHandler.ashx',
                data: { 'method': 'GetPunishment', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("Submission number is not valid.");
                    }
                    else {
                        self.EmpID(data.ResponseData.EmpID);
                        self.EmployeeName(data.ResponseData.EmployeeName);
                        self.grdOfficeCode(data.ResponseData.Office.OfficeCode);
                        self.grdOfficeName(data.ResponseData.Office.OfficeNameNep);
                        self.grdEmployeeID(data.ResponseData.EmpID);
                        self.grdEmployeeName(data.ResponseData.EmployeeName);
                        self.grdPostID(data.ResponseData.Post.PostID);
                        self.grdPostDesc(data.ResponseData.Post.PostDesc);
                        self.PostSeq(data.ResponseData.OfficeDarbandi.PostSeq);
                        self.Punishment(data.ResponseData.Punishment);
                        self.PunishmentDate(data.ResponseData.PunishmentDate);
                        self.Remarks(data.ResponseData.Remarks);
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }


    self.GetPunishmentBySubmissionNo();


    self.Validation = function () {
        var errMsg = "";
        self.SetNepaliValues();

        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name!!!<br>";
        }

        //        if (Validate.empty(self.grdPostDesc())) {
        //            errMsg += "कृपया पद भर्नुहोस !!!<br>";
        //        }

        if (Validate.empty(self.Punishment())) {
            errMsg += "Please fill punishment!!!<br>";
        }

        if (Validate.empty(self.PunishmentDate())) {
            errMsg += "Please fill punishment date!!!<br>";
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    self.ClearControls = function () {
        self.SetNepaliValues();
        self.EmpID('');
        self.EmployeeName('');
        self.PostSeq('');
        self.Punishment('');
        self.PunishmentDate('');
        self.Remarks('');
        self.grdEmployeeID('');
        self.grdEmployeeName('');
        self.grdOfficeCode('');
        self.grdOfficeName('');
        self.grdPostDesc('');
        self.grdPostID('');
    }

    self.SetNepaliValues = function () {
        self.Punishment($("#txtPunishment").val());
        self.PunishmentDate($("#txtPunishmentDate").val());
        self.Remarks($("#txtRemarks").val());
    }

    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
        if (self.CheckSource() === "employee") {
            GEmpID = self.EmpID();
            GEmpName = self.EmployeeName();
            GOfficeCD = self.grdOfficeCode();
            GOfficeName = self.grdOfficeName();
            GPostID = self.grdPostID();
            GPostDesc = self.grdPostDesc();
            GPostSeq = self.PostSeq();
        }
    })

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {
            self.EmpID(GEmpID);
            self.EmployeeName(GEmpName);
            self.grdEmployeeID(GEmpID);
            self.grdEmployeeName(GEmpName);
            self.grdOfficeCode(GOfficeCD);
            self.grdOfficeName(GOfficeName);
            self.grdPostID(GPostID);
            self.grdPostDesc(GPostDesc);
            self.PostSeq(GPostSeq);
        }

    })
}

$(document).ready(function () {
    ValidateSession();
    var pvm = new PunishmentViewModel();
    ko.applyBindings(pvm,document.getElementById('PunishmentForm'));

});
