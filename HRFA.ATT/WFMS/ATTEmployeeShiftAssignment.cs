using HRFA.ATT;

namespace HRFA.ATT
{
    public class ATTEmployeeShiftAssignment
    {
        public ATTEmployeeShiftAssignment() { }

        public int? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public ATTOffice Office { get; set; }
        public ATTDepartment Department { get; set; }
        public ATTShift Shift { get; set; }
        public string EmpShFromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }
    }
}
