<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true"
	CodeBehind="AttendenceReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PortalReport.AttendenceReport" %>

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
						<h3 class="box-title">Attendance Report</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>From Date <span class="red">*</span></label>
										<input type="text" id="txtFromDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
											class="form-control" data-bind='value: FromDate' />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>To Date <span class="red">*</span></label>
										<input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
											onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);"
											class="form-control" data-bind='value: ToDate' />
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
	<script src="../../../Scripts/REPORTING/PortalReport/AttendenceReport.js" type="text/javascript"></script>
</asp:Content>
