namespace HRFA.ATT
{
    public class ATTPersonLanguage
    {
        public ATTPersonLanguage()
        {
            _Person = new ATTPerson();
            _Language = new ATTLanguage();
        }
        private ATTPerson _Person;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }

        private ATTLanguage _Language ;
        public ATTLanguage Language
        {
            get { return _Language; }
            set { _Language = value; }
        }

        public string ReadingFluency { get; set; }
        public string WritingFluency { get; set; }
        public string SpeakingFluency { get; set; }
        public string ListeningFluency { get; set; }
        public string MotherLang { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }
    }
}
