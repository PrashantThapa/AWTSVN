using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLMedicalAtt
    {
        public  JsonResponse SaveMedicalAtt(List<ATTMedicalAtt> objMedAtt)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(objMedAtt);
                if (response.Message == "")
                {
                    DLLMedicalAtt dllMedicalAtt = new DLLMedicalAtt();
                    response.Message = dllMedicalAtt.SaveMedicalAtt(objMedAtt);
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

        public  JsonResponse GetMedicalAtt(int? MedAttID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTMedicalAtt> lst = new List<ATTMedicalAtt>();
            DLLMedicalAtt dllMedicalAtt = new DLLMedicalAtt();
            try
            {
                lst = dllMedicalAtt.GetMedicalAtt(MedAttID);

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

        public  JsonResponse DelMedicalAtt(int MedAttID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLMedicalAtt dllMedicalAtt = new DLLMedicalAtt();
                response.Message = dllMedicalAtt.DelMedicalAtt(MedAttID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
            
        }

        public string Validate(List<ATTMedicalAtt> objMedAtt)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTMedicalAtt obj in objMedAtt)
            {

                if (Validator.IsBlank(obj.MedAttName))
                {
                    errMsg.Append("Please Enter Medical Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.MedAttEngName))
                {
                    errMsg.Append("Please Enter Medical Type Name English !!!");
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
