<%@ Page Title="" Language="C#" MasterPageFile="~/LoginMaster.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="HRFA.Modules.SECURITY.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	
			<div class="sign-in-htm">
				<p class="login-box-msg">Login to your admin account</p>
						<form method="post" name="Login_Form">  

					<div class="form-group has-feedback">
						<label class="control-label" for="username">User Name <span class="red">*</span></label>
						<input type="text" id="txtUserID" class="form-control" name="Username" data-bind="value: UserID" placeholder="Username"/>
						<span class="glyphicon glyphicon-user form-control-feedback"></span>
					</div>
					<div class="form-group has-feedback">
						<label class="control-label" for="username">Password <span class="red">*</span></label>
						<input type="password" id="txtPassword" class="form-control" name="Password" data-bind="value: Password, valueUpdate: 'afterkeyup', returnAction: $root.LoginUser" placeholder="Password"/>
						<span class="glyphicon glyphicon-lock form-control-feedback"></span>
					</div>


					 <button id="add" class="btn btn-primary btn-flat" value="Submit" title="Click to Login" data-bind="click:LoginUser">Login </button> 
				     
					 <button class="btn btn-primary btn-flat" data-bind="click: Reset">Cancel</button>

						</form>
				<br />
				<%-- <a href="/">						
					 <span class="glyphicon glyphicon-home"></span>
				Go Back</a>--%>

			</div>
	
			<div class="sign-up-htm">
					<p class="login-box-msg">Login to your portal account</p>
				<form method="post" name="login_form">
					<div class="form-group has-feedback">
						<label class="control-label" for="username">User Name <span class="red">*</span></label>
						<input type="text" id="txtUserIDS" class="form-control" name="Username" data-bind="value: UserID" placeholder="Username"/>
						<span class="glyphicon glyphicon-user form-control-feedback"></span>
					</div>
					<div class="form-group has-feedback">
						<label class="control-label" for="username">Password <span class="red">*</span></label>
						<input type="password" id="txtPasswords" class="form-control" name="Password" data-bind="value: Password, valueUpdate: 'afterkeyup', returnAction: $root.loginUser" placeholder="Password"/>
						<span class="glyphicon glyphicon-lock form-control-feedback"></span>
					</div>


				<button id="adding" class="btn btn-primary btn-flat" value="submit" title="click to login" data-bind="click:loginUser">login </button>

				<button class="btn btn-primary btn-flat" data-bind="click: reset">cancel</button>

			</form>
										
				
			</div>

	<script src="../../Scripts/SECURITY/Login.js" type="text/javascript"></script>
</asp:Content>
