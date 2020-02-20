using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLReligionType
    {
        public  JsonResponse SaveReligionType(List<ATTReligionType> lstRelType)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstRelType);
                if (response.Message == "")
                {
                    DLLReligionType dllReligionType = new DLLReligionType();
                    response.Message = dllReligionType.SaveReligionType(lstRelType);
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

        public  JsonResponse DeleteReligionType(int? reltypeID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLReligionType dllReligionType = new DLLReligionType();
                response.Message = dllReligionType.DeleteReligionType(reltypeID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
            
        }
        public  JsonResponse GetReligionType(int? reltypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTReligionType> lst = new List<ATTReligionType>();
            DLLReligionType dllReligionType = new DLLReligionType();
            try
            {
                lst = dllReligionType.GetReligionType(reltypeID);

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

        public string Validate(List<ATTReligionType> lstRelType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTReligionType obj in lstRelType)
            {

                if (Validator.IsBlank(obj.ReligionTypeName))
                {
                    errMsg.Append("Please Enter Religion Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.ReligionTypeNameEng))
                {
                    errMsg.Append("Please Enter Religion Type Name English !!!");
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
