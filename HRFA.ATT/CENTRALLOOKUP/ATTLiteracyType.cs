using System;

namespace HRFA.ATT
{
    public class ATTLiteracyType
    {

        public Int32? LiteracyTypeID { get; set; }
        public string LiteracyTypeName { get; set; }
        public string LiteracyTypeNameEng { get; set; }
        public bool Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }
        public string RStatus { get; set; }

    }
}
