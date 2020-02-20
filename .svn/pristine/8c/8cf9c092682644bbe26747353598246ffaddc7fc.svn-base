using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
using HRFA.COMMON;
namespace HRFA.BLL
{
    public class BLLLeaveType
    {
        public string SaveLeaveType(ATTLeaveType objLeaveTypeATT)
        {
            try
            {
                DLLLeaveType objLeaveTypeDLL = new DLLLeaveType();
                return objLeaveTypeDLL.SaveLeaveType(objLeaveTypeATT);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        
        }


		public List<ATTLeaveType> GetLeaveType(Int32? LeaveTypeValues)
        {
            try
            {
                DLLLeaveType obj = new DLLLeaveType();
                return obj.GetLeaveType(LeaveTypeValues);

            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }

        public List<ATTLeaveDetail> GetEmployeeLeaves(int empID)
        {           
            try
            {
                DLLLeaveType obj = new DLLLeaveType();
                return obj.GetEmployeeLeaves(empID);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

		public JsonResponse DeleteLeaveType(Int32? leavetype)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				DLLLeaveType dLLLeaveType = new DLLLeaveType();
				response.Message = dLLLeaveType.DeleteLeaveType(leavetype);
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
