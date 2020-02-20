/*********************************************************************************
 Copyright © HRFA PCS System  2016
*********************************************************************************
Project              : Copyright © HRFA PCS System  2016  
File                 :Holidays.js 
Description          :This Page contain the Holidays Setup Knockout JS Code
************************************************************************************************
<Name>                                                                                 <Date>         
Ashok Kumar Bhattarai    eashokbhattarai@gmail.com                                   10/19/2016                                                              
************************************************************************************************/

function HolidaySetup(data) {
    var self = this;
    self.HolidayID = ko.observable(data.HolidayID);
    self.HolidayDesc = ko.observable(data.HolidayDesc);
    self.FixedHolidays = ko.observable(data.FixedHolidays);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.Status = ko.observable(data.Status);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Action = ko.observable(data.Action);
}

function HolidaySetupViewModel() {
    var self = this;
    self.HolidayID = ko.observable();
    self.HolidayDesc = ko.observable();
    self.FixedHolidays = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.Action = ko.observable();

    //    self.ShiftSetupTime = ko.observable([]);
    self.HolidaySetupDays = ko.observableArray([]);
    // self.SelectedShiftSetupTime = ko.observable();
    self.SelectedHolidaySetupDay = ko.observable();
    self.Action("A");
    self.SaveHolidaySetup = function () {
        
        if (self.Validation()) {
            var isFixedHoliday;
            if (self.FixedHolidays()) {
                isFixedHoliday = "Y";
            }
            else {
                isFixedHoliday = "N";
            }
            
            console.log(self.HolidayID());
            var row = {
                HolidayID: self.HolidayID(),
                HolidayDesc: self.HolidayDesc(),
                FixedHolidays: isFixedHoliday,
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                Status: "A",
                Action: self.Action()
            };
            
            $.ajax({
                type: 'GET',
                dataType: "json",
                cache: false,
                url: '../../../Handlers/ALMS/HolidaysHandler.ashx',
                data: { 'method': 'SaveHolidays', 'args': JSON.stringify(row) },
                contentType: "application/json; character=utf-8",

                success: function (result) {
                    if (result.IsSucess) {
                        msg(result.Message);

                        self.GetHolidays();
                        self.ClearControl();


                    }
                    else {
                        msg(result.Message);
                    }
                },

                error: function (err) {
                    msg("Failed error");
                    //console.log(err);
                }

            });
        }

    }

    self.GetHolidays = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/ALMS/HolidaysHandler.ashx',
            data: { 'method': 'GetHolidays', 'HolidayValue': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new HolidaySetup(item)

                });

                self.HolidaySetupDays(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }

    self.DeleteHolidaySetup = function () {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/ALMS/HolidaysHandler.ashx',
                    data: { 'method': 'DeleteHolidaySetup', 'holidays': self.SelectedHolidaySetupDay(), 'token': $("#token").text() },
                    contentType: "application/json; character=utf-8",
                    success: function (result) {
                        waitMsg.hide();
                        msg(result.Message);

                        if (result.IsSucess) {
                            msg(result.Message);
                            self.GetHolidays();
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

    self.HolidaySetupDetails = function () {

        if (self.SelectedHolidaySetupDay() == null) {
            self.ClearControl();
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/ALMS/HolidaysHandler.ashx',
                data: { 'method': 'GetHolidays', 'HolidayValue': self.SelectedHolidaySetupDay() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = result.ResponseData[0];
                    self.HolidayID(data.HolidayID);
                    if (data.FixedHolidays == "Y") {
                        self.FixedHolidays(true);
                    }
                    else {
                        self.FixedHolidays(false);
                    }
                    self.HolidayDesc(data.HolidayDesc);
                    self.FromDate(data.FromDate);
                    self.ToDate(data.ToDate);
                    self.Action("E");
                    console.log(self.HolidayID());

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }


    self.Validation = function () {
        var errMsg = "";
        self.SetNepali();
        //        console.log('check');
        //        return;
        if (Validate.empty(self.HolidayDesc())) {
            errMsg += "Please fill Holiday Description!\n";
        }

        if (Validate.empty(self.FromDate())) {
            errMsg += "Please fill Start Date! \n";
        }

        if (Validate.empty(self.ToDate())) {
            errMsg += "Please fill End Date!\n";
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

    self.CancelHolidaySetup = function () {
        self.ClearControl();
    }

    self.ClearControl = function () {
        //        self.ShiftName("");
        //        self.ShiftStartTime("");
        //        self.ShiftEndTime("");

        //self.HolidayID('');
        self.HolidayDesc('');
        // $('#txtHolidayDescription').val("")
        self.ToDate('');
        self.FromDate('');
        self.FixedHolidays(false);
        self.Action("A");
        document.getElementById("lstHolidays").selectedIndex = 0;

    }

    self.SetNepali = function () {
        self.HolidayDesc($("#txtHolidayDescription").val());
        self.FromDate($("#txtFromDate").val());
        self.ToDate($("#txtToDate").val());
    }

    self.GetHolidays();
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new HolidaySetupViewModel());

})

