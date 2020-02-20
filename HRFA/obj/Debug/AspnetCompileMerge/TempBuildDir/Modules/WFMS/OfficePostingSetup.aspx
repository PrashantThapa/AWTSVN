<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="OfficePostingSetup.aspx.cs" Inherits="HRFA.Modules.WFMS.OfficePostingSetup" %>


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
						<h3 class="box-title">Office Posting Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Office<span class="red">*</span>  </label>
										<select id="lstOffice" multiple class="form-control" style="min-height: 270px; width: 100%;"
											 data-bind="options:OfficeLST, optionsText:'OfficeNameNep',optionsCaption:'---- Select one ----',optionsValue:'OfficeCode',selectedOptions: chosenOffice, value: SelectedOffice,event:{ change: GetPost }">
</select>
									</div>
								</div>
								
								<div class="col-md-6">
									<div class="form-group">
										<label>Post <span class="red">*</span></label>
										<select id="Select1" multiple class="form-control" style="min-height: 270px; width: 100%;"
data-bind="options:PostsLST, optionsText:'PostDesc',optionsCaption:'---- Select one ----', optionsValue:$data, value: SelectedPost,event:{ change: GetPostSeq }">
</select>									</div>
									</div>
															<%--<div class="row">

								<button id="btnUpdate" class="btn btn-info" data-bind="click: UpdateEmpShift">
                            Update Emp Shift</button>

								</div>--%>
								</div>
							<div class="row">
													<div class="col-md-6">
														<div class="form-group">
										<label>Post Number <span class="red">*</span></label>
															<input type="text" id="txtPostSeq" 
                            data-bind="value:PostSeq" class='required form-control' 
                            onkeypress="return isNumberKey(event);" 
                            
                           
                             />
														</div>
													</div>
												</div>
													
							<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button class="btn btn-info" data-bind="click:SaveOfficePost">Submit</button>
															<button class="btn btn-default" data-bind="click:CancelOfficePost">Cancel</button>
														</div>
													</div>
												</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
    <script src="../../Scripts/COMMON/OfficePost.js" type="text/javascript"></script>
	</asp:Content>