using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLEmpGrade
    {
        public JsonResponse SaveEmpGrade(ATTEmpGradeLoan EmpGradeLoan, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLEmpGrade dllEmpGrade = new DLLEmpGrade();
                    response.Message = dllEmpGrade.SaveEmpGrade(EmpGradeLoan, appID, modID);
                    response.IsSucess = true;

                }

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

        }

        public JsonResponse GetEmpGrade(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpGrade objDll = new DLLEmpGrade();
            try
            {
                response.ResponseData = objDll.GetEmpGrade(submissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetEmpGradeByEmpID(Int32? Emp_ID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpGrade objDll = new DLLEmpGrade();
            try
            {
                response.ResponseData = objDll.GetEmpGradeByEmpID(Emp_ID);
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
