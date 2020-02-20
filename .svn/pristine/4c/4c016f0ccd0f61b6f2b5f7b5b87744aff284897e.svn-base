using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLDesignation
    {
       public  JsonResponse SaveDesignation(List<ATTDesignation> lstDesType)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstDesType);
                if (response.Message == "")
                {
                    DLLDesignation dllDesignation = new DLLDesignation();
                    response.Message = dllDesignation.SaveDesignation(lstDesType);
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
       public  JsonResponse DeleteDesignation(int? destypeid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLDesignation dllDesignation = new DLLDesignation();
                response.Message = dllDesignation.DeleteDesignation(destypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
       public  JsonResponse GetDesignation(int? destypeid)
        {
           JsonResponse response = new JsonResponse();
           List<ATTDesignation> lst = new List<ATTDesignation>();
           DLLDesignation dllDesignation = new DLLDesignation();
            try
            {
                lst = dllDesignation.GetDesignation(destypeid);

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
       public string Validate(List<ATTDesignation> lstDesType)
       {
           StringBuilder errMsg = new StringBuilder();

           foreach (ATTDesignation obj in lstDesType)
           {

               if (Validator.IsBlank(obj.DesTypeName))
               {
                   errMsg.Append("Please Enter Designation Type Name !!!");
                   errMsg.AppendLine();
               }

               if (Validator.IsBlank(obj.DesTypeNameEng))
               {
                   errMsg.Append("Please Enter Designation Type Name English !!!");
                   errMsg.AppendLine();
               }

               if (Validator.IsBlank(obj.DesFromDate))
               {
                   errMsg.Append("Please Enter From Date !!!");
                   errMsg.AppendLine();
               }
           }


           return errMsg.ToString();
       }
   
   }
}
