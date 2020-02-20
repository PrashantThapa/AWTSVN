<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="EmployeeAttendanceForm.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeeAttendanceForm" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Attendance</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
                <div class="col-md-5" data-bind="visible: ShowTxtSubNo">
					<div class="form-group">
                                   <label>Submission No</label> 

                    <input type="text" id="txtSubNo" data-bind="value: SubmissionNo" />
                </div>
					</div>
                <div class="col-md-1">
					<div class="form-group">
                    <button class="btn btn-info wordlong" id="btnSearch" data-bind="click:SearchResult">
                        Search
                    </button>
						</div>
                </div>
            </div>
           
            <div class="row">
                <div class="col-md-4">
					<div class="form-group">
                    <label>Office <span class="red">*</span></label>
						<select id="ddlOffice" class="form-control select2" data-bind='options: Offices, optionsText: "OfficeNameNep", optionsValue: $data, 
                                     value: SelectedOffice,
                                             optionsCaption:"-----Select Office------" , event:{change: $data.GetCostCenter}'>
                        </select>
					</div>
					</div>
				<div class="col-md-4">
					<div class="form-group">
                    <label>Year <span class="red">*</span></label>
						<select id="txtYear" class="form-control select2" data-bind='options:FiscalYears, 
                            optionsText: "FiscalYearName",
                            optionsValue:$data,
                            value:SelectedFiscalYear, 
                            optionsCaption:"------Select One-------"'>                                   
                                </select>
					</div>
					</div>
				<div class="col-md-4">
					<div class="form-group">
                    <label>Month <span class="red">*</span></label>
						<select id="ddlMonth" class="form-control select2" data-bind='options: Months, optionsText:"MonthName", optionsValue:$data,
                                     value:SelectedMonth, optionsCaption:"----Select Month-----" , event:{change: $data.SetWorkingDaysBasedOnLeaveDaysDeducted}'>
                        </select>
					</div>
					</div>
             
              
            </div>
            <div class="row">
              
                <div class="col-md-6">
					<div class="form-group">
                    <button class="btn btn-info" id="btnShow" data-bind="click: ShowEmployee">
                        Show</button>
                    <button class="btn btn-default" id="btnCancel" data-bind="click: ClearControls">
                        Cancel</button>
						</div>
                </div>
            </div>
            <div class="row" data-bind="visible: showWorkingDays">
                <div class="col-md-6">
					<label>Working Days:</label>
                <div class="form-group">
					<input type="text" id="TotWorkingDays" maxlength="8" data-bind="numeric, value:WorkingDays, enable: showSubmit" class='required form-control' />

                </div>
				</div>
				</div>
            <div class="row">
<div class="col-md-12">
	                <div class="form-group">

			<table data-bind="visible: true" class="table table-bordered table-striped"> 	
                            <tr>
                                <th>
                                    S.NO
                                </th>
                                <th>
                                    Symbol No
                                </th>
                                <th>
                                    Employee Name
                                </th>
                                <th>
                                    Designation
                                </th>
                                <th>
                                    No of Working Days
                                </th>
                                <th>
                                    No of Attendance Days
                                </th>
                            </tr>
                            <tbody data-bind="foreach:Employees">
                                <tr>
                                    <td>
                                        <span data-bind="text:($index()+1)"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text:SN" style="width: 25px;"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text: EmployeeName" style="width: 120px;"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text: PostDesc" style="width: 120px;"></span>
                                    </td>
                                    <td>
                                        <input type="text" id="txtWorkingDays" disabled="disabled" data-bind="value: WorkingDays"
                                            class='required form-control' />
                                    </td>
                                    <td>
                                        <input type="text" id="txtAttendanceDays" data-bind="numeric, value: AttDays, enable: $root.showSubmit, event: { keypress: $root.EditAttendance }"
                                            class='required form-control' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row">
                            <div class="col-md-6">
								<div class="form-group">                                <button id="btnSubmit" class="btn btn-primary" data-bind="visible: showSubmit,click:SaveAtt">
                                    Submit</button>
									</div>

                            </div>
                            <div class="col-md-9">
                            </div>
                        </div>
						</div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
			</div>
	   </section>
    <script src="../../../Scripts/PIS/EmployeeAttendanceForm.js" type="text/javascript"></script>
</asp:Content>
