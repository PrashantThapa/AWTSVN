<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SalaryItem.aspx.cs" Inherits="HRFA.Modules.PAYROLL.SalaryItem" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<!-- general form elements -->
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Bank Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank ID </label>
										<input type="text" class="form-control" id="BankID" data-bind="value: BankID" disabled="disabled" />
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank Name(In Devnagari) </label>
										<input type="text" class="form-control" id="BankName" data-bind="value: BankName" oninput="convert_to_unicode(this)"
											data-required="true" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank Name <span class="red">*</span></label>
										<input type="text" class="form-control" id="BankNameEn" data-bind="value: BankNameEn" />
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank Category </label>
										<input type="text" class="form-control" id="BankCategory" data-bind="value: BankCategory" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank Address(In Devnagari)<span class="red">*</span></label>
										<input type="text" class="form-control" id="BankAddress" data-bind="value: BankAddress" oninput="convert_to_unicode(this)" />
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Bank Address</label>
										<input type="text" class="form-control" id="BankAddressEn" data-bind="value: BankAddressEn" />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<div class="checkbox">
											<label>
												<input id="Status" type="checkbox" data-bind="checked: Status"
													checked="checked" />Status
											</label>
										</div>
									</div>
								</div>
								<!-- /.row -->
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">

										<button type="submit" class="btn btn-info" data-bind="click: $root.AddBank">Add</button>
										<button type="submit" class="btn btn-default" data-bind="click: ClearControls">Cancel</button>
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										<tr>
											<th>S.N.
											</th>
											<%--<th>Bank Name(In Devnagari)
											</th>--%>
											<th>Bank Name
											</th>
											<th>Bank Category
											</th>
											<%--<th>Bank Address(In Devnagari)
											</th>--%>
											<th>Bank Address
											</th>
											<th>Status
											</th>
											<th>Action
											</th>
										</tr>
										<tbody data-bind="foreach: Banks">
											<tr>
												<td>
													<span data-bind="text: ($index() + 1)"></span><span data-bind="text: BankID" style="width: 100px; visibility: hidden" /><span data-bind="text: Action" style="width: 100px; visibility: hidden" />
												</td>
												<%--<td>
													<span data-bind="text: BankName" style="width: 120px;" />
												</td>--%>
												<td>
													<span data-bind="text: BankNameEn" style="width: 120px;" />
												</td>
												<td>
													<span data-bind="text: BankCategory" style="width: 120px;" />
												</td>
												<%--<td>
													<span data-bind="text: BankAddress" style="width: 120px;" />
												</td>--%>
												<td>
													<span data-bind="text: BankAddressEn" style="width: 120px;" />
												</td>
												<td>
													<input type="checkbox" data-bind="checked: Status" style="width: 50px;" disabled="disabled" />
												</td>
												<td>
													<a data-bind="click: $root.EditBank"><span class="glyphicon glyphicon-edit" title="Edit"></span></a><a data-bind="click: $root.DeleteBank"><span class="glyphicon glyphicon-trash"
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

	<script src="../../Scripts/CENTRALLOOKUP/Bank.js" type="text/javascript"></script>
</asp:Content>
