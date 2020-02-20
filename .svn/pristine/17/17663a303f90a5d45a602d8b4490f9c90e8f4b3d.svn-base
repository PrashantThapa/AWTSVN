using System;
namespace HRFA.ATT
{
    public class ATTPersonDependent
    {
        public ATTPersonDependent()
        {
            _Person = new ATTPerson();
            _Relative = new ATTPerson();
            _RelType = new ATTRelationType();
            _PersonNominee = new ATTPersonNominee();
        }
        public string Status { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }

        public bool IsNominee { get; set; }

        public bool prevIsNominee { get; set; }

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


        private ATTRelationType _RelType;
        public ATTRelationType RelType
        {
            get { return _RelType; }
            set { _RelType = value; }
        }



        public Int64? TranNo { get; set; }

        private ATTPersonNominee _PersonNominee;
        public ATTPersonNominee PersonNominee
        {
            get { return _PersonNominee; }
            set { _PersonNominee = value; }
        }
        public Int64? BFIID { get; set; }
    }
}
