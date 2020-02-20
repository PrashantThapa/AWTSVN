using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer.PAYROLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;



namespace HRFA.BLL.PAYROLL
{
	public class BLLShowAttendance
	{
		public JsonResponse ShowAttendance(int? OfficeCode, string SymbolNo, string FromDate, string ToDate)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{

					DLLShowAttendance dLLShowAttendance = new DLLShowAttendance();
					response.ResponseData = dLLShowAttendance.ShowAttendance(OfficeCode, SymbolNo, FromDate, ToDate);
					response.Message = "Sucessful";
					response.IsSucess = true;

				}

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
