<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="LeaveManagement.aspx.cs" Inherits="HRFA.Modules.ALMS.LeaveManagement" %>


<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
	TagName="EmployeeSearch" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});
	</script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<section class="content" id="LeaveBalanceForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Leave Management</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Employee Name<span class="red">*</span> </label>
										<input type="text" id="txtEmployeeID" data-bind="value: EmployeeName" class='required form-control' disabled />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<button type="button" id="btnSearch" class="btn btn-primary search wordlong"
											data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">
											Search</button>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>From Date<span class="red">*</span> </label>
										<input type="Text" id="txtFromDate" 
                      data-bind="" class='required form-control' 
                      onkeypress="return isNumberKey(event)"
                       onblur="return valFutureDate(this,'Y',true);"
                       placeholder="2018.07.17" maxlength="10"
                      onfocus="UnicodeFocus(event,this);" disabled 
                       />	
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Upto Date<span class="red">*</span></label>
<input type="Text" id="txtToDate" 
                      data-bind="value:UptoDate" class='required form-control' 
                      onkeypress="return isNumberKey(event)"
                       onblur="return valFutureDate(this,'Y',true);"
                       placeholder="YYYY.MM.DD" maxlength="10"
                      onfocus="UnicodeFocus(event,this);" 
                       />									</div>
								</div>
								<!-- /.row -->
							</div>
								
							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">

										<button class="btn btn-primary" data-bind="click: GetLeaveBalance">View Leave Details</button>
<%--										<button type="submit" class="btn btn-default" data-bind="click: $root.ClearControls">Cancel</button>--%>
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										<tr>
											<th>Earned HomeLeave</th>
											<th>Earned SickLeave</th>
											<th>Accumulated HomeLeave</th>
											<th>Accumulated SickLeave</th>
											<th>Leave Taken</th>
											<th>Total Leaves Remaining</th>
										</tr>
										<tbody data-bind="foreach: $root.LeaveBalances">
											<tr>
												<td>
													<span data-bind="text: homeleave"></span>
												</td>
												<td>
													<span data-bind="text: sickleave"></span>
												</td>
												<td>
												<span data-bind="text: homeleaveaccumulation"></span>
												</td>
												<td>
												<span data-bind="text: leavetaken"></span>
												</td>
												<td>
												<span data-bind="text:sickleaveaccumulation"></span>
												</td>
												<td>
													<span data-bind="text:balancedleave"></span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>

	<script src="../../Scripts/ALMS/LeaveManagement.js" type="text/javascript"></script>

</asp:Content>
