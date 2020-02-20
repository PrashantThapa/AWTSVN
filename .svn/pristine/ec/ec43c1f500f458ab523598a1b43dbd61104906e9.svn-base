using System;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLSewa
    {
        public JsonResponse GetSewa(int? sewaID)
        {
            JsonResponse response = new JsonResponse();
            DLLSewa objDll = new DLLSewa();
            try
            {
                response.ResponseData = objDll.GetSewa(sewaID);
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
