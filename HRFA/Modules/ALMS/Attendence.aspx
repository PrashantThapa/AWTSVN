﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Attendence.aspx.cs" Inherits="HRFA.Modules.ALMS.Attendence" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section class="content" id="EmpGradeForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Attendance Download</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->

										<form role="form" runat="server" id="Form1">
						<div class="box-body">
							
    
    <div class="row">
			  <div class="col-md-6">
			<div class="form-group">
			<label>Office <span class="red">*</span></label>
    	<select id="ddlOffice" class="form-control select2"
														data-bind='options: Offices, optionsText: "OfficeNameNep",
                    optionsValue: $data, value:SelectedOffice, 
                    optionsCaption:"------छान्नुहोस्-------" ,event: { change: $data.GetIPAddress }'></select>
			</div>
			</div>

			 <div class="col-md-6">
			<div class="form-group">
        <label>Device / IP Address <span class="red">*</span></label>
    <select id="ddlIPAddress" class="form-control select2"
														data-bind='options: Devices, optionsText: "DeviceIP",
                    optionsValue: "IPAddress", value:SelectedIP, 
                    optionsCaption:"----------छान्नुहोस्-----------"' ></select>
                   
    </div>
    </div>
		</div>

							<div class="row">
													<div class="col-md-6">
														            <button class="btn btn-primary" data-bind="click: SaveAttendenceInfo">Import Data to Application</button>

														</div>
								</div>
							</div>

    </form>
    </div>
    </div>
			</div>
		 </section>

	
    <script src="../../Scripts/ALMS/Attendence.js" type="text/javascript"></script>
</asp:Content>
