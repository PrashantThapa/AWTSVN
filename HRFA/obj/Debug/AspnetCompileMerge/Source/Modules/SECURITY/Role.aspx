<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="Role.aspx.cs" Inherits="IDS.Modules.SECURITY.Role1" %>


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
						<h3 class="box-title">Role </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
												<label for="VL">Role Id</label>
										<input type="text" class="form-control" id="VL" data-bind="value:RoleID, enable:shouldShowMessage, event: { blur: $root.validateNumberOnly }">
									</div>
										</div>

								<div class="col-md-6">
									<div class="form-group">
										<label for="TD">
Role Description</label>												
                    <input type="text" class="form-control" id="TD" data-bind="value:RoleDescription, event: { blur: $root.validateDate }">

									</div>
								</div>
								</div>
							<div class="row">
								<div class="col-md-12">
								<button class="btn btn-info pull-right" id="btnAdd" data-bind="click: SaveRoles">
							  Add
                    </button>
									</div>
									</div>

							<div class="row wordlong">
									
								<div class="col-md-12">
									<label>Role</label>

									<table data-bind="visible: true" border="0" class="table table-bordered table-striped" id="tblModule" style="padding: 0px;">
										<thead class="tableFloatingHeaderOriginal">
                            <tr>
                               
                                <th>
                                    Role ID
                                </th>
                                <th>
                                    Role Description
                                </th>
                                
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
					<tbody data-bind="foreach: RoleLST">
                            <tr>
                               
                                <td>
                                    <span data-bind="text: RoleID"></span>
                                </td>
                                <td>
                                    <span data-bind="text:RoleDescription"></span>
                                </td>
                               
                                <td>
                                    <a data-bind="value: RoleID,click:$root.ClickRoleRowToGetData"><span class="glyphicon glyphicon-edit"
                                        title="Select"></span></a>
									<%--<a data-bind="click: $root.DeleteRole">
                                        <span class="glyphicon glyphicon-trash" title="Delete"></span>
                                        </a>--%>
                                </td>
                            </tr>
                        </tbody>
									
                    </table>
								</div>
							</div>
							<div class="row wordlong">
															
								<div class="col-md-12">
									<label>Role Module Function</label>

																<table data-bind="visible: true" border="0" class="table table-bordered table-striped" id="tblModuleFunction" style="padding: 0px;">
																	 <thead class="tableFloatingHeaderOriginal">
														<tr>
													
															<th>
																Module Description
															</th>
															<th style="display:none;">
																Function CD
															</th>
															<th style="display:none;">
																Function Description
															</th>
															<th style="display:none;">
																select
															</th>
															<th>
																Action
															</th>
														</tr>
													</thead>
																	          <tbody data-bind="foreach: RoleModuleFunctionLST">
														<tr class="warning">
															
															<td>
																<span data-bind="text:ModuleDesc"></span>
															</td>
															<td style="display:none;">
																<span data-bind="text:ModuleDesc"></span>
															</td>
															<td style="display:none;">
																<span data-bind="text:FunCD"></span>
															</td>
															<td style="display:none;">
																<span data-bind="text:FunDesc"></span>
															</td>
															<td>
																<input type="checkbox" data-bind="event:{ change: $root.RMFtoADD}, checked:makecheck" />
															</td>
														</tr>
													</tbody>
																</table>
															</div>
														</div>
					
							
									</div>
	</form>		
			</div>
				</div>
		</div>
	</section>

	<script src="../../Scripts/SECURITY/Role.js" type="text/javascript"></script>
 
    <script type="text/javascript">
        $("#tblModule").stickyTableHeaders();
        $("#tblModuleFunction").stickyTableHeaders();
    </script>
</asp:Content>