<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeeGrade.aspx.cs" Inherits="HRFA.Modules.PAYROLL.EmployeeGrade" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<section class="content" id="Grade">

		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Grade Scale Setup</h3>
					</div>
					<!-- /.box-header -->

					<!-- form start -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">

                            					<div class="row">
								<div class="col-md-6">
                                    <div class="form-group">
<%--									<div class="form-group test">--%>
										<label>Grade Name</label>
										<input type="text" class="form-control" id="" placeholder="Grade Name" data-bind="value:GradeName" />
									</div>

								</div>
							</div>
						
                                <div class="row">

								<div class="col-md-6">
							<%--	<div class="form-group">
                                        <label for="txtMaxGradeNo">Maximum Grade Number</label>
                                        <input  onkeypress="return isNumberKey(event)"class="form-control" id="txtMaxGradeNo" placeholder="?????? ????? ??????" data-bind="value: MaxGradeNo" />
                                    </div--%>

                                      <div class="form-group">
<%--									<div class="form-group teston">--%>
										<label>Minimum Basic Salary (Rs.)</label>
										<input onkeypress="return isNumberKey(event)" class="form-control" id="" placeholder="Minimum Basic Salary " data-bind="value: MinBasicSalary" />
									</div>
								</div>
								<div class="col-md-6">
									
<%--									<div class="form-group teston">--%>
                                      <div class="form-group">
										<label>Minimum Allowance (Rs.)</label>
										<input onkeypress="return isNumberKey(event)" class="form-control" id="" placeholder="Minimum Allowance " data-bind="value: MinAllowance" />
									</div>
									
								</div>
								<div class="col-md-6">
									
<%--									<div class="form-group teston">--%>
                                      <div class="form-group">
										<label for="txtMaxScaleAmount">Max Basic Salary (Rs.)</label>
										<input onkeypress="return isNumberKey(event)" class="form-control" id="" placeholder="Maximum Basic Salary" data-bind="value: MaxBasicSalary" />
									</div>

								</div>
								<div class="col-md-6">
									
<%--									<div class="form-group teston">--%>
                                      <div class="form-group">
										<label for="txtMaxScaleAmount">Max Allowance (Rs.)</label>
										<input onkeypress="return isNumberKey(event)" class="form-control" id="" placeholder="Maximum Basic Salary" data-bind="value: MaxAllowance"  />
									</div>

								
                                    </div>

                                <div class="col-md-6">
									
<%--									<div class="form-group teston">--%>
                                      <div class="form-group">
										<label for="">Allowance</label>
										<input onkeypress="return isNumberKey(event)" class="form-control" id="" placeholder="Fixed Allowance" data-bind="value: Allowance"  />
									</div>

								
                                    </div>

                            </div>
                         
                            <div class="box-body">
                                   <div class="row wordlong">
                                        
								<div class="col-md-6">
									<div class="form-group">
										<label>Grade Level</label>
										<input type="text" class="form-control" id="GradeLevelName"
											data-bind="value: GradeLevelName"
											data-required="true"
                                            <%--onkeypress="return isNumberKey(event)"--%>
                                            />

									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Grade Amount</label>
										<input type="text" class="form-control" data-bind="value: GradeAmount" onkeypress=" return isNumberKey(event);" />
									</div>
								</div>
							</div>

							    <div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">

										<button type="submit" class="btn btn-info" data-bind="click: $root.AddGrade">Add</button>
										<button type="submit" class="btn btn-default" data-bind="click: ClearControl">Cancel</button>
									</div>
								</div>
							</div>

							    <div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										<thead>
											<tr>
												<th>S.N
												</th>
												<th>Grade Level
												</th>
												<th>Grade Amount
												</th>
												<th>Action
												</th>
											</tr>

										</thead>
										<tbody data-bind="foreach: Grades">
											<tr>
												<td>
													<span data-bind="text: ($index() + 1)"></span><span data-bind="text: GradeID" style="width: 100px; visibility: hidden;" /><span data-bind="text: Action" />
												</td>
												<td>
													<span data-bind="text: GradeLevelName" style="width: 120px;" />
												</td>
												<td>
													<span data-bind="text: GradeAmount" style="width: 120px;" />
												</td>
												<td>
													<a data-bind="click: $root.EditGrade">
														<span class="glyphicon glyphicon-edit" title="Edit"></span></a>
													<a data-bind="click: $root.DeleteGrade">
														<span class="glyphicon glyphicon-trash" title="Delete"></span>
													</a>
												</td>
											</tr>

										</tbody>
									</table>
<%--									<button type="submit" class="btn btn-info pull-right" data-bind="click: SaveGrade">Submit</button>--%>

								</div>
							</div>

                            </div>
                            

					            <div class="col-md-6 wordlong">
									<button type="submit" class="btn btn-primary" data-bind="click: SaveEmployeeGradeScaleInfo">Submit</button>
<%--									<button type="button" class="btn btn-danger" data-bind="click: ClearControls">Cancel</button>--%>
								</div>


                            </div>
					</form>
				</div>
			</div>
		</div>
	</section>

	<script src="../../Scripts/PAYROLL/EmployeeGradeScaleSetup.js" type="text/javascript"></script>

    	<%--<script>
		$(document).ready(function () {
			$('.test input').keyup(function () {

				var empty = false;
				$('.test input').each(function () {
					if ($(this).val().length == 0) {
						empty = true;
					}
				});

				if (empty) {
					$('.teston input').attr('disabled', 'disabled');
				} else {
					$('.teston input').attr('disabled', false);
				}
			});
		});

	</script>
	<script>
		$(document).ready(function () {
			$('.teston input').keyup(function () {

				var empty = false;
				$('.teston input').each(function () {
					if ($(this).val().length == 0) {
						empty = true;
					}
				});

				if (!empty) {
					$('.testoff').removeAttr('hidden');
				}
				//else {
				//       $('.testoff').show();
				//   }
			});
		});

	</script>--%>

</asp:Content>
