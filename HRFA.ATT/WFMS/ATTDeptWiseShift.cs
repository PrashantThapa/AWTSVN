using HRFA.ATT;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTDeptWiseShift
    {
        public ATTDeptWiseShift() { }
        public ATTOffice Office { get; set; }

        
        public ATTDepartment Dept { get; set; }
        public List<ATTShift> ShiftList { get; set; }
        public string Action { get; set; }
        
        public string ToDate { get; set; }
        public string EntryDate { get; set; }
        public string EntryBy { get; set; }
        public string Status { get; set; }
        public string FromDate { get; set; }
    }
}
