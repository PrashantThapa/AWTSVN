using System;
using HRFA.ATT;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmpDeptCostAssign
    {
       public string SaveEmpDeptCostAssign(ATTEmpDeptCostAssign objEmpDeptCostAssignAtt, string modID, string appID)
       {
           try
           {
               DLLEmpDeptCostAssign objEmpDeptCostAssignDll = new DLLEmpDeptCostAssign();
               return objEmpDeptCostAssignDll.SaveEmpDeptCostAssign(objEmpDeptCostAssignAtt, modID, appID);
           }
           catch (Exception ex)
           {
               throw (ex);
           }

       }

       public ATTEmpDeptCostAssign GetEmpDeptCostAssignBySubNo(Int64? SubmissionNo)
       {
           try
           {
               DLLEmpDeptCostAssign obj = new DLLEmpDeptCostAssign();
               return obj.GetEmpDeptCostAssignBySubNo(SubmissionNo);

           }
           catch (Exception ex)
           {
               throw (ex);
           }

       }
    }
}
