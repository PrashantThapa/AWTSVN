function LeaveCancellation(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.EmpName = ko.observable(data.EmpName);
    self.AppFromDate = ko.observable(data.AppFromDate);
    self.AppToDate = ko.observable(data.AppToDate);
    self.AppNoOfDays = ko.observable(data.AppNoOfDays);
    self.LeaveTypeID = ko.observable(data.LeaveType.LeaveTypeID);
    self.ApplicationDate = ko.observable(data.ApplicationDate);
}

function LeaveCancellationViewModel() {
    var self = this;

    self.isDisabled = ko.observable(true);
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmpName = ko.observable();
    self.AppFromDate = ko.observable();
    self.AppToDate = ko.observable();
    self.AppNoOfDays = ko.observable();
    var NoofDays;
    self.LeaveTypeID = ko.observable();
    self.ApplicationDate = ko.observable();

    self.Days = ko.observable();
    self.CancelDate= ko.observable();
   

    self.Status = ko.observable("F");
    self.CancellationFromDate = ko.observable();
    self.CancellationToDate = ko.observable();
    self.CancellationNoOfDays = ko.observable();
    self.LeaveDate = ko.observable();
    self.LeaveReason = ko.observable();
    self.AppDate = ko.observable();
    self.LTypeID = ko.observable();
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.Action = ko.observable("A");
    self.LeaveCancellationLst = ko.observable([]);
    self.CFromDate = ko.observable();
    self.CToDate = ko.observable();
    self.SubmissionNo = ko.observable();
    self.EditLeave = function (datas) {

        var data = ko.toJS(datas);

        self.CancellationFromDate(data.AppFromDate);
        self.CancellationToDate(data.AppToDate);
        self.CFromDate(data.AppFromDate);
        self.CToDate(data.AppToDate);
        self.CancellationNoOfDays(data.AppNoOfDays);
        self.AppDate(data.ApplicationDate);
        self.LTypeID(data.LeaveTypeID);
        NoofDays = data.AppNoOfDays;
        self.isDisabled(true);
       
    }
    self.GetDateDifference = function (date1, date2, type) {
        if (date1 != undefined && date2 != undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
				data: { 'method': 'GetDaysDifferenceWithHoliday', 'date1': date1, 'date2': date2 },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var days = result.ResponseData;
                    if (type == "date") {
                        self.Days(days);
                    }
                    else if (type == "changedate") {
                        self.CancellationNoOfDays(days + 1);
                        if (days < 0) {
                            msg("End Date should be greater or equals to Start Date !!!", "FAILURE");
                            self.ToDate('');
                        }
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.ValidateFromDate = function () {
        if (self.CancellationFromDate() == "" || self.CancellationFromDate() === undefined) {

            msg("Please fill cancel start !!!<br>", "FAILURE");
            //self.ApproveDate('');
        }
        if (self.CFromDate() == "" || self.CFromDate() === undefined) {

            msg("Please select leave cancel list !!!<br>", "FAILURE");
            self.CFromDate("");
            // self.CancellationFromDate('');
        }

		if (!Validate.empty(self.CancellationFromDate()) && !Validate.empty(self.CFromDate())) {


           // self.GetDateDifference(self.CFromDate(), self.CancellationFromDate(),"date");
           // console.log(self.Days());
            if (self.Days() < 0) {
                msg("cancel start date should be greater or equals!!!");
                self.CancellationFromDate('');
                self.Days('');
            }
           // self.GetDateDifference(self.CancellationFromDate(), self.CancellationToDate(), "changedate");
			self.GetDateDifference(self.CFromDate(), self.CancellationFromDate());
		}
		
    }

    self.ValidateToDate = function () {




        if (Validate.empty(self.CancellationToDate())) {
           
            msg("Please fill cancel end date!!!<br>", "FAILURE");
        }
        if (Validate.empty(self.CToDate())) {

            msg("Please select Leave cancel list!!!<br>", "FAILURE");
            
        }

        if (!Validate.empty(self.CancellationToDate()) && !Validate.empty(self.CToDate())) {
            self.GetDateDifference(self.CancellationToDate(), self.CToDate(), "date");
            console.log(self.Days());
            if (self.Days() < 0) {
                msg("Cancel End Date should be smaller or Equals!!!");
                self.CancellationToDate('');
                self.Days('');
            }
            self.GetDateDifference(self.CancellationFromDate(), self.CancellationToDate(), "changedate");
        }
    }
    self.ValidateDays = function () {
        var errMsg = "";
        if (self.CancellationToDate() == "" || self.CancellationToDate() === undefined) {
            errMsg += "Please fill cancel end date!!!<br>";
            
        }
        if (self.CToDate() == "" || self.CToDate() === undefined) {
            errMsg += "Please select leave cancel list!!!<br>";
            
        }
        if (self.CancellationFromDate() == "" || self.CancellationFromDate() === undefined) {
            errMsg += "Please fill cancel start date!!!<br>";
           
        }
        if (self.CFromDate() == "" || self.CFromDate() === undefined) {
            errMsg += "Please select leave cancel list!!!<br>";
         
        }
        if ((self.CancellationFromDate() != "" || self.CancellationFromDate() != undefined) && (self.CancellationToDate() != "" || self.CancellationToDate() != undefined)) {
            //if (!Validate.empty(self.CancellationFromDate()) && !Validate.empty(self.CancellationToDate())) {
           
            self.GetDateDifference(self.CancellationFromDate(), self.CancellationToDate(),"date");
            //console.log(self.Days());
            var Cdate = parseInt(self.Days());
            Cdate = Cdate + 1;

            if (Cdate < self.CancellationNoOfDays()) {
                errMsg += "Cancel no.of days should be smaller or equals!!!";
              
                self.CancellationNoOfDays('');
                self.Days('');
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
    self.Validation = function () {


       
        var errMsg = "";
        var objFocus = null;

       

        if (self.EmpID() == "" || self.EmpID() === undefined) {

           errMsg += "Please select the employee!!!<br>";

       }
       
        if ( Validate.empty(self.CancellationFromDate())) {
            errMsg += "Please fill cancel start date!!!<br>";
            objFocus = self.CancellationFromDate;
        }
        if ( Validate.empty(self.CancellationToDate())) {
            errMsg += "Please fill cancel end date!!!<br>";
            objFocus = self.CancellationToDate;
        }
        if ( Validate.empty(self.CancellationNoOfDays())) {
            errMsg += "Please fill cancel no. of days !!!<br>";
            objFocus = self.CancellationNoOfDays;
        }

        if (self.CancellationNoOfDays() > NoofDays) {
            errMsg += "Max no. of days! !!!<br>";
            objFocus = self.CancellationNoOfDays;
        }
      
        if ( Validate.empty(self.LeaveDate())) {
            errMsg += "Please fill cancel date!!!<br>";
            objFocus = self.CancellationNoOfDays;
        }
        

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };




    self.Search = function () {

        var args = self.EmpID();

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/PIS/LeaveCancellationHandler.ashx',
            data: { 'method': 'GetLeaveCancellation', 'empID': args },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                var mappedTask = $.map(result.ResponseData, function (item) {
              
                    return new LeaveCancellation(item)
                });

                self.LeaveCancellationLst(mappedTask);

                $("#loader").hide();

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }


    self.SaveEntity = function () {


        if (self.Validation()) {
           
            if (self.ValidateDays()) {
                
                LeaveArray = {
                    LeaveTypeID: self.LTypeID()
                }

                var args = {
                    OldSubmissionNo: self.SubmissionNo(),
                    EmpID: self.EmpID(),
                    LeaveType: LeaveArray,
                    ApplicationDate: self.AppDate(),
                    CancellationFromDate: self.CancellationFromDate(),
                    CancellationToDate: self.CancellationToDate(),
                    CancellationNoOfDays: self.CancellationNoOfDays(),
                    LeaveDate: self.LeaveDate(),
                    LeaveReason: $('#txtReason').val(),
                    Action: self.Action(),
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "F"

                };



                var method = 'SaveLeaveCancellation';
                var url = '../../Handlers/PIS/LeaveCancellationHandler.ashx';
                var appID = "PIS";
                var modID = "EMPLCAN";
                var data = { 'method': method, 'args': JSON.stringify(args), 'appID': appID, 'modID': modID };
                $.post(url, data,
            function (result) {
                waitMsg.hide();
                var obj = jQuery.parseJSON(result);
                msg(obj.Message, "ALERT");
                self.ClearControls();


            });

            };
        };
    };
    self.GetEntity = function () {

        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() != "" && self.SubmissionNo() != undefined && self.SubmissionNo() != null) {

            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');
                $('#divtoggle').hide();
            }
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PIS/LeaveCancellationHandler.ashx',
                data: { 'method': 'GetLeaveCancelBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    
                    self.SubmissionNo(result.ResponseData[0].SubmissionNo);
                    self.EmpID(result.ResponseData[0].EmpID);
                    self.EmpName(result.ResponseData[0].EmpName);
                    self.Search();
                   
                    self.AppDate(result.ResponseData[0].ApplicationDate);
                    self.LeaveDate(result.ResponseData[0].CancelDate);
                    self.CancellationFromDate(result.ResponseData[0].CancellationFromDate);
                    self.CancellationToDate(result.ResponseData[0].CancellationToDate);
                    self.CancellationNoOfDays(result.ResponseData[0].CancellationNoOfDays);
                    self.LeaveReason(result.ResponseData[0].LeaveReason);
                    self.EntryDate(result.ResponseData[0].EntryDate);
                    self.EntryBy(result.ResponseData[0].EntryBy);
                    self.Status(result.ResponseData[0].Status);
                    self.LTypeID(result.ResponseData[0].LeaveType.LeaveTypeID);
                   
                    $("#loader").hide();

                },
                error: function (err) {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
                    $('#divtoggle').hide();
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GetEntity();
    self.ClearControls = function () {
        self.EmpID("");
        self.EmpName("");
        self.CancellationFromDate("");
        self.CancellationToDate("");
        self.CancellationNoOfDays("");
        self.AppDate("");
        self.LTypeID("");

        self.LeaveDate("");
        self.LeaveReason("");
        self.LeaveCancellationLst([]);


    }
    $('#modalEmpSearch').on('hidden.bs.modal', function () {
        self.EmpID(GEmpID);
        self.EmpName(GEmpName);
       
        self.Search();
    });
};
$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new LeaveCancellationViewModel(), document.getElementById("LeaveCancellation"));
});