<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Language.aspx.cs" Inherits="HRFA.Modules.CENTRALLOOKUP.Language" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
						<h3 class="box-title">Language Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Language Id </label>
										<input type="text" id="LanguageID" class="form-control"  data-bind="value: LanguageID" disabled="disabled" />
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Language(In Devnagari) </label>
										<input type="text" class="form-control"   id="LanguageName" data-bind="value: LanguageName" data-required="true"
<%--            onkeypress="UnicodeKeyPress(event,this);" 
            onkeyup="UnicodeKeyUp(event,this);" 
            onchange="UnicodeChange(event,this);" 
            onfocus="UnicodeFocus(event,this);" --%>
            oninput="convert_to_unicode(this)"
             />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Language <span class="red">*</span></label>
										<input  type="text" class="form-control" id="LanguageNameEng" data-bind="value: LanguageNameEng"/>
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<div class="checkbox">

											<label>
												<input id="Status" type="checkbox" data-bind="event:{ change: ToggletoADD}, checked:makecheck" />Status
											</label>
										</div>
									</div>
								</div>
								<!-- /.row -->
							</div>

							<div class="row">
								<!-- /.box-body -->
								<div class="col-md-6">
									<div class="form-group">

										<button type="submit" class="btn btn-info" data-bind="click: $root.AddLanguage">Add</button>
										<button type="submit" class="btn btn-default" data-bind="click: ClearControls">Cancel</button>
									</div>
								</div>
							</div>
							<div class="row">

								<div class="col-md-12">
									<table data-bind="visible: true" border="0" class="table table-bordered table-striped">
										  <tr>
                                <th>
                                  S.N.
                                </th>
                                <th>
                                    Language(In Devnagari)
                                </th>
                                <th>
                                    Language
                                </th>
                                <th>
                                    Status
                                </th>
                                <th style="display: none">
                                    सुरू मिति
                                </th>
                                <th>Action</th>
                            </tr>
                            <tbody data-bind="foreach: Languages">
                                <tr>
                                    <td>
                                        <span data-bind="text:($index() + 1)"></span><span data-bind="text: LanguageID" style="width: 100px;
                                            visibility: hidden" /><span data-bind="text: Action" style="width: 100px; visibility: hidden" />
                                    </td>
                                    <td>
                                        <span data-bind="text: LanguageName" style="width:120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: LanguageNameEng" style="width:120px;"/>
                                    </td>
                                    <td>
                                    <span data-bind="text: Status" style="width:120px;"/>
                                       <%-- <input type="checkbox" data-bind="checked: makecheck" style="width: 50px;" disabled="disabled" />--%>
                                    </td>
                                    <td style="display: none">
                                        <span data-bind="text: FromDate" style="width:70px;"/>
                                    </td>
                                    <td>
                                    
                                        <a data-bind="click: $root.EditLanguage"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
									    <a data-bind="click: $root.DeleteLanguage"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                    
                                    </td>
                                </tr>
                
                            </tbody>
            
            
									</table>
									<button type="submit" class="btn btn-info pull-right" data-bind="click: SaveLanguage">Submit</button>


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

 <script src="../../Scripts/CENTRALLOOKUP/Language.js" type="text/javascript"></script>   
</asp:Content>