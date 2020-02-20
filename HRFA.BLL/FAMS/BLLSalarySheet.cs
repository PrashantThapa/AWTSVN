using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.ATT.FAMS;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
	public class BLLSalarySheet
	{
		//public JsonResponse GetEmployeeList(Int16? officeCode)
		//{
		//    JsonResponse response = new JsonResponse();
		//    List<ATTEmployee> lst = new List<ATTEmployee>();
		//    DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
		//    try
		//    {
		//        lst = dllSalarySheet.GetEmployeeList(officeCode);

		//        response.ResponseData = lst;
		//        response.Message = "Success";
		//        response.IsSucess = true;
		//    }
		//    catch (Exception ex)
		//    {
		//        response.Message = ex.Message;
		//        response.IsSucess = false;
		//    }

		//    return response;

		//}

		public JsonResponse SaveSalarySheet(List<ATTSalarySheetEmployee> objSalarySheet)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{

					DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
					response.Message = dllSalarySheet.SaveSalarySheet(objSalarySheet);
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

		public JsonResponse GenerateSalary(Int32? officeCode, string year, Int32? month, Int32? empID)
		{
			JsonResponse response = new JsonResponse();
			DLLSalarySheet objDll = new DLLSalarySheet();
			List<ATTSalarySheetEmployee> lst = new List<ATTSalarySheetEmployee>();
			try
			{
				lst = objDll.GenerateSalary(officeCode, year, month, empID);
				response.ResponseData = lst;
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}

        public JsonResponse GetSalary(Int32? officeCode, string year, Int32? month, Int32? empID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTSalarySheetEmployee> lst = new List<ATTSalarySheetEmployee>();
            DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
            try
            {
                lst = dllSalarySheet.GetSalary(officeCode, year, month, empID);

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

        public JsonResponse GetSalaryByOffice(Int32? officeCode, Int32? costCenterID, Int32? year, Int16? month)
		{
			JsonResponse response = new JsonResponse();
			List<ATTPISEmployee> lst = new List<ATTPISEmployee>();
			DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
			try
			{
				lst = dllSalarySheet.GetSalaryByOffice(officeCode, costCenterID, year, month);

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

		public JsonResponse GetYearAndMonth(Int32? officeCode)
		{
			JsonResponse response = new JsonResponse();
			ATTEmpSalarySheet obj = new ATTEmpSalarySheet();
			DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
			try
			{
				ATTEmpSalarySheet objSalarySheet = dllSalarySheet.GetYearAndMonth(officeCode);
				response.ResponseData = objSalarySheet;

				if (objSalarySheet.SalaryYear == null || objSalarySheet.SalaryMonth == null)
					response.Message = "null";
				else
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

		public JsonResponse GetSalarySheetBySubmissionNo(Int64? submissionNo)
		{
			JsonResponse response = new JsonResponse();
			DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
			try
			{
				response.ResponseData = dllSalarySheet.GetSalarySheetBySubmissionNo(submissionNo);
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


		public JsonResponse InitiateVerification(ATTEmpSalarySheet objSalarySheet, string appID, string modID)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLSalarySheet dllSalarySheet = new DLLSalarySheet();
					response.Message = dllSalarySheet.InitiateVerification(objSalarySheet, appID, modID);
					response.IsSucess = true;
				}

			}
			catch (Exception ex)
			{
				string ecode = ex.Message.Substring(0, 16);
				if (ecode == "Error: ORA-00001")
				{
					response.Message = "Already Submitted for Verification.";
				}
				else
				{
					response.Message = ex.Message;
				}
				response.IsSucess = false;
			}


			return response;

		}
	}
}
