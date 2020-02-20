namespace HRFA.ATT
{
    public class ATTEmpExperience
    {
        //private ATTPerson _Person = new ATTPerson();
        //public ATTPerson Person
        //{
        //    get { return _Person; }
        //    set { _Person = value; }
        //}
        public ATTEmpExperience()
        {
            _Country = new ATTCountry();
        }
        public ATTCountry _Country;
        public ATTCountry Country
        {
            get { return _Country; }
            set { _Country = value; }
        }

        public string JobLocation { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Remarks { get; set; }

        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string Action { get; set; }

    }
}
