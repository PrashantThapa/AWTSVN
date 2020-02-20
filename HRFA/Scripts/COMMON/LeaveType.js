﻿
function LeaveType(data) {
    var self = this;
    self.LeaveTypeID = ko.observable(data.LeaveTypeID);
    self.LeaveTypeName = ko.observable(data.LeaveTypeName);
    self.LeaveTypeNameNep = ko.observable(data.LeaveTypeNameNep);
    self.IsPayable = ko.observable(data.IsPayable);
    self.IsReservable = ko.observable(data.IsReservable);
    self.MaxReservableDays = ko.observable(data.MaxReservableDays);
    self.IsPayable = ko.observable(data.IsPayable);
    self.MinDays = ko.observable(data.MinDays);
    self.MaxDays = ko.observable(data.MaxDays);
    self.MinServiceDaysRequired = ko.observable(data.MinServiceDaysRequired);
    self.IsRecomendable = ko.observable(data.IsRecomendable);
    self.RecomendableConstraintDays = ko.observable(data.RecomendableConstraintDays);
    self.RecomendableConstraintDaysAdded = ko.observable(data.RecomendableConstraintDaysAdded);
    self.MaxTermCount = ko.observable(data.MaxTermCount);
    self.CanTakenWithOther = ko.observable(data.CanTakenWithOther);
    self.IsReImbushmentable = ko.observable(data.IsReImbushmentable);
    self.IsHalfDayApplicable = ko.observable(data.IsHalfDayApplicable);
    self.Gender = ko.observable(data.Gender);
    self.Status = ko.observable(data.Status);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.MarstID = ko.observable(data.MaritalStatus.MarstID);
    self.Action = ko.observable(data.Action);

}

function MaritalStatus(data) {
    var self = this;
    self.MarStatID = ko.observable(data.MarStatID);
    self.MarStatName = ko.observable(data.MarStatName);
}

function LeaveTypeViewModel() {
    var self = this;
    self.Genders = ko.observableArray([
        { 'GenderID': 'F', 'GenderName': 'Female' },
        { 'GenderID': 'M', 'GenderName': 'Male' },
        { 'GenderID': 'O', 'GenderName': 'Other' },
        { 'GenderID': 'A', 'GenderName': 'All' }

    ]);
    self.Gender = ko.observable();

    self.MaritalStatuses = ko.observableArray([]);
    self.SelectedEmpMStatus = ko.observable();

    self.LeaveTypeID = ko.observable();
    self.LeaveTypeNameNep = ko.observable();
    self.LeaveTypeName = ko.observable();
    self.IsPayable = ko.observable(false);
    self.IsReservable = ko.observable(false);
    self.MaxReservableDays = ko.observable();
    self.MinDays = ko.observable();
    self.MaxDays = ko.observable();
    self.MinServiceDaysRequired = ko.observable();
    self.IsRecomendable = ko.observable(false);
    self.RecomendableConstraintDays = ko.observable();
    self.RecomendableConstraintDaysAdded = ko.observable();
    self.MaxTermCount = ko.observable();
    self.CanTakenWithOther = ko.observable(false);
    self.IsReImbushmentable = ko.observable(false);
    self.IsHalfDayApplicable = ko.observable(false);
    self.Status = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();

    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Action = ko.observable();

    self.LeaveTypes = ko.observableArray([]);
    self.SelectedLeaveType = ko.observable();


    self.SaveLeaveType = function () {
        var action = '';
        var maritalstatus;
        //self.SetNepali();
        if (self.Validation()) {
            if ($("#btnSave").text() == 'Save') {
                action = 'A';
            }
            else {
                action = 'E';
            }

            if ((self.SelectedEmpMStatus() != undefined)) {
                maritalstatus = {
                    MarStatID: ko.toJS(self.SelectedEmpMStatus().MarStatID),
                    MarStatName: ko.toJS(self.SelectedEmpMStatus().MarStatName)
                }
            }
            else {
                maritalstatus = {
                    MarStatID: null,
                    MarStatName: null
                }
            }


            var gender = self.Gender();
            if (gender === "A") {
                gender = null;
            }

            var row = {
                LeaveTypeID: self.LeaveTypeID(),
                LeaveTypeName: self.LeaveTypeName(),
                LeaveTypeNameNep: self.LeaveTypeNameNep(),
                IsPayable: self.IsPayable(),
                IsReservable: self.IsReservable(),
                MaxReservableDays: self.MaxReservableDays(),
                MinDays: self.MinDays(),
                MaxDays: self.MaxDays(),
                IsHalfDayApplicable: self.IsHalfDayApplicable(),
                MinServiceDaysRequired: self.MinServiceDaysRequired(),
                IsRecomendable: self.IsRecomendable(),
                RecomendableConstraintDays: self.RecomendableConstraintDays(),
                RecomendableConstraintDaysAdded: self.RecomendableConstraintDaysAdded(),
                MaxTermCount: self.MaxTermCount(),
                CanTakenWithOther: self.CanTakenWithOther(),
                IsReImbushmentable: self.IsReImbushmentable(),
                Gender: gender,
                MaritalStatus: maritalstatus,

                Status: "A",
                Action: action
            };
            //debugger;
            $.ajax({
                type: 'GET',
                dataType: "json",
                cache: false,
                url: '../../../Handlers/COMMON/LeaveTypeHandler.ashx',
                data: { 'method': 'SaveLeaveType', 'args': JSON.stringify(row) },
                contentType: "application/json; character=utf-8",

                success: function (result) {
                    if (result.IsSucess) {
                        msg(" Leave Saved Sucessfully !!!", "SUCCESS");
                        self.ClearControl();
                        self.GetLeaveType();
                    }
                    else {
                        msg("Oops! Error while saving Leave !!!", "WARNING");
                    }
                },

                error: function (err) {
                    msg("Oops! Error while saving Leave!!!", "WARNING");
                }

            });
        }
    }

    self.GetLeaveType = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/COMMON/LeaveTypeHandler.ashx',
            data: { 'method': 'GetLeaveType', 'LeaveTypeValues': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    //console.log('Leave Types Item', item);
                    return new LeaveType(item)

                });

                self.LeaveTypes(mappedTask);
            },
            error: function (err) {
                msg("Oops! Error while obtaining Leave Type !!!", "WARNING");
            }
        });
    }

    self.LeaveTypeDetails = function () {
        if (self.SelectedLeaveType() != undefined) {
            var btnSave = $("#btnSave");
            btnSave.text('Update');

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/COMMON/LeaveTypeHandler.ashx',
                data: { 'method': 'GetLeaveType', 'LeaveTypeValues': self.SelectedLeaveType },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = result.ResponseData[0];
                    console.log('Detail data', data);
                    self.LeaveTypeName(data.LeaveTypeName);
                    self.LeaveTypeNameNep(data.LeaveTypeNameNep);
                    self.IsPayable(data.IsPayable);
                    self.IsReservable(data.IsReservable);
                    self.MaxReservableDays(data.MaxReservableDays);
                    self.MinDays(data.MinDays);
                    self.MaxDays(data.MaxDays);
                    self.MinServiceDaysRequired(data.MinServiceDaysRequired);
                    self.IsHalfDayApplicable(data.IsHalfDayApplicable);
                    self.IsRecomendable(data.IsRecomendable);
                    self.RecomendableConstraintDays(data.RecomendableConstraintDays);
                    self.RecomendableConstraintDaysAdded(data.RecomendableConstraintDaysAdded);
                    self.MaxTermCount(data.MaxTermCount);
                    self.CanTakenWithOther(data.CanTakenWithOther);
                    self.IsReImbushmentable(data.IsReImbushmentable);
                    self.LeaveTypeID(data.LeaveTypeID);
                    if (data.Gender == "") {
                        self.Gender("A");
                    }
                    else {

                        self.Gender(data.Gender);
                    }


                    for (var i = 0; i < self.MaritalStatuses().length; i++) {

                        if (self.MaritalStatuses()[i].MarStatName() == data.MaritalStatus.MarStatName) {
                            self.SelectedEmpMStatus(self.MaritalStatuses()[i]);
                        }
                    }

                    //debugger;

                },
                error: function (err) {
                    msg("Oops! Error while obtaining Leaves !!!", "WARNING");
                }
            });
        }
        else {
            self.ClearControl();
            var btnSave = $("#btnSave");
            btnSave.text('Save');

        }

    }

    self.DeleteLeaveType = function () {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/COMMON/LeaveTypeHandler.ashx',
                    data: { 'method': 'DeleteLeaveType', 'leavetype': self.SelectedLeaveType(), 'token': $("#token").text() },
                    contentType: "application/json; character=utf-8",
                    success: function (result) {
                        waitMsg.hide();
                        msg(result.Message);

                        if (result.IsSucess) {
                            msg(result.Message);
                            self.GetLeaveType();
                        }
                        else {
                            if (!result.IsToken)
                                msg(result.Message, "WARNING", null, ClearSession);
                            else
                                msg(result.Message, "WARNING");
                        }

                    },
                    error: function (err) {
                        waitMsg.hide();
                        msg(err.status + " - " + err.statusText, "FAILURE");
                    }
                });
            }
        });
    }

    //Load Marital Statuses

    self.GetMaritalStatuses = function () {

        $.ajax({
            dataType: "json",
            url: '../../Handlers/CENTRALLOOKUP/MaritalStatusHandler.ashx',
            data: { 'method': 'GetMaritalStatus', 'MarStatID': null },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new MaritalStatus(item)

                });
                self.MaritalStatuses(mappedTask);

            },
            error: function (err) {
                msg("Oops! Error while obtaining Marital Status !!!", "WARNING");
            }
        });

    }



    self.Validation = function () {
        var errMsg = "";

        if (Validate.empty(self.LeaveTypeNameNep())) {
            errMsg += "Please fill Name!!!\n";
        }

        if (errMsg == "") {
            return true;
        }
        else {
            msg(errMsg, "WARNING");
            return false;
        }
    }

    self.CancelLeaveType = function () {
        self.SetNepali();
        self.ClearControl();
    }

    self.ClearControl = function () {
        self.LeaveTypeID(null);
        self.LeaveTypeName(null);
        self.Gender(false);
        //        $('#ddlMaritalStatus').val("");
        self.SelectedEmpMStatus(null);
        self.SelectedLeaveType(null);
    }

    self.SetNepali = function () {
        self.LeaveTypeName($("#txtName").val());
    }
    self.GetLeaveType();
    self.GetMaritalStatuses();
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new LeaveTypeViewModel());

})