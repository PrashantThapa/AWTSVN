<%@ Page Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="BudgetTransfer.aspx.cs" Inherits="HRFA.Modules.FAMS.BudgetTransfer" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
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
    <div class="wrapper row" id="ResignationForm">
        <div class="col-md-12">
            <h3 class=" margin-top-15 margin-left-25">
                बजेट शीर्षकको ट्रांसफर</h3>
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
                        </div>

                    <div class="row">
                        <div class="col-md-3 dropdown" id="div6">
                            <select id="Select3" class="dropdown-select" data-bind="options:FiscalYears,
                             optionsText:'FiscalYearName', optionsValue:'FiscalYearName',optionsCaption:'------छान्नुहोस्-------', value: SelectedFiscalYear,event: {change: ClearDetail}">
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
                        <div class="col-md-3 margin-left-0 dropdown" id="divCostCenter">
                            <select id="Select5" class="dropdown-select" data-bind='options: CostCenters, optionsText: "CostCenterName",
                    optionsValue:"CostCenterID" , value:SelectedCostCenter, 
                    optionsCaption:"------छान्नुहोस्-------" ,event: {change: ClearDetail}'>
                            </select>
                        </div>
                        
                       
                    </div>

                    <div class="row">
                        <div class="col-md-10"></div>
                         <div class="col-md-2">
                            <button id="btnSearch" class="btn btn-primary" data-bind="click: SearchApproved">Search</button>
                         </div>
                    </div>
                   
                    <div class="row">
                        <div class="col-lg-8 margin-top-15">
                            <table class="dataTable table table-bordered table-condensed table-striped sort"
                                id="tblModule">
                                <thead>
                                   
                                    <th>
                                        बजेट शीर्षक
                                    </th>
                                    <th>
                                        रकम अनुमोदन
                                    </th>
                                    <th class="hidden">
                                        Action
                                    </th>
                                </thead>
                                <tbody data-bind="foreach: BudgetReleaseLsts">
                                    <tr data-bind="click: $root.GetBudgetDetails" style="cursor: pointer;" onclick="highlightRow()">
                                      
                                        <td>
                                            <span data-bind="text:BudgetItemDesc" />
                                        </td>
                                        <td>
                                            <span data-bind="text:Amount" />
                                        </td>
                                        <td class="mytd hidden" style="text-align: center">
                                            <img class="PopupTransaction bout" src="/Images/select.png" title="Select" height="20px"
                                                width="20px" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <br />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2" id="Div3">
                            स्थानान्तरण कार्यालय <span class="mandatory">*</span>
                        </div>
                        <div class="col-md-3 margin-left-0 dropdown" id="div4">
                            <select id="Select2" class="dropdown-select" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue:"OfficeCode" , value:SelectedTransferOffice, 
                    optionsCaption:"------छान्नुहोस्-------",  event: {change: GetTCostCenter}'>
                            </select>
                        </div>
                        <div class="col-md-2" id="Div7">
                           स्थानान्तरण लागत केन्द्र <span class="mandatory">*</span>
                        </div>
                        <div class="col-md-3 margin-left-0 dropdown" id="div8">
                            <select id="Select4" class="dropdown-select" data-bind='options: TCostCenters, optionsText: "CostCenterName",
                    optionsValue:"CostCenterID" , value:SelectedTCostCenterTo, 
                    optionsCaption:"------छान्नुहोस्-------",  event: {change: GetBudgetItem} '>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2" id="Div1">
                            बजेट शीर्षकमा <span class="mandatory">*</span>
                        </div>
                        <div class="col-md-3 margin-left-0 dropdown" id="div2">
                            <select id="Select1" class="dropdown-select" data-bind='options: BudgetItems, optionsText: "BudgetItemName",
                    optionsValue:"BudgetItemID" , value:SelectedToBudgetItem, 
                    optionsCaption:"------छान्नुहोस्-------" '>
                            </select>
                        </div>
                        <%--<div class="col-lg-2" id="Div10">
                            कार्यमा
                        </div>
                        <div class="col-md-3 margin-left-0 dropdown" id="div11">
                            <select id="Select6" class="dropdown-select" data-bind='options: Jobs, optionsText: "JobDesc",
                    optionsValue:"JobID" , value:SelectedJobTo, 
                    optionsCaption:"------छान्नुहोस्-------" '>
                            </select>
                        </div>--%>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            रकम <span class="mandatory">*</span>
                        </div>
                        <div class="col-md-3 padding-left-0">
                            <input type="text" id="txtAmount" data-bind="value:TransferAmount" class='required form-control'
                                 onkeypress="return isNumberKey(event)" />
                        </div>
                        <div class="col-lg-2">
                            मिति <span class="mandatory">*</span>
                        </div>
                        <div class="col-md-2 padding-left-0">
                            <input type="text" id="txtDate" data-bind="value:TransferDate" class='required form-control'
                                placeholder="YYYY.MM.DD" onkeypress="return isNumberKey(event)" onblur="return valFutureDate(this,'Y',true);" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            कैफियत</div>
                        <div class="col-md-5 padding-left-0">
                            <textarea id="txtRemark" class="required form-control" 
<%--                                 onkeypress="UnicodeKeyPress(event,this);"
                                onkeyup="UnicodeKeyUp(event,this);"
                                 onchange="UnicodeChange(event,this);" 
                                 onfocus="UnicodeFocus(event,this);"--%>
                                  oninput="convert_to_unicode(this)"
                                 data-bind="value:Remarks"></textarea>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-5 ">
                            <button class="btn btn-primary" id="btnSave" data-bind="click: SaveBudgetTransfer">
                                Save</button>
                            <button class="btn btn-primary" id="btnSubmit" data-bind="click: SubmitBudgetTransfer">
                                Submit</button>
                            <button class="btn btn-primary" id="btnCancel" data-bind="click: CancelBudgetTransfer">
                                Cancel</button>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
    <script src="../../Scripts/FAMS/BudgetTransfer.js" type="text/javascript"></script>
</asp:Content>
