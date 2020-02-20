<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Punishment.aspx.cs" Inherits="HRFA.Modules.PIS.Punishment" %>
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<section class="content" id="PunishmentForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Punishment</h3>
					</div>
					<!-- /.box-header -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label>Employee Name<span class="red">*</span> </label>
    <input type="text" id="txtEmployeeName" data-bind="value:EmployeeName" class='required form-control' disabled />
									</div>

								</div>
								<div class="col-md-1">
									<div class="form-group wordlong">
										<button type="button" id="btnSearch" class="btn btn-warning search" data-toggle="modal"
											data-target="#modalEmpSearch" data-thissource="employee">
											Search</button>
									</div>
								</div>
								<!-- /.row -->
							</div>

							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
		<tr>
                    <th>Office Name</th>
                    <th>Employee Name</th>
                    <th>Post</th>
                    
                </tr>
                            
            <tbody>
                <tr>
                    <td data-bind="text: grdOfficeName"></td>
                    <td data-bind="text: grdEmployeeName"></td>
                    <td data-bind="text: grdPostDesc"></td>         
                </tr>
            </tbody>
									</table>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Punishment<span class="red">*</span>  </label>
										<input type="text" id="txtPunishment" 
                                data-bind="value:Punishment" class='required form-control' 
<%--                                onkeypress="UnicodeKeyPress(event,this);" 
                                onkeyup="UnicodeKeyUp(event,this);" 
                                onchange="UnicodeChange(event,this);" 
                                onfocus="UnicodeFocus(event,this);" --%>
                                 oninput="convert_to_unicode(this)"
                                
                                 />
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Punishment Date<span class="red">*</span>  </label>
										<input type="text" id="txtPunishmentDate" 
                            data-bind="value:PunishmentDate" class='required form-control' 
                           onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);" maxlength="10"
                             placeholder="YYYY.MM.DD" 
                             />
									</div>
								</div>
								</div>

							
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>Remarks<span class="red">*</span>  </label>
										<textarea name="textarea"
                        class='required form-control' 
<%--                        onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%> 
                             oninput="convert_to_unicode(this)"
                         id="txtRemarks"  data-bind="value:Remarks"></textarea> 

									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group wordlong">
										<button class="btn btn-info" data-bind="click: SavePunishment">Submit</button>
										<button class="btn btn-default" data-bind="click: ClearControls">Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	</section>


<script src="../../Scripts/PIS/Punishment.js" type="text/javascript"></script>

</asp:Content>
