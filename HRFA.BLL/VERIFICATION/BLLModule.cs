using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLModule
    {
        public JsonResponse GetMuduleByApplicationID(string appID)
        {
            JsonResponse respose = new JsonResponse();
            DLLModule obj = new DLLModule();
            try
            {
                respose.Message = "";
                respose.IsSucess = true;
                respose.ResponseData = obj.GetMuduleByApplicationID(appID);
            }
            catch (Exception ex)
            {
                respose.Message = ex.Message;
                respose.IsSucess = false;                
                
            }
            return respose;
        
        }
    }
}
