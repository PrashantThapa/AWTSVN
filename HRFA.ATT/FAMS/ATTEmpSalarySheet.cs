using System;

namespace HRFA.ATT
{
    public class ATTEmpSalarySheet
    {
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }

        public Int32? EmpID { get; set; }
        public Int32? SalaryYear { get; set; }
        public Int32? SalaryMonth { get; set; }
        public Double? OrignalAmount { get; set; }
        public Double? EditedAmount {get; set;}
        public Int32? PostID { get; set; }

        private ATTOffice _Office;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }
        private ATTCostCenter _CostCenter ;
        public ATTCostCenter CostCenter
        {
            get { return _CostCenter; }
            set { _CostCenter = value; }
        }
        private ATTSalaryItem _SalaryItem;
        public ATTSalaryItem SalaryItem
        {
            get { return _SalaryItem; }
            set { _SalaryItem = value; }
        }

        public string PFromDate { get; set; }
        public string EFromDate { get; set; }
        //public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string Action { get; set; }

        public ATTEmpSalarySheet()
        {
            _Office = new ATTOffice();
            _CostCenter = new ATTCostCenter();
            _SalaryItem = new ATTSalaryItem();
        }
    }
}
