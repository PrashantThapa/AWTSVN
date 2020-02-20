

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
}

function FiscalYear(data) {
    var self = this;

    self.FiscalYearName = ko.observable(data.FiscalYearName);
}

function BudgetRelease(data) {
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

    self.BudgetItem = ko.observable(data.BudgetItem);
    self.BudgetItemID = ko.observable(data.BudgetItemID);
    self.BudgetItemName = ko.observable(data.BudgetItemName);

    self.EntryBy = ko.observable(data.EntryBy);
    self.Status = ko.observable(data.Status);
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.RequestedDate = ko.observable(data.RequestedDate);
    self.FiscalYearName = ko.observable(data.FiscalYearName);

    self.ReqAmount = ko.observable(data.ReqAmount);
    self.ApproveAmount = ko.observable(data.ApproveAmount);
    self.RequestDate = ko.observable(data.RequestDate);

    self.ApproveDate = ko.observable(data.ApproveDate); 
    self.ReleaseDate = ko.observable(data.ReleaseDate); 
    self.ReleaseAmount = ko.observable(data.ReleaseAmount); 
    self.RemainingAmount = ko.observable(data.RemainingAmount); 

}

function BudgetReleaseViewModel() {
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
    self.RequestDate = ko.observable();
    self.Amt = ko.observable();

    self.SelectedOffice = ko.observable([]);
    self.SelectedBudgetItem = ko.observable([]);
    self.SelectedJob = ko.observable([]);
    self.SelectedCostCenter = ko.observable([]);
    self.BudgetRequestLsts = ko.observableArray([]);

    self.BudgetBudgetReleaseLsts = ko.observableArray([]);

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

    self.ReqAmount = ko.observable();
    self.ApproveAmount = ko.observable();
    self.RequestDate = ko.observable();
    self.ApproveDate = ko.observable();


    self.ReleaseDate = ko.observable(); 
    self.ReleaseAmount = ko.observable(); 
    self.RemainingAmount = ko.observable(); 

    self.checkAmount = ko.observable();

    self.ClearAll = ko.observable();

    self.checkAmount = function (data) {
        var datas = ko.toJS(data);
        if (datas.ApproveAmount < datas.ReleaseAmount) {
            msg("कृपया निकासा रकम स्वीकृत रकम भन्दा काम हुनुपर्छ");
        }
    }

    self.Print = function () {
        if (self.SearchValidation()) {
            var data = {
                fiscalyear: ko.toJS(self.SelectedFiscalYear()).FiscalYearName,
                OfficeCode: ko.toJS(self.SelectedOffice()).OfficeCode,
                CostCenterID: ko.toJS(self.SelectedCostCenter()).CostCenterID
            }

            var height = (screen.height);
            var left = (screen.width / 2) - (900 / 2);
            var url = "";
            url = "../../../Reporting/FAMS/ReportHandlers/BudgetReleaseHandler.ashx";

            var winOption = "width=900, resizable=yes, scrollbars= yes, left=" + 230 + ", height=" + height + "";
            OpenWindowWithPost(url, winOption, "NewFile", data)


        }
    }

    self.GetFiscalYear = function () {
        if (self.SelectedFiscalYear() != undefined) {
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

    }
    self.GetFiscalYear();


    /* Used For GetBudgetRelease */
    self.GetBudgetRelease = function () {

        if (self.SearchValidation()) {

            var office = ko.toJS(self.SelectedOffice).OfficeCode

            var costcenter = ko.toJS(self.SelectedCostCenter).CostCenterID
            var fiscalyear = ko.toJS(self.SelectedFiscalYear).FiscalYearName

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '/Handlers/FAMS/BudgetReleaseHandler.ashx',

                data: { 'method': 'GetDetails', 'OfficeCD': office, 'CostCenterID': costcenter, 'fiscalyear': fiscalyear },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.ResponseData.length > 0) {

                        var mappedTask = $.map(result.ResponseData, function (item) {
                            return new BudgetRelease(item)
                        });

                        self.BudgetBudgetReleaseLsts(mappedTask);

                        for (var i = 0; i < self.BudgetBudgetReleaseLsts().length; i++) {

                            if (ko.toJS(self.BudgetBudgetReleaseLsts())[i].Status == "F" || ko.toJS(self.BudgetBudgetReleaseLsts())[i].Status == "T") {
                                $('.Amounttxt').prop("disabled", true)
                            }
                            else if (ko.toJS(self.BudgetBudgetReleaseLsts())[i].Status == "I") {
                                $('.Amounttxt').prop("disabled", false)
                            }
                        }

                        self.ReleaseDate(result.ResponseData[0].ReleaseDate);
                        self.SubmissionNo(result.ResponseData[0].SubmissionNo);

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

        if (ko.toJS(self.SelectedOffice) != undefined && ko.toJS(self.SelectedCostCenter != undefined)) {
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
        self.SelectedBudgetItem('');
        self.SelectedJob('');
        self.CostCenters([]);

        self.SelectedFiscalYear('');

        self.ReleaseDate('');
        self.SubmissionNo('');

    };


    //Clear All
    self.ClearAll = function () {
        self.ClearControls();
        self.BudgetBudgetReleaseLsts.removeAll();

    }
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
        if (Validate.empty(self.ReleaseDate())) {
            errMsg += "कृपया निकासा गरिएको मिति भर्नुहोस् !!!<br>";
        }

//        if ((ko.toJS(self.BudgetBudgetReleaseLsts()).length) > 0) {
//            for (var i = 0; i < BudgetBudgetReleaseLsts().length; i++) {
//                if (ko.toJS(self.BudgetBudgetReleaseLsts())[i].ReleaseAmount > ko.toJS(self.BudgetBudgetReleaseLsts())[i].ApproveAmount) {
//                    errMsg += "कृपया निकासा रकम स्वीकृत रकम भन्दा कम हुनुपर्छ ";
//                }
//            }
//        }
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    };

    //--------------------------------------------------------------
    //To Search Validate Controls
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

    self.GetBudgetReleaseBySubNo = function () {
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
                url: '../../Handlers/FAMS/BudgetReleaseHandler.ashx',
                data: { 'method': 'GetBudgetReleaseBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new BudgetRelease(item)
                    });

                    self.BudgetBudgetReleaseLsts(mappedTask);

                    self.ReleaseDate(result.ResponseData[0].ReleaseDate);
                    

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

                },
                error: function (err) {
                    $('button').hide();

                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

 self.GetBudgetReleaseBySubNo();

self.SaveBudgetRelease = function () {

        if (ko.toJS(self.BudgetBudgetReleaseLsts()) != "" || ko.toJS(self.BudgetBudgetReleaseLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();
            if (self.Validation()) {
               
                for (var i = 0; i < self.BudgetBudgetReleaseLsts().length; i++) {
                    self.BudgetBudgetReleaseLsts()[i].EntryBy(self.EntryBy());
                    self.BudgetBudgetReleaseLsts()[i].Status("I");

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
                var action = self.Action() == "E" ? "E" : "A";
                var budgetRelease = {
                    SubmissionNo: self.SubmissionNo(),
                    Office: office,
                    CostCenter: costcenter,
                    ApproveAmount: self.ApproveAmount(),
                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    Status: "I",
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    BudgetRelease: ko.toJS(self.BudgetBudgetReleaseLsts()),
                    FiscalYear: fiscalyear,
                    Action: action,
                    ReleaseAmount: self.ReleaseAmount(),
                    ReleaseDate: self.ReleaseDate()
                }

                var url = "/Handlers/FAMS/BudgetReleaseHandler.ashx";
                var method = "SaveBudgetRelease";
                var appID = "FAMS";
                var modID = "BUDGETREL";
                alert('self.Release' + self.ReleaseDate());
                var data = { 'method': method, 'args': JSON.stringify(budgetRelease), 'appID': appID, 'modID': modID, 'releaseDate': self.ReleaseDate() };
                $.post(url, data,
                function (result) {
                    
                    var obj = jQuery.parseJSON(result);
                    if (obj.IsSucess) {
                        msg(obj.Message);
                     }
                    else {
                        msg(obj.Message, "WARNING");
                    }
                    self.ClearAll();

                });


            }

        }

    }

    self.SubmitBudgetRelease = function () {

        if (ko.toJS(self.BudgetBudgetReleaseLsts()) != "" || ko.toJS(self.BudgetBudgetReleaseLsts()) != undefined) {
            waitMsg("Saving");
            waitMsg.show();

            if (self.Validation()) {

                for (var i = 0; i < self.BudgetBudgetReleaseLsts().length; i++) {
                    self.BudgetBudgetReleaseLsts()[i].EntryBy(self.EntryBy());
                    self.BudgetBudgetReleaseLsts()[i].Status("F");
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

                var action = self.Action() == "E" ? "E" : "A";

                var budgetRelease = {
                    SubmissionNo: self.SubmissionNo(),
                    Office: office,
                    CostCenter: costcenter,
                    ApproveAmount: self.ApproveAmount(),
                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    Status: "F",
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    BudgetRelease: ko.toJS(self.BudgetBudgetReleaseLsts()),
                    FiscalYear: fiscalyear,
                    Action: action,
                    ReleaseAmount: self.ReleaseAmount(),
                    ReleaseDate: self.ReleaseDate()
                }

                var url = "/Handlers/FAMS/BudgetReleaseHandler.ashx";
                var method = "SaveBudgetRelease";
                var appID = "FAMS";
                var modID = "BUDGETREL";
                var data = { 'method': method, 'args': JSON.stringify(budgetRelease), 'appID': appID, 'modID': modID, 'releaseDate': self.ReleaseDate() };
                $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);

                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }
                                        self.ClearAll();


                                    });
            }

        }

    }

};


$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BudgetReleaseViewModel());
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

function BudgetReleaseLst(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.Office.OfficeCode);
    self.CostCenterID = ko.observable(data.CostCenter.CostCenterID);
    self.JobID = ko.observable(data.Job.JobID);
    self.BudgetItemID = ko.observable(data.BudgetItem.BudgetItemID);
    self.BudgetItemDesc = ko.observable(data.BudgetItem.BudgetItemName);
    self.Amount = ko.observable(data.Amount);
    self.RequestDate = ko.observable(data.RequestDate);
    self.ReleaseAmount = ko.observable(data.ReleaseAmount); 
   
};
function BudgetRequestViewModel() {
    var self = this;


    self.Days = ko.observable();
    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();
    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.ReqDate = ko.observable();
    self.ReleaseDate = ko.observable();
    self.Amount = ko.observable();
    self.RelAmount = ko.observable();
    self.Remarks = ko.observable();
    self.RAmount = ko.observable();
    self.SelectedOffice = ko.observable([]);
    
    self.SelectedCostCenter = ko.observable([]);
    self.BudItemID = ko.observable();
    self.JID = ko.observable();
    self.Offices = ko.observable([]);
   
    self.CostCenters = ko.observable([]);
    self.BudgetReleaseLsts = ko.observableArray([]);
    self.ReleAmount = ko.observable();
    self.Action = ko.observable("A");
    self.EntryBy = ko.observable($("#user").text());
    self.EntryDate = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.Status = ko.observable("F");
    self.IsSelected = ko.observable();
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
    self.LoadTrn = function (dataModules) {
        self.IsSelected(dataModules.BudgetItemID());
        self.RAmount(dataModules.Amount());
        self.BudItemID(dataModules.BudgetItemID());
        self.JID(dataModules.JobID());
        self.ReqDate(dataModules.RequestDate());
         self.ReleAmount(dataModules.ReleaseAmount());
       

    }
    self.ValidateAmount = function () {
        var errMsg = "";
        var objFocus = null;
       // var relamount = parseFloat(self.ReleAmount()) + parseFloat(self.RelAmount());
        var relamount = parseFloat(self.RAmount());

        if (self.RelAmount() >parseFloat(relamount) ) {
            errMsg += "जारी रकम अनुमोदन रकम भन्दा अधिक !!!<br>";
            self.RelAmount("");
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }
    }

    self.GetCostCenter = function () {

        var OfficeCD = self.SelectedOffice();
        if (OfficeCD != undefined && OfficeCD != "") {
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
        if (ko.toJS(self.SelectedCostCenter) != undefined) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetReleaseHandler.ashx',
                data: { 'method': 'GetDetails', 'OfficeCD': self.SelectedOffice(), 'CostCenterID': ko.toJS(self.SelectedCostCenter).CostCenterID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new BudgetReleaseLst(item)
                    });

                    self.BudgetReleaseLsts(mappedTask);
                    self.IsSelected('');
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
        self.BudgetReleaseLsts.removeAll();
        self.ReleaseDate('');
        self.RelAmount('');
        self.Remarks('');
        self.IsSelected(null);

    };


    //--------------------------------------------------------------
    //To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;



        if (self.SelectedOffice() == "" || self.SelectedOffice() === undefined) {

            errMsg += "कृपया कार्यालय छान्नुहोस् !!!<br>";
        }
        if (ko.toJS(self.SelectedCostCenter()) == "" || ko.toJS(self.SelectedCostCenter()) === undefined) {

            errMsg += "कृपया लागत केन्द्र छान्नुहोस् !!!<br>";
        }

        if (self.IsSelected() == "" || self.IsSelected() === undefined) {

            errMsg += "कृपया बजेट जारी सूची छान्नुहोस् !!!<br>";
        }
        if (self.ReleaseDate() == "" || self.ReleaseDate() === undefined) {
            errMsg += "कृपया  जारी मिति भर्नुहोस् !!!<br>";
            objFocus = self.UserId;
        }

        if (self.RelAmount() == "" || self.RelAmount() === undefined) {

            errMsg += "कृपया जारी रकम भर्नुहोस् !!!<br>";
        }
//        var relamount = parseFloat(self.RAmount());

//        if (self.RelAmount() > parseFloat(relamount)) {
//            errMsg += "जारी रकम अनुमोदन रकम भन्दा अधिक !!!<br>";
//            self.RelAmount("");
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

        if (self.IsSelected() == "" || self.IsSelected() === undefined) {

            msg("कृपया बजेट जारी सूची छान्नुहोस् !!!<br>", "FAILURE");
            self.ApproveDate('');
        }
        if (!Validate.empty(self.ReleaseDate()) && !Validate.empty(self.ReqDate())) {
            self.GetDateDifference(self.ReqDate(), self.ReleaseDate());
         
            if (self.Days() < 0) {
                msg("जारी मिति अनुरोध मिति भन्दा अधिक हुनुपर्छ !!!<br>", "FAILURE");
                self.ReleaseDate('');
                self.Days('');
            }
        }
    }
    self.GetEntity = function () {

        SubmissionNumber = getUrlParamVal('SubmissionNumber');

        if (SubmissionNumber != "" && SubmissionNumber != undefined) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetReleaseHandler.ashx',
                data: { 'method': 'GetBudgetReleaseBySubNo', 'SubNo': SubmissionNumber },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
          
                    self.SelectedOffice(result.ResponseData[0].Office.OfficeCode);




                    var OfficeCD = result.ResponseData[0].Office.OfficeCode;

                    $.ajax({
                        dataType: "json",
                        cache: false,
                        url: '../../Handlers/FAMS/BudgetRequestHandler.ashx',
                        data: { 'method': 'GetCostCenter', 'OfficeCD': OfficeCD },
                        contentType: "application/json; charset=utf-8",
                        success: function (results) {
                            var mappedTask = $.map(results.ResponseData, function (item) {

                                return new CostCenter(item)
                            });

                            self.CostCenters(mappedTask);

                           ko.toJS(self.SelectedCostCenter).CostCenterID(result.ResponseData[0].CostCenter.CostCenterID);
                        },
                        error: function (err) {
                            msg(err.status + " - " + err.statusText, "FAILURE");

                        }
                    });


                    $.ajax({
                        dataType: "json",
                        cache: false,
                        url: '../../Handlers/FAMS/BudgetReleaseHandler.ashx',
                        data: { 'method': 'GetDetails', 'OfficeCD': OfficeCD, 'CostCenterID': result.ResponseData[0].CostCenter.CostCenterID },
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            var mappedTask = $.map(result.ResponseData, function (item) {

                                return new BudgetReleaseLst(item)
                            });

                            self.BudgetReleaseLsts(mappedTask);
                         

                        },
                        error: function (err) {
                            msg(err.status + " - " + err.statusText, "FAILURE");

                        }
                    });
                    self.ReleaseDate(result.ResponseData[0].ReleaseDate);
                    self.RelAmount(result.ResponseData[0].ReleaseAmount);
                    
                    self.Remarks(result.ResponseData[0].Remarks);


                   

                    $("#loader").hide();

                },
                error: function (err) {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
    self.GetEntity();
    self.Save = function () {

        if (self.Validation()) {

            OfficeArray = {
                OfficeCode: self.SelectedOffice()
            }
            CostCenterArray = {
                CostCenterID: ko.toJS(self.SelectedCostCenter).CostCenterID
            }
            BudgetItemArray = {
                BudgetItemID: self.BudItemID()
            }
            JobArray = {
                JobID: self.JID()
            }


            sub = {
                Office: OfficeArray,
                CostCenter: CostCenterArray,
                Job: JobArray,
                BudgetItem: BudgetItemArray,
                Remarks: $('#txtremarks').val(),
                ReleaseAmount: self.RelAmount(),
                ReleaseDate: self.ReleaseDate(),
                RequestDate: self.ReqDate(),
                Status: self.Status(),
                EntryBy: self.EntryBy(),
                EntryDate: self.EntryDate(),
                Action: "A",
                ToDate: self.ToDate(),
                FromDate: self.FromDate()
            };


            $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: '../../Handlers/FAMS/BudgetReleaseHandler.ashx',
                data: { 'method': 'SaveBudgetRelease', 'args': JSON.stringify(sub) },
                contentType: "applicaton/json; character=utf -8",

                success: function (result) {

                    if (result.IsSucess) {
                        for (var i = 0; i < self.BudgetReleaseLsts().length; i++) {

                            if (self.BudgetReleaseLsts()[i].BudgetItemID() == self.IsSelected() && self.BudgetReleaseLsts()[i].JobID() == self.JID()) {
                                self.BudgetReleaseLsts()[i].ReleaseAmount(parseFloat(self.RelAmount()) + parseFloat(self.RAmount()));
                            }
                        }
                        msg(result.Message, "SUCCESS");
                        self.ClearControls();
                    }
                    else {
                        msg(result.Message, "WARNING");
                    }


                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }

            });

        }

    };


};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new BudgetRequestViewModel());
});

*/