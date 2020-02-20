﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SalaryItem.aspx.cs" Inherits="HRFA.Modules.PAYROLL.SalaryItem" %>

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
						<h3 class="box-title">Employee Salary Deduction</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Salary Item List </label>
										<select id="lstLeaveType" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options: SalaryItems, optionsText: 'SalaryItemDesc', optionsValue: 'SalaryItemID',
	optionsCaption: '------Options-------', value: SelectedSalaryItem, event: { change: SalaryItemDetails }">
										</select>
									</div>
								</div>
								<div class="col-md-5">
									<div class="row">
										<div class="form-group">
											<label>Salary <span class="red">*</span></label>
											<input type="text" id="txtSalaryItem"
												data-bind="value: SalaryItemDesc" class='required form-control'
												<%--                            onkeypress="UnicodeKeyPress(event,this);" 
																		onkeyup="UnicodeKeyUp(event,this);" 
																		onchange="UnicodeChange(event,this);" 
																		onfocus="UnicodeFocus(event,this);" 
																		oninput="convert_to_unicode(this)"--%> />

										</div>
									</div>
									<div class="row">
										<div class="form-group">
											<label>Type </label>
											<div class="checkbox">
												<input type="radio" name="ItemType" value="A" data-bind="checked: ItemType" class="minimal" />&nbsp;ADD
										 <label>										 </label>

											 <input type="radio" name="ItemType" value="D" data-bind="checked: ItemType" class="minimal" />&nbsp;DEDUCT

											</div>
										</div>
									</div>
									<div class="row">
										<div class="form-group">
											<label>Included in Tax Calculations? </label>
											<div class="checkbox">
												<input type="radio" name="Taxable" value="Y" data-bind="checked: Taxable" class="minimal" />&nbsp;Yes
												<label></label>
												<input type="radio" name="Taxable" value="N" data-bind="checked: Taxable" class="minimal" />&nbsp;No

									
											</div>
										</div>
									</div>

									<div class="row">
										<div class="form-group">
											<div class="col-md-6"></div>
									<div class="col-md-6 pull-right">
            <button class="btn btn-primary" id="btnSave" data-bind="click:SaveSalaryItem">Save</button>
            <button class="btn btn-primary" id="btnCancel" data-bind="click:CancelSalaryItem">Cancel</button>
			<button type="submit" class="btn btn-danger" data-bind="click:DeleteSalaryItem">Delete</button>
        </div>
											</div>
									<%--<div class="row">
										<div class="form-group">
											<label>जि.एल. कोड <span class="red">*</span></label>
											<select id="Select1" class="form-control select2"
												data-bind='options: ParentGL_Array, optionsText: "AccName",
	optionsValue: "AccCode", value: SelectedParentGL,
	optionsCaption: "--- छान्नुहोस ---" '>
											</select>
										</div>
									</div>--%>

								</div>
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

	<script src="../../Scripts/PAYROLL/SalaryItem.js" type="text/javascript"></script>
</asp:Content>