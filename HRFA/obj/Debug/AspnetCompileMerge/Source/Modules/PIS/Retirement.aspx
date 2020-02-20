<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="Retirement.aspx.cs" Inherits="HRFA.Modules.PIS.Retirement" %>
    <%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" /> 
    
 <section class="content" id="RetirementForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Retirement</h3>
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
											data-target="#modalEmpSearch">
											Search</button>
									</div>
								</div>
								<!-- /.row -->
							</div>

							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
	 <tr>
                                    <th>
                                        Office Name
                                    </th>
                                    <th>
                                        Employee Name
                                    </th>
                                    <th>
                                        Post
                                    </th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span data-bind="text: OfficeNameNep" />
                                        </td>
                                        <td>
                                            <span data-bind="text: GridEmpName" />
                                        </td>
                                        <td>
                                            <span data-bind="text: PostName" />
                                        </td>
                                    </tr>
                                </tbody>
									</table>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Retirement Date<span class="red">*</span>  </label>
<input type="text" id="txtRetirementDate" placeholder="YYYY.MM.DD" data-bind="value:RetirementDate" class='required form-control'
                                onkeypress="return isNumberKey(event)"
                                onblur="return valFutureDate(this,'N',true);"
                                <%--onkeypress="UnicodeKeyPress(event,this);" onkeyup="UnicodeKeyUp(event,this);"
                                onchange="UnicodeChange(event,this);" onfocus="UnicodeFocus(event,this);" --%> />									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Retirement Type<span class="red">*</span>  </label>
<select id="ddlRetirementType" class="form-control select2"
														data-bind='options: RetirementTypes, optionsText: "RetirmentTypeName",
                    optionsValue: "RetirmentTypeName", value:SelectedRetirement, 
                    optionsCaption:"------ Select one -------"'>
                            </select>

									</div>
								</div>
								</div>

							
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>Remarks</label>
										<textarea id="txtRemarks" data-bind="value:Remarks"
                                class='required form-control' 
<%--                                onkeypress="UnicodeKeyPress(event,this);" 
                                onkeyup="UnicodeKeyUp(event,this);"
                                onchange="UnicodeChange(event,this);" 
                                onfocus="UnicodeFocus(event,this);"--%>
                                 oninput="convert_to_unicode(this)"
                                ></textarea>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group wordlong">
										<button class="btn btn-info" id="btnRetirementSave"
                             data-bind="click:SaveRetirement">Submit</button>
										<button class="btn btn-default" id="btnRetirementCancel"
                             data-bind="click:CancelRetirement">Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	</section>

    <script src="../../Scripts/PIS/Retirement.js" type="text/javascript"></script>
</asp:Content>
