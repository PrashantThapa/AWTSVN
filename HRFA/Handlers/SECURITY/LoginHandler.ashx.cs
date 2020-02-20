using System.Web;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.SECURITY
{

    public class LoginHandler : BaseHandler
    {

        public object LogIn(string args)
        {
            JsonResponse response = new JsonResponse();
            ATTUser user = JsonUtility.DeSerialize(args, typeof(ATTUser)) as ATTUser;
            BLLUser objBLLUser = new BLLUser();

            response = objBLLUser.LogIn(user);

            if (response.IsSucess)
            {
                HttpContext.Current.Session["User"] = response.ResponseData;

            }

             return JsonUtility.Serialize(response);
        }
        
        public object ValidateUser()
        {
            JsonResponse response = new JsonResponse();

            if (IsValidUser())
            {
                response.IsSucess = true;
                response.Token = Auth.Token();
                response.Message = GetUser();
                response.ResponseData = ((ATTUser)HttpContext.Current.Session["User"]).Menus;
            }
            else
            {
                response.IsSucess = false;
                response.Message = "Please Login !!!";
                HttpContext.Current.Session["User"] = null;                
            }

            return JsonUtility.Serialize(response);
        }

        public object ValidatePortal()
        {
            JsonResponse response = new JsonResponse();

            if (IsValidPortalUser())//validate the portal user
            {
                response.IsSucess = true;
                response.Token = Auth.Token();
                response.Message = GetPortalUserBFIID();//Get Portal User BFIID
            }
            else
            {
                response.IsSucess = false;
                response.Message = "Please Login !!!";
                HttpContext.Current.Session["PUser"] = null;
            }

            return JsonUtility.Serialize(response);
        }

        public object ClearSession()
        {
            JsonResponse response = new JsonResponse();


            System.Web.HttpContext.Current.Session["User"] = null;
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