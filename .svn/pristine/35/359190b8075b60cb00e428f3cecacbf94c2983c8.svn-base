using HRFA.COMMON;
using System;
using HRFA.ATT;
using HRFA.ATT.PAYROLL;
using HRFA.BLL;
using HRFA.BLL.PAYROLL;
using System.Collections.Generic;

namespace HRFA.PAYROLL.ReportHandlers
	{
		/// <summary>
		/// Summary description for EmpSalaryReportsHandler
		/// </summary>
		public class SalarySheetAdjustmentReportHandler : BaseHandler
		{
			public object ViewReport(int? OfficeCD, int? CostCenterID, int? SalYear, int? SalMonth)
			{
				BLLPayrollSalarySheetAdjustment obj = new BLLPayrollSalarySheetAdjustment();
				//ATTOffice offcode = JsonUtility.DeSerialize(args, typeof(ATTOffice)) as ATTOffice;

				//List<ATTOffice> lst = obj.GetAllOffice();
				List<ATTPayrollSalarySheetAdjustment> lst = new List<ATTPayrollSalarySheetAdjustment>();

				JsonResponse response = new JsonResponse
				{
					ResponseData = lst
				};
				try
				{
					response.Message = "Success";
					response.ResponseData = obj.ViewReport(OfficeCD, CostCenterID, SalYear, SalMonth);
					response.IsSucess = true;
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
