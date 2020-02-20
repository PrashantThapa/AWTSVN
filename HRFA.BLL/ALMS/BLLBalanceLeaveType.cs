using System;
using System.Collections.Generic;
using HRFA.ATT.ALMS;
using HRFA.DataLayer.ALMS;
using HRFA.COMMON;


namespace HRFA.BLL.ALMS
{
	public class BLLBalanceLeaveType
	{
        //public object GetLeaveBalance(string UptoDate, int EmpID)
        //{

        //	try
        //	{
        //		DLLBalanceLeaveType obj = new DLLBalanceLeaveType();
        //		return obj.GetLeaveBalance(UptoDate, EmpID);

        //	}
        //	catch (Exception ex)
        //	{
        //		throw (ex);
        //	}

        //}
        public JsonResponse GetLeaveBalance(string UptoDate, int EmpID)
        {
            JsonResponse response = new JsonResponse();
            DLLBalanceLeaveType obj = new DLLBalanceLeaveType();
            try
            {
                response.ResponseData = obj.GetLeaveBalance(UptoDate, EmpID);
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
