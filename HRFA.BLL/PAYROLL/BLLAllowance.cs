using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL
{
    public class BLLAllowance
    {
        public JsonResponse SaveAllowance(List<ATTAllowance> allowances, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLAllowance dllAllowance = new DLLAllowance();
                    response.Message = dllAllowance.SaveAllowance(allowances, appID, modID);
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

        public JsonResponse LoadMonthlyAllowance(string empID, string fiscalYear)
        {
            JsonResponse response = new JsonResponse();
            DLLAllowance dllAllowance = new DLLAllowance();
            try
            {
                response.ResponseData = dllAllowance.LoadMonthlyAllowance(empID, fiscalYear);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse LoadYearlyAllowance( string fiscalYear)
        {
            JsonResponse response = new JsonResponse();
            DLLAllowance dllAllowance = new DLLAllowance();
            try
            {
                response.ResponseData = dllAllowance.LoadYealyAllowance(fiscalYear);
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
