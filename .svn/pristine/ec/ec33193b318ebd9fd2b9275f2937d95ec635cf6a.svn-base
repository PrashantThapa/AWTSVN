<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="PurchaseOrder.aspx.cs" Inherits="HRFA.Modules.FAMS.PurchaseOrder" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="wrapper row">
<div class="col-md-12">
<h3 class="margin-top-15 margin-left-25">खरिद अर्डर </h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
   <div class="row">
    <div class="col-md-2">खरिद मिति <span class="mandatory">*</span></div>
    <div class="col-md-2 padding-left-0">
                        <input type="text" id="txtPurchaseDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                            placeholder="YYYY.MM.DD"
                             
                         data-bind="value:PurchaseDate"/>
                        </div>
    <div class="col-md-2">
        विक्रेता <span class="mandatory">*</span>
        </div>
    <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlVendor"   class="dropdown-select" 
                    data-bind='options: Vendors, optionsText: "VendorName",
                    optionsValue: $data, value:SelectedVendor, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>
    <div class="col-md-2">
        आइटम <span class="mandatory">*</span>
        </div>
    <div class="col-md-2 one-seventy margin-left-0 dropdown">
    <select id="ddlItem"   class="dropdown-select" 
                    data-bind='options: Items, optionsText: "ItemDesc",
                    optionsValue: $data, value:SelectedItem, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>    
   </div>
   <div class="row">
        <div class="col-md-2">
    मात्रा <span class="mandatory">*</span>
    </div>
        <div class="col-md-2 padding-left-0">
    <input type="text" id="txtQuantity" 
                            data-bind="value:Quantity" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onfocus="UnicodeFocus(event,this);" 
                             />
    </div>
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
    </div>

    

    <div class="row">
        <div class="col-md-1 pull-right">
            <button id="btnAddPurchaseOrder" class="btn btn-primary" data-bind="click: AddPurchaseOrder">
                Add
            </button>
           
        </div>
    </div>

    <br />

    
    <div class="row">
        <div class="col-md-12">
        <div class="table-responsive">
        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                <tr>
                    <th>आइटम </th>
                    <th>मात्रा</th>
                    <th>एकाइ</th>
                    <th>दर</th>
                    <th>रकम</th>
                    <th>Action</th>
                </tr>
                            
            <tbody data-bind="foreach:PurchaseOrders">
                <tr>
                   <td data-bind="text: Item().ItemDesc"></td>
                   <td data-bind="text: Quantity"></td>
                   <td data-bind="text: Unit().UnitDesc"></td>
                   <td data-bind="text: UnitPrice"></td>
                   <td data-bind="text: Amount"></td>
                    <td>
                    <a data-bind="click: $root.EditPurchaseOrder"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                    <a data-bind="click: $root.DeletePurchaseOrder"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                    </td>
                                   
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </div>

<br /><br />

    <div class="row">

        <div class="col-md-2 pull-right">
            <button id="SubmitPUrchaseOrder" class="btn btn-primary" data-bind="click: SubmitPurchaseOrder">
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
    <script src="../../Scripts/FAMS/PurchaseOrder.js" type="text/javascript"></script>
</asp:Content>
