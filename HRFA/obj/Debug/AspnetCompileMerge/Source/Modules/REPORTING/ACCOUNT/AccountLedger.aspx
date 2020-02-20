<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="AccountLedger.aspx.cs" Inherits="HRFA.Modules.REPORTING.ACCOUNT.AccountLedger" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="wrapper">
        <div class="col-md-10">
            <h3 class="margin-top-15 margin-left-25">
                Branch Report</h3>
            <form class="form-horizontal" runat="server" id="Form1" role="form">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-2">
                        <small>Report Category</small><span class="mandatory">*</span>
                    </div>
                    <div class="col-md-3 dropdown margin-left-0">
                        <select id="ddlReportType" class="dropdown-select" data-bind="options:ReportTypes,
                         optionsText: 'ReportTypeName', optionsValue:$data,value:SelectedReportType,
                          optionsCaption:'------छान्नुहोस्-------', event:{ change:selectReportType }">
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 ">
                    <div id="divOffice">
                        <div class="col-md-2">
                            Office <span class="mandatory">*</span>
                        </div>
                        <div class="col-md-3 dropdown margin-left-0">
                            <select id="lstOffice" class="dropdown-select" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:$data,value: SelectedOffice,event:{ change: GetCostCenter }">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-1">
                    </div>
                    <div id="divFunctionUnit">
                        <div class="col-md-2">
                            Functional Unit
                        </div>
                        <div class="col-md-3  dropdown margin-left-0">
                            <select id="selFunctionUnit" class="dropdown-select" data-bind='options:CostCenters, 
                            optionsText: "CostCenterName",
                            optionsValue:"CostCenterID",
                            value:SelectedCostCenter, 
                            optionsCaption:"------छान्नुहोस्-------", event:{ change: $data.GetACChartWithOfficeCostcenter }'>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="divGl">
                <div class="col-md-12">
                    <div class="col-md-2">
                        GL Name
                    </div>
                    <div class="dropdown col-md-3 margin-left-0">
                        <select id="selGlCode" class="dropdown-select" data-bind='options: GlCodeList, 
                                                optionsText: "AccName",
                                                optionsValue: $data,
                                                value: SelectedGlCode,
                                                optionsCaption: "------छान्नुहोस्------", event:{ change: $data.GetGLCodeSubsidary }'>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" id="subsidiarys" data-bind="visible: hasSubs()">
                    <div class="col-md-2">
                        Subsidiary Name
                    </div>
                    <div class="dropdown col-md-3 margin-left-0">
                        <select id="selSubsidiary" class="dropdown-select" data-bind='options: GLCodeSubsidarysLst, 
                                                    optionsText: "AccName",
                                                    optionsValue:$data,
                                                    value:SelectedGLCodeSubsidary, 
                                                    optionsCaption:"-----छान्नुहोस्-----"'>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row" id="divFromDateToDate">
                <div class="col-md-12 ">
                    <div class="col-md-2">
                        From Date <span class="mandatory">*</span>
                    </div>
                    <div class="col-md-3 padding-left-0">
                        <input type="text" id="txtFromDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
                            class="form-control" data-bind='value: FromDate , event:{ blur:ValidateDate }' />
                    </div>
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-2">
                        To Date <span class="mandatory">*</span>
                    </div>
                    <div class="col-md-3 padding-left-0">
                        <input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
                            class="form-control" data-bind='value: ToDate , event:{ blur:ValidateDate }' />
                    </div>
                </div>
            </div>
            <div class="row" id="divYearMonth">
                <div class="col-md-12">
                    <div class="col-md-2">
                        Year:<span class="mandatory">*</span>
                    </div>
                    <div class="col-md-3 padding-left-0">
                        <input type="text" id="txtYear" maxlength="4" data-bind="value:Year" placeholder="YYYY"
                            class='required form-control' onfocus="UnicodeFocus(event,this);" />
                        <%--onkeypress="return isNumberKey(event)"--%>
                    </div>
                    <div class="col-md-1">
                    </div>
                    <div class='col-md-2'>
                        Month:<span class="mandatory">*</span>
                    </div>
                    <div class="col-md-3 dropdown margin-left-0">
                        <select id="selMonth" class="dropdown-select" data-bind='options: Months, optionsText: "MonthName",
                    optionsValue: $data, value:SelectedMonth, 
                    optionsCaption:"------छान्नुहोस्-------" '>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row" id="divUptoDate">
                <div class="col-md-12 ">
                    <div class="col-md-2">
                        Upto Date <span class="mandatory">*</span>
                    </div>
                    <div class="col-md-3 padding-left-0">
                        <input type="text" id="txtUpToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
                            class="form-control" data-bind='value: ToDate , event:{ blur:ValidateDate }' />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div class="row">
                <div class="col-md-8">
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary" data-bind="click:ViewReport">
                        View Report</button>
                    <button class="btn btn-primary" data-bind="click:Cancel">
                        Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <script src="../../../Scripts/REPORTING/ACCOUNT/AccountLedger.js" type="text/javascript"></script>
</asp:Content>
