<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="ModuleVerification.aspx.cs" Inherits="IDS.Modules.VERIFICATION.ModuleVerification" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<style>
		.PopupPreview {
			cursor: pointer;
			text-align: center;
			width: 16px;
		}

		.PopupVerify {
			cursor: pointer;
			text-align: center;
			height: 16px;
			width: 16px;
		}

		.PopupReject {
			cursor: pointer;
			text-align: center;
		}

		.PopupForward {
			cursor: pointer;
			text-align: center;
		}

		.PopupTransaction {
			cursor: pointer;
			text-align: center;
		}

		.redCSS {
			background: #48ADFB !important;
		}

			.redCSS td {
				background: #48ADFB !important;
			}
	</style>
	<section class="content">
		<div class="row pages">
			<!-- left column -->
						
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Module Verification</h3>
					</div>
					<!-- /.box-header -->
					<div class="row">
						<div class="box-body">

							<div class="col-md-12">
								
								<div class="form-group">
									<label>Modules</label>

									<input autocomplete="off" type="text" style="float: right;" name="search"
									placeholder="Module Name" data-bind="value: Module, valueUpdate: 'input', event: { keyup: SearchModule }"/>

									<%--<input type="text" style="float: right;" id="txtsearch" name="search" class="form-control input-sm"
										placeholder="Module Name" data-bind="value: Module, valueUpdate: 'input', event: { keyup: SearchModule }" />--%>

									<table id="tblModule" class="table table-bordered table-hover wordlong">

										<thead>
											<tr>
												<th>ID
												</th>
											
												<th>Module
												</th>
												
												<th style="text-align: center">Action
												</th>
											</tr>
										</thead>
										<tbody data-bind="foreach: LoadModuleLST()">
											<tr data-bind="click: $root.LoadTransaction" onclick="highlightRow()">
												<td>
													<span data-bind="text: ($index() + 1)" />
												</td>
												
												<td style="width: 262px;">
													<span data-bind="text: ModuleCount"></span>
												</td>
												
												<td style="text-align: center">
													<span class="glyphicon glyphicon-ok PopupTransaction" data-bind="click: $root.LoadTransaction"
														data-content="Select Application Module!!!" onload="HoverTransaction()" aria-hidden="true"></span>
																								</td>
											</tr>
										</tbody>
									</table>
								</div>

							</div>

						</div>
					</div>


					<div class="row">
						<div class="box-body">
							<div class="col-md-12">

								<div class="form-group">
									<label>Transaction</label>

								<input autocomplete="off" type="text" style="float: right;" id="txtSubNo" name="search"
									placeholder="Submission Number" />

									<table id="tblModuleVarification" class="table table-bordered table-hover wordlong">

										<thead>
											<tr>
												<th>ID
												</th>
												<th>Tran No.
												</th>
												<%--<th>References
												</th>--%>
												<th>Remarks
												</th>
												<th colspan="3" style="text-align: center">Action
												</th>
											</tr>
										</thead>
										<tbody id="tblTransVerification" data-bind="foreach: TransactionLST()">
											<tr>
												<td>
													<span data-bind="text: ($index() + 1)" />
												</td>
												<td>
													<span data-bind="text: TranNo"></span>
												</td>
												<td>
													<span data-bind="text: Remarks"></span>
												</td>
<%--												<td></td>--%>
												<td style="text-align: center;">
													<%--<span class="glyphicon glyphicon-eye-open PopupPreview" data-bind="click:$root.GetApplicationByTranNumber" aria-hidden="true"></span>--%>
													<img class="PopupPreview" src="/Images/Eye.png" data-bind="click: $root.GetApplicationByTranNumber" />
												</td>
												<td style="text-align: center;">
													<%--<span class="glyphicon glyphicon-check PopupVerify" data-bind="click: $root.VerifyTransaction" aria-hidden="true"></span>--%>
													<img class="PopupVerify" src="/Images/Apply.png" data-bind="click: $root.VerifyTransaction" />
												</td>
												<td style="text-align: center;">
													<%--<span class="glyphicon glyphicon-ban-circle PopupReject" data-bind="click: $root.RejectTransaction" aria-hidden="true"></span>--%>
													<img class="PopupReject" src="/Images/Abort.png" data-bind="click: $root.RejectTransaction" />
												</td>
											</tr>
										</tbody>
									</table>


								</div>
							</div>
						</div>
					</div>
					<%--Begin model popup for Verified Contributors--%>
					<div id="modalVerifiedContributors" class="modal fade">
						<div class="modal-dialog" style="width: 70%;">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
										&times;</button>
									<h4 class="modal-title">Successfully Verified</h4>
									<h6>Submisson Number: <span id="spnSubmissionNo" />
									</h6>
								</div>
								<div class="modal-body">
									<div class="table-responsive">
										<table class="table table-bordered table-striped" id="tblVerifiedContributors">
											<thead>
												<tr>
													<th>Contributor Name
													</th>
													<th>User Name
													</th>
													<th>Password
													</th>
													<th>SSID
													</th>
												</tr>
											</thead>
											<tbody data-bind="foreach: GlobalArray">
												<tr>
													<td>
														<span data-bind="text: name" />
													</td>
													<td>
														<span data-bind="text: username" />
													</td>
													<td>
														<span data-bind="text: password" /></td>
													<td>
														<span data-bind="text: ssid" />
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="modal-footer">
									<input type="button" id="btnVerifiedContributorOk" value="OK" data-dismiss="modal"
										class="icon-ok" />
								</div>
							</div>
						</div>
					</div>
					<%--Begin model popup for Verified Contributors--%>

					<%--PopUp Modal--%>

					<div id="RejectModal" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog, col-lgs-6" style="margin-left: 400px; margin-top: 86px; width: 30%;">

							<!-- Modal content-->
							<div class="modal-content reject">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title">Reject Module</h4>
								</div>
								<div class="modal-body">
									<div class="row">

										<div class="col-md-3">Remarks <span class="mandatory">*</span></div>
										<div class="col-md-7 padding-left-0">
											<textarea name="txtRemarks" cols="35" rows="6" class='required form-control'
												id="txtRemarks" data-bind="value: Remarks"></textarea>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<div class="row">
										<div class="col-md-3"></div>
										<div class="col-md-9">
											<button class="btn btn-primary" data-bind="click: RejectTran">Reject</button>
											<button class="btn btn-primary" data-dismiss="modal">Cancel</button>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>


					<script type="text/javascript">

						function showModel() {
							$('#modalVerifiedContributors').modal('show');
						}

						function HoveRPReview() {
							$('.PopupPreview').popover({
								trigger: "hover",
								placement: "top",
								title: "<b>Preview !!!</b>",
								html: true,
								container: 'body'
							});

						}
						function HoverVerify() {
							$('.PopupVerify').popover({
								trigger: "hover",
								placement: "top",
								title: "<b>Verify !!!</b>",
								html: true,
								container: 'body'
							});

						}
						function HoverReject() {
							$('.PopupReject').popover({
								trigger: "hover",
								placement: "top",
								title: "<b>Reject !!!</b>",
								html: true,
								container: 'body'
							});

						}
						function HoverForward() {
							$('.PopupForward').popover({
								trigger: "hover",
								placement: "top",
								title: "<b>Forward !!!</b>",
								html: true,
								container: 'body'
							});

						}
						function HoverTransaction() {
							$('.PopupTransaction').popover({
								trigger: "hover",
								placement: "top",
								title: "<b>Select !!!</b>",
								html: true,
								container: 'body'
							});

						}

						function highlightRow() {

							var trInstance = $('#tblModule').find('tbody>tr');
							trInstance.click(function () {
								$('#tblModule >tbody>tr').removeClass('redCSS');
								var instance = $(this);
								instance.addClass('redCSS');
							});

						}

					</script>
					<%--<script type="text/javascript">
						$("#tblModuleVarification").stickyTableHeaders();
						$("#tblModule").stickyTableHeaders();

					</script>--%>

					<script type="text/javascript">
						$("#txtSubNo").keyup(function () {
							_this = this;
							// Show only matching TR, hide rest of them
							$.each($("#tblTransVerification").find("tr"), function () {
								if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
									$(this).hide();
								else
									$(this).show();
							});
						});
					</script>

				</div>
		</div>

			</div>
	</section>
	<script src="../../Scripts/VERIFICATION/ModuleVerification.js" type="text/javascript"></script>

</asp:Content>


