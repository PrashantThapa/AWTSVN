using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.COMMON
{
	public class OfficePostHandler : BaseHandler
	{
		public object SaveOfficePost(string args)
		{
			ATTOfficePost objSub = (ATTOfficePost)JsonUtility.DeSerialize(args, typeof(ATTOfficePost));


			BLLOfficePost objBLLSubs = new BLLOfficePost();
			string msg = objBLLSubs.SaveOfficePost(objSub);

			//string msg = "";

			JsonResponse response = new JsonResponse();

			try
			{
				//HttpContext.Current.Session["SubmissionNo"] = msg.ToString();
				response.Message = msg.ToString();
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}

			return JsonUtility.Serialize(response);

		}
		public object GetOfficePostFromDate(Int64? OfficeCD, Int64? PostID)
		{
			JsonResponse response = new JsonResponse();
			BLLOfficePost obj = new BLLOfficePost();
			response = obj.GetOfficePostFromDate(OfficeCD, PostID);
			return JsonUtility.Serialize(response);

		}

		public object GetOfficePostListWithCount(string OfficeCD)
		{
			JsonResponse response = new JsonResponse();
			BLLOfficePost obj = new BLLOfficePost();
			response = obj.GetOfficePostListWithCount(OfficeCD);
			return JsonUtility.Serialize(response);

		}
		public object GetOfficePostList(string OfficeCD)
		{
			JsonResponse response = new JsonResponse();
			BLLOfficePost obj = new BLLOfficePost();
			response = obj.GetOfficePostList(OfficeCD);
			return JsonUtility.Serialize(response);

		}


		/*
          Auther om shrestha
          Date : 2016.10.07
 
       */



	}
}
