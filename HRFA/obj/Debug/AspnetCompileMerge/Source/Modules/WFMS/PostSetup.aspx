﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="PostSetup.aspx.cs" Inherits="HRFA.Modules.WFMS.PostSetup" %>

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
                        <h3 class="box-title"><i class="fa fa-male"></i>&nbsp;Post Setup</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Post</label>
                                        <select id="lstPost" multiple class="form-control" style="min-height: 270px; width: 100%;"
                                            data-bind="options: Posts, optionsText: function (item) {
                                                return ko.unwrap(item.PostDesc)
                                                }, optionsValue: $data, optionsCaption: '------Select Post-------',
                                                value: SelectedPost, event: { change: GetPostDetails }">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Post's Name <span class="red">*</span></label>
                                                <input type="text" id="txtPostName" data-bind="value: PostDesc" class='required form-control' />
                                            </div>
                                        </div>
                                    </div>

                              

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Office<span class="red">*</span></label>
                                                <select id="" class="form-control select2"
                                                    data-bind='options: Offices, optionsText: "OfficeNameNep",
                                                        optionsValue: "OfficeCode", value: SelectedOffice,
                                                        optionsCaption: "----Select Office-------", event: { change: GetDepartment }'>
                                                </select>
                                            </div>
                                        </div>
<%--                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Department</label>
                                                <select id="ddlDepartment" class="form-control select2"
                                                    data-bind='options: Departments, optionsText: "DeptDesc",
                                                        optionsValue: "DeptID", value: SelectedDepartment,
                                                        optionsCaption: "----Select Department-------"'>
                                                </select>
                                            </div>
                                        </div>--%>
                                    </div>
                              
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Level<span class="red">*</span></label>
                                                <select id="ddlLevel" class="form-control select2"
                                                    data-bind='options: availableLevels,value: SelectedLevel,
                                                    optionsCaption: "----Select Level-------"'>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Status <span class="red">*</span></label>
                                                <div class="checkbox">
                                                    <input type="radio" name="Taxable" value="A" data-bind="checked: Status" class="minimal" />&nbsp;Active
												<label></label>
                                                    <input type="radio" name="Taxable" value="I" data-bind="checked: Status" class="minimal" />&nbsp;Inactive																	
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-info" id="btnSave" data-bind="click: SavePost, text: SaveButtonText" />
                                                <button type="submit" class="btn btn-danger" id="btnDelete" data-bind="click: DeletePost">Delete</button>
                                                <button type="submit" class="btn btn-default" id="btnCancel" data-bind="click: ClearPost">Cancel</button>
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
    <script src="../../Scripts/COMMON/Post.js" type="text/javascript"></script>
</asp:Content>


