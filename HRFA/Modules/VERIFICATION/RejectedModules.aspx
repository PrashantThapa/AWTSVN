<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="RejectedModules.aspx.cs" Inherits="HRFA.Modules.VERIFICATION.RejectedModules" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="wrapper">
        <fieldset class="col-md-12">
            <legend>Rejected List</legend>
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="height: 40px;">
                            <p>Transactions</p>
                        </div>
                        <div class="panel-body">
                        
                                <div style="clear: left">
                                </div>
                            <div class="col-md-12">
                                <table border="0" class="table table-bordered fixed-header resizable" id="tblModule">
                                    <thead>
                                        <tr>
                                            <th style="display:none;">
                                                ApplicationID
                                            </th>
                                            <th style="display:none;">
                                                ModuleID
                                            </th>
                                            <th>
                                                Module Description
                                            </th>
                                            <th>
                                                Tran No.
                                            </th>
                                            <th>
                                                Reason
                                            </th>
                                            <th style="text-align: center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody data-bind="foreach: LoadModuleTranLST()">
                                        <tr>
                                            <td style="width: 10%; display:none;">
                                                <span data-bind="text:ApplicationID"></span>
                                            </td>
                                            <td style="width: 10%;display:none;">
                                                <span data-bind="text:ModuleID"></span>
                                            </td>
                                            <td style="width: 30%;">
                                                <span data-bind="text:ModuleDesc"></span>
                                            </td>
                                            <td style="width: 20%;">
                                                <span data-bind="text:TranNo"></span>
                                            </td>
                                            <td style="width: 40%;">
                                                <span data-bind="text:Reason"></span>
                                            </td>
                                            <td style="text-align: center; width:10%;">
                                            <span class="glyphicon glyphicon-edit" data-bind="click: $root.GetApplicationByTranNumber"
                                                    data-content="Select Application Module!!!" onload="HoverTransaction()" aria-hidden="true"></span>
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
        
        
    </div>

    <script src="../../Scripts/VERIFICATION/RejectedModules.js" type="text/javascript"></script>
</asp:Content>
