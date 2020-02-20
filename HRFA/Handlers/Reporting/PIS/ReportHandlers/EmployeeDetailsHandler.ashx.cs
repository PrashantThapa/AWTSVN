using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace HRFA.Handlers.Reporting.PIS.ReportHandlers
{
	/// <summary>
	/// Summary description for EmployeeDetailsHandler
	/// </summary>
	public class EmployeeDetailsHandler : BaseHandler
	{

		public object GetEmployeeDetails(string SymbolNo)
		{
			JsonResponse response = new JsonResponse();
			BLLRepEmployee bllRepEmployee = new BLLRepEmployee();
			try
			{
				response = bllRepEmployee.GetEmployeeDetails(SymbolNo);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

		public object GetEmployeeQualification(Int64 pid)
		{
			JsonResponse response = new JsonResponse();
			BLLRepEmployeeQualification bllRepEmployeeQualification = new BLLRepEmployeeQualification();
			try
			{
				response = bllRepEmployeeQualification.GetEmployeeQualification(pid);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

		public object GetEmployeePostHistory(string SymbolNo)
		{
			JsonResponse response = new JsonResponse();
			BLLRepEmployeeHist bllRepEmployeeHist = new BLLRepEmployeeHist();
			try
			{
				response = bllRepEmployeeHist.GetEmployeePostHistory(SymbolNo);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}



	}
}