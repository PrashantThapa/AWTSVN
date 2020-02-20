using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmpSalaryItem
    {
        public JsonResponse SaveEmpSalaryItem(List<ATTEmpSalaryItem> objEmpSalary, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpSalaryItem objDll = new DLLEmpSalaryItem();
            try
            {
                response.Message = objDll.SaveEmpSalaryItem(objEmpSalary, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse DelEmpSalaryItem(Int32? EmpID, Int32? SalaryItemID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpSalaryItem objDll = new DLLEmpSalaryItem();
            try
            {
                response.Message = objDll.DelEmpSalaryItem(EmpID, SalaryItemID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetEmpSalaryItem(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpSalaryItem objDll = new DLLEmpSalaryItem();
            List<ATTEmpSalaryItem> lst = new List<ATTEmpSalaryItem>();
            try
            {
                lst = objDll.GetEmpSalaryItem(submissionNo);
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
