<%@ Page Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
	CodeBehind="ShiftSetup.aspx.cs" Inherits="HRFA.Modules.WFMS.ShiftSetup" %>


<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<!-- general form elements -->
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Shift Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Shift Type</label>
										<select id="lstPost" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options: ShiftSetupTime, optionsText: 'ShiftName', optionsValue: 'ShiftID',
	optionsCaption: '------Select one -------', value: SelectedShiftSetupTime, event: { change: ShiftSetupDetails }">
										</select>
									</div>
								</div>
								<div class="col-md-5">
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<label>Shift Name <span class="red">*</span></label>
												<input type="text" id="txtShiftName" data-bind="value: ShiftName" class='required form-control'
													<%--                                    onkeypress="UnicodeKeyPress(event,this);" 
                                    onkeyup="UnicodeKeyUp(event,this);"
                                    onchange="UnicodeChange(event,this);" 
                                    onfocus="UnicodeFocus(event,this);" 
                                    oninput="convert_to_unicode(this)"--%> />
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<label>Start Time <span class="red">*</span></label>
												<div class="row">
													<div class="col-md-6">

														<input type="text" id="txtStartHour" class="required form-control" data-bind="value: ShiftStartTime, event: { blur: ValidateTime }"
															onkeypress="return isNumberKey(event);" />
													</div>
													<div class="col-md-6">

														<select id="ddlStartHour" class="form-control select2"
															data-bind='options: TimePeriods, optionsText: "TPDesc",
	optionsValue: $data, value: SelectedTimePeriodStart,
	optionsCaption: "------Select one -------"'>
														</select>
													</div>
												</div>




												<!-- /.row -->
											</div>
										</div>
										</div>

										<div class="row">
											<div class="col-md-12">
												<div class="form-group">
													<label>End Time<span class="red">*</span></label>
													<div class="row">
														<div class="col-md-6">
															<input type="text" id="txtEndHour" class="required form-control" data-bind="value: ShiftEndTime, event: { blur: ValidateTime }"
																onkeypress="return isNumberKey(event);" />
														</div>
														<div class="col-md-6">
															<select id="Select1" class="form-control select2"
																data-bind='options: TimePeriods, optionsText: "TPDesc",
	optionsValue: $data, value: SelectedTimePeriodEnd,
	optionsCaption: "------Select one -------"'>
															</select>
														</div>
													</div>
												</div>


												<div class="row">
													<div class="col-md-12">
														<div class="form-group">
															<button type="submit" class="btn btn-info" id="btnSave" data-bind="click: SaveShiftSetup">Add</button>
                                                            <button type="submit" class="btn btn-danger " data-bind="click:DeleteShiftSetup">Delete</button>
															<button type="submit" class="btn btn-default" id="btnCancel" data-bind="click: CancelShiftSetup">Cancel</button>
															

														</div>
													</div>
												</div>

												<!-- /.row -->
											</div>
										</div>

								</div>
							</div>
							</div>
					</form>
				</div>
				<!-- /.box -->
			</div>
		</div>
		<!--/.col (left) -->
		<!-- right column -->
		<!--/.col (right) -->
		<!-- /.row -->
	</section>

	<script type="text/javascript" src="../../Scripts/COMMON/Shift.js"></script>
</asp:Content>
