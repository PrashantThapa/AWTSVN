<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="DepartmentWiseShiftType.aspx.cs" Inherits="HRFA.Modules.WFMS.DepartmentWiseShiftType" %>


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
						<h3 class="box-title">Department Wise Shift Type </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Organization<span class="red">*</span>  </label>
										<select id="lstOffices" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'---- Select one ----',optionsValue:'OfficeCode', value: SelectedOffice,event:{ change: GetDepartmentByOfficeCD }">
                            </select>
									</div>
								</div>
								
								<div class="col-md-4">
									<div class="form-group">
										<label>Department <span class="red">*</span></label>
										<select id="lstDepartment" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Departments, optionsText:'DeptDesc',optionsCaption:'---- Select one ----', optionsValue: 'DeptID', value: SelectedDepartment,event:{ change: GetShifts }">
                            </select>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Shift<span class="red">*</span> </label>
										<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										
										<tbody data-bind="foreach: Shifts">
                                            <tr class="warning">
                                                <td class="hidden">
                                                    <span data-bind="text: ShiftID"></span>
                                                    
                                                </td>
                                                
                                                <td>
                                                    <input type="checkbox" data-bind="event:{ change: ToggletoADD}, checked:makecheck"/>
                                                </td>
                                                 <td>
                                                   <span data-bind="text: ShiftName"></span>
                                                    
                                                </td>
                                               
                                            </tr>
                                        </tbody>
									</table>
									</div>
								</div>
								</div>

																			<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button type="submit" class="btn btn-info" data-bind="click:SaveDeptWiseShift">Submit</button>
															<button type="submit" class="btn btn-default" data-bind="click:CancelDeptWiseShift">Cancel</button>
														</div>
													</div>
												</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
    <script src="../../Scripts/WFMS/DepartmentWiseShiftType.js" type="text/javascript"></script>
	</asp:Content>