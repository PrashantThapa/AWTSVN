using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLDocumentType
    {
       public  JsonResponse SaveDocumentType(List<ATTDocumentType> lstDocType)
       {
           JsonResponse response = new JsonResponse();
           try
           {
               response.Message = Validate(lstDocType);
                 if (response.Message == "")
                 {
                     DLLDocumentType dllDocumentType = new DLLDocumentType();
                     response.Message = dllDocumentType.SaveDocumentType(lstDocType);
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
       public  JsonResponse DeleteDocumentType(int? doctypeid)
       {
           JsonResponse response = new JsonResponse();
           try
           {
               DLLDocumentType dllDocumentType = new DLLDocumentType();
               response.Message = dllDocumentType.DeleteDocumentType(doctypeid);
               response.IsSucess = true;
           }
           catch (Exception ex)
           {
               response.IsSucess = false;
               response.Message = ex.Message;
           }
           return response;
       }
       public JsonResponse GetDocumentType(int? doctypeid, string usedfor)//// parameter usedfor added by shanjeev  for Employer DocType
       {
           JsonResponse response = new JsonResponse();
           List<ATTDocumentType> lst = new List<ATTDocumentType>();
           DLLDocumentType dllDocumentType = new DLLDocumentType();
           try
               {
                   lst = dllDocumentType.GetDocumentType(doctypeid, usedfor);

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
       public JsonResponse GetDocumentTypes(int? doctypeid)
       {
           JsonResponse response = new JsonResponse();
           List<ATTDocumentType> lst = new List<ATTDocumentType>();
           DLLDocumentType dllDocumentType = new DLLDocumentType();
           try
           {
               lst = dllDocumentType.GetDocumentTypes(doctypeid);

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
       }// for jasmin work
       public string Validate(List<ATTDocumentType> lstDocType)
       {
           StringBuilder errMsg = new StringBuilder();

           foreach (ATTDocumentType obj in lstDocType)
           {

               if (Validator.IsBlank(obj.TypeName))
               {
                   errMsg.Append("Please Enter Document Type Name !!!");
                   errMsg.AppendLine();
               }

               if (Validator.IsBlank(obj.TypeNameEng))
               {
                   errMsg.Append("Please Enter Document Type Name English !!!");
                   errMsg.AppendLine();
               }
           }


           return errMsg.ToString();
       }
   
   }
}
