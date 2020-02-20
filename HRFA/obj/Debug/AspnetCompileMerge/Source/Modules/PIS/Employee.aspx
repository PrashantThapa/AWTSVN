﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Employee.aspx.cs" Inherits="HRFA.Modules.PIS.Employee" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

	<section class="content">
		<div class="row pages">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">Employee List</h3>
					</div>
					<!-- /.box-header -->

						<div class="box-body">
   
                    <div style="text-align: right; padding-bottom: 10px;">
                        <button id="btnEmpDetails" class="btn btn-primary update" data-bind="click: AddEmployee">Add New Employee</button>
                    </div>
                    
                            <div class="table-responsive">
                        <input type="search" class="form-control" placeholder="search" data-bind="value: filter, valueUpdate: 'afterkeydown'" />
                        <table style="width: 100%;" data-bind="visible: true" border="0" class="dataTable table table-bordered table-condensed  sort">
                            <tr>
                                <th>S No.
                                </th>
                                <th>Symbol No.
                                </th>
                                <th>Name 
                                </th>
                                <th>Gender
                                </th>
                                <th>Marital Status  
                                </th>
                                <th>D.O.B.  
                                </th>
                                <th>Post 
                                </th>
                                <th>Office 
                                </th>
                                <th>Status
                                </th>
                                <th>Action
                                </th>
                            </tr>
                            <tbody data-bind="foreach: filteredItems">
                                <tr>
                                    <td>
                                        <span data-bind="text:($index() + 1)"></span>
                                    </td>

                                    <td>
                                        <span data-bind="text: SymbolNo" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: NameEnglish" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: Gender" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: MStatus" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: Dob" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: PostDesc" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <span data-bind="text: OfficeName" style="width: 120px;" />
                                    </td>
                                   
                                    <td>
                                        <span data-bind="text: Status" style="width: 120px;" />
                                    </td>
                                    <td>
                                        <a data-bind="click: $root.EditEmployee" style="cursor: pointer;"><span class="glyphicon glyphicon-edit" title="Edit"></span></a>
                                        <a data-bind="click: $root.DeleteEmployee" style="pointer-events: none"><span class="glyphicon glyphicon-trash" title="Delete"></span></a>

                                    </td>

                                </tr>

                            </tbody>
                        </table>

                     
                            </div>
                          

                            <div id="smart-paginator" > </div>
                            </div>

                    </div>
                </div>
            </div>
        </section>

                        

    <script src="../../Scripts/PIS/EmployeeList.js" type="text/javascript"></script>
    <script src="../../JsLibrary/smartpaginator.js" type="text/javascript"></script>
    <link href="../../Styles/COMMON/smartpaginator.css" rel="stylesheet" />
    
    <script type="text/javascript">
        $(document).ready(function () {
            $('#smart-paginator').smartpaginator({
                totalrecords: newValue,
                recordsperpage: 10,
                initval: 1,
                next: 'Next',
                prev: 'Prev',
                first: 'First',
                last: 'Last',
                theme: 'green',
                onchange: onChange
            });

            function onChange(newPageValue) {
                alert(newPageValue);
            }
        })
    </script>
</asp:Content>