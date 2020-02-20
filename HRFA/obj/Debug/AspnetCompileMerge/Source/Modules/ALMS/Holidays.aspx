<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Holidays.aspx.cs" Inherits="HRFA.Modules.ALMS.Holidays" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Public Holidays </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<select id="lstHolidays" multiple class="form-control" style="min-height: 270px; width: 100%;"
											 data-bind="options:HolidaySetupDays, optionsText:'HolidayDesc', optionsValue:'HolidayID', 
             optionsCaption: '------ Select one -------', value:SelectedHolidaySetupDay, event:{ change:HolidaySetupDetails }">
</select>
									</div>
								</div>
								<div class="col-md-7">
									<div class="row">
										<div class="col-md-6">
											<div class="form-group">
												<label>Holiday Desc.<span class="red">*</span></label>
<input type="text" id="txtHolidayDescription" 
                            data-bind="value:HolidayDesc" class='required form-control' 
<%--                            onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);" --%>
                            oninput="convert_to_unicode(this)"
                            
                             />											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group wordlong">
												<div class="checkbox">
											
											<input type="radio" id ="Status" data-bind="checked: FixedHolidays" class="minimal" />&nbsp; Fixed
</div>
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-6">
											<div class="form-group">
												<label>Start Date<span class="red">*</span></label>
												<input type="text" id="txtFromDate" placeholder="YYYY.MM.DD"
                            data-bind="value:FromDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'N',true);"
                            <%--onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%>
                             />
											</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label>End Date<span class="red">*</span></label>
													 <input type="text" id="txtToDate" placeholder="YYYY.MM.DD"
                            data-bind="value:ToDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'N',true);"
                            <%--onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%>
                             />
												</div>
											</div>
										</div>


								
									
												<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button type="submit" class="btn btn-info" id="btnSave" data-bind="click:SaveHolidaySetup">Submit</button>
															<button type="submit" class="btn btn-danger" id="btnDelete" data-bind="click:DeleteHolidaySetup">Delete</button>
															<button type="submit" class="btn btn-default" id="btnCancel" data-bind="click:CancelHolidaySetup">Cancel</button>
														</div>
													</div>
												</div>

								</div>
								</div>
							</div>
					</form>
				</div>
			</div>
		</div>
	</section>
<script type="text/javascript" src="../../Scripts/ALMS/Holidays.js"></script>

</asp:Content>
