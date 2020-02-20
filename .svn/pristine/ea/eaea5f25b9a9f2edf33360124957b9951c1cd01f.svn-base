using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
   
    public class DeputationReturnHandler : BaseHandler
    {

        public object SaveDeputationReturn(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTEmpDeputationReturn objDeputationReturn = JsonUtility.DeSerialize(args, typeof(ATTEmpDeputationReturn)) as ATTEmpDeputationReturn;
            BLLDeputationReturn bllDeputationReturn = new BLLDeputationReturn();
            response = bllDeputationReturn.SavePromotion(objDeputationReturn,appID,modID);

            return JsonUtility.Serialize(response);

        }

        public object GetDeputationReturn(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLDeputationReturn objBLLDeputationReturn = new BLLDeputationReturn();
            try
            {
                response = objBLLDeputationReturn.GetDeputationReturn(submissionNo);
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