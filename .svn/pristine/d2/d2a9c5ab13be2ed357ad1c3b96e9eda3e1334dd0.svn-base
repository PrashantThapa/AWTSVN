using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace IDS.Handlers.VERIFICATION
{
	/// <summary>
	/// Summary description for ModuleVerificationHandler
	/// </summary>
	public class ModuleVerificationHandler : BaseHandler
	{

		public object GetUnverifiedModulesWithCount(int roleID)
		{
			BLLModuleVerification obj = new BLLModuleVerification();
			JsonResponse response = new JsonResponse();
			response = obj.GetUnverifiedModulesWithCount(roleID);
			return JsonUtility.Serialize(response);
		}
		//NB: Getting Transaction while clicking row of Modules-------------------------------------------------------------------------------------------
		public object GetUnverifiedTransactions(string roleID, string moduleID)
		{
			BLLModuleVerification obj = new BLLModuleVerification();
			JsonResponse response = new JsonResponse();
			response = obj.GetUnverifiedTransactions(roleID, moduleID);
			return JsonUtility.Serialize(response);
		}

		public object VerifyTransaction(string args)
		{
			JsonResponse response = new JsonResponse();
			ATTUserTranVerification ObjTransaction = (ATTUserTranVerification)JsonUtility.DeSerialize(args, typeof(ATTUserTranVerification));
			BLLUserTranVerification objBLLUserTranVerification = new BLLUserTranVerification();
			response = objBLLUserTranVerification.SaveUserTranVerification(ObjTransaction);
			return JsonUtility.Serialize(response);

		}

		//NB: Search Module By Module Name
		//public object SearchModuleByName(string args)
		//{
		//    ATTModuleVerification objATTModSearch = (ATTModuleVerification)JsonUtility.DeSerialize(args, typeof(ATTModuleVerification));
		//    BLLModuleVerification objBLLModSearch = new BLLModuleVerification();

		//    JsonResponse response = new JsonResponse();
		//    response = objBLLModSearch.SearchModuleByName(objATTModSearch);
		//    return JsonUtility.Serialize(response);

		//}


		public object GetRejectedList()
		{
			JsonResponse response = new JsonResponse();
			BLLUserTranVerification bllUTV = new BLLUserTranVerification();
			try
			{
				response = bllUTV.GetRejectedList();
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}




	}
}