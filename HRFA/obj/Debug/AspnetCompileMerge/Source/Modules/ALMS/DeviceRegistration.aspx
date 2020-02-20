<%@ Page Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="DeviceRegistration.aspx.cs" Inherits="HRFA.Modules.ALMS.DeviceRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   	<section class="content" id="DeputationForm">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Device Registration</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office <span class="red">*</span></label>
	<select id="Select1" class="form-control select2"
														data-bind='options: Offices, 
                            optionsText: "OfficeNameNep",
                            optionsValue:$data,
                            value:SelectedOffice, 
                            optionsCaption:"------ Select one-------",
                            event: {change: GetDeviceRegistration} '>
                                </select>

									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Device Name <span class="red">*</span></label>
								     <input type="text" id="DeviceName" data-bind="value:DeviceName" class='required form-control' />
																			</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>IP Address <span class="red">*</span></label>
                            <input type="text" id="IPAddress" data-bind="value:IPAddress" class="required form-control" onkeypress="return isNumberKey(event)" />
									</div>
									<div class="form-group">

								<button type="submit" class="btn btn-info" data-bind="click: $root.AddDeviceRegistration">Add</button>

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
                                    Device Name
                                </th>
                                <th>
                                    IP Address
                                </th>

                                <th>
                                    Action
                                </th>
                            </tr>
                            <tbody data-bind="foreach: DeviceRegistrations">
                                <tr>
                                    <td data-bind="text: Office().OfficeNameNep" style="width:130px;" >
                                    </td>
                                    <td>
                                        <span data-bind="text: DeviceName " style="width:120px;"/>
                                    </td>

                                    <td>
                                        <span data-bind="text: IPAddress" style="width:120px;"/>
                                    </td>
                                    <td>
                                    
                                        <a data-bind="click: $root.EditDeviceRegistration">
                                        <span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                        <a data-bind="click: $root.DeleteDeviceRegistration">
                                        <span class="glyphicon glyphicon-trash" title="Delete" ></span>
                                        </a>
                                    
                                    </td>
                                </tr>
                
                            </tbody>
									</table>
								</div>
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">

										<button type="submit" class="btn btn-info" id="btnSave" data-bind="click: SaveDeviceRegistration">Submit</button>
										<button type="submit" class="btn btn-default" id="btnCancel" data-bind="click: ClearDeviceRegistration">Cancel</button>
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

    <script src="../../Scripts/ALMS/DeviceRegistration.js" type="text/javascript"></script>
</asp:Content>
