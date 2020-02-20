﻿using HRFA.ATT;
using HRFA.ATT.ALMS;
using HRFA.BLL;
using HRFA.BLL.ALMS;
using HRFA.COMMON;
using System;
using System.Collections.Generic;

namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for LeaveTypeHandler
    /// </summary>
    public class LeaveTypeHandler : BaseHandler
    {
        public object SaveLeaveType(string args)
        {
            BLLLeaveType objLeaveTypeBLL = new BLLLeaveType();
            ATTLeaveType objLeaveTypeATT = (ATTLeaveType)JsonUtility.DeSerialize(args, typeof(ATTLeaveType));
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = objLeaveTypeBLL.SaveLeaveType(objLeaveTypeATT);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }


		// Get LeaveType

		public object GetLeaveType(Int32? LeaveTypeValues)
        {
            BLLLeaveType obj = new BLLLeaveType();

            List<ATTLeaveType> lst = new List<ATTLeaveType>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetLeaveType(LeaveTypeValues);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        
        }

        public object GetEmployeeLeaves(Int32 EMPID)
        {
            BLLLeaveType obj = new BLLLeaveType();

            List<ATTLeaveDetail> lst = new List<ATTLeaveDetail>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetEmployeeLeaves(EMPID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
		public object DeleteLeaveType(Int32? leavetype)
		{
			JsonResponse response = new JsonResponse();

			BLLLeaveType bLLLeaveType = new BLLLeaveType();


			response = bLLLeaveType.DeleteLeaveType(leavetype);


			return JsonUtility.Serialize(response);

		}
		public object GetLeaveBalance(string UptoDate, int EmpID)
		{
            //BLLBalanceLeaveType obj = new BLLBalanceLeaveType();

            //List<ATTBalanceLeaveType> lst = new List<ATTBalanceLeaveType>();

            //JsonResponse response = new JsonResponse();
            //response.ResponseData = lst;
            //try
            //{
            //	response.Message = "Success";
            //	response.ResponseData = obj.GetLeaveBalance(UptoDate, EmpID);
            //	response.IsSucess = true;
            //}
            //catch (Exception ex)
            //{
            //	response.Message = ex.Message;
            //	response.IsSucess = false;
            //}
            //return JsonUtility.Serialize(response);

            JsonResponse response = new JsonResponse();
            BLLBalanceLeaveType obj = new BLLBalanceLeaveType();
            response = obj.GetLeaveBalance(UptoDate, EmpID);
            return JsonUtility.Serialize(response);

        }
    }
 }