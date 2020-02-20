using System.Collections.Generic;

namespace HRFA.COMMON
{
    public class CrystalReport
    {

        public string ReportFilePath { get; set; }

        private List<ReportParameter> _ParamList = new List<ReportParameter>();
        public List<ReportParameter> ParamList
        {
            get { return _ParamList; }
            set { _ParamList = value; }
        }

        private List<ReportFormulaFields> _FormulaList = new List<ReportFormulaFields>();
        public List<ReportFormulaFields> FormulaList
        {
            get { return _FormulaList; }
            set { _FormulaList = value; }
        }

        private List<SubReport> _SubReportList = new List<SubReport>();
        public List<SubReport> SubReportList
        {
            get { return _SubReportList; }
            set { _SubReportList = value; }
        }

        private string _SelectionCriteria;
        public string SelectionCriteria
        {
            get { return _SelectionCriteria; }
            set { _SelectionCriteria = value; }
        }

        private string _UserID;
        public string UserID
        {
            get { return this._UserID; }
            set { _UserID = value; }
        }

        private string _Password;
        public string Password
        {
            get { return this._Password; }
            set { _Password = value; }
        }

        public CrystalReport()
        {

        }

        public CrystalReport(string reportFilePath, string userID, string password)
        {
            this.ReportFilePath = reportFilePath;
            this.UserID = userID;
            this.Password = password;
        }
    }

}