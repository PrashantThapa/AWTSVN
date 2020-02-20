using System.Collections.Generic;


namespace HRFA.COMMON
{
    public class AjaxSearchHRFA<T>
     {
        public static string Serialize(SearchResult<T> searchResult)
        {
            System.Web.Script.Serialization.JavaScriptSerializer jSearializer =
                      new System.Web.Script.Serialization.JavaScriptSerializer();
            return jSearializer.Serialize(searchResult);
        }
     }
    public class SearchResult<T>
       {
            public int TotalRecords { get; set; }

            public IEnumerable<T> Records { get; set; }
        }

    public class SearchCriteria<T>
        {
            public int PageIndex { get; set; }
            public int PageSize { get; set; }
            public T SearchField { get; set; }
        }
}
