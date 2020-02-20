using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PAYROLL
{
    /// <summary>
    /// Summary description for EmpSalaryItemHandler
    /// </summary>
    public class EmpSalaryItemHandler : BaseHandler
    {
        public object SaveEmpSalaryItem(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTEmpSalaryItem> objEmpSalary = JsonUtility.DeSerialize(args, typeof(List<ATTEmpSalaryItem>)) as List<ATTEmpSalaryItem>; 
            
            BLLEmpSalaryItem objBLLEmpSalary = new BLLEmpSalaryItem();

            try
            {
                response = objBLLEmpSalary.SaveEmpSalaryItem(objEmpSalary, appID, modID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object DelEmpSalaryItem(Int32? EmpID, Int32? SalaryItemID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpSalaryItem objBLLEmpSalary = new BLLEmpSalaryItem();

            try
            {
                response = objBLLEmpSalary.DelEmpSalaryItem(EmpID, SalaryItemID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetEmpSalaryItem(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpSalaryItem objBLLEmpSalaryItem = new BLLEmpSalaryItem();
            try
            {
                response = objBLLEmpSalaryItem.GetEmpSalaryItem(submissionNo);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        //public object GetEmpSalaryItemByEmpID(Int64? EmpID)
        //{
        //    JsonResponse response = new JsonResponse();
        //    BLLEmpSalaryItemRate objBLLEmpSalaryItemRate = new BLLEmpSalaryItemRate();
        //    try
        //    {
        //        response = objBLLEmpSalaryItemRate.GetEmpSalaryItemByEmpID(EmpID);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Message = ex.Message;
        //        response.IsSucess = false;
        //    }
        //    return JsonUtility.Serialize(response);
        //}
    }
}

