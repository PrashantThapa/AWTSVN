<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="ViewProfileReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PortalReport.ViewProfileReport" %>

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
						<h3 class="box-title">View Profile Report</h3>
					</div>

					<form runat="server" id="Form1" role="form">

						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<button class="btn btn-primary" data-bind="click: ViewReport" id="payrollreport">View Report</button>
										<button class="btn btn-info" data-bind="click: Cancel">Cancel</button>
									</div>
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

										<div class="col-xs-9">
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Symbol No:</label>
														<span data-bind="text: EmployeeDets()[0].SYMBOL_NO"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
														<label>office:</label>
														<span data-bind="text: EmployeeDets()[0].OFFICE_NAME_NEPALI"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Name:</label>
														<span data-bind="text: EmployeeDets()[0].EMP_NAME_NEP"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
														<label>Current Post:</label>
														<span data-bind="text: EmployeeDets()[0].POST_DESC"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Name:</label>
														<span data-bind="text: EmployeeDets()[0].EMP_NAME_ENG"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
														<label>Date Of Birth:</label>
														<span data-bind="text: EmployeeDets()[0].DOB"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Country:</label>
														<span data-bind="text: EmployeeDets()[0].COUNTRY_NAME"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
														<label>Religion:</label>
														<span data-bind="text: EmployeeDets()[0].REL_NAME"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Marital Status:</label>
														<span data-bind="text: EmployeeDets()[0].MARST_NAME"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
														<label>CIT No.:</label>
														<span data-bind="text: EmployeeDets()[0].CIT_NO"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Mobile:</label>
														<span data-bind="text: EmployeeDets()[0].ALT_SOURCE_VAL"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
														<label>PF No.:</label>
														<span data-bind="text: EmployeeDets()[0].PROVIDENT_FUND_NO"></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-5">
													<div class="form-group">
														<label>Gender:</label>
														<span data-bind="text: EmployeeDets()[0].GENDER"></span>
													</div>
												</div>

												<div class="col-xs-7">
													<div class="form-group">
													</div>
												</div>
											</div>


										</div>

										<div class="col-xs-3">
											<div class="form-group">
												<label>Photo:</label>
                                                <input type="image" data-bind="attr:{src:(EmployeeDets()[0].IMAGE_FILE)}" style="width:200px"/>
											</div>
										</div>

										<!-- /.row -->
									</div>


									<div class="row wordlong" data-bind="if: EmployeeQuals">
										<div class="col-xs-12">
											<table class="table table-striped table-bordered">
												<tr>
													<th>Title:</th>
													<th>Country:</th>
													<th>Qualification:</th>
													<th>Institution:</th>
													<th>Start Date: </th>
													<th>End Date:</th>
													<th>Grade/Division:</th>
													<th>Percentage:</th>
													<th>Equivalence:</th>
													<th>Major Subject:</th>
													<th>Optional Subject:</th>
													<th>Remarks:</th>
												</tr>

												<tbody data-bind="foreach: EmployeeQuals">
													<tr>
														<td data-bind="text: TITLE"></td>
														<td data-bind="text: COUNTRY_NAME"></td>
														<td data-bind="text: QUAL_NAME"></td>
														<td data-bind="text: INSTITUTE"></td>
														<td data-bind="text: FROM_DATE"></td>
														<td data-bind="text: TO_DATE"></td>
														<td data-bind="text: GRADE"></td>
														<td data-bind="text: PERCENTAGE"></td>
														<td data-bind="text: EDUCATION_EQUIVALENCE"></td>
														<td data-bind="text: MAJOR_SUBJECT"></td>
														<td data-bind="text: OPTIONAL_SUBJECT"></td>
														<td data-bind="text: REMARKS"></td>

													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="row wordlong" data-bind="if: EmployeePosts">
										<div class="col-xs-12 table-responsive">
											<table class="table table-striped table-bordered">

												<tr>
													<th>Post:</th>
													<th>Post Type :</th>
													<th>Start Date:</th>
													<th>Decision Date:</th>
													<%--<th>Date:</th>--%>
												</tr>

												<tbody data-bind="foreach: EmployeePosts">
													<tr>
														<td data-bind="text: POST_DESC"></td>
														<td data-bind="text: POSTING_TYPE_ID"></td>
														<td data-bind="text: FROM_DATE"></td>
<%--														<td data-bind="text: DECISION_DATE"></td>--%>
														<%--<td data-bind ="if: POSTING_TYPE_ID = 'A',
															text: FROM_DATE"></td>--%>
<%--														<td data-bind=" POSTING_TYPE_ID = 'A' ? text:FROM_DATE"></td>--%>
														
														<td data-bind ="text: DECISION_DATE"></td>
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
		<!-- /.box-header -->

		<!-- form start -->

		<script type="text/javascript">
			var nepalisDate = "";
			$(document).ready(function () {

				if ($("#currNepsDate").val() == "") {
					var nepsDate = GetNepalisDate();
					$("#currNepsDate").text(nepsDate);
				}
            });

		</script>

		<script>
			$("#btnExport").click(function (e) {
				//getting values of current time for generating the file name
				//var dt = new Date();
				//var day = dt.getDate();
				//var month = dt.getMonth() + 1;
				//var year = dt.getFullYear();
				//var hour = dt.getHours();
				//var mins = dt.getMinutes();
				//var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
				//creating a temporary HTML link element (they support setting file names)
				var a = document.createElement('a');
				//getting data from our div that contains the HTML table
				var data_type = 'data:application/vnd.ms-excel;charset=utf-8';

				var table_html = $('#try')[0].outerHTML;
				//    table_html = table_html.replace(/ /g, '%20');
				table_html = table_html.replace(/<tfoot[\s\S.]*tfoot>/gmi, '');

				var css_html = '<style>td {border: 0.5pt solid #c0c0c0} .tRight { text-align:right} .tLeft { text-align:left} </style>';
				//    css_html = css_html.replace(/ /g, '%20');

				a.href = data_type + ',' + encodeURIComponent('<html><head>' + css_html + '</' + 'head><body>' + table_html + '</body></html>');
				//console.log('exported_table');
				//setting the file name
				a.download = 'exported_table_' + '.xls';
				////triggering the function

				a.click();
				//just in case, prevent default behaviour
				e.preventDefault();
			});
		</script>


	<script src="../../../Scripts/REPORTING/PortalReport/ViewProfileReport.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $("#payrollreport").click(function () {
                $("#showpayrollreport").show();
            });
        });
	</script>
</asp:Content>
