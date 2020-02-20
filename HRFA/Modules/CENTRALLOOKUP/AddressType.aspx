<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="AddressType.aspx.cs" Inherits="IDS.Modules.CENTRALLOOKUP.AddressType" %>

	<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<!-- general form elements -->

    <!-- Main content -->
    <section class="content">
        <div class="row pages"> 
            <!-- left column -->
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Address Type Setup</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                        <div class="box-body">
						    <div class="row">
				<div class="col-md-6">
                        <div class="form-group">
                            <label>Address Type ID</label>
                            <input type="text" id="AddressTypeID" class="form-control"  data-bind="value: AddressTypeID" disabled="disabled" />
						</div>                  
                </div>
                <!-- /.row -->
            </div>
							<div class="row">
								<div class="col-md-6">
								<div class="form-group">
									<label>Address Type Name(In Devnagari)</label>
									 <input type="text" class="form-control"   id="AddressName" data-bind="value: AddressName" data-required="true"
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
									<label>Address Type Name<span class="red">*</span></label>
									<input  type="text" class="form-control" id="AddressNameEnglish" data-bind="value: AddressNameEnglish"/>
								</div>                  
							 </div>
							
							 </div>
							<div class="row">
				<div class="col-md-6">
                        <div class="form-group">
                                    <div class="checkbox">

                                        <label>
									 <input  id ="Status" type="checkbox" data-bind="checked: Status" checked ="checked"/>Is Active?
                                        </label>
                                    </div>
						</div>                  
                </div>
								<div class="col-md-6">
									 <label class="col-md-3 control-label" for="textinput" style="display: none">अवधि देखि <span class="red">*</span></label>
            <div class="col-md-2 padding-left-0">
              <input type="text" class="form-control" placeholder="YYYY.MM.DD"
                                    id="FromDate" data-bind="value: FromDate" maxlength="10"onkeypress="return isNumberKey(event)" onblur="return valFutureDate(this,'Y',true);" style="display: none"/>
            </div>
								</div>
                <!-- /.row -->
            </div>
							<div class="row">
							<!-- /.box-body -->
							<div class="col-md-6">
								                        <div class="form-group">

												<button type="submit" class="btn btn-info" data-bind="click: $root.AddAddressType">Add</button>
												<button type="submit" class="btn btn-default" data-bind="click: ClearControls">Cancel</button>
                            </div>
							</div>
							</div>
							<div class="row">

		<div class="col-md-12">
												                        <table data-bind="visible: true" border="0" class="table table-bordered table-striped">
                            <thead>
                                                           <tr>
                                <th>
                                    S.N
                                </th>
                                <th>
                                    Address Type Name(In Devnagari)
                                </th>
                                <th>
                                    Address Type Name
                                </th>
                                <th>
                                     Active
                                </th>
                                <%--<th style="display: none">
                                    अवधि देखि 
                                </th>--%>
                                <th>
                                Action
                                </th>
                            </tr>

                            </thead>
<tbody data-bind="foreach: AddressTypes">
                                <tr>
                                    <td>
                                        <span data-bind="text:($index() + 1)"></span><span data-bind="text: AddressTypeID" style="width: 100px;
                                            visibility: hidden;" /><span data-bind="text: Action" />
                                    </td>
                                    <td>
                                        <span data-bind="text: AddressName" style="width:120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: AddressNameEnglish" style="width:120px;"/>
                                    </td>
                                    <td>
                                        <input type="checkbox" data-bind="checked: Status" style="width: 50px;" disabled="disabled" />
                                    </td>
                                    <td style="display: none">
                                        <span data-bind="text: FromDate" style="width:70px;"/>
                                    </td>
                                    <td>
                                    
                                        <a data-bind="click: $root.EditAddressType">
                                        <span class="glyphicon glyphicon-edit" title="Edit" ></span></a>
                                        <a data-bind="click: $root.DeleteAddressType">
                                        <span class="glyphicon glyphicon-trash" title="Delete" ></span>
                                        </a>
                                    
                                    </td>
                                </tr>
                
                            </tbody>
                        </table>
				<button type="submit" class="btn btn-info pull-right" data-bind="click: SaveAddressType">Submit</button>


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

 <script src="../../Scripts/CENTRALLOOKUP/AddressType.js" type="text/javascript"></script>   
</asp:Content>
