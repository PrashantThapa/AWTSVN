<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="WorkScheduleReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.PortalReport.WorkScheduleReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="wrapper">
<div class="col-md-10">
<h3 class="margin-top-15 margin-left-25">Work Schedule Report</h3>
<form class="form-horizontal" runat="server" id="Form1" role="form">

   <div class="row">
              <div class="col-md-8"></div>  
<div class="col-md-3">
        <button class="btn btn-primary" data-bind="click:ViewReport">View Report</button> <button class="btn btn-primary" data-bind="click:Cancel">Cancel</button>
        
    </div>
    
    </div>
  
</form>
</div>
</div>
    <script src="../../../Scripts/REPORTING/PortalReport/WorkScheduleReport.js" type="text/javascript"></script>
</asp:Content>
