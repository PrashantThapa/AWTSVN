using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLDeputationReturn
    {
        public JsonResponse SavePromotion(ATTEmpDeputationReturn objDeputationReturn, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLDeputationReturn dllDeputationReturn = new DLLDeputationReturn();
                    response.Message = dllDeputationReturn.SaveDeputationReturn(objDeputationReturn,appID,modID);
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

        public JsonResponse GetDeputationReturn(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLDeputationReturn objDll = new DLLDeputationReturn();
            try
            {
                response.ResponseData = objDll.GetDeputationReturn(submissionNo);
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
