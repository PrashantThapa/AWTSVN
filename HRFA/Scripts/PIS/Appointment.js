
function Post(data) {
    var self = this;
    if (data != undefined) {
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);
    }
}


function AppointmentType(data) {
    var self = this;
    if (data != undefined) {
        self.ApptTypeID = ko.observable(data.ApptTypeID);
        self.ApptTypeDesc = ko.observable(data.ApptTypeDesc);
    }
}



var AppointmentViewModel = function () {
    var self = this;
    self.FromDate = ko.observable();
    self.DecisionDate = ko.observable();
    self.LetterIssueDate = ko.observable();
    self.EffectiveDate = ko.observable();
    self.EffectiveTillDate = ko.observable();
    self.OfficeJoinDate = ko.observable();
    self.ProbationPeriod = ko.observable();
    self.ToDate = ko.observable();
    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);
    self.Action = ko.observable();

    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();

    self.SelectedPost = ko.observable();
    self.SelectedAppointmentType = ko.observable();

    self.Posts = ko.observableArray([]);
    self.AppointmentTypes = ko.observableArray([]);

    self.CheckSource = ko.observable();
    self.SubmissionNo = ko.observable();
    self.Days = ko.observable();

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

            $("#ddlPost").attr("disabled", false);


        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });


    //Load Appointment Type
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/AppointmentTypeHandler.ashx',
        data: { 'method': 'GetAppointmentType', 'ApptTypeID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new AppointmentType(item)

            });
            self.AppointmentTypes(mappedTask);

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
                msg("Effective date should be equal or smaller than Effective last date !!!");
                self.EffectiveTillDate('');
                self.Days('');
            }
        }
    }




    self.SaveAppointment = function () {
        if (self.Validation()) {


            var post = {
                PostID: ko.toJS(self.SelectedPost).PostID,
                PostDesc: ko.toJS(self.SelectedPost).PostDesc
            }



            if (ko.toJS(self.SelectedAppointmentType) != undefined) {
                var appointmenttype = {
                    ApptTypeID: ko.toJS(self.SelectedAppointmentType).ApptTypeID,
                    ApptTypeDesc: ko.toJS(self.SelectedAppointmentType).ApptTypeDesc
                }
            }
            else {
                var appointmenttype = {
                    ApptTypeID: null,
                    ApptTypeDesc: null
                }
            }

            var appointment = {
                OldSubmissionNo: self.SubmissionNo(),
                Post: post,
                AppointmentType: appointmenttype,
                EmpID: self.EmpID(),
                DecisionDate: self.DecisionDate(),
                LetterIssueDate: self.LetterIssueDate(),
                EffectiveDate: self.EffectiveDate(),
                EffectiveTillDate: self.EffectiveTillDate(),
                OfficeJoinDate: self.OfficeJoinDate(),
                ProbationPeriod: parseInt(self.ProbationPeriod()),
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Status: "F",
                Action: "A"
            };


            var url = "/Handlers/PIS/AppointmentHandler.ashx";
            var method = "SaveAppointment";
            var appID = "PIS";
            var modID = "EMPAPP";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(appointment)), 'appID': appID, 'modID': modID };
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



    self.GetAppointmentBySubmissionNo = function () {
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
                url: '../../Handlers/PIS/AppointmentHandler.ashx',
                data: { 'method': 'GetAppointment', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("Submission number has no data.");
                    }
                    else {
                        self.EmpID(data.ResponseData.EmpID);
                        self.EmployeeName(data.ResponseData.EmployeeName);
                        self.DecisionDate(data.ResponseData.DecisionDate);
                        self.LetterIssueDate(data.ResponseData.LetterIssueDate);
                        self.OfficeJoinDate(data.ResponseData.OfficeJoinDate);
                        self.ProbationPeriod(data.ResponseData.ProbationPeriod);
                        self.EffectiveDate(data.ResponseData.EffectiveDate);
                        self.EffectiveTillDate(data.ResponseData.EffectiveTillDate);
                        self.FromDate(data.ResponseData.FromDate);
                        for (var i = 0; i < self.Posts().length; i++) {
                            if (self.Posts()[i].PostID() == data.ResponseData.Post.PostID) {
                                self.SelectedPost(self.Posts()[i]);
                            }
                        }

                        for (var i = 0; i < self.AppointmentTypes().length; i++) {
                            if (self.AppointmentTypes()[i].ApptTypeID() == data.ResponseData.AppointmentType.ApptTypeID) {
                                self.SelectedAppointmentType(self.AppointmentTypes()[i]);
                            }
                        }
                        if (editable == 'Y') {
                            $('form').find('input, select').attr('enabled', 'enabled');

                        }

                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });

        }
    }


    self.GetAppointmentBySubmissionNo();


    self.SetNepaliValues = function () {
        self.ProbationPeriod($("#txtProbationPeriod").val());
    }

    self.Validation = function () {
        var errMsg = "";
        self.SetNepaliValues();

        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name !!!<br>";
        }
        if (self.SelectedPost() == undefined) {
            errMsg += "Please select post!!!<br>";
        }
        if (self.SelectedAppointmentType() == undefined) {
            errMsg += "Please select Appointment Type !!!<br>";
        }
        if (Validate.empty(self.DecisionDate())) {
            errMsg += "Please fill Decision Date !!!<br>";
        }
        if (Validate.empty(self.LetterIssueDate())) {
            errMsg += "Please fill letter issue date !!!<br>";
        }
        if (Validate.empty(self.OfficeJoinDate())) {
            errMsg += "Please fill office join date !!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    self.ClearControls = function () {
        self.SelectedPost('');
        self.SelectedAppointmentType('');
        self.DecisionDate('');
        self.LetterIssueDate('');
        self.EffectiveDate('');
        self.EffectiveTillDate('');
        self.OfficeJoinDate('');
        self.ProbationPeriod('');
        self.EmpID('');
        self.EmployeeName('');
        self.FromDate('');
    }


    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        GFormID = 'A';
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
        }

    })
};



$(document).ready(function () {

    ValidateSession();
    var avm = new AppointmentViewModel();
    ko.applyBindings(avm, document.getElementById('AppointmentForm'));

});