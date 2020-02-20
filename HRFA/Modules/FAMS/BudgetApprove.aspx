<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BudgetApprove.aspx.cs" Inherits="HRFA.Modules.FAMS.BudgetApprove" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="wrapper">
        <div class="col-md-12">
            <h3 class="margin-top-15 margin-left-25">
                बजेट शीर्षकको स्वीकृत
            </h3>
            <form class="form-horizontal" runat="server" id="Form1" role="form">
            <div id="toggle">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-2">
                                Submission No <span class="mandatory">*</span>
                            </div>
                            <div class="col-md-3 padding-left-0">
                                <input type="text" id="Text2" data-bind="value:SubmissionNo" class='required form-control'
                                    onkeypress="return isNumberKey(event)" disabled />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 ">
                                आर्थिक वर्ष <span class="mandatory">*</span></div>
                           
                            <div class="col-md-2" style=" margin-left:10px;">
                                कार्यालय <span class="mandatory">*</span></div>
                           
                            <div class="col-md-2 "  style=" margin-left:10px;">
                                लागत केन्द्र <span class="mandatory">*</span></div>
                                <div class="col-md-3" id="DivIncomeLabel"  style=" margin-left:10px;">
                                 <%--आमदनिको प्रकार--%> आमदनि <span class="mandatory"></span></div>
                            
                            <div class="col-md-2 " style=" margin-left:5px;">
                                अनुमोदन गरिएको मिति <span class="mandatory">*</span></div>
                            <div class="col-md-2">
                            </div>
                            
                            <div class="col-md-2 margin-left-15  hidden">
                                बजेट शीर्षक <span class="mandatory">*</span></div>
                            <div class="col-md-1">
                            </div>
                            <div class="col-md-2 margin-left-15 hidden">
                                कार्य <span class="mandatory">*</span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 one-seventy dropdown">
                                
                                <select id="Select3" class="dropdown-select" data-bind="options:FiscalYears, optionsText:'FiscalYearName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedFiscalYear">
                                </select>
                            </div>
                            
                            <div class="col-md-3 one-seventy dropdown">
                                <select id="lstOffice" class="dropdown-select" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:$data, value: SelectedOffice,event:{ change: GetCostCenter  }">
                                </select>
                            </div>
                            
                            <div class="col-md-3 one-seventy dropdown">
                                <select id="Select2" class="dropdown-select" data-bind="options:CostCenters, optionsText:'CostCenterName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedCostCenter,event:{ change: ShowIncomeType  }">
                                </select>
                            </div>
                             <div class="col-md-3 one-seventy dropdown" id="DivIncomeLst" >
                                <select id="Select4" class="dropdown-select" data-bind="options:IncomeTypes, optionsText:'IncomeTypeName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedIncomeType">
                                </select>
                            </div>
                            <div class="col-md-1">
                                <button type="button" id="btnSearch" class="btn btn-warning search" data-bind="click:GetBudgetApprove">
                                    Search</button>
                            </div>

                            
                            
                            <div class="col-md-3 one-seventy">
                                <input type="text" class="form-control" id="txtApproveDate" onkeypress="return isNumberKey(event)"
                                    onblur="return valFutureDate(this,'Y',true);" placeholder="YYYY.MM.DD" data-bind="value:ApproveDate" />
                            </div>
                            
                            <button style=" width:50px; margin-right:15px;" class="btn btn-primary  pull-right" data-bind="click:Print">
                                Print</button> 
                          
                          <div class="col-md-3 one-seventy dropdown hidden">
                                <select id="Select1" class="dropdown-select" data-bind="options:BudgetItems, optionsText:'BudgetItemName',optionsCaption:'------छान्नुहोस्-------', optionsValue: $data, value: SelectedBudgetItem">
                                </select>
                            </div>
                           
                            <div class="col-md-3 one-seventy dropdown hidden">
                                <select id="txtMode" class="dropdown-select" data-bind="options:Jobs, optionsText:'JobDesc',optionsCaption:'------छान्नुहोस्-------', optionsValue: $data, value: SelectedJob">
                                </select></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        
                        <div class="col-md-2 hidden">
                            <input type="text" class="form-control" id="txtAmount" data-bind="value:Amt" onkeypress="return isNumberKey(event)" />
                        </div>
                        
                    </div>
                    <div class="col-md-12">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="dataTable table table-bordered table-condensed table-striped sort">
                        <thead>
                            <tr>
                                <th>
                                    SN.
                                </th>
                                <th class="hidden">
                                    आर्थिक वर्ष
                                </th>
                                <th class="hidden">
                                    कार्यालय
                                </th>
                                <th class="hidden">
                                    लागत केन्द्र
                                </th>
                                 <th>
                                   को.न.
                                </th>
                                <th>
                                    बजेट आईडी
                                </th>
                                <th>
                                    बजेट शीर्षक
                                </th>
                               
                                <th>
                                  अनुरोध रकम
                                </th>
                                <th>
                                   स्वीकृत रकम
                                </th>
                                <th class="hidden">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: BudgetApproveLsts">
                            <tr>
                                <td>
                                    <span data-bind="text: ($index()+1)"></span>
                                </td>
                               
                                <td class="hidden">
                                    <span data-bind="text:Office().OfficeNameNep" />
                                </td>
                                <td class="hidden">
                                    <span data-bind="text:CostCenter().CostCenterName" />
                                </td>
                                <td>
                                    <span data-bind="text:AccountChart().CodeNo" />
                                </td>
                                <td>
                                    <span data-bind="text:AccountChart().AccCode" />
                                </td>
                                <td>
                                    <span data-bind="text:AccountChart().AccName" />
                                </td>
                               
                                <td>
                                    <input type="text" id="txtRequestAmount" class="form-control" data-bind="value: ReqAmount" readonly="true" />
                                </td>
                                <td> 
                                    <input type="text"  id="txtApproveAmount" class="form-control Amounttxt" data-bind="value: ApproveAmount, event: { blur :$root.checkAmount}" />
                                </td>

                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-3 margin-top-25 pull-right">
                    <button class="btn btn-primary  pull-right btnSave" data-bind="click:SaveBudgetApprove" style=" margin-left:10px;">
                        Save</button> 
                    <button class="btn btn-primary  pull-right btnSubmit" data-bind="click:SubmitBudgetApprove" style=" margin-left:10px;">
                        Submit</button> 
                    <button class="btn btn-primary  pull-right" data-bind="click: ClearAll">
                        Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <script src="../../Scripts/FAMS/BudgetApprove.js" type="text/javascript"></script>
</asp:Content>







<%--<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

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
<h3 class=" margin-top-15 margin-left-25">बजेट शीर्षकको अनुमोदन</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
<div class="row">
<div id="toggle">
<div class="col-md-12">
 <div class="row" id="lstOC">
 
<div class="col-md-1">
                        कार्यालय <span class="mandatory">*</span>
                        </div>
<div class="col-md-2 dropdown">
<select id="lstOffice" class="dropdown-select" 
 data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:$data, value: SelectedOffice,event:{ change: GetCostCenter  }">
</select>
                    </div>
<div class="col-md-2">
                    लागत केन्द्र <span class="mandatory">*</span>
                    </div>
<div class="col-md-2 dropdown">
<select id="lstCostCenter" class="dropdown-select"  data-bind="options:CostCenters, optionsText:'CostCenterName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedCostCenter,event:{ change: GetDetails  }">
</select>

                    </div>
</div>
</div>
<br />
<div class="col-lg-12">
                    <table  class="dataTable table table-bordered table-condensed table-striped sort"  id="tblModule">
                        <thead>
                           
                            <th>
                               कार्यालयको नाम
                            </th>
                            <th>
                              लागत केन्द्र 
                            </th>
                            <th>
                            बजेट शीर्षक</th>
                            <th>
                               अनुरोध रकम 
                            </th>
                             <th>
                                अनुरोध मिति 
                            </th>
                            <th class="hidden">JOBID</th>
                             <th  class="hidden">CostID</th>
                                <th>
                                Action
                                </th>
                        </thead>
                     
                  
                          <tbody data-bind="foreach: BudgetApproveLsts">
                            <tr class="mytr" data-bind="click: $root.LoadTrn" onclick="highlightRow()" >
                                <td class="mytd">
                                    <span class="bout" data-bind="text:OfficeNameNep" />
                                </td>
                                <td class="mytd">
                                    <span class="bout" data-bind="text:CostCenterName" />
                                </td class="mytd">
                                <td class="mytd">
                                    <span class="bout" data-bind="text:BudgetItemEng" />
                                </td class="mytd">
                                <td class="mytd">
                                    <span class="bout" data-bind="text:Amount" />
                                </td>
                                <td class="mytd">
                                    <span class="bout" data-bind="text:ReqDate" />
                                </td>
                                <td class="mytd hidden">
                                    <span class="bout" data-bind="text:JobID" />
                                </td>
                                 <td class="mytd hidden">
                                    <span class="bout" data-bind="text:BudgetItemID" />
                                </td>
                               <td class="mytd" style="text-align: center">
                                                <img class="PopupTransaction bout" src="/Images/select.png" 
                                                    title="Select" height="20px"
                                                    width="20px" />
                                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    <div class="row">
                
            </div>
            <br />
   <div class="col-md-12">
   <div class="col-md-2 padding-left-0">अनुमोदन रकम <span class="mandatory">*</span></div>
   <div class="col-md-2">
   <input type="text" class="form-control"  onkeypress="return isNumberKey(event)" id="txtAmount" data-bind="value:ApproveAmount, event:{ blur:ValidateAmount}" />
   </div>
   <div class="col-md-2">
   अनुमोदन मिति <span class="mandatory">*</span>
   </div>
   <div class="col-md-2">
                      <input type="text" class="form-control" placeholder="YYYY.MM.DD"  id="txtApproveDate" 
                     
                            onblur="return valFutureDate(this,'Y',true);" onkeypress="return isNumberKey(event)"
                      data-bind="value:ApproveDate, event:{ blur:ValidateDate }" />
                                </div>
   </div>
   <div class="row">
   <div class="col-md-1">कैफियत</div>
   <div class="col-md-3">
                      <textarea class="form-control" id="txtremarks" data-bind="value:Remarks"  onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"  ></textarea>
                      </div>
   <div class="col-md-2 pull-right margin-top-15">
        <button class="btn btn-primary" id="AddBtn" data-bind="click:Add">Add</button>
        
    </div>
   
   </div>
   

   
     
             
   </div>
   </div>
    <div class="row margin-top-20">
                <div class="col-lg-12">
                    <table  class="dataTable table table-bordered table-condensed table-striped sort">
                        <thead>
                         <th >
                               
                            </th>
                           
                           <th>कार्यालय</th>
                           <th>लागत केन्द्र</th>
                           <th>बजेट शीर्षक</th>
                            <th>
                               अनुरोध रकम
                            </th>
                           
                            <th>
                            अनुरोध मिति
                            </th>
                             <th>
                              अनुमोदन रकम 
                            </th>
                            <th>
                                अनुमोदन मिति
                            </th>
                            <th>कैफियत</th>
                            <th>
                                Action
                            </th>
                            
                        </thead>
                     
                  
                          <tbody data-bind="foreach: BudgetAppLsts">
                            <tr  >
                             <td  >
                                    <span data-bind="text:Office().OfficeCode" /><span data-bind="text:CostCenter().CostCenterID" />
                                    <span data-bind="text:Job().JobID" /><span data-bind="text:BudgetItem().BudgetItemID" />
                                </td>
                                
                                <td >
                                    <span data-bind="text:Office().OfficeNameNep" /> 
                                </td>
                                 <td >
                                    <span data-bind="text:CostCenter().CostCenterName" />
                                </td>
                                <td >
                                    <span data-bind="text:BudgetItem().BudgetItemEng" />
                                </td>
                                <td>
                                    <span data-bind="text:ReqAmount" />
                                </td>
                                 <td>
                            <span data-bind="text:RequestDate" />
                            </td>
                             <td>
                            <span data-bind="text:ApproveAmount" />
                            </td>
                                <td>
                                    <span data-bind="text:ApproveDate" />
                                </td>
                                <td>
                                 <span data-bind="text:Remarks" />
                                </td>
                                
                                  <td>
                                    
                                        <a data-bind="click: $root.Edit" id="edit" ><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                        <a data-bind="click: $root.Delete" id="delete"><span class="glyphicon glyphicon-trash" title="Delete" rel="tooltip"></a>
                                    
                                    </td>
                               
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-2 margin-top-25 pull-right">
                       
        <button class="btn btn-primary" data-bind="click:Save">Submit</button>
         <button class="btn btn-primary"  data-bind="click:ClearAll">Cancel</button>
        
    </div>
            </div>

  
     </form>
    
   
</div>
</div>


    <script src="../../Scripts/FAMS/BudgetApprove.js" type="text/javascript"></script>
    
</asp:Content>--%>
