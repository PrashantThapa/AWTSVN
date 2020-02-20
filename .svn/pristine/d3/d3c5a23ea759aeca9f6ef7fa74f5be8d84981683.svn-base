using HRFA.ATT;
using HRFA.ATT.PAYROLL;
using HRFA.COMMON;
using HRFA.DataLayer.PAYROLL;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRFA.BLL.PAYROLL
{
	public class BLLGrades
	{
		//public JsonResponse SaveGrade(List<ATTGrades> lstGrade)
		//{
		//	JsonResponse response = new JsonResponse();

		//	try
		//	{

		//		DLLGrade dLLGrade = new DLLGrade();
		//		response.Message = dLLGrade.SaveGrade(lstGrade);
		//		response.IsSucess = true;

		//	}
		//	catch (Exception ex)
		//	{
		//		response.Message = ex.Message;
		//		response.IsSucess = false;
		//	}
		//	return response;
		//}

		public JsonResponse DeleteGrade(int? gradeid)
		{
			JsonResponse response = new JsonResponse();
			try
			{
				DLLGrade dLLGrade = new DLLGrade();
				response.Message = dLLGrade.DeleteGrade(gradeid);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		public JsonResponse GetGrade(int? gradeid)
		{
			JsonResponse response = new JsonResponse();
			List<ATTGradeLevel> lst = new List<ATTGradeLevel>();
			try
			{
				DLLGrade dllAddressType = new DLLGrade();
				lst = dllAddressType.GetGrade(gradeid);
				response.ResponseData = lst;
				response.Message = "Success";
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}

			return response;
		}


		private string Validate(List<ATTGradeLevel> ATTGrade)
		{
			throw new NotImplementedException();
		}
	}
}
