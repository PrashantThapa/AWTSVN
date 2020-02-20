<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="PostWiseLeaveType.aspx.cs" Inherits="HRFA.Modules.WFMS.PostWiseLeaveType" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="row">
<div class="col-md-12">
<h3 class="margin-top-15 margin-left-25">पद अनुसार बिदाको  प्रकार</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
<div class="row">
<div class="col-md-12 ">
    <div class="col-md-4">
    
        <legend><label >कार्यालय <span class="mandatory">*</span></label></legend>
<label class="col-md-12 col-xs-12 col-sm-12 control-label text-top" for="textinput">
<select id="lstOffice" class="form-control" style="min-height:270px; width:100%;" multiple="multiple" data-bind="options:OfficeLST, optionsText:'OfficeNameNep',optionsCaption:'----कार्यालय छान्नुहोस्----',optionsValue:'OfficeCode',selectedOptions: chosenOffice, value: SelectedOffice,event:{ change: GetPost }">
</select>
<%----%>
</label>
    </div>
    <div class="col-md-3">
        <legend><label >पद <span class="mandatory">*</span></label></legend>
<label class="col-md-12 col-xs-12 col-sm-12 control-label text-top" for="textinput">
<select id="lstPost" class="form-control" style="min-height:270px; width:100%;" multiple="multiple" data-bind="options:PostsLST, optionsText:'PostDesc',optionsCaption:'----पद छान्नुहोस्----', optionsValue:$data, value: SelectedPost,event:{ change: ClearLeave }">
</select> 

<%--,event:{ change: GetLeave }--%>
</label>
    </div>
    <div class="col-md-3">
        <legend><label >बिदा प्रकार <span class="mandatory">*</span></label></legend>
<label class="col-md-12 col-xs-12 col-sm-12 control-label text-top" for="textinput">
<select id="lstLeave" class="form-control" style="min-height:270px; width:100%;" multiple="multiple" data-bind="options:LeaveLST, optionsText:'LeaveTypeName',optionsCaption:'----बिदा प्रकार छान्नुहोस्----', optionsValue:'LeaveTypeID', value: SelectedLeave">
</select>
</label>
    </div>
    </div>
    <div class="col-md-12 clear"><br /><br /></div>
    <div class="col-md-12 clear">
    
    <div class="col-md-2 ">अवधि प्रकार <span class="mandatory">*</span></div>
    <div class="col-md-3 one-seventy dropdown margin-left-0">
    <select id="txtPeriodType" class="dropdown-select "  data-bind="options:PeriodTypeLst, optionsCaption:'----छान्नुहोस्----', optionsText:'PeriodTypeText', optionsValue:'PeriodTypeID', value: SelectedPeriodType">
   <%-- <option value="1">वार्षिक</option>
    <option value="2">मासिक</option>
    <option value="3">सेवा अवधि</option>--%>
    </select>
    </div>
    
    
    
     
    <div class="col-md-2">अवधि समय <span class="mandatory">*</span></div>
    <div class="col-md-3 padding-left-0">
     <input type="text" id="txtPost_Time" 
                            data-bind="value:Post_Time" class='required form-control' 
                            onkeypress=" return isNumberKey(event);" 
                           
                             />
    </div>
    
    </div>
   
   <div class="col-md-12 clear">
    <div class="col-md-2"><%--अक्रूअल--%>सन्चित  छ </div>
    <div class="col-md-3 one-seventy padding-left-0">
     <input type="checkbox" id="txtIsAccural" 
                            data-bind="checked:IsAccural,event:{ change: $root.ToggletoADD}" value="Y"  />
    </div>
    
    
    
   
    <div class="col-md-2">अधिकतम सन्चित दिन </div>
    <div class="col-md-3 padding-left-0">
     <input type="text" id="txtMaxAccrualDays" 
                            data-bind="value:MaxAccrualDays,attr:{'disabled':isDisabled}" class='required form-control' 
                            onkeypress=" return isNumberKey(event);" 
                             />
    </div>
    <div class="col-md-3">
        <button class="btn btn-primary" data-bind="click:SaveLeave">Submit</button>
        <button class="btn btn-primary"  data-bind="click:CancelLeave">Cancel</button>
    </div>
    </div>
   </div>
    </div>
    </div>
     <div class="row margin-top-25">
    <div class="col-md-7">
    </div>
    
    </div>
     </form>
    
   
</div>
</div>



</form>
</div>
</div>
    <script src="../../Scripts/COMMON/PostwiseLeaveType.js" type="text/javascript"></script>
    
</asp:Content>
