using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTEmpSalaryPayment
    {
        private ATTOffice _Office ;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }

        private ATTBank _Bank;
        public ATTBank Bank
        {
            get { return _Bank; }
            set { _Bank = value; }
        }

        private ATTBankAccount _BankAccount ;
        public ATTBankAccount BankAccount
        {
            get { return _BankAccount; }
            set { _BankAccount = value; }
        }


        private ATTCostCenter _CostCenter ;
        public ATTCostCenter CostCenter
        {
            get { return _CostCenter; }
            set { _CostCenter = value; }
        }

        private List<ATTEmpSalaryPayment> _EmpPayableAmounts ;
        public List<ATTEmpSalaryPayment> EmpPayableAmounts
        {
            get { return _EmpPayableAmounts; }
            set { _EmpPayableAmounts = value; }
        }

        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }

        public Int32? SalaryYear { get; set; }
        public Int32? SalaryMonth { get; set; }
        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public Double? PayableAmount { get; set; }
        public Double? TotalPayableAmount { get; set; }
        public string PaymentType { get; set; }
        public string PayableDate { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string Action { get; set; }


        public ATTEmpSalaryPayment()
        {
            
            _Office = new ATTOffice();
            _Bank = new ATTBank();
            _BankAccount = new ATTBankAccount();
            _CostCenter = new ATTCostCenter();
            _EmpPayableAmounts = new List<ATTEmpSalaryPayment>();

        }

    }
}
