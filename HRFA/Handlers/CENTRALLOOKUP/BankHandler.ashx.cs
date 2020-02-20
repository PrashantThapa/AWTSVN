using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.CENTRALLOOKUP
{
    /// Summary description for AddressTypeHandler
    public class BankHandler : BaseHandler
    {
        public object SaveBank(string bank, string token)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
                BLLBank bllBank = new BLLBank();
                List<ATTBank> lstBank = JsonUtility.DeSerialize(bank, typeof(List<ATTBank>)) as List<ATTBank>;
                response = bllBank.SaveBank(lstBank);
            //}
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}


            return JsonUtility.Serialize(response);
        }


        public object DeleteBank(int? bankid, string token)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
                BLLBank bllBank = new BLLBank();
                response = bllBank.DeleteBank(bankid);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);


        }

        public object GetAllBank(int? bankid, string token)
        {
            JsonResponse response = new JsonResponse();
            BLLBank bllBank = new BLLBank();
            response = bllBank.GetAllBank(bankid);
            return JsonUtility.Serialize(response);
            
        }

    }
}