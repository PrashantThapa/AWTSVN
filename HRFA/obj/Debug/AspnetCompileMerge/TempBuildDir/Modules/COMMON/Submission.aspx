<%@ Page Title="" Language="C#"  AutoEventWireup="true"
    CodeBehind="Submission.aspx.cs" Inherits="IDS.Modules.COMMON.Submission" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <style>input { margin-bottom:0px;
    padding: 2px !important;
}</style>

<form class="form-horizontal col-xs-12 col-sm-12 col-md-6 col-lg-6 center-center"  id="Form1" runat="server" role="form">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
<h3 class="form-signin-heading margin-bottom-15 margin-top-0 text-left" >Get Submission No.</h3>   

  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="email">User ID  <span class="red">*</span></label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
      <input type="text" id="UserId" class="form-control" data-bind="value: UserId">
    </div>
  </div>
  
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="password">Password <span class="mandatory">*</span></label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <input type="Password"  class="form-control" id="Password" data-bind="value: Password"
    onkeypress="return isPasswordKey(event)" />

    </div>

  </div>
  
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="password">Confirm Password <span class="mandatory">*</span></label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <input type="Password" class="form-control" id="Password1" data-bind="value: ConformPassword"
                                            onkeypress="return isPasswordKey(event)" /> 

    </div>

  </div>
  
  <div class="form-group">
   <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="User Full Name">User Full Name <span class="mandatory">*</span></label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
   <input type="text" class="form-control" id="UserName" data-bind="value: UserName, valueUpdate: 'afterkeyup', returnAction: $root.SaveSubmission" />
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="address">Address</label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <input type="text" id="Address" class="form-control" data-bind="value: Address, valueUpdate: 'afterkeyup', returnAction: $root.SaveSubmission" />
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="phone">Phone No.</label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <input type="text"  class="form-control" id="PhoneNo" data-bind="value: PhoneNo, valueUpdate: 'afterkeyup', returnAction: $root.SaveSubmission"
    maxlength="10" />
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="phone">Email</label>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <input type="text" class="form-control" id="Email" data-bind="value: Email, valueUpdate: 'afterkeyup', returnAction: $root.SaveSubmission" />
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="Captcha"> Captcha<span class="mandatory">*</span></label>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                            <ContentTemplate>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <input type="text" class="col-xs-12 col-sm-6 col-md-4 col-lg-4" id="Captcha" />
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4"><asp:Image ID="imgCaptcha" runat="server" /></div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
     <asp:ImageButton  ID="ImageButton1" runat="server"  src="/Images/Refresh.png" OnClick="btnRefresh_Click" /></div>
    </div></ContentTemplate>
</asp:UpdatePanel>
</div>

  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-4" for="Captcha"></label>

    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
    <p>Note : <span class="red">*</span> Denotes mandatory fields. </p>
    </div>
  </div>
  
  <div class="form-group">
    <label class="control-label col-xs-12 col-sm-2 col-md-4 col-lg-4" for="Captcha"></label>
<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
<button class="btn btn-primary btn-md" style="height: auto; width: 80px;" data-bind="click: SaveSubmission">Submit</button>
<button class="btn btn-primary btn-md" style="height: auto; width: 80px;" data-bind="click: ClearControls">Reset</button>
</div>
  </div>
  
<div class="clear"></div>
</form>
<script src="../../Scripts/Common/SubmissionModel.js" type="text/javascript"></script>
<script src="../../JsLibrary/Common.js" type="text/javascript"></script>
</asp:Content>