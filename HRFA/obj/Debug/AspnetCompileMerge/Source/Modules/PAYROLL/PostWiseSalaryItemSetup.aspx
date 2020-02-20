<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true"
    CodeBehind="PostWiseSalaryItemSetup.aspx.cs" Inherits="HRFA.Modules.PAYROLL.PostWiseSalaryItemSetup" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!--<style>table span{ margin-left:8px;}</style>-->
    <div class="wrapper">
        <div class="col-md-12">
            <h3 class="margin-top-15 margin-left-25">
                कर्मचारीको Level अनुसार तलब सूची सेट अप</h3>
            <form class="form-horizontal" runat="server" id="Form1" role="form">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-3">
                        <h4>
                            कार्यालय <span class="mandatory">*</span></h4>
                        <select id="lstOffice" class="form-control" style="min-height: 270px; width: 100%;"
                            multiple="multiple" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',optionsValue:$data, value: SelectedOffice,event:{ change: GetPost }">
                        </select>
                    </div>
                    <div class="col-md-4">
                        <h4>
                            पद <span class="mandatory">*</span></h4>
                        <select id="Select2" class="form-control" style="min-height: 270px; width: 100%;"
                            multiple="multiple" data-bind="options:PostsLST, optionsText:'PostDesc', optionsValue:$data,optionsCaption:'----छान्नुहोस----', value: SelectedPost,event:{ change: GetSalary }">
                        </select>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-3 ">
                        <h4>
                            तलब सूची <span class="mandatory">*</span></h4>
                        <div class="col-md-12 margin-left-0 dropdown one-seventy">
                            <select id="ddlselect" class="dropdown-select   dropdown one-seventy" data-bind="options:SalaryItems, optionsText:'SalaryItemDesc',optionsCaption:'----छान्नुहोस----', optionsValue: $data, value: SelectedSalaryItem,event:{ change: GMode }">
                            </select></div>
                        <%--<h4>मोड <span class="mandatory">*</span></h4>
                               <div class="col-md-12 margin-left-0 dropdown one-seventy">
                      <select id="txtMode" class="dropdown-select"
                                 data-bind="options:Modes, optionsText:'ModeDesc',optionsCaption:'------छान्नुहोस्-------', optionsValue: $data, value: SelectedMode,event:{ change: Funct}">
                            </select></div>--%>
                        <%--<table id="tbl" style=" background:#fff; height:270px; border:1px solid #ccc; overflow:auto;" class="form-control">
                            
                                
                                <tbody data-bind="foreach: SalaryItems">
                                            <tr class="warning">
                                                <td class="hidden">
                                                    <span data-bind="text: SalaryItemID"></span>
                                                    
                                                </td>
                                                
                                                <td>
                                                    <input class="chk" type="checkbox" data-bind="event:{ change: $root.ToggletoADD}, checked:makecheck"/>
                                                </td>
                                                 <td>
                                                   <span class="margin-left-15" data-bind="text: SalaryItemDesc"></span>
                                                    
                                                </td>
                                               
                                            </tr>
                                        </tbody>
                                </table>--%>
                    </div>
                    <div class="col-md-3" id="toggle">
                        <h4>
                            गणना प्रकार <span class="mandatory">*</span></h4>
                        <div class="col-md-12 margin-left-0 dropdown one-seventy">
                            <select id="Select1" class="dropdown-select" data-bind="options:Funcs, optionsText:'FunDesc',optionsCaption:'------छान्नुहोस्-------', optionsValue: $data, value: SelectedFun">
                            </select></div>
                        <button class="btn btn-warning" data-bind="click:Calculate">
                            Calculate</button>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="col-md-2">
                        <h4>
                            रकम <span class="mandatory">*</span></h4>
                        <input type="text" class="form-control" id="txtAmount" data-bind="value:Amount" onkeypress="return isNumberKey(event)" />
                        <%-- ,attr:{'disabled':isDisabled}--%>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-2 pull-right">
                        <button class="btn btn-primary" id="AddBtn" data-bind="click:Add">
                            Add</button>
                        <button class="btn btn-primary" data-bind="click:ClearControls">
                            Cancel</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row margin-top-100">
                    <div class="col-lg-12">
                        <div class="table-responsive">
                            <table style="width: 100%;" data-bind="visible: true" border="0" class="dataTable table table-bordered table-condensed  sort margin-top-45">
                                <tr>
                                    <th>
                                        क्र. स.
                                    </th>
                                    <th>
                                        कार्यालय
                                    </th>
                                    <th>
                                        पद
                                    </th>
                                    <th>
                                        तलब सूची
                                    </th>
                                    <th class="hidden">
                                        मोड
                                    </th>
                                    <%-- <th>
                                   गणना प्रकार 
                                </th>--%>
                                    <th>
                                        रकम
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                                <tbody data-bind="foreach: PostWiseLsts">
                                    <tr>
                                        <td>
                                            <span data-bind="text:($index() + 1)"></span>
                                            <span data-bind="text: Office().OfficeCode" style="width: 100px; visibility: hidden" />
                                            <span data-bind="text: Post().PostID" style="width: 100px; visibility: hidden" />
                                            <span data-bind="text: SalaryItem().SalaryItemID" style="width: 100px; visibility: hidden" />
                                            <span data-bind="text: Mode().ModeID" style="width: 100px; visibility: hidden" />
                                            <span data-bind="text: Fun().FunID" style="width: 100px; visibility: hidden" />
                                        </td>
                                        <td>
                                            <span data-bind="text: Office().OfficeNameNep" style="width: 120px;" />
                                        </td>
                                        <td>
                                            <span data-bind="text: Post().PostDesc" style="width: 120px;" />
                                        </td>
                                        <td>
                                            <span data-bind="text: SalaryItem().SalaryItemDesc" style="width: 120px;" />
                                        </td>
                                        <td class="hidden">
                                            <span data-bind="text: Mode().ModeDesc" style="width: 120px;" />
                                        </td>
                                        <%-- <td>
                                        <span data-bind="text: Fun().FunDesc" style="width:120px;" />
                                    </td>--%>
                                        <td>
                                            <span data-bind="text: Amount" style="width: 120px;" />
                                        </td>
                                        <td>
                                            <a data-bind="click: $root.Edit" id="edit"><span class="glyphicon glyphicon-edit"
                                                title="Edit" ></span></a><a data-bind="click: $root.Delete" id="delete">
                                                    <span class="glyphicon glyphicon-trash" title="Delete" rel="tooltip"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 margin-top-35">
                    <div class="col-md-3 pull-right">
                        <button class="btn btn-primary" data-bind="click:SavePostWiseSalaryItemSetup">
                            Submit</button>
                        <button class="btn btn-primary" data-bind="click:ClearControls">
                            Cancel</button>
                    </div>
                </div>
            </div>
            <div class="row margin-top-25">
                <div class="col-md-7">
                </div>
                <div class="col-md-5">
                </div>
            </form>
        </div>
    </div>
    <script src="../../Scripts/PAYROLL/PostWiseSalaryItemSetup.js" type="text/javascript"></script>
</asp:Content>
