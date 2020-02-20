using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLLiteracyType
    {
        public  JsonResponse SaveLiteracyType(List<ATTLiteracyType> lstLitType)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstLitType);
                if (response.Message == "")
                {
                    DLLLiteracyType dllLiteracyType = new DLLLiteracyType();
                    response.Message = dllLiteracyType.SaveLiteracyType(lstLitType);
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

        public  JsonResponse DeleteLiteracyType(int? litTypeID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLLiteracyType dllLiteracyType = new DLLLiteracyType();
                response.Message = dllLiteracyType.DeleteLiteracyType(litTypeID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
            
        }
        public  JsonResponse GetLiteracyType(int? litTypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTLiteracyType> lst = new List<ATTLiteracyType>();
            DLLLiteracyType dllLiteracyType = new DLLLiteracyType();
            try
            {
                lst = dllLiteracyType.GetLiteracyType(litTypeID);

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

        public string Validate(List<ATTLiteracyType> lstLitType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTLiteracyType obj in lstLitType)
            {

                if (Validator.IsBlank(obj.LiteracyTypeName))
                {
                    errMsg.Append("Please Enter Literacy Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.LiteracyTypeNameEng))
                {
                    errMsg.Append("Please Enter Literacy Type Name English !!!");
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
