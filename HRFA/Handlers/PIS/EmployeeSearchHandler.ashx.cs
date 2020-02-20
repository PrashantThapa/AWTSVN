﻿using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmployeeSearchHandler
    /// </summary>
    public class EmployeeSearchHandler : BaseHandler
    {
        public object SearchEmployee(string args)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeSearch objBLLEmp = new BLLEmployeeSearch();
			ATTPISEmployee objEmp = (ATTPISEmployee)JsonUtility.DeSerialize(args, typeof(ATTPISEmployee));
			try
            {
				response = objBLLEmp.SearchEmployee(objEmp);

			}
			catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }
        public object SearchOfficeEmployee(int officeCode, int? costCenterID, int? postID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeSearch objBLLEmp = new BLLEmployeeSearch();
          
            try
            {
                response = objBLLEmp.SearchOfficeEmployee(officeCode,costCenterID,postID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }
        public object SearchPortalEmployee(string args)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeSearch objBLLEmp = new BLLEmployeeSearch();
            ATTPISEmployee objEmp = (ATTPISEmployee)JsonUtility.DeSerialize(args, typeof(ATTPISEmployee));
            try
            {
                response = objBLLEmp.SearchPortalEmployee(objEmp);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

		//public object GetEmployeelist(int PageNumber, int PageSize)
		//{
		//	JsonResponse response = new JsonResponse();
		//	BLLEmployeeSearch objBLLEmp = new BLLEmployeeSearch();

		//	try
		//	{
		//		response = objBLLEmp.GetEmployeelist(PageNumber, PageSize);
		//	}
		//	catch (Exception ex)
		//	{
		//		response.IsSucess = false;
		//		response.Message = ex.Message;
		//	}
		//	return JsonUtility.Serialize(response);
		//}

        public object GetEmployeeRegistered(int officeCode, int? pageNumber, int? pageSize, Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeSearch objBLLEmp = new BLLEmployeeSearch();

            try
            {
                response = objBLLEmp.GetEmployeeRegistered(officeCode, pageNumber, pageSize, submissionNo);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);

        }

    }
}