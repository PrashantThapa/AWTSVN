<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
	CodeBehind="LeaveCancellation.aspx.cs" Inherits="HRFA.Modules.PIS.LeaveCancellation" %>

<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
	TagName="EmployeeSearch" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Leave Cancellation </h3>
					</div>
					<!-- /.box-header -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label>Employee Name<span class="red">*</span> </label>
										<input type="text" id="txtUserID" class="form-control hidden" name="Username" data-bind="value: EmpID, attr: { 'disabled': isDisabled }" />
										<input type="text" id="Text1" class="form-control" name="Username" data-bind="value: EmpName, attr: { 'disabled': isDisabled }" />
									</div>

								</div>
								<div class="col-md-1">
									<div class="form-group wordlong">
										<button type="button" id="btnForwardEmpSearch" class="btn btn-warning search" data-toggle="modal" data-target="#modalEmpSearch">Search</button>
									</div>
								</div>
								<!-- /.row -->
							</div>

							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										<tr>
											<th class="hidden">ID
											</th>
											<th>Employee Name
											</th>
											<th>Start Date Of Approved Leave
											</th>
											<th>End Date Of Approved Leave
											</th>
											<th>Total Days
											</th>
										</tr>


										<tbody data-bind="foreach: LeaveCancellationLst">
											<tr>
												<td class="hidden">
													<span data-bind="text: EmpID" />
												</td>
												<td>
													<span data-bind="text: EmpName" />
												</td>
												<td>
													<span data-bind="text: AppFromDate" />
												</td>
												<td>
													<span data-bind="text: AppToDate" />
												</td>
												<td>
													<span data-bind="text: AppNoOfDays" />
												</td>
												<td>
													<a data-bind="click: $root.EditLeave"><span class="glyphicon glyphicon-circle-arrow-right" title="Edit"></span></a>


												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Cancellation Start Days<span class="red">*</span>  </label>
										<input type="text" id="txtCancellationFromDate" onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'N',true);"
											placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" class="form-control" data-bind="value: CancellationFromDate, event: { blur: ValidateFromDate }" />
									</div>
								</div>


								<div class="col-md-6">
									<div class="form-group">
										<label>Cancellation End Days<span class="red">*</span>  </label>
										<input type="text" id="txtCancellationToDate" onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'N',true);"
											placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" class="form-control" data-bind="value: CancellationToDate, event: { blur: ValidateToDate }" />
									</div>
								</div>
								<%--<div class="row">

								<button id="btnUpdate" class="btn btn-info" data-bind="click: UpdateEmpShift">
                            Update Emp Shift</button>

								</div>--%>
							</div>


							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Total Cancelled Days<span class="red">*</span>  </label>
										<input type="text" id="txtCancellationNoOfDays" onkeypress=" return isNumberKey(event);" class="form-control" data-bind="value: CancellationNoOfDays, event: { blur: ValidateDays }" />
									</div>
								</div>


								<div class="col-md-6">
									<div class="form-group">
										<label>Cancellation Date<span class="red">*</span>  </label>
										<input type="text" id="txtCancellationDate" class="form-control" onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'N',true);"
											placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" data-bind="value: LeaveDate" />
									</div>
								</div>
							</div>


							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Leave Cancellation Reason</label>
										<textarea id="txtReason" class="form-control" data-bind="value: LeaveReason"
											<%--                    onkeypress="UnicodeKeyPress(event,this);"
                        onkeyup="UnicodeKeyUp(event,this);"
                         onchange="UnicodeChange(event,this);"
                          onfocus="UnicodeFocus(event,this);"--%>
											oninput="convert_to_unicode(this)"></textarea>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group wordlong">
										<button class="btn btn-info" id="btnSubmit" data-bind="click: SaveEntity">Submit</button>
										<button class="btn btn-default" id="btnWholeCancel" data-bind="click: ClearControls">Cancel</button>
									</div>
								</div>
							</div>







						</div>
					</form>


					<!-- form start -->

				</div>
			</div>
		</div>
	</section>
	<script src="../../Scripts/PIS/LeaveCancellation.js" type="text/javascript"></script>


</asp:Content>
