using System;

namespace HRFA.ATT
{
    public class ATTAddress
    {

        public ATTAddress()
        {
			_Province = new ATTProvince();
            _District = new ATTDistrict();
            //_Ward = new ATTWard();
            _Vdc = new ATTDistrictVDC();
            _State = new ATTState();

        }
        public Int32? AddressID { get; set; }

		public ATTProvince Province
		{
			get { return _Province; }
			set { _Province = value; }
		}

		private ATTProvince _Province;
		private ATTDistrict _District;
        public ATTDistrict District
        {
            get { return _District; }
            set { _District = value; }
        }

		public int Ward { get; set; } // fro emp save 

		//private ATTWard _Ward ;

		//public ATTWard Ward
		//{
		//    get { return _Ward; }
		//    set { _Ward = value; }
		//}

		private ATTDistrictVDC _Vdc ;
        public ATTDistrictVDC Vdc
        {
            get { return _Vdc; }
            set { _Vdc = value; }
        }

        private ATTState _State ;
        public ATTState State
        {
            get { return _State; }
            set { _State = value; }
        }

        public string Tole { get; set; }
        public string ToleEn { get; set; }
        public string HouseNumber { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public String Status {get;set;}
        public string Action { get; set; }
        public Int64? BFIID { get; set; }
                
    }
}



       

        

       
