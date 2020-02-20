<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BranchTrialBalance.aspx.cs" Inherits="HRFA.Modules.REPORTING.ACCOUNT.BranchTrialBalance" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="wrapper">
<div class="col-md-10">
<h3 class="margin-top-15 margin-left-25">Expense/Income Branch Trial Report</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
<div class="row">

<div class="col-md-2">
Report Type <span class="mandatory">*</span>
</div>
<div class="col-md-3 dropdown">
                        <select id="ddlVoucherType" class="dropdown-select" data-bind="options:VoucherTypes,
                         optionsText: 'VoucherTypeName', optionsValue:'VoucherTypeID',value:SelectedVoucherType,
                          optionsCaption:'------छान्नुहोस्-------'">
                        </select>
                    </div>
<div class="col-md-2">
Office <span class="mandatory">*</span>
</div>
<div class="col-md-3 dropdown padding-left-0">
<select id="lstOffice" class="dropdown-select" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:'OfficeCode',value: SelectedOffice">
</select>

    </div>
   
   <div class="col-md-1"></div>

                <div class="col-md-12 ">


<div class="col-md-1"></div>
                <div class="col-md-2">
Up To Date <span class="mandatory">*</span>
</div>
 <div  class="col-md-3">
         
        <input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);" class="form-control"
                             data-bind='value: ToDate'
                        />
                   
                </div>
                </div>

                <br />
                <br />

                <div class="row">
                <div class="col-md-8"></div>
<div class="col-md-3">
        <button class="btn btn-primary" data-bind="click:ViewReport">View Report</button> 
        <button class="btn btn-primary" data-bind="click:Cancel">Cancel</button>
        
    </div>
    
    </div>
  
</form>
</div>
</div>
    <script src="../../../Scripts/REPORTING/ACCOUNT/BranchTrialBalance.js" type="text/javascript"></script>
</asp:Content>
