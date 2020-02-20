using HRFA.BLL;
using HRFA.COMMON;
using System.Web;

namespace HRFA.Handlers.CENTRALLOOKUP
{
    /// <summary>
    /// Summary description for OTSettingHandler
    /// </summary>
    public class OTSettingHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public object GetOTSetting()
        {
            JsonResponse response = new JsonResponse();
            BLLOTSetting bllOTSetting = new BLLOTSetting();
            response = bllOTSetting.GetOTSetting();
            return JsonUtility.Serialize(response);
        }
        public object GetLevels()
        {
            JsonResponse response = new JsonResponse();
            BLLLevel billLevel = new BLLLevel();
            response = billLevel.GetLevels();
            return JsonUtility.Serialize(response);
        }
    }
}