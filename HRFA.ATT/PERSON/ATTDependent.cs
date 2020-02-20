using System;
namespace HRFA.ATT
{
    public class ATTDependent
    {
        public ATTDependent()
        {
            _RelType = new ATTRelationType();
        }
        public Int64? PID { get; set; }
        public Int64? RelativeID { get; set; }
        public string Status { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }

        public bool IsNominee { get; set; }

        public ATTPerson Person { get; set; }

        private ATTRelationType _RelType;
        public ATTRelationType RelType
        {
            get { return _RelType; }
            set { _RelType = value; }
        }

        public string NomineeFromDate { get; set; }
        public Int64? BFIID { get; set; }
    }
}
