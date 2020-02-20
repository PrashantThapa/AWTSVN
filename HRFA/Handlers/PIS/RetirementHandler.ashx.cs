using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for RetirementHandler
    /// </summary>
    public class RetirementHandler : BaseHandler
    {
        public object SaveRetirement(string args, string appID, string modID)
        {
            ATTRetirement objRet = (ATTRetirement)JsonUtility.DeSerialize(args, typeof(ATTRetirement));
            JsonResponse response = new JsonResponse();
            BLLRetirement objBLLRet = new BLLRetirement();

            try
            {
                response = objBLLRet.SaveRetirement(objRet, appID, modID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }


        public object GetRetirementType(Int64? RetirementTypeId)
        {
            JsonResponse response = new JsonResponse();
            BLLRetirement objBLLRetirement = new BLLRetirement();
            try
            {
                response = objBLLRetirement.GetRetirementType(RetirementTypeId);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetRetirement(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLRetirement objBLLRetirement = new BLLRetirement();
            try
            {
                response = objBLLRetirement.GetRetirement(submissionNo);
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