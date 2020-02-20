using System;
using HRFA.ATT.PAYROLL;
using HRFA.COMMON;
using HRFA.DataLayer.PAYROLL;

namespace HRFA.BLL.PAYROLL
{
   public class BLLSalaryParameter
    {
        public JsonResponse SaveEmpGrade(ATTSalaryParameter SalaryParameter, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLSalaryParameter dllEmpGrade = new DLLSalaryParameter();
                    response.Message = dllEmpGrade.SaveEmpGrade(SalaryParameter, appID, modID);
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
			DLLSalaryParameter objDll = new DLLSalaryParameter();
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

	}
}
