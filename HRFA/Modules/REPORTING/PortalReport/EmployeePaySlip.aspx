<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="EmployeePaySlip.aspx.cs" Inherits="HRFA.Modules.REPORTING.PortalReport.EmployeePaySlip" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Pay Slip Report</h3>
					</div>

					<form runat="server" id="Form1" role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Year<span class="red">*</span></label>
										<%--<input type="text" id="ddlmonth" data-bind="value: Year" class='required form-control'
											onkeypress="return isNumberKey(event)" maxlength="4" />--%>
										<select id="txtYear" class="form-control select2" data-bind='options: FiscalYears,
	optionsText: "FiscalYearName",
	optionsValue: $data,
	value: SelectedFiscalYear,
	optionsCaption: "------छान्नुहोस्-------"'>
										</select>
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Month <span class="red">*</span></label>

										<select id="ddlYear" class="form-control select2" data-bind='options: Months, optionsText: "MonthName",
	optionsValue: "MonthID", value: SelectedMonth,
	optionsCaption: "------Select one-------"'>
										</select>
									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-6">
									<div class="form-group">
										<button class="btn btn-info" data-bind="click: ViewReport" id="payrollreport">
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

	<%--<section class="content" data-bind="if:ShowReport">
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
									<h3 class="box-title">Employee Details Report</h3>
									<span class="pull-right">Date: <span id="currNepsDate" /></span>
								</div>

								<div class="box-body">
									<div class="row invoice-info wordlong" data-bind="if: EmployeeDets()[0]">

											<div class="row">
												<div class="col-xs-12">
													<div class="form-group">
														<label>Employee Name :</label>
														<span data-bind="text: EmployeeDets()[0].SYMBOL_NO"></span>
													</div>
												</div>
												</div>

												<div class="row">
												<div class="col-xs-12">
													<div class="form-group">
														<label>Post :</label>
														<span data-bind="text: EmployeeDets()[0].OFFICE_NAME_NEPALI"></span>
													</div>
												</div>
											</div>
											
										<div class="row">
												<div class="col-xs-12">
													<div class="form-group">
														<label>Name :</label>
														<span data-bind="text: EmployeeDets()[0].EMP_NAME_NEP"></span>
													</div>
												</div>
											</div>

										<div class="row">
												<div class="col-xs-12">
													<div class="form-group">
														<label>Post :</label>
														<span data-bind="text: EmployeeDets()[0].POST_DESC"></span>
													</div>
												</div>
											</div>

								</div>

									<div class="row invoice-info wordlong" data-bind="if: EmployeeDets()[0]">

										<div class="col-xs-12">
											<div class="row">
												<div class="col-xs-6">
													<div class="form-group">
														<label>Citizen Investment Trust :</label>
														<span data-bind="text: EmployeeDets()[0].EMP_NAME_ENG"></span>
													</div>
												</div>

												<div class="col-xs-6">
													<div class="form-group">
														<label>Grade Upgrade Month :</label>
														<span data-bind="text: EmployeeDets()[0].DOB"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-6">
													<div class="form-group">
														<label>Employee Provident Fund Number:</label>
														<span data-bind="text: EmployeeDets()[0].COUNTRY_NAME"></span>
													</div>
												</div>

												<div class="col-xs-6">
													<div class="form-group">
														<label>Attendance Days :</label>
														<span data-bind="text: EmployeeDets()[0].REL_NAME"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-6">
													<div class="form-group">
														<label>PAN No. :</label>
														<span data-bind="text: EmployeeDets()[0].MARST_NAME"></span>
													</div>
												</div>

												<div class="col-xs-6">
													<div class="form-group">
														<label>Number of Grade:</label>
														<span data-bind="text: EmployeeDets()[0].CIT_NO"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-6">
													<div class="form-group">
														<label> Bank Account Number. :</label>
														<span data-bind="text: EmployeeDets()[0].ALT_SOURCE_VAL"></span>
													</div>
												</div>

											</div>
										</div>
									</div>

									<div class="row wordlong" data-bind="if: EmployeePosts">
										<div class="col-xs-12 table-responsive">
											<table class="table table-striped table-bordered">

												<tr>
													<th>INCOME</th>
													<th>DEDUCTION</th>
												<tr>

												<tbody data-bind="foreach: EmployeePosts">
													<tr>
														<td data-bind="text: POST_DESC"></td>
														<td data-bind="text: POSTING_TYPE_ID"></td>
														<td data-bind="text: JOINING_DATE"></td>

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

</section>--%>

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

	<script src="../../../Scripts/REPORTING/PortalReport/EmployeePaySlip.js" type="text/javascript"></script>
	<script>
		$(document).ready(function () {
			$("#payrollreport").click(function () {
				$("#showpayrollreport").show();
			});
		});
	</script>
</asp:Content>
