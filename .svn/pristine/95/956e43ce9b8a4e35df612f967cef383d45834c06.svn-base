using System;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLLevel
    {
        public JsonResponse GetLevel(int? levelID)
        {
            JsonResponse response = new JsonResponse();
            DLLLevel objDll = new DLLLevel();
            try
            {
                response.ResponseData = objDll.GetLevel(levelID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetLevels()
        {
            JsonResponse response = new JsonResponse();
            DLLLevel objDll = new DLLLevel();
            try
            {
                response.ResponseData = objDll.GetLevels();
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
