using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmployeeAttendance
    {
        public JsonResponse GetEmpAttendance(int? officeCD, int? CostCenterID, int? Year, int? MonthID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeAttendance dllEmpAtt = new DLLEmployeeAttendance();
            response.ResponseData = dllEmpAtt.GetEmpAttendance(officeCD, CostCenterID, Year, MonthID);
            response.IsSucess = true;
            return response;
        }

        public JsonResponse GetEmployeeDetBySubmissionNo(Int64? SubmissionNo)
        {
            JsonResponse res = new JsonResponse();
            DLLEmployeeAttendance dllEmpAtt = new DLLEmployeeAttendance();
            try
            {
                res.ResponseData = dllEmpAtt.GetEmployeeDetBySubmissionNo(SubmissionNo);
                res.Message = "Successful";
                res.IsSucess = true;
            }
            catch (Exception e)
            {
                res.Message = e.Message;
                res.IsSucess = false;
            }
            return res;
        }

        public JsonResponse SaveEmpAttendance(List<ATTEmpAttendance> EmpAttList)
        {
            JsonResponse res = new JsonResponse();
            DLLEmployeeAttendance dllEmpAtt = new DLLEmployeeAttendance();
            try
            {
                res.Message = dllEmpAtt.SaveEmpAttendance(EmpAttList);
                res.IsSucess = true;
            }
            catch (Exception e)
            {
                res.Message = e.Message;
                res.IsSucess = false;
            }
            return res;
        }

        public JsonResponse GetWorkingDays(int? year, int? monthID)
        {
            JsonResponse res = new JsonResponse();
            DLLEmployeeAttendance dllEmpAtt = new DLLEmployeeAttendance();
            try
            {
                res.ResponseData = dllEmpAtt.GetWorkingDays( year,  monthID);
                res.IsSucess = true;
            }
            catch (Exception e)
            {
                res.Message = e.Message;
                res.IsSucess = false;
            }
            return res;
        }
    }
}
