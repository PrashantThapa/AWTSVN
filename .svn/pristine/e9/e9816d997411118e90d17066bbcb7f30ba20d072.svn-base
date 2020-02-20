<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="OTSetup.aspx.cs" Inherits="HRFA.Modules.CENTRALLOOKUP.OTSetup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="wrapper" >
      <form id="form1" runat="server"  style="margin-top:4%;"> 
          <div class="row">
              <div class="col-lg-4">
                  <div class="row">
                      <div class="col-lg-2">  
                         <div class="form-group mx-sm-3 mb-2 " >
                                <label for="ddlLevel" >तह *</label>
                          </div>                           
                     </div>
                        <div class="col-lg-8">  
                            <div class="form-group mx-sm-3 mb-2 " >
                               <select id="ddlLevel" class="form-control" style="padding: 6px;" title="तह.." data-bind="options:Levels, optionsText:'LevelDesc', optionsValue:$data,optionsCaption:'------छान्नुहोस्-------', value: SelectedLevel" ></select>
                               </div>
                            </div>
                  </div>
                  <div class="row">
                      <div class="col-lg-2">  
                         <div class="form-group mx-sm-3 mb-2 " >
                                <label for="txtHour" >घण्टा *</label>                                
                          </div>                  
                     </div>
                      <div class="col-lg-4"> 
                          <div class="form-group mx-sm-3 mb-2 " >                               
                                <input  class="form-control" id="txtHour" placeholder="घण्टा" data-bind="value:Hour"/>
                          </div> 
                      </div>
                  </div>
                  <div class="row">
              <div class="col-lg-2">  
                 <div class="form-group mx-sm-3 mb-2 " >
                        <label for="txtRate" >दर *</label>
                  </div>                    
             </div>
                       <div class="col-lg-4">  
                 <div class="form-group mx-sm-3 mb-2 " >
                        <input  class="form-control" id="txtRate" placeholder="दर" data-bind="value:Rate"/>
                  </div>                    
             </div>
                      <button type="button" class="btn btn-primary" data-bind="click:SaveOT,  enable: disableSave">Submit</button>
                           <button type="button" class="btn btn-danger">Cancel</button>
          </div>
              </div>
              <div class="col-lg-6">
                   <table class="dataTable table table-bordered table-condensed table-striped sort">
                                <thead>
                                    <tr>
                                        <th>
                                            SN.
                                        </th>
                                        <th>
                                            तह
                                        </th>
                                        <th>
                                            घण्टा
                                        </th>
                                        <th>
                                            दर
                                        </th>
                                    </tr>
                                </thead>
                                <tbody data-bind="foreach: Levels">
                                    <tr>
                                        <td>
                                            <span data-bind="text: ($index()+1)"></span>
                                        </td>
                                        <td>
                                            <span data-bind="text:Levels().LevelId" />
                                        </td>
                                        <td>
                                            <span data-bind="text:FromDate" />
                                        </td>
                                        <td>
                                            <span data-bind="text:ToDate" />
                                        </td>
                                        
                                        <td>
                                            <a data-bind="click: $root.Edit"><span class="glyphicon glyphicon-edit"
                                                title="Edit" ></span></a><a data-bind="click: $root.Delete">
                                                    <span class="glyphicon glyphicon-trash" title="Delete" ></span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
              </div>
          </div>
      </form>
</div>
     <script src="../../Scripts/CENTRALLOOKUP/OTSetting.js" type="text/javascript"></script>
</asp:Content>
