using System;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLUpaSamuha
    {
        public JsonResponse GetUpaSamuha(int? samuhaID,int? upaSamuhaID)
        {
            JsonResponse response = new JsonResponse();
            DLLUpaSamuha objDll = new DLLUpaSamuha();
            try
            {
                response.ResponseData = objDll.GetUpaSamuha(samuhaID, upaSamuhaID);
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
