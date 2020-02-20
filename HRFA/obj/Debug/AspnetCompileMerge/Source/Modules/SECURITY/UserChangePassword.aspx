<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/AdminMaster.Master" CodeBehind="UserChangePassword.aspx.cs" Inherits="HRFA.Modules.SECURITY.UserChangePassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	
	<section class="content">
		<div class="row pages">
			<div class="login-box">
				<!-- /.login-logo -->
				<div class="login-box-body">
					<form action="" method="post" runat="server" id="Form1" role="form">
						<h3 class="form-signin-heading text-left margin-bottom-15">Change Password</h3>
						<div class="form-group">
							<label class="control-label" for="username">User Name <span class="red">*</span></label>
							<input type="text" id="txtUserID" class="form-control" name="Username" data-bind="value: UserID" />
						</div>
						<div class="form-group">
							<label class="control-label" for="username">New Password<span class="red">*</span></label>
							<input type="password" id="txtNewPassword" class="form-control" name="Password" data-bind="value: NewPassword" />
						</div>
						<div class="form-group">
							<label class="control-label" for="username">Confirm Password<span class="red">*</span></label>
							<input type="password" id="txtConPassword" class="form-control" name="Password" data-bind="value: ConfirmPassword" />
						</div>						
							<div class="form-group">
							<button class="btn btn-primary btn-md" data-bind="click: Cancel">Cancel</button>
							<button id="add" class="btn btn-primary" title="Change Password" data-bind="click: ChangePassword">Change</button>
							</div>
					</form>



				</div>
			</div>
		</div>
	</section>

	<script src="../../Scripts/SECURITY/UserChangePassword.js" type="text/javascript"></script>
</asp:Content>
