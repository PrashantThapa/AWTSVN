using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLBank
    {
        public JsonResponse GetAllBank(int? bankid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTBank> lst = new List<ATTBank>();
            try
            {
                DLLBank dllBank = new DLLBank();
                lst = dllBank.GetAllBank(bankid);
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

       //Added by zayesh@gmail.com
        public JsonResponse GetAccountNum(int? bankid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTBank> lst = new List<ATTBank>();
            try
            {
                DLLBank dllBank = new DLLBank();
               // lst = dllBank.GetAccountNum(bankid);
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

        public JsonResponse SaveBank(List<ATTBank> lstBank)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstBank);
                if (response.Message == "")
                {
                    DLLBank dllBank = new DLLBank();
                    response.Message = dllBank.SaveBank(lstBank);
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


        public JsonResponse DeleteBank(int? bankid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLBank dllBank = new DLLBank();
                response.Message = dllBank.DeleteBank(bankid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public string Validate(List<ATTBank> lstBank)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTBank obj in lstBank)
            {

                if (Validator.IsBlank(obj.BankName))
                {
                    errMsg.Append("Please Enter Bank Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.BankNameEn))
                {
                    errMsg.Append("Please Enter Bank Name English !!!");
                    errMsg.AppendLine();
                }

                //if (Validator.IsBlank(obj.FromDate))
                //{
                //    errMsg.Append("Please Enter From Date !!!");
                //    errMsg.AppendLine();
                //}
            }


            return errMsg.ToString();
        }
    }
}
