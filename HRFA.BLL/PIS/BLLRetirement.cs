using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLRetirement
    {
        public JsonResponse SaveRetirement(ATTRetirement objRetirement, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            DLLRetirement objDll = new DLLRetirement();
            try
            {
                response.Message = objDll.SaveRetirement(objRetirement, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetRetirement(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLRetirement objDll = new DLLRetirement();
            try
            {
                response.ResponseData = objDll.GetRetirement(submissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetRetirementType(long? retirementTypeId)
        {
            JsonResponse response = new JsonResponse();
            DLLRetirement objDll = new DLLRetirement();
            try
            {
                response.ResponseData = objDll.GetRetirementType(retirementTypeId);
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
