using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLApplication
    {
        public JsonResponse GetAllApplication()
        {
            JsonResponse response = new JsonResponse();
            
            try
            {
                DLLApplication obj = new DLLApplication();
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = obj.GetAllApplication();

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess=false;
            }
            return response;
        }
    }
}
