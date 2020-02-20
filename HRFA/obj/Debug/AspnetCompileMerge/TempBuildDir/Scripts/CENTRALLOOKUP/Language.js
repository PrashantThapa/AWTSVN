/*********************************************************************************
 Copyright © HRFA PCS System  2016
*********************************************************************************
Project              : Copyright © HRFA PCS System  2016  
File                 :Language.js 
Description          :This Page contain the Address Type Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
Jitendra Kumar                                  1/22/2015                                                              
*********************************************************************************/

function Language(data) {
    var self = this;

    self.LanguageID = ko.observable(data.LanguageID);
    self.LanguageName = ko.observable(data.LanguageName);
    self.LanguageNameEng = ko.observable(data.LanguageNameEng);
    self.Status = ko.observable(data.Status);
    self.FromDate = ko.observable(data.FromDate);
    self.Action = ko.observable(data.Action);
    self.EntryBy = ko.observable(data.EntryBy);
};

function LanguageViewModel() {
    var self = this;

    self.LanguageID = ko.observable();
    self.LanguageName = ko.observable();
    self.LanguageNameEng = ko.observable();
    self.Status = ko.observable("I");
    self.FromDate = ko.observable();
    self.Languages = ko.observableArray([]);
    self.Action = ko.observable("");
    self.makecheck = ko.observable(false);
    //slected record for edit
    self.selectedItem = ko.observable();
    var entryBy = $("#user").text();

    //--------------------------------------------------------------
    // To Add New Data to  Grid
    //--------------------------------------------------------------
    self.ToggletoADD = function () {
        if (self.makecheck() == true) {
            self.Status("A");
        }
        else {
            self.Status("I");
        }
    }
    self.AddLanguage = function () {

        var errMsg = "";

        var add = self.selectedItem();
        self.LanguageName($("#LanguageName").val());

        //-----------in case to edit/update----------

        if (add != undefined) {

            //validating controls      
            if (self.Validation()) {
                add.LanguageID(self.LanguageID());
                add.LanguageName(self.LanguageName());
                add.LanguageNameEng(self.LanguageNameEng());
                add.Status(self.Status());
                add.FromDate(self.FromDate());

                var action = self.Action() == "A" ? "A" : "E";
                add.Action(action);


                self.selectedItem(null);

                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                self.ClearControls();
            }
        }

        //---------in case of adding new record to grid----------------
        else {
            //validating controls
            if (self.Validation()) {

               
                add = {
                    LanguageID: null,
                    LanguageName: self.LanguageName(),
                    LanguageNameEng: self.LanguageNameEng(),
                    Status: self.Status(),
                    FromDate: self.FromDate(),
                    Action: "A",
                    EntryBy: entryBy
                };

                if (self.Languages.indexOf(add) > -1) {
                    return;
                }

                self.Languages.push(new Language(add));


                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                //--clearing controls------

                self.ClearControls();

            }
        }

    };

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.LanguageID("");
        $('#LanguageName').val("");
        self.LanguageName("");
        self.LanguageNameEng("");
        self.Status("I");
        self.makecheck(false);

        self.FromDate("");
        self.Action("");
        self.selectedItem(null);


        var btnAdd = $("button.icon-ok");
        btnAdd.removeClass("icon-ok").addClass("icon-add");
        btnAdd.text("Add");
    };
    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;


        if (Validate.empty(self.LanguageName())) {
            errMsg = "Please fill Language!!! <br>";
        }

        if (Validate.empty(self.LanguageNameEng())) {

            errMsg += "Please fill Language name in English !!!<br>";
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
    // To Load Data Intially
    //--------------------------------------------------------------

    self.LoadControls = function () {

        waitMsg("Loading");
        waitMsg.show();

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/CENTRALLOOKUP/LanguageHandler.ashx',
            data: { 'method': 'GetLanguageTypes' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new Language(item)
                    });

                    self.Languages(mappedTask);
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
    //--------------------------------------------------------------
    // To Remove Grid Data
    //--------------------------------------------------------------    
    self.DeleteLanguage = function (language) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();

                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/CENTRALLOOKUP/LanguageHandler.ashx',
                    data: { 'method': 'DeleteLanguage', 'languageid': language.LanguageID, 'token':$("#token").text() },
                    success: function (result) {
                        waitMsg.hide();
                        if (result.IsSucess) {                          
                            self.Languages.remove(language);
                            msg(result.Message);
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
    };

    //--------------------------------------------------------------
    //NB: To Edit Grid Data
    //--------------------------------------------------------------

    self.EditLanguage = function (language) {

        self.LanguageID(language.LanguageID());
        self.LanguageName(language.LanguageName());
        self.LanguageNameEng(language.LanguageNameEng());
        self.Status(language.Status());
        if (self.Status()=="A") {
            self.makecheck(true);
        }
        else {
            self.makecheck(false);
        }
        self.FromDate(language.FromDate());

        if (language.Action() == "A") {
            self.Action("A");
        }
        else {
            self.Action("E");
        }
        self.selectedItem(language);



        var btnAdd = $("button.icon-add");
        btnAdd.removeClass("icon-add").addClass("icon-ok");
        btnAdd.text("Update");

    }


    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearAddresType = function () {
        self.ClearControls();
        self.Languages.removeAll();
    };


    //--------------------------------------------------------------
    //NB: To Save
    //--------------------------------------------------------------

    self.SaveLanguage = function (Language) {
        waitMsg("Saving");
        waitMsg.show();

        var jsonData = FilteredJson(ko.toJS(self.Languages));
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: '../../Handlers/CENTRALLOOKUP/LanguageHandler.ashx',
            data: { 'method': 'SaveLanguage', 'args': JSON.stringify(jsonData) },
            contentType: "applicaton/json; character=utf -8",

            success: function (result) {
                waitMsg.hide();
                msg(result.Message);

                if (result.IsSucess) {
                    self.LoadControls();
                    msg(result.Message);

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



    };
   self.LoadControls();
};


$(document).ready(function () {
    
    ValidateSession();
    ko.applyBindings(new LanguageViewModel());
});