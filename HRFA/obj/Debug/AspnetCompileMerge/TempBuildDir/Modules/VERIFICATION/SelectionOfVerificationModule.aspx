<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SelectionOfVerificationModule.aspx.cs" Inherits="IDS.Modules.VERIFICATION.SelectionOfVerificationModule1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div class="wrapper">
    <div class="col-md-12">
    <h3 class="margin-top-15 margin-left-25">Application List</h3>

    <form class="form-horizontal" role="form">

          <!-- Text input-->
          <div class="col-md-3 margin-bottom-0">


                             <h4 class="text-left">Application</h4>

<select style="height:340px;" class="col-md-12 bdr" multiple="multiple" data-bind="optionsCaption:'------छान्नुहोस्-------',options:LoadApplicationLst, optionsText:'ApplicationDescription', optionsValue: 'ApplicationID',value:selectedApplication,event:{change:$data.GetModule}" 
                        name="D1">
                        </select>

            
            
            
            
            
          </div>
          
          <div class="col-md-3 margin-bottom-0">

          
                        <h4 class="text-left">Available Module</h4>

                    <select style="width:228px;height:340px;" class="bdr" multiple="multiple"  
                        data-bind="optionsCaption:'------छान्नुहोस्-------',options:ModulesLst, optionsText:'ModuleDesc', optionsValue: 'ModuleID',value:selectedModule,event:{change:$data.GetVMDetails}" 
                        name="D1">
                    </select>
          </div>

<div class="col-md-6">
<h4 class="text-left">Attributes Setup</h4>

<div class="table-responsive">
<table class="table table-bordered table-hover table-sortable">
<thead>
  <tr>
    <td valign="middle" class="text-center">Verification Level</td>
    <td><input type ="text" class="form-control margin-bottom-0" Placeholder = "Number Only" onkeypress="return isNumberKey(event)" data-bind="value:LevelOfVerification" /></td></tr>
  <tr>
    <td valign="middle" class="text-center">From Date</td>
    <td><input type ="text" class="form-control margin-bottom-0" Placeholder = "YYYY.MM.DD" onkeypress="return isNumberKey(event)" onblur="return valFutureDate(this,'Y',true);" data-bind="value:FromDate" /></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td><button class="btn btn-primary btn-md" data-bind="click: $root.Add">Add </button></td>
  </tr>
  </thead>
</table>
</div>

                        <h4 class="text-left">Selection of Verification Module Details</h4>

                        <table class="table table-bordered table-fixed-header resizable" id="tblVerificationModule">
                        <thead>
                            <tr>
                                <th>Application</th>
                                <th>Module</th>
                                <th>From Date</th>
                                <th>Level of Verification</th>
                               <%-- <th>Action</th>--%>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: DetailLst">
                            <tr>
                                <td> 
                                <span data-bind="text:ApplicationID" ></span>                                  
                                </td>
                            <td>
                                <span data-bind="text:ModuleID" ></span>                                     
                            </td> 
                            <td>
                                <span data-bind="text:FromDate" ></span>                                     
                            </td> 
                            <td>
                                <span data-bind="text:LevelOfVerification" ></span>                                     
                            </td> 
                           <%-- <td>
                            <a data-bind="click: $parent.Delete"><span class="glyphicon glyphicon-trash" title="Delete" ></span></a>
                            </td>--%>
                        </tr>
                        </tbody>
                    </table>
                    <div class="row margin-top-15">
                    <div class="col-md-5 pull-right">
                    <button class="btn btn-primary btn-md" data-bind="click: Save">Submit </button>
                  &nbsp;&nbsp;&nbsp;
                  <button class="btn btn-primary btn-md" data-bind="click: ClearControls">Cancel </button>
</div></div>
                    
                    
            </div>

       <div class="clear"></div>
      </form>
      </div>
    </div>
    <script src="/Scripts/VERIFICATION/SelectionOfVerificationModule.js" type="text/javascript"></script>
    <script src="/JsLibrary/jquery.stickytableheaders.min.js" type="text/javascript"></script>
    <script src="/JsLibrary/resizable-tables.js" type="text/javascript"></script>
    <script type="text/javascript">
        $("#tblVerificationModule").stickyTableHeaders();
    </script>
</asp:Content>
