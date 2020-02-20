﻿using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PAYROLL
{
    /// <summary>
    /// Summary description for SalaryItemHandler
    /// </summary>
    public class SalaryItemHandler : BaseHandler 
    {
        public object SaveSalaryItem(string args)
        {
            BLLSalaryItem objSalaryItemBll = new BLLSalaryItem();
            ATTSalaryItem objSalaryItemAtt = (ATTSalaryItem)JsonUtility.DeSerialize(args, typeof(ATTSalaryItem));
            JsonResponse response = new JsonResponse();
            try
            {

                response.Message = objSalaryItemBll.SaveSalaryItem(objSalaryItemAtt);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

		public object DeleteSalaryItem(Int32? SalaryItems)
		{
			JsonResponse response = new JsonResponse();

			BLLSalaryItem bLLSalaryItem = new BLLSalaryItem();

			//if (token == CurrentToken())
			//{
			response = bLLSalaryItem.DeleteSalaryItem(SalaryItems);
			//}
			//else
			//{
			//    response.Message = "Suspicious Activity !!!";
			//    response.IsSucess = false;
			//    response.IsToken = false;
			//}

			return JsonUtility.Serialize(response);

		}


		//public object GetSalaryItem(Int32? SalaryItems)
  //      {
  //          JsonResponse response = new JsonResponse();
  //          BLLSalaryItem obj = new BLLSalaryItem();
  //          List<ATTSalaryItem> lst = new List<ATTSalaryItem>();
  //          response.ResponseData = lst;
  //          try
  //          {
  //              response.Message = "Success";
  //              response.ResponseData = obj.GetSalaryItem(SalaryItems);
  //              response.IsSucess = true;
  //          }
  //          catch (Exception ex)
  //          {
  //              response.Message = ex.Message;
  //              response.IsSucess = false;
  //          }
  //          return JsonUtility.Serialize(response);

  //      }
        public object GetSalaryItemByOffice(Int32? officecode, Int32? postcode)
        {
            JsonResponse response = new JsonResponse();
            BLLSalaryItem obj = new BLLSalaryItem();
            List<ATTSalaryItem> lst = new List<ATTSalaryItem>();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetSalaryItemByOffice(officecode, postcode);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
        public object GetSalaryItemByOfficeSub(Int32? officecode, Int32? postcode, Int64? subno)
        {
            JsonResponse response = new JsonResponse();
            BLLSalaryItem obj = new BLLSalaryItem();
            List<ATTSalaryItem> lst = new List<ATTSalaryItem>();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetSalaryItemByOfficeSub(officecode, postcode,subno);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
        public object GetFunction(string Mode)
        {
            JsonResponse response = new JsonResponse();
            BLLSalaryItem obj = new BLLSalaryItem();
            List<ATTFunction> lst = new List<ATTFunction>();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetFunction(Mode);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
        public object CPR_GET_PF( Int64 EmpID)
        {
            JsonResponse response = new JsonResponse();
            BLLSalaryItem obj = new BLLSalaryItem();
            ATTFuncAmount lst = new ATTFuncAmount();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.CPR_GET_PF( EmpID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
        public object CPR_GET_TAX(Int64 EmpID)
        {
            JsonResponse response = new JsonResponse();
            BLLSalaryItem obj = new BLLSalaryItem();
            ATTFuncAmount lst = new ATTFuncAmount();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.CPR_GET_TAX(EmpID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
        public object CPR_GET_NLK(Int64 EmpID)
        {
            JsonResponse response = new JsonResponse();
            BLLSalaryItem obj = new BLLSalaryItem();
            ATTFuncAmount lst = new ATTFuncAmount();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.CPR_GET_NLK( EmpID);
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