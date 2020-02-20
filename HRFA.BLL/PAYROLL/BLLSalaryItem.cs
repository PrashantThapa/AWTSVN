using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
using HRFA.COMMON;

namespace HRFA.BLL
{
    public class BLLSalaryItem
    {
        public string SaveSalaryItem(ATTSalaryItem objSalaryItemAtt)
        {
            // string msg = "";
            //string msg = string.Empty;

            try
            {
                DLLSalaryItem objSalaryItemDll = new DLLSalaryItem();
                return objSalaryItemDll.SaveSalaryItem(objSalaryItemAtt);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            //return msg;


        }

		public JsonResponse DeleteSalaryItem(Int32? SalaryItems)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				DLLSalaryItem dLLSalaryItem = new DLLSalaryItem();
				response.Message = dLLSalaryItem.DeleteSalaryItem(SalaryItems);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		//public List<ATTSalaryItem> GetSalaryItem(Int32? SalaryItems)
  //      {
  //          try
  //          {
  //              DLLSalaryItem obj = new DLLSalaryItem();
  //              return obj.GetSalaryItem(SalaryItems);
  //          }
  //          catch (Exception ex)
  //          {
  //              throw (ex);
  //          }
            
  //      }
         public List<ATTSalaryItem> GetSalaryItemByOffice(Int32? officecode,Int32? postcode)
        {
            try
            {
                DLLSalaryItem obj = new DLLSalaryItem();
                return obj.GetSalaryItemByOffice(officecode, postcode);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            
        }
         public List<ATTSalaryItem> GetSalaryItemByOfficeSub(Int32? officecode, Int32? postcode,Int64? subno)
         {
             try
             {
                 DLLSalaryItem obj = new DLLSalaryItem();
                 return obj.GetSalaryItemByOfficeSub(officecode, postcode,subno);
             }
             catch (Exception ex)
             {
                 throw (ex);
             }

         }
         public List<ATTFunction> GetFunction(string Mode)
        {
            try
            {
                DLLSalaryItem obj = new DLLSalaryItem();
                return obj.GetFunction(Mode);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            
        }
         public ATTFuncAmount CPR_GET_PF(Int64 EmpID)
        {
            try
            {
                DLLSalaryItem obj = new DLLSalaryItem();
                return obj.CPR_GET_PF( EmpID);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            
        }
         public ATTFuncAmount CPR_GET_TAX(Int64 EmpID)
        {
            try
            {
                DLLSalaryItem obj = new DLLSalaryItem();
                return obj.CPR_GET_TAX(EmpID);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }
        public ATTFuncAmount CPR_GET_NLK( Int64 EmpID)
        {
            try
            {
                DLLSalaryItem obj = new DLLSalaryItem();
                return obj.CPR_GET_NLK( EmpID);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }
    }
}
