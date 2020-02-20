using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PAYROLL
{
    /// <summary>
    /// Summary description for PostWiseSalaryItemSetupHandler
    /// </summary>
    public class PostWiseSalaryItemSetupHandler : BaseHandler
    {

        public object SavePostWiseSalaryItem(string args, string appID, string modID)
        {
            BLLPostWiseSalaryItem objBLLPostWiseSalaryItem = new BLLPostWiseSalaryItem();
            
            List<ATTPostWiseSalaryItem> objPostWiseSalaryItem = JsonUtility.DeSerialize(args, typeof(List<ATTPostWiseSalaryItem>)) as List<ATTPostWiseSalaryItem>; 
            JsonResponse response = new JsonResponse();
            try
            {

                response.Message = objBLLPostWiseSalaryItem.SavePostWiseSalaryItem(objPostWiseSalaryItem, appID, modID);
                //response.Message = "Success";
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;

            }
            return JsonUtility.Serialize(response);
        }
        public object GetPostWiseSalaryItemSubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            BLLPostWiseSalaryItem objBLLPostWise = new BLLPostWiseSalaryItem();
            try
            {
                response = objBLLPostWise.GetPostWiseSalaryItemSubNo(SubNo);
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