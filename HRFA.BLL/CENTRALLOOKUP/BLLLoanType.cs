﻿using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.ATT.COMMON;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLLoanType
    {
		
		public JsonResponse GetLoanType(int? LoanTypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTLoanType> lst = new List<ATTLoanType>();
            DLLLoanType dllLoanType = new DLLLoanType();
            try
            {
                lst = dllLoanType.GetLoanType(LoanTypeID);
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

		public JsonResponse GetGradeUnit()
		{
			JsonResponse response = new JsonResponse();
			List<ATTGradeUnit> lst = new List<ATTGradeUnit>();
			DLLLoanType dllLoanType = new DLLLoanType();
			try
			{
				lst = dllLoanType.GetGradeUnit();
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

        public JsonResponse GetGradeLevelName(int? GradeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTGradeUnit> lst = new List<ATTGradeUnit>();
            DLLLoanType dllLoanType = new DLLLoanType();
            try
            {
                lst = dllLoanType.GetGradeLevelName(GradeID);
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


        public JsonResponse GetTaxCat()
        {
            JsonResponse response = new JsonResponse();
            List<ATTTaxCat> lst = new List<ATTTaxCat>();
            DLLLoanType dllLoanType = new DLLLoanType();
            try
            {
                lst = dllLoanType.GetTaxCat();
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
    }
}