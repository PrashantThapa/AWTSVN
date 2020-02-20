using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace IDS.Modules.CENTRALLOOKUP
{
    public partial class BankAccountSetUp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
               var SubmissionNo= Request.QueryString["SubmissionNo"];
               if (SubmissionNo != null)
               {
                   ScriptManager.RegisterClientScriptBlock(this.Page, this.Page.GetType(), "SubmissionNo", string.Format("getSubmissionNoDetail({0})", SubmissionNo), true);
               }
        }
    }
}