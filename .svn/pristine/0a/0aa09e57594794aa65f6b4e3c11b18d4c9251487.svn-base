using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.CENTRALLOOKUP
{

    public class StateHandler : BaseHandler
    {
        public object SaveState(string State, string token)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
            BLLState bllState = new BLLState();
            List<ATTState> objState = JsonUtility.DeSerialize(State, typeof(List<ATTState>)) as List<ATTState>;
            response = bllState.SaveState(objState);
            //}
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}
            return JsonUtility.Serialize(response);

        }

        public object DeleteState(int? statecd, string token)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
            BLLState bllState = new BLLState();
            response = bllState.DeleteState(statecd);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }

        public object GetState(int? statecd, string token)
        {
            BLLState bllState = new BLLState();
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
            response = bllState.GetState(statecd);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }
        
       
    }
}