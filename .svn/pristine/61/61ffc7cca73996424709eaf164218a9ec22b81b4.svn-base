using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLBFICapital
    {
        public JsonResponse GetBFICapital(int? bficapid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTBFICapital> lst = new List<ATTBFICapital>();
            try
            {
                DLLBFICapital dllBfiCapital = new DLLBFICapital();
                lst = dllBfiCapital.GetBFICapital(bficapid);
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

        public JsonResponse SaveBFICaptial(List<ATTBFICapital> lstBfiCap)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstBfiCap);
                if (response.Message == "")
                {
                DLLBFICapital dllBfiCapital = new DLLBFICapital();
                response.Message = dllBfiCapital.SaveBFICapital(lstBfiCap);
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


        public JsonResponse DeleteBFICaptial(int? bficapid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLBFICapital dllBfiCapital = new DLLBFICapital();
                response.Message = dllBfiCapital.DeleteBFICapital(bficapid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }


        public string Validate(List<ATTBFICapital> lstBFICap)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTBFICapital objBFICapital in lstBFICap)
            {

                if (Validator.IsBlank(objBFICapital.BFICapNameNepali))
                {
                    errMsg.Append("Please Enter Capital Name Nepali !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(objBFICapital.BFICapNameEnglish))
                {
                    errMsg.Append("Please Enter Capital Name English !!!");
                    errMsg.AppendLine();
                }
                if (Validator.IsBlank(objBFICapital.FromDate))
                {
                    errMsg.Append("Please Enter From Date !!!");
                    errMsg.AppendLine();
                }
            }


            return errMsg.ToString();
        }
    }
}
