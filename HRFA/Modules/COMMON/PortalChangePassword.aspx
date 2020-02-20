<%@ Page Title="" Language="C#" MasterPageFile="~/LoginMaster.Master" AutoEventWireup="true" CodeBehind="PortalChangePassword.aspx.cs" Inherits="IDS.Modules.COMMON.PortalChangePassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="wrapper">
<div class="row">
<form action="" method="post" name="Login_Form" class="form-signin">  
<h3 class="form-signin-heading text-left margin-bottom-15">Change Password </h3>
<div class="table-responsive">
                        <table width="100%"  class="table-form">
                        <tr>
                            <td class="td"> 
                                User Name <span class="mandatory">*</span>

                            </td>
                            <td class="td">
                                <input type="text" class="form-control" id="UserID" style="width:200px; float:left;" data-bind="value:UserID" disabled="disabled"/>
                            </td>
                            
                        </tr>
                        <tr>
                        <td class="td"> 
                                Employee ID <span class="mandatory">*</span>

                            </td>
                            <td class="td">
                                <input type="text" id="EmpID"  class="form-control" style="width:200px; float:left;" data-bind="value:EmpID" disabled="disabled" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Old Password <span class="mandatory">*</span>
                            </td>
                            <td>
                                <input type="password"  class="form-control"  style="width:200px;float:left;" id="OldPassword" data-bind="value: OldPassword" data-required="true" onkeypress="return isPasswordKey(event)"/>
                            </td>
                        </tr>
    
                        <tr>
                            <td>
                                New Password <span class="mandatory">*</span>
                            </td>
                            <td>
                                <input type="password"  class="form-control"  style="width:200px;float:left;" id="NewPassword" data-bind="value: NewPassword" data-required="true" onkeypress="return isPasswordKey(event)"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                              Confirm Password <span class="mandatory">*</span>
                            </td>
                            <td>
                                <input  type="password"  class="form-control" style="width:200px;float:left;" id="ConfPassword" data-bind="value: ConfPassword" data-required="true" onkeypress="return isPasswordKey(event)"/>
                            </td>
                        </tr>
                       
                        <tr>
                            <td>
                 
                            </td>
                            <td class="td">
                            
                             <button class="btn btn-primary btn-md" style="float:right; margin-right:25px;"  data-bind="click: ClearControls">Cancel</button><button class="btn btn-primary btn-md" style="float:right; margin-right:15px;" data-bind="click: SaveChangePassword">Change</button>  
                            </td>
                        </tr>
                </table>
            </div>
		 <div class="clear"></div> 
</form>
</div>
</div>
<script src="../../Scripts/COMMON/PortalChangePassword.js" type="text/javascript"></script> 
</asp:Content>

