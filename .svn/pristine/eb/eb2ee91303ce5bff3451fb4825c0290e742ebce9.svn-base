using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLProduct
    {
        public JsonResponse SaveProduct(List<ATTProduct> lstProd)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstProd);
                if (response.Message == "")
                {
                    DLLProduct dllProduct = new DLLProduct();
                    response.Message = dllProduct.SaveProduct(lstProd);
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

        //public JsonResponse DeleteProduct(int? productid)
        //{
        //    JsonResponse response = new JsonResponse();
        //    try
        //    {
        //        DLLProduct dllProduct = new DLLProduct();
        //        response.Message = dllProduct.DeleteProduct(productid);
        //        response.IsSucess = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSucess = false;
        //        response.Message = ex.Message;
        //    }
        //    return response;
        //}

        public JsonResponse GetProduct(int? productid)
        {
            JsonResponse response = new JsonResponse();

            List<ATTProduct> lst = new List<ATTProduct>();
            try
            {
                DLLProduct dllProduct = new DLLProduct();
                lst = dllProduct.GetProduct(productid);
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

        public string Validate(List<ATTProduct> lstProd)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTProduct obj in lstProd)
            {
                if (Validator.IsBlank(obj.ProductDescription))
                {
                    errMsg.Append("Please Enter Product Description !!!");
                    errMsg.AppendLine();
 
                }
            }

            return errMsg.ToString();

        }
    }
}
