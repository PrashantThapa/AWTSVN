using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.SECURITY
{
    /*
      Edited by shanjeev
      Date : 2015.08.01
 
   */
    public class Role : BaseHandler 
    {

        public object GettingRoleModuleFunction(string appID,string roleID)
        {
            JsonResponse response = new JsonResponse();
            BLLRoleModuleFunction obj = new BLLRoleModuleFunction();
           
            response = obj.GetRoleModuleFunctions(appID,roleID); 
            response.IsSucess = false;  
            return JsonUtility.Serialize(response);            
        }


        public object GetRoles()
        {
            JsonResponse response = new JsonResponse();
            BLLRole obj=new BLLRole();
            response = obj.GetRoles();
            return JsonUtility.Serialize(response);
        }


        public object SaveRoles(string args)
        {
            ATTRole objLst = JsonUtility.DeSerialize(args, typeof(ATTRole)) as ATTRole;
            JsonResponse response = new JsonResponse();
            BLLRole obj = new BLLRole();
            response= obj.SaveRole(objLst);
            return JsonUtility.Serialize(response);
        }

        public object CheckingRoleModuleFunctionLoading(string userID, string applicationID, string roleID)
        {
            JsonResponse response = new JsonResponse();
            BLLRole obj = new BLLRole();
            response=obj.CheckingRoleModuleFunctionLoading(userID, applicationID, roleID);
            return JsonUtility.Serialize(response);
        }

        
    }
}