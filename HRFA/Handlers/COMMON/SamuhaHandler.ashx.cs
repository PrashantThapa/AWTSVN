using HRFA.BLL;
using HRFA.COMMON;
using System;
namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for SamuhaHandler
    /// </summary>
    public class SamuhaHandler : BaseHandler
    {
        public object GetSamuha(int? samuhaID)
        {
            JsonResponse response = new JsonResponse();
            BLLSamuha objBLLSamuha = new BLLSamuha();
            try
            {
                response = objBLLSamuha.GetSamuha(samuhaID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }
    }
}