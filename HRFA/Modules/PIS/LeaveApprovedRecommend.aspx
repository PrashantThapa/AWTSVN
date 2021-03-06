﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="LeaveApprovedRecommend.aspx.cs" Inherits="HRFA.Modules.PIS.LeaveApprovedRecommend" %>
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
		TagName="EmployeeSearch" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />
	<section class="content" id="LeaveApprovedRecommend">
		<div class="row pages">
			<!-- left column -->
<%--			<a href="LeaveApprovedRecommend.aspx">LeaveApprovedRecommend.aspx</a>--%>
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Leave Approved And Recommended </h3>
					</div>
					<!-- /.box-header -->
					<form role="form" runat="server" id="Form1">
						<div class="box-body">
							<div class="row">

								<div class="col-md-12">
                                <table data-bind="visible: true" class="dataTable table table-bordered table-condensed table-striped sort">

                                <tr>
                            <th>
                                Employee ID
                            </th>
                            <th>
                                Employee's Name
                            </th>
								<%--	<th>
										Leave Type
									</th>--%>
                            <th>
                                 From Date
                            <th>
								To Date
							</th>
                             <th>
                                No. of Days 
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                                <tbody data-bind="foreach: LeaveLsts">
                                            <tr class="warning">
                                                <td >
                                                    <span data-bind="text: EmpID"></span>
                                                    
                                                </td>
                                                <td >
                                                    <span data-bind="text: EmpName"></span>
                                                    
                                                </td>
                                                <td class="hidden" >
                                                    <span data-bind="text: ApplicationDate"></span>
                                                    
                                                </td>
                                                <td class="hidden">
                                                    <span data-bind="text: LeaveTypeID"></span>
                                                    
                                                </td>
                                                <td >
                                                    <span data-bind="text: FromDate"></span>
                                                    
                                                </td>
                                                 <td >
                                                    <span data-bind="text: ToDate"></span>
                                                    
                                                </td>
                                                 <td >
                                                    <span data-bind="text: NoOfDays"></span>
                                                    
                                                </td>
                                                
                                                 <td>
                                                    <a data-bind="click:$root.ClickRowToGetData"><span class="glyphicon glyphicon-circle-arrow-right" title="Select"></span></a>
                                                 </td>
                                               
                                            </tr>
                                        </tbody>
                                </table>
									</div>
								</div>
							
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Start Date<span class="red">*</span>  </label>
										 <input type="text" id="txtfromdate" placeholder="YYYY.MM.DD"
                            class='required form-control' data-bind="value:FromDate, event:{ blur:ValidateFromDate }" onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                            onfocus="UnicodeFocus(event,this);" />
									</div>
								</div>
								
								
							<div class="col-md-6">
									<div class="form-group">
										<label>End Date<span class="red">*</span>  </label>
										 <input type="text" placeholder="YYYY.MM.DD"
                            class='required form-control' id="txtenddate" data-bind="value:ToDate, event:{ blur:ValidateToDate }" onkeypress="return isNumberKey(event)"
                             onblur="return valFutureDate(this,'Y',true);"
                            onfocus="UnicodeFocus(event,this);"? />
									</div>
								</div>															<%--<div class="row">

								<button id="btnUpdate" class="btn btn-info" data-bind="click: UpdateEmpShift">
                            Update Emp Shift</button>

								</div>--%>
								</div>

														
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Total Days<span class="red">*</span>  </label>
										<input type="text" id="Text3"  class='required form-control' onkeypress=" return isNumberKey(event);"  data-bind="value:NoOfDays, event:{ blur:ValidateDays }" />
									</div>
								</div>
								
								
								<div class="col-md-6">
									<div class="form-group wordlong" id="try">

										<div class="checkbox">
											
											<input type="radio" id="chkbox" data-bind="checked:makecheck" value="R" class="minimal" />&nbsp; Reject
											<label></label>
											<input type="radio" id="chkboxapproved" data-bind="checked:makecheck" value="V" class="minimal" />&nbsp;Approved                                      
											<label></label>
											<input type="radio" id="chkboxrecommend" data-bind="checked:makecheck" value="I" class="minimal" />&nbsp; Recommended                                     

										</div>
									</div>
									
								
															
								</div>
								</div>

							<div class="row">
								<div class="col-md-5">
									<div class="form-group">
										<label>Approved/Recommended By<span class="red">*</span> </label>
                    <input type="text" id="txtForwardToName" data-bind="value:$root.ForwardedToName" class='required form-control' disabled />
									</div>

								</div>
								<div class="col-md-1">
									<div class="form-group">
										<button type="button" id="btnForwardEmpSearch" class="btn btn-warning wordlong" data-toggle="modal" data-target="#modalEmpSearch" data-thissource="forwardedto">Search</button>
									</div>
								</div>
								<!-- /.row -->
							</div>
							
							<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button class="btn btn-info" data-bind="click:SaveLeaveApprovedRecommend">Submit</button>
															<button class="btn btn-default" data-bind="click:ClearControls">Cancel</button>
														</div>
													</div>
												</div>
							</div>
						</form>


					<!-- form start -->
					
				</div>
			</div>
		</div>
	</section>
   
	<script src="../../Scripts/PIS/LeaveApprovedRecommend.js" type="text/javascript"></script>
	<script>
	 $(document).ready(function() {
$('#chkboxrecommend').click(function() {
  $('#btnForwardEmpSearch').prop("disabled", false);
		 });

		 $('#chkboxapproved').click(function() {
  $('#btnForwardEmpSearch').prop("disabled", true);
		 });

		  $('#chkbox').click(function() {
  $('#btnForwardEmpSearch').prop("disabled", true);
		 });
    });
	</script>
</asp:Content>
