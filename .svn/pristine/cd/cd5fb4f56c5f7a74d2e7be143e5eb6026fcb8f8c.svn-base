<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="AllowanceSetting.aspx.cs" Inherits="HRFA.Modules.PAYROLL.AllowanceSetting" %>
<%@ Register Src="~/Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="uc1" TagName="EmployeeSearchControl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <uc1:EmployeeSearchControl runat="server" ID="EmployeeSearchControl" />
	<section class="content" id="FixedAllowanceSetupForm">
		<div class="row pages">
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Allowance Setting</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form2">
						<div class="box-body">
						<%--	<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>आर्थिक वर्ष *</label>
                        <select id="txtFiscalYear" class="form-control" style="padding: 6px;" title="आर्थिक वर्ष.." data-bind="options:FiscalYears, optionsText:'FiscalYearName', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedFiscalYear, event:{ change: SelectedFiscalYearChanged(this)}" ></select>
										</div>
								</div>--%>
<%--         <form id="form1" runat="server"  style="margin-top:4%;" role="form"> --%>
               <div class="row">
                    <div class="col-lg-4">  
                 <div class="form-group mx-sm-3 mb-2 " >
                        <label for="txtFiscalYear" >Fiscal Year *</label>                        

                        <select id="txtFiscalYear" class="form-control" style="padding: 6px;" title="Fiscal Year.." data-bind="options:FiscalYears, optionsText:'FiscalYearName', optionsValue:$data,optionsCaption:'------Select One-------', value: SelectedFiscalYear, event:{ change: SelectedFiscalYearChanged(this)}" ></select>
                      </div>
                        </div>
             </div>
            
             <div class="row" style="margin-top:1%;">
               <div class="col-md-3">
                         <input name="radio1" type="radio" data-bind="checkedValue: true, 
                                           checked: isAnnualAllowance" />Annual Allowance
                    </div>
               <div class="col-md-3">
                         <input name="radio2" type="radio" data-bind="checkedValue: false, 
                                           checked: isAnnualAllowance" />Monthly Allowance
                    </div>     
                 
             </div>
           
                
             <div class="row " data-bind="if: isAnnualAllowance" style="margin-top:2%;">                 
               <div class="col-lg-4">                      
                      
                      <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtDressAllowance">Dress Allowance</label>
                         <input  class="form-control" id="txtDressAllowance" placeholder="Dress Allowance" data-bind="value:DressAllowance"/>
                      </div> 
                    <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtDressAllowance">Medical Allowance (in percentage) </label>
                         <div class="input-group">
                                  <input type="number" id="txtMedicalAllowance" class="form-control" title="Medical Allowance (in percentage)" aria-describedby="basic-addon1" data-bind="value:MedicalAllowance">
                                  <span class="input-group-addon">%</span>
                                </div>
                        
                      </div> 
                    <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtAnnualFestAllowance">Anniversary Allowance (in percentage) </label>
                         <div class="input-group">
                                  <input type="number" id="txtAnnualFestAllowance" class="form-control" title="Anniversary Allowance (in percentage) " aria-describedby="basic-addon1" data-bind="value:FestivalAllowance">
                                  <span class="input-group-addon">%</span>
                                </div>
                        
                      </div> 
                  
               </div>
                <div class="col-lg-4">                
                
                 <div class="form-group mx-sm-3 mb-2">
                               <label for="txtImpDress">Dress Allowance Effective Month</label>
                       <select id="txtImpDress" class="form-control" style="padding: 6px;" data-bind='options: Months, optionsText: "MonthName",
                                    optionsValue: "MonthID", value:SelDressMonth, 
                                    optionsCaption:"---Select One---"'></select>
                          </div>
                 <div class="form-group mx-sm-3 mb-2">
                               <label for="txtImpMedical">Medical Allowance Effective Month</label>
                       <select id="txtImpMedical" class="form-control" style="padding: 6px;" data-bind='options: Months, optionsText: "MonthName",
                                    optionsValue: "MonthID", value:SelMedicalMonth, 
                                    optionsCaption:"---Select One---"'></select>
                          </div>
                      <div class="form-group mx-sm-3 mb-2">
                               <label for="txtImpAnnualFest">Anniversary Allowance Effective Month</label>
                       <select id="txtImpAnnualFest" class="form-control" style="padding: 6px;" data-bind='options: Months, optionsText: "MonthName",
                                    optionsValue: "MonthID", value:SelFestivalMonth, 
                                    optionsCaption:"---Select One---"'></select>
                          </div>   
                </div>
               <div class="col-lg-4">
                   <div class="form-group mx-sm-3 mb-2">
                        <label for="txtRemarks">Remarks</label>
                         <textarea class="form-control" id="txtRemarks" rows="3" data-bind="value:Remarks"></textarea>
                      </div>
                   <button type="button" class="btn btn-primary" data-bind="click:SaveAllowance,   enable: disableSave" >Submit</button>
                   <button type="button" class="btn btn-danger">Cancel</button>
               </div>
              </div>
             <div class="row" data-bind="ifnot: isAnnualAllowance" style="margin-left:1%;">
                 <div class="row">
                     <div class="col-lg-4">
                         <div class="form-group mx-sm-3 mb-2" >
                        <label for="txtKhajaKharch">Per Month Lunch Allowance</label>
                        <input  class="form-control" id="txtKhajaKharch" placeholder="Per Month Lunch Allowance"  data-bind="value:KhajaPerMonth"/>
                          </div>
                          <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtPFPercentage">PF (in Percentage)</label>
                              <div class="input-group">
                                  <input type="number" id="txtPFPercentage" class="form-control" placeholder="PF (in Percentage)" aria-describedby="basic-addon1" data-bind="value:PFPercentage">
                                  <span class="input-group-addon" id="basic-addon1">%</span>
                                </div>
                        <%-- <input  class="form-control" id="txtPFPercentage" placeholder="कर्मचारी संचय कोष कट्टी (प्रतिशतमा)" data-bind="value:PFPercentage"/>--%>
                      </div> 
                         </div>                   
                        
                     <div class="col-lg-4">
                      <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtYatayatKharch">Per Month Transportation Allowance</label>
                          <input  class="form-control" id="txtYatayatKharch" placeholder="Transportation Allowance" data-bind="value:YataYatPerMonth"/>
                      </div>
                          <div class="form-group mx-sm-3 mb-2" >
                        <label for="txtDearnessAllowance">DearnessAllowance</label>
                        <input  class="form-control" id="txtDearnessAllowance" placeholder="DearnessAllowance"  data-bind="value:DearnessAllowance"/>
                          </div>
                     </div>
                      <div class="col-lg-4">
                     <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtWaterDhalAllowance">Water And Swarage Allowance </label>
                          <input  class="form-control" id="txtWaterDhalAllowance" placeholder="Water And Swarage Allowance " data-bind="value:WaterDhalAllowance"/>
                      </div>
                    </div>

                 </div>
                  <div class="row">   
                      <div class="col-lg-4">
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="txtEmployeeID">Employee Name</label>
                            <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='form-control'
                                disabled />
                             <input type="text" id="txtEmployeeIDID" data-bind="value:EmpID" class='required form-control hidden'
                                disabled />                           
                        </div>
                     </div>
                      <div class="col-lg-4">
                           <div class="form-group mx-sm-3 mb-2">                               
                                <button type="button" id="btnSearch" class="btn btn-primary search" data-toggle="modal"
                            data-target="#modalEmpSearch" data-thissource="employee" style="margin-top:4%;">
                            Search</button>
                           </div>
                      </div>
                 </div>
                 <div class="row">   
                     <div class="col-lg-4">
                      <div class="form-group mx-sm-3 mb-2" >
                        <label for="txtDearnessAllowance">Atithiti Satkar Vatta</label>
                        <input  class="form-control" id="txtAtithitiSatkarAllowance" placeholder="Atithiti Satkar Vatta"  data-bind="value:AtithitiSatkarAllowance, enable: disableThis" />
                          </div>
                             <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtWaterDhalAllowance">Telephone Allowance</label>
                        <input  class="form-control" id="txtTeliphone" placeholder="Telephone Allowance" data-bind="value:TeliphoneAllowance , enable: disableThis"/>
                                 </div>
                           
                     </div>
                     <div class="col-lg-4">
                           <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtDressAllowance">Over Time</label>
                        <input  class="form-control" id="txtOvertime" placeholder="Over Time" data-bind="value:OverTimeAllowance , enable: disableThis"/>
                                 </div>  
                      <div class="form-group mx-sm-3 mb-2" >
                          <label for="txtDressAllowance">Medical Rebate</label>
                        <input  class="form-control" id="txtMedicalRebet" placeholder="Medical Rebate" data-bind="value:MedicalRebet , enable: disableThis"/>
                                 </div>  
                         </div>
                     <div class="col-lg-3" >
                        <div class="form-group mx-sm-3 mb-2" >
                                <label for="txtRemarksMA">Remarks</label>
                                 <textarea class="form-control" id="txtRemarksMA" rows="3" data-bind="value:MARemarks, enable: disableThis"></textarea>
                              </div>
                           <button type="button" class="btn btn-primary" data-bind="click:SaveAllowance,  enable: disableSave">Submit</button>
                           <button type="button" class="btn btn-danger">Cancel</button>
                       </div>
                  </div>
              
              </div>
                </div>
    </form> 
         </div>
				</div>
			</div>
		</section>
      <script src="../../Scripts/PAYROLL/AllowanceSetting.js" type="text/javascript"></script>

</asp:Content>
