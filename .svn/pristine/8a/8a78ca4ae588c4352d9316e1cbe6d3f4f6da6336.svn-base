using System;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLOfficePostDarbandi
    {
        public JsonResponse GetOfficePostDarbandi(Int32? OfficeCode,Int32? postID)
        {
            JsonResponse response = new JsonResponse();
            DLLOfficePostDarbandi obj = new DLLOfficePostDarbandi();
            try
            {
                response.ResponseData = obj.GetOfficePostDarbandi(OfficeCode,postID);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }

        public JsonResponse GetPostDarbandi(Int32? postID)
        {
            JsonResponse response = new JsonResponse();
            DLLOfficePostDarbandi obj = new DLLOfficePostDarbandi();
            try
            {
                response.ResponseData = obj.GetPostDarbandi(postID);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
    }
}
