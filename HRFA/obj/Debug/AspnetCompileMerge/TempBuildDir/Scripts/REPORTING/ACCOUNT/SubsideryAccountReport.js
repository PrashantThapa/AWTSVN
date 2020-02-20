/*********************************************************************************
Copyright © HRFA PCS System  2016
*********************************************************************************
Project              : Copyright © HRFA PCS System  2016  
File                 :AccountChartSetup.js 
Description          :This Page contain the Account Chart Setup Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
shanjeev sah                                 10/01/2015                                                              
*********************************************************************************/
function OfficeCompanyAccChart(data) {
    var self = this;
    self.Company = ko.observable(data.Company);
    self.AccountChart = ko.observable(data.AccountChart);
    self.AccName = ko.observable(data.AccountChart.AccName);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.FromDate = ko.observable(data.FromDate);
    self.Rstatus = ko.observable(data.Rstatus);
    self.ToDate = ko.observable(data.ToDate);
    self.TranNo = ko.observable(data.TranNo);
    self.Action = ko.observable(data.Action);
    self.Selected = ko.observable(data.Selected);
    self.HaveSubs = ko.observable(data.HaveSubs);
}

function OfficeCompanyAccChartSub(data) {
    var self = this;
    self.AccCode = ko.observable(data.AccountChart.AcNo);
    self.AccName = ko.observable(data.AccountChart.AccName);

}

function Company(data) {
    var self = this;
    self.Office = ko.observable(data.Office);
    self.CompanyID = ko.observable(data.CompanyID);
    self.CompanyName = ko.observable(data.CompanyName);
    self.CompanyNameEng = ko.observable(data.CompanyNameEng);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.RStatus = ko.observable(data.RStatus);
    self.TranNo = ko.observable(data.TranNo);
    self.Action = ko.observable(data.Action);
}
function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
        self.CostCenterNameEng = ko.observable(data.CostCenterNameEng);

        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Action = ko.observable(data.Action);
    }
}


function Office(data) {
    var self = this;
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    self.OfficeCode = ko.observable(data.OfficeCode);
}

function AccountChart(data) {
    var self = this;
    self.AccCode = ko.observable(data.AccCode);
    self.AccName = ko.observable(data.AccName);
    self.GLGroup = ko.observable(data.GLGroup);
    self.PaACCode = ko.observable(data.PaACCode);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Rstatus = ko.observable(data.Rstatus);
    self.TranNo = ko.observable(data.TranNo);
    self.HeadTran = ko.observable(data.HeadTran);
    self.Balance = ko.observable(data.Balance);
    self.GlCode = ko.observable(data.GlCode);
    self.ACNameEng = ko.observable(data.ACNameEng);
    self.Action = ko.observable(data.Action);
    self.HaveSubs = ko.observable(data.HaveSubs);

}

function GLGroup(data) {
    var self = this;
    self.GroupID = ko.observable(data.GroupID);
    self.GroupName = ko.observable(data.GroupName);

}

function VoucherGroup(data) {
    var self = this;
    self.VoucherGroupID = ko.observable(data.VoucherGroupID);
    self.VoucherGroupDesc = ko.observable(data.VoucherGroupDesc);
}

/*********************Structure Begin ******************************************/

function GetAccounts(data) {
    var self = this;
    self.AccountID = ko.observable(data.AccountID);
    self.AccNameNep = ko.observable(data.AccNameNep);
    self.AccNameEng = ko.observable(data.AccNameEng);
}

function AccChart(data) {
    var self = this;
    self.AccCode = ko.observable(data.AccountChart.AccCode);
    self.AccName = ko.observable(data.AccountChart.AccName);
    self.VoucherGroupID = ko.observable(data.VoucherGroup.VoucherGroupID);
    self.CodeNo = ko.observable(data.AccountChart.CodeNo);
    self.HaveSubs = ko.observable(data.AccountChart.HaveSubs);
}

function Accounts(data) {
    var self = this;
    AccountID = ko.observable(data.AccountID);
    AccountDate = ko.observable(data.AccountDate);
    AccountStatus = ko.observable(data.AccountStatus);
    SourceTypes = ko.observable(data.SourceTypes);
    SourceID = ko.observable(data.SourceID);
    EntryBy = ko.observable(data.EntryBy);
    EntryDate = ko.observable(data.EntryDate);
    RStatus = ko.observable(data.RStatus);
    TranNo = ko.observable(data.TranNo);
};

///*********************Structure End ******************************************/


/*********************View Model Begin ******************************************/
function SubsidaryAccountReportViewModel() {
    var self = this;
    self.TranNo = ko.observable();
    self.TranDate = ko.observable();

    //self.VoucherTypes = ko.observableArray([{ 'VoucherTypeName': 'Journal Voucher', 'VoucherTypeID': 'JV' }, { 'VoucherTypeName': 'Cash Voucher', 'VoucherTypeID': 'C' }, { 'VoucherTypeName': 'Bank Voucher', 'VoucherTypeID': 'B'}]);
    self.SelectedVoucherType = ko.observable();

    self.VoucherNo = ko.observable();
    self.TotDr = ko.observable();
    self.TotCr = ko.observable();
    self.Office = ko.observable();
    self.EntryBY = ko.observable();
    self.EntryDate = ko.observable();
    self.Rstatus = ko.observable();
    self.Action = ko.observable();
    self.OfficeTranDetail = ko.observableArray([]);
    self.Action = ko.observable();
    self.Narration = ko.observable();


    /**********For grid data Tran details ****/
    self.SelectedGlCode = ko.observable();
    self.GlCodeList = ko.observableArray([]);
    self.GlCodeListBorC = ko.observableArray([]);

    self.AccountNumbserList = ko.observableArray([]);
    self.SelectedAcNo = ko.observable();

    self.Dr = ko.observable();
    self.Cr = ko.observable();
    self.Description = ko.observable();
    self.CompanyArray = ko.observableArray([]);
    self.SelectedCompany = ko.observable();

    // cost center
    self.OfficeCode = ko.observable();
    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();
    self.CostCenterNameEng = ko.observable();
    self.CostCenters = ko.observableArray([]);
    self.SelectedCostCenter = ko.observable();
    self.ParentOffID = ko.observable();
    self.ParentCostCenterID = ko.observable();
    self.ParentID = ko.observable();
    self.OfficeName = ko.observable();
    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();
    self.OfficeArray = ko.observableArray([]);

    self.OfficeTranDetail = ko.observableArray([]);
    self.selectedItem = ko.observable();

    self.GLCodeSubsidarysLst = ko.observableArray([]);
    self.SelectedGLCodeSubsidary = ko.observable();

    self.HaveSubs = ko.observable();
    self.SubmissionNo = ko.observable();

    self.GlCodeLvl2List = ko.observableArray([]);
    self.GlCodeLvl3List = ko.observableArray([]);
    self.GlCodeLvl4List = ko.observableArray([]);
    self.GlCodeLvl5List = ko.observableArray([]);
    self.ContraAccountList = ko.observableArray([]);
    self.VoucherGroups = ko.observableArray([]);

    self.SelectedLvl2GlCode = ko.observable();
    self.SelectedLvl3GlCode = ko.observable();
    self.SelectedLvl4GlCode = ko.observable();
    self.SelectedLvl5GlCode = ko.observable();
    self.SelectedContraAccount = ko.observable();
    self.SelectedVGroup = ko.observable();

    self.ToSaveGlCode = ko.observable();
    self.isSubsidary = ko.observable(false);

    self.FromDate = ko.observable();
    self.ToDate = ko.observable();

    var CompanyNames = getUrlParamVal('CompanyName');

    var values = CompanyNames.split('.');

    var OfficeID = values[0];

    var OfficeNameNep = values[1];
    var VGroupID = values[2];
    var VGroupDesc = values[3];
    $("#OfficeID").text(OfficeID);
    $("#OfficeNameNep").text(OfficeNameNep);
    $("#VGroupID").text(VGroupID);
    $("#VGroupDesc").text(VGroupDesc);

    $("#ddlGLSubsidary").hide();
    $("#ddlGLSubsidarys").hide();
    $("#divSubNo").hide();

    $("#divLvl2").hide();
    $("#divLvl3").hide();
    $("#divLvl4").hide();
    $("#divLvl5").hide();
    $(".ccenter").hide();
    $("#divContra").hide();

    self.GetOffice = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
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

    }
    self.GetOffice();

    self.GetCostCenter = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '/Handlers/FAMS/CostCenterHandler.ashx',

            data: { 'method': 'GetCostCenter', 'officeCode': $("#offcode").text(), 'CostCenterID': null },
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

    self.GetVoucherGroup = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
            data: { 'method': 'GetVoucherGroup' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new VoucherGroup(item)

                });
                self.VoucherGroups(mappedTask);

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

    };

    self.GetVoucherGroup();

//    self.ValidateDate = function () {
//        if (!Validate.empty(self.FromDate()) && !Validate.empty(self.ToDate())) {
//            self.GetDateDifference(self.FromDate(), self.ToDate());
//            if (self.Days() < 0) {
//                msg("FromDate must be less or equal to ToDate!!!");
//                self.ToDate('');
//                self.Days('');
//            }
//        }
//    }

    /*****  Begin GetGLCodeSubsidary with subsidary ******/

    self.GetGLCodeSubsidary = function (glcode) {

        if (ko.toJS(glcode).HaveSubs == "Y") {
            $("#ddlGLSubsidary").show()
            $("#ddlGLSubsidarys").show()
            self.isSubsidary(true);
            $.ajax({

                type: 'GET',
                async: false,
                dataType: "json",
                url: '/Handlers/ACCOUNT/OfficeCompanyAccChartHandler.ashx',
                data: { 'method': 'GetGLCodewithSubsidary', 'OfficeID': $("#offcode").text(), 'AccCode': ko.toJS(glcode).AccCode },
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var mappedTasks = $.map(data.ResponseData, function (item) {
                        return new OfficeCompanyAccChartSub(item)
                    });
                    self.GLCodeSubsidarysLst(mappedTasks);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }

        else {
            $("#ddlGLSubsidary").hide()
            $("#ddlGLSubsidarys").hide()
            self.GLCodeSubsidarysLst("")
            self.isSubsidary(false);
        }
    }

    /*****  End GetGLCodeSubsidary with subsidary ******/


    /*********************for Print Subsidary Account Begin ************************************/

    self.PrintSubsidaryAccount = function () {

        if (self.ValidationPrint()) {

            var SubAccNo;

            if (self.SelectedGLCodeSubsidary() == undefined) {
                SubAccNo = null;
            }
            else {
                SubAccNo = ko.toJS(self.SelectedGLCodeSubsidary()).AccCode
            }
            var data = {
                OfficeCode: ko.toJS(self.SelectedOffice()).OfficeCode,
                AccCode: ko.toJS(self.ToSaveGlCode()).AccCode, //self.ToSaveGlCode().AccCode,
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                SubAccNo: SubAccNo

            };
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);

            var url = "../../../Reporting/Account/ReportHandlers/SubsideryAccountReportHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            //self.Cancel();
            waitMsg.hide();
        }
    }

    /********************* End Print ************************************************************/


    /*********************for Print PrintAccountDetails Begin ************************************/

    self.PrintAccountDetails = function () {

        if (self.ValidationPrint()) {

            var SubAccNo;

            if (self.SelectedGLCodeSubsidary() == undefined) {
                SubAccNo = null;
            }
            else {
                SubAccNo = ko.toJS(self.SelectedGLCodeSubsidary()).AccCode
            }
            var data = {
                OfficeCode: ko.toJS(self.SelectedOffice()).OfficeCode,
                AccCode: ko.toJS(self.ToSaveGlCode()).AccCode, //self.ToSaveGlCode().AccCode,
                FromDate: self.FromDate(),
                ToDate: self.ToDate(),
                SubAccNo: SubAccNo, 
                AccName: ko.toJS(self.ToSaveGlCode()).AccName

            }
            
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);

            var url = "../../../Reporting/Account/ReportHandlers/AccountDetailsReportHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
            //self.Cancel();
            waitMsg.hide();
        }
    }

/********************* PrintAccountDetails ************************************************************/

/*********************Clear Print controls Begin *******************************************/
    self.CleaRPRintControls = function () {
        self.SelectedGLCodeSubsidary("");
        $("#ddlGLSubsidary").hide();
        $("#ddlGLSubsidarys").hide();
        self.SelectedGlCode(null);
        self.SelectedVoucherType(null);
        self.SelectedVGroup("");
    };

/*********************Clear Print controls End ******************************************/

/*********************Clear controls Begin **********************************************/
    self.ClearVoucherControls = function () {
        $("#ddlGLSubsidarys").hide();
        $("#ddlGLSubsidary").hide();
        self.SelectedGlCode(null);
        self.ToSaveGlCode("");
        self.SelectedGlCode("");
        self.GlCodeLvl2List([]);
        self.GlCodeLvl3List([]);
        self.GlCodeLvl4List([]);
        self.GlCodeLvl5List([]);
        self.GLCodeSubsidarysLst([]);
        self.CostCenters([]);
    };

/*********************Clear controls End ******************************************/

    self.GetACChartWithOfficeCostcenter = function () {
        if (self.SelectedVoucherType() == null || self.SelectedVoucherType() == undefined) {
            self.GlCodeList([]);
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/Account/OfficeCompanyAccChartHandler.ashx',
                data: { 'method': 'GetOfficeComanyAcchart', 'OfficeID': $("#offcode").text(), 'companyID': "", 'P_all': 'N', 'token': $("#token").text(), 'VType': ko.toJS(self.SelectedVoucherType()).VoucherTypeID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    waitMsg.hide();
                    if (result.IsSucess) {
                        self.GlCodeList([]);
                        for (var i = 0; i < result.ResponseData.length; i++) {
                            self.GlCodeList.push(result.ResponseData[i].AccountChart);
                        }
                    }
                    else {
                        msg(result.Message, "WARNING");
                    }
                },
                error: function (err) {
                    waitMsg.hide();
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }
self.GetAccChartByVGroup = function () {
    /*
        console.log(ko.toJS(self.SelectedVGroup()));
        if (self.SelectedVGroup() == undefined) {
            self.GlCodeList([]);
        }
        */
        if (true) {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
                data: { 'method': 'GetAccChartByVGroup', 'vGroupID': 1 }, // ko.toJS(self.SelectedVGroup()).VoucherGroupID },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.IsSucess) {
                        var mappedTasks = $.map(result.ResponseData, function (item) {
                            return new AccChart(item)
                        });
                        self.GlCodeList(mappedTasks);
                    }
                    else {
                        msg(result.Message, "WARNING");
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    /******************************** Check Contra or lvlGl ***************************************/

    self.GetContraOrLvl = function () {
        $("#ddlGLSubsidary").hide();
        $("#ddlGLSubsidarys").hide();
        if (self.SelectedGlCode() == undefined) {
            self.ContraAccountList([]);
            $('#divContra').hide();
            $('.ccenter').hide();
            $("#divLvl2").hide();
            $("#divLvl3").hide();
            $("#divLvl4").hide();
        }
        else if (ko.toJS(self.SelectedGlCode()).AccCode == 1) {
            $('#divContra').show();
            $('.ccenter').hide();
            $("#divLvl2").hide();
            $("#divLvl3").hide();
            $("#divLvl4").hide();
            self.GetContraAccount();
        }
        else {
            $('#divContra').hide();
            self.GetLvl2GlCode();
        }
    }

/******************************** Load Contra Account Start ***************************************/

    self.GetContraAccount = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
            data: { 'method': 'GetContraAccount', 'vGroupID': 1 /* ko.toJS(self.SelectedVGroup().VoucherGroupID) */, 'OfficeID': $("#offcode").text() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.IsSucess) {
                    var mappedTasks = $.map(result.ResponseData, function (item) {
                        return new AccChart(item)
                    });
                    self.ContraAccountList(mappedTasks);

                    if (self.ContraAccountList().length > 0) {
                        $("#divContra").show();
                    }
                    else {
                        $("#divContra").hide();
                    }

                }
                else {
                    msg(result.Message, "WARNING");
                }
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
/******************************** Load Contra Account End ***************************************/

    self.GetContraGlCode = function () {
        if (self.SelectedContraAccount() == undefined) {
            self.ToSaveGlCode("");
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
        }
        else {
            self.ToSaveGlCode(self.SelectedContraAccount());
            self.GetGLCodeSubsidary(self.SelectedContraAccount());
        }
    }

    /******************************** Load 2GlCode Start ***************************************/

    self.GetLvl2GlCode = function () {
        if (self.SelectedGlCode() == undefined) {
            self.GlCodeLvl2List([]);
            self.GlCodeLvl3List([]);
            $("#divLvl2").hide();
            $("#divLvl3").hide();
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
            $(".ccenter").hide();
        }
        else {
            if (ko.toJS(self.SelectedGlCode()).AccCode == 900000) {
                $(".ccenter").show();
                self.GetCostCenter();
            }
            else {
                $(".ccenter").hide();
            }
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
                data: { 'method': 'GetAccChartChild', 'accCode': ko.toJS(self.SelectedGlCode()).AccCode, 'OfficeID': $("#offcode").text() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.IsSucess) {
                        var mappedTasks = $.map(result.ResponseData, function (item) {
                            return new AccChart(item)
                        });
                        self.GlCodeLvl2List(mappedTasks);

                        if (self.GlCodeLvl2List().length > 0) {
                            $("#divLvl2").show();
                        }
                        else {
                            $("#divLvl2").hide();
                        }

                    }
                    else {
                        msg(result.Message, "WARNING");
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

     /******************************** Load 2GlCode End ***************************************/
    /******************************** Load 3GlCode Start ***************************************/

    self.GetLvl3GlCode = function () {
        if (self.SelectedLvl2GlCode() == undefined) {
            self.GlCodeLvl3List([]);
            self.ToSaveGlCode("");
            $("#divLvl3").hide();
            $("#divLvl4").hide();
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
                data: { 'method': 'GetAccChartChild', 'accCode': ko.toJS(self.SelectedLvl2GlCode()).AccCode, 'OfficeID': $("#offcode").text() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.IsSucess) {
                        var mappedTasks = $.map(result.ResponseData, function (item) {
                            return new AccChart(item)
                        });
                        self.GlCodeLvl3List(mappedTasks);

                        if (self.GlCodeLvl3List().length > 0) {
                            $("#divLvl3").show();
                            // self.ToSaveGlCode("");
                            self.ToSaveGlCode(self.SelectedLvl2GlCode());
                        }

                        else {
                            $("#divLvl3").hide();
                            $("#ddlGLSubsidary").hide();
                            $("#ddlGLSubsidarys").hide();
                            self.ToSaveGlCode(self.SelectedLvl2GlCode());
                            self.GetGLCodeSubsidary(self.SelectedLvl2GlCode());
                        }
                    }
                    else {
                        msg(result.Message, "WARNING");
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

/******************************** Load 3GlCode End ***************************************/
/******************************** Load 4GlCode Start ***************************************/
    self.GetLvl4GlCode = function () {
        if (self.SelectedLvl3GlCode() == undefined) {
            self.GlCodeLvl4List([]);
            self.ToSaveGlCode("");
            $("#divLvl4").hide();
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
                data: { 'method': 'GetAccChartChild', 'accCode': ko.toJS(self.SelectedLvl3GlCode()).AccCode, 'OfficeID': $("#offcode").text() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.IsSucess) {
                        var mappedTasks = $.map(result.ResponseData, function (item) {
                            return new AccChart(item)
                        });
                        self.GlCodeLvl4List(mappedTasks);

                        if (self.GlCodeLvl4List().length > 0) {
                            $("#divLvl4").show();
                            $("#ddlGLSubsidary").hide();
                            $("#ddlGLSubsidarys").hide();
                            // self.ToSaveGlCode("");
                            self.ToSaveGlCode(self.SelectedLvl3GlCode());
                        }

                        else {
                            $("#divLvl4").hide();
                            self.ToSaveGlCode(self.SelectedLvl3GlCode());
                            self.GetGLCodeSubsidary(self.SelectedLvl3GlCode());
                        }
                    }
                    else {
                        msg(result.Message, "WARNING");
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }
    }

    self.GetLvl5GlCode = function () {
        if (self.SelectedLvl4GlCode() == undefined) {
            self.ToSaveGlCode("");
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
        }
        else {
            self.ToSaveGlCode(self.SelectedLvl4GlCode());
            self.GetGLCodeSubsidary(self.SelectedLvl4GlCode());
        }
    }

    self.GetLvl6GlCode = function () {
        if (self.SelectedLvl4GlCode() == undefined) {
            self.GlCodeLvl5List([]);
            self.ToSaveGlCode("");
            $("#divLvl5").hide();
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
            $("#divBankOnly").hide();

        }
        else {
            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/ACCOUNT/OfficeVoucherTranHandler.ashx',
                data: { 'method': 'GetAccChartChild', 'accCode': ko.toJS(self.SelectedLvl4GlCode()).AccCode, 'OfficeID': $("#offcode").text() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.IsSucess) {
                        var mappedTasks = $.map(result.ResponseData, function (item) {
                            return new AccChart(item);
                        });
                        self.GlCodeLvl5List(mappedTasks);


                        if (self.GlCodeLvl5List().length > 0) {
                            $("#divLvl5").show();
                            $("#Select8").show();
                            $("#ddlGLSubsidary").hide();
                            $("#ddlGLSubsidarys").hide();
                            self.ToSaveGlCode("");
                        }
                        else {
                            self.ToSaveGlCode(self.SelectedLvl4GlCode());
                            self.GetGLCodeSubsidary(self.SelectedLvl4GlCode());
                        }
                    }
                    else {
                        msg(result.Message, "WARNING");
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
    };

    self.GetLvl7GlCode = function () {
        if (self.SelectedLvl5GlCode() == undefined) {
            self.ToSaveGlCode("");
            $("#ddlGLSubsidary").hide();
            $("#ddlGLSubsidarys").hide();
        }
        else {
            self.ToSaveGlCode(self.SelectedLvl5GlCode());
            self.GetGLCodeSubsidary(self.SelectedLvl5GlCode());
        }
    };

/*********************Validation Submit Begin ******************************************/

    self.ValidationPrint = function () {
        var errMsg = "";
        var objFocus = null;

        if (!self.SelectedOffice())
            errMsg += "Please select Office!!!<br>";

        if (!self.FromDate())
            errMsg += "Please select the From Date!!!<br>";

        if (!self.ToDate())
            errMsg += "Please select the To Date!!!<br>";

        if (!self.ToSaveGlCode())
            errMsg += "Please select the GL Name!!!<br>";

        if (errMsg) {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }
    };
 
 /*********************Validation Submit End ******************************************/
    
    self.GetAccChartByVGroup();

}
/*********************View Model End ******************************************/
$(document).ready(function () {

    ValidateSession();
   // var sarvm = new SubsidaryAccountReportViewModel()
   // ko.applyBindings(sarvm);
    ko.applyBindings(new SubsidaryAccountReportViewModel());
   
});