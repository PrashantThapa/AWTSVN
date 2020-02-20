<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PortalEmpSearchControl.ascx.cs" Inherits="HRFA.Modules.PIS.PortalEmpSearchControl" %>
<div class="modal" id="modalPortalEmpSearch" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true" style="opacity: 1 !important">
	<div class="modal-dialog-lg" role="document">
		<div class="modal-content">
			<section class="content">
				<div class="row pages">
					<!-- left column -->
					<div class="col-md-12">
						<!-- general form elements -->

						<!-- general form elements -->
						<div class="box box-primary">
							<div class="box-header with-border">
								<h3 class="box-title">Employee search</h3>
							</div>
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h3 class="modal-title" id="myModalLabel">Employee Search</h3>

								<div class="box-body">
									<div class="row">
										<div class="col-md-12">
											<form class="form-horizontal" role="form" action="">
												<div class="box-body">

													<div class="row">
														<div class="col-md-6">
															<div>
																<label>Employee Id</label>
																<input type="text" id="txtEmpID" data-bind="value: EmpID" class='required form-control' />
															</div>
														</div>
													
														<div class="col-md-6" id="divOfficeList">
															<label>Office</label>
															<select id="ddlOffice" class="form-control select2"
																	data-bind='options: Offices, optionsText: "OfficeNameNep",
	optionsValue: "OfficeCode", value: SelectedOffice,
	optionsCaption: "--- Select One ---"'>
																</select>
														</div>
													</div>

													<div class="row">
														<div class="col-md-6 wordlong">
															<div>
																<label>Frist Name(in Devnagari)</label>
																<input type="text" id="txtFirstNameNep" data-bind="value: FirstNameNep" class='required form-control'
																	onkeypress="UnicodeKeyPress(event,this);" onkeyup="UnicodeKeyUp(event,this);"
																	onchange="UnicodeChange(event,this);" onfocus="UnicodeFocus(event,this);" />
															</div>
														</div>

														<div class="col-md-6 wordlong">
															<div class="row">
																<div class="col-md-6">
																	<div>
																		<label>Middle Name(in Devnagari)</label>
																		<input type="text" id="txtMiddleNameNep" data-bind="value: MiddleNameNep" class='required form-control'
																			onkeypress="UnicodeKeyPress(event,this);" onkeyup="UnicodeKeyUp(event,this);"
																			onchange="UnicodeChange(event,this);" onfocus="UnicodeFocus(event,this);" />

																	</div>
																</div>

																<div class="col-md-6">

																	<div>
																		<label>Last Name(in Devnagari)</label>
																		<input type="text" id="txtLastNameNep" data-bind="value: LastNameNep" class='required form-control'
																			onkeypress="UnicodeKeyPress(event,this);" onkeyup="UnicodeKeyUp(event,this);"
																			onchange="UnicodeChange(event,this);" onfocus="UnicodeFocus(event,this);" />
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div class="row">
														<div class="col-md-6 wordlong">
															<div>
																<label>First Name</label>
																<input type="text" id="txtFirstNameEng" data-bind="value: FirstNameEng" class='required form-control' />
															</div>
														</div>

														<div class="col-md-6 wordlong">
															<div class="row">
																<div class="col-md-6">
																	<div>
																		<label>Middle Name</label>
																		<input type="text" id="txtMiddleNameEng" data-bind="value: MiddleNameEng" class='required form-control' />
																	</div>
																</div>

																<div class="col-md-6">

																	<div>
																		<label>Last Name</label>
																		<input type="text" id="txtLastNameEng" data-bind="value: LastNameEng" class='required form-control' />
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-md-6 wordlong">
															<div>
																<button type="submit" class="btn btn-info" id="btnEmpSearch"
																	data-bind="click: SearchEmployee">
																	Search</button>
																<button type="submit" class="btn btn-default" id="btnEmpClear"
																	data-bind="click: ClearEmployee">
																	Cancel</button>
															</div>
														</div>
													</div>
													<div class="row wordlong">

														<div class="col-md-12" id="tblEmpSearchRes">
															<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
																<tr>
																	<th>Employee Id
																	</th>
																	<th>Office Name
																	</th>
																	<th>Employee Name
																	</th>
																	<th>Action
																	</th>
																</tr>
																<tbody data-bind="foreach: EmployeeList">
																	<tr>
																		<td data-bind="text: $data.SymbolNo"></td>
																		<td data-bind="text: $data.OfficeName"></td>
																		<td data-bind="text: $data.EmpName"></td>
																		<td>
																			<a data-bind="click: $root.SelectEmployee"><span class="glyphicon glyphicon-circle-arrow-down"
																				title="Select"></span></a>
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
						

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
<script src="../../Scripts/PIS/PortalEmployeeSearch.js" type="text/javascript"></script>


