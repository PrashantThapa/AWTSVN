<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="FunctionUnitExpReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.ACCOUNT.FunctionUnitExpReport" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="wrapper row">
        <div class="col-md-12">
            <h3 class=" margin-top-15 margin-left-25">
                Expenditure Ledger</h3>
            <form class="form-horizontal" runat="server" id="Form1" role="form">
            <div class="row">
                <div class="col-md-3">
                    कार्यालय <span class="mandatory">*</span>
                </div>

                <div class='col-md-3'>
                    लागत केन्द्र
                </div>

                <div class="col-lg-2">
                    वर्ष <span class="mandatory">*</span>
                </div>

                <div class="col-lg-2">
                    महिना <span class="mandatory">*</span>
                </div>

                <%--<div class="col-lg-2">
                    अवधि देखि  <span class="mandatory">*</span>
                </div>

                <div class="col-lg-2">
                    अवधि सम्म <span class="mandatory">*</span>
                </div>--%>
            </div>
            <div class="row">
            <div class='col-md-3'>
                <div class="dropdown margin-left-0">
                    <select id="ddlOffice" class="dropdown-select" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue: $data, value:SelectedOffice, 
                    optionsCaption:"------छान्नुहोस्-------", event:{ change: $data.GetCostCenter } '>
                    </select>
                </div>
                </div>
                        <div class="col-md-3">
                            <div class="dropdown margin-left-0">
                                <select id="Select2" class="dropdown-select" data-bind='options:CostCenters, 
                            optionsText: "CostCenterName",
                            optionsValue:$data,
                            value:SelectedCostCenter, 
                            optionsCaption:"------छान्नुहोस्-------"'>
                                    <%-- optionsCaption:"------छान्नुहोस्-------", event:{ change: $data.GetACChartWithOfficeCostcenter }'><%--, event:{ change: $data.GetACChart }--%>--%>
                                </select>
                            </div>
                        </div>
                <div class="col-md-2">
                    <input type="text" id="txtYear" maxlength="8" data-bind="value:Year" class='required form-control'
                        onfocus="UnicodeFocus(event,this);" />
                    <%--onkeypress="return isNumberKey(event)"--%>
                </div>
                <div class='col-md-2'>
                    <div class="margin-left-0 dropdown">
                        <select id="ddlMonth" class="dropdown-select" data-bind='options: Months, optionsText: "MonthName",
                    optionsValue: $data, value:SelectedMonth, 
                    optionsCaption:"------छान्नुहोस्-------" '>
                        </select>
                    </div>
                </div>


               <%--<div class="col-md-2">
                    <input type="text" id="txtFromDate"  onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);" class="form-control" 
                             data-bind='value: FromDate'
                        />
                </div>
                <div class='col-md-2'>
                <div class="margin-left-0 dropdown">
                    <input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);" class="form-control"
                             data-bind='value: ToDate'
                        />
                </div>
                </div>--%>



                <div class="col-md-2">
                <button class="btn btn-primary" id="btnPrint" data-bind="click: PrintFunctionUnit">
                        Print</button>

                    <button class="btn btn-primary" id="btnGenerate" data-bind="click: ClearControls">
                        Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <script src="../../../Scripts/REPORTING/ACCOUNT/FunctionUnitExpReport.js" type="text/javascript"></script>
</asp:Content>
