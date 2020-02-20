using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer.PIS;

namespace HRFA.BLL.PAYROLL
{
	public class BLLPayrollEmpSalaryPayment
	{
		public JsonResponse ViewReport(int? OfficeCD, int? CostCenterID, int? SalYear, int? SalMonth)
		{
			JsonResponse response = new JsonResponse();
			DLLEmpSalaryPayment objDll = new DLLEmpSalaryPayment();
			try
			{
				response.ResponseData = objDll.ViewReport(OfficeCD, CostCenterID, SalYear, SalMonth);
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