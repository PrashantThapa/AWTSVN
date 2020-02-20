
using HRFA.BLL;
using HRFA.COMMON;
using System;

namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for OfficePostDarbandiHandler
    /// </summary>
    public class OfficePostDarbandiHandler : BaseHandler
    {

        public object GetOfficePostDarbandi(Int32? OfficeCode, Int32? postID)
        {
            JsonResponse response = new JsonResponse();
            BLLOfficePostDarbandi obj = new BLLOfficePostDarbandi();
            response = obj.GetOfficePostDarbandi(OfficeCode, postID);
            return JsonUtility.Serialize(response);

        }

        public object GetPostDarbandi(Int32? postID)
        {
            JsonResponse response = new JsonResponse();
            BLLOfficePostDarbandi obj = new BLLOfficePostDarbandi();
            response = obj.GetPostDarbandi(postID);
            return JsonUtility.Serialize(response);

        }

       
    }
}