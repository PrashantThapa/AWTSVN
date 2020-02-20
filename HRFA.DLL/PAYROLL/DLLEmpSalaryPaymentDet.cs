﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.COMMON;
using HRFA.ATT;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmpSalaryPaymentDet
    {
        public void SaveEmpSalaryPaymentDetail(OracleTransaction tran, ATTEmpSalaryPayment objEmpSalaryPayment, Int64? submissionNo)
        {
            string sp2 = "DCPR_ADD_EMP_SAL_PAYMENT_DET";

            foreach (ATTEmpSalaryPayment obj in objEmpSalaryPayment.EmpPayableAmounts)
            {
                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objEmpSalaryPayment.Office.OfficeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_SAL_YEAR", objEmpSalaryPayment.SalaryYear, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_SAL_MONTH", objEmpSalaryPayment.SalaryMonth, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", obj.EmpID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_TOTAL_AMOUNT", objEmpSalaryPayment.TotalPayableAmount, OracleDbType.Double, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_PAY_TYPE", objEmpSalaryPayment.PaymentType, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_BANK_ID", objEmpSalaryPayment.Bank.BankID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_BANK_ACCT", objEmpSalaryPayment.BankAccount.AccountNo, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_PAY_DATE", objEmpSalaryPayment.PayableDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objEmpSalaryPayment.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpSalaryPayment.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objEmpSalaryPayment.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_PAYABLE_AMOUNT", obj.PayableAmount, OracleDbType.Double, System.Data.ParameterDirection.Input));

                SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp2, paramList.ToArray());

                paramList.Clear();
            }

        }

       
    }
}
