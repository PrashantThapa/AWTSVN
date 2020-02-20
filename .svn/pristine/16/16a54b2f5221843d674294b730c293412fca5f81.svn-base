using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLDepartment
    {
        public JsonResponse SaveDepartmentSetup(ATTDepartment objATT) {
            JsonResponse response = new JsonResponse();
            DLLDepartment dllDepartment = new DLLDepartment();
            try
            {
                response.Message = dllDepartment.SaveDepartmentSetup(objATT);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
                throw;
            }
           
            return response;
        }
        public JsonResponse GetDepartment(int officeCode, int? deptID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTDepartment> lst = new List<ATTDepartment>();
            try
            {
                DLLDepartment dllPosition = new DLLDepartment();
                lst = dllPosition.GetDepartment(officeCode, deptID);
                response.ResponseData = lst;
                response.Message = "Success";
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }

            return response;
        }
    }
}
