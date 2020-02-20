<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeeD.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeeD" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript">
		$(document).ready(function () {
			ValidateSession();
		});

	</script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
		<!-- general form elements -->
	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee Personal Information</h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
									<div class="row">
								<div class="col-md-6" id="divSubmissionNo">
									<div class="form-group">
										<label>Submission No.</label>
										<input type="text" id="txtSubmissionNo" maxlength="16"
         onkeypress="return isNumberKey(event)" onblur="return isNumberKey(event)" data-bind="value: SubmissionNo" /></div>
								 </div>
								<div class="col-md-6">
									<div class="row">
										<div class="col-md-6">
											        <button id="btnEmpDetails" class="btn btn-primary update" data-bind="click: EmpDetails">Update Details</button>
										</div>
									</div>
									</div>
								</div>

									<div class="row wordlong">
											<div class="col-md-6">
											<div class="form-group">
												<div class="img">
    <img alt="" id="upEmpImage" style ="width:150px; height:140px;" data-bind=" attr: { src: EmpImageFile() }"
     class="DoCPReview" data-content="Preview Uploaded File!!!"/>
												</div>
												<button type="submit" class="btn btn-info wordlong" data-bind="click: DeleteImage">Delete</button>
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													    <input id="UploadEmpImgFile" type="file" name="image" class="btn btn-default" />
														<button id="btnUpload" class="btn btn-primary wordlong" data-bind="click: UploadImage">Upload</button>
														</div>
												</div>
				</div>
									
									<div class="row">
										<div class="col-md-4">
											<div class="form-group">
												<label>Symbol No. <span class="red">*</span> </label>
        <input type="text" id="txtSymbolNo" data-bind="value: SymbolNo, event: { change: checkUnique }" class='required form-control'/>
											</div>
										</div>
										
							</div>
									<div class="row">
									
										<div class="col-md-4">
											<div class="form-group">
												<label>First Name (in devnagari)<span class="red">*</span> </label>
<input type="text" id="txtEmpFirstName" 
                            data-bind="value: EmpFirstName" class='required form-control' 
                            oninput="convert_to_unicode(this)"
                             />
											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label>Middle Name (in devnagari)</label>
<input type="text" id="txtEmpMiddleName" 
                            data-bind="value: EmpMiddleName" class='required form-control' 
 
                            oninput="convert_to_unicode(this)"
                             />											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label>Last Name (in devnagari)<span class="red">*</span> </label>
<input type="text" id="txtEmpLastName" 
                            data-bind="value: EmpLastName" class='required form-control' 

                            oninput="convert_to_unicode(this)"
                             />
											</div>
										</div>

									</div>
									<div class="row">
										<div class="col-md-4">
											<div class="form-group">
												<label>First Name </label>
    <input type="text" id="txtEmpFNameEng" data-bind="value: EmpFirstNameEng" class='required form-control'/>
											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label>Middle Name</label>
    <input type="text" id="txtEmpMNameEng"  data-bind="value: EmpMiddleNameEng" class='required form-control' />
											</div>
										</div>
																				<div class="col-md-4">
											<div class="form-group">
												<label>Last Name</label>
    <input type="text" id="txtEmpLNameEng" data-bind="value: EmpLastNameEng" class='required form-control' />
											</div>
										</div>


									</div>
									<div class="row">
										<div class="col-md-4">
											<div class="form-group">
												<label>Date Of Birth <span class="red">*</span></label>										
<input type="text" id="txtEmpDOB" 
                            data-bind="value: EmpDOB" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                             onblur=""
                             placeholder="YYYY.MM.DD" maxlength="10"
                            onfocus="" 
                             />											</div>
										</div>
										<div class="col-md-4">

										<div class="form-group">
											<label>Gender <span class="red">*</span></label>
										<div class="checkbox">
											
											<input type="radio" name="empGender" value="M" data-bind="checked: EmpGender" class="minimal" />&nbsp;Male
											<label></label>
											<input type="radio" name="empGender" value="F" data-bind="checked: EmpGender" class="minimal" />&nbsp;Female                                     
											<label></label>
											<input type="radio" name="empGender" value="O" data-bind="checked: EmpGender" class="minimal" />&nbsp;Other                                     

										</div>
									</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
											<label>Marital Status<span class="red">*</span></label>
												<select id="ddlMaritalStatus" class="form-control select2"
													 data-bind='options: MaritalStatuses, optionsText: "MarStatName",
	optionsValue: $data, value: SelectedEmpMStatus,
	optionsCaption: "------ Select one-------"'></select>
											</div>
										</div>

									</div>
									<div class="row">
										<div class="col-md-4">
											<div class="form-group">
												<label>Country<span class="red">*</span></label>										
												<select id="ddlEmpCountry" class="form-control select2"
													 data-bind='options: Countries, optionsText: "CountryName",
	optionsValue: $data, value: SelectedEmpCountry,
	optionsCaption: "------ Select one -------"'></select>
											</div>
										</div>
										<div class="col-md-4">

										<div class="form-group">
											<label>Religion</label>
										<select id="ddlEmpReligion" class="form-control select2"
													 data-bind='options: Religions, optionsText: "ReligionTypeName",
	optionsValue: $data, value: SelectedEmpReligion,
	optionsCaption: "------ Select one -------"'></select>
									</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
											<label>Identity Mark</label>
												<input type="text" id="txtIdentityMark" 
                            data-bind="value: IdentityMark" class='required form-control' 

                            oninput=""/>
											</div>
										</div>

									</div>
									<div class="row">
										<div class="col-md-4">
											<div class="form-group">
												<label>Provident Fund No.</label>
<input type="text" id="txtPFNo" class='required form-control' 
                            data-bind="value: PFNo"/>

											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label>Citizen Investment Fund No.</label>
<input type="text" id="txtCtzDFNo"  class='required form-control' 
                            data-bind="value: CtzDFNo"/>											</div>
										</div>
																				<div class="col-md-4">
											<div class="form-group">
												<label>Pan No.</label>
<input type="text" id="txtPanNo"  class='required form-control' 
                            data-bind="value: PanNo"/>
											</div>
										</div>


									</div>



									
							</div>
									
					</form>
				</div>
			</div>
		</div>
	</section>

	<section class="content">
		<div class="row">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
			<div class="row">
        <div class="col-md-12">
          <!-- Custom Tabs -->
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs" id="myTab">
				<li id="emprec" class="active"><a href="#ContactInfo" data-toggle="tab"><h4 style="font-size:16px;">Contact</h4></a></li>
                <li id="empadd"><a href="#Qualification"  data-toggle="tab"><h4 style="font-size:16px;">Qualification</h4></a></li>
                <li id="empcon"><a href="#Training"  data-toggle="tab"><h4 style="font-size:16px;">Training</h4></a></li>
                <li id="emprel"><a href="#Experience"  data-toggle="tab"><h4 style="font-size:16px;">Experience</h4></a></li>
                <li id="Li1"><a href="#Document" data-toggle="tab"><h4 style="font-size:16px;">Document</h4></a></li>
                <li id="empdoc"><a href="#Insurance"  data-toggle="tab"><h4 style="font-size:16px;">Insurance</h4></a></li>
                <li id="empmed"><a href="#MedicalCondition" data-toggle="tab"><h4 style="font-size:16px;">Medical Condition</h4></a></li>
                <li id="empoth"><a href="#Language" data-toggle="tab"><h4 style="font-size:16px;">Language</h4></a></li>
                <li id="empsch"><a href="#Relative" data-toggle="tab"><h4 style="font-size:16px;">Contact Person</h4></a></li>
            </ul>
            <div class="tab-content" id="ContactContent">
			    <div class="tab-pane in active" id="ContactInfo">
                   <div class="row">
                      
                        <div class="col-md-4">
<div class="form-group">           
	<label>Address Type <span class="red">*</span></label>
                            <select id="ddlAddressType"   class="form-control select2" 
                                        data-bind='options: AddressTypes, optionsText: "AddressName",
	optionsValue: $data, value: SelectedAddrType,
	optionsCaption: "------ Select one -------",event: { change: $data.GetProvinces }'></select>
                        </div>
							</div>
					   <div class="col-md-4">
<div class="form-group">           
	<label>Province <span class="red">*</span></label>
                            <select id="ddlProvince" class="form-control select2" 
                                         data-bind='options: Provinces, optionsText: "ProvinceNameEnglish",
	optionsValue: $data, value: SelectedProvince,
	optionsCaption: "------ Select one -------", event: { change: $data.GetDistricts }'></select>
                        </div>
							</div>
					  
					   <div class="col-md-4">
							<div class="form-group"> 
                        <label>District <span class="red">*</span></label>
                       
                            <select id="ddlDistrict" class="form-control select2" 
                                        data-bind='options: Districts, optionsText: "DistrictNameEnglish",
	optionsValue: $data, value: SelectedDistrict,
	optionsCaption: "------ Select one -------", event: { change: $data.GetVDC }'></select>
                        </div>
							</div>
					   </div>		

                       
					 <div class="row">
						   <div class="col-md-4">
							<div class="form-group">
                        <label>Municipality/Rural Municipality. <span class="red">*</span></label>
                        <select id="ddlVDCMP"   class="form-control select2" 
                                        data-bind='options: VDCMPs, optionsText: "VDCName",
	optionsValue: $data, value: SelectedVDCMP,
	optionsCaption: "------ Select one -------", event: { change: $data.GetWard } '></select>
                        </div>
							</div>
                        					  
							  <div class="col-md-4">
							<div class="form-group">
                       <label>Ward No. <span class="red">*</span></label>
                        <div data-bind="if: Wards">
							
                        <select id="ddlWard" class="form-control select2" 
                                        data-bind='options: Wards, optionsValue: $data, value: SelectedWard, optionsCaption: "------ Select one -------"'></select>
							</div>
							</div>

					  </div>
                    </div>
                       
                    <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Tole (in devnagari)<span class="red">*</span></label>

                        <input type="text" id="txtToleNep" class='required form-control' 
 
                            oninput="convert_to_unicode(this)"
                         data-bind="value: ToleNep"/>
                        </div>
						</div>

                         <div class="col-md-4">
							 <div class="form-group">
								 <label>Tole</label>
                        <input type="text" id="txtToleEng" class="form-control"
                         data-bind="value: ToleEng"/>
                        </div> 
							 </div>
					
                        <div class="col-md-4">
							<div class="form-group">
								<label>House No.</label>
                        <input type="text" id="txtHouseNo" class='required form-control' 
                         data-bind="value: HouseNo"/>
                        </div>
                     </div>
			  </div>

                     <div class="row">
                        <div class="col-md-12">
                            <button id="btnAddAddress" class="btn btn-primary pull-right" data-bind="click: AddAddress">Add</button>
                        </div>
                     </div>


                     <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Address Type</th>
                                    <th>District</th>
                                    <th>Municipality/Rural Municipalty.</th>
									<th>Province</th>
                                    <th>Ward No.</th>
                                    <th>Tole</th>
                                    <th>House No.</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: PersonAddresses">
                                <tr>
                                   <td data-bind="text: AddrType().AddressName"></td>
                                    <td data-bind="text: Address().District.DistrictNameNepali"></td>
                                    <td data-bind="text: Address().VDC.VDCName"></td>
									<td data-bind="text: Address().Province.ProvinceNameEnglish"></td>
<%--									<td data-bind="text: Address().Ward.WardNameNep"></td>--%>
									<td data-bind="text: Address().Ward"></td>
                                    <td data-bind="text: Address().Tole"></td>
                                    <td data-bind="text: Address().HouseNumber"></td>
                                    <td>
                                    <a data-bind="click: $root.EditAddress"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteAddress"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

                     <div class="row wordlong">
                        <div class="col-md-4">
							<div class="form-group">
							<label>Contact Type <span class="red">*</span></label>
                        <select id="ddlContactType"   class="form-control select2" 
                                        data-bind='options: ContactTypes, optionsText: "TypeNameEng",
	optionsValue: $data, value: SelectedContactType,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>

                        <div class="col-md-4">
							<div class="form-group">
                        <input type="text" id="txtValue" class='required form-control wordlong' 
                         data-bind="value: Value"/>
                        </div>
							</div>

							<div class="col-md-4">
								<div class="form-group">
									<button id="btnAddContact" class="btn btn-primary pull-right wordlong" data-bind="click: AddContact">Add</button>
                        </div>
								</div>
                        
                        </div>

                     <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Contact Type</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: PersonContacts">
                                <tr>
                                    <td data-bind="text: ContactType().TypeName"></td>
                                    <td data-bind="text: CTypeValue"></td>
                                    <td>
                                    <a data-bind="click: $root.EditContact"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteContact"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>
                  </div>

				<div class="tab-pane" id="Qualification">
             
					<div class="row">
                        <div class="col-md-4">
							<div class="form-group">
							 <label>Title <span class="red">*</span></label>
                        <input type="text" id="txtQualTitle" class='required form-control' 
 
                            oninput=""
                         data-bind="value: QualTitle"/>
                        </div>
							 </div>
                        <div class="col-md-4">
							<div class="form-group">
							<label>Country <span class="red">*</span></label>
                        <select id="ddlQualCountry" class="form-control select2" 
                                        data-bind='options: Countries, optionsText: "CountryName",
	optionsValue: $data, value: SelectedQualCountry,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
							<label>Qualification <span class="red">*</span></label>
                        <select id="ddlQualification"   class="form-control select2" 
                                        data-bind='options: Qualifications, optionsText: "QualName",
	optionsValue: $data, value: SelectedQualification,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
                   </div>
					</div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Institution</label>
                        <input type="text" id="txtQualInstitution" class='required form-control' 
                            oninput=""
                         data-bind="value: QualInstitution"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Start Date</label>
                        <input type="text" id="txtQualFromDate" class='form-control select2', 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" maxlength="10"
                             
                         data-bind="value: QualFromDate, event: { blur: ValidateQualificationDate }"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>End Date</label>
                        <input type="text" id="txtQualToDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                            placeholder="YYYY.MM.DD"
                              maxlength="10"
                         data-bind="value: QualToDate, event: { blur: ValidateQualificationDate }"/>
                        </div>
                   </div>
				</div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Grade/Division</label>
                        <input type="text" id="txtQualGrade" class='required form-control' 

                            oninput=""
                         data-bind="value: QualGrade"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Percentage</label>
                        <input type="text" id="txtQualPercent" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                         data-bind="value: QualPercent"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
							<label>Equivalence</label>
                        <input type="text" id="txtEduEquivalence" class='required form-control' 

                            oninput=""
                         data-bind="value: EduEquivalence"/>
                         
                        </div>
                   </div>
			  </div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Major Subject</label>
                         <textarea name="txtQualMjrSubject"  cols="40" rows="5"
                        class='required form-control' 

                            oninput=""
                         id="txtQualMjrSubject"  data-bind="value: QualMjrSubject"></textarea> 
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Optional Subject</label>
                         <textarea name="txtQualOptSubject"  cols="40" rows="5"
                        class='required form-control' 

                            oninput=""
                         id="txtQualOptSubject"  data-bind="value: QualOptSubject"></textarea> 
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Remarks</label>
                        <textarea name="txtQualRemarks"  cols="40" rows="5"
                        class='required form-control' 

                            oninput=""
                         id="txtQualRemarks"  data-bind="value: QualRemarks"></textarea> 
                        </div>
                        </div>
                   </div>

                   <div class="row">
                        <div class="col-md-12">
							<div class="form-group">
                         <button id="btnAddQualification" class="btn btn-primary pull-right" data-bind="click: AddQualification">Add</button>
                        </div>
							</div>
                   </div>

                   <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Subject</th>
                                    <th>Country</th>
                                    <th>Qualification</th>
                                    <th>Instituation</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Grade/Div</th>
                                    <th>Percentage</th>
                                    <th>Major Subject</th>
                                    <th>Optional Subject</th>
                                    <th>Equivalence</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: PersonQualifications">
                                <tr>
                                    <td data-bind="text: Title"></td>
                                    <td data-bind="text: Country().CountryName"></td>
                                    <td data-bind="text: Qualification().QualName"></td>
                                    <td data-bind="text: Institute"></td>
                                    <td data-bind="text: FromDate"></td>
                                    <td data-bind="text: ToDate"></td>
                                    <td data-bind="text: Grade"></td>
                                    <td data-bind="text: Percentage"></td>
                                    <td data-bind="text: MajorSubject"></td>
                                    <td data-bind="text: OptSubject"></td>
                                    <td data-bind="text: EduEquivalence"></td>
                                    <td data-bind="text: Remarks"></td>
                                    <td>
                                    <a data-bind="click: $root.EditQualification"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteQualification"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

                </div>

                <div class="tab-pane" id="Training">
                        <div class="row">
                         <div class="col-md-4">
							 <div class="form-group">
								 <label>Title <span class="red">*</span></label>
                        <input type="text" id="txtTrainingTitle" class='required form-control' 

                            oninput=""
                         data-bind="value: TrainingTitle"/>
                        </div>
							 </div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Country <span class="red">*</span></label>
                        <select id="ddlTrainingCountry" class="form-control select2" 
                                        data-bind='options: Countries, optionsText: "CountryName",
	optionsValue: $data, value: SelectedTrainCountry,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Certificate <span class="red">*</span></label>
                        <input type="text" id="txtTrainCertificate" class='required form-control' 

                            oninput=""
                         data-bind="value: TrainCertificate"/>
                        </div>
                   </div>
			</div>

					    <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Instituation</label>
                        <input type="text" id="txtTrainInstitute" class='required form-control' 
 
                            oninput=""
                         data-bind="value: TrainInstitution"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Start Date</label>
                        <input type="text" id="txtTrainFromDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: TrainFromDate, event: { blur: ValidateTrainingDate }"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>End Date</label>
                        <input type="text" id="txtTrainToDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: TrainToDate, event: { blur: ValidateTrainingDate }"/>
                        </div>
							</div>
                   </div>

					    <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Grade/Div</label>
                        <input type="text" id="txtTrainGrade" class='required form-control' 

                            oninput=""
                         data-bind="value: TrainGrade"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Percentage</label>
                        <input type="text" id="txtTrainPercent" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                         data-bind="value: TrainPercent"/>
                        </div>
							</div>
                        
                   </div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Major Subject</label>
                         <textarea name="Text1" cols="40" rows="5" class='required form-control' 

                            oninput=""
                         id="txtTrainMjrSubject"  data-bind="value: TrainMjrSubject"></textarea> 
                         </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Remarks</label>
                        <textarea name="Text1" cols="40" rows="5" class='required form-control' 

                            oninput=""
                         id="txtTrainRemarks"  data-bind="value: TrainRemarks"></textarea> 
                        </div>
							</div>
                   </div>

<div class="row">
	<div class="col-md-12">
		<div class="form-group">
           <button id="btnAddTraining" class="btn btn-primary pull-right" data-bind="click: AddTraining">Add</button>
		</div>
	</div>
</div>
                   <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Subject</th>
                                    <th>Country</th>
                                    <th>Certificate</th>
                                    <th>Institution</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Grade/Div</th>
                                    <th>Percentage</th>
                                    <th>Major Subject</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: EmployeeTrainings">
                                <tr>
                                    <td data-bind="text: Title"></td>
                                    <td data-bind="text: Country().CountryName"></td>
                                    <td data-bind="text: CertificateName"></td>
                                    <td data-bind="text: Institution"></td>
                                    <td data-bind="text: FromDate"></td>
                                    <td data-bind="text: ToDate"></td>
                                    <td data-bind="text: Grade"></td>
                                    <td data-bind="text: Percentage"></td>
                                    <td data-bind="text: MajorSubject"></td>
                                    <td data-bind="text: Remarks"></td>
                                    <td>
                                    <a data-bind="click: $root.EditTraining"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteTraining"><span class="glyphicon glyphicon-trash" title="Delete"></span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

               </div>

			    <div class="tab-pane" id="Experience">
				  <div class="row">
                    
                        <div class="col-md-4">
							<div class="form-group">
								<label>Country <span class="red">*</span></label>
                        <select id="ddlExpCountry" class="form-control select2" 
                                        data-bind='options: Countries, optionsText: "CountryName",
	optionsValue: $data, value: SelectedExpCountry,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Job Location <span class="red">*</span></label>
                        <input type="text" id="txtJobLocation" class='required form-control' 

                            oninput=""
                         data-bind="value: JobLocation"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Start Date</label>
                        <input type="text" id="txtExpFromDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: ExpFromDate, event: { blur: ValidateExpDate }"/>
                        </div>
                </div>
				   </div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>End Date</label>
                        <input type="text" id="txtExpToDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: ExpToDate, event: { blur: ValidateExpDate }"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Job Role And Responsibilities</label>
                        <textarea name="txtJobTitleResp" cols="40" rows="5" class='required form-control' 

                            oninput=""
                         id="txtJobTitleResp"  data-bind="value: JobTitleResp"></textarea> 
                        </div>
							</div>
                       
                   </div>

				   <div class="row">
					   <div class="col-md-12">
						   <div class="form-group">
                             <button id="btnAddExperience" data-bind="click: AddExperience" class="btn btn-primary pull-right">Add</button>
						   </div>
					   </div>
				   </div>
                   <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Country</th>
                                    <th>Job Location</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Job Role and Responsibilities</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: EmployeeExperiences">
                                <tr>
                                    <td data-bind="text: Country().CountryName"></td>
                                    <td data-bind="text: JobLocation"></td>
                                    <td data-bind="text: FromDate"></td>
                                    <td data-bind="text: ToDate"></td>
                                    <td data-bind="text: Remarks"></td>
                                    <td>
                                    <a data-bind="click: $root.EditExperience"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteExperience"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>
				   
               </div>

				<div class="tab-pane" id="Document">
                    <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Document Type <span class="red">*</span></label>
                        <select id="ddlDocType"   class="form-control select2" 
                                        data-bind='options: DocumentTypes, optionsText: "TypeNameEng",
	optionsValue: $data, value: SelectedDocType,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Document Number <span class="red">*</span></label>
                        <input type="text" id="txtDocNo" class='required form-control' 
                         data-bind="value: DocNo"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Issued By<span class="red">*</span></label>
                        <input type="text" id="txtDocIssuedBy" class='required form-control' 

                            oninput=""
                         data-bind="value: DocIssuedBy"/>
                        </div>
							</div>
                    </div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Issued Date <span class="red">*</span></label>
                        <input type="text" id="txtDocDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: DocDate"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>File</label>
                         <input id="UploadDocFile" type="file" name="image" class="btn btn-default" />
                         </div>
							</div>
                      
                   </div>

         <div class="row">
			 <div class="col-md-12">
				 <div class="form-group">
                    <button id="btnAddDocument" data-bind="click: AddDocument" class="btn btn-primary pull-right">Add</button>
				 </div>
			 </div>
         </div>
					<div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Document Type</th>
                                    <th>Document No.</th>
                                    <th>Issued By </th>
                                    <th>Issued Date</th>
                                    <th>File</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: PersonDocuments">
                                <tr>
                                    <td data-bind="text: DocType().TypeName"></td>
                                    <td data-bind="text: IssueNo"></td>
                                    <td data-bind="text: IssueBy"></td>
                                    <td data-bind="text: IssueDate"></td>
                                    <td>
                                    <img id="upEmpDocImage" style="height:32px; width:32px;" data-bind="click: $root.previewEmpDocImage, attr: { src: DocFile, data: DocFile }" class="DoCPReview" data-content="Preview Uploaded File!!!" />
                                    </td>
                                    <td>
                                    <a data-bind="click: $root.EditDocument"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteDocument"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

               </div>

                <div class="tab-pane" id="Insurance">
                    <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Company Name<span class="red">*</span></label>
                        <input type="text" id="txtCompanyName" class='required form-control' 

                         oninput=""
                         data-bind="value: CompanyName"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Insurance No.<span class="red">*</span></label>
                        <input type="text" id="txtInsuranceNo" class='required form-control' 
                         data-bind="value: InsuranceNo"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Policy Type</label>
                        <input type="text" id="txtPolicyType" class='required form-control' 

                            oninput=""
                         data-bind="value: PolicyType"/>
                        </div>
                   </div>
							</div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Expiry Date<span class="red">*</span></label>
                        <input type="text" id="txtExpiryDate" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'N',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: ExpiryDate"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Yearly Premium<span class="red">*</span></label>
                        <input type="text" id="txtYearlyPremium" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                         data-bind="value: YearlyPremium, event: { blur: ValidatePremium }"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Monthly Premium</label>
                        <input type="text" id="txtMonthlyPremium" class='required form-control'
                            onkeypress="return isNumberKey(event)"
                         data-bind="value: MonthlyPremium, event: { blur: ValidatePremium } "/>
                        </div>
                   </div>
							</div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Remarks</label>
                        <textarea name="Text1" cols="40" rows="5" class='required form-control' 

                            oninput=""
                         id="txtInsRemarks"  data-bind="value: InsRemarks"></textarea> 
                        </div>
							</div>
                 </div>
				   
				   <div class="row">
					   <div class="col-md-12">
                          <button id="btnAddInsurance" data-bind="click: AddInsurance" class="btn btn-primary pull-right">Add</button>
					   </div>
				   </div>
                 

                   <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Company Name</th>
                                    <th>Insurance No.</th>
                                    <th>Policy Type</th>
                                    <th>Expiry Date</th>
                                    <th>Yearly Premium</th>
                                    <th>Monthly Premium</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: EmployeeInsurances">
                                <tr>
                                    <td data-bind="text: CompanyName"></td>
                                    <td data-bind="text: InsuranceNo"></td>
                                    <td data-bind="text: PolicyType"></td>
                                    <td data-bind="text: ExpiryDate"></td>
                                    <td data-bind="text: YearlyPremium"></td>
                                    <td data-bind="text: MonthlyPremium"></td>
                                    <td data-bind="text: Remarks"></td>
                                    <td>
<a data-bind="click: $root.EditInsurance"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
<a data-bind="click: $root.DeleteInsurance"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

               </div>

               <div class="tab-pane" id="MedicalCondition">
                    <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Problem<span class="red">*</span></label>
                        <input type="text" id="txtProblem" class='required form-control' 

                            oninput=""
                         data-bind="value: Problem"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Problem Start Date</label>
                        <input type="text" id="txtProblemStart" class='required form-control' 
                            onkeypress="return isNumberKey(event)"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                         data-bind="value: ProblemStart"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Reason</label>
                        <input type="text" id="txtReason" class='required form-control' 

                            oninput=""
                         data-bind="value: Reason"/>
                        </div>
							</div>
                   </div>
               
				   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Doctor Name</label>
                        <input type="text" id="txtDoctorName" class='required form-control' 

                            oninput=""
                         data-bind="value: DoctorName"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Doctors Contact No.</label>
                        <input type="text" id="txtDoctorMobNo" class='required form-control' 
                        onkeypress="return isNumberKey(event)"
                         data-bind="value: DoctorMobNo"/>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Doctors Address</label>
                        <input type="text" id="txtDoctorAddress" class='required form-control' 

                            oninput=""
                         data-bind="value: DoctorAddress"/>
                        </div>
							</div>
                   </div>

                   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Doctors Email</label>
                        <input type="text" id="txtDoctorEmail" class='required form-control' 
                        onblur=" return ValidateMedEmail(this,true);"
                         data-bind="value: DoctorEmail"/>
                        </div>
                        </div>
</div>

				   <div class="row">
					   <div class="form-group">
                           <button id="btnAddMedical" class="btn btn-primary pull-right" data-bind="click: AddMedicalCondition">Add</button>
					   </div>
				   </div>

                   <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Problem</th>
                                    <th>Start Date</th>
                                    <th>Reason</th>
                                    <th>Doctor Name</th>
                                    <th>Doctor Contact No.</th>
                                    <th>Doctor Address</th>
                                    <th>Doctors Email</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: EmpMedicalAttrs">
                                <tr>
                                    <td data-bind="text: ProblemName"></td>
                                    <td data-bind="text: ProblemStart"></td>
                                    <td data-bind="text: ProblemReason"></td>
                                    <td data-bind="text: DoctorName"></td>
                                    <td data-bind="text: DoctorMobileNo"></td>
                                    <td data-bind="text: DoctorAddress"></td>
                                    <td data-bind="text: DoctorEmail"></td>
                                    <td>
                                    <a data-bind="click: $root.EditMedCondition"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteMedCondition"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

               </div>

               <div class="tab-pane" id="Language">
                  
				   <div class="row">
					    <div class="col-md-4">
						<div class="form-group">
							<label>Language <span class="red">*</span></label>
                        <select id="ddlLanguage" class="form-control select2" 
                                        data-bind='options: Languages, optionsText: "LanguageNameEng",
	optionsValue: $data, value: SelectedLanguage,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
						</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Reading</label>
                        <select id="ddlReading" class="form-control select2" 
                                        data-bind='options: Fluencies, optionsText: "FluencyName",
	optionsValue: "FluencyName", value: SelectedRFluency,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
                        <div class="col-md-4">
							<div class="form-group">
								<label>Writing</label>
                       <select id="ddlWriting" class="form-control select2" 
                                        data-bind='options: Fluencies, optionsText: "FluencyName",
	optionsValue: "FluencyName", value: SelectedWFluency,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
						</div>

				   <div class="row">
                        <div class="col-md-4">
							<div class="form-group">
								<label>Speaking</label>
                        <select id="ddlSpeaking" class="form-control select2" 
                                        data-bind='options: Fluencies, optionsText: "FluencyName",
	optionsValue: "FluencyName", value: SelectedSFluency,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							</div>
                         
					    <div class="col-md-4">
							 <div class="form-group">
								 <label>Listening</label>
                        <select id="ddlListening" class="form-control select2" 
                                        data-bind='options: Fluencies, optionsText: "FluencyName",
	optionsValue: "FluencyName", value: SelectedLFluency,
	optionsCaption: "------ Select one -------"'></select>
                        </div>
							 </div>

						<div class="col-md-4">
								 <div class="form-group">
									 <label>Mother Language
                        <input type="checkbox" id="Text41" data-bind="checked: IsMotherLanguage"/>
									</label>
                        </div>
                    </div>

			</div>
				   
				   <div class="row">
					   <div class="col-md-12">
                             <button id="btnAddLanguage" data-bind="click: AddLanguage" class="btn btn-primary pull-right">Add</button>
					   </div>
				   </div>
               
                    <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Language</th>
                                    <th>Reading</th>
                                    <th>Writing</th>
                                    <th>Speaking</th>
                                    <th>Listening</th>
                                    <th>Mother Language</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: PersonLanguages">
                                <tr>
                                    <td data-bind="text: Language().LanguageName"></td>
                                    <td data-bind="text: ReadingFluency"></td>
                                    <td data-bind="text: WritingFluency"></td>
                                    <td data-bind="text: SpeakingFluency"></td>
                                    <td data-bind="text: ListeningFluency"></td>
                                    <td data-bind="text: MotherLang">
                                   
                                    </td>
                                    <td>
                                    <a data-bind="click: $root.EditLanguage"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteLanguage"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>
				</div>

               <div class="tab-pane" id="Relative">
					     <div class="row">
                            <div class="col-md-4">
								<div class="form-group">
									<label>First Name <span class="red">*</span></label>
                            <input type="text" id="txtRFirstName" 
                                                    data-bind="value: RFirstName" class='required form-control' 

                                                    oninput=""
                                                     />
                            </div>
								</div>
                            <div class="col-md-4">
								<div class="form-group">
                       <label>Middle Name</label>
                            <input type="text" id="txtRMiddleName" 
                                                    data-bind="value: RMiddleName" class='required form-control' 

                                                    oninput=""
                                                     />
                            </div>
								</div>
                            <div class="col-md-4">
                            <div class="form-group">
								<label>Last Name <span class="red">*</span></label>
                            <input type="text" id="txtRLastName" 
                                                    data-bind="value: RLastName" class='required form-control' 

                                                    oninput=""
                                                     />
                            </div>
                         </div>
								</div>

                         <div class="row">
					            <div class="col-md-4">
                                <div class="form-group">
									<label>Relation <span class="red">*</span></label>
                                <select id="ddlRelation" class="form-control select2" 
                                                data-bind='options: RelationTypes, optionsText: "RelTypeNameEng",
	optionsValue: $data, value: SelectedRelationType,
	optionsCaption: "------ Select one -------"'></select>
									</div>
								</div>
                                
                                <div class="col-md-4">
									<div class="form-group">
                                        <label>Gender <span class="red">*</span></label> 
                                <div class="checkbox">
											
											<input type="radio" name="relGender" value="M" data-bind="checked: RelGender" class="minimal">&nbsp;Male
											<label></label>
											<input type="radio" name="relGender" value="F" data-bind="checked: RelGender" class="minimal">&nbsp;Female                                      
											<label></label>
											<input type="radio" name="relGender" value="O" data-bind="checked: RelGender" class="minimal">&nbsp;Others                                    

										</div>
                            </div>
								</div>

                                <div class="col-md-4">
                                <div class="form-group">
									<label>Birth Date <span class="red"></span></label>
                                <input type="text" id="txtRelDOB" class='required form-control' 
                            onkeypress="return isNumberKey(event)" maxlength="10"
                            onblur="return valFutureDate(this,'Y',true);"
                             placeholder="YYYY.MM.DD" 
                                 data-bind="value: RelDOB"/>
                                </div>
                                </div>
                           </div>

                         <div class="row wordlong">
                                							 
							   <div class="col-md-4">
									<div class="form-group">
										<label>Nominee</label>
                           
     <input type="checkbox" id="chkNominee" data-bind="checked: isNominee"/>
                              </div>
									</div>
										
							   <div class="col-md-4">
								   <div class="form-group">
                                    <button type="button" id="btnNominee" class="btn btn-primary" data-bind="enable: isNominee"  data-toggle="modal" data-target="#NomineeModal">Nominees Document</button>
                                </div>
								   </div>
                         
                           </div>

			<div class="row">
				<div class="col-md-12">
				<div class="form-group">
                   <button id="btnAddRelative" data-bind="click: AddRelative" class="btn btn-primary pull-right">Add</button>
				</div>
				</div>
			</div>
                  
				         <div class="row wordlong">
                        <div class="col-md-12">
                        <div class="table-responsive">
                        <table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
                                <tr>
                                    <th>Name</th>
                                    <th>Gender </th>
                                    <th>DOB</th>
                                    <th>Relation</th>
                                    <th>Nominee</th>
                                    <th>Action</th>
                                </tr>
                            
                            <tbody data-bind="foreach: PersonRelatives">
                                <tr>
                                    <td data-bind="text: Relative().FirstName"></td>
                                    <td data-bind="text: Relative().Gender"></td>
                                    <td data-bind="text: Relative().DOB"></td>
                                    <td data-bind="text: RelType().RelTypeName"></td>
                                    <td>
                                    <input type="checkbox" data-bind="checked: IsNominee" style="width: 50px;" disabled="disabled" />
                                    </td>
                                    <td>
                                    <a data-bind="click: $root.EditRelative"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                    <a data-bind="click: $root.DeleteRelative"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                     </div>

                </div>
             
                   
          </div>

              <!-- /.tab-pane -->
            </div>

			<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<button type="submit" class="btn btn-info" data-bind="click: SaveEmployeeRegistration">Save</button>
															<button type="submit" class="btn btn-default" data-bind="click: SubmitEmployeeRegistration">Submit</button>
															<button type="submit" class="btn btn-default" data-bind="click: ClearControls">Cancel</button>
														</div>
													</div>
												</div>
</div>
            <!-- /.tab-content -->
          </div>
		</div>
          <!-- nav-tabs-custom -->
        </div>
        <!-- /.col -->
	</section>

<%--PopUp Modal--%>

	<div id="NomineeModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true" style="opacity: 1 !important">
	<div class="modal-dialog-lg" role="document">
<section class="content">
				<div class="row pages">
					<!-- left column -->
					<div class="col-md-12">
						<!-- general form elements -->

						<!-- general form elements -->
						<div class="box box-primary">
							<div class="box-header with-border">
								<h3 class="box-title">Nominee Document</h3>
							</div>
							<!-- /.box-header -->

							  <div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  </div>
					<div class="box-body">

						<div class="row">
							<div class="col-md-4">
								<div class="form-group">
<label>Document Type <span class="red">*</span></label>
							
							<select id="ddlNDocType"   class="form-control select2" 
											data-bind='options: DocumentTypes, optionsText: "TypeNameEng",
	optionsValue: $data, value: SelectedNDocType,
	optionsCaption: "------ Select one -------"'></select>
							</div>
								</div>
							<div class="col-md-4">
								<div class="form-group">
									<label>Document No. <span class="red">*</span></label>
							<input type="text" id="txtNDocNo" class='required form-control' 
							 data-bind="value: NDocNo"/>
							</div>
								</div>
							<div class="col-md-4">
								<div class="form-group">
									<label>Issued By<span class="red">*</span></label>
							<input type="text" id="txtNDocIssuedBy" class='required form-control' 
	<%--                            onkeypress="UnicodeKeyPress(event,this);" 
								onkeyup="UnicodeKeyUp(event,this);" 
								onchange="UnicodeChange(event,this);" 
								onfocus="UnicodeFocus(event,this);" --%>
								oninput=""
							 data-bind="value: NDocIssuedBy"/>
							</div>
								</div>
						</div>


					   <div class="row">
							<div class="col-md-4">
								<div class="form-group">
									<label>Issued Date<span class="red">*</span></label>
							<input type="text" id="txtNDocDate" class='required form-control' 
								onkeypress="return isNumberKey(event)" maxlength="10"
								onblur="return valFutureDate(this,'Y',true);"
								 placeholder="YYYY.MM.DD" 
							 data-bind="value: NDocDate"/>
							</div>
								</div>
							<div class="col-md-4">
								<div class="form-group">
									<label>File</label>
							 <input id="UploadNDocFile" type="file" name="image" class="btn btn-default" />
							 </div>
								</div>
							 <div class="col-md-4">
								 <div class="form-group">
								<button id="btnAddNDocument" class="btn btn-primary pull-right" data-bind="click: AddNomDocument">Add</button>
							 </div>
								 </div>
					   </div>

					   <div class="row wordlong">
							<div class="col-md-12">
							<div class="table-responsive">
							<table class="table-bordered table-condensed table-striped sort col-lg-12">
                            
									<tr>
										<th>Document Type</th>
										<th>Document No.</th>
										<th>Issued By </th>
										<th>Issued Date</th>
										<th>File</th>
										<th>Action</th>
									</tr>
                            
								<tbody data-bind="foreach: NomineeDocuments">
									<tr>
										<td data-bind="text: DocType().TypeName"></td>
										<td data-bind="text: IssueNo"></td>
										<td data-bind="text: IssueBy"></td>
										<td data-bind="text: IssueDate"></td>
										<td>
										<img id="upNomDocImage" style="height:32px; width:32px;" data-bind="click: $root.previewNomDocImage, attr: { src: DocFile, data: DocFile }" class="DoCPReview" data-content="Preview Uploaded File!!!" />
										</td>
										<td>
										<a data-bind="click: $root.EditNomDocument"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
										<a data-bind="click: $root.DeleteNomDocument"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
										</td>
                                   
									</tr>
								</tbody>
							</table>
							</div>
							</div>
						 </div>
		  </div>
		  <div class="modal-footer">
		  </div>
		</div>
	  </div>
	</div>
	</section>
		</div>
		</div>
    <script src="../../JsLibrary/jquery.iframe-transport.js"></script>
    <script src="../../JsLibrary/jquery.ui.widget.js"></script>
    <script src="../../JsLibrary/jquery.fileupload.js"></script>
	<script src="../../Scripts/PIS/EmployeeRegistration.js"></script>
<%--    <script src="../../JsLibrary/EmployeeRegistration.js" type="text/javascript"></script>--%>
	

</asp:Content>
