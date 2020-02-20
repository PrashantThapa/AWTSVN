using System.Web;
using System.Web.SessionState;

namespace HRFA.COMMON
{


    public class SessionManager : IRequiresSessionState
    {
       
        private const string SESSION_StageFlag = "StageFlag";
        private const string SESSION_CurrentDate = "CurrentDate";        
        
        public static JsonResponse CurrentDate
        {
            

            get
            {
                if (HttpContext.Current.Session != null)
                {
                    if (HttpContext.Current.Session[SESSION_CurrentDate] != null)
                    {
                        return (JsonResponse)HttpContext.Current.Session[SESSION_CurrentDate];
                    }
                }
                return null;
            }
            set { HttpContext.Current.Session[SESSION_CurrentDate] = value; }
        }
        
    }
}

