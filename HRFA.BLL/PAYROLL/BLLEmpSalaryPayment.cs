using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmpSalaryPayment
    {
        public JsonResponse GetEmpPayableAmount(Int32? officeCode, Int32? costCenter, Int32? year, Int32? monthId)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpSalaryPayment objDll = new DLLEmpSalaryPayment();
            try
            {
                response.ResponseData = objDll.GetEmpPayableAmount(officeCode, costCenter, year, monthId);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse SaveEmpSalaryPayment(ATTEmpSalaryPayment objEmpSalaryPayment, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLEmpSalaryPayment dllEmpSalaryPayment = new DLLEmpSalaryPayment();
                    response.Message = dllEmpSalaryPayment.SaveEmpSalaryPayment(objEmpSalaryPayment,appID,modID);
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


        public JsonResponse GetEmpSalaryPayment(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpSalaryPayment objDll = new DLLEmpSalaryPayment();
            try
            {
                response.ResponseData = objDll.GetEmpSalaryPayment(submissionNo);
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
