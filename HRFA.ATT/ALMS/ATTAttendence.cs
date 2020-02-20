using System;

namespace HRFA.ATT
{
    public class ATTAttendence
    {
        public Int32? EnrollNumber { get; set; }
        public Int16? VerifyMode { get; set; }
        public Int16? InOutMode { get; set; }
        public string Date { get; set; }
        public Int32? WorkCode { get; set; }
    }
}
