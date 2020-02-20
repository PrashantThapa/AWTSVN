using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using HRFA.DataLayer.PAYROLL;

namespace HRFA.BLL.PAYROLL
{
	public class BLLPayrollSalarySheetAdjustment
	{
		public JsonResponse ViewReport(int? OfficeCD, int? CostCenterID, int? SalYear, int? SalMonth)
		{
			JsonResponse response = new JsonResponse();
			DLLPayrollSalarySheetAdjustment objDll = new DLLPayrollSalarySheetAdjustment();
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