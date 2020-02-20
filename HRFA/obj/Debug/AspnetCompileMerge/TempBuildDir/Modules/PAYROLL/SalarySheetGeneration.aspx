<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="SalarySheetGeneration.aspx.cs" Inherits="HRFA.Modules.FAMS.SalarySheetGeneration" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Salary Sheet Generation</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

       <form class="" runat="server" id="Form1" role="form">
		   						<div class="box-body">

            <div class="row">
				    <div class="col-md-3">
				<div class="form-group">
                   <label> Office <span class="red">*</span></label>
               <select id="ddlOffice" class="form-control select2" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue: $data, value:SelectedOffice, 
                    optionsCaption:"------Select One-------", event:{ change: $data.GetCostCenter } '>
                    </select>
				</div>
					</div>
					<%--<div class="col-md-3">
			<div class="form-group">--%>
				<%--<label>Cost Centre</label>
				<select id="Select2" class="form-control select2" data-bind='options:CostCenters, 
                            optionsText: "CostCenterName",
                            optionsValue: $data,
                            value:SelectedCostCenter, 
                            optionsCaption:"------छान्नुहोस्-------"'></select>--%>
<%--                <label>Employee ID</label>--%>
<%--</div>--%>
<%--						</div>--%>
					<div class="col-md-3">
			<div class="form-group">
				<label>Fiscal Year<span class="red">*</span></label>
				 <select id="txtYear" class="form-control select2" data-bind='options:FiscalYears, 
                            optionsText: "FiscalYearName",
                            optionsValue: $data,
                            value:SelectedFiscalYear, 
                            optionsCaption:"------Select One-------"'>                                   
                                </select>
</div>
						</div>
					<div class="col-md-3">
			<div class="form-group">
				<label>Month <span class="red">*</span></label>
				<select id="ddlMonth" class="form-control select2" data-bind='options: Months, optionsText: "MonthName",
                    optionsValue: $data, value:SelectedMonth, 
                    optionsCaption:"------Select One-------" '>
                    </select>
</div>
						</div>

				</div> 

		   <div class="row">
			   <div class="col-md-6">
			   <button class="btn btn-primary" id="btnGenerate" data-bind="click: GenerateSalarySheet">
                        Create Salary Sheet</button>
		   </div>
			   </div>
									   </div>
      </form>
        </div>
    </div>
			</div>
		</section>
    <script src="../../Scripts/PAYROLL/SalarySheetGeneration.js" type="text/javascript"></script>
</asp:Content>
