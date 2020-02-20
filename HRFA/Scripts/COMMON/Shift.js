

function ShiftSetup(data) {
    var self = this;
    self.ShiftID = ko.observable(data.ShiftID);
    self.ShiftName = ko.observable(data.ShiftName);
    self.ShiftStartTime = ko.observable(data.ShiftStartTime);
    self.ShiftEndTime = ko.observable(data.ShiftEndTime);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.Status = ko.observable(data.Status);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);

    self.ShiftAM = ko.observable(data.ShiftAM);
    self.ShiftPM = ko.observable(data.ShiftPM);

    self.Action = ko.observable(data.Action);
}

function ShiftSetupViewModel() {
    var self = this;
    self.ShiftID = ko.observable();
    self.ShiftName = ko.observable();
    self.ShiftStartTime = ko.observable();
    self.ShiftEndTime = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();

    self.ShiftAM = ko.observable();
    self.ShiftPM = ko.observable();

    self.ShiftSetupTime = ko.observableArray([]);
    self.SelectedShiftSetupTime = ko.observable();

    self.TimePeriods = ko.observableArray([
        { 'TPID': '1', 'TPDesc': 'AM' },
        { 'TPID': '2', 'TPDesc': 'PM' }

    ]);
    self.SelectedTimePeriodStart = ko.observable();
    self.SelectedTimePeriodEnd = ko.observable();

    self.SaveShiftSetup = function () {
        self.SetNepali();
        if (self.Validation()) {
            if ($("#btnSave").text() == 'Save') {
                var row = {
                    ShiftID: null,
                    ShiftName: self.ShiftName(),
                    ShiftStartTime: self.ShiftStartTime(),
                    ShiftEndTime: self.ShiftEndTime(),

                    ShiftAM: ko.toJS(self.SelectedTimePeriodStart).TPDesc,
                    ShiftPM: ko.toJS(self.SelectedTimePeriodEnd).TPDesc,

                    Status: "A",
                    Action: "A"
                };

                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/COMMON/ShiftHandler.ashx',
                    data: { 'method': 'SaveShift', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
							 msg(" सिफ्ट सुरक्षित भयो !!!","SUCCESS");
                            self.ClearControl();
                            self.GetShift();

                        }
                        else {
							 msg("ओहो! सिफ्ट सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                        }
                    },

                    error: function (err) {
						 msg("ओहो! सिफ्ट सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                    }

                });
            }

            else {
                var row = {
                    ShiftID: self.SelectedShiftSetupTime(),
                    ShiftName: self.ShiftName(),
                    ShiftStartTime: self.ShiftStartTime(),
                    ShiftEndTime: self.ShiftEndTime(),

                    ShiftAM: ko.toJS(self.SelectedTimePeriodStart).TPDesc,
                    ShiftPM: ko.toJS(self.SelectedTimePeriodEnd).TPDesc,

                    Status: "A",
                    Action: "E"
                };

                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/COMMON/ShiftHandler.ashx',
                    data: { 'method': 'SaveShift', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
							 msg("सिफ्ट सुरक्षित भयो !!!","SUCCESS");
                            self.ClearControl();
                            self.GetShift();

                        }
                        else {
							 msg("ओहो! सिफ्ट सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                        }
                    },

                    error: function (err) {
						 msg("ओहो! सिफ्ट सुरक्षित गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                    }

                });
            }
        }

    }

    self.GetShift = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/COMMON/ShiftHandler.ashx',
            data: { 'method': 'GetShift', 'ShiftValues': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new ShiftSetup(item)

                });

                self.ShiftSetupTime(mappedTask);
            },
            error: function (err) {
				 msg("ओहो! सिफ्टहरु प्राप्त गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
            }
        });
    }

    self.DeleteShiftSetup = function () {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/COMMON/ShiftHandler.ashx',
                    data: { 'method': 'DeleteShift', 'shiftSetup': self.SelectedShiftSetupTime(), 'token': $("#token").text() },
                    contentType: "application/json; character=utf-8",
                    success: function (result) {
                        waitMsg.hide();
                        msg(result.Message);

                        if (result.IsSucess) {
                            msg(result.Message);
                            self.GetShift();
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

    self.ShiftSetupDetails = function () {
        if (self.SelectedShiftSetupTime() != undefined) {

            var btnSave = $("#btnSave");
            btnSave.text('Update');
        
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/COMMON/ShiftHandler.ashx',
                data: { 'method': 'GetShift', 'ShiftValues': self.SelectedShiftSetupTime() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //                    
                    var data = result.ResponseData[0];
                    self.ShiftName(data.ShiftName);
                    self.ShiftStartTime(data.ShiftStartTime);
                    self.ShiftEndTime(data.ShiftEndTime);
                    for (var i = 0; i < self.TimePeriods().length; i++) {
                        if (self.TimePeriods()[i].TPDesc == data.ShiftAM) {
                            self.SelectedTimePeriodStart(self.TimePeriods()[i]);
                            break;
                        }
                        else {
                            self.SelectedTimePeriodStart('');
                        }
                    }

                    for (var i = 0; i < self.TimePeriods().length; i++) {
                        if (self.TimePeriods()[i].TPDesc == data.ShiftPM) {
                            self.SelectedTimePeriodEnd(self.TimePeriods()[i]);
                            break;
                        }
                        else {
                            self.SelectedTimePeriodEnd('');
                        }
                    }

                    //                console.log(data);

                },
                error: function (err) {
					 msg("ओहो! सिफ्ट प्राप्त गर्दा त्रुटिहरू पत्ता लगाइयो !!!","WARNING");
                }
            });

        }
        else {
            self.ClearControl();
            var btnSave = $("#btnSave");
            btnSave.text('Save');
        }


    }
     

    self.Validation = function () {
        var errMsg = "";
//        console.log('check');
//        return;
        if (Validate.empty(self.ShiftName())) {
            errMsg += "Please fill shiftName !!!\n";
        }

        if (Validate.empty(self.ShiftStartTime())) {
            errMsg += "Please fill start time!!!\n";
        }

        if (Validate.empty(self.ShiftEndTime())) {
            errMsg += "Please fill end time !!!\n";
        }

        if (Validate.empty(self.SelectedTimePeriodStart())) {
            errMsg += "Please select AM/PM !!!\n";
        }

        if (Validate.empty(self.SelectedTimePeriodEnd())) {
            errMsg += "Please select AM/PM !!!\n";
        }
        

        if (errMsg == "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }
    //  }

    self.ValidateTime = function () {
        self.SetNepali();
        if (!Validate.empty(self.ShiftStartTime())) {
            self.TimePeriodValidate("txtStartHour");
        }
        if(!Validate.empty(self.ShiftEndTime())) {
            self.TimePeriodValidate("txtEndHour");
        }
    }

    self.TimePeriodValidate = function (timeID) {

        var ID = $("#" + timeID);
        var value = ID.val();
        var Time = getNumEng(value);
        //console.log(Time);
		if (Time < 1 || Time > 12) {
			 msg("Oops!Time should be in between 1 and 12 !!!","WARNING");
            ID.val("");
            ID.focus();
        }


    }

    self.CancelShiftSetup = function () {
        self.ClearControl();
    }

    self.ClearControl = function () {
        self.ShiftName("");
        self.ShiftStartTime("");
        self.ShiftEndTime("");
        self.SelectedShiftSetupTime("");

        self.SelectedTimePeriodStart("");
        self.SelectedTimePeriodEnd("");
    }

    self.SetNepali = function () {
        self.ShiftName($("#txtShiftName").val());
        self.ShiftStartTime($("#txtStartHour").val());
        self.ShiftEndTime($("#txtEndHour").val());
    }

    self.GetShift();
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new ShiftSetupViewModel());

})

