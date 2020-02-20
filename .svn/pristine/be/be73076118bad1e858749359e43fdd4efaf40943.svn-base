/*********************************************************************************
Copyright © DCGC , 2015
*********************************************************************************

Description          :This Page contain the User Submission Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
Om Sharan Shrestha                         2016-10-27                                                                 
*********************************************************************************/

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
function PostWiseLst(data) {
    var self = this;
    self.Office = ko.observable(data.Office);
    self.Post = ko.observable(data.Post);
    self.SalaryItem = ko.observable(data.SalaryItem);
    self.Mode = ko.observable(data.Mode);
    self.Amount = ko.observable(data.Amount);
    self.Fun = ko.observable(data.Fnc);
    self.EntryBy = ko.observable(data.EntryBy);
    self.Status = ko.observable(data.Status);
    self.OldSubmissionNo = ko.observable(data.OldSubmissionNo);

}
function SalaryItem(data) {
    var self = this;

    self.SalaryItemID = ko.observable(data.SalaryItemID);
    self.SalaryItemDesc = ko.observable(data.SalaryItemDesc);
    self.FromDate = ko.observable(data.FromDate);
    self.Action = ko.observable(data.Action);
    self.makecheck = ko.observable(false);

};
function SalaryTemp(data) {
    if (data != undefined) {
        var self = this;
        self.SalaryItemID = ko.observable(data.SalaryItemID);
        self.SalaryItemDesc = ko.observable(data.SalaryItemDesc);
        self.FromDate = ko.observable(data.FromDate);
        self.Action = ko.observable(data.Action);
        self.makecheck = ko.observable(false);

    }
}
function ModeLst(data) {
    var self = this;

    self.ModeID = ko.observable(data.ModeID);
    self.ModeDesc = ko.observable(data.ModeDesc);


};
function Func(data) {
    var self = this;

    self.FunID = ko.observable(data.FunID);
    self.FunDesc = ko.observable(data.FunDesc);


};
function OfficePostViewModel() {
    var self = this;
    self.PostID = ko.observable();
    self.PostDesc = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.SalaryItemID = ko.observable();
    self.SalaryItemDesc = ko.observable();
    self.ModeID = ko.observable();
    self.ModeDesc = ko.observable();
    self.Amount = ko.observable();
    self.Funcs = ko.observable([]);
    self.SubmissionNo = ko.observable();
    self.SelectedFun = ko.observable([]);
    self.SelectedMode = ko.observable([]);
    self.SelectedOffice = ko.observable([]);
    self.SelectedPost = ko.observable([]);
    self.SelectedSalaryItem = ko.observable([]);
    self.SalaryMap = ko.observableArray([]);
    self.PostsLST = ko.observable([]);
    self.Offices = ko.observable([]);
    self.SalaryItems = ko.observable([]);
    self.Modes = ko.observable([
    { ModeID: 'F', ModeDesc: 'Flat' },
    { ModeID: 'C', ModeDesc: 'Calculated' }
    ]);
    self.isDisabled = ko.observable(false);
    self.selectedItem = ko.observable([]);
    self.Action = ko.observable("A");
    self.SalaryItemToAdd = ko.observableArray([]);
    self.PostWiseLsts = ko.observableArray([]);
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable("F");
    self.makecheck = ko.observable(false);
    $('#toggle').css("display", "none");
    self.Delete = function (data) {
        Confirm('Are you confirm to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PostWiseLsts.remove(data);
            }
        });

    }

    /////fun or fnc means a function which is a storeprocedure to call
    self.Add = function () {
        if (self.Validation()) {

            var sel = self.selectedItem();


            if (sel != undefined && sel != "") {

                // var action = sel.Action() == "A" ? "A" : "E";

                var Off = {
                    OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                    OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
                };
                var Pos = {
                    PostID: ko.toJS(self.SelectedPost).PostID,
                    PostDesc: ko.toJS(self.SelectedPost).PostDesc,
                    FromDate: ko.toJS(self.SelectedPost).FromDate
                };
                var Sal = {
                    SalaryItemID: ko.toJS(self.SelectedSalaryItem).SalaryItemID,
                    SalaryItemDesc: ko.toJS(self.SelectedSalaryItem).SalaryItemDesc
                };
                var Mod = {
                    ModeID: ko.toJS(self.SelectedMode).ModeID,
                    ModeDesc: ko.toJS(self.SelectedMode).ModeDesc
                };

                if (ko.toJS(self.SelectedMode).ModeID == "C") {
                    var Fun = {
                        FunID: ko.toJS(self.SelectedFun).FunID,
                        FunDesc: ko.toJS(self.SelectedFun).FunDesc
                    };

                }
                else {
                    var Fun = {
                        FunID: "",
                        FunDesc: ""
                    }
                }
                sel.Office(Off);
                sel.Post(Pos);
                sel.SalaryItem(Sal);
                sel.Mode(Mod);

                sel.Fun(Fun);
                sel.Amount(self.Amount());
                sel.OldSubmissionNo(self.SubmissionNo());
                self.selectedItem(null);
                $("#AddBtn").text('Add');
                self.ClearControls();

            }
            else {
                var Off = {
                    OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                    OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
                };
                var Pos = {
                    PostID: ko.toJS(self.SelectedPost).PostID,
                    PostDesc: ko.toJS(self.SelectedPost).PostDesc,
                    FromDate: ko.toJS(self.SelectedPost).FromDate
                };
                var Sal = {
                    SalaryItemID: ko.toJS(self.SelectedSalaryItem).SalaryItemID,
                    SalaryItemDesc: ko.toJS(self.SelectedSalaryItem).SalaryItemDesc
                };
                var Mod = {
                    ModeID: "F",
                    ModeDesc:"Flat"
                };

                if (ko.toJS(self.SelectedMode).ModeID == "C") {
                    var Fun = {
                        FunID: ko.toJS(self.SelectedFun).FunID,
                        FunDesc: ko.toJS(self.SelectedFun).FunDesc
                    };

                }
                else {
                    var Fun = {
                        FunID: "",
                        FunDesc: ""
                    }
                }

                var newAdd = {

                    Office: Off,
                    Post: Pos,
                    SalaryItem: Sal,
                    Mode: Mod,
                    Fnc: Fun,
                    Amount: self.Amount(),
                    EntryBy: self.EntryBy(),
                    Status: self.Status(),
                    OldSubmissionNo: self.SubmissionNo()

                };

                self.PostWiseLsts.push(new PostWiseLst(newAdd));
                self.ClearControls();

            }
        }

    }
    self.Edit = function (data) {

        var datas = ko.toJS(data);
        for (var i = 0; i < self.Offices().length; i++) {

            if (self.Offices()[i].OfficeCode() == datas.Office.OfficeCode) {

                self.SelectedOffice(self.Offices()[i]);
            }
        }
        if (ko.toJS(self.SelectedOffice) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice).OfficeCode;
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../Handlers/COMMON/OfficePostHandler.ashx',
                data: { 'method': 'GetOfficePostList', 'OfficeCD': OfficeCD },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new Posts(item)
                    });

                    self.PostsLST(mappedTask);
                    self.SelectedPost("");
                    self.SelectedSalaryItem("");
                    self.SelectedMode("");

                    self.Amount('');
                    $('#toggle').css("display", "none");

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
        for (var i = 0; i < self.PostsLST().length; i++) {

            if (self.PostsLST()[i].PostID() == datas.Post.PostID) {

                self.SelectedPost(self.PostsLST()[i]);
            }
        }
        for (var i = 0; i < self.SalaryItems().length; i++) {

            if (self.SalaryItems()[i].SalaryItemID() == datas.SalaryItem.SalaryItemID) {

                self.SelectedSalaryItem(self.SalaryItems()[i]);
            }
        }

        for (var i = 0; i < self.Modes().length; i++) {

            if (self.Modes()[i].ModeID == datas.Mode.ModeID) {

                self.SelectedMode(self.Modes()[i]);
            }
        }
        if (ko.toJS(self.SelectedMode).ModeID == "C") {
            $('#toggle').css("display", "block");
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                data: { 'method': 'GetFunction' },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new Func(item)
                    });
                    self.isDisabled(true);
                    self.Funcs(mappedTask);
                    for (var i = 0; i < self.Funcs().length; i++) {

                        if (self.Funcs()[i].FunID() == datas.Fun.FunID) {

                            self.SelectedFun(self.Funcs()[i]);
                        }
                    }


                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });


        }
        else {
            $('#toggle').css("display", "none");
        }
        self.Amount(datas.Amount);
        self.selectedItem(data);
        $("#AddBtn").text('Update');

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

            self.Offices(mappedTask);



        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");

        }
    });

    self.GetEntity = function () {

        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));

        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() != "" && self.SubmissionNo() != undefined && self.SubmissionNo() != null) {

            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, select').attr('disabled', 'disabled');
                $('#edit').css("display", "none");
                $('#delete').css("display", "none");
            }

            self.isDisabled(true);
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PAYROLL/PostWiseSalaryItemSetupHandler.ashx',
                data: { 'method': 'GetPostWiseSalaryItemSubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",

                success: function (result) {
                    waitMsg.hide();
                    if (result.IsSucess) {
                        var mappedTask = $.map(result.ResponseData, function (item) {
                            console.log(item);
                            return new PostWiseLst(item)
                        });

                        self.PostWiseLsts(mappedTask);
                        for (var i = 0; i < self.PostWiseLsts().length; i++) {

                            self.PostWiseLsts()[i].OldSubmissionNo(self.SubmissionNo());
                            self.PostWiseLsts()[i].Status("F");

                        }
                    }
                    else {

                        if (!result.IsToken)
                            msg(result.Message, "WARNING", null, ClearSession);
                        else
                            msg(result.Message, "WARNING");
                    }


                },
                error: function (err) {
                    $('button').hide();
                    $('form').find('input, select').attr('disabled', 'disabled');
                    //$('.chk').attr('disabled', 'disabled');
                    $('#edit').css("display", "none");
                    $('#delete').css("display", "none");
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GetEntity();

    self.Load = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
            data: { 'method': 'GetSalaryItem' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new SalaryItem(item)
                });

                self.SalaryItems(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
    self.Load();

    self.Funct = function () {
        self.Funcs([]);
        self.Amount("");
        self.isDisabled(false);
        $('#toggle').css("display", "none");

        if (self.SelectedMode() != undefined) {
            if (ko.toJS(self.SelectedMode).ModeID == "C") {
                $('#toggle').css("display", "block");
                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                    data: { 'method': 'GetFunction' },
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        var mappedTask = $.map(result.ResponseData, function (item) {

                            return new Func(item)
                        });
                        self.isDisabled(true);
                        self.Funcs(mappedTask);



                    },
                    error: function (err) {
                        msg(err.status + " - " + err.statusText, "FAILURE");

                    }
                });
            }
        }
    }
    self.Calculate = function () {
        if (self.SelectedFun() == "" || self.SelectedFun() == undefined) {

            msg("Please select calculated type !!!<br>", "FAILURE");
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                data: { 'method': self.SelectedFun() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    self.Amount(result.ResponseData.Amount);


                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GMode = function () {
        self.SelectedMode("");

    }
    self.GetSalary = function () {

        self.SelectedSalaryItem("");



    }
    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.Amount("");
        self.SelectedMode("");
        self.SelectedOffice("");
        self.SelectedSalaryItem("");
        self.SelectedPost("");


    };

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;



        if (self.SelectedOffice() == "" || self.SelectedOffice() == undefined) {

            errMsg += "Please select office !!!<br>";
        }
        if (self.SelectedPost() == "" || self.SelectedPost() == undefined) {

            errMsg += "Please select post!!!<br>";
        }

//        if (self.SelectedMode() == "" || self.SelectedMode() == undefined) {

//            errMsg += "कृपया मोड छान्नुहोस् !!!<br>";
//        }
        if (self.Amount() == "" || self.Amount() == undefined) {

            errMsg += "Please fill amount !!!<br>";
        }
        //       if (Validate.empty(ko.toJS(self.SalaryItemToAdd())))
        //       {
        //           errMsg += "कृपया  तलब सूची छान्नुहोस् !!!<br>";
        //       }
        if (self.SelectedSalaryItem() == "" || self.SelectedSalaryItem() == undefined) {

            errMsg += "Please select salary list!!!<br>";
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

        self.SelectedPost("");
        self.SelectedSalaryItem("");
        self.SelectedMode("");

        self.Amount('');
        if (ko.toJS(self.SelectedOffice) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice).OfficeCode;
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../Handlers/COMMON/OfficePostHandler.ashx',
                data: { 'method': 'GetOfficePostList', 'OfficeCD': OfficeCD },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new Posts(item)
                    });

                    self.PostsLST(mappedTask);
                    self.SelectedPost("");
                    self.SelectedSalaryItem("");
                    self.SelectedMode("");

                    self.Amount('');
                    $('#toggle').css("display", "none");

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.gsalary = function () {

        var PostID = ko.toJS(self.SelectedPost()).PostID;
        var OfficeCD = self.SelectedOffice();
        var SubmissionNo = self.SubmissionNo();

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
            data: { 'method': 'GetSalaryItem' },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new SalaryItem(item)
                });

                self.SalaryItems(mappedTask);


            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

        $.ajax({
            dataType: "json",
            cache: false,

            url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
            data: { 'method': 'GetSalaryItemByOfficeSub', 'officecode': OfficeCD, 'postcode': PostID, 'subno': SubmissionNumber },
            contentType: "application/json; charset=utf-8",

            success: function (result) {

                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new SalaryTemp(item)
                });

                self.SalaryMap.removeAll();

                self.SalaryMap(mappedTask);

                for (var i = 0; i < self.SalaryItems().length; i++) {

                    self.SalaryItems()[i].makecheck(false);
                    self.SalaryItems()[i].Action("");


                    for (var j = 0; j < self.SalaryMap().length; j++) {


                        if (self.SalaryItems()[i].SalaryItemID() == self.SalaryMap()[j].SalaryItemID()) {

                            self.SalaryItems()[i].FromDate(self.SalaryMap()[j].FromDate());

                            self.SalaryItems()[i].Action("E");
                            self.SalaryItems()[i].makecheck(true);

                        }

                    }

                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
                };


            },
            error: function (err) {

                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });

    }



    self.SavePostWiseSalaryItemSetup = function (OfficePost) {



        if (ko.toJS(self.PostWiseLsts()) != "" || ko.toJS(self.PostWiseLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();

            var url = "../../Handlers/PAYROLL/PostWiseSalaryItemSetupHandler.ashx";
            var method = "SavePostWiseSalaryItem";
            var appID = "PIS";
            var modID = "POSTSALITEM";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.PostWiseLsts())), 'appID': appID, 'modID': modID };
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
                                        self.Load();
                                        self.PostWiseLsts([]);

                                    });
        }

    };




};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new OfficePostViewModel());
});