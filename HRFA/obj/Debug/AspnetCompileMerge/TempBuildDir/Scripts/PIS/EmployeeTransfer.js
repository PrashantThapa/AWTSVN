function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function Post(data) {
    var self = this;
    if (data != undefined) {
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);
    }
}
function OfficeEmpPost(data) {

    var self = this;
    if (data != undefined) {
        self.OfficeNameNep = ko.observable(data.Office.OfficeNameNep);
        self.EmpID = ko.observable(data.EmpID);
        self.PostDesc = ko.observable(data.Post.PostDesc);
        self.PostID = ko.observable(data.Post.PostID); 
        self.PostSeq = ko.observable(data.OfficeDarbandi.PostSeq);
    }
}




var EmployeeTransferViewModel = function () {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.OfficeCode = ko.observable();
    self.PostID = ko.observable();
    self.PostSeq = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable();
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.LetterIssueDate = ko.observable();
    self.DecisionDate = ko.observable();
    self.EffectiveDate = ko.observable();
    self.JoinDate = ko.observable();
    self.EffectiveTillDate = ko.observable();
    self.SupervisorID = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.PostDesc = ko.observable();
    self.SupervisorName = ko.observable();


    self.isDisabled = ko.observable(true);
    self.CheckSource = ko.observable();

    self.OfficeNameNep = ko.observable();

    self.Action = ko.observable();


    self.SupervisorName = ko.observable();

    //    self.SelectedOffice = ko.observable();
    self.SelectedPost = ko.observable();
    self.SelectedTransferOffice = ko.observable();
    self.SelectedTransferPost = ko.observable();
    self.Offices = ko.observableArray([]);
    self.TransferOffices = ko.observableArray([]);
    self.Posts = ko.observableArray([]);
    self.PostDesc = ko.observable();
    self.OfficeEmpPosts = ko.observableArray([]);


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
            msg("Oops! error occured while obtaining data...","WARNING");
        }
    });

    self.GetEntity = function () {

        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() != "" && self.SubmissionNo() != undefined && self.SubmissionNo() != null) {

            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');
            }
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PIS/EmployeeTransferHandler.ashx',
                data: { 'method': 'GetTransferBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    
                    self.SubmissionNo(result.ResponseData[0].SubmissionNo);
                    self.EmpID(result.ResponseData[0].EmpID);
                    self.EmployeeName(result.ResponseData[0].EmpName);
                    self.OfficeCode(result.ResponseData[0].TransferOffice.OfficeCode);
                    self.SelectedTransferOffice(result.ResponseData[0].TransferOffice.OfficeCode);
                    ////                    self.SelectedOffice(result.ResponseData[0].TransferOffice.OfficeCode);
                    self.PostID(result.ResponseData[0].TransferPost.PostID);
                    self.PostSeq(result.ResponseData[0].OfficePostDarbandi.PostSeq);
                    self.GetPostDepartment();

                    self.FromDate(result.ResponseData[0].FromDate);
                    self.ToDate(result.ResponseData[0].ToDate);
                    self.Status(result.ResponseData[0].Status);
                    self.EntryBy(result.ResponseData[0].EntryBy);
                    self.EntryDate(result.ResponseData[0].EntryDate);
                    self.LetterIssueDate(result.ResponseData[0].LetterIssueDate);
                    self.DecisionDate(result.ResponseData[0].DecisionDate);
                    self.EffectiveDate(result.ResponseData[0].EffectiveDate);
                    self.JoinDate(result.ResponseData[0].JoinDate);
                    self.EffectiveTillDate(result.ResponseData[0].EffectiveTillDate);
                    self.SupervisorID(result.ResponseData[0].SupervisorID);
                    self.SupervisorName(result.ResponseData[0].SupervisorName);
                    self.OfficeNameNep(result.ResponseData[0].Office.OfficeNameNep);
                    self.PostDesc(result.ResponseData[0].TransferPost.PostDesc);

                    self.SelectedPost(result.ResponseData[0].TransferPost.PostID);
                   

                    $("#loader").hide();

                },
                error: function (err) {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
                    msg("Oops! error occured while obtaining data...","WARNING");

                }
            });
        }
    }
    self.GetEntity();
    self.GetPostDepartment = function () {


        $.ajax({
            dataType: "json",
            url: '../../Handlers/COMMON/OfficePostHandler.ashx',
            data: { 'method': 'GetOfficePostList', 'OfficeCD': self.SelectedTransferOffice() },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new Post(item)

                });
                self.Posts(mappedTask);

            },
            error: function (err) {
                msg("Oops! error occured while obtaining data...","WARNING");
            }
        });
    }

    self.SearchSupervisor = function () {
        if (self.SupervisorID() != "") {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/WFMS/EmployeeShiftAssignmentHandler.ashx',
                data: { 'method': 'GetEmployeeName', 'empID': getNumEng(self.SupervisorID()), 'officeCD': self.OfficeCode() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.ResponseData == "") {
                         msg("No data for this employee in this organisation","WARNING"); 
                        self.SupervisorID("");
                        self.SupervisorName("");
                    }
                    else {
                        self.SupervisorName(result.ResponseData);
                    }
                    waitMsg.hide();
                },
                error: function (err) {
                    msg("Oops! error occured while obtaining data ...","WARNING");
                }
            });

        }
        else {
             msg("Please fill employee id!","WARNING");            
        }

    }

    self.SaveEmployeeTransfer = function () {
        if (self.Validation()) {


            var office = {
                OfficeCode: self.OfficeCode()
            }

            var transferPost = {
                PostID: self.SelectedPost()
            }
            var transferoffice = {
                OfficeCode: self.SelectedTransferOffice()
            }
            var post = {
                PostID: self.PostID()

            }

            var officePostDarbandi = {
                PostSeq: self.PostSeq()
            }
            var args = {
                Office: office,
                Post: post,
                TransferOffice: transferoffice,
                TransferPost: transferPost,
                OfficePostDarbandi: officePostDarbandi,
                EmpID: self.EmpID(),
                DecisionDate: self.DecisionDate(),
                LetterIssueDate: self.LetterIssueDate(),
                EffectiveDate: self.EffectiveDate(),
                EffectiveTillDate: self.EffectiveTillDate(),
                SupervisorID: self.SupervisorID(),
                JoinDate: self.JoinDate(),
                OldSubmissionNo:self.SubmissionNo(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Status: "F",
                Action: "A"
            };


            var url = "/Handlers/PIS/EmployeeTransferHandler.ashx";
            var method = "SaveEmployeeTransfer";
            var appID = "PIS";
            var modID = "EMPTRA";
            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(args)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
											msg(obj.Message, "SUCCESS");  
                                        }
                                        else {
                                            msg("Oops! error occured while saving data...","WARNING");
                                        }
                                        self.ClearControls();

                                    });
        }
    }




    self.Validation = function () {
        var errMsg = "";

        if (self.SelectedPost() == undefined) {
            errMsg += "Please select transfer post!!!<br>";
        }

        if (Validate.empty(self.DecisionDate())) {
            errMsg += "Please fill decision date !!!<br>";
        }
        if (Validate.empty(self.LetterIssueDate())) {
            errMsg += "Please fill letter issue date !!!<br>";
        }
        if (!Validate.empty(self.SupervisorID()) && !Validate.empty(self.EmpID())) {
            if (self.SupervisorID() == self.EmpID()) {
                errMsg += "Supervisor or employee should not be same!!!<br>";
            }
        }
        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name !!!<br>";
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

        self.SelectedPost('');
        self.SelectedTransferOffice('');
        self.EmpID('');
        self.DecisionDate('');
        self.LetterIssueDate('');
        self.EffectiveDate('');
        self.JoinDate('');
        self.EffectiveTillDate('');
        self.SupervisorID('');
        self.EmployeeName('');
        self.SupervisorName('');
        self.OfficeNameNep('');

        self.PostDesc('');
        self.PostID('');
        self.PostSeq('');


    }

    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
    })
    $('#modalEmpSearch').on('hidden.bs.modal', function () {


        if (self.CheckSource() === "employee") {

            self.EmpID(GEmpID);
            self.EmployeeName(GEmpName);

            self.OfficeCode(GOfficeCD);
            self.OfficeNameNep(GOfficeName);

            self.PostDesc(GPostDesc);
            self.PostID(GPostID);
            self.PostSeq(GPostSeq);
        }
        else if (self.CheckSource() === "supervisor") {
            self.SupervisorID(GEmpID);
            self.SupervisorName(GEmpName);

        }





    });
};



$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new EmployeeTransferViewModel(), document.getElementById("EmpTransfer"));
});