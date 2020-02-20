using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmpLoan
    {
        public string SaveEmpLoan(List<ATTLoan> lst, Int64? SubmissionNo, OracleTransaction tran)
        {
            string sp = "";
            string entryby = "";
            try
            {
                foreach(ATTLoan objLoan in lst)
                {
                    //if (objLoan.Action == "E")
                    //{
                    //    // create edit procedure
                    //}
                    //else if (objLoan.Action == "A")
                    //{
                        sp = "DCPR_ADD_LOAN_INDIVIDUAL_DET";
                    //}

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", SubmissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_EMPLOYEE_ID", objLoan.EmpID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_LOANTYPE_ID", objLoan.LoanType.LoanTypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_LOANTYPE_AMOUNT", objLoan.LoanAmt, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_BANK_ID", objLoan.Bank.BankID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ACCOUNT_NO", objLoan.AccountNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objLoan.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objLoan.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objLoan.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objLoan.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", objLoan.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        paramList[0].Size = 16;
                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        entryby = objLoan.EntryBy;
                        paramList.Clear();
                    }

                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw (ex);
            }
            return "success";
        }

        public List<ATTLoan> GetEmpLoans(Int64? submissionNo)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            try
            {
                string SP = "DCPR_GET_LOAN_INDIVIDUAL_DET";
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", submissionNo, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                List<ATTLoan> lst = new List<ATTLoan>();
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTLoan objLoan = new ATTLoan();
                    objLoan.SubmissionNo = string.IsNullOrEmpty(drow["SUBMISSION_NO"].ToString()) ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                    objLoan.EmpID = string.IsNullOrEmpty(drow["EMPLOYEE_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMPLOYEE_ID"].ToString());
                    objLoan.LoanType.LoanTypeID = string.IsNullOrEmpty(drow["LOANTYPE_ID"].ToString()) ? (Int32?) null : Int32.Parse(drow["LOANTYPE_ID"].ToString());
                    objLoan.LoanType.LoanTypeName = drow["LOANTYPE_NAME"].ToString();
                    objLoan.LoanAmt =  string.IsNullOrEmpty(drow["LOANTYPE_AMOUNT"].ToString()) ? (int?) null : Int32.Parse(drow["LOANTYPE_AMOUNT"].ToString());
                    objLoan.Bank.BankID = string.IsNullOrEmpty(drow["BANK_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["BANK_ID"].ToString());
                    objLoan.Bank.BankName = drow["BANK_NAME"].ToString();
                    objLoan.AccountNo = string.IsNullOrEmpty(drow["ACC_NO"].ToString()) ? (Int32?) null : Int32.Parse(drow["ACC_NO"].ToString());
                    objLoan.FromDate = drow["FROM_DATE"].ToString();
                    objLoan.ToDate = drow["TO_DATE"].ToString();
                    objLoan.EntryBy = drow["ENTRY_BY"].ToString();
                    objLoan.RStatus = drow["R_STATUS"].ToString();
                    lst.Add(objLoan);
                }
                return lst;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ATTLoan> GetEmpLoansByEmpID(Int64? Emp_ID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            try
            {
                string SP = "CPR_GET_LOAN_INDIV_DET_EMPID";
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", Emp_ID, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                List<ATTLoan> lst = new List<ATTLoan>();
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTLoan objLoan = new ATTLoan();
                    objLoan.SubmissionNo = null;//string.IsNullOrEmpty(drow["SUBMISSION_NO"].ToString()) ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                    objLoan.EmpID = string.IsNullOrEmpty(drow["EMPLOYEE_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMPLOYEE_ID"].ToString());
                    objLoan.LoanType.LoanTypeID = string.IsNullOrEmpty(drow["LOANTYPE_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["LOANTYPE_ID"].ToString());
                    objLoan.LoanType.LoanTypeName = drow["LOANTYPE_NAME"].ToString();
                    objLoan.LoanAmt = string.IsNullOrEmpty(drow["LOANTYPE_AMOUNT"].ToString()) ? (int?)null : Int32.Parse(drow["LOANTYPE_AMOUNT"].ToString());
                    objLoan.Bank.BankID = string.IsNullOrEmpty(drow["BANK_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["BANK_ID"].ToString());
                    objLoan.Bank.BankName = drow["BANK_NAME"].ToString();
                    objLoan.AccountNo = string.IsNullOrEmpty(drow["ACC_NO"].ToString()) ? (Int32?)null : Int32.Parse(drow["ACC_NO"].ToString());
                    objLoan.FromDate = drow["FROM_DATE"].ToString();
                    objLoan.ToDate = drow["TO_DATE"].ToString();
                    objLoan.EntryBy = drow["ENTRY_BY"].ToString();
                    objLoan.RStatus = drow["R_STATUS"].ToString();
                    lst.Add(objLoan);
                }
                return lst;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
