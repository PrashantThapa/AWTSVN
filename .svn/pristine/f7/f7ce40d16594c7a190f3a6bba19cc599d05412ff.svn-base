using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for AwardHandler
    /// </summary>
    public class AwardHandler : BaseHandler
    {
        public object SaveAward(string args, string appID, string modID)
        {
            ATTAward objAward = (ATTAward)JsonUtility.DeSerialize(args, typeof(ATTAward));
            JsonResponse response = new JsonResponse();
            BLLAward objBLLAward = new BLLAward();

            try
            {
                response = objBLLAward.SaveAward(objAward, appID, modID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetAward(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLAward objBLLAward = new BLLAward();
            try
            {
                response = objBLLAward.GetAward(submissionNo);
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