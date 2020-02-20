<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
	CodeBehind="BankAccountSetUp.aspx.cs" Inherits="IDS.Modules.CENTRALLOOKUP.BankAccountSetUp" %>

<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
	TagName="EmployeeSearch" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	    <WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<!-- general form elements -->
	<section class="content" id="BankAccountForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Bank Account Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Employee Name<span class="red">*</span> </label>
										<input type="text" id="txtEmployeeID" data-bind="value: EmployeeName" class='required form-control' disabled />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<button type="button" id="btnSearch" class="btn btn-primary search wordlong"
											data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">
											Search</button>
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank Name <span class="red">*</span> </label>
										<select id="slGender" class="form-control select2"
											data-bind="options: Banks, optionsText: 'BankName', optionsValue: $data, value: SelectedBank, optionsCaption: '---- Select one----'">
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Account Number <span class="red">*</span></label>
										<input type="text" class="form-control input-sm" name="accountNo" data-bind="value: BankAccountNo" />
									</div>
								</div>
								<!-- /.row -->
							</div>

<%--							//GL Code for future implementation//--%>
							<%--<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>जी एल कोड <span class="red">*</span> </label>
										<select id="ddlParentGL" class="form-control select2"
											data-bind='options: ParentGL_Array,
	optionsText: "AccName",
	optionsValue: $data,
	value: SelectedParentGL,
	optionsCaption: "------छान्नुहोस्-------"'>
										</select>
									</div>
								</div>
								<!-- /.row -->
							</div>--%>
							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">

										<button type="submit" class="btn btn-info" id="Addtoggle" data-bind="click: isNewAdd">Add</button>
										<button type="submit" class="btn btn-default" data-bind="click: $root.ClearControls">Cancel</button>
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										<tr>
											<th>S.N.</th>
											<th>Employee</th>
											<th>Branch</th>
											<th>Bank Name</th>
											<th>Account Number</th>
											<%--<th>जी एल कोड</th>--%>
											<th>Action</th>
										</tr>
										<tbody data-bind="foreach: BankLsts">
											<tr>
												<td>
													<span data-bind="text: ($index() + 1)"></span><span data-bind="text: Bank().BankID"
														style="width: 100px; visibility: hidden" /><span data-bind="text: AccCode" style="width: 100px; visibility: hidden" /><span data-bind="text: Action" style="width: 100px; visibility: hidden" />
												</td>
												<td>
													<span data-bind="text: EmployeeName" style="width: 120px;" />
												</td>
												<td>
													<span data-bind="text: OfficeName" style="width: 120px;" />
												</td>
												<td>
													<span data-bind="text: Bank().BankName" style="width: 120px;" />
												</td>
												<td>
													<span data-bind="text: AccountNo" style="width: 120px;" />
												</td>
												<%--<td>
													<span data-bind="text: GLName" style="width: 120px;" />
												</td>--%>
												<td>
													<a data-bind="click: $root.Edit"><span class="glyphicon glyphicon-edit" title="Edit"></span></a><a data-bind="click: $root.Delete"><span class="glyphicon glyphicon-trash"
														title="Delete" rel="tooltip"></a>
												</td>
											</tr>
										</tbody>
									</table>
									<button type="submit" class="btn btn-info pull-right" data-bind="click: SaveBank">Submit</button>


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

	<script src="../../Scripts/CENTRALLOOKUP/BankAccountSetup.js" type="text/javascript"></script>
</asp:Content>
