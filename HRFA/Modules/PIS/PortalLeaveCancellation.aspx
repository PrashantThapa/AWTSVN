<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="PortalLeaveCancellation.aspx.cs" Inherits="HRFA.Modules.PIS.PortalLeaveCancellation" %>

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
						<h3 class="box-title">Portal Leave Application</h3>
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
										</div>
							</div>
						</div>
						</form>
				</div>
			</div>
			</div>
			</section>
	<script src="../../Scripts/PIS/PortalLeaveCancellation.js" type="text/javascript"></script>

</asp:Content>

