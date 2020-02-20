<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="BudgetRelease.aspx.cs" 
Inherits="HRFA.Modules.FAMS.BudgetRelease" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="wrapper">
        <div class="col-md-12">
            <h3 class="margin-top-15 margin-left-25">
                बजेट शीर्षकको निकासा
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
                           
                            <div class="col-md-4 "  style=" margin-left:10px;">
                                लागत केन्द्र <span class="mandatory">*</span></div>
                            
                            <div class="col-md-2 " style=" margin-left:5px;">
                               निकासा गरिएको मिति <span class="mandatory">*</span></div>
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
                                <select id="Select2" class="dropdown-select" data-bind="options:CostCenters, optionsText:'CostCenterName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedCostCenter">
                                </select>
                            </div>
                            <div class="col-md-1">
                                <button type="button" id="btnSearch" class="btn btn-warning search" data-bind="click:GetBudgetRelease">
                                    Search</button>
                            </div>

                            <div class="col-md-1">
                            <button class="btn btn-primary  pull-right" data-bind="click:Print">
                                Print</button> 
                            </div>
                            
                            <div class="col-md-3 one-seventy">
                                <input type="text" class="form-control" id="txtReleaseDate" onkeypress="return isNumberKey(event)"
                                    onblur="return valFutureDate(this,'Y',true);" placeholder="YYYY.MM.DD" data-bind="value:ReleaseDate" />
                            </div>
                           
                            
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
                                    बजेट आईडी
                                </th>
                                <th>
                                    बजेट शीर्षक
                                </th>
                               
                                <th>
                                    स्वीकृत रकम
                                </th>
                                 <th>
                                    हाल सम्म बाकि निकासा  रकम 
                                </th>
                                 <th>
                                    निकासा रकम
                                </th>
                                
                                <th class="hidden">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: BudgetBudgetReleaseLsts">
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
                                    <span data-bind="text:AccountChart().AccCode" />
                                </td>
                                <td>
                                    <span data-bind="text:AccountChart().AccName" />
                                </td>
                                
                                <td>
                                    <input type="text" id="txApproveAmount" class="form-control"  readonly ="true" data-bind="value: ApproveAmount" />
                                </td>
                                <td>
                                    <input type="text" id="txRemainReleaseAmount" class="form-control"  readonly ="true" data-bind="value: RemainingAmount" />  
                                </td>
                                <td>
                                    <input type="text" id="txReleaseAmount" class="form-control Amounttxt" data-bind="value: ReleaseAmount, event: {blur: $root.checkAmount}" />
                                </td>
                                
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-3 margin-top-25 pull-right">
                    <button class="btn btn-primary  pull-right btnSave" data-bind="click:SaveBudgetRelease" style=" margin-left:10px;">
                        Save</button> 
                    <button class="btn btn-primary  pull-right btnSubmit" data-bind="click:SubmitBudgetRelease" style=" margin-left:10px;">
                        Submit</button> 
                    <button class="btn btn-primary  pull-right" data-bind="click: ClearAll">
                        Cancel</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <script src="../../Scripts/FAMS/BudgetRelease.js" type="text/javascript"></script>
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
<h3 class=" margin-top-15 margin-left-25">बजेट शीर्षकको जारी </h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
<div class="row">
<div class="col-md-12">
 <div class="col-md-2 padding-left-0">
                        कार्यालय <span class="mandatory">*</span>
                    </div>
<div class="col-md-3 dropdown">
<select id="lstOffice" class="dropdown-select" 
 data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:'OfficeCode', value: SelectedOffice,event:{ change: GetCostCenter  }">
</select>
                    </div>
 <div class="col-md-2">
                     लागत केन्द्र <span class="mandatory">*</span></div>
<div class="col-md-2 dropdown">
<select id="Select2" class="dropdown-select"  data-bind="options:CostCenters, optionsText:'CostCenterName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedCostCenter,event:{ change: GetDetails  }">
</select>

                    </div>
</div>

<div class="col-lg-12 margin-top-15">
                    <table  class="dataTable table table-bordered table-condensed table-striped sort"  id="tblModule">
                        <thead>
                           <th class="hidden">
                               
                            </th>
                            <th class="hidden">
                               
                            </th>
                           
                           
                            
                            <th class="hidden">
                               
                            </th>
                            <th class="hidden">
                            </th>
                            <th >
                               बजेट शीर्षक 
                            </th>
                            <th>
                             अनुमोदन रकम   
                            </th>
                          
                             <th >
                               अनुरोध मिति
                            </th>
                            <th>
                                Action
                            </th>
                        </thead>
                     
                  
                          <tbody data-bind="foreach: BudgetReleaseLsts">
                            <tr data-bind="click: $root.LoadTrn" onclick="highlightRow()" >
                                <td class="hidden" >
                                    <span data-bind="text:OfficeCode" />
                                </td>
                                <td class="hidden" >
                                    <span data-bind="text:CostCenterID" />
                                </td>
                                 <td  class="hidden">
                                    <span data-bind="text:JobID" />
                                </td>
                                
                                
                                <td class="hidden">
                                    <span data-bind="text:BudgetItemID" />
                                </td>
                                
                                  <td >
                                    <span data-bind="text:BudgetItemDesc" />
                                </td>
                                <td>
                                    <span data-bind="text:Amount" />
                                </td>

                        
                                 <td  >
                                    <span data-bind="text:RequestDate" />
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
    <br />
    
  
   <div class="row">
   <div class="col-md-12">
   <div class="col-md-2">जारी मिति <span class="mandatory">*</span></div>
   <div class="col-md-2 margin-left-0 one-seventy ">
                      <input type="text"  class="form-control" placeholder="YYYY.MM.DD" id="txtReleaseDate" 
                      onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                      data-bind="value:ReleaseDate, event:{ blur:ValidateDate }"  />
                                </div>
   <div class="col-md-2 one-seventy" align="center">जारी रकम <span class="mandatory">*</span></div>
   <div class="col-md-2">
                      <input type="text" class="form-control" id="txtAmount" onkeypress="return isNumberKey(event)" data-bind="value:RelAmount, event:{ blur:ValidateAmount}" />
                                </div>


                                </div>
    </div>
    <div class="row">
<div class="col-md-12">
   <div class="col-md-2">कैफियत </div>
   <div class="col-md-4">
                      <textarea type="text" class="form-control"  onkeypress="UnicodeKeyPress(event,this);"
                        onkeyup="UnicodeKeyUp(event,this);" onchange="UnicodeChange(event,this);" onfocus="UnicodeFocus(event,this);" id="txtremarks" data-bind="value:Remarks" ></textarea>
                      </div>
   <div class="col-md-2  margin-top-15">
        <button class="btn btn-primary" data-bind="click:Save">Submit</button>
        <button class="btn btn-primary"  data-bind="click:ClearControls">Cancel</button>
    </div>
   </div>
   </div>

   <div class="col-md-12">
   
     </div>
     
             
   </div>


   
     </form>
    
   
</div>
</div>



    <script src="../../Scripts/FAMS/BudgetRelease.js" type="text/javascript"></script>
    

</asp:Content>--%>
