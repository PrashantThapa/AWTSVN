using System;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLSamuha
    {
        public JsonResponse GetSamuha(int? samuhaID)
        {
            JsonResponse response = new JsonResponse();
            DLLSamuha objDll = new DLLSamuha();
            try
            {
                response.ResponseData = objDll.GetSamuha(samuhaID);
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
