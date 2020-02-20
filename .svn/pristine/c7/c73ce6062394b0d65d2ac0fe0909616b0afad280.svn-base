using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLSkillType
    {
        public  JsonResponse SaveSkillType(List<ATTSkillType> lstSkillType)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = Validate(lstSkillType);
                if (response.Message == "")
                {

                    DLLSkillType dllSkillType = new DLLSkillType();
                    response.Message = dllSkillType.SaveSkillType(lstSkillType);
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

        public  JsonResponse DeleteSkillType(int? skillTypeID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLSkillType dllSkillType = new DLLSkillType();
                response.Message = dllSkillType.DeleteSkillType(skillTypeID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
            
        }
        public  JsonResponse GetSkillType(int? skillTypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTSkillType> lst = new List<ATTSkillType>();
            DLLSkillType dllSkillType = new DLLSkillType();
            try
            {
                lst = dllSkillType.GetSkillType(skillTypeID);

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

        public string Validate(List<ATTSkillType> lstSkillType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTSkillType obj in lstSkillType)
            {

                if (Validator.IsBlank(obj.SkillTypeName))
                {
                    errMsg.Append("Please Enter Skill Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.SkillTypeNameEng))
                {
                    errMsg.Append("Please Enter Skill Type Name English !!!");
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
