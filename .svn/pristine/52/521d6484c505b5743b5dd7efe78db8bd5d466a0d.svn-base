using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLContactType
    {
        public  JsonResponse SaveContactType(List<ATTContactType> lstConType)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstConType);
                if (response.Message == "")
                {
                    DLLContactType dllContactType = new DLLContactType();
                    response.Message = dllContactType.SaveContactType(lstConType);
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


        public  JsonResponse DeleteContactType(int? contacttypeid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLContactType dllContactType = new DLLContactType();
                response.Message = dllContactType.DeleteContactType(contacttypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public  JsonResponse GetContactType(int? contacttypeid)
        {
             JsonResponse response = new JsonResponse();
             List<ATTContactType> lst = new List<ATTContactType>();
             DLLContactType dllContactType = new DLLContactType();
            try
            {

                lst = dllContactType.GetContactType(contacttypeid);

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

        public string Validate(List<ATTContactType> lstConType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTContactType obj in lstConType)
            {

                if (Validator.IsBlank(obj.TypeName))
                {
                    errMsg.Append("Please Enter Contact Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.TypeNameEng))
                {
                    errMsg.Append("Please Enter Contact Type Name English !!!");
                    errMsg.AppendLine();
                }
            }


            return errMsg.ToString();
        }
        
    }
}
