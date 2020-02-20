<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeePosting.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeePosting" %>

<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl" TagName="EmployeeSearch" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<section class="content" id="AppointmentForm">
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
								<div class="col-md-6">
										<div class="form-group">
										<label>Employee Name </label>
									    <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />
										</div>
								</div> 
								
								<div class="col-md-1 wordlong">
<button type="button" id="btnSearch" class="btn btn-primary search" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>
									<%--<button type="button" class="btn btn-default" id="btnSearch" data-toggle="modal" data-target="#modal-default" data-thissource="employee">--%>
               <%-- Launch Default Modal
              </button>--%>
									</div>
							</div>
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Post <span class="red">*</span></label>
										<select id="ddlPost" class="form-control select2" data-bind='options: Posts, optionsText: "PostDesc", optionsValue: $data, value:SelectedPost, 
                    optionsCaption:"------ Select one-------" ,event: { change: $data.GetDarbandi }'></select>
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label>Appointment Type <span class="red">*</span></label>
										<select id="ddlAppointType" class="form-control select2"
													 data-bind='options: AppointmentTypes, optionsText: "ApptTypeDesc",
                    optionsValue: $data, value:SelectedAppointmentType, 
                    optionsCaption:"------ Select one -------"'></select>
									</div>
								</div>	
							    <div class="col-md-4">
									<div class="form-group">
										<label>Appointment Date <span class="red">*</span></label>
										<input type="Text" id="Text1" 
                      data-bind="value:FromDate" class='required form-control' 
                      onkeypress="return isNumberKey(event)"
                       onblur="return valFutureDate(this,'Y',true);"
                       placeholder="YYYY.MM.DD" maxlength="10"
                      onfocus="UnicodeFocus(event,this);"
                       />
									</div>
								</div>						
							</div>
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Decision Date <span class="red">*</span></label>
										<input type="Text" id="txtDecisionDate" 
                      data-bind="value:DecisionDate" class='required form-control' 
                      onkeypress="return isNumberKey(event)"
                       onblur="return valFutureDate(this,'Y',true);"
                       placeholder="YYYY.MM.DD" maxlength="10"
                      onfocus="UnicodeFocus(event,this);" 
                       />
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label>Letter Issue Date <span class="red">*</span></label>
										<input type="Text" id="txtLetterIssueDate" 
                      data-bind="value:LetterIssueDate" class='required form-control' 
                       onkeypress="return isNumberKey(event)"
                       onblur="return valFutureDate(this,'Y',true);"
                       placeholder="YYYY.MM.DD" maxlength="10"
                      onfocus="UnicodeFocus(event,this);" 
                       />
									</div>
								</div>	
							    <div class="col-md-4">
									<div class="form-group">
										<label>Office Joining Date<span class="red">*</span></label>
										<input type="text" id="txtOfficeJoinDate" 
                            data-bind="value:OfficeJoinDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" maxlength="10"
                            onfocus="UnicodeFocus(event,this);"
                             />
									</div>
								</div>						
							</div>
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Probation Period(in months)</label>
										<input type="text" id="txtProbationPeriod" 
                            data-bind="value:ProbationPeriod" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            
                             />
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label>Effective Date</label>
										<input type="text" id="txtEffectiveDate" 
                            data-bind="value:EffectiveDate , event:{ blur:ValidateEffectiveDate }" 
                            class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" maxlength="10"
                            onfocus="UnicodeFocus(event,this);"
                             />
									</div>
								</div>	
							    <div class="col-md-4">
									<div class="form-group">
										<label>Effective Deadline Date</label>
										<input type="text" id="txtEffectiveTillDate" 
                            data-bind="value:EffectiveTillDate , event:{ blur:ValidateEffectiveDate }" 
                            class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" maxlength="10"
                            onfocus="UnicodeFocus(event,this);" 
                             />
									</div>
								</div>						
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">
										<button type="submit" class="btn btn-info" data-bind="click: SaveAppointment">Submit</button>
										<button type="submit" class="btn btn-default" data-bind="click: ClearControls">Cancel</button>
									</div>
								</div>
							</div>
						</div>

					</form>
				</div>
				<!-- /.box -->
			</div>
			<!--/.col (left) -->
			<!-- right column -->
			<!--/.col (right) -->
		</div>
		<!-- /.row -->
	</section>
	<script src="../../Scripts/PIS/Appointment.js"></script>
<%--	<script src="../../Scripts/PIS/Appointment.js" type="text/javascript"></script>--%>


</asp:Content>
