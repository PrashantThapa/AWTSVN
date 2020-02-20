using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTAttendenceDownload
    {
        private ATTOffice _Office;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }

        public string IPAddress { get; set; }
        public string DownloadDate { get; set; }
        public string Status { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }

        private List<ATTAttendence> _Attendence ;
        public List<ATTAttendence> Attendence
        {
            get { return _Attendence; }
            set { _Attendence = value; }
        }
        public ATTAttendenceDownload()
        {
            _Office = new ATTOffice();
            _Attendence = new List<ATTAttendence>();
        }
    }
}
