using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PAYROLL
{
    /// <summary>
    /// Summary description for EmpSalaryPaymentHandler
    /// </summary>
    public class EmpSalaryPaymentHandler : BaseHandler
    {

        public object GetEmpPayableAmount(Int32? officeCode, Int32? costCenter, Int32? year, Int32? monthId)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpSalaryPayment objBLL = new BLLEmpSalaryPayment();
            try
            {
                response = objBLL.GetEmpPayableAmount(officeCode, costCenter, year, monthId);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object SaveEmpSalaryPayment(string args,string appID, string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTEmpSalaryPayment objEmpSalaryPayment = JsonUtility.DeSerialize(args, typeof(ATTEmpSalaryPayment)) as ATTEmpSalaryPayment;
            BLLEmpSalaryPayment bllEmpSalaryPayment = new BLLEmpSalaryPayment();
            response = bllEmpSalaryPayment.SaveEmpSalaryPayment(objEmpSalaryPayment,appID,modID);

            return JsonUtility.Serialize(response);

        }

        public object GetEmpSalaryPayment(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpSalaryPayment objBLL = new BLLEmpSalaryPayment();
            try
            {
                response = objBLL.GetEmpSalaryPayment(submissionNo);
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