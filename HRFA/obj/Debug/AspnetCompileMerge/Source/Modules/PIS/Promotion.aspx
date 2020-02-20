<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Appointment.aspx.cs" Inherits="HRFA.Modules.PIS.Appointment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl" TagName="EmployeeSearch" %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<section class="content"  id="PromotionForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Promotion</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
								
							
							<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>Employee Name </label>
									    <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />
										</div>
								</div>
								
								<div class="col-md-1 wordlong">
        <button type="button" id="btnSearch" class="btn btn-primary search" data-bind="" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>
										</div>
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
										<label>Promotion Type <span class="red">*</span></label>
										<select id="ddlPromotionType" class="form-control select2" data-bind='options: PromotionTypes, optionsText: "PromoTypeDesc",
                    optionsValue: $data, value:SelectedPromotionType, 
                    optionsCaption:"------ Select one -------"'></select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Letter Issue Date<span class="red">*</span></label>
										    <input type="text" id="txtLetterIssueDate" 
                            data-bind="value:LetterIssueDate" class='required form-control' 
                           onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                             />

									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Effective Date</label>
										<input type="text" id="txtEffectiveDate" 
                            data-bind="value:EffectiveDate , event:{ blur:ValidateEffectiveDate }"
                             class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" 
                             />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Effective Deadline Date</label>
<input type="text" id="" 
                            data-bind="value:EffectiveTillDate , event:{ blur:ValidateEffectiveDate }" 
                            class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" 
                             />
									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Post <span class="red">*</span></label>
										<select id="ddlPost" class="form-control select2" data-bind='options: Posts, optionsText: "PostDesc",
                    optionsValue: $data, value:SelectedPost, 
                    optionsCaption:"------ Select one -------" '></select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Effective Till Date </label>
<input type="text" id="txtEffectiveTillDate" 
                            data-bind="value:EffectiveTillDate , event:{ blur:ValidateEffectiveDate }" 
                            class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" 
                             />
									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>Supervisor Name  </label>
    <input type="text" id="Text1" data-bind="value:SupervisorName" class='required form-control' disabled />
										</div>
								</div>
								
								<div class="col-md-1 wordlong">
        <button type="button" id="Button1" class="btn btn-warning search" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="supervisor">Search</button>
										</div>
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">
										<button type="submit" class="btn btn-info" data-bind="click: SavePromotion">
                Submit
            </button>
										<button type="submit" class="btn btn-default" data-bind="click: ClearControls">
                Cancel
            </button>
									</div>
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
	
    <script src="../../Scripts/PIS/Promotion.js" type="text/javascript"></script>


</asp:Content>
