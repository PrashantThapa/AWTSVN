using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.WFMS
{
    /// <summary>
    /// Summary description for EmployeeShiftAssignmentHandler
    /// </summary>
    public class EmployeeShiftAssignmentHandler : BaseHandler
    {
        public object SaveEmployeeShiftAssignment(string args)
        {
            JsonResponse response = new JsonResponse();
            List<ATTEmployeeShiftAssignment> objEmpShift = (List<ATTEmployeeShiftAssignment>)JsonUtility.DeSerialize(args, typeof(List<ATTEmployeeShiftAssignment>));
            BLLEmployeeShiftAssignment objBLLEmpShift = new BLLEmployeeShiftAssignment();

            try
            {
                response = objBLLEmpShift.SaveEmployeeShiftAssignment(objEmpShift);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetEmployeeName(int? empID, int? officeCD)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeShiftAssignment objBLLEmpShift = new BLLEmployeeShiftAssignment();

            try
            {
                response = objBLLEmpShift.GetEmployeeName(empID, officeCD);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetEmployeeShift(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeShiftAssignment objBLLEmpShift = new BLLEmployeeShiftAssignment();

            try
            {
                response = objBLLEmpShift.GetEmployeeShift(empID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        //public object GetDepartmentByOfficeCD(int? officeCD, int? deptID)
        //{
        //    JsonResponse response = new JsonResponse();
        //    BLLEmployeeShiftAssignment objBLLEmpShift = new BLLEmployeeShiftAssignment();

        //    try
        //    {
        //        response = objBLLEmpShift.GetDepartmentByOfficeCD(officeCD, deptID);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSucess = false;
        //        response.Message = ex.Message;
        //    }
        //    return JsonUtility.Serialize(response);
        //}

        public object GetDepartmentShift(int? officeCD, int? deptID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeShiftAssignment objBLLEmpShift = new BLLEmployeeShiftAssignment();

            try
            {
                response = objBLLEmpShift.GetDepartmentShift(officeCD, deptID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }
    }
}