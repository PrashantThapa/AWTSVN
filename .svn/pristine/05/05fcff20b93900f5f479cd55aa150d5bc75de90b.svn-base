using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.SECURITY
{
   
    public class UserHandler : BaseHandler
    {
        
        public object GetUsers()
        {
            JsonResponse response = new JsonResponse();
            try
            {
                BLLUser objBLLUser = new BLLUser();
                response.ResponseData = objBLLUser.GetUsers();
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }

            return JsonUtility.Serialize(response);
        }
       
        public object SaveChangePassword(string user)
        {
            ATTUser objUser = JsonUtility.DeSerialize(user, typeof(ATTUser)) as ATTUser;

            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();

            try {
                response.ResponseData = objBLLUser.SaveChangePassword(objUser);
                response.IsSucess = true;
                if (objUser.UserID == objUser.Password)
                {
                    response.Message = "Password Successfully Reseted.";
                }
                else
                {
                    response.Message = "Password Successfully Changed.";
                }
            }
            catch(Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        //NB: While Selecting office...
        public object GetOfficeUsers(string offcode)
        {
            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();
            try
            {
                response.ResponseData = objBLLUser.GetOfficeUsers(Convert.ToInt32(offcode));
                response.IsSucess = true;
            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetOfficeUsersUV()
        {
            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();
            try
            {
                response.ResponseData = objBLLUser.GetOfficeUsers();
                response.IsSucess = true;
            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetUserDetails(string userid)
        {
            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();
            try
            {
                response.ResponseData = objBLLUser.GetUserDetails(userid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetUserDesignationonLoad()
        {
            JsonResponse response = new JsonResponse();
            BLLUserDesignation objBLLUserDesignation = new BLLUserDesignation();
            try
            {
                response.ResponseData = objBLLUserDesignation.GetUserDesignation();
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
                
            }
            return JsonUtility.Serialize(response);
        }
        public object GetAllApplication(string args)
        {
            JsonResponse response = new JsonResponse();
            BLLSECApplication objBLLApplication = new BLLSECApplication();

            try
            {
                response.ResponseData = objBLLApplication.GetAllApplication(Convert.ToInt32(args));
                response.IsSucess = true;

            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetApplicationRoles(string applicationID)
        {
            JsonResponse response = new JsonResponse();
            BLLApplicationRole objBLLApplicationRole = new BLLApplicationRole();
            try
            {
                response.ResponseData = objBLLApplicationRole.GetApplicationRoles(applicationID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;              
            }
            return JsonUtility.Serialize(response);
        }


        public object GetModuleFunctions(string applicationID)
        {
            JsonResponse response = new JsonResponse();
            BLLModuleFunction objBLLModuleFunction = new BLLModuleFunction();
            try
            {
                response.ResponseData = objBLLModuleFunction.GetModuleFunctions(applicationID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;              
            }
            return JsonUtility.Serialize(response);
        }


        public object SaveUser(string args)
        {
            JsonResponse response = new JsonResponse();
            ATTUser objUser = JsonUtility.DeSerialize(args, typeof(ATTUser)) as ATTUser;
            BLLUser objBLLUser = new BLLUser();

            try
            {
               response = objBLLUser.SaveUser(objUser);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }


        public object DeleteAssignModule(string appID, string userID, string moduleID, string funCD, string toDate)
        {
  
            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();

            try
            {
                response = objBLLUser.DeleteAssignModule(appID, userID, moduleID, funCD, toDate);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
        public object removeAssignRole(string applicationId, string userID, string roleID, string fromDate, string toDate)
        {

            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();

            try
            {
                response = objBLLUser.DeleteAssignedRole(applicationId, userID, roleID, fromDate, toDate);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }

        
        public object DeleteAssignedModuleFunction(string applicationId, string moduleId, string funCD, string userId, string fromDate, string token)
        {

            JsonResponse response = new JsonResponse();
            BLLUser objBLLUser = new BLLUser();

            if (token == CurrentToken())
            {

                response.Message = objBLLUser.DeleteAssignedModuleFunction(applicationId, moduleId, funCD, userId, fromDate);
                response.IsSucess = true;
            }
            else
            {
                response.Message = "Data Deleted Unsuccessfully !!!";
                response.IsSucess = false;
                response.IsToken = false;
            }

            return JsonUtility.Serialize(response);
        }
    }
}