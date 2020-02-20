﻿function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function Post(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);

    }
}

function OfficeDarbandi(data) {
    var self = this;
    if (data != undefined) {
        self.PostSeq = ko.observable(data.PostSeq);
    }
}


var EmployeePostingViewModel = function () {

    var self = this;

    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.PostID = ko.observable();
    self.PostDesc = ko.observable();
    self.PostingType = ko.observable();
    self.grdPostingType = ko.observable();
    self.grdEmployeeID = ko.observable();
    self.grdEmployeeName = ko.observable();
    self.grdPostID = ko.observable();
    self.grdPostDesc = ko.observable();
    self.Posts = ko.observableArray([]);
    self.SelectedPost = ko.observable();
    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);

    self.SelectedOffice = ko.observable();
    self.SelectedDarbandi = ko.observable();
    self.PostingDate = ko.observable();
    //self.PostingType = ko.observable();

    self.Offices = ko.observableArray([]);
    self.Darbandis = ko.observableArray([]);

    self.CheckSource = ko.observable();
    self.SubmissionNo = ko.observable();
    self.ApptFromDate = ko.observable();
    self.FromDate = ko.observable();


    //Load Office
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'officeCode': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Office(item)

            });
            self.Offices(mappedTask);

        },
        error: function (err) {
            msg("Oops! error occured while obtaining data...", "WARNING");

        }
    });

    self.GetDarbandi = function () {
        self.Darbandis([]);
        $("#ddlDarbandi").attr("disabled", false);
        if (ko.toJS(self.SelectedOffice) === undefined || ko.toJS(self.SelectedPost) === undefined) {
            $("#ddlDarbandi").attr("disabled", true);
        }
        else {
            var office = ko.toJS(self.SelectedOffice);
            var officeCode = office.OfficeCode;
            var selectedPostId = ko.toJS(self.SelectedPost).postID;
            $.ajax({
                dataType: "json",
                url: '../../Handlers/COMMON/OfficePostDarbandiHandler.ashx',
                data: { 'method': 'GetOfficePostDarbandi', 'OfficeCode': officeCode, 'postID': self.SelectedPost().PostID },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new OfficeDarbandi(item)
                    });
                    self.Darbandis(mappedTask);
                },
                error: function (err) {
                    msg("Oops! error occured while obtaining data ...", "WARNING");
                }
            });

        }
    }


    self.SaveEmpPosting = function () {
        if (self.Validation()) {

            if (self.SelectedOffice() == undefined) {
                var office = null;
            }
            else {
                var office = {
                    OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                    OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
                }
            }
            var post = {
                PostID: self.SelectedPost().PostID,
                PostDesc: self.SelectedPost().PostDesc
            }

            if (self.SelectedDarbandi() == undefined) {
                var officedarbandi = null;
            }
            else {
                var officedarbandi = {
                    PostSeq: ko.toJS(self.SelectedDarbandi).PostSeq
                }
            }

            var promoDate;
            var apptDate;
            var tranDate;
            if (self.grdPostingType() == 'Appointment') {
                promoDate = "";
                apptDate = self.ApptFromDate();
                tranDate = "";
                self.PostingType("APP");
            }
            var empposting = {
                OldSubmissionNo: self.SubmissionNo(),
                EmpID: self.EmpID(),
                Office: office,
                Post: post,
                OfficeDarbandi: officedarbandi,
                FromDate: self.PostingDate(),
                ToDate: "",
                ApptFromDate: self.ApptFromDate(),
                PostingType: self.PostingType(),
                RStatus: "F",
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Action: "A"
            };


            var url = "/Handlers/PIS/EmpPostingHandler.ashx";
            var method = "SaveEmpPosting";
            var appID = "PIS";
            var modID = "EMPPOS";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(empposting)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                function (result) {
                    var obj = jQuery.parseJSON(result);
                    if (obj.IsSucess) {
                        msg(obj.Message);
                        self.ClearControls();
                    }
                    else {
                        msg("Oops! error occured while saving data ...", "WARNING");
                    }

                });
        }
    }


    self.GetEmpPostingByOffce = function () {
        self.Posts([]);
        $("#ddlPostPost").attr("disabled", false);
        if (ko.toJS(self.SelectedOffice) === undefined) {
            $("#ddlPostPost").attr("disabled", true);
        }

        else {
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/EmpPostingHandler.ashx',
                data: { 'method': 'GetEmpPostingByOffice', 'Office': self.SelectedOffice().OfficeCode },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("No data on the selected office", "WARNING");
                    }
                    else {
                        var mappedTask = $.map(data.ResponseData, function (item) {
                            return new Post(item)
                        });
                        self.Posts(mappedTask);
                    }


                },
                error: function (err) {
                    msg("Oops! error occured while obtaining data ...", "WARNING");
                }
            });
        }
    }

    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name!!!<br>";
        }
        if (Validate.empty(self.SelectedPost())) {
            errMsg += "Please fill post!!!<br>";
        }
        if (Validate.empty(self.PostingDate())) {
            errMsg += "Please fill posting date !!!<br>";
        }
        if (self.SelectedOffice() == undefined) {
            errMsg += "Please fill office!!!<br>";
        }
        if (self.SelectedDarbandi() == undefined) {
            errMsg += "Please fill darbandi!!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    }

    self.ClearGrid = function () {
        self.PostID('');
        self.PostDesc('');
        self.grdPostingType('');
        self.grdEmployeeID('');
        self.grdEmployeeName('');
        self.grdPostID('');
        self.grdPostDesc('');
    }

    self.ClearControls = function () {
        self.EmpID('');
        self.EmployeeName('');
        self.ClearGrid();
        self.SelectedOffice('');
        self.SelectedDarbandi('');
        self.PostingDate('');
        self.PostingType('');
    }
    self.GetEmpPostingBySubmissionNo = function () {
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
                $('form').find('input, select').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/EmpPostingHandler.ashx',
                data: { 'method': 'GetEmpPosting', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("No data on this submission number।", "WARNING");
                    }
                    else {
                        console.log(data.ResponseData);
                        self.EmpID(data.ResponseData.EmpID);
                        self.EmployeeName(data.ResponseData.EmployeeName);
                       
                        for (var i = 0; i < self.Offices().length; i++) {
                            if (self.Offices()[i].OfficeCode() == data.ResponseData.Office.OfficeCode) {
                                self.SelectedOffice(self.Offices()[i]);
                            }
                        }
                        self.GetEmpPostingByOffce();

                        for (var i = 0; i < self.Posts().length; i++) {
                            if (self.Posts()[i].PostID() == data.ResponseData.Post.PostID) {
                                self.SelectedPost(self.Posts()[i]);
                            }
                        }
                        //self.SelectedPost(data.ResponseData.Post.PostID);
                        console.log('pop',self.SelectedPost());

                        


                        self.GetDarbandi();
                        for (var i = 0; i < self.Darbandis().length; i++) {
                            if (self.Darbandis()[i].PostSeq() == data.ResponseData.OfficeDarbandi.PostSeq) {
                                self.SelectedDarbandi(self.Darbandis()[i]);
                            }
                        }

                        var postingdate;

                        if (data.ResponseData.PostingType == 'A') {
                            postingdate = data.ResponseData.FromDate;

                            // postingdate = data.ResponseData.PromoFromDate;
                            self.grdPostingType("Appointment");
                            self.PostingType('A');
                            // $("#empGender").prop("checked", true);
                        }



                        self.PostingDate(postingdate);



                        if (editable == 'Y') {
                            $('form').find('input, select').attr('disabled', false);
                            $('#txtEmployeeID').attr('disabled', true);
                        }
                        else {
                            $('form').find('input, select').attr('disabled', 'disabled');
                        }
                    }
                },
                error: function (err) {
                    msg("Oops! error occured while obtaining data ...", "WARNING");
                }
            });
        }
    }


    self.GetEmpPostingBySubmissionNo();

    self.ShowImpStatus = function () {
        $.ajax({
            dataType: "json",
            url: '../../Handlers/PIS/EmpPostingHandler.ashx',
            data: { 'method': 'GetEmpPostingByEmpID', 'empID': self.EmpID() },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                console.log('EmpResult', data.ResponseData);
                if (data.ResponseData !== null) {
                    msg("Posting is already done for this employee", "WARNING");
                    $('#ddlOffice2').prop('disabled', 'disabled');
                    // $("#ddlOffice").attr("disabled", true);                    
                    $("#txtPostingDate").attr("disabled", true);
                } else if (data.ResponseData === null) {
                    $("#ddlOffice2").attr("disabled", false);
                    $("#txtPostingDate").attr("disabled", false);

                }
            }
        });
    }

    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        GFormID = 'P';
        self.CheckSource(value);
        if (self.CheckSource() === "employee") {
            GEmpID = self.EmpID();
            GEmpName = self.EmployeeName();
        }
    })

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {
            self.EmpID(GEmpID);
            self.EmployeeName(GEmpName);
            // $("#ddlOffice").attr("disabled", false);
            self.ShowImpStatus();


        }

    })

}

$(document).ready(function () {

    ValidateSession();
    //$("#ddlOffice2").attr("disabled", true);
    //$("#ddlPostPost").attr("disabled", true);
    //$("#ddlDarbandi").attr("disabled", true);
    //$('#btnSearch').attr('disabled', true);

    var epvm = new EmployeePostingViewModel();
    ko.applyBindings(epvm, document.getElementById('EmpPostingForm'));

});