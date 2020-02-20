
function ContactType(data) {
    var self = this;

    self.TypeID = ko.observable(data.TypeID);
    self.TypeName = ko.observable(data.TypeName);
    self.TypeNameEng = ko.observable(data.TypeNameEng);
    self.Status = ko.observable(data.Status);
    self.FromDate = ko.observable(data.FromDate);
    self.Action = ko.observable(data.Action);
    self.EntryBy = ko.observable(data.EntryBy);
};

function ContactTypeViewModel() {
    var self = this;

    self.TypeID = ko.observable();
    self.TypeName = ko.observable();
    self.TypeNameEng = ko.observable();
    self.Status = ko.observable(true);
    self.FromDate = ko.observable();
    self.ContactTypes = ko.observableArray([]);
    self.Action = ko.observable("");

    //slected record for edit
    self.selectedItem = ko.observable();
    var entryBy = $("#user").text();
    //--------------------------------------------------------------
    // To Add New Data to  Grid
    //--------------------------------------------------------------

    self.AddContactType = function () {

        var errMsg = "";

        var con = self.selectedItem();
        self.TypeName($("#TypeName").val());

        //-----------in case to edit/update----------

        if (con != undefined) {

            //validating controls      
            if (self.Validation()) {
                con.TypeID(self.TypeID());
                con.TypeName(self.TypeName());
                con.TypeNameEng(self.TypeNameEng());
                con.Status(self.Status());
                con.FromDate(self.FromDate());

                var action = self.Action() == "A" ? "A" : "E";
                con.Action(action);
                //emp.Action(self.Action());

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
                con = {
                    TypeID:null,
                    TypeName: self.TypeName(),
                    TypeNameEng: self.TypeNameEng(),
                    Status: self.Status(),
                    FromDate: self.FromDate(),
                    Action: "A",
                    EntryBy: entryBy

                };

                if (self.ContactTypes.indexOf(con) > -1) {
                    return;
                }

                self.ContactTypes.push(new ContactType(con));


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
        self.TypeID("");
        self.TypeName("");
        self.TypeNameEng("");
        self.Status(true);
        self.FromDate("");
        self.Action("");
        self.selectedItem(null);


        var btnAdd = $("button.icon-ok");
        btnAdd.removeClass("icon-ok").addClass("icon-add");
        btnAdd.text("Add");
    };

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;


        if (Validate.empty(self.TypeName())) {
            errMsg = "Please fill Contact Type Name!!!<br>";
        }

        if (Validate.empty(self.TypeNameEng())) {
            errMsg += "Please fill Contact Type Name English!!!<br>";
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
            url: '../../../Handlers/CENTRALLOOKUP/ContactTypeHandler.ashx',
            data: { 'method': 'GetContactType', 'contacttypeid': null, 'token':$("#token").text() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        
                        return new ContactType(item);
                    });

                    self.ContactTypes(mappedTask);
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

    self.DeleteContactType = function (contacttype) {
       
                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/CENTRALLOOKUP/ContactTypeHandler.ashx',
                    data: { 'method': 'DeleteContactType', 'contacttypeid': contacttype.TypeID, 'token':$("#token").text() },
                    success: function (result) {
                        waitMsg.hide();
                        if (result.IsSucess) {
                            self.ContactTypes.remove(contacttype);
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
                        msg(err.status + "-" + err.statusText);
                    }
                });
            }
    //    });
    //};
    
    


    //--------------------------------------------------------------
    //NB: To Edit Grid Data
    //--------------------------------------------------------------

    self.EditContactType = function (contacttype) {

        self.TypeID(contacttype.TypeID());
        self.TypeName(contacttype.TypeName());
        self.TypeNameEng(contacttype.TypeNameEng());
        self.Status(contacttype.Status());
        self.FromDate(contacttype.FromDate());

        if (contacttype.Action() == "A") {
            self.Action("A");
        }
        else {
            self.Action("E");
        }
        self.selectedItem(contacttype);



        var btnAdd = $("button.icon-add");
        btnAdd.removeClass("icon-add").addClass("icon-ok");
        btnAdd.text("Update");

    }


    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearContactType = function () {
        self.ClearControls();
        self.ContactTypes.removeAll();
    };


    //--------------------------------------------------------------
    //NB: To Save
    //--------------------------------------------------------------

    self.SaveContactType = function (ContactType) {
        waitMsg("Saving");
        waitMsg.show();

        var jsonData = FilteredJson(ko.toJS(self.ContactTypes));
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: '../../Handlers/CENTRALLOOKUP/ContactTypeHandler.ashx',
            data: { 'method': 'SaveContactType', 'contype': JSON.stringify(jsonData), 'token':$("#token").text() },
            contentType: "applicaton/json; character=utf -8",
            success: function (result) {
                waitMsg.hide();
                msg(result.Message);

                if (result.IsSucess) {
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
                msg(err.status + " - " + err.statusText);
            }


        });
    };
    self.LoadControls();

};


$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new ContactTypeViewModel());
});