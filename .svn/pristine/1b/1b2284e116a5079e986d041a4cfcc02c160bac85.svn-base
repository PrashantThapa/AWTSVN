using System;

namespace HRFA.ATT
{
    public class ATTPersonContact
    {
        public ATTPersonContact()
        {
            _Person = new ATTPerson();
            _ContactType = new ATTContactType();
            _ContactPriority = new ATTPersonContPri();
        }
        //public Int64? PID { get; set; }

        private ATTPerson _Person ;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }

        
        public string CTypeValue { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }

        public ATTContactType _ContactType;
        public ATTContactType ContactType
        {
            get { return _ContactType; }
            set { _ContactType = value; }
        }

        private ATTPersonContPri _ContactPriority;
        public ATTPersonContPri ContactPriority
        {
            get { return _ContactPriority; }
            set { _ContactPriority = value; }
        }


        public Int64? TranNo { get; set; }
        public Int64? BFIID { get; set; }
    }
}


