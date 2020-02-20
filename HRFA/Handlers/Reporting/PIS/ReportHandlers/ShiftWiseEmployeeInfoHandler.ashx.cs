//using System.Web;
//using HRFA.COMMON;
//using System.Web.SessionState;

//namespace HRFA.Reporting.PIS.ReportHandlers
//{
//    /// <summary>
//    /// Summary description for ShiftWiseEmployeeInfoHandler
//    /// </summary>
//    public class ShiftWiseEmployeeInfoHandler : IHttpHandler, IRequiresSessionState
//    {

//        public void ProcessRequest(HttpContext context)
//        {
//            string OfficeCode = "";
//            string DeptID = "";
//            OfficeCode = HttpContext.Current.Request.Form["OfficeCode"];
//            DeptID = HttpContext.Current.Request.Form["DeptID"];

//            if (OfficeCode == "undefined" || OfficeCode == "")
//            {
//                OfficeCode = null;
//            }
//            if (DeptID == "undefined" || DeptID == "")
//            {
//                DeptID = null;
//            }

//           

//            report.UserID = "HR_OWNER";
//            report.Password = "HR_OWNER";
//            report.ReportFilePath = context.Server.MapPath(@"..\Reports\ShiftWiseEmployeeInfo.rpt");
//            report.ParamList.Add(new ReportParameter("P_OFFICE_CD", OfficeCode));
//            report.ParamList.Add(new ReportParameter("P_DEPT_ID", DeptID));

//            context.Session["HRFA_Report"] = report;
//            context.Response.Redirect("/Reporting/CommonReportViewer.aspx");


//        }

//        public bool IsReusable
//        {
//            get
//            {
//                return false;
//            }
//        }
//    }
//}

using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;

namespace HRFA.Reporting.PIS.ReportHandlers
{

	public class ShiftWiseEmployeeInfoHandler : BaseHandler
	{

		public object GetShiftWiseReport(Int64 officecd, Int64 deptid)

		{
			JsonResponse response = new JsonResponse();
			BLLRepShiftWiseInfo bLLRepShiftWiseInfo = new BLLRepShiftWiseInfo();
			try
			{
				response = bLLRepShiftWiseInfo.GetShiftWiseReport(officecd, deptid);
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