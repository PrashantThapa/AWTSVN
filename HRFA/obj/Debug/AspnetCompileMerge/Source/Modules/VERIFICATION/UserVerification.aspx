<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="UserVerification.aspx.cs" Inherits="IDS.Modules.VERIFICATION.UserVerification1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="/Scripts/VERIFICATION/UserVerification.js" type="text/javascript"></script>
   <%-- <script src="/JsLibrary/bootstrap-tooltip.js" type="text/javascript"></script>--%>
  <%--  <script src="/JsLibrary/bootstrap-popover.js" type="text/javascript"></script>--%>
    <script src="/JsLibrary/jquery.stickytableheaders.min.js" type="text/javascript"></script>
    <script src="/JsLibrary/resizable-tables.js" type="text/javascript"></script>
<!--<style>
.SelectModule
    {
        height:22px;
        width:22px;
        cursor:pointer;
    }   
    .redCSS
     {
         background:#48ADFB !important;
         
     }
     .redCSS td
     {
         background:#48ADFB !important;
        
     }
</style>-->
<!--<div class="wrapper">
    <div class="row">

    <fieldset class="col-md-12">
        <legend>User Verification</legend>
    

            <div class="col-md-2">
                <fieldset style="margin-top:-20px;">
                    <legend>Application</legend>
                    <select style="width:200px;height:400px;" multiple="multiple"  
                        data-bind="options:ApplicationArray, optionsText:'ApplicationDescription', optionsValue:$data, optionsCaption: '------------- आवेदन -------------', value:selectedApplication, event:{change:$data.GetModule}" ></select>     
                </fieldset>       
            </div> 
            <div class="col-md-8 pull-right">

         <div class="row" style="margin:0px auto;">
            <div style="margin-left:10px;">
                <div class="col-lg-12 col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="height:40px;">     
                            <p>Modules</p>
                        </div>
                        <div class="panel-body">
                            <div class="col-md-12" >                 
                                   <table class="table table-bordered fixed-header resizable" id="tblModule" style="cursor:pointer;">
                                        <thead>
                                            <tr>
                                                <th>Module</th>
                                                <th>Level of Verification</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody data-bind="foreach: ModuleArray">
                                            <tr data-bind="value: ModuleID, click: $parent.GetUserVerification" onclick="highlightRow()">
                                               <td>
                                                  <span data-bind="text:ModuleID"></span>
                                                </td> 
                                                <td>
                                                  <span data-bind="text:LevelOfVerification"></span>
                                                </td>
                                                <td style="text-align:center;">
                                                 <%--<a data-bind="value: ModuleID, click: $parent.LoadUserVerification"><img src="/Styles/Images/select.png" height="20px" width="20px"/></a><strong><kbd>select</kbd></strong>--%>
                                                 <a  data-bind="value: ModuleID, click: $parent.LoadUserVerification"><img class="SelectModule" data-content="Click To Select Module!!!" onload="HoverModule()"/><span class="glyphicon glyphicon-circle-arrow-right" title="Select"></span></a>
                                                </td>
                                        </tr>
                                    </tbody>
                                   </table>                        
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="col-lg-12 col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="height:40px;">     
                            <p>User Verification</p>
                        </div>
                        <div class="panel-body">
                            <div class="col-md-12" >    
                                              
                                   <table class="table table-bordered fixed-header resizable" id="tblUserVerification">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Verify Level</th>
                                                <th>From Date</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody data-bind="foreach: UserVerificationLst">
                                            <tr>
                                                <td>     
                                                    <span data-bind="text:UserID"></span>
                                                </td>

                                                <td>      
                                                      
                                                      <span data-bind="text:VerifyLevel"></span>
                                                </td> 

                                                <td>
                                                       
                                                       <span data-bind="text:FromDate"></span>
                                                </td>
                                                <td style="text-align:center;">
                                                <a data-bind="click: $root.removeUVRow"><span title="Delete" rel="tooltip"><img src="/Images/No-entry.png"></img></span></a>
                                                </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                         <tr>
                                                <td>     
                                                    <div class="dropdown">
                                                    <select id="ddlUserListNew" class="dropdown-select" data-bind="options:UserLst, optionsText: 'UserName', optionsValue: 'UserID', value: UserID , optionsCaption: '------ छान्नुहोस् ------'">
                                                    </select> 
                                                    </div> 
                                                </td>

                                                <td>      
                                                      <input id="txtVerifyLevelNew" type="text" class='required' data-bind="value: VerifyLevel"  style="width:150px;" />
                                                </td> 

                                                <td>
                                                       <input id="txtFromDateNew" type="text" placeholder="YYYY.MM.DD"data-bind="value: FromDate" maxlength="10" style="width:150px;" onkeypress="return isNumberKey(event)" onblur="return valFutureDate(this,'Y',true);"/>
                                                </td>
                                                <td style="text-align:center;">
                                                 <input class="btn btn-primary btn-md" type="button" value="Add" data-bind="click:AddUserVerification" />  
                                                </td>
                                        </tr>
                                    </tfoot>
                                </table>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>   
        <div style="float:right; margin-right:7px;">    
            <button class="btn btn-primary btn-md" data-bind="click: SaveUserVerification">Submit</button>
            <button class="btn btn-primary btn-md">Cancel</button> 
      </div>         
  </div>          
           
        

    </fieldset>        
    </div>            
</div>-->            
         <div class="col-md-12">
    <h3 class="margin-bottom-0 margin-top-25 text-left" style="padding-left:25px;">User Verification</h3>
    <form class="form-horizontal" role="form">

          <!-- Text input-->
          <div class="col-md-3 margin-bottom-0 padding-left-0">
          <fieldset class="panel panel-default">
          <div style="height:40px;" class="panel-heading">     
                            <p>Application</p>
                        </div>
<select class="col-md-12 bdr" style="min-height:309px;" multiple="multiple"  
                        data-bind="options:ApplicationArray, optionsText:'ApplicationDescription', optionsValue:$data, optionsCaption: '------------- Application -------------', value:selectedApplication, event:{change:$data.GetModule}" ></select>     
                </fieldset>
          <!--<div class="form-group margin-bottom-0">
            <label class="col-md-12 col-xs-12 col-sm-12 control-label text-top" for="textinput">
            <select id="ddlOfficeUser" class="form-control" style="min-height:500px; width:100%;" multiple="multiple" data-bind="options:OfficeUserArray, optionsText:'UserName', optionsCaption: '------------------ उपयोगकर्ता ------------------', value: SelectedUser, event:{ change: $data.GetUserDetails }">
            </select>
            </label>
            
            
          </div>-->
          </div>

<div class="col-md-9">
<div class="row">
<div class="col-lg-12 col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="height:40px;">     
                            <p>Modules</p>
                        </div>
                        <div class="panel-body">
                            <div class="col-md-12" >                 
                                   <table class="table table-bordered fixed-header resizable" id="tblModule" style="cursor:pointer;">
                                        <thead>
                                            <tr>
                                                <th style="display:none;">Module</th>
                                                <th>Module Description</th>
                                                <th>Level of Verification</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody data-bind="foreach: ModuleArray">
                                            <tr data-bind="value: ModuleID, click: $parent.GetUserVerification" onclick="highlightRow()">
                                               <td style="display:none;">
                                                  <span data-bind="text:ModuleID"></span>
                                                </td> 
                                                <td>
                                                    <span data-bind="text:ModuleDesc"></span>
                                                </td>
                                                <td>
                                                  <span data-bind="text:LevelOfVerification"></span>
                                                </td>
                                                <td style="text-align:center;">
                                                 <%--<a data-bind="value: ModuleID, click: $parent.LoadUserVerification"><img src="/Styles/Images/select.png" height="20px" width="20px"/></a><strong><kbd>select</kbd></strong>--%>
                                                 <a  data-bind="value: ModuleID, click: $parent.LoadUserVerification"><img class="SelectModule" data-content="Click To Select Module!!!" onload="HoverModule()"/><span class="glyphicon glyphicon-circle-arrow-right" title="Select"></span></a>
                                                </td>
                                        </tr>
                                    </tbody>
                                   </table>                        
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="col-lg-12 col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="height:40px;">     
                            <p>User Verification</p>
                        </div>
                        <div class="panel-body">
                            <div class="col-md-12" >    
                                              
                                   <table class="table table-bordered fixed-header resizable" id="tblUserVerification">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Verify Level</th>
                                                <th>From Date</th>
                                                <th style="text-align:center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody data-bind="foreach: UserVerificationLst">
                                            <tr>
                                                <td>     
                                                    <span data-bind="text:UserID"></span>
                                                </td>

                                                <td>      
                                                      
                                                      <span data-bind="text:VerifyLevel"></span>
                                                </td> 

                                                <td>
                                                       
                                                       <span data-bind="text:FromDate"></span>
                                                </td>
                                                <td style="text-align:center;">
                                                <a data-bind="click: $root.removeUVRow"><span title="Delete" rel="tooltip"><img src="/Images/No-entry.png"></img></span></a>
                                                </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                         <tr>
                                                <td>     
                                                    <div class="dropdown">
                                                    <select id="ddlUserListNew" class="dropdown-select" data-bind="options:UserLst, optionsText: 'UserName', optionsValue: 'UserID', value: UserID , optionsCaption: '------ Select one ------'">
                                                    </select> 
                                                    </div> 
                                                </td>

                                                <td>      
                                                      <input id="txtVerifyLevelNew" type="text" class='required' data-bind="value: VerifyLevel"  style="width:150px;" />
                                                </td> 

                                                <td>
                                                       <input id="txtFromDateNew" type="text" placeholder="YYYY.MM.DD"data-bind="value: FromDate" maxlength="10" style="width:150px;" onkeypress="return isNumberKey(event)" onblur="return valFutureDate(this,'Y',true);"/>
                                                </td>
                                                <td style="text-align:center;">
                                                 <input class="btn btn-primary btn-md" type="button" value="Add" data-bind="click:AddUserVerification" />  
                                                </td>
                                        </tr>
                                    </tfoot>
                                </table>                        
                            </div>
                        </div>
                    </div>
                </div>
            
          </div>
<div style="float:right; margin-right:7px;">    
            <button class="btn btn-primary btn-md" data-bind="click: SaveUserVerification">Submit</button>
            <button class="btn btn-primary btn-md">Cancel</button> 
      </div>
            </div>

     <div class="clear"></div>
      </form>
     </div>   
            
            
      






    
    <script type="text/javascript">
        function HoverModule() {
            $('.SelectModule').popover({
                trigger: "hover",
                placement: "top",
                title: "<b>Module !!!</b>"


            });

        }

        function highlightRow() {

            var trInstance = $('#tblModule').find('tbody>tr');
            trInstance.click(function () {
                $('#tblModule >tbody>tr').removeClass('redCSS');
                var instance = $(this);
                instance.addClass('redCSS');
            });

        }



        $("#tblModule").stickyTableHeaders();
        $("#tblUserVerification").stickyTableHeaders();
     
 
</script>
</asp:Content>
