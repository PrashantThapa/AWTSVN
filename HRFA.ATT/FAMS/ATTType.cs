using System;

namespace HRFA.ATT
{
    public class ATTType
    {
        public Int16? TypeID { get; set; }
        public string TypeNameEng { get; set; }
        public string TypeName { get; set; }
        public string Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
    }
}
