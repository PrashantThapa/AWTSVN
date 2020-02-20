using System;
using System.Web;
using System.Text;

namespace IDS.Modules.COMMON
{
    public partial class Submission : System.Web.UI.Page
    {
       
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                FillCapctha();
            }
        }

        void FillCapctha()
        {

            try
            {

                Random random = new Random();

                string combination = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                StringBuilder captcha = new StringBuilder();

                for (int i = 0; i <5; i++)

                captcha.Append(combination[random.Next(combination.Length)]);

                HttpContext.Current.Session["captcha"] = captcha.ToString();

                imgCaptcha.ImageUrl = "GenerateCaptcha.aspx?" + DateTime.Now.Ticks.ToString();;

                //imgCaptcha.ImageUrl = "/capimg/cap.jpg"; //MapPath("~/capimg/cap.jpg");

            }
            catch
            {
                throw;
            }
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            FillCapctha();
        }


    }
}