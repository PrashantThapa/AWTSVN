using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for DepartmentHandler
    /// </summary>
    public class DepartmentHandler : BaseHandler
    {
        public object SaveDepartmentSetup(string args)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
            BLLDepartment bllDepartment = new BLLDepartment();
            ATTDepartment objDepartment = JsonUtility.DeSerialize(args, typeof(ATTDepartment))as ATTDepartment;
            response = bllDepartment.SaveDepartmentSetup(objDepartment);
            // }
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);
        }

        public object GetDepartment(int officeCode, int? deptID)
        {
            JsonResponse response = new JsonResponse();
            BLLDepartment bllDepartment = new BLLDepartment();
            response = bllDepartment.GetDepartment(officeCode, deptID);
            return JsonUtility.Serialize(response);
        }
    }
}