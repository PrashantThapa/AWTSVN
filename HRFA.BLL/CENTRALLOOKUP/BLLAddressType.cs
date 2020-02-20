using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRFA.BLL
{
    public class BLLAddressType
    {
        
        public  JsonResponse SaveAddressType(List<ATTAddressType> lstAddType)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstAddType);
                if (response.Message == "")
                {
                    DLLAddressType dllAddressType = new DLLAddressType();
                    response.Message = dllAddressType.SaveAddressType(lstAddType);
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


        public  JsonResponse DeleteAddressType(int? addresstypeid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLAddressType dllAddressType = new DLLAddressType();
                response.Message = dllAddressType.DeleteAddressType(addresstypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public  JsonResponse GetAddressType(int? addresstypeid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTAddressType> lst = new List<ATTAddressType>();
            try
            {
                DLLAddressType dllAddressType = new DLLAddressType();
                lst = dllAddressType.GetAddressType(addresstypeid);
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

        public string Validate(List<ATTAddressType> lstAddType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTAddressType obj in lstAddType)
            {

                if (Validator.IsBlank(obj.AddressName))
                {
                    errMsg.Append("Please Enter Address Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.AddressNameEnglish))
                {
                    errMsg.Append("Please Enter Address Type Name English !!!");
                    errMsg.AppendLine();
                }

            }
            return errMsg.ToString();
        }

    }
}
