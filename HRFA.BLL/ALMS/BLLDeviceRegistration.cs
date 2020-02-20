using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLDeviceRegistration
    {
       public JsonResponse SaveDeviceRegistration(List<ATTDeviceRegistration> lstDeviceRegistration)
       {
           JsonResponse response = new JsonResponse();

           try
           {
               //response.Message = Validate(lstAddType);
               if (response.Message == "")
               {
                   DLLDeviceRegistration dllAddressType = new DLLDeviceRegistration();
                   response.Message = dllAddressType.SaveDeviceRegistration(lstDeviceRegistration);
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

       public JsonResponse GetDeviceRegistration(int? officeCode)
       {
           JsonResponse response = new JsonResponse();
           List<ATTDeviceRegistration> lst = new List<ATTDeviceRegistration>();
           try
           {
               DLLDeviceRegistration dllDeviceReg = new DLLDeviceRegistration();
               lst = dllDeviceReg.GetDeviceRegistration(officeCode);
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

       public JsonResponse DeleteDeviceRegistration(ATTDeviceRegistration objDevice)
       {
           JsonResponse response = new JsonResponse();
           try
           {
               DLLDeviceRegistration dllDeviceReg = new DLLDeviceRegistration();
               response.Message = dllDeviceReg.DeleteDeviceRegistration(objDevice);
               response.IsSucess = true;
           }
           catch (Exception ex)
           {
               response.IsSucess = false;
               response.Message = ex.Message;
           }
           return response;
       }
    }
}
