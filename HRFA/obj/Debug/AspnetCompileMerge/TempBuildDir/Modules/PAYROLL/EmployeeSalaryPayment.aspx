<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="EmployeeSalaryPayment.aspx.cs" Inherits="HRFA.Modules.PAYROLL.EmployeeSalaryPayment" %>

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
						<h3 class="box-title">तलब शीट समायोजन</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

					<form class="" runat="server" id="Form1" role="form">
						<div class="box-body">
							

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>
											कार्यालय <span class="red">*</span>
										</label>
										<select id="ddlOffice" class="form-control select2" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue: $data, value:SelectedOffice, 
                    optionsCaption:"------छान्नुहोस्-------", event: {change: $data.GetCostCenter} '>
                        </select>
									</div>

																	</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>
											लागत केन्द्र <span class="red">*</span>
										</label>
										<select id="Select2" class="form-control select2" data-bind='options:CostCenters, 
                            optionsText: "CostCenterName",
                            optionsValue:$data,
                            value:SelectedCostCenter, 
                            optionsCaption:"------छान्नुहोस्-------"'>
                        </select>
									</div>


								</div>
							</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>
											वर्ष <span class="red">*</span>
										</label>
										
										<input type="text" id="txtYear" data-bind="value:Year" class='required form-control'
                        onkeypress="return isNumberKey(event)" maxlength="4" />
										</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>
											महिना <span class="red">*</span>
										</label>
										<select id="ddlMonth" class="form-control select2" data-bind='options: Months, optionsText: "MonthName",
                    optionsValue: "MonthID", value:SelectedMonth, 
                    optionsCaption:"------छान्नुहोस्-------"'>
                        </select>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="form-group">
								<div class="col-md-6 padding-left-0">
									<button id="btnViewDetails" class="btn btn-primary" data-bind="click: ViewEmpPayableAmount">
                        View Details</button>
                        <button id="btnPrint" class="btn btn-primary" data-bind="click: PrintEmpPayableAmount">
                        Print</button>
								</div>
									</div>
								</div>	
							
							<div class="row">
								<div class="col-md-12">
												                <div class="form-group">

			<table data-bind="visible: true" class="table table-bordered table-striped"> 	
                            <tr>
                                <th width="15%">
                                    कर्मचारीको आइ डि
                                </th>
                                <th width="55%">
                                    कर्मचारीको नाम
                                </th>
                                <th width="30%">
                                    भुक्तनी गर्नुपर्ने रकम
                                </th>
                            </tr>
                            <tbody data-bind="foreach:EmpPayableAmounts">
                                <tr>
                                    <td data-bind="text: EmpID" width="15%">
                                    </td>
                                    <td data-bind="text: EmployeeName" width="55%">
                                    </td>
                                    <td data-bind="text: PayableAmount" width="30%">
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

									<label>कर्मचारी <span class="red">*</span></label>
									<select id="lstEmployee" class="form-control select2"
										data-bind="options: Employees, optionsText: 'EmployeeName', optionsCaption: '------ छान्नुहोस् ------', optionsValue: $data, value: SelectedEmployee, event: { change: $data.GetSalaryItemByEmpID }">
									</select>
								</div>
									</div>

								<div class="col-md-6">
									             <div class="form-group">
									<label>कर्मचारीको तलबको सूची</label>
									<select id="lstSalaryItem" class="form-control select2"
										data-bind="options: EmpSalaryItems, optionsText: 'SalaryItemDesc', optionsCaption: '----- छान्नुहोस् -----', optionsValue: $data, value: SelectedEmpSalaryItem, event: { change: $data.GetSalaryDetails }">
									</select>
								</div>
									</div>

							</div>

							
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>कुल रकम</label>
									<input type="text" id="txtTotalAmount" data-bind="value:TotalPayableAmount" class='required form-control'
                        disabled="disabled" />
								</div>
									</div>
								<div class="col-md-6">

											<div class="form-group">
													
											<label>जम्मा गरिएको प्रकार <span class="red">*</span></label>
													<div class="checkbox">

											<input type="radio" value="B" name="paymentType" data-bind="checked:PaymentType, event:{ change: ToggleBankAccount }" class="minimal" />&nbsp;बैंक
													<label></label>
										    <input type="radio" value="C" name="paymentType" data-bind="checked:PaymentType, event:{ change: ToggleBankAccount }" class="minimal" />&nbsp;नगद
													</div>
														</div>
\						</div>

								</div>

								<div class="row" id="divBankAccount">
								<div class="col-md-6">
									<div class="form-group">
										<label>जम्मा गरिएको बैंक</label>
									<select id="ddlBank" class="form-control select2" data-bind='options: Banks, optionsText: "BankName",
                            optionsValue: $data, value:SelectedBank, 
                            optionsCaption:"------छान्नुहोस्-------", event:{change: GetBankAccount} '>
                    </select>
																			</div>

								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>जम्मा गरिएको अकाउन्ट<span class="red">*</span></label>
										<select id="ddlBankAccount" class="form-control select2" data-bind='options: Accounts, optionsText: "AccountNo",
                            optionsValue: $data, value:SelectedAccount, 
                            optionsCaption:"------छान्नुहोस्-------" '>
                    </select>
										</div>
									</div>
								</div>

						<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>जम्मा गरिएको मिति<span class="red">*</span></label>
										<input type="text" id="txtPayableDate" class='required form-control' onkeypress="return isNumberKey(event)"
                        onblur="return valFutureDate(this,'Y',true);" placeholder="YYYY.MM.DD" 
                        maxlength="10" data-bind="value:PayableDate" />
									</div>
									</div>
							</div>

						<div class="row">
								<div class="col-md-6 padding-left-0">
									<button class="btn btn-primary" data-bind="click: SaveEmpSalaryPayment">
                        Submit
                    </button>
                    <button class="btn btn-primary" data-bind="click: ClearControls">
                        Cancel
                    </button>
								</div>
							</div>



						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
    <script src="../../Scripts/PAYROLL/EmployeeSalaryPayment.js" type="text/javascript"></script>
</asp:Content>
