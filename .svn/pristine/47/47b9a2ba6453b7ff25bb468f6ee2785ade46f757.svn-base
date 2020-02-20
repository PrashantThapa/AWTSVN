using System;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for UpaSamuhaHandler
    /// </summary>
    public class UpaSamuhaHandler : BaseHandler
    {
        public object GetUpaSamuha(int? samuhaID, int? upaSamuhaID)
        {
            JsonResponse response = new JsonResponse();
            BLLUpaSamuha objBLUpaSamuha = new BLLUpaSamuha();
            try
            {
                response = objBLUpaSamuha.GetUpaSamuha(samuhaID, upaSamuhaID);
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