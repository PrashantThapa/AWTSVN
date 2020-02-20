<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BlanketPurchaseOrder.aspx.cs" Inherits="HRFA.Modules.FAMS.BlanketPurchaseOrder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script>
    function highlightRow() {
        var trInstance = $('#tblModule').find('tbody>tr');
        trInstance.click(function () {
            $('#tblModule >tbody>tr').removeClass('redCSS');
            var instance = $(this);
            instance.addClass('redCSS');
        });
    }
</script>
<style>
    .redCSS
        {
            background: #48ADFB !important;
        }
        .redCSS td
        {
            background: #48ADFB !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="wrapper row">
<div class="col-md-12">
<h3 class=" margin-top-15 margin-left-25">Blanket Purchase Order</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
    
      <div class="row">
        <div class="col-md-12">
        <div class="table-responsive">
        <table class="table-bordered table-condensed table-striped sort col-lg-12" id="tblModule">
                            
                <tr>
                    <th>विक्रेता</th>
                    <th>आइटम </th>
                    <th>अर्डर मात्रा</th>
                    <th>प्राप्त मात्रा</th>
                    <th>Action</th>
                </tr>
                            
            <tbody data-bind="foreach:BlanketPurchases">
                <tr data-bind="click: $root.SelectBlanketPurchaseOrder" onclick="highlightRow()">
                    <td data-bind="text: Vendor().VendorName"></td>
                   <td data-bind="text: Item().ItemDesc"></td>
                   <td data-bind="text: Quantity"></td>
                   <td data-bind="text: QuantityRecieved"></td>
                    <td>
                    <a><span class="glyphicon glyphicon-circle-arrow-right" title="Edit" ></span></a>
                    </td>
                                   
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </div>


        <br />

   <div class="row">
    <div class="col-md-2">खरिद मिति <span class="mandatory">*</span></div>
                        <div class="col-md-2 padding-left-0">
                        <input type="text" id="txtPurchaseDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                            placeholder="YYYY.MM.DD"
                             
                         data-bind="value:PurchaseDate"/>
                        </div>
   </div>

   <div class="row">
         <div class="col-lg-2">
        विक्रेता <span class="mandatory">*</span>
        </div>
        <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlVendor"   class="dropdown-select" 
                    data-bind='options: Vendors, optionsText: "VendorName",
                    optionsValue: $data, value:SelectedVendor, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>

     <div class="col-lg-2">
        आइटम <span class="mandatory">*</span>
        </div>
        <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlItem"   class="dropdown-select" 
                    data-bind='options: Items, optionsText: "ItemDesc",
                    optionsValue: $data, value:SelectedItem, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div><div class="col-md-2">
    मात्रा <span class="mandatory">*</span>
    </div>
    <div class="col-md-2 padding-left-0">
    <input type="text" id="txtQuantity" 
                            data-bind="value:Quantity" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onfocus="UnicodeFocus(event,this);" 
                             />
    </div>
   </div>

    <div class="row">
        <div class="col-lg-2">
        एकाइ <span class="mandatory">*</span>
        </div>
        <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlUnit"   class="dropdown-select" 
                    data-bind='options: Units, optionsText: "UnitDesc",
                    optionsValue: $data, value:SelectedUnit, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>

    <div class="col-md-2">
    एकाइ मूल्य <span class="mandatory">*</span>
    </div>
    <div class="col-md-2 padding-left-0">
    <input type="text" id="txtUnitPrice" 
                            data-bind="value:UnitPrice" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onfocus="UnicodeFocus(event,this);" 
                             />
    </div>
<div class="col-md-2">
            <button id="SubmitBlanketPurchaseOrder" class="btn btn-primary" data-bind="click: SubmitBlanketPurchaseOrder">
                Submit
            </button>
            <button class="btn btn-primary" data-bind="click: ClearControls">
                Cancel
            </button>
        </div>
    </div>

   


    <div class="row">
        <div class="col-md-6">
        </div>
        
    </div>

    
</form>
</div>
</div>
    <script src="../../Scripts/FAMS/BlanketPurchaseOrder.js" type="text/javascript"></script>
</asp:Content>
