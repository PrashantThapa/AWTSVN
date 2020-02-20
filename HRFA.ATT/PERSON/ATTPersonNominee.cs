using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTPersonNominee
    {
        public ATTPersonNominee()
        {
            _Person = new ATTPerson();
            _Relative = new ATTPerson();
            _RelType = new ATTRelationType();
            _NomineeDoc = new List<ATTPersonDoc>();
        }
        //public Int64? PID { get; set; }
        //public Int64 RelativeID { get; set; }

        private ATTPerson _Person ;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }

        private ATTPerson _Relative ;
        public ATTPerson Relative
        {
            get { return _Relative; }
            set { _Relative = value; }
        }

        public string Status { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }


        public string NomineeFromDate { get; set; }

        private ATTRelationType _RelType ;
        public ATTRelationType RelType
        {
            get { return _RelType; }
            set { _RelType = value; }
        }

        private List<ATTPersonDoc> _NomineeDoc;
        public List<ATTPersonDoc> NomineeDoc
        {
            get { return _NomineeDoc; }
            set { _NomineeDoc = value; }
        }

        public Int64? TranNo { get; set; }
        public Int64? BFIID { get; set; }

       
    }


}
