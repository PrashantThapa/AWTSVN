using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLOfficePost
    {
        /*
           Auther shanjeev
           Date : 2015.05.30
 
       */
        public string SaveOfficePost(ATTOfficePost objSub)
        {
            // string msg = "";
            string msg = string.Empty;

            try
            {
                DLLOfficePost objSubs = new DLLOfficePost();
                msg = objSubs.SaveOfficePost(objSub);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return msg;


        }
        public JsonResponse GetOfficePostFromDate(Int64? OfficeCD, Int64? PostID)
        {
            JsonResponse response = new JsonResponse();
            DLLOfficePost obj = new DLLOfficePost();
            try
            {
                response.ResponseData = obj.GetOfficePostFromDate(OfficeCD, PostID);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
        public JsonResponse GetOfficePostListWithCount(string OfficeCD)
        {
            JsonResponse response = new JsonResponse();
            DLLOfficePost obj = new DLLOfficePost();
            try
            {
                response.ResponseData = obj.GetOfficePostListWithCount(OfficeCD);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
        public JsonResponse GetOfficePostList(string OfficeCD)
        {
            JsonResponse response = new JsonResponse();
            DLLOfficePost obj = new DLLOfficePost();
            try
            {
                response.ResponseData = obj.GetOfficePostList(OfficeCD);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
         public JsonResponse GetOffice()
        {
            JsonResponse response = new JsonResponse();
            DLLOfficePost obj = new DLLOfficePost();
            try
            {
                response.ResponseData = obj.GetOffice();
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
