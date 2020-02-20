<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="OfficeSetup.aspx.cs" Inherits="HRFA.Modules.WFMS.OfficeSetup" %>


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
						<h3 class="box-title">Office Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office List</label>
										<select id="lstOffices" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Offices, optionsText:'OfficeNameNep', optionsValue:'OfficeCode', 
             optionsCaption: '----------Select one --------------', value: SelectedOffice, event:{ change: GetOfficeDetails }">
</select>
									</div>
								</div>
								<div class="col-md-5">
									<div class="row">
																		<div class="col-md-12">

										<div class="form-group">
											<label>Office Name <span class="red">*</span></label>
										 <input type="text" id="txtOfficeName" 
                            data-bind="value:OfficeNameNep" class='required form-control'         
                             />
										</div>
																			</div>
									</div>
									
<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office Address</label>
										<input type="text" id="txtOfficeAddress" 
                            data-bind="value:Address" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);" 
                            oninput="convert_to_unicode(this)"--%>
                             />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Office Phoneno. <span class="red">*</span></label>
<input type="text" id="txtOfficePhone" 
                            data-bind="value:PhoneNo" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);" --%>
                             />									</div>
								</div>
								<!-- /.row -->
							</div>
									<div class="row">
									<div class="col-md-6">
									<div class="form-group">
										<label>Office Email </label>
										<input type="text" id="txtOfficeEmail" 
                            data-bind="value:Email" class='required form-control'  />
									</div>
								</div>
									<div class="col-md-6">
									<div class="form-group">
										<label>Parent Organization  </label>
										<select id="ddlParentOrganization" class="form-control select2"
												data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue:"OfficeCode" , value:SelectedParentOrganization, 
                    optionsCaption:"----Select one-------"'></select>
										</div>
    
									</div>
								</div>
									</div>
										
										<div class="row">
									<div class="col-md-6">
									<div class="form-group">
										<button type="submit" class="btn btn-info" id="btnSave" data-bind="click:SaveOffice">Add</button>
										<button type="submit" class="btn btn-default" id="btnCancel" data-bind="click:CancelOffice">Cancel</button>
										<button type="submit" class="btn btn-default" data-bind="click:DeleteOffice">Delete</button>
									</div>
								</div>
																			
								<!-- /.row -->
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

    <script src="../../Scripts/CENTRALLOOKUP/OfficeSetup.js" type="text/javascript"></script>
</asp:Content>

