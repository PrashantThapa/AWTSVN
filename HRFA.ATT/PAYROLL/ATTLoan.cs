using System;

namespace HRFA.ATT
{
    public class ATTLoan
    {
        public Int64? SubmissionNo;
        public int? EmpID;
        private ATTLoanType _LoanType ;
        public ATTLoanType LoanType
        {
            get { return _LoanType; }
            set { _LoanType = value; }
        }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public Int64? LoanAmt { get; set; }
        public Int64? AccountNo { get; set; }
        public string Action { get; set; }
        public string RStatus { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        private ATTBank _Bank ;
        public ATTBank Bank
        {
            get { return _Bank; }
            set { _Bank = value; }
        }

        public ATTLoan()
        {
            _LoanType = new ATTLoanType();
            _Bank = new ATTBank();
        }
    }
}
