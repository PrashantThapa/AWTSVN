using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    public class PunishmentHandler : BaseHandler
    {

        public object SavePunishment(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTPunishment objPunishment = JsonUtility.DeSerialize(args, typeof(ATTPunishment)) as ATTPunishment;
            BLLPunishment bllPunishment = new BLLPunishment();
            response = bllPunishment.SavePunishment(objPunishment,appID,modID);

            return JsonUtility.Serialize(response);

        }

        public object GetPunishment(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLPunishment objBLLPunishment = new BLLPunishment();
            try
            {
                response = objBLLPunishment.GetPunishment(submissionNo);
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