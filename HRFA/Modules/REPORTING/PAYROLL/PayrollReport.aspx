<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
	CodeBehind="PayrollReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PAYROLL.PayrollReport" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<section class="content" id="ResignationForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">PaySlip Report</h3>
					</div>
					<!-- /.box-header -->

					<form runat="server" id="Form1" role="form">
						<div class="box-body">
						<%--	<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Report Type<span class="red">*</span></label>

										<select id="Select1" class="form-control select2" data-bind='options: ReportTypes, optionsText: "ReportTypeName",
	optionsValue: "ReportTypeID", value: SelectedReportType,
	optionsCaption: "------छान्नुहोस्-------", event: { change: $data.GetValue }'>
										</select>
									</div>
								</div>
							</div>--%>

							<div class="row">

								<div class="col-md-3">
									<div class="form-group">
										<label>Office<span class="red">*</span></label>
										<select id="ddlGLGroup" class="form-control select2" data-bind='options: OfficeArray,
	optionsText: "OfficeNameNep",
	optionsValue: $data,
	value: SelectedOffice,
	optionsCaption: "------छान्नुहोस्-------", event: { change: $data.GetCostCenter }'>
										</select>
									</div>
								</div>

								<%--<div class="col-md-3">
									<div class="form-group">
										<label>Cost Center</label>
										<select id="Select2" class="form-control select2" data-bind='options: CostCenters,
	optionsText: "CostCenterName",
	optionsValue: $data,
	value: SelectedCostCenter,
	optionsCaption: "------छान्नुहोस्-------"'>
										</select>
									</div>
								</div>--%>

							<%--	<div class="col-md-4">
									<div class="form-group">
										<label>Post</label>
										<select class="form-control select2" data-bind='options: Posts, optionsText: "PostDesc",
	optionsValue: $data, value: SelectedPost,
	optionsCaption: "------छान्नुहोस्-------" '>
										</select>
									</div>
								</div>--%>


							<%--</div>


							<div class="row">--%>
								<div class="col-md-3">
									<div class="form-group">
										<label>Fiscal Year</label>
										<select id="txtYear" class="form-control select2" data-bind='options: FiscalYears,
	optionsText: "FiscalYearName",
	optionsValue: $data,
	value: SelectedFiscalYear,
	optionsCaption: "------छान्नुहोस्-------"'>
										</select>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Month</label>
										<select id="ddlMonth" class="form-control select2" data-bind='options: Months, optionsText: "MonthName", optionsValue: $data,
	value: SelectedMonth, optionsCaption: "----Select Month-----", event: { change: $data.SetWorkingDaysBasedOnLeaveDaysDeducted }'>
										</select>
									</div>
								</div>

							</div>

							<div class="row">

								<div class="col-md-6">
									<button class="btn btn-primary"  data-bind="click: ViewReport" id="payrollreport">
										View Report</button>

									<button class="btn btn-primary" id="btnCancel" data-bind="click: CancelReport">
										Cancel</button>
								</div>

							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>


	<section class="content" style="display: none" id="showpayrollreport">

		<div id="customers">
			<div class="row print" id="ignorePDF">
				<div class="col-xs-12">
					<div class="form-group">
						<button type="submit" class="btn btn-info" id="btnExport">Excel</button>
						<button type="submit" class="btn btn-info" onclick="print()">PDF</button>
						<button type="submit" class="btn btn-default pull-right" onclick="printDiv()">Print</button>

					</div>
				</div>
			</div>

			<div class="row" id="try">
				<div id="test" class="testing">
					<!-- left column -->
					<div class="col-md-12">
						<!-- general form elements -->
						<div class="box box-primary">
							<div class="box-header with-border">
								<h3 class="box-title">PaySlip Report</h3>
							</div>
							<div class="box-body">
                                
								<div class="row" data-bind="if: Salaries">
									<div class="col-md-12">
                                       
										<div class="table-responsive">
											<table class="table-bordered table-condensed table-striped sort col-lg-12">
                                          
												<tr>
                                                       
											        <th>Employee's Name</th>
                                                    <th>Fiscal Year</th>
                                                    <th>Month</th>
                                                    <th>Post</th>
<%--												    <th>Department</th>--%>
                                                    <th>PF</th>
                                                    <th>Taxable Income</th>
                                                    <th>Allowance</th>
                                                    <th>Insurance</th>
                                                    <th>Basic Salary</th>
                                                    <th>Income Tax</th>
                                                    <th>Lunch</th>
                                                    <th>Advance</th>

												</tr>
                                                
												<tbody data-bind="foreach: Salaries">
                                                    <tr>
                                                       
                                                        <td data-bind="text: FNAME_ENG"></td>
                                                        <td data-bind="text: SalaryYear"></td>
                                                        <td data-bind="text: SalaryMonth"></td>
                                                        <td data-bind="text: PostDesc"></td>
<%--                                                        <td data-bind="text: DepartmentDesc"></td>--%>
                                                        <td data-bind="text: PF"></td>
                                                        <td data-bind="text: TAXABLEINCOME"></td>
                                                        <td data-bind="text: ALLOWANCE"></td>
                                                        <td data-bind="text: INSURANCE"></td>
                                                        <td data-bind="text: BASIC_SALARY"></td>
                                                        <td data-bind="text: INCOMETAX"></td>
                                                        <td data-bind="text: LUNCH"></td>
                                                        <td data-bind="text: ADVANCE"></td>


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
		</div>
	</section>

			<script src="../../../Scripts/REPORTING/Payroll/PayrollReport.js" type="text/javascript"></script>

	<script>
		$(document).ready(function () {
			$("#payrollreport").click(function () {
				$("#showpayrollreport").show();
			});
		});
	</script>

</asp:Content>
