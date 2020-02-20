<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
	CodeBehind="AttendanceReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PIS.AttendanceReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<section class="content" id="EmpGradeForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Attendance Download</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

					<form role="form" runat="server" id="Form1">
						<div class="box-body">

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office<span class="red">*</span></label>
										<select id="lstOffice" class="form-control select2"
											data-bind="options: Offices, optionsText: 'OfficeNameNep', optionsCaption: '------छान्नुहोस्-------', optionsValue: 'OfficeCode', value: SelectedOffice">
										</select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>From Date: <span class="red">*</span></label>

										<input type="text" id="txtFromDate" data-bind="value: FromDate" class='required form-control bod-picker'
<%--											onkeypress="return isNumberKey(event)" onblur="return checkFronNepDate(this,'Y',true);"--%>
											onkeypress="return isNumberKey(event)"
											placeholder="YYYY.MM.DD" onfocus="UnicodeFocus(event,this);" onpaste="return true" />

									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>To Date:<span class="red">*</span></label>

										<input type="text" id="txtToDate" data-bind="value: ToDate" class='required form-control bod-picker'
<%--											onkeypress="return isNumberKey(event)" onblur="return checkToNepDate(this,'Y',true);"--%>
																						onkeypress="return isNumberKey(event)"
											placeholder="YYYY.MM.DD" onfocus="UnicodeFocus(event,this);" onpaste="return true" />

									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<button class="btn btn-info" data-bind="click: ViewReport">
											View Report</button>
										<button class="btn btn-default" data-bind="click: Cancel">
											Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</form>

				</div>
			</div>
		</div>

	</section>


	<section class="content" data-bind="if: ShowReport">

			<div id="customers">
				<div class="row print" id="ignorePDF">
					<div class="col-xs-12">
						<div class="form-group">
							<button type="submit" class="btn btn-info" id="btnExport">Excel</button>
							<button type="submit" class="btn btn-info" onclick="javascript:demoFromHTML();">PDF</button>
							<input type="button" value="Print" class="btn btn-default pull-right" onclick=" printDiv();" />
						</div>
					</div>
				</div>

				<div class="row" id="try">
					<div id="test" class="testing">

						<!-- left column -->
						<div class="col-xs-12">
							<!-- general form elements -->
							<div class="box box-primary">
								<div class="box-header with-border">
									<h3 class="box-title">Attendance Report</h3>
									<span class="pull-right">Date: <span id="currNepsDate" /></span>
								</div>

								<div class="box-body">


									<div class="row wordlong" data-bind="if: EmployeeAtts">
										<div class="col-xs-12">
											<table class="table table-striped table-bordered">
												<tr>
													<th>Employee ID</th>
													<th>Employee Name</th>
													<th>ATT_DATE</th>
													<th>IN_TIME</th>
													<th>OUT_TIME</th>
													<th>Office</th>
													<th>Status</th>
													<th>Difference</th>
													<th>Working Hours</th>

<%--													<th>Remarks</th>--%>

												</tr>

												<tbody data-bind="foreach: EmployeeAtts">
													<tr>
														<td data-bind="text: EMP_ID"></td>
														<td data-bind="text: EMP_NAME"></td>
														<td data-bind="text: ATT_DATE"></td>
														<td data-bind="text: IN_TIME"></td>
														<td data-bind="text: OUT_TIME"></td>
														<td data-bind="text: OFFICE_NAME_NEPALI"></td>
														<td data-bind="text: Status"></td>
														<td data-bind="text: Difference"></td>
														<td data-bind="text:WorkingHours"></td>

												</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>

							</div>

						</div>

					</div>

				</div>
			</div>


		</section>
	<script src="../../../Scripts/REPORTING/PIS/AttendanceReport.js" type="text/javascript"></script>
</asp:Content>
