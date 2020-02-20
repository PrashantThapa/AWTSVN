<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.Master" AutoEventWireup="true" CodeBehind="EmployeeSearch.aspx.cs" Inherits="HRFA.Modules.PIS.EmployeeSearch" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%@ Register Src="../../Modules/PIS/EmployeeSearchControl.ascx" TagPrefix="WebUserControl"
    TagName="EmployeeSearch" %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<section class="content">
		<div class="row">
			<!-- left column -->
			<div class="col-md-12">
				<!-- general form elements -->
					
					<!-- /.box-header -->
				
	<WebUserControl:EmployeeSearch ID="EmployeeControl" runat="server" /> 
							
			</div>
		</div>

</section>

    <script type="text/javascript">
        $("#modalEmpSearch").removeClass("modal");
        $(".modal-content").removeClass("modal-content");
        $(".modal-lg").removeClass("modal-dialog");
    </script>
</asp:Content>
