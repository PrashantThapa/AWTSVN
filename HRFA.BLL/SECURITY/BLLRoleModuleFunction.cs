using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLRoleModuleFunction
    {
        public JsonResponse GetRoleModuleFunctions(string applicationID,string roleID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLRoleModuleFunction objDLLRoleModuleFunction = new DLLRoleModuleFunction();
                response.Message = "";
                response.ResponseData = objDLLRoleModuleFunction.GetRoleModuleFunctions(applicationID, roleID);
                response.IsSucess = true;
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
