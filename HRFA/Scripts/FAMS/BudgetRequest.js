/*********************************************************************************
Copyright © DCGC , 2015
*********************************************************************************
Project              :DCGC  
File                 :BudgetRequest.js
Description          :This Page contain the User BudgetRequest Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
om Shrestha()      2016-11-9                                                                  
*********************************************************************************/

function Office(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);

};

function CostCenter(data) {
    var self = this;

    self.CostCenterID = ko.observable(data.CostCenterID);
    self.CostCenterName = ko.observable(data.CostCenterName);

};

function BudgetItem(data) {
    var self = this;

    self.BudgetItemID = ko.observable(data.BudgetItemID);
    self.BudgetItemName = ko.observable(data.BudgetItemName);

};

function Job(data) {
    var self = this;

    self.JobID = ko.observable(data.JobID);
    self.JobDesc = ko.observable(data.JobDesc);
};

function AccountChart(data) {
    var self = this;
    self.AccCode = ko.observable(data.AccCode);
    self.AccName = ko.observable(data.AccName);
    self.CodeNo = ko.observable(data.CodeNo);
}

function FiscalYear(data) {
    var self = this;
    //  self.FiscalYearID = ko.observable(data.FiscalYearID);
    self.FiscalYearName = ko.observable(data.FiscalYearName);
}

function IncomeType(data) {
    var self = this;
    self.IncomeTypeName = ko.observable(data.IncomeTypeName);
}

function ChangeCostCenter(data) {
    var self = this;
    self.Office = ko.observable(data.Office);
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);

    self.CostCenter = ko.observable(data.CostCenter);
    self.CostCenterID = ko.observable(data.CostCenterID);
    self.CostCenterName = ko.observable(data.CostCenterName);

    self.AccountChart = ko.observable(data.AccountChart);
    self.AccCode = ko.observable(data.AccCode);
    self.AccName = ko.observable(data.AccName);
    self.CodeNo = ko.observable(data.CodeNo);

    self.BudgetItem = ko.observable(data.BudgetItem);
    self.BudgetItemID = ko.observable(data.BudgetItemID);
    self.BudgetItemName = ko.observable(data.BudgetItemName);


    self.Amount = ko.observable(data.Amount);
    self.EntryBy = ko.observable(data.EntryBy);
    self.Status = ko.observable(data.Status);

    self.SubmissionNo = ko.observable(data.SubmissionNo);

    self.RequestedDate = ko.observable(data.RequestedDate);

    self.FiscalYearName = ko.observable(data.FiscalYearName);
    self.IncomeTypeName = ko.observable(data.IncomeTypeName);
}


function BudgetRequestViewModel() {
    var self = this;

    self.BudgetIDesc = ko.observable();
    self.JobIDesc = ko.observable();
    self.Amt = ko.observable();
    self.BudgetItemID = ko.observable();
    self.BudgetItemName = ko.observable();
    self.JobID = ko.observable();
    self.JobDesc = ko.observable();

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();

    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.SubmissionNo = ko.observable();
   
    self.Amt = ko.observable();
    self.RequestedDate = ko.observable();

    self.SelectedOffice = ko.observable([]);
    self.SelectedBudgetItem = ko.observable([]);
    self.SelectedJob = ko.observable([]);
    self.SelectedCostCenter = ko.observable([]);
    self.BudgetRequestLsts = ko.observableArray([]);
    self.selectedItem = ko.observable([]);
    self.Offices = ko.observable([]);
    self.BudgetItems = ko.observable([]);
    self.Jobs = ko.observable([]);
    self.CostCenters = ko.observable([]);
    self.BudgetItemLsts = ko.observableArray([]);

    self.Action = ko.observable();
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable();

    self.AccCode = ko.observable();
    self.AccName = ko.observable();
    self.CodeNo = ko.observable();

    self.Amount = ko.observable();

    self.BudgetItem = ko.observable();
    
    self.FiscalYearName = ko.observable();

    self.FiscalYears = ko.observableArray([]);
    self.SelectedFiscalYear = ko.observable([]);

    self.IncomeTypeName = ko.observable();
   // self.IncomeTypes = ko.observableArray([]);
    // self.IncomeTypes = ko.observableArray([{ 'IncomeTypeName': 'Cash Base'}, { 'IncomeTypeName': 'Bill Base'}]);
     self.IncomeTypes = ko.observableArray([{ 'IncomeTypeName': 'Income'}]);
    self.SelectedIncomeType = ko.observable([]);

    $("#DivIncomeLabel").hide();
    $("#DivIncomeLst").hide();


//    self.ShowIncomeType = function () {

//        if (ko.toJS(self.SelectedCostCenter()).CostCenterID == 8) {

//            $("#DivIncomeLabel").show();
//            $("#DivIncomeLst").show();
//        }
//        else {

//            $("#DivIncomeLabel").hide();
//            $("#DivIncomeLst").hide();
//        }
    //    }
//    if (self.SelectedGlCode() == undefined) {
//        self.SelectedGLCodeSubsidary("");
//        $("#ddlGLSubsidary").hide();
//        $("#ddlGLSubsidarys").hide();
//    }
    self.ShowIncomeType = function () {

        if (ko.toJS(self.SelectedCostCenter()) == undefined) {

            self.SelectedIncomeType("");
            $("#DivIncomeLabel").hide();
            $("#DivIncomeLst").hide();
        }
        else {

            if (ko.toJS(self.SelectedCostCenter()).CostCenterID == 8) {

                $("#DivIncomeLabel").show();
                $("#DivIncomeLst").show();
            }

        }
    } 

//    var incomeType = null;
//    //= ko.toJS(self.SelectedIncomeType).IncomeTypeName
//    if (self.SelectedIncomeType() === undefined) {
//        incomeType = null;
//    }
//    else {
//        incomeType = ko.toJS(self.SelectedIncomeType).IncomeTypeName;
//    }




    self.Print = function () {

        if (self.SearchValidation()) {


            var incomeType = null;
            //= ko.toJS(self.SelectedIncomeType).IncomeTypeName
            if (self.SelectedIncomeType() === undefined) {
                incomeType = null;
            }
            else {
                incomeType = ko.toJS(self.SelectedIncomeType).IncomeTypeName;
            }



            var data = {
                fiscalyear: ko.toJS(self.SelectedFiscalYear()).FiscalYearName,
                OfficeCode: ko.toJS(self.SelectedOffice()).OfficeCode,
                CostCenterID: ko.toJS(self.SelectedCostCenter()).CostCenterID,
                IncomeTypeName: incomeType
            }

           
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "";
            url = "../../../Reporting/FAMS/ReportHandlers/BudgetRequestHandler.ashx";

            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);

        }

    }

    self.GetFiscalYear = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../Handlers/CENTRALLOOKUP/FiscalYearHandler.ashx',
            data: { 'method': 'GetFiscalYear', 'fiscalYearID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new FiscalYear(item)
                });

                self.FiscalYears(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }

    self.GetFiscalYear();

    self.GetBudgetRequest = function () {

        if (self.SearchValidation()) {

            var office = ko.toJS(self.SelectedOffice).OfficeCode
            var costcenter = ko.toJS(self.SelectedCostCenter).CostCenterID
            var fiscalyear = ko.toJS(self.SelectedFiscalYear).FiscalYearName

            var incomeType = null;
            //= ko.toJS(self.SelectedIncomeType).IncomeTypeName
            if (self.SelectedIncomeType() === undefined) {
                incomeType = null;
            }
            else {
                incomeType = ko.toJS(self.SelectedIncomeType).IncomeTypeName;
            }


            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '/Handlers/FAMS/BudgetRequestHandler.ashx',

                data: { 'method': 'ChangeCostCenter', 'OfficeCD': office, 'CostCenterID': costcenter, 'fiscalyear': fiscalyear, 'incomeType': incomeType },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.ResponseData.length > 0) {
                        var mappedTask = $.map(result.ResponseData, function (item) {
                            return new ChangeCostCenter(item)
                        });
                        self.BudgetRequestLsts(mappedTask);
                        console.log(mappedTask);

                        for (var i = 0; i < self.BudgetRequestLsts().length; i++) {

                            if (ko.toJS(self.BudgetRequestLsts())[i].Status == "F" || ko.toJS(self.BudgetRequestLsts())[i].Status == "T") {
                                $('.Amounttxt').prop("disabled", true)
                            }
                            else if (ko.toJS(self.BudgetRequestLsts())[i].Status == "I") {
                                $('.Amounttxt').prop("disabled", false)
                            }
                        }


                        self.RequestedDate(result.ResponseData[0].RequestedDate);
                        self.SubmissionNo(result.ResponseData[0].SubmissionNo);

                        console.log(result.ResponseData[0].RequestedDate);
                        console.log(result.ResponseData[0].SubmissionNo);

                        if (Validate.empty(self.SubmissionNo())) {
                            self.Action("A");

                        }
                        else {
                            self.Action("E");
                        }

                        if (result.ResponseData[0].Status == "F" || result.ResponseData[0].Status == "T") {
                            $('.btnSave').prop("disabled", true);
                            $('.btnSubmit').prop("disabled", true);

                        }
                        else if (result.ResponseData[0].Status == "I") {
                            $('.btnSave').prop("disabled", false);
                            $('.btnSubmit').prop("disabled", false);
                        }

                    }

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });

        }

    }

    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
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
   
    
    self.GetCostCenter = function () {

        if (ko.toJS(self.SelectedOffice) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice).OfficeCode;
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../Handlers/FAMS/BudgetRequestHandler.ashx',
                data: { 'method': 'GetCostCenter', 'OfficeCD': OfficeCD },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new CostCenter(item)
                    });

                    self.CostCenters(mappedTask);


                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    self.GetBudgetItem = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/FAMS/BudgetItemHandler.ashx',
            data: { 'method': 'GetBudgetItem' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new BudgetItem(item)
                });

                self.BudgetItems(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
    self.GetBudgetItem();
    self.GetJob = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../Handlers/FAMS/BudgetRequestHandler.ashx',
            data: { 'method': 'GetJob' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new Job(item)
                });

                self.Jobs(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
   
    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.SelectedOffice('');
        self.SelectedCostCenter("");
        self.SelectedFiscalYear('');

        self.RequestedDate('');
        self.SubmissionNo('');

    };

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.SearchValidation = function () {

        var errMsg = "";
        var objFocus = null;

        if (Validate.empty(self.SelectedFiscalYear())) {
            errMsg += "कृपया आर्थिक मिति छान्नुहोस् !!!<br>";
        }

        if (Validate.empty(self.SelectedOffice())) {

            errMsg += "कृपया कार्यालय छान्नुहोस् !!!<br>";
        }
        if (Validate.empty(self.SelectedCostCenter())) {

            errMsg += "कृपया लागत केन्द्र छान्नुहोस् !!!<br>";
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
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;

        if (Validate.empty(self.SelectedFiscalYear())) {
            errMsg += "कृपया आर्थिक मिति छान्नुहोस् !!!<br>";
        }

        if (Validate.empty(self.SelectedOffice())) {

            errMsg += "कृपया कार्यालय छान्नुहोस् !!!<br>";
        }
        if (Validate.empty(self.SelectedCostCenter())) {

            errMsg += "कृपया लागत केन्द्र छान्नुहोस् !!!<br>";
        }

        if (Validate.empty(self.RequestedDate())) {
            errMsg += "कृपया अनुरोध गरिएको मिति भर्नुहोस् !!!<br>";
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };

    

    self.GetBudgetRequestBySubNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');

        if (self.SubmissionNo() != "" && self.SubmissionNo() != undefined && self.SubmissionNo() != null) {

            if (editable == 'Y') {

            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');
                
            }
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetRequestHandler.ashx',
                data: { 'method': 'GetBudgetRequestBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                   
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new ChangeCostCenter(item)
                    });

                    self.BudgetRequestLsts(mappedTask);

                  self.RequestedDate(result.ResponseData[0].RequestedDate);


                   for (var i = 0; i < self.Offices().length; i++) {
                       if (result.ResponseData[0].Office.OfficeCode == ko.toJS(self.Offices())[i].OfficeCode) {
                           self.SelectedOffice(self.Offices()[i]);
                       }

                   }

                   self.GetCostCenter();
                   for (var i = 0; i < self.CostCenters().length; i++) {

                       if (result.ResponseData[0].CostCenter.CostCenterID == ko.toJS(self.CostCenters())[i].CostCenterID) {
                           self.SelectedCostCenter(self.CostCenters()[i]);
                       }

                   }
                   for (var i = 0; i < self.FiscalYears().length; i++) {
                       if (result.ResponseData[0].FiscalYear.FiscalYearName == ko.toJS(self.FiscalYears())[i].FiscalYearName) {
                           self.SelectedFiscalYear(self.FiscalYears()[i]);
                       }

                   }

                   for (var i = 0; i < self.IncomeTypes().length; i++) {
                       if (result.ResponseData[0].IncomeType.IncomeTypeName == ko.toJS(self.IncomeTypes())[i].IncomeTypeName) {
                           self.SelectedIncomeType(self.IncomeTypes()[i]);
                       }

                   }


                },
                error: function (err) {
                    $('button').hide();

                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    self.GetBudgetRequestBySubNo();

 self.ClearAll = function () {
        self.ClearControls();
        self.BudgetRequestLsts.removeAll();

    }


    self.Submit = function () {

        if (ko.toJS(self.BudgetRequestLsts()) != "" || ko.toJS(self.BudgetRequestLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();

            if (self.Validation()) {
                
                for (var i = 0; i < self.BudgetRequestLsts().length; i++) {
                    self.BudgetRequestLsts()[i].EntryBy(self.EntryBy());
                    self.BudgetRequestLsts()[i].Status("F");

                }

                var office = {
                    OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                    OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
                };

                var costcenter = {
                    CostCenterID: ko.toJS(self.SelectedCostCenter).CostCenterID,
                    CostCenterName: ko.toJS(self.SelectedCostCenter).CostCenterName
                };

                var fiscalyear = {
                    FiscalYearName: ko.toJS(self.SelectedFiscalYear).FiscalYearName
                }

                var incomeType = null;
                //= ko.toJS(self.SelectedIncomeType).IncomeTypeName
                if (self.SelectedIncomeType() === undefined) {
                    incomeType = null;
                }
                else {
                    incomeType = ko.toJS(self.SelectedIncomeType).IncomeTypeName;
                }



                var incomeTypes = {
                    IncomeTypeName: incomeType
                }

                var action = self.Action() == "E" ? "E" : "A";

                var budgetrelease = {
                    SubmissionNo: self.SubmissionNo(),
                    Office: office,
                    CostCenter: costcenter,
                    Amount: self.Amount(),
                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    Status: "F",
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    BudgetRequest: ko.toJS(self.BudgetRequestLsts()),
                    FiscalYear: fiscalyear,
                    Action: action,
                    RequestedDate: self.RequestedDate(),
                    IncomeType: incomeTypes
                }
               
                var url = "/Handlers/FAMS/BudgetRequestHandler.ashx";
                var method = "SaveBudgetRequest";
                var appID = "FAMS";
                var modID = "BUDREQST";

                var data = { 'method': method, 'args': JSON.stringify(budgetrelease), 'appID': appID, 'modID': modID, 'date': self.RequestedDate() };
                $.post(url, data,
                                    function (result) {
                                       
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                            self.ClearAll();
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }
                                  
                                    });

            }

        }

    }

self.Save = function () {

    if (ko.toJS(self.BudgetRequestLsts()) != "" || ko.toJS(self.BudgetRequestLsts()) != undefined) {
        waitMsg("Saving");
        waitMsg.show()
        if (self.Validation()) {
           
            for (var i = 0; i < self.BudgetRequestLsts().length; i++) {
                self.BudgetRequestLsts()[i].EntryBy(self.EntryBy());
                self.BudgetRequestLsts()[i].Status("I");

            }

            var office = {
                OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
            };

            var costcenter = {
                CostCenterID: ko.toJS(self.SelectedCostCenter).CostCenterID,
                CostCenterName: ko.toJS(self.SelectedCostCenter).CostCenterName
            };

            var fiscalyear = {
                FiscalYearName: ko.toJS(self.SelectedFiscalYear).FiscalYearName

            }

            var incomeType = null;
            //= ko.toJS(self.SelectedIncomeType).IncomeTypeName
            if (self.SelectedIncomeType() === undefined) {
                incomeType = null;
            }
            else {
                incomeType = ko.toJS(self.SelectedIncomeType).IncomeTypeName;
            }

            var incomeTypes = {
                IncomeTypeName: incomeType
            }

            var action = self.Action() == "E" ? "E" : "A";

            var budgetrelease = {
                SubmissionNo: self.SubmissionNo(),
                Office: office,
                CostCenter: costcenter,
                Amount: self.Amount(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                Status: "I",
                EntryBy: self.EntryBy(),
                EntryDate: self.EntryDate(),
                BudgetRequest: ko.toJS(self.BudgetRequestLsts()),
                FiscalYear: fiscalyear,
                Action: action,
                RequestedDate: self.RequestedDate(),
                IncomeType: incomeTypes
            }
           

            var url = "/Handlers/FAMS/BudgetRequestHandler.ashx";
            var method = "SaveBudgetRequest";
            var appID = "FAMS";
            var modID = "BUDREQST";

            var data = { 'method': method, 'args': JSON.stringify(budgetrelease), 'appID': appID, 'modID': modID, 'date': self.RequestedDate() };
            $.post(url, data,
            function (result) {

            var obj = jQuery.parseJSON(result);
            if (obj.IsSucess) {
             msg(obj.Message);
            self.ClearAll();
            }
            else {
            msg(obj.Message, "WARNING");
            }


            });

  }

    }

};

};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BudgetRequestViewModel());
});