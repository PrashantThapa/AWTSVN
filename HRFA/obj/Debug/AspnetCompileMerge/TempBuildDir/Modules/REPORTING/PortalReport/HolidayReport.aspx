<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="HolidayReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PortalReport.HolidayReport" %>

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
						<h3 class="box-title">Public Holiday List</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form runat="server" id="Form1" role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>From Date <span class="red">*</span></label>
										<input type="text" id="txtFromDate" data-bind="value: FromDate" class='required form-control bod-picker'
											onkeypress="return isNumberKey(event)" onblur="return checkFronNepDate(this,'N',true);"
											placeholder="YYYY.MM.DD" onfocus="UnicodeFocus(event,this);" onpaste="return true" />

									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>To Date <span class="red">*</span></label>
										<input type="text" id="txtToDate" data-bind="value: ToDate" class='required form-control bod-picker'
											onkeypress="return isNumberKey(event)" onblur="return checkToNepDate(this,'N',true);"
											placeholder="YYYY.MM.DD" onfocus="UnicodeFocus(event,this);" onpaste="return true" />

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-6">
									<div class="form-group">
										<button class="btn btn-info" data-bind="click: ViewReport">View Report</button>
										<button type="button" class="btn btn-default" data-bind="click: Cancel">
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

	<section class="content" data-bind="if:ShowReport">

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
									<h3 class="box-title">Holiday Report</h3>
									<span class="pull-right">Date: <span id="currNepsDate" /></span>
								</div>

								<div class="box-body">
									<div class="row wordlong" data-bind="if: ShowEmployeeHolidays">
										<div class="col-xs-12">
											<table class="table table-striped table-bordered">
												<tr>
													<th>S.N:</th>
													<th>Holiday Details:</th>
													<th>From Date:</th>
													<th>To Date:</th>
												</tr>

												<tbody data-bind="foreach: ShowEmployeeHolidays">
													<tr>
														<td data-bind="text: ($index() + 1)"></td>
														<td data-bind="text: HOLIDAY_DESC"></td>
														<td data-bind="text: FROM_DATE"></td>
														<td data-bind="text: TO_DATE"></td>
														
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
	<script>
		$(document).ready(function () {
			$("#EmpDet").click(function () {
				$("#showdet").show();
			});
		});
	</script>
	<script src="../../../Scripts/REPORTING/PortalReport/HolidayReport.js" type="text/javascript"></script>
</asp:Content>
