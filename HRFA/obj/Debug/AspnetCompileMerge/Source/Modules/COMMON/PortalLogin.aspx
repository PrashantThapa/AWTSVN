<%@ Page Title="" Language="C#" MasterPageFile="~/LoginMaster.Master" AutoEventWireup="true" CodeBehind="PortalLogin.aspx.cs" Inherits="IDS.Modules.COMMON.PortalLogin" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


	<header class="main-header">
		<nav class="login navbar-static-top">
			<div class="container-fluid">
				<div class="navbar-header">

					<section class="content-header">
						<h3>Date: <span id="currNepDate"></span>
						</h3>
					</section>
				</div>
			</div>
		</nav>
	</header>

	<div class="login-box">
		<div class="login-logo">
			<img src="/Images/logotry.png" alt="IDS" style="width: 50%" />
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">Self Sign-in Portal</p>
			<form action="" method="post" name="Login_Form">

				<div class="form-group has-feedback">
					<label class="control-label" for="username">User Name <span class="red">*</span></label>
					<input type="text" id="txtUserID" class="form-control" name="Username" data-bind="value: UserID" placeholder="Username" />
					<span class="glyphicon glyphicon-user form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<label class="control-label" for="username">Password <span class="red">*</span></label>
					<input type="password" id="txtPassword" class="form-control" name="Password" data-bind="value: Password, valueUpdate: 'afterkeyup', returnAction: $root.ContributorLogin" placeholder="Password" />
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>


				<button id="add" class="btn btn-primary btn-flat" value="Submit" title="Click to Login" data-bind="click:ContributorLogin">Login </button>

				<button class="btn btn-primary btn-flat" data-bind="click: Reset">Cancel</button>

			</form>
			<br />
			<a href="/">
				<span class="glyphicon glyphicon-home"></span>
				Go Back</a>

		</div>
	</div>




	<script src="../../Scripts/COMMON/PortalLogin.js" type="text/javascript"></script>
</asp:Content>


