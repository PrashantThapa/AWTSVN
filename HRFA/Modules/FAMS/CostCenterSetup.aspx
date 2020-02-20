<%@ Page Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="CostCenterSetup.aspx.cs" Inherits="HRFA.Modules.FAMS.CostCenterSetup" %>

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
						<h3 class="box-title">Cost Center Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Office<span class="red">*</span>  </label>
										<select id="lstOffices" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:Offices, optionsText:'OfficeNameNep', optionsValue:'OfficeCode', optionsCaption: '------ Select one ------', value: SelectedOffice , event: { change:GetCostCenterDetails}"> 
                        </select>
									</div>
								</div>
								
								<div class="col-md-4">
									<div class="form-group">
										<label>Cost Center In Use </label>
										<select id="lstCostCenters" multiple class="form-control" style="min-height: 270px; width: 100%;"
											data-bind="options:AssignedCostCenters, optionsText:'CostCenterName', optionsValue:'CostCenterID', optionsCaption: '------ Select one ------',value:SelectedCostCenterDetails"> 
                        </select>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label> Name Of Cost Center<span class="red">*</span> </label>
										<select id="Select2" class="form-control select2"
											data-bind="options:CostCenters, optionsText:'CostCenterName', optionsValue:$data,optionsCaption:'------ Select one-------', value: SelectedCostCenter">
                                </select>
									</div>
								</div>
								</div>

																			<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button type="submit" class="btn btn-info" id="btnSave" data-bind="click: SaveCostCenter">Submit</button>
															<button type="submit" class="btn btn-default" id="btnCancel" data-bind="click:ClearCostCenter">Cancel</button>
														</div>
													</div>
												</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
    <script src="../../Scripts/FAMS/CostCenter.js" type="text/javascript"></script>
	</asp:Content>