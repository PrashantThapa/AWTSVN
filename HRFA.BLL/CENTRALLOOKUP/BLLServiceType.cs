using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLServiceType
    {
        public  JsonResponse SaveServiceType(List<ATTServiceType> lstSerType)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstSerType);
                if (response.Message == "")
                {
                    DLLServiceType dllServiceType = new DLLServiceType();
                    response.Message = dllServiceType.SaveServiceType(lstSerType);
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
        public  JsonResponse DeleteServiceType(int? sertypeid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLServiceType dllServiceType = new DLLServiceType();
                response.Message = dllServiceType.DeleteServiceType(sertypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
           
        }
        public  JsonResponse GetServiceType(int? sertypeid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTServiceType> lst = new List<ATTServiceType>();
            DLLServiceType dllServiceType = new DLLServiceType();
            try
            {
                lst = dllServiceType.GetServiceType(sertypeid);

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

        public string Validate(List<ATTServiceType> lstSerType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTServiceType obj in lstSerType)
            {

                if (Validator.IsBlank(obj.STypeName))
                {
                    errMsg.Append("Please Enter Service Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.STypeNameEng))
                {
                    errMsg.Append("Please Enter Service Type Name English !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.FromDate))
                {
                    errMsg.Append("Please Enter From Date !!!");
                    errMsg.AppendLine();
                }
            }


            return errMsg.ToString();
        }
    }
}
