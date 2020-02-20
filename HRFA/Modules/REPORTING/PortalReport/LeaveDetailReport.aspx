﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="LeaveDetailReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PortalReport.LeaveDetailReport" %>

<%--<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="HolidayReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PIS.HolidayReport" %>--%>

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
						<h3 class="box-title">Leave Detail Report</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form runat="server" id="Form1" role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<button class="btn btn-info" data-bind="click: ViewReport">View Report</button>
										<button class="btn btn-default" data-bind="click: Cancel">Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	
	<script src="../../../Scripts/REPORTING/PortalReport/LeaveDetailReport.js" type="text/javascript"></script>

</asp:Content>
