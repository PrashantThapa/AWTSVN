<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="LeaveRequestReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PIS.LeaveRequestReport" %>

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
						<h3 class="box-title">Leave Request Report</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

					<form class="" runat="server" id="Form1" role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office</label>

										<select id="lstOffice" class="form-control select2" data-bind="options: Offices, optionsText: 'OfficeNameNep', optionsCaption: '----Select One----', optionsValue: 'OfficeCode', value: SelectedOffice">
										</select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Start Date</label>
										<input type="text" id="txtFromDate" onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'Y',true);"
											placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" class="form-control" data-bind="value: FromDate" />

									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>End Date</label>

										<input type="text" id="txtToDate" onkeypress="return isNumberKey(event)"
											onblur="return valFutureDate(this,'Y',true);"
											placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" class="form-control" data-bind="value: ToDate, event: { blur: ValidateToDate }" />
									</div>

								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<button class="btn btn-primary" data-bind="click: ViewReport" id="EmpDet">View Report</button>
										<button type="button" class="btn btn-primary" data-bind="click: Cancel">
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

	<section class="content" style="display: none" id="showdet">

		<div id="customers">
			<div class="row print" id="ignorePDF">
				<div class="col-xs-12">
					<div class="form-group">
						<button type="submit" class="btn btn-info" id="btnExport">Excel</button>
						<button type="submit" class="btn btn-info" onclick="javascript:demoFromHTML();">PDF</button>
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
							<h3 class="box-title">Reports</h3>
						</div>
						<div class="box-body">

							<div class="row" data-bind="if: LeaveReports()">
								<div class="col-md-12">
									<label>Office Name : <span data-bind="text: LeaveReports().OFFICE_NAME_NEPALI"></span></label>
								</div>
								<div class="col-md-12">
									<div class="table-responsive">
										<table class="table-bordered table-condensed table-striped sort col-lg-12">

											<tr>
												<th>S.N</th>
												<th>Employee Name</th>
												<th>Leave Type</th>
												<th>Start Date</th>
												<th>End Date</th>
												<th>Remarks</th>
											</tr>

											<tbody data-bind="foreach: LeaveReports">
												<tr>
													<td data-bind="text: ($index() + 1)"></td>
													<td data-bind="text: EMP_NAME"></td>
													<td data-bind="text: LEAVE_TYPE_NAME"></td>
													<td data-bind="text: APP_FROM_DATE"></td>
													<td data-bind="text: APP_TO_DATE"></td>
													<td data-bind="text: REMARKS"></td>
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

	<script>
		$(document).ready(function () {
			$("#EmpDet").click(function () {
				$("#showdet").show();
			});
		});
	</script>
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

	<%--<script>
		function demoFromHTML() {

			var pdf = new jsPDF('p', 'pt', 'letter');

			pdf.addFont('NotoSansCJKjp-Regular.ttf', 'NotoSansCJKjp', 'normal');

			// source can be HTML-formatted string, or a reference
			// to an actual DOM element from which the text will be scraped.
			source = $('#customers')[0];

			// we support special element handlers. Register them with jQuery-style 
			// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
			// There is no support for any other type of selectors 
			// (class, of compound) at this time.
			specialElementHandlers = {
				// element with id of "bypass" - jQuery style selector
				'#bypassme': function (element, renderer) {
					// true = "handled elsewhere, bypass text extraction"
					return true
				}
			};
			margins = {
				top: 80,
				bottom: 60,
				left: 10,
				width: 700
			};
			// all coords and widths are in jsPDF instance's declared units
			// 'inches' in this case
			pdf.fromHTML(
				source, // HTML string or DOM elem ref.
				margins.left, // x coord
				margins.top, { // y coord
					'width': margins.width, // max width of content on PDF
					'elementHandlers': specialElementHandlers
				},

				function (dispose) {
					// dispose: object with X, Y of the last line add to the PDF 
					//          this allow the insertion of new lines after html
					pdf.save('Test.pdf');
				}, margins);
		}
	</script>
	<script>
		var doc = new jsPDF();
		var elementHandler = {
			'#ignorePDF': function (element, renderer) {
				return true;
			}
		};
		var source = window.document.getElementsByTagName("body")[0];
		doc.fromHTML(
			source,
			15,
			15,
			{
				'width': 180, 'elementHandlers': elementHandler
			});

		doc.output("dataurlnewwindow");
	</script>--%>
	<script type="text/javascript">
		function printDiv() {
			var printContents = document.getElementById('test').innerHTML;
			var originalContents = document.body.innerHTML;
			document.body.innerHTML = printContents;
			window.print();
			document.body.innerHTML = originalContents;
		}
	</script>
	<script src="../../../JsLibrary/jsPDF/dist/jspdf.min.js"></script>
	<script src="https://rawgit.com/sphilee/jsPDF-CustomFonts-support/master/dist/jspdf.customfonts.min.js"></script>

	<script src="../../../Scripts/REPORTING/PIS/LeaveRequestReport.js" type="text/javascript"></script>
</asp:Content>
