<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="DocumentType.aspx.cs" Inherits="IDS.Modules.CENTRALLOOKUP.DocumentType" %>
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
						<h3 class="box-title">Document Type Setup </h3>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form">
						<div class="box-body">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Document Type Id </label>
										<input type="text" id="TypeID" class="form-control" data-bind="value: TypeID" disabled="disabled" />
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Document Type Name(In Devnagari)</label>
										<input type="text"  class="form-control" id="TypeName" data-bind="value: TypeName" data-required="true"
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
										<label>Document Type Name<span class="red">*</span></label>
										<input type="text" class="form-control" id="TypeNameEng" data-bind="value: TypeNameEng" />
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>For </label>
										<div class="checkbox">
										<input id="rdPerson" type="radio" checked="checked" value="Person" data-bind="checked: IsUsed" name= "usedforGroup" class="minimal"/> Person
										<label>
										<input id="rdEntity" type="radio" data-bind="checked: IsUsed" value="Entity" name= "usedforGroup" class="minimal"/> Institution
										</label>
										</div>
									</div>
								</div>
								<!-- /.row -->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<div class="checkbox">

											<label>
												<input id="Status" type="checkbox" data-bind="checked: Status" checked="checked" />Status
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

										<button type="submit" class="btn btn-info" data-bind="click: $root.AddDocumentType">Add</button>
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
                            Document Type Name(In Devnagari)
                        </th>
                        <th>
                            Document Type Name 
                        </th>
                        <th>
                            For 
                        </th>
                        <th>
                            Status
                        </th>
                        <th style="display: none">
                            अवधि देखि 
                        </th>
                        <th>
                        Action
                        </th>
                    </tr>
                    <tbody data-bind="foreach: DocumentTypes">
                        <tr>
                            <!--<td>
                                <span data-bind="text: TypeID" style="width:100px;" />
                            </td>-->
                            <td>
                                <span data-bind="text:($index() + 1)"></span><span data-bind="text: TypeID" style="width: 100px;
                                    visibility: hidden" /><span data-bind="text: Action" />
                            </td>
                            <td>
                                <span data-bind="text: TypeName" style="width:120px;" />
                            </td>
                            <td>
                                <span data-bind="text: TypeNameEng" style="width:120px;"/>
                            </td>
                            <td>
                                <span data-bind="text: UsedFor" style="width:100px;"/>
                             </td>
                            <td>
                                <input type="checkbox" data-bind="checked: Status" style="width: 50px;" disabled="disabled" />
                            </td>
                            <td style="display: none">
                                <span data-bind="text: FromDate" style="width:70px;"/>
                            </td>
                            <td>
                           
                                <a data-bind="click: $root.EditDocument"><span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                <a data-bind="click: $root.DeleteDocument"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                                   
                            </td>
                        </tr>
                
                    </tbody>
            
									</table>
									<button type="submit" class="btn btn-info pull-right" data-bind="click: SaveDocumentType">Submit</button>


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

<script src="../../Scripts/CENTRALLOOKUP/DocumentTypeModel.js" type="text/javascript"></script>
</asp:Content>