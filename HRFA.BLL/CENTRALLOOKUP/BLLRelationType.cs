using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLRelationType
    {

        public  JsonResponse SaveRelationType(List<ATTRelationType> lstRelType)
        {

            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstRelType);

                if (response.Message == "")
                {
                    DLLRelationType dlRelationType = new DLLRelationType();
                    response.Message = dlRelationType.SaveRelationType(lstRelType);
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

        public  JsonResponse  DeleteRelationType(int? reltypeID)
        {
            
            JsonResponse response = new JsonResponse();

            try
            {
                DLLRelationType dlRelationType = new DLLRelationType();
                response.Message = dlRelationType.DeleteRelationType(reltypeID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }

            return response;

        }
        
        public  JsonResponse GetRelationType(int? reltypeID)
        {
                       
            JsonResponse response = new JsonResponse();
            List<ATTRelationType> lst = new List<ATTRelationType>();
            DLLRelationType dlRelationType = new DLLRelationType();
            try
            {
                lst = dlRelationType.GetRelationType(reltypeID);

                response.ResponseData = lst;
                response.Message = "Success";
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }

            //return response;
            //try
            //{
            //    for (int i = 1; i < 10; i++)
            //    {

            //        ATTRelationType obj = new ATTRelationType();

            //        obj.RelTypeID = i;
            //        obj.RelTypeName = "Father" + i;
            //        obj.RelTypeNameEng = "Father" + i;
            //        obj.Status = i % 2 == 0 ? true : false;
            //        obj.FromDate = "2070.09.0" + i;
            //        obj.Action = "";

            //        lst.Add(obj);
            //    }


            //    response.ResponseData = lst;
            //    response.Message = "Success";
            //    response.IsSucess = true;
            //}
            //catch (Exception ex)
            //{
            //    response.Message = ex.Message;
            //    response.IsSucess = false;
            //}

            return response;
        }

        public string Validate(List<ATTRelationType> lstRelType)
        {
            StringBuilder errMsg = new StringBuilder();
            
            foreach (ATTRelationType obj in lstRelType)
            {

                if (Validator.IsBlank(obj.RelTypeName))
                {
                    errMsg.Append("Please Enter Relation Type Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.RelTypeNameEng))
                {
                    errMsg.Append("Please Enter Relation Type English !!!");
                    errMsg.AppendLine();
                }
            }
            

            return errMsg.ToString();
        }
    }
}
