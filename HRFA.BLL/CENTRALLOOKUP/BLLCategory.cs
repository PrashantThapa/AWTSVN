using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLCategory
    {
        public JsonResponse SaveCategory(List<ATTCategory> lstCat)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstCat);
                if (response.Message == "")
                {
                    DLLCategory dllCategory = new DLLCategory();
                    response.Message = dllCategory.SaveCategory(lstCat);
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

        public JsonResponse DeleteCategory(int? categoryid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLCategory dllCategory = new DLLCategory();
                response.Message = dllCategory.DeleteCategory(categoryid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }


        public JsonResponse GetCategory(int? categoryid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTCategory> lst = new List<ATTCategory>();
            try
            {
                DLLCategory dllCategory = new DLLCategory();
                lst = dllCategory.GetCategory(categoryid);
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

        public string Validate(List<ATTCategory> lstCat)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTCategory obj in lstCat)
            {

                if (Validator.IsBlank(obj.CategoryName))
                {
                    errMsg.Append("Please Enter Category Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.CategoryNameEnglish))
                {
                    errMsg.Append("Please Enter Category Name English !!!");
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
