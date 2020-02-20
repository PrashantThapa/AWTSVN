<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BudgetReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.FAMS.BudgetReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="wrapper row" id="ResignationForm">
        <div class="col-md-12">
            <h3 class=" margin-top-15 margin-left-25">
                बजेटको रिपोर्ट</h3>
            <form class="form-horizontal" runat="server" id="Form1" role="form">
            <div class="row">
                <div class="col-md-12">
                <div class="row">
                    <div class="col-lg-4" id="Div5">
                            आर्थिक वर्ष <span class="mandatory">*</span>
                        </div>
                         <div class="col-lg-4" id="Office">
                            कार्यालय <span class="mandatory">*</span>
                        </div>
                        <div class="col-lg-4" id="Div9">
                            लागत केन्द्र <span class="mandatory">*</span>
                        </div>
                         <div class="col-md-3" id="DivIncomeLabel"  style=" margin-left:10px;">
                                आमदनिको प्रकार <span class="mandatory"></span></div>

                        </div>

                    <div class="row">
                        <div class="col-md-3 dropdown" id="div6">
                            <select id="Select3" class="dropdown-select" data-bind="options:FiscalYears,
                             optionsText:'FiscalYearName', optionsValue:'FiscalYearName',optionsCaption:'------छान्नुहोस्-------', value: SelectedFiscalYear">
                                </select>
                        </div>
                       <div class="col-md-1"></div>
                        <div class="col-md-3 margin-left-0 dropdown" id="divOffice">
                            <select id="ddlOffice" class="dropdown-select" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue:"OfficeCode" , value:SelectedOffice, 
                    optionsCaption:"------छान्नुहोस्-------",  event: {change: GetCostCenter}'>
                            </select>
                        </div>
                        <div class="col-md-1"></div>
                        <%--<div class="col-md-3 margin-left-0 dropdown" id="divCostCenter">
                            <select id="Select5" class="dropdown-select" data-bind='options: CostCenters, optionsText: "CostCenterName",
                    optionsValue:"CostCenterID" , value:SelectedCostCenter,event:{ change: ShowIncomeType  },
                    optionsCaption:"------छान्नुहोस्-------"'>
                            </select>
                        </div>--%>


                         <div class="col-md-3 one-seventy dropdown">
                                <select id="Select2" class="dropdown-select" data-bind="options:CostCenters, optionsText:'CostCenterName', optionsValue:'CostCenterID',optionsCaption:'------छान्नुहोस्-------', value: SelectedCostCenter,event:{ change: ShowIncomeType  }">
                                </select>
                            </div>

                        <div class="col-md-3 one-seventy dropdown" id="DivIncomeLst" >
                                <select id="Select4" class="dropdown-select" data-bind="options:IncomeTypes, optionsText:'IncomeTypeName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedIncomeType">
                                </select>
                            </div>
                        
                       
                    </div>
                    <div class="row">
                         <div class="col-md-2" id="Div2">
                            रेपोर्ट प्रकार <span class="mandatory">*</span>
                        </div>
                    </div>
                    <div class="row">
                     <div class="col-md-12">
                     <div class="col-md-3 margin-left-0 dropdown" id="div1">
                            <select id="Select1" class="dropdown-select" data-bind='options: ReportTypes, optionsText: "ReportTypeName",
                    optionsValue:"ReportTypeID" , value:SelectedReportType, 
                    optionsCaption:"------छान्नुहोस्-------"'>
                            </select>
                        </div>
                        <div class="col-md-3"></div>
                    <div class="col-md-4">
                            <button class="btn btn-primary" id="btnView" data-bind="click: ViewReport">
                                View Report</button>
                           
                            <button class="btn btn-primary" id="btnCancel" data-bind="click: CancelReport">
                                Cancel</button>
                        </div>
                        </div>
                        </div>
            </div>
           </div>
        </form>
  </div>
</div>
<script src="../../../Scripts/REPORTING/FAMS/BudgetReport.js" type="text/javascript"></script>
</asp:Content>
