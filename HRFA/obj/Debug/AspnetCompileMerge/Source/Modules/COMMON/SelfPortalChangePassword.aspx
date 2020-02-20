<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="SelfPortalChangePassword.aspx.cs" Inherits="IDS.Modules.COMMON.SelfPortalChangePassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
				
					<div class="box-header with-border">
						<h3 class="box-title">Self Portal Change Password</h3>
					</div>

					<form method="post" name="Login_Form">
												<div class="box-body">

						<div class="form-group has-feedback">
							<label class="control-label" for="username">User Name <span class="red">*</span></label>
							<input type="text" id="txtUserID" class="form-control" name="Username" data-bind="value: UserID" disabled="disabled" />
							<span class="glyphicon glyphicon-user form-control-feedback"></span>
						</div>

						<div class="form-group has-feedback">
							<label class="control-label" for="username">EmployeeID <span class="red">*</span></label>
							<input type="text" id="txtEmpID" class="form-control" data-bind="value: UserID" disabled="disabled" />
							<span class="glyphicon glyphicon-user form-control-feedback"></span>
						</div>

						<div class="form-group has-feedback">
							<label class="control-label" for="username">Old Password <span class="red">*</span></label>
							<input type="password" id="OldPassword" class="form-control" name="Password" data-bind="value: OldPassword" data-required="true" onkeypress="return isPasswordKey(event)" />
							<span class="glyphicon glyphicon-lock form-control-feedback"></span>
						</div>

						<div class="form-group has-feedback">
							<label class="control-label" for="username">New Password<span class="red">*</span></label>
							<input type="password" class="form-control" id="NewPassword" data-bind="value: NewPassword" data-required="true" onkeypress="return isPasswordKey(event)" />
							<span class="glyphicon glyphicon-lock form-control-feedback"></span>
						</div>

						<div class="form-group has-feedback">
							<label class="control-label" for="username">Confirm New Password<span class="red">*</span></label>
							<input type="password" class="form-control" id="ConfPassword" data-bind="value: ConfPassword" data-required="true" onkeypress="return isPasswordKey(event)" />
							<span class="glyphicon glyphicon-lock form-control-feedback"></span>
						</div>

						<button class="btn btn-primary btn-flat" value="Submit" title="save password" data-bind="click: SaveChangePassword">Continue </button>

						<button class="btn btn-primary btn-flat" data-bind="click: ClearControls">Cancel</button>

						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<script src="../../Scripts/COMMON/SelfPortalChangePassword.js" type="text/javascript"></script>
</asp:Content>
