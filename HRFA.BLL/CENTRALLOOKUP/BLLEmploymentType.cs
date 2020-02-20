using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLEmploymentType
    {
        public  JsonResponse SaveEmploymentType(List<ATTEmploymentType> objEmp)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(objEmp);
                if (response.Message == "")
                {
                    DLLEmploymentType dllEmploymentType = new DLLEmploymentType();
                    response.Message = dllEmploymentType.SaveEmploymentType(objEmp);
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

        public  JsonResponse GetEmploymentType(int? EmpTypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTEmploymentType> lst = new List<ATTEmploymentType>();
            DLLEmploymentType dllEmploymentType = new DLLEmploymentType();
            try
            {
                lst = dllEmploymentType.GetEmploymentType(EmpTypeID);

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

        public  JsonResponse DeleteEmploymentType(int EmpTypeID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLEmploymentType dllEmploymentType = new DLLEmploymentType();
                response.Message = dllEmploymentType.DelEmploymentType(EmpTypeID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
            
        }

        public string Validate(List<ATTEmploymentType> objEmp)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTEmploymentType obj in objEmp)
            {

                if (Validator.IsBlank(obj.EmpTypeName))
                {
                    errMsg.Append("Please Enter Employment Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.EmpTypeNameEng))
                {
                    errMsg.Append("Please Enter Employment Type Name English !!!");
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
