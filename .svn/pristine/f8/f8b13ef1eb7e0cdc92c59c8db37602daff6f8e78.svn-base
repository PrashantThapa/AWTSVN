<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="DepartmentSetup.aspx.cs" Inherits="HRFA.Modules.WFMS.DepartmentSetup" %>


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
						<h3 class="box-title">Department Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Organization<span class="red">*</span>  </label>
										<select id="lstOffices" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Offices, optionsText:'OfficeNameNep', optionsCaption: '------ Select one ------', value: SelectedOffice, event{change: GetDepartment} ">
</select>
									</div>
								</div>
								
								<div class="col-md-4">
									<div class="form-group">
										<label>Department</label>
										<select id="lstDepartments" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Departments, optionsText:'DeptDesc', optionsCaption: '------ Select one ------',value:SelectedLstDepart, event{change:GetDepartmentDetails}">
</select>
									</div>
								</div>

								<div class="col-md-3">
									<div class="row">
									<div class="form-group">
										<label>Department Name <span class="red">*</span> </label>
										 <input type="text" id="txtDeptDesc" 
                            data-bind="value:DeptDesc" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);" 
                            oninput="convert_to_unicode(this)"--%>
                             />
									</div>
										</div>
									<div class="row">
									<div class="form-group">
										<label>Parent Department <span class="red">*</span> </label>
										<select id="ddlParentDepartment" class="form-control select2"
															data-bind='options: Departments, optionsText: "DeptDesc",
                    optionsValue: $data, value:SelectedDepartment, 
                    optionsCaption:"--- Select one ---"'></select>
									</div>
										</div>
								</div>
								</div>

																			<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button type="submit" class="btn btn-info" data-bind = "click: SaveDepartment">Submit</button>
															<button type="submit" class="btn btn-default" data-bind="click:ClearAllControls">Cancel</button>
														</div>
													</div>
												</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	<script src="../../Scripts/WFMS/DepartmentSetup.js" type="text/javascript"></script>
	</asp:Content>