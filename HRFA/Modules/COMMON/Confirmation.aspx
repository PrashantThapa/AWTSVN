<%@ Page Title="" Language="C#" MasterPageFile="~/PortalMaster.Master" AutoEventWireup="true" CodeBehind="Confirmation.aspx.cs" Inherits="IDS.Modules.COMMON.Confirmation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


<%--Region### Confirmation region for getting Collection form --%>  
<section class="content modal fade" id="DisplayConfirmForm" >
<div class="modal-dialog" style="width:30%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" style="width:80px;" data-dismiss="modal" data-bind="click: $root.Cancel">&times;</button>
                <h4 class="modal-title">Do you have submission No?</h4>
            </div>
            <div class="modal-body">                
                <div class="row">
                <div class="col-lg-12">
                    <button class="icon-ok" style="float:left" data-bind="click: $root.YesBtnClicked">Yes</button>
                    <button class="icon-ok"  style="float:right" data-bind="click :  $root.GetSubmissionNo"> GetSubNo</button>      
                </div>
            </div>
            </div>
            <div class="modal-footer">                  
                <span data-bind="visible : $root.SubmissionEntryBoxDisplay"><input data-bind="value : $root.SubmissionEntryBox" />
                    <button class="icon-save" style="float:right" data-bind="click: $root.SubmitSubmissionNo">Submit</button></span>    
                <span data-bind="visible : $root.SubmissionNoDisplay">
                    Please note down Submission no:&nbsp<strong data-bind="text: $root.SubmissionNo"></strong>
                    <button class="icon-ok"  style="float:right;" data-bind="click: $root.Ok">OK</button>
                </span> 
                
            </div>

        </div>
    </div>
	</section>
<%--End of Region### Confirmation region for getting Collection form --%>


</asp:Content>