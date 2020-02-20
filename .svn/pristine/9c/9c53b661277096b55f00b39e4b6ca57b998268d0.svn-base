using System;

namespace HRFA.COMMON
{

    public class JsonUtility
    {
        public static object Serialize(JsonResponse response)
        {
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer jSearializer =
                             new System.Web.Script.Serialization.JavaScriptSerializer
                             {
                                 MaxJsonLength = 500000000
                             };

                return jSearializer.Serialize(response);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Object DeSerialize(string json, Type ObjectType)
        {
            try
            {

				Object objDeserialized = Newtonsoft.Json.JsonConvert.DeserializeObject(json, ObjectType);

				return objDeserialized;
            }
            catch (Exception)
            { 
                throw;
            }


        }


    }
}