<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="EmployeeShiftAssignment.aspx.cs" Inherits="HRFA.Modules.WFMS.EmployeeShiftAssignment" %>
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>


<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<!-- general form elements -->
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Shift Assignment </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label>Employee Name<span class="red">*</span> </label>
										 <input type="text" id="txtEmpName" data-bind="value: EmployeeName" class="form-control" disabled/>
									</div>

								</div>
								<div class="col-md-1">
									<div class="form-group">
										<button type="button" id="btnSearch" class="btn btn-warning wordlong" data-toggle="modal"
                                data-target="#modalEmpSearch">
                                Search</button>
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Department<span class="red">*</span>  </label>
										<select id="lstDepartment" multiple class="form-control" style="min-height: 270px; width: 100%;"
											 data-bind="options:Departments, optionsText:'DeptDesc',optionsCaption:'---- Select one ----', optionsValue: $data, value: SelectedDepartment, event:{ change: GetDepartmentShift }">
                            </select>
									</div>
								</div>
								
								<div class="col-md-6">
									<div class="form-group">
										<label>Shift <span class="red">*</span></label>
										<select id="lstShift" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Shifts, optionsText:'ShiftName',optionsCaption:'---- Select one----', optionsValue: $data, value: SelectedShift"></select>
									</div>
									</div>
															<%--<div class="row">

								<button id="btnUpdate" class="btn btn-info" data-bind="click: UpdateEmpShift">
                            Update Emp Shift</button>

								</div>--%>
								</div>
							<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button id="btnAdd" class="btn btn-info" data-bind="click: AddEmployeeShift">Add</button>
														</div>
													</div>
												</div>
							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										  <tr>
                            <th>
                                Organization Name
                            </th>
                            <th>
                                Department Name
                            </th>
                            <th>
                                Employee Name
                            </th>
                            <th>
                                Shift
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                        <tbody data-bind="foreach: EmployeeList">
                            <tr>
                            <%--!!!!!This Comment Section is Important Knockout code. Do not delete it!!!!--%>
                            <%--!!This Code filters the EmployeeShift assignment edit grid by either office and department or by office, department and shift!! -Sangam Pokhrel --%>
                            <!-- ko if: ($root.OfficeCD() != undefined && $root.SelectedDepartment() == undefined && 
                              $data.EmpID() == $root.EmpID() || $root.OfficeCD() != undefined 
                              && $root.SelectedDepartment() != undefined && $data.EmpID() == $root.EmpID() && 
                               $data.DeptID() == $root.SelectedDepartment().DeptID())-->
                                <!-- ko if: $data.Action() != 'E' -->
                                <td>
                                    <span data-bind="text: $data.OfficeNameNep" />
                                </td>
                                <td>
                                    <span data-bind="text: $data.DeptDesc" />
                                </td>
                                <td>
                                    <span data-bind="text: $data.EmployeeName" />
                                </td>
                                <td>
                                    <span data-bind="text: $data.ShiftName" />
                                </td>
                                <td>
                                    <a><span class="glyphicon glyphicon-trash" title="Delete" rel="tooltip" data-bind="click: $root.DelEmpList">
                                    </span></a>
                                </td>
                                <!-- /ko -->
                                <!-- /ko -->
                            </tr>
                        </tbody>
									</table>
									</div>
								</div>

								

																			
							<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button type="submit" id="btnEmpShiftSubmit" class="btn btn-info" data-bind="click:SaveEmployeeShift">Submit</button>
															<button type="submit" id="btnEmpShiftCancel" class="btn btn-default" data-bind="click:CancelEmployeeShift" />Cancel</button>
														</div>
													</div>
												</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
    <script src="../../Scripts/WFMS/EmployeeShiftAssignment.js" type="text/javascript"></script>
	</asp:Content>