<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Users.aspx.cs" Inherits="IDS.Modules.SECURITY.Users1" %>

<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl" TagName="EmployeeSearch" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">User Creation</h3>
					</div>

					<form class="" role="form" id="UsersForm">
						<div class="box-body">
								<div class="col-md-3">
										
									<div class="form-group">
										<label>Office<span class="red">*</span></label>
											<select id="	" class="form-control select2" data-bind="options: OfficeArray, optionsText: 'OfficeNameNep', value: SelectedOffice, optionsCaption: '------  Select one  ------', event: { change: $data.GetUserDetails }">
											</select>
										</div>

<%--									<div class="form-group">
											<label>User</label>
											<select id="ddlOfficeUser" class="form-control select2" data-bind="options: OfficeUserArray, optionsText: 'UserName', optionsCaption: '------- Select one -------',value: SelectedUser, event: { change: $data.GetUserDetails }">
											</select>
										</div>--%>
</div>

							<div class="col-md-9">
<%--																<div class="form-group">
											<label>User</label>
											<select id="ddlOfficeUser" class="form-control select2" data-bind="options: OfficeUserArray, optionsText: 'UserName', optionsCaption: '------- Select one -------',value: SelectedUser, event: { change: $data.GetUserDetails }">
											</select>
										</div>	--%>
									<div class="row">
										<div class="col-md-2">User ID <span class="mandatory">*</span></div>
										<div class="col-md-3">
											<input type="text" id="txtUserID" class='required form-control' data-bind="value: UserID" /></div>
									</div>
									<div class="row">
										<div class="col-md-2">User Name <span class="mandatory">*</span> </div>
										<div class="col-md-3 ">
											<input type="text" id="txtUserNameNep" class='required form-control' data-bind="value: UserNameNep" />
										</div>

										<div class="col-md-1"></div>
										<div class="col-md-3">User Name English <span class="mandatory">*</span></div>
										<div class="col-md-3">
											<input type="text" class='required form-control' id="txtUserNameEng" data-bind="value: UserName" /></div>

									</div>

									<div class="row">
										<div class="col-md-2">
											Employee Name 
										</div>
										<div class="col-md-3">
									    <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />
										</div>
										<div class="col-md-1">
											<button type="button" id="btnSearch" class="btn btn-primary btn-sm search pull-right" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>
										</div>

									</div>
								
								 <div class="row">
                                        <div class="col-md-2">Password&nbsp;<span class="mandatory">*</span></div>
                                        <div class="col-md-4">
                                        <input type="password" id="txtPassword" class='required form-control'  data-bind="value:Password"/>
                                        </div>
                                        
                                        <div class="col-md-3">Confirm Password <span class="mandatory">*</span></div>
                                        <div class="col-md-3"><input type="password" class='required form-control' id="txtConformPassword" data-bind="value:ConfirmPassword"/></div>
                                            
                                        </div>
									<br />
									<div class="row">
										<div class="col-md-2">Status <span class="mandatory">*</span></div>
										<div class="col-md-4 ">
											<input type="radio" name="Status" value="A" data-bind="checked: AccountStatus" />&nbsp;&nbsp;&nbsp;Active&nbsp;&nbsp;&nbsp;<input type="radio" name="Status" value="I" data-bind="checked: AccountStatus" />&nbsp;&nbsp;&nbsp;Inactive&nbsp;&nbsp;&nbsp;<br />
											<input type="radio" name="Status" value="S" data-bind="checked: AccountStatus" />&nbsp;&nbsp;&nbsp;Suspended
										</div>
										<%--<div class="col-md-3">Tran Date&nbsp;<span class="mandatory">*</span></div>
										<div class="col-md-3">
											<input type="text" id="txtTranDate" placeholder="YYYY.MM.DD" data-bind="value: TranDate" disabled /></div>--%>

									</div>

																	<br />
								<div class="row">
									<div class="col-md-2">Role <span class="mandatory">*</span></div>
										<div class="col-md-4 ">
											<select class="form-control select2" data-bind="options: RoleLST,value:SelectedRole, optionsText: 'RoleDescription',optionsCaption: '------  Select one ------'">
											</select>
										</div>
								</div>

								<div class="row">
									<button id="btnSubmit" class="btn btn-primary btn-md pull-right" data-bind="click:SaveUser">Submit</button>
								</div>

							</div>
							</div>
					</form>

				</div>
				<div class="clear"></div>
			</div>
		</div>
	</section>

	
	
	<script src="../../Scripts/SECURITY/UserModel.js" type="text/javascript"></script>

	
</asp:Content>
