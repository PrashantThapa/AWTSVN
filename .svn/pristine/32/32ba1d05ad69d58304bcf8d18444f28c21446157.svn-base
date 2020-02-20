using HRFA.COMMON;
namespace IDS.Handlers.SECURITY
{
    /// <summary>
    /// Summary description for IPHandler
    /// </summary>
    public class IPHandler : BaseHandler
    {

        public object GetHostName()
        {
            JsonResponse response = new JsonResponse();
            string hostName = System.Net.Dns.GetHostName();

            response.ResponseData = hostName;

            return JsonUtility.Serialize(response);
        }

       
    }
}