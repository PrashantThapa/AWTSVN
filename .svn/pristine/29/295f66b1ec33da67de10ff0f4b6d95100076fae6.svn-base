using HRFA.COMMON;
using System.Web;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for FileUploadHandler
    /// </summary>
    public class FileUploadHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                JsonResponse response = new JsonResponse();
                var file = context.Request.Files[0];
                string fileExtension = VirtualPathUtility.GetExtension(file.FileName);
                string path = context.Server.MapPath("../../PhotoHandle/temp/temp" + fileExtension);
                file.SaveAs(path);
                response.ResponseData = fileExtension;
                context.Response.Write(JsonUtility.Serialize(response));
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}