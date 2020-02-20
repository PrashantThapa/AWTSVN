using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRFA.BLL
{
    public class BLLMaritalStatus
    {
        public  JsonResponse SaveMaritalStatus(List<ATTMaritalStatus> objMarStat)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(objMarStat);
                if (response.Message == "")
                {

                    DLLMaritalStatus dllMaritalStatus = new DLLMaritalStatus();
                    response.Message = dllMaritalStatus.SaveMaritalStatus(objMarStat);
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

        public  JsonResponse GetMaritalStatus(int? MarStatID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTMaritalStatus> lst = new List<ATTMaritalStatus>();
            DLLMaritalStatus dllMaritalStatus = new DLLMaritalStatus();
            try
            {
                lst = dllMaritalStatus.GetMaritalStatus(MarStatID);

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

        public  JsonResponse DeleteMaritalStatus(int MarStatID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLMaritalStatus dllMaritalStatus = new DLLMaritalStatus();
                response.Message = dllMaritalStatus.DelMaritalStatus(MarStatID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
            
        }

        public string Validate(List<ATTMaritalStatus> objMarStat)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTMaritalStatus obj in objMarStat)
            {

                if (Validator.IsBlank(obj.MarStatName))
                {
                    errMsg.Append("Please Enter Marital Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.MarStatNameEng))
                {
                    errMsg.Append("Please Enter Marital Type Name English !!!");
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
