

using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{
    /// <summary>
    /// Summary description for BankAccountHandler
    /// </summary>
    public class BankAccountHandler : BaseHandler
    {

        public object SaveBankAccount(string args)
        {
            JsonResponse response = new JsonResponse();
            
            BLLBankAccount bllBank = new BLLBankAccount();
            //ATTBankAccount objLst = JsonUtility.DeSerialize(args, typeof(ATTBankAccount)) as ATTBankAccount;
            List<ATTBankAccount> lstBank = JsonUtility.DeSerialize(args, typeof(List<ATTBankAccount>)) as List<ATTBankAccount>;
            response = bllBank.SaveBankAccount(lstBank);
            return JsonUtility.Serialize(response);
        }
        public object GetBankLsts(Int32? BankId, Int32? OfficeCD)
        {

            BLLBankAccount obj = new BLLBankAccount();
            //ATTOffice offcode = JsonUtility.DeSerialize(args, typeof(ATTOffice)) as ATTOffice;

            //List<ATTOffice> lst = obj.GetAllOffice();
            List<ATTBankAccount> lst = new List<ATTBankAccount>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetBankLsts(BankId, OfficeCD);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }
        public object GetBankAccount(Int32? EmpID)
        {

            BLLBankAccount obj = new BLLBankAccount();
            //ATTOffice offcode = JsonUtility.DeSerialize(args, typeof(ATTOffice)) as ATTOffice;

            //List<ATTOffice> lst = obj.GetAllOffice();
            List<ATTBankAccount> lst = new List<ATTBankAccount>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetBankAccount(EmpID);
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