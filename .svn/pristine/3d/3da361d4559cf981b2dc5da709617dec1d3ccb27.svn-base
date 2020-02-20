using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLState
    {
        public JsonResponse SaveState(List<ATTState> lstState)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                
                
                    DLLState dllState = new DLLState();
                    response.Message = dllState.SaveState(lstState);
                    response.IsSucess = true;
                
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
        public JsonResponse DeleteState(int? statecd)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLState dllState = new DLLState();
                response.Message = dllState.DeleteState(statecd);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetState(int? statecd)
        {
            JsonResponse response = new JsonResponse();
            List<ATTState> lst = new List<ATTState>();
            DLLState dllState = new DLLState();
            try
            {
                lst = dllState.GetState(statecd);

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
       
    }
}
