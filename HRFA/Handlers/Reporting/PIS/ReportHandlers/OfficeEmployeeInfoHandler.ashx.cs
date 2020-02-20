﻿using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;
using HRFA.BLL;

namespace HRFA.Reporting.PIS.ReportHandlers
{

	public class OfficeEmployeeInfoHandler : BaseHandler
	{

		public object GetEmployeeInfo(Int64 officecd)

		{
			JsonResponse response = new JsonResponse();
			BLLRepOfficeInfo bllRepOfficeInfo = new BLLRepOfficeInfo();
			try
			{
				response = bllRepOfficeInfo.GetEmployeeInfo(officecd);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

		//public object GetDepartmentList(Int64 officecd)

		//{
		//	JsonResponse response = new JsonResponse();
		//	BLLGetDepartmentList bllGetDepartmentList = new BLLGetDepartmentList();
		//	try
		//	{
		//		response = bllGetDepartmentList.GetDepartmentList(officecd);
		//	}
		//	catch (Exception ex)
		//	{
		//		response.Message = ex.Message;
		//		response.IsSucess = false;
		//	}
		//	return JsonUtility.Serialize(response);
		//}

	}
}