using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLRole
    {
        //NB: After clicking Application (and getting Module-Functions and Role)--------------------------------------------------------------------------
        public JsonResponse GetModuleFunctionsAndRole(string applicationId)
        {
            JsonResponse response = new JsonResponse();

            DLLRole objDLLRole = new DLLRole();
            try
            {
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = objDLLRole.GetModuleFunctionsAndRole(applicationId);
            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }

        //NB: Loading Role by ApplicatinID
        public JsonResponse GetRoles()
        {
            JsonResponse response = new JsonResponse();
            DLLRole obj = new DLLRole();
            try
            {
                response.ResponseData = obj.GetRoles();
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }

        public JsonResponse SaveRole(ATTRole objR)
        {
            JsonResponse response = new JsonResponse();
            DLLRole obj = new DLLRole();
            try
            {
                response.IsSucess = true;
                response.Message = obj.SaveRole(objR);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;        
        }
        public JsonResponse CheckingRoleModuleFunctionLoading(string userID, string applicationID, string roleID)
        {
            JsonResponse response = new JsonResponse();
            DLLRole obj = new DLLRole();
            try
            {
                response.ResponseData = obj.CheckingRoleModuleFunctionLoading(userID, applicationID, roleID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        
        }

        public JsonResponse DeleteAssignedRole(string applicationId, string roleId, string fromDate, string userId, string token)
        {

            JsonResponse response = new JsonResponse();

            try
            {
                DLLUser obj = new DLLUser();
                response.Message = obj.DeleteAssignedModule(applicationId, roleId, fromDate, userId);
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
