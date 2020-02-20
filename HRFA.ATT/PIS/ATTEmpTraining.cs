using System;

namespace HRFA.ATT
{
    public class ATTEmpTraining
    {
        public ATTEmpTraining()
        {
            _Country = new ATTCountry();
        }
        public ATTCountry _Country ;
        public ATTCountry Country
        {
            get { return _Country; }
            set { _Country = value; }
        }

        //private ATTPerson _Person = new ATTPerson();
        //public ATTPerson Person
        //{
        //    get { return _Person; }
        //    set { _Person = value; }
        //}
        


        public string Title { get; set; }
        public string CertificateName { get; set; }
        public string Institution { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Grade { get; set; }
        public Double? Percentage { get; set; }
        public string Remarks { get; set; }
        public string MajorSubject { get; set; }

        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }
    }
}
