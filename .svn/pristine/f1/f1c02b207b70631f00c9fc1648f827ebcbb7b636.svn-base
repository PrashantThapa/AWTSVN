


function Post(data) {
    var self = this;
    if (data != undefined) {
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);
    }
}
function PromotionType(data) {
    var self = this;
    if (data != undefined) {
        self.PromoTypeID = ko.observable(data.PromoTypeID);
        self.PromoTypeDesc = ko.observable(data.PromoTypeDesc);
        self.PromoTypeEng = ko.observable(data.PromoTypeEng);
        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.PromoType = ko.observable(data.PromoType);
    }
}

var PromotionViewModel = function () {
    var self = this;

    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.LetterIssueDate = ko.observable();
    self.EffectiveDate = ko.observable();
    self.EffectiveTillDate = ko.observable();
    self.SupervisorID = ko.observable();
    self.SupervisorName = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();

    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);
    self.Status = ko.observable();
    self.Action = ko.observable();

    self.grdOfficeCode = ko.observable();
    self.grdOfficeName = ko.observable();
    self.grdEmployeeID = ko.observable();
    self.grdEmployeeName = ko.observable();
    self.grdPostID = ko.observable();
    self.grdPostDesc = ko.observable();

    self.SelectedPromotionType = ko.observable();
    self.SelectedPOffice = ko.observable();
    self.SelectedPost = ko.observable();

    self.CheckSource = ko.observable();
    self.SubmissionNo = ko.observable(null);
    self.Days = ko.observable();

    self.PromotionTypes = ko.observableArray([]);
    self.GetPromotionType = function () {
        $.ajax({
            dataType: "json",
            url: '../../Handlers/PIS/PromotionHandler.ashx',
            data: { 'method': 'GetPromotionType', 'PromoTypeID': null },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new PromotionType(item)

                });
                self.PromotionTypes(mappedTask);


            },
            error: function (err) {
                msg(err.status + " - " + err.statusText);
            }
        });

    }



    //    { 'PromoTypeID': '1', 'PromoTypeDesc': 'File Promotion' },
    //    { 'PromoTypeID': '2', 'PromoTypeDesc': 'Upgrade' },
    //    { 'PromoTypeID': '3', 'PromoTypeDesc': 'Internal Competition' }
    //]);
    self.Posts = ko.observableArray([]);

    self.GetPromotionType();

    //Load Post
    $.ajax({
        dataType: "json",
        url: '../../Handlers/COMMON/PostHandler.ashx',
        data: { 'method': 'GetPost', 'postID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Post(item)

            });
            self.Posts(mappedTask);


        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });



    self.GetDateDifference = function (date1, date2) {
        if (date1 != undefined && date2 != undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
                data: { 'method': 'GetDaysDifference', 'date1': date2, 'date2': date1 },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var days = result.ResponseData;
                    self.Days(days);

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.ValidateEffectiveDate = function () {
        if (!Validate.empty(self.EffectiveDate()) && !Validate.empty(self.EffectiveTillDate())) {
            self.GetDateDifference(self.EffectiveDate(), self.EffectiveTillDate());
            if (self.Days() < 0) {
                msg("Effective date should be greater or equals to Effective last date!!!");
                self.EffectiveTillDate('');
                self.Days('');
            }
        }
    }



    self.SavePromotion = function () {

        if (self.Validation()) {


            var promotionpost = {
                PostID: ko.toJS(self.SelectedPost).PostID,
                PostDesc: ko.toJS(self.SelectedPost).PostDesc
            }

            var promotion = {
                OldSubmissionNo: self.SubmissionNo(),
                PromoTypeID: ko.toJS(self.SelectedPromotionType()).PromoTypeID,
                PromotionPost: promotionpost,
                EmpID: self.EmpID(),
                SupervisorID: self.SupervisorID(),
                LetterIssueDate: self.LetterIssueDate(),
                EffectiveDate: self.EffectiveDate(),
                EffectiveTillDate: self.EffectiveTillDate(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Status: "F",
                Action: "A"
            };

            var url = "/Handlers/PIS/PromotionHandler.ashx";
            var method = "SavePromotion";
            var appID = "PIS";
            var modID = "EMPPRO";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(promotion)), 'appID': appID, 'modID': modID };
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


    self.GetPromotionBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }
        else {
            if (editable == 'Y') {
                $('form').find('input, select').attr('disabled', false);
                $('#txtEmployeeID').attr('disabled', true);
            }
            else {
                $('button').hide();
                $('form').find('input, select').attr('disabled', 'disabled');
            }

            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/PromotionHandler.ashx',
                data: { 'method': 'GetPromotion', 'submissionNo': self.SubmissionNo() },
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
                        self.grdOfficeCode(data.ResponseData.Office.OfficeCode);
                        self.grdOfficeName(data.ResponseData.Office.OfficeName);
                        self.grdPostID(data.ResponseData.Post.PostID);
                        self.grdPostDesc(data.ResponseData.Post.PostDesc);
                        self.SupervisorID(data.ResponseData.SupervisorID);
                        self.SupervisorName(data.ResponseData.SupervisorName);
                        self.LetterIssueDate(data.ResponseData.LetterIssueDate);
                        self.EffectiveDate(data.ResponseData.EffectiveDate);
                        self.EffectiveTillDate(data.ResponseData.EffectiveTillDate);
                        //self.SelectedPromotionType(data.ResponseData.PromoTypeID);

                        for (var i = 0; i < self.PromotionTypes().length; i++) {
                            if (self.PromotionTypes()[i].PromoTypeID() == data.ResponseData.PromoTypeID) {
                                self.SelectedPromotionType(self.PromotionTypes()[i]);
                            }
                        }
                        for (var i = 0; i < self.Posts().length; i++) {
                            if (self.Posts()[i].PostID() == data.ResponseData.PromotionPost.PostID) {
                                self.SelectedPost(self.Posts()[i]);
                            }
                        }
                        console.log('post', ko.toJS(self.SelectedPromotionType()));
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }


    self.GetPromotionBySubmissionNo();


    self.Validation = function () {
        var errMsg = "";


        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name!!!<br>";
        }
        //        if (Validate.empty(self.grdPostDesc())) {
        //            errMsg += "कृपया पुरानो पद भर्नुहोस !!!<br>";
        //        }
        if (self.SelectedPromotionType() == undefined) {
            errMsg += "Please select Promotion Type!!!<br>";
        }
        if (Validate.empty(self.LetterIssueDate())) {
            errMsg += "Please fill Letter issue date!!!<br>";
        }
        if (self.SelectedPost() == undefined) {
            errMsg += "Please select new post!!!<br>";
        }
        if (Validate.empty(self.EmployeeName()) || Validate.empty(self.SupervisorName())) {

        }
        else {
            if (self.EmpID() == self.SupervisorID()) {
                errMsg += "Employee and supervisor shouldnot be same!!!<br>";
            }
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
        self.EmpID('');
        self.EmployeeName('');
        self.SelectedPromotionType('');
        self.LetterIssueDate('');
        self.EffectiveDate('');
        self.EffectiveTillDate('');
        self.SelectedPost('');
        self.SupervisorID('');
        self.SupervisorName('');
        self.grdEmployeeID('');
        self.grdEmployeeName('');
        self.grdOfficeCode('');
        self.grdOfficeName('');
        self.grdPostDesc('');
        self.grdPostID('');
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
        }

        else if (self.CheckSource() === "supervisor") {
            if (self.SupervisorID() == null) {
                GEmpID = null;
                GEmpName = null;
            }
            else {
                GEmpID = self.SupervisorID();
                GEmpName = self.SupervisorName();
            }
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
        }
        else if (self.CheckSource() === "supervisor") {
            self.SupervisorID(GEmpID);
            self.SupervisorName(GEmpName);
        }
    })

};



$(document).ready(function () {

    ValidateSession();
    var pvm = new PromotionViewModel();
    ko.applyBindings(pvm, document.getElementById('PromotionForm'));

});