<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeeTransfer.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeeTransfer" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" /> 

	<section class="content" id="EmpTransfer">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Transfer</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							
							<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>Employee Name </label>
   <input type="text" id="txtEmployeeID" data-bind="value:EmpID, attr:{'disabled':isDisabled}"
                class='required form-control hidden' onkeypress="return isNumberKey(event)"   />
                <input type="text" id="Text2" data-bind="value:EmployeeName, attr:{'disabled':isDisabled}"
                class='required form-control' onkeypress="return isNumberKey(event)"  />

										</div>
								</div>
								
								<div class="col-md-1 wordlong">
        <button type="button" id="btnSearch" class="btn btn-warning search" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>
										</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
									                      <thead>
	
										<tr>
                    <th>Office Name</th>
                    <th>Employee Name</th>
                    <th>Post</th>
                    
                </tr>
															  </thead>
                        <tbody >
                <tr>
                    <td data-bind="text: OfficeNameNep"></td>
                    <td data-bind="text: EmployeeName"></td>
                    <td data-bind="text: PostDesc"></td>  
                     
                </tr>
            </tbody>
									</table>
									</div>
								</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Transfer Office<span class="red">*</span></label>
										<select id="ddlTransferOffice" class="form-control select2" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue: "OfficeCode", value:SelectedTransferOffice, 
                    optionsCaption:"------ Select one -------",event: { change: GetPostDepartment }'></select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Transfer Post<span class="red">*</span></label>
										<select id="ddlTransferPost" class="form-control select2"
													 data-bind='options: Posts, optionsText: "PostDesc",
                    optionsValue: "PostID", value:SelectedPost, 
                    optionsCaption:"------ Select one -------"'></select>
									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Letter Issue Date<span class="red">*</span></label>
										<input type="Text" id="txtLetterIssueDate" 
                            data-bind="value:LetterIssueDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" 
                             />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Decision Date <span class="red">*</span></label>
										    <input type="Text" id="txtDecisioneDate" 
                            data-bind="value:DecisionDate" class='required form-control' 
                             onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" 
                             />

									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>Supervisor Name </label>
 <input  type="text" id="txtSupervisor" 
                            data-bind="value:SupervisorID, attr:{'disabled':isDisabled}" class='required form-control hidden' 
                            
                             /> 

                             <input type="text" id="Text3" 
                            data-bind="value:SupervisorName, attr:{'disabled':isDisabled}" class='required form-control' 
                            
                             />										</div>
								</div>
								
								<div class="col-md-1 wordlong">
<button type="button" id="Button1" class="btn btn-warning search" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="supervisor"> Search </button>
										</div>
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">
										<button type="submit" class="btn btn-info" data-bind="click: SaveEmployeeTransfer">
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

    <script src="../../Scripts/PIS/EmployeeTransfer.js" type="text/javascript"></script>
</asp:Content>
