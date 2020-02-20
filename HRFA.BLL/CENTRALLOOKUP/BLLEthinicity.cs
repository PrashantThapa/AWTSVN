using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEthinicity
    {
         public  JsonResponse SaveEthinicity(List<ATTEthinicity> lstEthType)
        {
             JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstEthType);
                if (response.Message == "")
                {
                    DLLEthinicity dllEthinicity = new DLLEthinicity();
                    response.Message = dllEthinicity.SaveEthinicity(lstEthType);
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
         public  JsonResponse DeleteEthinicity(int? ethtypeid)
        {
             JsonResponse response = new JsonResponse();
            try
            {
                DLLEthinicity dllEthinicity = new DLLEthinicity();
                response.Message = dllEthinicity.DeleteEthinicity(ethtypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
         public  JsonResponse  GetEthinicity(int? ethtypeid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTEthinicity> lst = new List<ATTEthinicity>();
            DLLEthinicity dllEthinicity = new DLLEthinicity();
            try
            {
                lst = dllEthinicity.GetEthinicity(ethtypeid);

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

         public string Validate(List<ATTEthinicity> lstEthType)
         {
             StringBuilder errMsg = new StringBuilder();

             foreach (ATTEthinicity obj in lstEthType)
             {

                 if (Validator.IsBlank(obj.EthTypeName))
                 {
                     errMsg.Append("Please Enter Ethinicty Type Name !!!");
                     errMsg.AppendLine();
                 }

                 if (Validator.IsBlank(obj.EthTypeNameEng))
                 {
                     errMsg.Append("Please Enter Ethinicity Type Name English !!!");
                     errMsg.AppendLine();
                 }

                 if (Validator.IsBlank(obj.EthFromDate))
                 {
                     errMsg.Append("Please Enter From Date !!!");
                     errMsg.AppendLine();
                 }
             }


             return errMsg.ToString();
         }
    }
}
