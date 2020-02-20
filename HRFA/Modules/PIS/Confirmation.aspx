<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Confirmation.aspx.cs" Inherits="HRFA.Modules.PIS.Confirmation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

<section class="content">
		<div class="row pages" id="ConfirmationForm">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Confirmation</h3>
					</div>
					<!-- /.box-header -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label>Employee Name<span class="red">*</span> </label>
  <input type="text" id="txtEmployeeID" data-bind="value:EmpID, attr:{'disabled':isDisabled}"
                class='required form-control hidden' onkeypress="return isNumberKey(event)"   />
                <input type="text" id="Text2" data-bind="value:EmployeeName, attr:{'disabled':isDisabled}"
                class='required form-control' onkeypress="return isNumberKey(event)"  />									</div>

								</div>
								<div class="col-md-1">
									<div class="form-group wordlong">
										        <button type="button" id="btnSearch" class="btn btn-warning search" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>

									</div>
								</div>
								<!-- /.row -->
							</div>
<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Confirmation Letter</label>
                         <input id="UploadDocFile" type="file" name="image" class="btn btn-default" />
									</div>
								</div>
	<div class="col-md-6">
									<div class="form-group">
								<label>Letter Issue Date<span class="red">*</span></label>
                        <input type="text" id="txtConfirmationLetterDate" placeholder="YYYY.MM.DD"
                            data-bind="value:ConfirmationLetterDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                             />

								</div>
		</div>
	</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label> Effective Date <span class="red">*</span></label>
<input type="text" id="txtEffectiveDate" placeholder="YYYY.MM.DD"
                            data-bind="value:EffectiveDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'N',true);"
                             />									</div>
								</div>
	<div class="col-md-6">
									<div class="form-group">
								<label>Service Type<span class="red">*</span></label>
                        <select id="ddlServiceType" class="form-control select2"
														data-bind='options: ServiceTypes, optionsText: "STypeName",
                    optionsValue: "STypeID", value:SelectedServiceType, 
                    optionsCaption:"------ Select one-------"'></select>

								</div>
		</div>
	</div>

							<div class="row">
								<div class="col-md-6">
									<div class="form-group wordlong">
										<button class="btn btn-info" data-bind="click: SaveConfirmation">Submit</button>
										<button class="btn btn-default" data-bind="click: ClearConfirmation">Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	</section>
    <script src="../../Scripts/PIS/EmpConfirmation.js" type="text/javascript"></script>
</asp:Content>
