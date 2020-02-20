<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="VendorRegistration.aspx.cs" Inherits="HRFA.Modules.FAMS.VendorRegistration" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class=" wrapper row">
<div class="col-md-12">
<h3 class="margin-top-15 margin-left-25">विक्रेता दर्ता</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
    <div class="row">
        <div class="col-md-2">
        प्रकार <span class="mandatory">*</span>
        </div>
        <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlType"   class="dropdown-select" 
                    data-bind='options: Types, optionsText: "TypeName",
                    optionsValue: $data, value:SelectedType, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>
        <div class="col-md-2">
        वर्ग <span class="mandatory">*</span>
        </div>
        <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlCategory"   class="dropdown-select" 
                    data-bind='options: Categories, optionsText: "CategoryDesc",
                    optionsValue: $data, value:SelectedCategory, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>
        <div class="col-md-2">
    नाम <span class="mandatory">*</span>
    </div>
        <div class="col-md-2 padding-left-0">
    <input type="text" id="txtName" 
                            data-bind="value:Name" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%> 
                             oninput="convert_to_unicode(this)"
                             />
    </div>
    </div>
    <div class="row">
    <div class="col-md-2">
    ठेगाना 
    </div>
    <div class="col-md-2 padding-left-0">
    <input type="text" id="txtAddress" 
                            data-bind="value:Address" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%> 
                             oninput="convert_to_unicode(this)"
                             />
    </div>
    <div class="col-md-2">
    इमेल 
    </div>
    <div class="col-md-2 padding-left-0">
    <input type="text" id="txtEmail" 
                            data-bind="value:Email" class='required form-control' 
                             />
    </div>
    <div class="col-md-2">
    सम्पर्क न. 
    </div>
    <div class="col-md-2 padding-left-0">
    <input type="text" id="txtContactNo" 
                            data-bind="value:ContactNo" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onfocus="UnicodeFocus(event,this);" 
                             />
    </div>
    </div>
    <div class="row">
    <div class="col-md-2">
    सम्पर्क व्यक्तिको नाम
    </div>
    <div class="col-md-2 padding-left-0">
    <input type="text" id="txtContactPerson" 
                            data-bind="value:ContactPerson" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);" --%>
                             oninput="convert_to_unicode(this)"
                             />
    </div>
    <div class="col-md-2">
            <button class="btn btn-primary" data-bind="click: SubmitVendor">
                Submit
            </button>
            <button class="btn btn-primary" data-bind="click: ClearControls">
                Cancel
            </button>
        </div>
    </div>



    

    
</form>
</div>
</div>
    <script src="../../Scripts/FAMS/VendorRegistration.js" type="text/javascript"></script>
</asp:Content>
