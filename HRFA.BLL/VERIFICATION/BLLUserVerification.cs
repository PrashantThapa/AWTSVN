using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLUserVerification
    {
        public JsonResponse GetUserVerificationModules(string appID, string moduleID)
        {
            JsonResponse response = new JsonResponse();
            DLLUserVerification obj=new DLLUserVerification();
            try
            {
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = obj.GetUserVerificationModules(appID, moduleID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;       
        }

        /*
            Added by : Jayesh and Saleena
         */
        public JsonResponse GetVerificationModuleDetails(string appID, string moduleID)
        {
            JsonResponse response = new JsonResponse();
            DLLUserVerification obj = new DLLUserVerification();
            try
            {
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = obj.GetVerificationModuleDetails(appID, moduleID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }

        public JsonResponse SaveUserVerificationModules(List<ATTUserVerificationModule> lst)
        {
            JsonResponse response = new JsonResponse();
            DLLUserVerification obj = new DLLUserVerification();
            try
            {
                response.IsSucess = true;
                response.Message= obj.SaveUserVerificationModules(lst);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }


        public JsonResponse DeleteUserVerification(string applicationId, string moduleId, string vmFromDate, string userId, Int32 verifyLebel, string fromDate, string toDate)
        {
            JsonResponse response = new JsonResponse();
            DLLUserVerification obj = new DLLUserVerification();
            try
            {
                response.IsSucess = true;
                response.Message = obj.DeleteUserVerification(applicationId, moduleId, vmFromDate, userId, verifyLebel, fromDate, toDate);
            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
    }
}
