<%@ Page Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BudgetItemSetup.aspx.cs" Inherits="HRFA.Modules.FAMS.BudgetItemSetup" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="wrapper row">
<div class="col-md-12">
<h3 class="margin-top-15 margin-left-25"> बजेट शीर्षकको विवरणको सेटअप</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
<legend><label>बजेट शीर्षकको सूची</label></legend>   
   
<div class="row">
<div class="col-md-3">

<select id="lstLeaveType" class="form-control" style="min-height:270px; width:100%;" multiple="multiple"
             data-bind="options:BudgetItems, optionsText:'BudgetItemName', optionsValue:'BudgetItemID', 
             optionsCaption: '------छान्नुहोस्-------', value: SelectedBudgetItem , event:{ change: BudgetItemDetails }">
</select>
        </div>

        <div class="col-md-9">
            <div class="row">

                 <div class="col-md-3">
     बजेट शीर्षकको नाम <span class="mandatory">*</span>
    </div>
    <div class="col-md-5 padding-left-0">
    <input type="text" id="txtBudgetItem" 
                            data-bind="value:BudgetItemName" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%>
                            oninput="convert_to_unicode(this)"
                             />
    </div><div class="col-md-4 pull-right ">
            <button class="btn btn-primary" id="btnSave" data-bind="click:SaveBudgetItem">Submit</button>
            <button class="btn btn-primary" id="btnCancel" data-bind="click:CancelBudgetItem">Cancel</button>
        </div>
            </div>
    </div>

            <br />
        <div class="col-md-9">
            <div class="row">

                 <div class="col-md-3">
बजेट शीर्षकको नाम अंग्रेजीमा 
    </div>
    <div class="col-md-5 padding-left-0">
    <input type="text" id="Text1" data-bind="value:BudgetItemEng" class='required form-control'"/>
    </div>
            </div>
    </div>

    <br />
    <br />


    <div class="row">
        <div class="col-md-6">
            
        </div>
        
    </div>
    </div>
     
</form>
</div>
    </div>

    <script src="../../Scripts/FAMS/BudgetItem.js" type="text/javascript"></script>

</asp:Content>

