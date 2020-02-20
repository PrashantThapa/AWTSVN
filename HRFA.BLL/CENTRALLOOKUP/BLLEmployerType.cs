using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLEmployerType
    {
        public  JsonResponse SaveEmployerType(List<ATTEmployerType> lstEmpType)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstEmpType);
                if (response.Message == "")
                {
                    DLLEmployerType dllEmployerType = new DLLEmployerType();
                    response.Message = dllEmployerType.SaveEmployerType(lstEmpType);
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
        public  JsonResponse DeleteEmployerType(int? emptypeid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLEmployerType dllEmployerType = new DLLEmployerType();
                response.Message = dllEmployerType.DeleteEmployerType(emptypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public  JsonResponse GetEmployerType(int? emptypeid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTEmployerType> lst = new List<ATTEmployerType>();
            DLLEmployerType dllEmployerType = new DLLEmployerType();
            try
            {
                lst = dllEmployerType.GetEmployerType(emptypeid);

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


        public string Validate(List<ATTEmployerType> lstEmpType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTEmployerType obj in lstEmpType)
            {

                if (Validator.IsBlank(obj.ETypeName))
                {
                    errMsg.Append("Please Enter Employer Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.ETypeNameEng))
                {
                    errMsg.Append("Please Enter Employer Type Name English !!!");
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
