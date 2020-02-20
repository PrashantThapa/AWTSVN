<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="EmployeeSalary.aspx.cs" Inherits="HRFA.Modules.PAYROLL.EmployeeSalary" %>

<%@ Register Src="~/Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="uc1" TagName="EmployeeSearchControl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <uc1:EmployeeSearchControl runat="server" ID="EmployeeSearchControl" />

    <div class="wrapper" id="EmployeeSalaryItem">
        <div class="col-md-12">
           
        </div>
        <div class="col-md-12"  >
            <h3 class="margin-top-15 margin-left-25">कर्मचारीको तलब</h3>
            <form class="form-horizontal" runat="server" id="Form1" role="form">
                <div class="row">
                    <div class="col-md-5">
                         <input name="Test" type="radio" data-bind="checkedValue: true, 
                                           checked: isAnnualAllowance" />Annual Allowance
                    </div>
                    <div class="col-md-5">
                         <input name="Test" type="radio" data-bind="checkedValue: false, 
                                           checked: isAnnualAllowance" />Monthly Allowance
                    </div>
                    
           </div>
                  <div class="row" data-bind="if:!isAnnualAllowance">
                    <div class="col-md-2">
                        कर्मचारीको नाम <span class="mandatory">*</span>
                    </div>
                    <div class="col-md-2 padding-left-0">
                        <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control'
                            disabled />
                         <input type="text" id="txtEmployeeIDID" data-bind="value:EmpID" class='required form-control hidden'
                            disabled />
                    </div>

                    <div class="col-md-2">
                        <button type="button" id="btnSearch" class="btn btn-primary search" data-toggle="modal"
                            data-target="#modalEmpSearch" data-thissource="employee">
                            Search</button>
                    </div>
                </div>
                <br />
                 <div class="row margin-top-100">
                        <div class="col-lg-12">
                            <div class="table-responsive">
                                <table style="width: 100%;" id="tblSalaryItemRate" data-bind="visible: EmpSalaryItemRates().length > 0 " border="0" class="dataTable table table-bordered table-condensed  sort margin-top-45">
                                        <tr>
                                            <th>तलब प्रकार </th>
                                            <th>मोड </th>
                                            <th>रकम </th>
                                            <th data-bind="visible:false">सबमिशन संख्या </th>
                                            <th data-bind="visible:false">एपीआईडी </th>                                             
                                            <th data-bind="visible:false">मिति देखि</th>
                                            <th data-bind="visible:false">मिति सम्म </th>                                            
                                            <th data-bind="visible:false">द्वारा प्रविष्टि </th>
                                            <th data-bind="visible:false">प्रविष्टि मिति </th>
                                            <th data-bind="visible:false">स्थिति </th>
                                            <th>कार्य</th>
                                        </tr>
                                        <tbody data-bind='foreach: EmpSalaryItemRates'>
                                            <tr>                                                
                                                <td><select style="min-height: 34px;" data-bind="options: $root.SalaryItems, optionsCaption: 'Select Salary Item', optionsValue: function(item) { return item; }, optionsText: function(item) { return item.SalaryItemDesc; }, value:SalaryItem, valueUpdate:'change'"></select></td>                                                
                                                <td><select style="min-height: 34px;" data-bind=" options: $root.Modes, optionsCaption: 'Select Mode of Calculation', optionsValue: function(item) { return item; }, optionsText: function(item) { return item.ModeDesc; }, value:Mode, valueUpdate:'change'"></select></td>                                                                                                
                                                <td><input class='required number' data-bind='numeric, value: Amount' /></td>
                                                <td data-bind='visible:false'><input  data-bind='visible:false, value: SubmissionNo'/></td>
                                                <td data-bind='visible:false'><input  data-bind='visible:false, value: EmpID' /></td>
                                                <td data-bind='visible:false'><input  data-bind='visible:false, value: FromDate' /></td>
                                                <td data-bind='visible:false'><input  data-bind='visible:false, value: ToDate' /></td>                                                
                                                <td data-bind='visible:false'><input data-bind='visible:false, value: EntryBy' /></td>
                                                <td data-bind='visible:false'><input  data-bind='visible:false, value: EntryDate' /></td>
                                                <td data-bind='visible:false'><input data-bind='visible:false, value: RStatus'/></td>
                                                <td><a href='#' data-bind='click: $root.removeSalaryItemRate'>Delete</a></td>
                                            </tr>
                                        </tbody>            
                                    </table>
                                <div class="row">
                                     <div class="col-lg-12 margin-top-25  pull-right">
                                        <div class="col-md-3 pull-right">
                                             <button class=" btn btn-primary" id="btnEmpSalaryItemID" data-bind='enable: EmpID() > 0,  click: addEmpSalaryItemRate'>Add EmpSalaryItemRate</button>
                                        </div>
                                       </div>
                                </div>
                           </div>

                        </div>
                     </div>
            <br />                
                    <div class="row margin-top-100">
                        <div class="col-lg-12 margin-top-25  pull-right">
                            <div class="col-md-3 pull-right">
                                <button class=" btn btn-primary" id="Button3"
                                    data-bind='enable: EmpSalaryItemRates().length > 0, click: SaveEmpSalary'>
                                    Submit</button>
                                <button class=" btn btn-primary" id="btnEmpSalaryCancel"
                                    data-bind='enable: EmpSalaryItemRates().length > 0, click: CancelEmpSalary'>
                                    Cancel</button>
                                <button class=" btn btn-primary" id="btnPrint"
                                    data-bind='enable: false, click: PrintEmpSalary'><%--//EmpSalaryItemRates().length > 0, click: PrintEmpSalary'>--%>
                                    Print</button>

                            </div>
                        </div>
                    </div>                    
        
        <br />
        <div class="row">
            <div class="col-md-12">
            </div>
        </div>
        </form>
    </div>
   </div>
    <script src="../../Scripts/PAYROLL/EmployeeSalary.js" type="text/javascript"></script>
</asp:Content>
