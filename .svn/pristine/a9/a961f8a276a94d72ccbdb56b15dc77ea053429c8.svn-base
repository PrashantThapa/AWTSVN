using System;

namespace HRFA.ATT
{
    public class ATTLeaveType
    {
        public Int32? LeaveTypeID { get; set; }
		public string LeaveTypeName { get; set; }
		public string LeaveTypeNameNep { get; set; }
        public bool IsPayable { get; set; }
        public bool IsReservable { get; set; }
        public int? MaxReservableDays { get; set; }
        public int? MinServiceDaysRequired { get; set; }
        public int? MinDays { get; set; }
        public int? MaxDays { get; set; }
        public bool IsHalfDayApplicable { get; set; }
        public bool IsRecomendable { get; set; }
        public int? RecomendableConstraintDays { get; set; }
        public int? RecomendableConstraintDaysAdded { get; set; }
        public bool IsReImbushmentable { get; set; }
        public int? MaxTermCount { get; set; }
        public bool CanTakenWithOther { get; set; }
        public string Gender { get; set; }
        public string Status { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }

        private ATTMaritalStatus _MaritalStatus;
        public ATTMaritalStatus MaritalStatus
        {
            get {return _MaritalStatus;}
            set { _MaritalStatus = value; }
        }
        public string Action { get; set; }
        public ATTLeaveType()
        {
            _MaritalStatus = new ATTMaritalStatus();
        }
    }
}
