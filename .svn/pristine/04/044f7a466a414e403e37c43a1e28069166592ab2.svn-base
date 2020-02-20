using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLModuleVerification
    {
        public JsonResponse GetUnverifiedModulesWithCount(int roleID)
        {
            JsonResponse response = new JsonResponse();
            DLLModuleVerification obj = new DLLModuleVerification();
            try
            {
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = obj.GetUnverifiedModulesWithCount(roleID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }

        //NB: Getting Transaction while clicking row of Modules-------------------------------------------------------------------------------------------
        public JsonResponse GetUnverifiedTransactions(string roleID, string moduleID)
        {
            JsonResponse response = new JsonResponse();
            DLLModuleVerification obj = new DLLModuleVerification();
            try
            {
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = obj.GetUnverifiedTransactions(roleID, moduleID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        //NB: Searching Module By Name---------------------------------------------------------------------------------------------------------------------
        //public JsonResponse SearchModuleByName(ATTModuleVerification objSearch)
        //{
        //    JsonResponse response = new JsonResponse();
        //    DLLModuleVerification obj = new DLLModuleVerification();
        //    try
        //    {
        //        response.IsSucess = true;
        //        response.ResponseData = obj.SearchModuleByName(objSearch);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSucess = false;
        //        response.Message = ex.Message;
        //    }
        //    return response;

        //}
    }
}
