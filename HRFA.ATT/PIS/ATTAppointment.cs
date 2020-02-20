using System;

namespace HRFA.ATT
{
    public class ATTAppointment
    {
       public ATTAppointment()
        {
            _Post = new ATTPost();
            _AppointmentType = new ATTAppointmentType();
        }
        private ATTPost _Post ;
        public ATTPost Post
        {
            get { return _Post; }
            set { _Post = value; }
        }

        private ATTAppointmentType _AppointmentType ;
        public ATTAppointmentType AppointmentType
        {
            get { return _AppointmentType; }
            set { _AppointmentType = value; }
        }

        public Int32? LevelID { get; set; }
        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }

        public string DecisionDate { get; set; }
        public string LetterIssueDate { get; set; }
        public string EffectiveDate { get; set; }
        public string EffectiveTillDate { get; set; }
        public string OfficeJoinDate { get; set; }
        public Int32? ProbationPeriod {get; set;}
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }
    }
}
