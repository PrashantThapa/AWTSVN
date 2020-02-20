using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.ATT.PAYROLL;
using HRFA.BLL;
using HRFA.BLL.PAYROLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PAYROLL
{
   
    public class EmpGradeHandler : BaseHandler
    {
        public object SaveEmpGrade(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            ATTSalaryParameter lstEmpGradeLoan = JsonUtility.DeSerialize(args, typeof(ATTSalaryParameter)) as ATTSalaryParameter;

            BLLSalaryParameter bllEmpGrade = new BLLSalaryParameter();
            response = bllEmpGrade.SaveEmpGrade(lstEmpGradeLoan, appID, modID);

            return JsonUtility.Serialize(response);
        }

        public object GetEmpGrade(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
			BLLSalaryParameter objBLL = new BLLSalaryParameter();
            try
            {
                response = objBLL.GetEmpGrade(submissionNo);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetEmpGradeByEmpID(Int32? EmpID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpGrade objBLL = new BLLEmpGrade();
            try
            {
                response = objBLL.GetEmpGradeByEmpID(EmpID);
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