using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLAward
    {
        public JsonResponse SaveAward(ATTAward objAward, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            DLLAward objDll = new DLLAward();
            try
            {
                response.Message = objDll.SaveAward(objAward, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetAward(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLAward objDll = new DLLAward();
            try
            {
                response.ResponseData = objDll.GetAward(submissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
