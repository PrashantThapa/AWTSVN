using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
using System.Web;

namespace IDS.Handlers.COMMON
{
   
    public class PortalLoginHandler : BaseHandler
    {

		public object PortalLogin(string args)
		{
			JsonResponse response = new JsonResponse();
			ATTPortalLogin user = JsonUtility.DeSerialize(args, typeof(ATTPortalLogin)) as ATTPortalLogin;

			BLLPortalLogin bllPortalLogin = new BLLPortalLogin();
			user.DatabaseAccessUserName = "HR_OWNER_DEMO";
			user.DatabaseAccessUserPassword = "HR_OWNER_DEMO";
			response = bllPortalLogin.PortalLogin(user);

			if (response.IsSucess)
			{
				HttpContext.Current.Session["PUser"] = response.ResponseData;

				//  HttpContext.Current.Session["POfficeCD"] = user.OfficeCD;
				//user.UserID + "," + response.Message;
			}

			return JsonUtility.Serialize(response);
		
		}

		public object SaveChangePassword(string changepass)
        {

            ATTPortalLogin objChangePassword = (ATTPortalLogin)JsonUtility.DeSerialize(changepass, typeof(ATTPortalLogin));

            BLLPortalLogin bllPortalLogin = new BLLPortalLogin();
            JsonResponse response = new JsonResponse();
            response = bllPortalLogin.SaveChangePassword(objChangePassword);

            return JsonUtility.Serialize(response);
        }

        public object PortalSignOut()
        {
            JsonResponse response = new JsonResponse();
            System.Web.HttpContext.Current.Session["PUser"] = null;
            System.Web.HttpContext.Current.Session["BFIID"] = null;
            var httpSession = System.Web.HttpContext.Current.Session;
            System.Web.HttpContext.Current.Session.Clear();
            System.Web.HttpContext.Current.Session.Abandon();
            System.Web.HttpContext.Current.Response.Clear();
            System.Web.HttpContext.Current.Response.ClearContent();
            System.Web.HttpContext.Current.Response.ClearHeaders();
            response.IsSucess = true;
            response.Message = "User Logged Out";
            return JsonUtility.Serialize(response);
        }
    }
}