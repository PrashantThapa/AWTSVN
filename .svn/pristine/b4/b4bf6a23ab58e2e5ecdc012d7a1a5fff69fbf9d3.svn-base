<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="Appraisal.aspx.cs" Inherits="HRFA.Modules.PIS.Appraisal" %>

<%@ Register Src="EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" />
    <section class="content" id="AppraisalForm">
        <div class="row pages">
            <!-- left column -->
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Employee Appraisal</h3>
                    </div>
                    <div class="">
                        <asp:HyperLink ID="setupAppraisals" NavigateUrl="SetupAppraisals.aspx" runat="server">Setup Appraisals</asp:HyperLink>
                    </div>
                    <!-- /.box-header -->
                    <form role="form" runat="server" id="Form1">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label>Employee Name<span class="red">*</span> </label>
                                        <input type="text" id="txtEmployeeName" data-bind="value: EmployeeName" class='required form-control' disabled />
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <div class="form-group wordlong">
                                        <button type="button" id="btnSearch" class="btn btn-warning search" data-toggle="modal"
                                            data-target="#modalEmpSearch" data-thissource="employee">
                                            Search</button>
                                    </div>
                                </div>
                                <!-- /.row -->
                            </div>

                            <div class="row">

                                <div class="col-md-12">
                                    <table data-bind="visible: true" border="0" class="table table-bordered table-striped">
                                        <tr>
                                            <th>Office Name
                                            </th>
                                            <th>Employee Name
                                            </th>
                                            <th>Post
                                            </th>
                                        </tr>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span data-bind="text: OfficeNameNep" />
                                                </td>
                                                <td>
                                                    <span data-bind="text: GridEmpName" />
                                                </td>
                                                <td>
                                                    <span data-bind="text: PostName" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="row">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Total Points</th>
                                            <th>Input Points</th>
                                        </tr>
                                    </thead>
                                    <tbody data-bind="foreach: AppraisalCategories">
                                        <tr>
                                            <td data-bind="text: name"></td>
                                            <td data-bind="text: points"></td>
                                            <td>
                                                <input type="number" data-bind="value: givenPoints, attr: { max: points, min: 0 }" class="form-control" onkeypress="return isNumberKey(event)" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Appraisal Date</label>
                                        <input type="text" id="txtAppraisalDate" placeholder="YYYY.MM.DD" data-bind="value: AppraisalDate"
                                            class='required form-control' onkeypress="return isNumberKey(event)" onblur="return valFutureDate(this,'N',true);"
                                            <%--onkeypress="UnicodeKeyPress(event,this);" onkeyup="UnicodeKeyUp(event,this);"
                                onchange="UnicodeChange(event,this);" onfocus="UnicodeFocus(event,this);" --%> />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Remarks<span class="red">*</span>  </label>
                                        <textarea name="textarea"
                                            class='required form-control'
                                            <%--                        onkeypress="UnicodeKeyPress(event,this);" 
                            onkeyup="UnicodeKeyUp(event,this);" 
                            onchange="UnicodeChange(event,this);" 
                            onfocus="UnicodeFocus(event,this);"--%>
                                            oninput=""
                                            id="txtRemarks" data-bind="value: Remarks"></textarea>

                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group wordlong">
                                        <button class="btn btn-info" id="btnRetirementSave" data-bind="click: SaveAppraisal">Submit</button>
                                        <button class="btn btn-default" id="btnRetirementCancel" data-bind="click: CancelAppraisal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </section>

    <script src="../../Scripts/PIS/Appraisal.js" type="text/javascript"></script>
</asp:Content>
