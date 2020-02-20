<%@ Page Title="" Language="C#"  AutoEventWireup="true" CodeBehind="LogInWithSubmissionNo.aspx.cs" Inherits="IDS.Modules.COMMON.LogInWithSubmissionNo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="container">
	<div class="wrapper">
    
    <script>
        function isNumber(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        }
    </script>
		<form action="" method="post" name="Login_Form" class="form-signin">  
		    <h3 class="form-signin-heading text-left margin-bottom-15">Login With Submission No. </h3>
            <div class="form-group">
			  <label class="control-label" for="username">Submission No. <span class="red">*</span></label>
              <input type="text" id="txtSubmissionNo" class="form-control" onkeypress="return isNumber(event)" maxlength="14" data-bind="value: SubmissionNo" />
              </div>
            <div class="form-group">
			  <label class="control-label" for="username">User Name <span class="red">*</span></label>
              <input type="text" id="txtuserId" class="form-control" data-bind="value: UserId"/>
              </div>
            <div class="form-group">
              <label class="control-label" for="username">Password <span class="red">*</span></label>
             <input type="password"  class="form-control" id="txtPassword" data-bind="value: Password, valueUpdate: 'afterkeyup', returnAction: $root.LoginSubmissionNo" onkeypress="return isPasswordKey(event)"/>
			</div>
                            <button class="btn btn-primary btn-md pull-right"  data-bind="click: ClearControls">Cancel</button>
               <button class="btn btn-primary btn-md pull-right" style="margin-right:15px;" value="Submit" title="Click to Login" data-bind="click: LoginSubmissionNo">Login </button>&nbsp; &nbsp; 
 		  
			 <!--<button class="btns btn-lg btn-primary btn-block" type="submit">Login</button>-->
             

			<div class="clear"></div>
		</form>			
	</div>
</div>

<script src="../../Scripts/COMMON/LoginWithSubmissionNo.js" type="text/javascript"></script>
<script src="../../JsLibrary/Common.js" type="text/javascript"></script>

</asp:Content>
