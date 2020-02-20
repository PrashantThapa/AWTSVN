using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLEmployeeShiftAssignment
    {
        public JsonResponse SaveEmployeeShiftAssignment(List<ATTEmployeeShiftAssignment> objEmpShift)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeShiftAssignment objDll = new DLLEmployeeShiftAssignment();
            try
            {
                response.Message = objDll.SaveEmployeeShiftAssignment(objEmpShift);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetEmployeeName(int? empID, int? officeCD)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeShiftAssignment objDll = new DLLEmployeeShiftAssignment();
            try
            {
                response.ResponseData = objDll.GetEmployeeName(empID, officeCD);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetEmployeeShift(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeShiftAssignment objDll = new DLLEmployeeShiftAssignment();
            try
            {
                response.ResponseData = objDll.GetEmployeeShift(empID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        //public JsonResponse GetDepartmentByOfficeCD(int? officeCD, int? deptID)
        //{
        //    JsonResponse response = new JsonResponse();
        //    DLLEmployeeShiftAssignment objDll = new DLLEmployeeShiftAssignment();
        //    try
        //    {
        //        response.ResponseData = objDll.GetDepartmentByOfficeCD(officeCD, deptID);
        //        response.IsSucess = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSucess = false;
        //        response.Message = ex.Message;
        //    }
        //    return response;
        //}

        public JsonResponse GetDepartmentShift(int? officeCD, int? deptID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeShiftAssignment objDll = new DLLEmployeeShiftAssignment();
            try
            {
                response.ResponseData = objDll.GetDepartmentShift(officeCD, deptID);
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
