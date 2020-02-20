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
  
    self.FiscalYearName = ko.observable(data.FiscalYearName);
}
function IncomeType(data) {
    var self = this;
    self.IncomeTypeName = ko.observable(data.IncomeTypeName);
}

function BudgetApprove(data) {
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
    
    self.EntryBy = ko.observable(data.EntryBy);
    self.Status = ko.observable(data.Status);
     self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.RequestedDate = ko.observable(data.RequestedDate);
    self.FiscalYearName = ko.observable(data.FiscalYearName);
   
    self.ReqAmount  = ko.observable(data.ReqAmount);
    self.ApproveAmount  = ko.observable(data.ApproveAmount);
    self.RequestDate  = ko.observable(data.RequestDate);
    self.ApproveDate = ko.observable(data.ApproveDate);

    self.IncomeTypeName = ko.observable(data.IncomeTypeName);

    self.SeqNo = ko.observable(data.SeqNo);




    

}



function BudgetApproveViewModel() {
    var self = this;
    
    self.BudgetIDesc = ko.observable();
    self.JobIDesc = ko.observable();
    self.Amt= ko.observable();
    self.BudgetItemID = ko.observable();
    self.BudgetItemName = ko.observable();
    self.JobID = ko.observable();
    self.JobDesc = ko.observable();

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();

    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.SubmissionNo = ko.observable();
    self.RequestDate = ko.observable();
    self.Amt = ko.observable();
  
    self.SelectedOffice = ko.observable([]);
    self.SelectedBudgetItem = ko.observable([]);
    self.SelectedJob = ko.observable([]);
    self.SelectedCostCenter = ko.observable([]);
    self.BudgetRequestLsts = ko.observableArray([]);

     self.BudgetApproveLsts = ko.observableArray([]);

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

    self.Amount = ko.observable();

    self.BudgetItem = ko.observable();

    self.FiscalYearName = ko.observable();

    self.FiscalYears = ko.observableArray([]);
    self.SelectedFiscalYear = ko.observable([]);

    self.ReqAmount  = ko.observable();
    self.ApproveAmount  = ko.observable();
    self.RequestDate  = ko.observable();
    self.ApproveDate = ko.observable();


    self.IncomeTypeName = ko.observable();

    //self.IncomeTypes = ko.observableArray([{ 'IncomeTypeName': 'Cash Base' }, { 'IncomeTypeName': 'Bill Base'}]);
    self.IncomeTypes = ko.observableArray([{ 'IncomeTypeName': 'Income'}]);
    self.SelectedIncomeType = ko.observable([]);

    self.SeqNo = ko.observable();

    $("#DivIncomeLabel").hide();
    $("#DivIncomeLst").hide();

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

self.checkAmount = function (data) {
      
        var datas = ko.toJS(data);
        if (datas.ReqAmount < datas.ApproveAmount) {
            msg("कृपया स्वीकृत रकम अनुरोध रकम भन्दा काम हुनुपर्छ ");
        }


    }


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

            var height=(screen.height);
            var left= (screen.width/2) - (900 / 2);
            var url="";
            url = "../../../Reporting/FAMS/ReportHandlers/BudgetApprovalHandler.ashx";

            var winOption="width=900, resizable=yes, scrollbars= yes, left="+230+", height="+height+"";
            OpenWindowWithPost(url,winOption,"NewFile", data)
           

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


    /* Used For GetBudgetApprove */


    self.GetBudgetApprove = function () {

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
                url: '/Handlers/FAMS/BudgetApproveHandler.ashx',

                data: { 'method': 'GetDetails', 'OfficeCD': office, 'CostCenterID': costcenter, 'fiscalyear': fiscalyear, 'incomeType': incomeType },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.ResponseData.length > 0) {


                        var mappedTask = $.map(result.ResponseData, function (item) {
                            return new BudgetApprove(item)
                        });

                        self.BudgetApproveLsts(mappedTask);

                        for (var i = 0; i < self.BudgetApproveLsts().length; i++) {

                            if (ko.toJS(self.BudgetApproveLsts())[i].Status == "F" || ko.toJS(self.BudgetApproveLsts())[i].Status == "T") {
                                $('.Amounttxt').prop("disabled", true)
                            }
                            else if (ko.toJS(self.BudgetApproveLsts())[i].Status == "I") {
                                    $('.Amounttxt').prop("disabled", false)
                                
                            }
                        }

                        self.ApproveDate(result.ResponseData[0].ApproveDate);
                        self.SubmissionNo(result.ResponseData[0].SubmissionNo);  //  self.SeqNo = ko.observable(data.SeqNo);
                        self.SeqNo(result.ResponseData[0].SeqNo);
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
  
    self.ClearAll = function () {
        self.ClearControls();
        self.BudgetApproveLsts.removeAll();

    }

    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.SelectedOffice('');
        self.SelectedBudgetItem('');
        self.SelectedJob('');
        self.CostCenters([]);

        self.SelectedFiscalYear('');
        self.SelectedIncomeType('');

        self.ApproveDate('');
        self.SubmissionNo('');
        $('.btnSave').prop("disabled", false);
        $('.btnSubmit').prop("disabled", false);

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

        if (Validate.empty(self.ApproveDate())) {
            errMsg += "कृपया स्वीकृत गरिएको मिति भर्नुहोस् !!!<br>";
        }

//        if (self.BudgetApproveLsts().length > 0) {
//            for (var i = 0; i < self.BudgetApproveLsts().length; i++) {
//                if (ko.toJS(self.BudgetApproveLsts())[i].ReqAmount < ko.toJS(self.BudgetApproveLsts())[i].ApproveAmount) {
//                    errMsg += "कृपया स्वीकृत रकम अनुरोध रकम भन्दा कम हुनुपर्छ ";
//                }
//            }
//        }

//        else {
//            errMsg += "टेबलमा डेटा छैन​";
//        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };

    self.GetBudgetApproveBySubNo = function () {
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
                async: false,
                url: '../../Handlers/FAMS/BudgetApproveHandler.ashx',
                data: { 'method': 'GetBudgetApproveBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                  
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new BudgetApprove(item)
                    });

                    self.BudgetApproveLsts(mappedTask);

                    self.ApproveDate(result.ResponseData[0].ApproveDate);
                   

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

    self.GetBudgetApproveBySubNo();
   

    self.SubmitBudgetApprove = function () {

        if (ko.toJS(self.BudgetApproveLsts()) != "" || ko.toJS(self.BudgetApproveLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();

            if (self.Validation()) {
               
                for (var i = 0; i < self.BudgetApproveLsts().length; i++) {
                    self.BudgetApproveLsts()[i].EntryBy(self.EntryBy());
                    self.BudgetApproveLsts()[i].Status("F");

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
                var budgetApprove = {
                    SubmissionNo: self.SubmissionNo(),
                    Office: office,
                    CostCenter: costcenter,
                    ApproveAmount: self.ApproveAmount(),
                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    Status: "F",
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    BudgetApprove: ko.toJS(self.BudgetApproveLsts()),
                    FiscalYear: fiscalyear,
                    Action: action,
                    ApproveDate: self.ApproveDate(),
                    IncomeType: incomeTypes,
                    SeqNo :self.SeqNo()
                }
               
                var url = "/Handlers/FAMS/BudgetApproveHandler.ashx";
                var method = "SaveBudgetApprove";
                var appID = "FAMS";
                var modID = "APPRBUDGET";
                var data = { 'method': method, 'args': JSON.stringify(budgetApprove), 'appID': appID, 'modID': modID, 'date': self.ApproveDate() };
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

    self.SaveBudgetApprove = function () {

        if (ko.toJS(self.BudgetApproveLsts()) != "" || ko.toJS(self.BudgetApproveLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();

          if (self.Validation()) {

            for (var i = 0; i < self.BudgetApproveLsts().length; i++) {
                self.BudgetApproveLsts()[i].EntryBy(self.EntryBy());
                self.BudgetApproveLsts()[i].Status("I");

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
            var budgetApprove = {
                SubmissionNo: self.SubmissionNo(),
                Office: office,
                CostCenter: costcenter,
                ApproveAmount: self.ApproveAmount(),
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                Status: "I",
                EntryBy: self.EntryBy(),
                EntryDate: self.EntryDate(),
                BudgetApprove: ko.toJS(self.BudgetApproveLsts()),
                FiscalYear: fiscalyear,
                Action: action,
                ApproveDate: self.ApproveDate(),
                IncomeType: incomeTypes,
                SeqNo: self.SeqNo()

            }
           
            var url = "/Handlers/FAMS/BudgetApproveHandler.ashx";
            var method = "SaveBudgetApprove";
            var appID = "FAMS";
            var modID = "APPRBUDGET";

            var data = { 'method': method, 'args': JSON.stringify(budgetApprove), 'appID': appID, 'modID': modID, 'date': self.ApproveDate() };
            $.post(url, data,
                function (result) {
                    
                    var obj = jQuery.parseJSON(result);
                    if (obj.IsSucess) {
                        msg(obj.Message);
                    }
                    else {
                        msg(obj.Message, "WARNING");
                    }
                    //self.ClearControls();
                    self.ClearAll();

                });


        }

      }

    }

};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BudgetApproveViewModel());
});


/*
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

function BudgetApproveLst(data) {
    var self = this;

    self.OfficeCode = ko.observable(data.Office.OfficeCode);
    self.OfficeNameNep = ko.observable(data.Office.OfficeNameNep);
    self.CostCenterID = ko.observable(data.CostCenter.CostCenterID);
    self.CostCenterName = ko.observable(data.CostCenter.CostCenterName);
    self.JobID = ko.observable(data.Job.JobID);
    self.BudgetItemID = ko.observable(data.BudgetItem.BudgetItemID);
    self.BudgetItemEng = ko.observable(data.BudgetItem.BudgetItemEng);
    self.Amount = ko.observable(data.Amount);
    self.ReqDate = ko.observable(data.ReqDate);
    self.ReqAmount = ko.observable(data.Amount);
    self.ApproveAmount = ko.observable(data.ApproveAmount);
    

};


function BudgetAppLst(data) {
    var self = this;
    self.BudgetItem = ko.observable(data.BudgetItem);
    self.RequestDate = ko.observable(data.RequestDate);
    self.ReqAmount = ko.observable(data.ReqAmount);
    self.ApproveDate = ko.observable(data.ApproveDate);
    self.ApproveAmount = ko.observable(data.ApproveAmount);
    self.OldSubmissionNo = ko.observable(data.OldSubmissionNo);
    self.Office = ko.observable(data.Office);
    self.CostCenter = ko.observable(data.CostCenter);
    self.Job = ko.observable(data.Job);
    self.Status = ko.observable(data.Status);
    self.Remarks = ko.observable(data.Remarks);
    self.EntryBy = ko.observable(data.EntryBy);


};
function BudgetRequestViewModel() {
    var self = this;

    
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.SubmissionNo = ko.observable();
    self.ApproveDate = ko.observable();
    self.ApproveAmount = ko.observable();
    self.Remarks = ko.observable();
    self.DAmount = ko.observable();
    self.SelectedOffice = ko.observable([]);
    
    self.SelectedCostCenter = ko.observable([]);
    self.Days = ko.observable();
    self.BudgetAppLsts = ko.observableArray([]);
    self.Offices = ko.observable([]);
    self.BudItemName = ko.observable();
    self.CostCenters = ko.observable([]);
    self.BudgetApproveLsts = ko.observableArray([]);
    self.DefaultAmt = ko.observable();
    self.Action = ko.observable("A");
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable("F");
    self.IsSelected = ko.observable([]);
    self.ReqAmount = ko.observable();
    self.selectedItem = ko.observable([]);
    self.RequestDate = ko.observable();
    self.BudItem= ko.observable();
    self.JID = ko.observable();
    self.ReqDate = ko.observable();
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
    self.Edit = function (data) {

        var datas = ko.toJS(data);
        for (var i = 0; i < self.Offices().length; i++) {

            if (self.Offices()[i].OfficeCode() == datas.Office.OfficeCode) {

                self.SelectedOffice(self.Offices()[i]);
            }
        }
        if (ko.toJS(self.SelectedOffice) != undefined) {
            self.ReqDate(datas.RequestDate);
            self.DAmount(datas.ReqAmount);
            var OfficeCD = ko.toJS(self.SelectedOffice).OfficeCode;
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetRequestHandler.ashx',
                data: { 'method': 'GetCostCenter', 'OfficeCD': OfficeCD },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new CostCenter(item)
                    });

                    self.CostCenters(mappedTask);
                    for (var i = 0; i < self.CostCenters().length; i++) {

                        if (self.CostCenters()[i].CostCenterID() == datas.CostCenter.CostCenterID) {

                            self.SelectedCostCenter(self.CostCenters()[i]);
                            $.ajax({
                                dataType: "json",
                                cache: false,
                                url: '../../Handlers/FAMS/BudgetApproveHandler.ashx',
                                data: { 'method': 'GetDetails', 'OfficeCD': ko.toJS(self.SelectedOffice).OfficeCode, 'CostCenterID': ko.toJS(self.SelectedCostCenter).CostCenterID },
                                contentType: "application/json; charset=utf-8",
                                success: function (result) {
                                    var mappedTask = $.map(result.ResponseData, function (item) {

                                        return new BudgetApproveLst(item)
                                    });

                                    self.BudgetApproveLsts(mappedTask);

                                },
                                error: function (err) {
                                    msg(err.status + " - " + err.statusText, "FAILURE");

                                }

                            });
                        }
                    }

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }



        self.ApproveAmount(datas.ApproveAmount);
        self.ApproveDate(datas.ApproveDate);
        self.Remarks(datas.Remarks);
        self.selectedItem(data);
        $("#AddBtn").text('Update');

    }
    self.Delete = function (data) {
        Confirm('Are you confirm to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.BudgetAppLsts.remove(data);
            }
        });

       
    }
    self.Add = function () {
        if (self.Validation()) {

            var sel = self.selectedItem();


            if (sel != undefined && sel != "") {

                // var action = sel.Action() == "A" ? "A" : "E";
                //
                
                var Off = {
                    OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                    OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
                };
                var Jb = {
                    JobID: self.JID()

                };
                var CC = {
                    CostCenterID: ko.toJS(self.SelectedCostCenter).CostCenterID,
                    CostCenterName: ko.toJS(self.SelectedCostCenter).CostCenterName
                };




                sel.Office(Off);
                sel.Job(Jb);
                sel.CostCenter(CC);
               
                if (editable == "Y") {
                    var BudgetI = {
                        BudgetItemID: self.BudItem()
                    };

                }
                else {
                    //sel.RequestDate(self.RequestDate());
                    //sel.ReqAmount(self.ReqAmount());
                    var BudgetI = {
                        BudgetItemID: self.BudItem(),
                        BudgetItemEng: self.BudItemName()
                    };
                }
                sel.BudgetItem(BudgetI);
                sel.ApproveDate(self.ApproveDate());
                sel.ApproveAmount(self.ApproveAmount());
                sel.EntryBy(self.EntryBy());
                sel.Status(self.Status());
                sel.Remarks($('#txtremarks').val());
                sel.OldSubmissionNo(self.SubmissionNo());
                self.selectedItem(null);
                $("#AddBtn").text('Add');
                self.ApproveDate('');

                self.ApproveAmount('');
                self.Remarks('');
                $('#txtremarks').val("");

            }
            else {
                var Off = {
                    OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                    OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
                };
                var Jb = {
                    JobID: self.JID()
                };
                var CC = {
                    CostCenterID: ko.toJS(self.SelectedCostCenter).CostCenterID,
                    CostCenterName: ko.toJS(self.SelectedCostCenter).CostCenterName
                };
                var BudgetI = {
                    BudgetItemID: self.BudItem(),
                    BudgetItemEng: self.BudItemName()
                };

                for (var i = 0; i < self.BudgetAppLsts().length; i++) {
                    if (
                    self.BudgetAppLsts()[i].RequestDate() == self.RequestDate() &&
                    self.BudgetAppLsts()[i].ReqAmount() == self.ReqAmount()

                    ) {
                        msg('Duplicate Data', "WARNING");
                        return;
                    }
                }

                var newAdd = {

                    Office: Off,
                    CostCenter: CC,
                    Job: Jb,
                    RequestDate: self.RequestDate(),
                    ReqAmount: self.ReqAmount(),
                    ApproveDate: self.ApproveDate(),
                    ApproveAmount: self.ApproveAmount(),
                    BudgetItem: BudgetI,
                    EntryBy: self.EntryBy(),
                    Status: self.Status(),
                    Remarks: $('#txtremarks').val(),
                    OldSubmissionNo: self.SubmissionNo()

                };

                self.BudgetAppLsts.push(new BudgetAppLst(newAdd));

                self.ApproveDate('');

                self.ApproveAmount('');
                self.Remarks('');
                $('#txtremarks').val("");
            }
        }

    }
    self.LoadTrn = function (dataModules) {
        var sel = self.selectedItem();

        
        if (sel != undefined && sel != "") {
        }
        {
            self.ReqAmount(dataModules.Amount())
            self.IsSelected(dataModules.OfficeCode());
            self.DefaultAmt(dataModules.Amount());
            self.RequestDate(dataModules.ReqDate());
            self.BudItem(dataModules.BudgetItemID());
            self.BudItemName(dataModules.BudgetItemEng());
            self.JID(dataModules.JobID());
        }
    }


    self.GetCostCenter = function () {
       
        if (ko.toJS(self.SelectedOffice) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice).OfficeCode;
            $.ajax({
                dataType: "json",
                cache: false,
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

    self.GetDetails = function () {
        if (ko.toJS(self.SelectedOffice) != undefined && ko.toJS(self.SelectedCostCenter) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice).OfficeCode;

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetApproveHandler.ashx',
                data: { 'method': 'GetDetails', 'OfficeCD': OfficeCD, 'CostCenterID': ko.toJS(self.SelectedCostCenter).CostCenterID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                       // console.log(item);
                        return new BudgetApproveLst(item)
                    });

                    self.BudgetApproveLsts(mappedTask);

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }

            });
        }
    }


  
    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.SelectedOffice(null);

        self.SelectedCostCenter(null);
        self.BudgetApproveLsts.removeAll();
        self.ApproveDate('');
        
        self.ApproveAmount('');
        self.Remarks('');
        $('#txtremarks').val("");

    };
    self.ValidateAmount = function () {
        var errMsg = "";
        var objFocus = null;
        var sel = self.selectedItem();

       
        if (sel != undefined && sel != "") {

            if (self.ApproveAmount() > self.DAmount()) {
                errMsg += "अनुमोदन रकम अनुरोध रकम भन्दा अधिक !!!<br>";
                self.ApproveAmount("");
            }
        }
        else {
            if (self.ApproveAmount() > self.DefaultAmt()) {
                errMsg += "अनुमोदन रकम अनुरोध रकम भन्दा अधिक !!!<br>";
                self.ApproveAmount("");
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

    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;



        if (self.SelectedOffice() == "" || self.SelectedOffice() === undefined) {

            errMsg += "कृपया कार्यालय छान्नुहोस् !!!<br>";
        }
        if (self.SelectedCostCenter() == "" || self.SelectedCostCenter() === undefined) {

            errMsg += "कृपया लागत केन्द्र  छान्नुहोस् !!!<br>";
        }
        if ((self.IsSelected() == "" ||self.IsSelected() === undefined) && editable == "") {

            errMsg += "कृपया बजेट अनुमोदन सूची छान्नुहोस् !!!<br>";
        }
        if (self.ApproveAmount() == "" || self.ApproveAmount() === undefined) {

            errMsg += "कृपया अनुमोदन रकम भर्नुहोस् !!!<br>";
        }

        if (self.ApproveDate() == "" || self.ApproveDate() === undefined) {
            errMsg += "कृपया  अनुमोदन मिति भर्नुहोस् !!!<br>";
            //objFocus = self.UserId;
        }
//        if (self.ApproveAmount() > self.DefaultAmt()) {
//            errMsg += "अनुमोदन रकम अनुरोध रकम भन्दा अधिक !!!<br>";
//            //objFocus = self.UserId;
//        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };
   
    self.GetDateDifference = function (date1, date2) {
        if (date1 != undefined && date2 != undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
                data: { 'method': 'GetDaysDifference', 'date1': date2, 'date2': date1 },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var days = result.ResponseData;
                    self.Days(days);

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    }

    self.ValidateDate = function () {

        if ((self.IsSelected() == "" || self.IsSelected() == undefined) && editable == "") {

            msg("कृपया बजेट अनुमोदन  सूची छान्नुहोस् !!!<br>", "FAILURE");
            self.ApproveDate('');
        }
        var sel = self.selectedItem();
        if (sel != undefined && sel != "") {

            if (!Validate.empty(self.ApproveDate()) && !Validate.empty(self.ReqDate())) {
                self.GetDateDifference(self.ReqDate(), self.ApproveDate());

                if (self.Days() < 0) {
                    msg("अनुमोदन मिति अनुरोध मिति भन्दा ठूलो वा एउटै हुनुपर्छ !!! ");
                    self.ApproveDate('');
                    self.Days('');
                }
            }
        }
        else {
            if (!Validate.empty(self.ApproveDate()) && !Validate.empty(self.RequestDate())) {
                self.GetDateDifference(self.RequestDate(), self.ApproveDate());

                if (self.Days() < 0) {
                    msg("अनुमोदन मिति अनुरोध मिति भन्दा ठूलो वा एउटै हुनुपर्छ !!! ");
                    self.ApproveDate('');
                    self.Days('');
                }
            }
        }
    }
    var editable="";
    self.GetEntity = function () {

        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() != "" && self.SubmissionNo() != undefined && self.SubmissionNo() != null) {
            if (editable == 'Y') {
               
                $('#tblModule').css("display", "none");
                $('#lstOffice').attr("disabled", "disabled");
                $('#lstCostCenter').attr("disabled", "disabled");
            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');
                $('#edit').css("display", "none");
                $('#delete').css("display", "none");
                $('#toggle').css("display", "none");
            }


            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetApproveHandler.ashx',
                data: { 'method': 'GetBudgetApproveBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    if (result.IsSucess) {
                        var mappedTask = $.map(result.ResponseData, function (item) {

                            return new BudgetAppLst(item)
                        });

                        self.BudgetAppLsts(mappedTask);
                        for (var i = 0; i < self.BudgetAppLsts().length; i++) {

                            self.BudgetAppLsts()[i].OldSubmissionNo(self.SubmissionNo());
                            self.BudgetAppLsts()[i].Status("F");
                            self.BudgetAppLsts()[i].EntryBy(self.EntryBy());

                        }
                    }
                    else {

                        if (!result.IsToken)
                            msg(result.Message, "WARNING", null, ClearSession);
                        else
                            msg(result.Message, "WARNING");
                    }

                    var OfficeCD = result.ResponseData[0].Office.OfficeCode;
                    var CostC = result.ResponseData[0].CostCenter.CostCenterID;

                    $.ajax({
                        dataType: "json",
                        cache: false,
                        url: '../../Handlers/FAMS/BudgetApproveHandler.ashx',
                        data: { 'method': 'GetDetails', 'OfficeCD': OfficeCD, 'CostCenterID': CostC },
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            var mappedTask = $.map(result.ResponseData, function (item) {

                                return new BudgetApproveLst(item)
                            });

                            self.BudgetApproveLsts(mappedTask);

                        },
                        error: function (err) {
                            msg(err.status + " - " + err.statusText, "FAILURE");

                        }

                    });


                    $("#loader").hide();
                },
                error: function (err) {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
                    $('#edit').css("display", "none");
                    $('#delete').css("display", "none");
                    $('#toggle').css("display", "none");
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GetEntity();
    self.ClearAll = function () {
        self.ClearControls();


        self.BudgetAppLsts.removeAll();
    }
    self.Save = function () {


        if (ko.toJS(self.BudgetAppLsts()) != "" || ko.toJS(self.BudgetAppLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();

            var url = '../../Handlers/FAMS/BudgetApproveHandler.ashx';
            var method = "SaveBudgetApprove";
            var appID = "FAMS";
            var modID = "APPRBUDGET";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.BudgetAppLsts())), 'appID': appID, 'modID': modID };
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
                                        self.BudgetAppLsts.removeAll();

                                    });
        }

    };


};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BudgetRequestViewModel());
});
*/