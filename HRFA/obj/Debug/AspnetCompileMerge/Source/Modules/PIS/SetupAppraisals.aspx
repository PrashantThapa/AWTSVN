<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SetupAppraisals.aspx.cs" Inherits="HRFA.Modules.PIS.SetupAppraisals" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content" id="AwardForm">
        <div class="row pages">
            <!-- left column -->
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary">

                    <div class="box-header with-border">
                        <h2 class="box-title">Setup Appraisals</h2>
                        <h3>All Active Appraisal Categories</h3>
                        <a href="#" id="apprLink">Add Appraisal </a>| <a href="#">View Inactive categories</a>
                        <div id="hideable" style="display: none;">
                            <h4>Add Appraisal Category</h4>
                            <form class="form-group" id="AppraisalForm">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="CategoryName">Name</label>
                                        <input type="text" class="form-control" id="CategoryName" data-bind="value: ChangableCategory().name " />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="CategoryPoints">Points</label>
                                        <input type="number" class="form-control" id="CategoryPoints" data-bind="value: ChangableCategory().points" />
                                    </div>
                                </div>
                                <button id="save" class="btn btn-info" style="margin-top: 5px;" data-bind="click: SaveCategory">Save</button>
                                <button id="cancel" class="btn btn-danger" style="margin-top: 5px;">Cancel</button>
                            </form>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Total Point</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Discipline</td>
                                    <td>5</td>
                                    <td>
                                        <a href="#">Edit</a> |
                                        <a href="#">Inactivate</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Communication</td>
                                    <td>5</td>
                                    <td>
                                        <a href="#">Edit</a> |
                                        <a href="#">Inactivate</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Knowledge</td>
                                    <td>5</td>
                                    <td>
                                        <a href="#">Edit</a> |
                                        <a href="#">Inactivate</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <script src="../../Scripts/PIS/Appraisal.js" type="text/javascript"></script>
</asp:Content>
