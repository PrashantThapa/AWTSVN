//using HRFA.BLL.REPORTING;
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
	public class EmployeeSalaryPaymentHandler : BaseHandler
	{
		public object ViewReport(int? OfficeCD, int? CostCenterID, int? SalYear, int? SalMonth)
		{
			BLLPayrollEmpSalaryPayment obj = new BLLPayrollEmpSalaryPayment();
			//ATTOffice offcode = JsonUtility.DeSerialize(args, typeof(ATTOffice)) as ATTOffice;

			//List<ATTOffice> lst = obj.GetAllOffice();
			List<ATTPayrollEmpSalaryPayment> lst = new List<ATTPayrollEmpSalaryPayment>();

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

			//string OfficeCode = HttpContext.Current.Request.Form["OfficeCode"];
			//         string CostCenterID = HttpContext.Current.Request.Form["CostCenterID"];
			//         string Year = HttpContext.Current.Request.Form["Year"];
			//         string Month = HttpContext.Current.Request.Form["Month"];
			//         // string PostID = HttpContext.Current.Request.Form["PostID"];

			//         if (CostCenterID == "" || CostCenterID == "undefined")
			//         {
			//             CostCenterID = null;
			//         }

			//         if (Year == "" || Year == "undefined")
			//         {
			//             Year = null;
			//         }

			//         if (Month == "" || Month == "undefined")
			//         {
			//             Month = null;
			//         }

			//         CrystalReport report = new CrystalReport();
			//         report.UserID = "HR_OWNER";
			//         report.Password = "HR_OWNER";
			//         report.ReportFilePath = context.Server.MapPath(@"..\Reports\EmpSalaryReport.rpt");
			//         report.ParamList.Add(new ReportParameter("P_OFFICE_CD", OfficeCode));
			//         report.ParamList.Add(new ReportParameter("P_COSTCENTER", CostCenterID));
			//         report.ParamList.Add(new ReportParameter("P_YEAR", Year));
			//         report.ParamList.Add(new ReportParameter("P_MONTH", Month));
			//         context.Session["HRFA_Report"] = report;
			//         context.Response.Redirect("/Reporting/CommonReportViewer.aspx");
		}

		public bool IsReusable
		{
			get
			{
				return false;
			}
		}
	}
}
