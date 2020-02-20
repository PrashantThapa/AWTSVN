<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="IncomeStatement.aspx.cs" Inherits="HRFA.Modules.REPORTING.ACCOUNT.IncomeStatement" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="wrapper">
<div class="col-md-10">
<h3 class="margin-top-15 margin-left-25">Income Statement</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
<div class="row">
<div class="col-md-12 ">
<div class="col-md-2">
Office <span class="mandatory">*</span>
</div>
<div class="col-md-3 dropdown margin-left-0">
<select id="lstOffice" class="dropdown-select" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:'OfficeCode',value: SelectedOffice,event:{ change: GetCostCenter }">
</select>

    </div>
    <div class="col-md-1"></div>
    <div class="col-md-2">
Cost Center
</div>
    <div class="col-md-3  dropdown margin-left-0" >
         

                    <select id="Select2" class="dropdown-select" data-bind='options:CostCenters, 
                            optionsText: "CostCenterName",
                            optionsValue:"CostCenterID",
                            value:SelectedCostCenter, 
                            optionsCaption:"------छान्नुहोस्-------", event:{ change: $data.GetACChart }'>
                        </select>
                </div>
                </div>
                </div>
                <div class="row">
                <div class="col-md-12 ">
                <div class="col-md-2">
From Date <span class="mandatory">*</span>
</div>
 <div  class="col-md-3 padding-left-0">
         
        <input type="text" id="txtFromDate"  onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);" class="form-control" 
                             data-bind='value: FromDate , event:{ blur:ValidateDate }'
                        />
                   
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-2">
To Date <span class="mandatory">*</span>
</div>
 <div  class="col-md-3 padding-left-0">
         
        <input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);" class="form-control" 
                            data-bind='value: ToDate , event:{ blur:ValidateDate }'
                        />
                   
                </div>
                </div>
                </div>
                <div class="row">
                <div class="col-md-8"></div>
<div class="col-md-3">
        <button class="btn btn-primary" data-bind="click:ViewReport">View Report</button> <button class="btn btn-primary" data-bind="click:Cancel">Cancel</button>
        
    </div>
    
    </div>
  
</form>
</div>
</div>
    <script src="../../../Scripts/REPORTING/ACCOUNT/IncomeStatement.js" type="text/javascript"></script>
</asp:Content>
