using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLUser
    {

        public  List<ATTUser> GetUsers()
        {
            DLLUser objDLLUser = new DLLUser();
            return objDLLUser.GetUsers();
        }

        public  JsonResponse LogIn(ATTUser user)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                DLLUser objDLLUser = new DLLUser();
                user = objDLLUser.LogIn(user);

                if (user.OfficeUser.AccountStatus == "I" || user.OfficeUser.AccountStatus == "S")
                {
                    response.Message = "Login Failed  !!! </ br>  User is Inactive or Disabled!!!!!! ";
                    response.IsSucess = false;
                }

                else if (user.LoggedIn && user.OfficeUser.AccountStatus == "A")
                {
                    response.Message = "";
                    response.IsSucess = true;
                    response.ResponseData = user;
                }
                
                else
                {
                    response.Message = "Login Failed  !!! </br> User is Inactive or Disabled !!! ";
                    response.IsSucess = false;
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;
        }


        public bool SaveChangePassword(ATTUser objUser)
        {
            DLLUser objDLLUser = new DLLUser();

            return objDLLUser.SaveChangePassword(objUser);
        }
        
        public  List<ATTUser> GetOfficeUsers(Int32? offcode)
        {
            DLLUser objDLLUser = new DLLUser();
            return objDLLUser.GetOfficeUsers(offcode);
        }

        public  List<ATTUser> GetOfficeUsers()
        {
            DLLUser objDLLUser = new DLLUser();
            return objDLLUser.GetOfficeUsersForUV();
        }

        public  ATTUser GetUserDetails(string userid)
        {
            DLLUser objDLLUser = new DLLUser();
            return objDLLUser.GetUserDetails(userid);
        }

        public  JsonResponse SaveUser(ATTUser obj)
        {

            JsonResponse response = new JsonResponse();

            try
            {
                DLLUser objDLLUser = new DLLUser();

                response.Message = objDLLUser.SaveUser(obj);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

               
        }

        public JsonResponse DeleteAssignModule(string appID, string userID, string moduleID, string funCD, string toDate)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                DLLUser objDLLUser = new DLLUser();

                response.Message = objDLLUser.DeleteAssignModule(appID, userID, moduleID, funCD, toDate);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

        }
        public JsonResponse DeleteAssignedRole(string applicationId, string userID, string roleID, string fromDate, string toDate)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                DLLUser objDLLUser = new DLLUser();

                response.Message = objDLLUser.DeleteAssignedRole(applicationId, userID, roleID, fromDate, toDate);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

        }
        public  string DeleteAssignedModuleFunction(string applicationId, string moduleId, string funCD, string userId, string fromDate)
        {
            DLLUser obj = new DLLUser();
            return obj.DeleteAssignedModuleFunction(applicationId, moduleId, funCD, userId, fromDate);
        }
    }
}
