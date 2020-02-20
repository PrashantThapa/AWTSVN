using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.VERIFICATION
{
    /// <summary>
    /// Summary description for SelectionOfVerificationModule
    /// </summary>
    public class SelectionOfVerificationModule : BaseHandler
    {

        public object GetAllApplication()
        {
            JsonResponse response = new JsonResponse();
            BLLApplication obj = new BLLApplication();
            response = obj.GetAllApplication();
            return JsonUtility.Serialize(response);
        }

        //NB: Saving while clicking Submit Button
        public object SaveSelectionofVerificationModule(string args)
        {
            List<ATTVerificationModule> objselectionofVM = JsonUtility.DeSerialize(args, typeof(List<ATTVerificationModule>)) as List<ATTVerificationModule>;

            JsonResponse response = new JsonResponse();
            BLLVerificationModule obj = new BLLVerificationModule();

            response = obj.SaveSelectionofVerificationModule(objselectionofVM);
            // response.Message="User Created Successfully";            

            return JsonUtility.Serialize(response);
        }

       
    }
}