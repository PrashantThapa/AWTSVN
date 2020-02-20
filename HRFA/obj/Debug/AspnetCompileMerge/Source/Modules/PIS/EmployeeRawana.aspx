<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeeRawana.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeeRawana" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />
   <section class="content" id="EmployeeRawana">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Rawana </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							
							<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>Employee Name <span class="red">*</span> </label>
   <input type="text" id="txtUserID" class="form-control hidden" name="Username" data-bind="value:EmpID, attr:{'disabled':isDisabled}"
                                 />
                                <input type="text" id="Text1" class="form-control" name="Username" data-bind="value:EmployeeName, attr:{'disabled':isDisabled}"
                                 /> 

										</div>
								</div>
								
								<div class="col-md-1 wordlong">
                           <button type="button" id="btnForwardEmpSearch" class="btn btn-warning search" data-toggle="modal"  data-target="#modalEmpSearch" >Search</button>  
										</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
									                 <tr>
                            <th class="hidden">
                                ID
                            </th>
                            <th>
                                Employee Name
                            </th>
                            <th>
                                Rawana Type
                            </th>
                           
                        </tr>
                     

                          <tbody >
                          
                            <tr>
                                <td  class="hidden">
                                    <span data-bind="text:EmpID" />
                                </td>
                                <td>
                                    <span data-bind="text:EmployeeName" />
                                </td>
                                <td class="col-md-6">
                                    

                                    <select id="ddlType"   class="dropdown-select" 
                    data-bind='options: Types, optionsText: "Desc",
                    optionsValue:"ID", value:SelectedType, 
                    optionsCaption:"------ Select one -------"  '></select>
                    
    
                                </td>
                               
                               
                            </tr>
                        </tbody>
									</table>
									</div>
								</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Rawana Date<span class="red">*</span></label>
										                    <input type="text" id="txtRawanaDate" onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" class="form-control" data-bind="value:RawanaDate"
                        />

									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Attendence Date<span class="red">*</span></label>
<input type="text" id="txtDecisionDate" onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);"  class="form-control" data-bind="value:DecisionDate"
                         />									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>Reason</label>
										  <textarea id="txtReason" class="form-control" data-bind="value:Reason" 
<%--                    onkeypress="UnicodeKeyPress(event,this);"
                        onkeyup="UnicodeKeyUp(event,this);"
                         onchange="UnicodeChange(event,this);" 
                         nfocus="UnicodeFocus(event,this);"--%> oninput="convert_to_unicode(this)"></textarea>
									</div>
								</div>
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">
										<button type="submit" class="btn btn-info" id="btnSubmit" data-bind="click:SaveRawana">
                Submit
            </button>
										<button type="submit" class="btn btn-default" id="btnWholeCancel" data-bind="click:ClearControls">
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
    
    <script src="../../Scripts/PIS/EmployeeRawana.js" type="text/javascript"></script>
</asp:Content>
