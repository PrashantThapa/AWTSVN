<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="ScheduleAccountReport.aspx.cs" Inherits="HRFA.Modules.REPORTING.ACCOUNT.ScheduleAccountReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="container wrapper">
        <div class="col-md-12">
            <h3 class=" margin-top-15 margin-left-25">
               Schedule Account Report</h3>
            <form class="form-horizontal" role="form">

            <div class="row" style="display:none">
                <div class="col-md-2">
                    Office <span class="mandatory">*</span>
                </div>
                <div class="col-md-4">
                    <div class="dropdown margin-left-0" style="width: 100%;">
                        <select id="lstOffice" class="dropdown-select" data-bind="options:Offices, optionsText:'OfficeNameNep',optionsCaption:'------छान्नुहोस्-------',
                                    optionsValue:$data,value: SelectedOffice">
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    Schedule Name <span class="mandatory">*</span>
                </div>
                <div class="col-md-4">
                    <div class="dropdown margin-left-0" style="width: 100%;">
                        <select id="Select8" class="dropdown-select" data-bind="options:Schedules, optionsText:'ScheduleName',optionsCaption:'------छान्नुहोस्-------',
                                    optionsValue:$data,value: SelectedSchedule">
                        </select>
                    </div>
                </div>
            </div>
   
<div class="col-md-2"align="left">
Up To Date<span class="mandatory">*</span>
</div>
 <div  class="col-md-2 ">
         
        <input type="text" id="txtToDate" onkeypress="return isNumberKey(event)" placeholder="YYYY.MM.DD"
                            onfocus="UnicodeFocus(event,this);" onblur="return valFutureDate(this,'Y',true);" class="form-control"
                             data-bind='value: ToDate' 
                            
                        />
                   
                </div>
                
        <div class="row">
            <div class="col-md-3 pull-right">

                <button id="btnPrint" class="btn btn-primary" data-bind="click:PrintScheduleAccountReport">
                    Print</button>
                <button id="btnCancel" class="btn btn-primary" data-bind="click: CleaRPRintControls">
                    Cancel</button>
            </div>
            <div class="col-md-9">
            </div>
        </div>

        <br />
        <div class="clear"></div>
   </form>
    </div>
    <script src="../../../Scripts/REPORTING/ACCOUNT/ScheduleAccountReport.js" type="text/javascript"></script>
</asp:Content>
