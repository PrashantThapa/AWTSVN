using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLPosition
    {
        public JsonResponse SavePosition(List<ATTPosition> lstPos)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstPos);
                if (response.Message == "")
                {
                    DLLPosition dllPosition = new DLLPosition();
                    response.Message = dllPosition.SavePosition(lstPos);
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


        public JsonResponse DeletePosition(int? positionid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLPosition dllPosition = new DLLPosition();
                response.Message = dllPosition.DeletePosition(positionid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetPosition(int? positionid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTPosition> lst = new List<ATTPosition>();
            try
            {
                DLLPosition dllPosition = new DLLPosition();
                lst = dllPosition.GetPosition(positionid);
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

        public string Validate(List<ATTPosition> lstPos)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTPosition obj in lstPos)
            {

                if (Validator.IsBlank(obj.PosName))
                {
                    errMsg.Append("Please Enter Position Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.PosEngName))
                {
                    errMsg.Append("Please Enter Position Name English !!!");
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
