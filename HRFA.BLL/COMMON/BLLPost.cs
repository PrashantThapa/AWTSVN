using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLPost
    {
        public JsonResponse SavePost(ATTPost objPost)
        {
            JsonResponse response = new JsonResponse();
            DLLPost objDll = new DLLPost();
            try
            {
               response.Message = objDll.SavePost(objPost);
               response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetPost(int? postID)
        {
            JsonResponse response = new JsonResponse();
            DLLPost objDll = new DLLPost();
            try
            {
                response.ResponseData = objDll.GetPost(postID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }


		public JsonResponse DeletePost(Int32? post)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				DLLPost dLLPost = new DLLPost();
				response.Message = dLLPost.DeletePost(post);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}
	}
}
