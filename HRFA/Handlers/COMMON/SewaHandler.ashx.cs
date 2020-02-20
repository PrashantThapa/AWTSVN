using HRFA.BLL;
using HRFA.COMMON;
using System;
namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for SewaHandler
    /// </summary>
    public class SewaHandler : BaseHandler
    {
        public object GetSewa(int? sewaID)
        {
            JsonResponse response = new JsonResponse();
            BLLSewa objBLSewa = new BLLSewa();
            try
            {
                response = objBLSewa.GetSewa(sewaID);
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