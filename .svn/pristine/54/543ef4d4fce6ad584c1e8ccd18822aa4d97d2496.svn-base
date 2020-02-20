using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLPostWiseSalaryItem
    {
        public string SavePostWiseSalaryItem(List<ATTPostWiseSalaryItem> objPostWiseSalaryItem, string appID, string modID)
        {
            // string msg = "";
            string msg = string.Empty;

            try
            {
                DLLPostWiseSalaryItem objSubs = new DLLPostWiseSalaryItem();
                msg = objSubs.SavePostWiseSalaryItem(objPostWiseSalaryItem, appID, modID);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return msg;


        }
        public JsonResponse GetPostWiseSalaryItemSubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            DLLPostWiseSalaryItem objDll = new DLLPostWiseSalaryItem();
            List<ATTPostWiseSalaryItem> lst = new List<ATTPostWiseSalaryItem>();
            try
            {
                lst = objDll.GetPostWiseSalaryItemSubNo(SubNo);
                response.ResponseData = lst;
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
