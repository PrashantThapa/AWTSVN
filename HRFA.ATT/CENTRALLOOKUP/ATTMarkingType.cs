using System;

namespace HRFA.ATT
{
    public class ATTMarkingType
    {
        public Int32? MarkingTypeID { get; set; }
        public string MarkingName { get; set; }
        public string MarkingNameEnglish { get; set; }
        public bool Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }
    }
}
