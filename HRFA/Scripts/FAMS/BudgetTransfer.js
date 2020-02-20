/*********************************************************************************
function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
    }
}

function BudgetItem(data) {
    var self = this;
    if (data != undefined) {
        self.BudgetItemID = ko.observable(data.BudgetItem.BudgetItemID);
        self.BudgetItemName = ko.observable(data.BudgetItem.BudgetItemEng);
    }
}

function FiscalYear(data) {
    var self = this;
    self.FiscalYearName = ko.observable(data.FiscalYearName);
}

function Job(data) {
    var self = this;
    if (data != undefined) {
        self.JobID = ko.observable(data.JobID);
        self.JobDesc = ko.observable(data.JobDesc);
    }
}

function BudgetReleaseLst(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.Office.OfficeCode);
    self.CostCenterID = ko.observable(data.CostCenter.CostCenterID);
    self.JobID = ko.observable(data.Job.JobID);
    self.BudgetItemID = ko.observable(data.BudgetItem.BudgetItemID);
    self.BudgetItemDesc = ko.observable(data.BudgetItem.BudgetItemEng);
    self.Amount = ko.observable(data.ApproveAmount);
    self.RequestDate = ko.observable(data.RequestDate);
    self.ReleaseAmount = ko.observable(data.ReleaseAmount);

    self.OldSubmissionNo = ko.observable(data.OldSubmissionNo);

};

function BudgetAmount(data) {
    var self = this;
    self.BudgetItemID = ko.observable(data.BudgetItemID);
    self.BudgetItemDesc = ko.observable(data.BudgetItemDesc);
    self.Amount = ko.observable(data.Amount);
   
};

function BudgetTransfer(data) {
    var self = this;
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.TransferNo = ko.observable(data.TransferNo);
    self.TransferSeq = ko.observable(data.TransferSeq);
    self.TransferDate = ko.observable(data.TransferDate);
    self.FromOfficeCD = ko.observable(data.FromOfficeCD);
    self.FromCostCenterID = ko.observable(data.FromCostCenterID);
    self.FromRequestDate = ko.observable(data.FromRequestDate);
    self.FromBudgetID = ko.observable(data.FromBudgetID);
    self.FromJobID = ko.observable(data.FromJobID);
    self.ToOfficeCD = ko.observable(data.ToOfficeID);
    self.ToCostCenterID = ko.observable(data.ToCostCenterID);
    self.ToRequestDate = ko.observable(data.ToRequestDate);
    self.ToBudgetID = ko.observable(data.ToBudgetID);
    self.ToJobID = ko.observable(data.ToJobID);
    self.TransferAmount = ko.observable(data.TransferAmount);
    self.Remarks = ko.observable(data.Remarks);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.RStatus = ko.observable(data.RStatus);

    self.Action = ko.observable(data.Action);
    
}

function BudgetTransferViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.TransferNo = ko.observable();
    self.TransferSeq = ko.observable();
    self.TransferDate = ko.observable();
    self.FromOfficeCD = ko.observable();
    self.FromCostCenterID = ko.observable();
    self.FromRequestDate = ko.observable();
    self.FromBudgetID = ko.observable();
    self.FromJobID = ko.observable();
    self.ToOfficeID = ko.observable();
    self.ToCostCenterID = ko.observable();
    self.ToRequestDate = ko.observable();
    self.ToBudgetID = ko.observable();
    self.ToJobID = ko.observable();
    self.TransferAmount = ko.observable();
    self.BudgetAmount = ko.observable();
    self.Remarks = ko.observable();

    var entryBy = $("#user").text()
    self.EntryBy = ko.observable(entryBy);
    self.EntryDate = ko.observable();
    self.RStatus = ko.observable();
    self.Action = ko.observable();

    self.BudgetReleaseLsts = ko.observableArray([]);

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();

    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();

    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();

    self.CostCenters = ko.observable([]);
    self.SelectedCostCenter = ko.observable();

    self.SelectedCostCenterTo = ko.observable();
    self.TCostCenters = ko.observableArray([]);
    self.SelectedTCostCenterTo = ko.observable();
        
    self.grdOfficeName = ko.observable();
    self.grdCostCenterName = ko.observable();

    self.TransferOffices = ko.observableArray([]);
    self.SelectedTransferOffice = ko.observable();

    self.TransferTo = ko.observableArray([]);
    self.SelectedTransferTo = ko.observable();

    self.BudgetItems = ko.observableArray([]);
    self.SelectedToBudgetItem = ko.observable();

    self.Jobs = ko.observableArray([]);
    self.SelectedJobTo = ko.observable(); 

    self.Dates = ko.observable();

    self.IsSelected = ko.observable();
    self.RAmount = ko.observable();
    self.BudItemID = ko.observable();
    self.JID = ko.observable();
    self.ReqDate = ko.observable();
    self.BudgetReleaseLstsTo = ko.observableArray([]);

    self.RequestDate = ko.observable();

    self.BudgetItemID = ko.observable();
    self.BudgetItemName = ko.observable();

    self.OfficeCode = ko.observable();

    self.OldSubmissionNo = ko.observable();

    self.FiscalYears = ko.observableArray([]);
    self.SelectedFiscalYear = ko.observable();

   
       
   
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

        //Save Budget Transfer

   


    //--------------------------------------------------------------
    //NB: To Load all the offices 
    //--------------------------------------------------------------
    self.GetOffices = function () {

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'officeCode': null },
            contentType: "application/json; charset=utf-8",
            async:false,
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
    }
    self.GetOffices();

    self.GetCostCenter = function () {
       
        if (self.SelectedOffice() == undefined || self.SelectedOffice() == null) {
           
            self.SelectedCostCenter('');
            self.SelectedOffice('');
            self.CostCenters([]);
            self.Action("A");
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/FAMS/CostCenterHandler.ashx',
                async: false,
                data: { 'method': 'GetCostCenter', 'officeCode': self.SelectedOffice(), 'CostCenterID': null },
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

    self.GetCostCenter();


    self.GetTCostCenter = function () {
        if (self.SelectedTransferOffice() == undefined || self.SelectedTransferOffice() == null) {

            self.SelectedTCostCenterTo('');
            self.SelectedTransferOffice('');
            self.TCostCenters([]);
            self.Action("A");
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/Handlers/FAMS/CostCenterHandler.ashx',
                async: false,
                data: { 'method': 'GetCostCenter', 'officeCode': self.SelectedTransferOffice(), 'CostCenterID': null },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new CostCenter(item)
                    });

                    self.TCostCenters(mappedTask);


                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }

    }

    self.GetTCostCenter();

 
 // Get Budget Item To

    self.GetBudgetItem = function () {
        if (self.SelectedTransferOffice() == undefined || self.SelectedTCostCenterTo() == undefined) {
            self.BudgetItems([]);
            return;
        }
        else {
            $.ajax({
                dataType: "json",
                async: false,
                cache: false,
                url: '../../../Handlers/FAMS/BudgetTransferHandler.ashx',
                data: { 'method': 'GetBudgetItem', 'OfficeCD': self.SelectedTransferOffice(), 'CostCenterID': self.SelectedTCostCenterTo() },
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

    }
   //self.GetBudgetItem();

   //Get Job
       self.GetJob = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
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
    self.GetJob();


    self.SearchApproved = function () {
        if (self.SearchValidation()) {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../Handlers/FAMS/BudgetTransferHandler.ashx',
                data: { 'method': 'GetDetails', 'OfficeCD': self.SelectedOffice(), 'CostCenterID': self.SelectedCostCenter(), 'fiscalyear': self.SelectedFiscalYear() },
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
        }
    }

    self.SearchValidation = function () {
        var errMsg = "";
        if (Validate.empty(self.SelectedFiscalYear())) {
            errMsg += "कृपया आर्थिक वर्ष छान्नुहोस !!!\n";
        }
        if (Validate.empty(self.SelectedOffice())) {
            errMsg += "कृपया कार्यालय छान्नुहोस !!!\n";
        }
        if (Validate.empty(self.SelectedCostCenter())) {
            errMsg += "कृपया लागत केन्द्र  छान्नुहोस !!!\n";
        }
        
        if (errMsg == "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    // To Details

    self.ToDetails = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../Handlers/FAMS/BudgetReleaseHandler.ashx',
            data: { 'method': 'GetDetails', 'OfficeCD': self.SelectedTransferOffice(), 'CostCenterID': self.SelectedTCostCenterTo() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {

                    return new BudgetReleaseLst(item)
                });

                self.BudgetReleaseLstsTo(mappedTask);

                if (self.BudgetReleaseLstsTo().length > 0) {
                    self.SelectedToBudgetItem(ko.toJS(self.BudgetReleaseLstsTo)[0].BudgetItemID);
                    self.SelectedJobTo(ko.toJS(self.BudgetReleaseLstsTo)[0].JobID);
                }

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }

    self.GetBudgetDetails = function (data) {
        if (getUrlParamVal('SubmissionNumber') == null || getUrlParamVal('SubmissionNumber') == "") {

            var datas = ko.toJS(data);
            self.FromRequestDate(datas.RequestDate);
            self.FromBudgetID(datas.BudgetItemID);
            self.FromJobID(datas.JobID);
            self.ToRequestDate(datas.RequestDate);
            self.BudgetAmount(datas.Amount);

            var office = {
                OfficeCode: self.SelectedOffice()
            }

            var costcenter = {
                CostCenterID: self.SelectedCostCenter()
            }

            var budgetitem = {
                BudgetItemID: datas.BudgetItemID
            }

            var args = {
                FromOffice: office,
                FromCostCenter: costcenter,
                FiscalYear: self.SelectedFiscalYear(),
                FromBudgetItem: budgetitem
            }


            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../Handlers/FAMS/BudgetTransferHandler.ashx',
                data: { 'method': 'GetBudgetTransfer', 'args': JSON.stringify(args) },
                contentType: "application/json; charset=utf-8",
                success: function (result) {


                    if (result.ResponseData == null) {
                        self.SelectedTransferOffice("");
                        self.TransferAmount("");
                        self.TransferDate("");
                        self.Remarks("");
                        self.SubmissionNo("");
                    }
                    else {
                        self.TransferNo(result.ResponseData.TransferNo);
                        self.SelectedTransferOffice(result.ResponseData.ToOffice.OfficeCode);
                        self.GetTCostCenter();
                        self.SelectedTCostCenterTo(result.ResponseData.ToCostCenter.CostCenterID);
                        self.GetBudgetItem();
                        self.SelectedToBudgetItem(result.ResponseData.ToBudgetItem.BudgetItemID);
                        self.TransferAmount(result.ResponseData.TransferAmount);
                        self.TransferDate(result.ResponseData.TransferDate);
                        self.Remarks(result.ResponseData.Remarks);
                        self.SubmissionNo(result.ResponseData.SubmissionNo);
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
        else { 
            
        }
    }


    self.SaveBudgetTransfer = function () {
        self.SetNepali();

        if (self.Validation()) {

            var action = "";
            if (self.SubmissionNo() == null || self.SubmissionNo() == "") {
                action = "A";
            }
            else {
                action = "E";
            }

            OfficeArray = {
                OfficeCode: self.SelectedOffice()
            }
            ToOfficeArray = {
                OfficeCode: self.SelectedTransferOffice()
            }
            CostCenterArray = {
                CostCenterID: self.SelectedCostCenter()
            }
            ToCostCenterArray = {
                CostCenterID: self.SelectedTCostCenterTo()
            }
            BudgetItemArray = {
                BudgetItemID: self.BudItemID()
            }


            sub = {

                OldSubmissionNo: self.SubmissionNo(),

                FromOffice: OfficeArray,
                FromCostCenter: CostCenterArray,
                ToOffice: ToOfficeArray,
                ToCostCenter: ToCostCenterArray,

                TransferNo: self.TransferNo(),
                TransferDate: self.TransferDate(),
                FromRequestDate: self.FromRequestDate(),
                FromBudgetID: self.FromBudgetID(),

                FromJobID: self.FromJobID(),
                ToRequestDate: self.FromRequestDate(),

                ToBudgetID: self.SelectedToBudgetItem(),
                ToJobID: 1,
                TransferAmount: self.TransferAmount(),
                Remarks: $('#txtRemark').val(),
                FiscalYear: self.SelectedFiscalYear(),

                EntryBy: self.EntryBy(),
                EntryDate: self.EntryDate(),
                RStatus: "I",
                Action: action

            };

            var url = "/Handlers/FAMS/BudgetTransferHandler.ashx";
            var method = "SaveBudgetTransferDetail";
            var appID = "FAMS";
            var modID = "BUDGETTRAN";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(sub)), 'appID': appID, 'modID': modID };

            $.post(url, data,
                        function (result) {
                            var obj = jQuery.parseJSON(result);
                            if (obj.IsSucess) {
                                msg(obj.Message);
                                self.ClearControl();
                            }
                            else {
                                msg(obj.Message, "WARNING");
                            }

                        });
        }

    };

    self.SubmitBudgetTransfer = function () {
        self.SetNepali();

        if (self.Validation()) {

            var action = "";
            if (self.SubmissionNo() == null || self.SubmissionNo() == "") {
                action = "A";
            }
            else {
                action = "E";
            }

            OfficeArray = {
                OfficeCode: self.SelectedOffice()
            }
            ToOfficeArray = {
                OfficeCode: self.SelectedTransferOffice()
            }
            CostCenterArray = {
                CostCenterID: self.SelectedCostCenter()
            }
            ToCostCenterArray = {
                CostCenterID: self.SelectedTCostCenterTo()
            }
            BudgetItemArray = {
                BudgetItemID: self.BudItemID()
            }


            sub = {

                OldSubmissionNo: self.SubmissionNo(),

                FromOffice: OfficeArray,
                FromCostCenter: CostCenterArray,
                ToOffice: ToOfficeArray,
                ToCostCenter: ToCostCenterArray,

                TransferNo: self.TransferNo(),
                TransferDate: self.TransferDate(),
                FromRequestDate: self.FromRequestDate(),
                FromBudgetID: self.FromBudgetID(),

                FromJobID: self.FromJobID(),
                ToRequestDate: self.FromRequestDate(),

                ToBudgetID: self.SelectedToBudgetItem(),
                ToJobID: 1,
                TransferAmount: self.TransferAmount(),
                Remarks: $('#txtRemark').val(),
                FiscalYear: self.SelectedFiscalYear(),

                EntryBy: self.EntryBy(),
                EntryDate: self.EntryDate(),
                RStatus: "F",
                Action: action

            };

            var url = "/Handlers/FAMS/BudgetTransferHandler.ashx";
            var method = "SaveBudgetTransferDetail";
            var appID = "FAMS";
            var modID = "BUDGETTRAN";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(sub)), 'appID': appID, 'modID': modID };

            $.post(url, data,
                function (result) {
                    var obj = jQuery.parseJSON(result);
                    if (obj.IsSucess) {
                        msg(obj.Message);
                        self.ClearControl();
                    }
                    else {
                        msg(obj.Message, "WARNING");
                    }
                    
                });
        }

    };



    // Budget Transfer by Submission No

    self.GetBudgetTransferBySubNo = function () {

        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));

        //var editable = getUrlParamVal('Editable');
        var editable = 'N';

        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }
        else {
            if (editable == 'Y') {
            }
            else {
                $('button').hide();
                $('form').find('input, textarea, select').attr('disabled', 'disabled');
            }

            $.ajax({
                dataType: "json",
                url: '../../Handlers/FAMS/BudgetTransferHandler.ashx',
                data: { 'method': 'GetBudgetTransferBySubNo', 'SubNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (result) {
                    if (result.ResponseData != null) {
                        self.SelectedFiscalYear(result.ResponseData.FiscalYear);
                        self.SelectedOffice(result.ResponseData.FromOffice.OfficeCode);
                        self.GetCostCenter();
                        self.SelectedCostCenter(result.ResponseData.FromCostCenter.CostCenterID);

                        var fromBudget = {
                            BudgetItemID: result.ResponseData.FromBudgetID,
                            BudgetItemDesc: result.ResponseData.FromBudgetItem.BudgetItemName,
                            Amount: result.ResponseData.ApproveAmount
                        }

                        self.BudgetReleaseLsts.push(new BudgetAmount(fromBudget));

                        // self.SearchApproved();

                        //                        for (var i = 0; i < self.BudgetReleaseLsts().length; i++) {
                        //                            if (ko.toJS(self.BudgetReleaseLsts())[i].BudgetItemID == result.ResponseData.FromBudgetID) {
                        //                               var index = Number(i+1);
                        //                                $("table tr:nth-child(" + index + ")").addClass('redCSS');
                        //                            }
                        //                        }

                        self.TransferNo(result.ResponseData.TransferNo);
                        self.SelectedTransferOffice(result.ResponseData.ToOffice.OfficeCode);
                        self.GetTCostCenter();
                        self.SelectedTCostCenterTo(result.ResponseData.ToCostCenter.CostCenterID);
                        self.GetBudgetItem();
                        self.SelectedToBudgetItem(result.ResponseData.ToBudgetItem.BudgetItemID);
                        self.TransferAmount(result.ResponseData.TransferAmount);
                        self.TransferDate(result.ResponseData.TransferDate);
                        self.Remarks(result.ResponseData.Remarks);
                        self.SubmissionNo(result.ResponseData.SubmissionNo);

                    }
                    else {
                        msg("Submission number is not valid");
                    }

                },
                error: function (err) {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    self.GetBudgetTransferBySubNo();



    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.FromBudgetID())) {
            errMsg += "कृपया सुचिबाट एउटा बजेट शीर्षक छान्नुहोस !!!\n";
        }

        if (Validate.empty(self.SelectedTransferOffice())) {
            errMsg += "कृपया स्थानान्तरण कार्यालय छान्नुहोस !!!\n";
        }
        if (Validate.empty(self.SelectedCostCenter())) {
            errMsg += "कृपया स्थानान्तरण लागत केन्द्र छान्नुहोस !!!\n";
        }
        if (Validate.empty(self.SelectedToBudgetItem())) {
            errMsg += "कृपया बजेट शीर्षक छान्नुहोस !!!\n";
        }
        if (Validate.empty(self.TransferAmount())) {
            errMsg += "कृपया रकम भर्नुहोस् !!!\n";
        }
        if (Validate.empty(self.TransferDate())) {
            errMsg += "कृपया मिति भर्नुहोस् !!!\n";
        }

        if (self.BudgetAmount() < self.TransferAmount()) {
            errMsg += "अनुमोदन रकम भन्दा स्थानान्तरण रकम बढी हुनुहुँदैन ";
        }
        //        if (Validate.empty(self.Dates())) {
        //            errMsg += "कृपया मिति भर्नुहोस् !!!\n";
        //        }

        if (errMsg == "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.SetNepali = function () {
        self.Dates($("#txtDate").val());
        self.Remarks($("#txtRemark").val());
    }

    self.ClearDetail = function () {
        self.BudgetReleaseLsts([]);
        self.SelectedTransferOffice('');
        self.SelectedTCostCenterTo('');
        self.SelectedToBudgetItem('');
        self.SelectedJobTo('');
        self.TransferAmount('');
        self.TransferDate('');
        self.TransferNo('');
        $("#txtRemark").val('');
        self.Remarks('');
        self.FromRequestDate('');
        self.FromBudgetID('');
        self.FromJobID('');
        self.ToRequestDate('');
        self.SubmissionNo('');
    }

    self.ClearControl = function () {
        self.SelectedFiscalYear('');
        self.SelectedOffice('');
        self.SelectedCostCenter('');
        self.ClearDetail();
    }

    self.CancelBudgetTransfer = function () {
       self.ClearControl();
    }
 }

$(document).ready(function () {
   ValidateSession();
    ko.applyBindings(new BudgetTransferViewModel());
});


