<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="SubsideryAccountReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.ACCOUNT.SubsideryAccountReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container wrapper">
        <div class="col-md-12">
            <h3 class=" margin-top-15 margin-left-25">
                Subsidiary Account Report</h3>
            <form class="form-horizontal" role="form">
            <div class="row">
                <div class="col-md-2">
                    Office <span class="mandatory">*</span>
                </div>
                <div class="col-md-4">
                    <div class="dropdown margin-left-0" style="width: 100%;">
                        <select id="lstOffice" class="dropdown-select" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',
                                    optionsValue:$data,value: SelectedOffice">
                        </select>
                    </div>
                </div>
            </div>
            <div class="row" style="display: none">
                <div class="col-md-2">
                    Voucher Type <span class="mandatory">*</span>
                </div>
                <div class="col-md-3">
                    <div class="dropdown one-seventy margin-left-0">
                        <select id="Select6" class="dropdown-select" data-bind='options:VoucherGroups, 
                            optionsText: "VoucherGroupDesc",
                            optionsValue:$data,
                            value:SelectedVGroup, 
                            optionsCaption:"-----छान्नुहोस्-----", event:{change: GetAccChartByVGroup}'>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row margin-top-15" style="border-top: 1px #ccc solid; padding-top: 15px;">
                <div class="col-md-2">
                    GL Name <span class="mandatory">*</span></div>
                <div class="col-md-2 ccenter">
                    Functional Unit <span class="mandatory">*</span>
                </div>
                <div class="col-md-4">
                </div>
            </div>
            <div class="row">
                <div class="col-md-2 dropdown">
                    <select id="ddlGlCode" class="dropdown-select" data-bind='options: GlCodeList, 
                                                optionsText: "AccName",
                                                optionsValue: $data,
                                                value: SelectedGlCode,
                                                optionsCaption: "-----छान्नुहोस्-----", event:{ change:GetContraOrLvl } '>
                    </select>
                </div>
                <div class="col-md-2 dropdown" id="divContra">
                    <select id="selContra" class="dropdown-select" data-bind='options:ContraAccountList, 
                            optionsText: "AccName",
                            optionsValue:$data,
                            value:SelectedContraAccount, 
                            optionsCaption:"-----छान्नुहोस्-----", event:{change:GetContraGlCode }'>
                    </select>
                </div>
                <div class="col-md-2 dropdown ccenter">
                    <select id="Select5" class="dropdown-select" data-bind='options:CostCenters, 
                            optionsText: "CostCenterName",
                            optionsValue:$data,
                            value:SelectedCostCenter, 
                            optionsCaption:"-----छान्नुहोस्-----"'>
                    </select>
                </div>
                <div class="col-md-2 dropdown" id="divLvl2">
                    <select id="Select3" class="dropdown-select" data-bind='options: GlCodeLvl2List, 
                                                optionsText: "AccName",
                                                optionsValue: $data,
                                                value: SelectedLvl2GlCode,
                                                optionsCaption: "-----छान्नुहोस्-----" , event:{ change:GetLvl3GlCode }'>
                    </select>
                </div>
                <div class="col-md-2 dropdown" id="divLvl3">
                    <select id="Select4" class="dropdown-select" data-bind='options: GlCodeLvl3List, 
                                                optionsText: "AccName",
                                                optionsValue: $data,
                                                value: SelectedLvl3GlCode,
                                                optionsCaption: "-----छान्नुहोस्-----",event:{ change:GetLvl4GlCode }'>
                    </select>
                </div>
                <!--Bibek-->
                <div class="col-md-2 dropdown" id="divLvl4">
                    <select id="Select7" class="dropdown-select" data-bind='options: GlCodeLvl4List, 
                                                optionsText: "AccName",
                                                optionsValue: $data,
                                                value: SelectedLvl4GlCode,
                                                optionsCaption: "-----छान्नुहोस्-----",event:{ change:GetLvl6GlCode }'>
                    </select>
                </div>
                <div class="col-md-2 dropdown" id="divLvl5">
                    <select id="Select8" class="dropdown-select" data-bind='options: GlCodeLvl5List, 
                                            optionsText: "AccName",
                                            optionsValue: $data,
                                            value: SelectedLvl5GlCode,
                                            optionsCaption: "-----छान्नुहोस्-----",event:{ change:GetLvl7GlCode }'>
                    </select>
                </div>
                <!--/Bibek-->
            </div>
            <div class="row">
                <div id="ddlGLSubsidary" class="col-md-2 margin-left-15">
                    Subsidiary Acc. <span class="mandatory">*</span>
                </div>
                <div class="col-md-1" style="display: none;">
                    Account<span class="mandatory">*</span>
                </div>
            </div>
            <div class="row">
                <div id="ddlGLSubsidarys" class="dropdown col-md-2">
                    <select id="Select1" class="dropdown-select" data-bind='options: GLCodeSubsidarysLst, 
                                                    optionsText: "AccName",
                                                    optionsValue:$data,
                                                    value:SelectedGLCodeSubsidary, 
                                                    optionsCaption:"-----छान्नुहोस्-----"'>
                    </select>
                </div>
                <div class="col-md-2" style="display: none;">
                    <div class="dropdown">
                        <select id="Select2" class="dropdown-select" data-bind='options: AccountNumbserList,
                                                optionsText: "AccNameNep", 
                                                optionsValue:$data,
                                                value:SelectedAcNo, 
                                                optionsCaption:"-----छान्नुहोस्-----"'>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 ">
                    <div class="col-md-2" align="right">
                        From Date <span class="mandatory">*</span>
                    </div>
                    <div class="col-md-2 padding-left-0">
                        <input type="text" id="txtFromDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
                            class="form-control" data-bind='value: FromDate' />
                    </div>
                    <div class="col-md-1" align="right">
                        To Date<span class="mandatory">*</span>
                    </div>
                    <div class="col-md-2 padding-left-0">
                        <input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
                            class="form-control" data-bind='value: ToDate' />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div class="row">
                <div class="col-md-3 pull-right">
                    <button id="btnPrint" class="btn btn-primary" data-bind="click:PrintSubsidaryAccount">
                        Print Subsidiary
                    </button>
                    <!--button id="btnPrintAccountDetails" class="btn btn-primary" data-bind="click:PrintAccountDetails">
                        Print Account Details</button-->
                    <button id="btnCancel" class="btn btn-primary" data-bind="click: CleaRPRintControls">
                        Cancel</button>
                </div>
                <div class="col-md-9">
                </div>
            </div>
            <br />
            </form>
        </div>
    </div>
    <script src="../../../Scripts/REPORTING/ACCOUNT/SubsideryAccountReport.js" type="text/javascript"></script>
</asp:Content>
