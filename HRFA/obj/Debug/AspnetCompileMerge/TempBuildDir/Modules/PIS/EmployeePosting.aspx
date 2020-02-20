﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeePosting.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeePosting" %>

<%@ Register Src="~/Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl" TagName="EmployeeSearch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />

	<section class="content" id="EmpPostingForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Posting</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form2">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
											<div class="form-group wordlong">
												<label>Posting Type <span class="red">*</span></label>
												<div class="checkbox">
											
               <input type="radio" id="empGender" name="empGender" value="A" data-bind="checked: PostingType" /> Appointment &nbsp;&nbsp;          
</div>
											</div>
										</div>
							</div>
							<div class="row">
								<div class="col-md-6">
										<div class="form-group">
										<label>Employee Name </label>
									    <input type="text" id="txtEmployeeID" data-bind="value:EmployeeName" class='required form-control' disabled />
										</div>
								</div>
								
								<div class="col-md-1 wordlong">
        <button type="button" id="btnSearch" class="btn btn-primary search" data-bind="enable:PostingType" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="employee">Search</button>
										</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office <span class="red">*</span></label>
										<select id="ddlOffice2" class="form-control select2" data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue: $data, value:SelectedOffice, 
                    optionsCaption:"------ Select one -------"  ,event: { change: $data.GetEmpPostingByOffce }' ></select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Post<span class="red">*</span></label>
										<select id="" class="form-control select2"
													 data-bind='options: Posts, optionsText: "PostDesc",
                    optionsValue: $data, value:SelectedPost, 
                    optionsCaption:"------ Select one -------"  ,event: { change: $data.GetDarbandi }'></select>
									</div>
								</div>	
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Darbandi <span class="red">*</span></label>
										<select id="ddlDarbandi" class="form-control select2"
													 data-bind='options: Darbandis, optionsText: "PostSeq",
                    optionsValue: $data, value:SelectedDarbandi, 
                    optionsCaption:"------ Select one -------"'></select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Posting Date<span class="red">*</span></label>
										    <input type="text" id="txtPostingDate" disabled="disabled"
                            data-bind="value:PostingDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                             />

									</div>
								</div>	
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">
										<button type="submit" class="btn btn-info" data-bind="click: SaveEmpPosting">
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
	
    <script src="../../Scripts/PIS/EmployeePosting.js" type="text/javascript"></script>


</asp:Content>