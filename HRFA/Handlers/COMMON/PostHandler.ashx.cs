﻿using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
using System;

namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for PostHandler
    /// </summary>
    public class PostHandler : BaseHandler
    {
        public object SavePost(string args)
        {
            ATTPost objSub = (ATTPost)JsonUtility.DeSerialize(args, typeof(ATTPost));
            JsonResponse response = new JsonResponse();
            BLLPost objBLLPost = new BLLPost();
            
            try
            {
                response = objBLLPost.SavePost(objSub);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetPost(int? postID)
        {
            JsonResponse response = new JsonResponse();
            BLLPost objBLLPost = new BLLPost();

            try
            {
                 response = objBLLPost.GetPost(postID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

		public object DeletePost(Int32? post)
		{
			JsonResponse response = new JsonResponse();

			BLLPost bLLPost = new BLLPost();

			response = bLLPost.DeletePost(post);
			return JsonUtility.Serialize(response);

		}
	}
}