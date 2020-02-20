using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLBankAccount
    {
        public JsonResponse SaveBankAccount(List<ATTBankAccount> lstBankAccount)
        {

            JsonResponse response = new JsonResponse();

            try
            {

                if (response.Message == "")
                {
                    DLLBankAccount objdllAccountChart = new DLLBankAccount();
                    response.Message = objdllAccountChart.SaveBankAccount(lstBankAccount);
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
        public List<ATTBankAccount> GetBankLsts(Int32? BankId, Int32? OfficeCD)
        {
            try
            {
                DLLBankAccount obj = new DLLBankAccount();
                return obj.GetBankLsts(BankId, OfficeCD);
            }
            catch (Exception ex)
            {

                throw (ex);
            }

        }
        public List<ATTBankAccount> GetBankAccount(Int32? EmpID)
        {
            try
            {
                DLLBankAccount obj = new DLLBankAccount();
                return obj.GetBankAccount(EmpID);
            }
            catch (Exception ex)
            {

                throw (ex);
            }

        }
    }
}
