using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.VERIFICATION
{
    /// <summary>
    /// Summary description for UserVerificationHandler
    /// </summary>
    public class UserVerificationHandler : BaseHandler
    {

        public object GetAllApplication()        
        {
            JsonResponse response = new JsonResponse();
            BLLApplication obj = new BLLApplication();
            response = obj.GetAllApplication();
            return JsonUtility.Serialize(response);
        }

        public object GetMuduleByApplicationID(string appID)
        {
            JsonResponse response = new JsonResponse();
            BLLModule obj = new BLLModule();
            response = obj.GetMuduleByApplicationID(appID);
            return JsonUtility.Serialize(response);
        }

        public object GetUserVerificationModules(string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            BLLUserVerification obj = new BLLUserVerification();
            response = obj.GetUserVerificationModules(appID, modID);
            return JsonUtility.Serialize(response);
        }


        public object GetVerificationModuleDetails(string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            BLLUserVerification obj = new BLLUserVerification();
            response = obj.GetVerificationModuleDetails(appID, modID);
            return JsonUtility.Serialize(response);
        }


        public object SaveUserVerification(string args)
        {
            List<ATTUserVerificationModule> objUser = JsonUtility.DeSerialize(args, typeof(List<ATTUserVerificationModule>)) as List<ATTUserVerificationModule>;

            JsonResponse response = new JsonResponse();
            BLLUserVerification objLst = new BLLUserVerification();

            response = objLst.SaveUserVerificationModules(objUser);
            // response.Message="User Created Successfully";            
           
            return JsonUtility.Serialize(response);
        }

        public object DeleteUserVerification(string applicationId, string moduleId, string vmFromDate, string userId, Int32 verifyLebel, string fromDate, string toDate)
        {
            JsonResponse response = new JsonResponse();
            BLLUserVerification obj = new BLLUserVerification();
            response = obj.DeleteUserVerification(applicationId, moduleId, vmFromDate, userId, verifyLebel, fromDate, toDate);
            return JsonUtility.Serialize(response);
        }
    }
}