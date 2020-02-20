/*********************************************************************************
 Copyright © HRFA PCS System  2016
*********************************************************************************
Project              : HRFA PCS System  2016  
File                 :RelationType.js 
Description          :This Page contain the Relation Type Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
shanjeev sah (shanjeev007@gmail.com)                                 2015-05-22                                                             
*********************************************************************************/


var Relation = function (data) {
    var self = this;

    self.RelTypeID = ko.observable(data.RelTypeID);
    self.RelTypeName = ko.observable(data.RelTypeName);
    self.RelTypeNameEng = ko.observable(data.RelTypeNameEng);
    self.Status = ko.observable(data.Status);
    self.FromDate = ko.observable(data.FromDate);
    self.Action = ko.observable(data.Action);
    self.EntryBy = ko.observable(data.EntryBy);
};


var RelationViewModel = function () {

    var self = this;
    self.RelTypeID = ko.observable();
    self.RelTypeName = ko.observable();
    self.RelTypeNameEng = ko.observable();
    self.Status = ko.observable(true);
    self.FromDate = ko.observable();
    self.Relations = ko.observableArray([]);
    self.Action = ko.observable();
    // the Relation that we want to view/edit
    self.selectedItem = ko.observable();
    var entryBy = $("#user").text();

    //--------------------------------------------------------------
    //NB: To Add New Data to  Grid
    //--------------------------------------------------------------
    self.AddRelationType = function () {

        var rel = self.selectedItem();
        self.RelTypeName($("#RelTypeName").val());

        //--------------------------------------------------------------
        // NB: Edit Case
        //--------------------------------------------------------------
        if (rel != undefined) {

            // NB: Validate Controls
            if (self.Validation()) {

                var action = self.Action() == "A" ? "A" : "E";
                rel.RelTypeName(self.RelTypeName());
                rel.RelTypeNameEng(self.RelTypeNameEng());
                rel.Status(self.Status());
                rel.FromDate(self.FromDate());
                rel.Action(action);

                // clear out the selected Relation
                self.selectedItem(null);

                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                self.ClearControls();
            }
        }
        else {
            // NB: Validate Controls
            if (self.Validation()) {

                // NB: New Add Case
                rel = {

                    RelTypeID: self.RelTypeID(),
                    RelTypeName: self.RelTypeName(),
                    RelTypeNameEng: self.RelTypeNameEng(),
                    Status: self.Status(),
                    FromDate: self.FromDate(),
                    Action: "A",
                    EntryBy: entryBy
                };

                // check to see that the relation doesn't already exist in our list
                if (self.Relations.indexOf(rel) > -1) {
                    return;
                }

                self.Relations.push(new Relation(rel));

                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");
                
                self.ClearControls();
            }
        }

    };


    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;


        if (Validate.empty(self.RelTypeName())) {
            errMsg = "Please fill Relation Type Name!!!<br>";
        }

        if (Validate.empty(self.RelTypeNameEng())) {
            errMsg += "Please fill Relation Type Name English !!!<br>";
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };

    function CallBackDelete(relation) {
        //alert("callback!");
        //return;
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/RelationTypeHandler.ashx',
            data: { 'method': 'DeleteRelationType', 'relType': relation.RelTypeID, 'token': $("#token").text() },
            //data: { 'method': 'DeleteRelationType', 'relType': '1' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                if (result.IsSucess) {

                    self.Relations.remove(relation);
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
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }


    //--------------------------------------------------------------
    //NB: To Remove Grid Data
    //--------------------------------------------------------------
    self.DeleteRelation = function (relation) {

        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();

                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/CENTRALLOOKUP/RelationTypeHandler.ashx',
                    data: { 'method': 'DeleteRelationType', 'relType': relation.RelTypeID, 'token': $("#token").text() },
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        waitMsg.hide();

                        if (result.IsSucess) {

                            self.Relations.remove(relation);
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
    self.EditRelation = function (relation) {

        self.RelTypeID(relation.RelTypeID());
        self.RelTypeName(relation.RelTypeName());
        self.RelTypeNameEng(relation.RelTypeNameEng());
        self.Status(relation.Status());
        self.FromDate(relation.FromDate());
        self.Action(relation.Action());

        self.selectedItem(relation);

        var btnAdd = $("button.icon-add");
        btnAdd.removeClass("icon-add").addClass("icon-ok");
        btnAdd.text("Update");

    };


    //--------------------------------------------------------------
    //NB: To Clear Controls
    //--------------------------------------------------------------
    self.ClearRelationType = function () {
        self.ClearControls();
        self.Relations.removeAll();
    };


    //--------------------------------------------------------------
    //NB: To Save
    //--------------------------------------------------------------
    self.SaveRelationType = function () {

        waitMsg("Saving");
        waitMsg.show();
        //Validate.show();
        var jsonData = FilteredJson(ko.toJS(self.Relations));

        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/RelationTypeHandler.ashx',
            data: { 'method': 'SaveRelationType', 'args': JSON.stringify(jsonData), 'token': $("#token").text() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                waitMsg.hide();
                // waitMsg(false);
                waitMsg.hide();
                // Validate.hide();
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
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });


    };

    //--------------------------------------------------------------
    //NB: To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.RelTypeID("");
        self.RelTypeName("");
        self.RelTypeNameEng("");
        self.Status(true);
        self.FromDate("");

        self.selectedItem(null);

        var btnAdd = $("button.icon-ok");
        btnAdd.removeClass("icon-ok").addClass("icon-add");
        btnAdd.text("Add");
    };


    //---------------------------------------- ----------------------
    //NB: To Load Data Intially
    //--------------------------------------------------------------
    self.LoadControls = function () {

        waitMsg("Loading");
        waitMsg.show();

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/RelationTypeHandler.ashx',
            data: { 'method': 'GetRelationType', 'args': null, 'token': $("#token").text() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new Relation(item)
                    });

                    self.Relations(mappedTask);
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


    self.LoadControls();


};

$(document).ready(function () {

    ValidateSession();

    ko.applyBindings(new RelationViewModel());
    
});