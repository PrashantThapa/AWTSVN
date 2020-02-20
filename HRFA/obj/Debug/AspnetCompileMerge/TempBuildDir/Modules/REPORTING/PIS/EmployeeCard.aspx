<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeeCard.aspx.cs" Inherits="HRFA.Modules.REPORTING.PIS.EmployeeCard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="wrapper">
    <div class="container">
    <div class="col-md-12">
    <h3 class="margin-top-15 margin-left-25">कर्मचारीको कार्ड</h3>
        <form class="form-horizontal" runat="server" id="Form1" role="form">
            <div class="row">
                <div class="col-md-1">
                    संकेत नं 
                </div>
                <div class="col-md-2">
                    <input type="text" id="txtSymbolNo" 
                            data-bind="value:SymbolNo" class='required form-control' 
                             />
                </div>
                <div class="col-md-3">
            <button type="button" class="btn btn-primary" data-bind="click:ViewReportEmployeeCard">
                        View Report</button> <button class="btn btn-primary" data-bind="click:Cancel">Cancel</button>
             </div>
            </div>
        </form> 
            </div>
            </div>
            </div>
    <script src="../../../Scripts/REPORTING/PIS/EmployeeCardReport.js" type="text/javascript"></script>
</asp:Content>
