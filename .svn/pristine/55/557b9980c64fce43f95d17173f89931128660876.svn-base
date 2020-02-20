
function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
   

};
function Posts(data) {
    var self = this;

    self.PostID = ko.observable(data.PostID);
    self.PostDesc = ko.observable(data.PostDesc);
 

};
function OfficePostViewModel() {
    var self = this;
    self.PostID = ko.observable();
    self.PostDesc = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.PostSeq = ko.observable();
    self.SelectedOffice = ko.observable([]);
    self.SelectedPost = ko.observable([]);
    self.PostsLST = ko.observable([]);
    self.OfficeLST = ko.observable([]);
    self.Action = ko.observable("A");
    self.chosenOffice = ko.observable();
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable("A");
    self.OfficeDarbandiArray = ko.observableArray([]);
    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../Handlers/COMMON/OfficePostHandler.ashx',
        data: { 'method': 'GetOfficePostList' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {

                return new Posts(item)
            });

            self.PostsLST(mappedTask);
            $("#loader").hide();

           
        },
        error: function (err) {
			 msg("Oops Error occured while obtaining Office Post !!!","WARNING");

        }
    });

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
           self.GetPost();

        },
        error: function (err) {
			 msg("Oops Error Occured While Obtaining Offices !!!","WARNING");

        }
    });
  
    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        // self.PostSeq("");
        self.SelectedOffice("");
        self.SelectedPost("");
        $('#txtPostSeq').val("");
    };

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
 self.Validation = function () {

     var errMsg = "";
     var objFocus = null;
     
      

     if (Validate.empty(self.SelectedOffice())) {

         errMsg += "Please select Office !!!<br>";
     }
     if (Validate.empty(self.SelectedPost())) {

         errMsg += "Please Select Post !!!<br>";
     }
    
     if ($('#txtPostSeq').val()=== "") {
         errMsg += "Please fill number of Post!!!<br>";
       
     }
     if (errMsg !== "") {
          msg(errMsg,"WARNING");

         return false;
     }
     else {
         return true;
     }

 };
 self.GetPostSeq = function () {

     if (self.SelectedPost() !== "" && self.SelectedPost() !== undefined) {
        
         var OfficeCode = self.SelectedOffice();
         var PostID = ko.toJS(self.SelectedPost).PostID;
         $.ajax({
             dataType: "json",
             cache: false,
             url: '../../Handlers/COMMON/OfficePostHandler.ashx',
             data: { 'method': 'GetOfficePostFromDate', 'OfficeCD': OfficeCode, 'PostID': PostID },
             contentType: "application/json; charset=utf-8",
             success: function (result) {
                 var data = result.ResponseData;

                 self.FromDate(data);
                 $('#txtPostSeq').val("");
             },
             error: function (err) {
                 msg("Oops Error occured while obtaining Office Posts !!!","WARNING");

             }
         });
     }
 }
    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
 self.GetPost = function () {

     var OfficeCD = self.SelectedOffice();
     $.ajax({
         dataType: "json",
         cache: false,
         url: '../../Handlers/COMMON/OfficePostHandler.ashx',
         data: { 'method': 'GetOfficePostListWithCount', 'OfficeCD': OfficeCD },
         contentType: "application/json; charset=utf-8",
         success: function (result) {
             var mappedTask = $.map(result.ResponseData, function (item) {

                 return new Posts(item)
             });

             self.PostsLST(mappedTask);
             $('#txtPostSeq').val("");
             $("#loader").hide();


         },
         error: function (err) {
             msg("Oops Error occured while obtaining Office Posts !!!","WARNING");


         }
     });
 }
 
 

   
 self.CancelOfficePost = function () {

     self.ClearControls();
     
 }
 self.SaveOfficePost = function (OfficePost) {

     if (self.Validation()) {

         OfficeArray = {
             OfficeCode: self.SelectedOffice()
         }
         PostArray = {
             PostID: ko.toJS(self.SelectedPost).PostID,
             PostDesc: ko.toJS(self.SelectedPost).PostDesc

         }
         self.OfficeDarbandiArray([]);
         var VarPostDesc = ko.toJS(self.SelectedPost).PostDesc;

         var SplitVarPD = VarPostDesc.split("[");

         var VarPD = SplitVarPD[1].substring(SplitVarPD[1].length - 1, 0);

         var act;
         if (VarPD > 0) {
             act = "E";
         }
         else {
             act = "A";
             self.FromDate("");
         }
         var TotPost = parseInt(getNumEng($('#txtPostSeq').val())) + parseInt(VarPD);
         for (var i = parseInt(VarPD); i < TotPost; i++) {
             officeDarbandi = {
                 PostSeq: i + 1,
                 Status: "F"
             }
             self.OfficeDarbandiArray.push(officeDarbandi);
         }




         sub = {
             Office: OfficeArray,
             Post: PostArray,
             OfficeDarbandi: self.OfficeDarbandiArray(),
             Status: self.Status(),
             EntryBy: self.EntryBy(),
             DarbandiFDate: self.FromDate(),

             Action: act
         };

         var url = "../../Handlers/COMMON/OfficePostHandler.ashx";
         var data = { 'method': "SaveOfficePost", 'args': JSON.stringify(sub) };
         async: false,
                $.post(url, data,
                        function (result) {
                            var obj = jQuery.parseJSON(result);
							if (obj.IsSucess === true) {
								self.GetPost(); 
								 msg("Office Post Saved !!!","SUCCESS");
							}
							else {
                                msg("Oops Error occured while obtaining Office Posts !!!","WARNING");
							}
                        });

     }

 };




};

$(document).ready(function () {
	
    ValidateSession();
    ko.applyBindings(new OfficePostViewModel());
});