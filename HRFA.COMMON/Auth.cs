using System;
using System.Web.SessionState;
using System.Web;

namespace HRFA.COMMON
{
    public class Auth: IRequiresSessionState
    {
        public static string Token()
        {
            Guid token = Guid.NewGuid();

            HttpContext.Current.Session["Token"] = token;
            return token.ToString();
        }
    }
}
