using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLPunishment
    {
        public JsonResponse SavePunishment(ATTPunishment objPunishment, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLPunishment dllPunishment = new DLLPunishment();
                    response.Message = dllPunishment.SavePunishment(objPunishment,appID,modID);
                    response.IsSucess = true;

                }

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

        }


        public JsonResponse GetPunishment(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLPunishment objDll = new DLLPunishment();
            try
            {
                response.ResponseData = objDll.GetPunishment(submissionNo);
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
