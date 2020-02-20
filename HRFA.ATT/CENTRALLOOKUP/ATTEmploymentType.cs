using System;

namespace HRFA.ATT
{
    public class ATTEmploymentType
    {
        public Int32? EmpID { get; set; }
        public string EmpTypeName { get; set; }
        public string EmpTypeNameEng { get; set; }
        public bool Status { get; set; }
        public string FromDate { get; set; }
        public string EntryDate { get; set; }
        public string EntryBy { get; set; }
        public string Action { get; set; }
        public string ToDate { get; set; }
        
    }
}
