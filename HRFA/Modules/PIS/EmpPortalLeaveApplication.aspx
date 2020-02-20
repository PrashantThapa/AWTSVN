﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="EmpPortalLeaveApplication.aspx.cs" Inherits="HRFA.Modules.PIS.EmpPortalLeaveApplication" %>

<%@ Register Src="../../Modules/PIS/PortalEmpSearchControl.ascx" TagPrefix="WebUserControl"
	TagName="PortalEmployeeSearch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<WebUserControl:PortalEmployeeSearch ID="PortalEmployeeControl" runat="server" />

	<section class="content" id="PortalEmpLeaveApplication">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Leave Application</h3>
					</div>
					<!-- /.box-header -->

					<form role="form" runat="server" id="Form1">

						<div class="box-body">
							<div class="row">
									<div class="col-md-6">
									<div class="form-group">
										<label>Employee Id</label>          
                     <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />

										</div>
										</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Application Date <span class="red">*</span></label>
										<input type="text" id="txtApplicationDate" placeholder="YYYY.MM.DD"
											data-bind="value: ApplicationDate" class='required form-control'
											onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'N',true);" />
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Leave Type <span class="red">*</span></label>
										<select id="ddlLeaveType" class="form-control select2"
											data-bind='options: LeaveTypes, optionsText: "LeaveTypeName",
	optionsValue: "LeaveTypeID", value: SelectedLeaveType,
	optionsCaption: "------Select-------"'>
										</select>
									</div>

								</div>

							</div>
							  

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Leave Start Date <span class="red">*</span></label>
										<input type="text" id="txtFromDate" placeholder="YYYY.MM.DD"
											data-bind="value: AppFromDate, event: { blur: DisplayNoofDays }" class='required form-control'
											onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'N',true);" />
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Leave End Date <span class="red">*</span></label>
										<input type="text" id="txtToDate" placeholder="YYYY.MM.DD"
											data-bind="value: AppToDate, event: { blur: DisplayNoofDays }" class='required form-control'
											onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'N',true);" />
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Total Days <span class="red">*</span></label>
										<input type="text" id="txtNoofDays" data-bind="value: AppNoOfDays, event: { blur: IsNoofDays }" onkeypress=" return isNumberKey(event);" class='required form-control' />
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Approve/Recommended By<span class="red">*</span></label>
										<input type="text" id="txtForwardToName" data-bind="value: ForwardToName" class='required form-control' disabled />

									</div>
								</div>
								<div class="col-md-1">
									<div class="form-group wordlong">
										<button type="button" id="btnForwardEmpSearch" class="btn btn-warning search" data-toggle="modal" data-target="#modalPortalEmpSearch" data-thissource="forwardedto">Search</button>
									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-6">
									<div class="form-group wordlong">
											<input type="radio" id="inlineCheckbox1" data-bind="checkedValue: false, 
                                           checked:IsHalfDay" class="minimal" />&nbsp;Full Day
											<input type="radio" id="inlineCheckbox2" data-bind="checkedValue: true, 
                                           checked:IsHalfDay" class="minimal" />&nbsp;Half Day                                      
										</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">

										<label>Leave Reason</label>

										<textarea id="txtLeaveReason" data-bind="value: LeaveReason" class='required form-control'
											<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);" --%>
											<%--oninput="convert_to_unicode(this)"--%>
											<%----%>></textarea>
									</div>
								</div>



								
							</div>


							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label></label>
										<button class="btn btn-info" data-bind="click: SaveApplication">Submit</button>
										<button class="btn btn-default" data-bind="click: ClearApplication">Cancel</button>

									</div>
								</div>
							</div>
						</div>

					</form>
				</div>
			</div>
		</div>
	</section>
    <script src="../../Scripts/PIS/PortalEmpLeaveApplication.js" type="text/javascript"></script>
</asp:Content>
