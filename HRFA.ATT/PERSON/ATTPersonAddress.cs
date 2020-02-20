using System;

namespace HRFA.ATT
{
    public class ATTPersonAddress
    {
        public ATTPersonAddress()
        {
            _Person = new ATTPerson();
            _Address = new ATTAddress();
            _AddrType = new ATTAddressType();
            _AddressPriority = new ATTPersonContPri();
        }
        //public Int64? PID { get; set; }


        private ATTPerson _Person;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }

        
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }

        private ATTAddress _Address ;
        public ATTAddress Address
        {
            get { return _Address; }
            set { _Address = value; }
        }

        public string Action { get; set; }


        private ATTAddressType _AddrType ;
        public ATTAddressType AddrType
        {
            get { return _AddrType; }
            set { _AddrType = value; }
        }

        private ATTPersonContPri _AddressPriority ;
        public ATTPersonContPri AddressPriority
        {
            get { return _AddressPriority; }
            set { _AddressPriority = value; }
        }

        public Int64? TranNo { get; set; }
        public Int64? BFIID { get; set; }
    }
}
