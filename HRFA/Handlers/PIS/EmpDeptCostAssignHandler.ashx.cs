using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmpDeptCostAssignHandler
    /// </summary>
    public class EmpDeptCostAssignHandler : BaseHandler
    {

        public object SaveEmpDeptCostAssign(string args, string modID, string appID)
        {
            BLLEmpDeptCostAssign objEmpDeptCostAssignBll = new BLLEmpDeptCostAssign();
            ATTEmpDeptCostAssign objEmpDeptCostAssignAll = (ATTEmpDeptCostAssign)JsonUtility.DeSerialize(args, typeof(ATTEmpDeptCostAssign));
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = objEmpDeptCostAssignBll.SaveEmpDeptCostAssign(objEmpDeptCostAssignAll, modID, appID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }


        public object GetEmpDeptCostAssignBySubNo(Int64? SubmissionNo)
        {
            BLLEmpDeptCostAssign obj = new BLLEmpDeptCostAssign();

            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetEmpDeptCostAssignBySubNo(SubmissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }


    }
}