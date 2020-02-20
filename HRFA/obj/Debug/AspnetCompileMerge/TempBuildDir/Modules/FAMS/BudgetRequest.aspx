<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="BudgetRequest.aspx.cs" Inherits="HRFA.Modules.FAMS.BudgetRequest" %>

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
						<h3 class="box-title">Budget Request </h3>
					</div>
					<!-- /.box-header -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Submission No <span class="red">*</span> </label>
										<input type="text" id="Text2" data-bind="value:SubmissionNo" class='required form-control'
                                    onkeypress="return isNumberKey(event)" disabled />
										</div>
								</div>
																<!-- /.row -->
							</div>

							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										<tr>
											<th class="hidden">ID
											</th>
											<th>Employee Name
											</th>
											<th>स्वीकृत भऐको विदाको सुरू मिति
											</th>
											<th>स्वीकृत भऐको विदाको अन्त्य मिति
											</th>
											<th>दिन संख्या 
											</th>
										</tr>


										<tbody data-bind="foreach: LeaveCancellationLst">
											<tr>
												<td class="hidden">
													<span data-bind="text: EmpID" />
												</td>
												<td>
													<span data-bind="text: EmpName" />
												</td>
												<td>
													<span data-bind="text: AppFromDate" />
												</td>
												<td>
													<span data-bind="text: AppToDate" />
												</td>
												<td>
													<span data-bind="text: AppNoOfDays" />
												</td>
												<td>
													<a data-bind="click: $root.EditLeave"><span class="glyphicon glyphicon-circle-arrow-right" title="Edit"></span></a>


												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							







						</div>
					</form>


					<!-- form start -->

				</div>
			</div>
		</div>
	</section>
    <script src="../../Scripts/FAMS/BudgetRequest.js" type="text/javascript"></script>
</asp:Content>
