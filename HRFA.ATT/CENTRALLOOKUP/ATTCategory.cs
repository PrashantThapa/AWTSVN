using System;

namespace HRFA.ATT
{
    public class ATTCategory
    {
        public Int32? CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string CategoryNameEnglish { get; set; }
        public bool Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }

    }
}
