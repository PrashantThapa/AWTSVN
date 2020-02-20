﻿function Department(data) {
    if (data != undefined) {
        var self = this;
        self.DeptID = ko.observable(data.DeptID);
        self.DeptDesc = ko.observable(data.DeptDesc);
        self.OfficeCD = ko.observable(data.OfficeCD);
    }
}

function Office(data)
    {

    if (data != undefined) {
    var self = this;
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
        self.OfficeNameEng = ko.observable(data.OfficeNameEng);
}
}



function Sewa(data) {
    if (data != undefined) {
        var self = this;
        self.SewaID = ko.observable(data.SewaID);
        self.SewaName = ko.observable(data.SewaName);
    }
}

function Level(data) {
    if (data != undefined) {
        var self = this;
        self.LevelID = ko.observable(data.GradeScaleSetupId);
        self.LevelDesc = ko.observable(data.EmpLevel);
    }
}

function Samuha(data) {
    if (data != undefined) {
        var self = this;
        self.SamuhaID = ko.observable(data.SamuhaID);
        self.SewaID = ko.observable(data.SewaID);
        self.SamuhaName = ko.observable(data.SamuhaName);
    }
}

function UpaSamuha(data) {
    if (data != undefined) {
        var self = this;
        self.UpaSamuhaID = ko.observable(data.UpaSamuhaID);
        self.UpaSamuhaName = ko.observable(data.UpaSamuhaName);
    }
}

function OfficeSetup(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    self.OfficeNameEng = ko.observable(data.OfficeNameEng);
    self.IRDCode = ko.observable(data.IRDCode);
    self.HouseNo = ko.observable(data.HouseNo);
    self.StreetName = ko.observable(data.StreetName);
    self.WardNo = ko.observable(data.WardNo);
    self.Vdc = ko.observable(data.Vdc);
    self.FaxNo = ko.observable(data.FaxNo);
    self.PhoneNo = ko.observable(data.PhoneNo);
    self.DistrictCode = ko.observable(data.DistrictCode);
    self.Email = ko.observable(data.Email);
    self.Address = ko.observable(data.Address);
    self.OfficeType = ko.observable(data.OfficeType);
    self.ParentOffice = ko.observable(data.ParentOffice);
    self.Action = ko.observable(data.Action);
};

function Post(data) {
    if (data != undefined) {
        var self = this;
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);
        self.Status = ko.observable(data.Status);
        self.SewaID = ko.observable(data.Sewa.SewaID);
        self.AvailableLevel = ko.observable(data.AvailableLevel);
        self.Samuha = ko.observable(data.Samuha.SamuhaID);
        self.UpaSamuha = ko.observable(data.UpaSamuha.UpaSamuhaID);
        self.DeptID = ko.observable(data.DeptID);
        self.OfficeCode = ko.observable(data.OfficeCode);
    }
}

var PostModel = function () {
    var self = this;
    self.OfficeCode = ko.observable();
    self.PostID = ko.observable();
    self.PostDesc = ko.observable();
    self.Status = ko.observable();
    self.SewaID = ko.observable();
    self.LevelID = ko.observable();
    self.Samuha = ko.observable();
    self.UpaSamuha = ko.observable();
    self.SewaName = ko.observable();
    self.LevelDesc = ko.observable();
    self.SamuhaName = ko.observable();
    self.UpaSamuhaName = ko.observable();
    self.DeptID = ko.observable();
    self.DeptDesc = ko.observable();
    self.Action = ko.observable();
    self.SaveButtonText = ko.observable("Submit");

    self.OfficeCD = ko.observable();
    self.SelectedDepartment = ko.observable();
    self.SelectedOffice = ko.observable();
    self.SelectedSewa = ko.observable();
    self.SelectedLevel = ko.observable();
    self.SelectedSamuha = ko.observable();
    self.SelectedUpaSamuha = ko.observable();
    self.SelectedParentPost = ko.observable();
    self.SelectedPost = ko.observable();
    self.SaveButtonText = ko.observable('ADD');
    self.Sewas = ko.observableArray([]);
    self.Levels = ko.observableArray([]);
    self.Samuhas = ko.observableArray([]);
    self.AllSamuhas = ko.observableArray([]);
    self.UpaSamuhas = ko.observableArray([]);
    self.ParentPosts = ko.observableArray([]);
    self.Posts = ko.observableArray([]);
    self.Departments = ko.observableArray([]);
    self.Offices = ko.observableArray([]);
    self.availableLevels = ko.observableArray(['20%','1', '2', '3','4','5','6','7','8','9','10','11','12','13','14', '15','16']);


    self.SavePost = function () {
        self.SetNepaliValues();
        if (self.ValidatePost()) {
            var postAction = "";
            if (self.SelectedPost() == undefined) {
                postAction = "A";
                self.PostID(null);
            }
            if (self.SelectedPost() != undefined) {
                postAction = "E";
                self.PostID(self.SelectedPost());
            }

            var post = {
                PostID: self.SelectedPost(),
                PostDesc: self.PostDesc(),
                AvailableLevel: self.SelectedLevel(),
                //Level: { LevelID: self.SelectedLevel() },
                //Samuha: Samuha,
                //UpaSamuha: UpaSamuha,
                //ParentPost: ParentPost,
                Status: self.Status(),
                FromDate: getDate(),
                ToDate: null,
                DeptID: self.SelectedDepartment(),
                OfficeCode: self.SelectedOffice(),
                EntryBy: $("#user").text(),
                EntryDate: null,
                Action: postAction
            };

            var url = "../../../Handlers/COMMON/PostHandler.ashx";
            var data = { 'method': 'SavePost', 'args': JSON.stringify(ko.toJS(post)) };
            //debugger;
            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
				 msg("Post Saved !!!","SUCCESS");	
                if (obj.Message === "Successfully Saved." || obj.Message === "Successfully Updated.") {
                    self.SaveButtonText('Save');
                    self.ClearControl();
                }
                if (obj.Message === "Successfully Saved." || obj.Message === "Successfully Updated.") {
                    self.GetPost();
                }
                else {
                    self.SelectedPost('');
                }
            });
        }
    };

    self.DeletePost = function () {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            console.log(ko.toJS(self.SelectedPost()));
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/COMMON/PostHandler.ashx',
                    data: { 'method': 'DeletePost', 'post': ko.toJS(self.SelectedPost()), 'token': $("#token").text() },
                    contentType: "application/json; character=utf-8",
                    success: function (result) {
                        waitMsg.hide();
                        msg(result.Message);

                        if (result.IsSucess) {
                            msg(result.Message);
                            self.GetPost();
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

    self.GetPostDetails = function () {
        self.ClearControl();
        self.ClearControl();
        self.SaveButtonText('Save');
        if (ko.toJS(self.SelectedPost()) != undefined) {
            waitMsg("Loading");
            waitMsg.show();
            self.SaveButtonText('Update');
            var data = ko.toJS(self.SelectedPost());
            if (data !== undefined) {
                self.SelectedOffice(data.OfficeCode);
                self.SelectedLevel(data.AvailableLevel);
                self.GetDepartment();
                self.SelectedDepartment(data.DeptID);
                self.SelectedPost(data.PostID);
                self.PostDesc(data.PostDesc);
                self.Status(data.Status);
            }
    
        }
    }



    self.GetPost = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/COMMON/PostHandler.ashx',
            data: { 'method': 'GetPost', 'postID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Post(item);
                });
                self.Posts(mappedTask);
                waitMsg.hide();
            },
            error: function (err) {
                msg("Oops! Error occured while obtaining Posts!!!","WARNING");
            }
        });
    };

    self.GetOffices = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new OfficeSetup(item)
                });

                self.Offices(mappedTask);
                console.log(ko.toJS(mappedTask));
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    } 

    self.GetDepartment = function () {
        waitMsg("Loading");
        waitMsg.show();
        if (ko.toJS(self.SelectedOffice()) !== undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DepartmentHandler.ashx',
                data: {
                    'method': 'GetDepartment', 'officeCode': self.SelectedOffice(), 'deptID': null
                },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Department(item);
                    });
                    self.Departments(mappedTask);
                    waitMsg.hide();
                },
                error: function (err) {
                    msg("Oops Error occured while obtaining Posts Department!!!", "WARNING");
                }
            });
        }
    };
  

    self.GetLevel = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/PAYROLL/GradeScaleSetupHandler.ashx',
            data: { 'method': 'GetAllGradeScalesForDdl'},
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Level(item);
                });
                self.Levels(mappedTask);
                waitMsg.hide();
            },
            error: function (err) {
                msg("Oops! Error occured while fetching levels.", "WARNING");
                console.log(err);
            }
        });
    };

   

    self.ClearPost = function () {
        self.SetNepaliValues();
        self.SelectedPost("");
        self.SaveButtonText('Save');
        self.ClearControl();
    };

    self.ValidatePost = function () {
        var errMsg = "";

        if (Validate.empty(self.PostDesc())) {
            errMsg += "Please fill Post!\n";
        }
        if (Validate.empty(self.Status())) {
            errMsg += "Please fill Status!\n";
        }
        //if (Validate.empty(self.SelectedLevel())) {
        //    errMsg += "कृपया तह छान्नुहोस्!\n";
        //}
        //if (Validate.empty(self.SelectedSewa())) {
        //    errMsg += "कृपया सेवा छान्नुहोस्!\n";
        //}
        //if (Validate.empty(self.SelectedSamuha())) {
        //    errMsg += "कृपया समूह छान्नुहोस्!\n";
        //}
        //if (Validate.empty(self.SelectedDepartment())) {
        //    errMsg += "Please select Department!\n";
        //}
        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    };

    self.ClearControl = function () {
        self.PostDesc("");
        self.Status("");
        self.SelectedLevel("");
        self.SelectedSewa("");
        self.SelectedParentPost("");
        self.SelectedSamuha("");
        self.SelectedUpaSamuha("");
        self.SelectedDepartment("");
    }

    self.SetNepaliValues = function () {
        self.PostDesc($('#txtPostName').val());
    }

    self.GetLevel();
    //self.GetSewa();
    //self.GetSamuha();
    self.GetDepartment();
    self.GetOffices();
    self.GetPost();
}

$(document).ready(function () {
    ValidateSession();
    var postModel = new PostModel();
    ko.applyBindings(postModel);
});