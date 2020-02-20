

function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
   

};
function Posts(data) {
    var self = this;

    self.PostID = ko.observable(data.PostID);
    self.PostDesc = ko.observable(data.PostDesc);
    self.FromDate = ko.observable(data.FromDate);

};
function Leave(data) {
    var self = this;

    self.LeaveTypeID = ko.observable(data.LeaveTypeID);
    self.LeaveTypeName = ko.observable(data.LeaveTypeName);


};
function PeriodType(data) {
    var self = this;

    self.PeriodTypeID = ko.observable(data.PeriodTypeID);
    self.PeriodTypeText = ko.observable(data.PeriodTypeText);


};
function OfficePostViewModel() {
    var self = this;
    self.PostID = ko.observable();
    self.PostDesc = ko.observable();
    self.LeaveID = ko.observable();
    self.LeaveDesc = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.LeaveTypeID = ko.observable();
    self.LeaveTypeText = ko.observable();
    self.PeriodType = ko.observable();
    self.PeriodTime= ko.observable();
    self.IsAccural= ko.observable(false);
    self.MaxAccrualDays= ko.observable();
    self.PeriodTypeID = ko.observable();
    self.PeriodTypeText = ko.observable();
    self.PeriodTypeLst = ko.observableArray([
        { PeriodTypeID: 'Y', PeriodTypeText: 'Yearly' },
        { PeriodTypeID: 'M', PeriodTypeText: 'Monthly' },
        { PeriodTypeID: 'S', PeriodTypeText: 'Service Period' }
        ]);
    //self.LeaveTypeLst = ko.observable([]);
    self.SelectedOffice = ko.observable([]);
    self.SelectedPost = ko.observable([]);
    self.SelectedLeave = ko.observable([]);
    self.Post_Time = ko.observable();
    self.SelectedPeriodType = ko.observable([]);
    self.PostsLST = ko.observable([]);
    self.OfficeLST = ko.observable([]);
    self.LeaveLST = ko.observable([]);
    self.Action = ko.observable("A");
    self.chosenOffice = ko.observable();
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable("F");
   self.FDate=ko.observable();
   self.isDisabled = ko.observable(true);

   self.ToggletoADD = function (data) {
       if (data.IsAccural() == true) {
           self.isDisabled(false);
       }
       else {
           self.isDisabled(true);
       }

   }
    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {

                return new Office(item)
            });

            self.OfficeLST(mappedTask);
            $("#loader").hide();


            self.GetLeave();
           

        },
		error: function (err) {
			 msg("Oops Error While obtaining offices!!!","WARNING");
            

        }
    });

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        $('#txtPost_Time').val("");
        self.IsAccural(false);
        $('#txtMaxAccrualDays').val("");
        self.SelectedPeriodType("");
        
        $("#lstOffice").val($("#lstOffice option:first").val());
        var lst = $("#lstOffice").val();
        self.SelectedOffice = ko.observable(String(lst));
        self.SelectedPost("");
        self.SelectedLeave("");
        
        
    };
    self.ClearLeave = function () {
        self.SelectedLeave("");
        
    }
    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;



        if (Validate.empty(self.SelectedOffice())) {

            errMsg += "Please Select Office !!!<br>";
        }

        if (Validate.empty(self.SelectedPost())) {

            errMsg += "Please select Post !!!<br>";
        }
        if (Validate.empty(self.SelectedLeave())) {

            errMsg += "Please select LeaveType!!!<br>";
        }
        if (Validate.empty(self.SelectedPeriodType())) {

            errMsg += "Please select Period Type !!!<br>";
        }
        if ($('#txtPost_Time').val() == "") {
            errMsg += "Please fill time period!!!<br>";
           // objFocus = self.UserId;
        }
        if (self.IsAccural() == true) {
            if ($('#txtMaxAccrualDays').val() == "") {
                errMsg += "Please fill Maximum Accrual Days!!!<br>";
               // objFocus = self.UserId;
            }
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
 self.GetPost = function () {

     var OfficeCD = self.SelectedOffice();
     $.ajax({
         dataType: "json",
         cache: false,
         url: '../../Handlers/COMMON/OfficePostHandler.ashx',
         data: { 'method': 'GetOfficePostList', 'OfficeCD': OfficeCD },
         contentType: "application/json; charset=utf-8",
         success: function (result) {
             var mappedTask = $.map(result.ResponseData, function (item) {

                 return new Posts(item)
             });

             self.PostsLST(mappedTask);
             $("#loader").hide();

             self.SelectedLeave("");

         },
         error: function (err) {
			  msg("Oops! Error occured while obtaining Office posts !!!","WARNING");

         }
     });
 }
 
 self.GetLeave = function () {
     $.ajax({
         dataType: "json",
         cache: false,
         url: '../../Handlers/COMMON/LeaveTypeHandler.ashx',
         data: { 'method': 'GetLeaveType' , 'LeaveTypeValues' : null},
         contentType: "application/json; charset=utf-8",
         success: function (result) {
             var mappedTask = $.map(result.ResponseData, function (item) {

                 return new Leave(item)
             });

             self.LeaveLST(mappedTask);
             $("#loader").hide();
         },
         error: function (err) {
             msg("Oops! Error occured while obtaining Leave Type !!!","WARNING");

         }
     });
 }

   
 self.CancelLeave = function () {

     self.ClearControls();
     
 }
 self.SaveLeave = function (OfficePost) {

     if (self.Validation()) {

         OfficeArray = {
             OfficeCode: self.SelectedOffice()
         }
         LeaveArray = {
             LeaveTypeID: self.SelectedLeave()
         }
         PeriodTypeArray = {
             PeriodTypeID: self.SelectedPeriodType()
         }
         PostArray = {
             PostID: ko.toJS(self.SelectedPost).PostID,
             FromDate: ko.toJS(self.SelectedPost).FromDate

         }


         sub = {
             Office: OfficeArray,
             Post: PostArray,
             Leave: LeaveArray,
             Status: self.Status(),
             EntryBy: self.EntryBy(),
             Action: "A",
             PeriodType: PeriodTypeArray,
             PeriodTimes: getNumEng($('#txtPost_Time').val()),
             IsAccural: self.IsAccural(),
             MaxAccrualDays: getNumEng($('#txtMaxAccrualDays').val())
         };

        
         $.ajax({
             type: "GET",
             dataType: "json",
             cache: false,
             url: '../../Handlers/COMMON/PostWiseLeaveTypeHandler.ashx',
             data: { 'method': 'SavePostWiseLeaveType', 'args': JSON.stringify(sub) },
             contentType: "applicaton/json; character=utf -8",

             success: function (result) {
                 if (result.IsSucess) {
					  msg("PostWise Leave Saved !!!","WARNING");
                     self.ClearControls();

                 }
                 else {
					  msg("Oops Error Occured while saving Postwise leave!!!","WARNING");
                 }
             },
             error: function (err) {
                 msg("Oops Error Occured while saving Postwise leave !!!","WARNING");
                 //console.log(err);
             }

         });

     }

 };


};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new OfficePostViewModel());
});