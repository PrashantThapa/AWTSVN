<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BlanketPurchase.aspx.cs" Inherits="HRFA.Modules.FAMS.BlanketPurchase" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="wrapper row">
<div class="col-md-12">
<h3 class=" margin-top-15 margin-left-25">Blanket Purchase</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">

   <div class="row">
    <div class="col-md-2">सम्झौता मिति <span class="mandatory">*</span></div>
    <div class="col-md-2 padding-left-0">
                        <input type="text" id="txtAgreementDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                            placeholder="YYYY.MM.DD"
                             
                         data-bind="value:AgreementDate"/>
                        </div>
    <div class="col-md-2">सम्झौता वर्ष <span class="mandatory">*</span></div>
    <div class="col-md-1 padding-left-0">
    <input type="text" id="txtAgreementYear" class='required form-control' 
        onkeypress="return isNumberKey(event)"
        data-bind="value:AgreementYear"/>
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
         <div class="col-md-2">
        आइटम <span class="mandatory">*</span>
        </div>
         <div class="col-md-2 margin-left-0 dropdown">
    <select id="ddlItem"   class="dropdown-select" 
                    data-bind='options: Items, optionsText: "ItemDesc",
                    optionsValue: $data, value:SelectedItem, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
    
    </div>
         <div class="col-md-2" align="center">
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
        <div class="col-md-1 pull-right">
            <button id="btnAddBlanketPurchase" class="btn btn-primary" data-bind="click: AddBlanketPurchase">
                Add
            </button>
           
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
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
                    <th>Action</th>
                </tr>
                            
            <tbody data-bind="foreach:BlanketPurchases">
                <tr>
                   <td data-bind="text: Item().ItemDesc"></td>
                   <td data-bind="text: Quantity"></td>
                   <td data-bind="text: Unit().UnitDesc"></td>
                   <td data-bind="text: UnitPrice"></td>
                    <td>
                    <a data-bind="click: $root.EditBlanketPurchase"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                    <a data-bind="click: $root.DeleteBlanketPurchase"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                    </td>
                                   
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </div>


        <br />


    <div class="row">
        
        <div class="col-md-2 pull-right">
            <button id="SubmitPUrchaseOrder" class="btn btn-primary" data-bind="click: SubmitBlanketPurchase">
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
    <script src="../../Scripts/FAMS/BlanketPurchase.js" type="text/javascript"></script>
</asp:Content>
