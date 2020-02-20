<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/AdminMaster.Master" CodeBehind="EmpDeptCostAssign.aspx.cs" Inherits="HRFA.Modules.PIS.EmpDeptCostAssign" %>

<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />


		<section class="content" id ="EmpDeptCostAssignForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Appointment</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
						
							<div class="row">
								<div class="col-md-6" id="EmpName">
										<div class="form-group">
										<label>Employee Name </label>
									    <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />
										</div>
								</div> 
															<div class="col-md-1 wordlong">
<button type="button" id="btnSearch" class="btn btn-primary search" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>
																</div>
															</div>

							<div class="row">

								<div class="col-md-12" id="grdMain">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
									                      <thead>
	
										<tr>
                    <th>Office Name</th>
                    <th>Employee Name</th>
                    <th>Post</th>
                    
                </tr>
															  </thead>
                        <tbody >
               <tr>
                    <td data-bind="text:grdOfficeName"></td>
                    <td data-bind="text:grdEmployeeName"></td>
                    <td data-bind="text:grdPostDesc"></td>         
                </tr>

            </tbody>
									</table>
									</div>
								</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Department<span class="red">*</span></label>
										<select id="ddlTransferPost" class="form-control select2"
													 data-bind='options: CostCenters, optionsText: "CostCenterName",
                    optionsValue:"CostCenterID" , value:SelectedCostCenter, 
                    optionsCaption:"------Select One -------" '></select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Cost Center<span class="red">*</span></label>
										
										<select id="Select4" class="form-control select2" data-bind='options: Departments, optionsText: "DeptDesc",
                    optionsValue:"DeptID" , value:SelectedDepartment, 
                    optionsCaption:"------Select One -------" '></select>
									</div>
									</div>
								</div>	

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">
									 <button class="btn btn-primary" id="btnSave" data-bind="click: SaveEmpDeptCostAssign">Submit</button>
								     <button class="btn btn-primary" id="btnCancel" data-bind="click: CancelEmpDeptCostAssign">Cancel</button>
									</div>
								</div>
							</div>

							</div>
						</form>
				</div>
				</div>
			</div>
			</section>



<%--<div class="wrapper" id ="EmpDeptCostAssignForm">
<div class="col-md-12">
<h3 class="margin-top-15 margin-left-25">कर्मचारी विभागको लागत केन्द्र बनाउने</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">
    <div class="row">
    <div class="col-md-11">
    <div class="row">
        <div class="col-md-2" id="EmpName">
    कर्मचारीको नाम <span class="mandatory">*</span>
    </div>
        <div class="col-md-3 padding-left-0">
    <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />
    </div>
        <div class="col-md-2">
        <button type="button" id="btnSearch" class="btn btn-warning search" data-toggle="modal" data-target="#modalEmpSearch">Search</button>
    </div>
    </div>
    <div class="row">
        <div class="col-md-12" id="grdMain">
        <div class="table-responsive">
        <table class="table-bordered table-condensed table-striped sort col-lg-10">
                            
                <tr>
                    <th>कार्यालयको नाम</th>
                    <th>कर्मचारीको नाम</th>
                    <th>पद</th>
                    
                </tr>
                            
            <tbody>
                <tr>
                    <td data-bind="text:grdOfficeName"></td>
                    <td data-bind="text:grdEmployeeName"></td>
                    <td data-bind="text:grdPostDesc"></td>         
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </div>

    <div class="row margin-top-15">
        <div class="col-lg-1">
        विभाग <span class="mandatory">*</span>
        </div>
        <div class="col-md-3 margin-left-0 dropdown" id="div8">
    <select id="Select4"   class="dropdown-select" 
                    data-bind='options: Departments, optionsText: "DeptDesc",
                    optionsValue:"DeptID" , value:SelectedDepartment, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
     </div>
        <div class="col-lg-2">
         लागत केन्द्र <span class="mandatory">*</span>
        </div>
        <div class="col-md-3 margin-left-0 dropdown" id="div1">
    <select id="Select1"   class="dropdown-select" 
                    data-bind='options: CostCenters, optionsText: "CostCenterName",
                    optionsValue:"CostCenterID" , value:SelectedCostCenter, 
                    optionsCaption:"------छान्नुहोस्-------" '></select>
     </div>
 
     <div class="col-md-3">
            <button class="btn btn-primary" id="btnSave" data-bind="click: SaveEmpDeptCostAssign">Submit</button>
            <button class="btn btn-primary" id="btnCancel" data-bind="click: CancelEmpDeptCostAssign">Cancel</button>

        </div>


    </div>
    </div>

    </div>

</form>
</div>
</div>--%>
   
	<script src="../../Scripts/PIS/EmpDeptCostAssign.js" type="text/javascript"></script>

</asp:Content>
