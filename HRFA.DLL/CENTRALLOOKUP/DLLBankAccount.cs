using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLBankAccount
    {
        public string SaveBankAccount(List<ATTBankAccount> lstBankAccount)
        {
            string sp = "";
            string msg = "No Data To Save !!!";
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();
              try
                {
                    foreach (ATTBankAccount objRMF in lstBankAccount)
                    {

                        if (objRMF.Action == "A")
                        {
                            sp = "CPR_ADD_BANK_ACCOUNTS";
                            msg = "Successfully Saved.";
                        }
                        else if (objRMF.Action == "E")
                        {
                            sp = "CPR_EDIT_BANK_ACCOUNTS";
                            msg = "Successfully Updated.";
                        }

                        if (sp != "")
                        {
                            List<OracleParameter> paramList = new List<OracleParameter>();
                            paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", objRMF.EmpID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", objRMF.OfficeCD, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":p_BANK_ID", objRMF.Bank.BankID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":p_ACCT_NO", objRMF.AccountNo, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":p_AC_CODE", objRMF.AccCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objRMF.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objRMF.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objRMF.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objRMF.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_TRAN_NO", objRMF.TranNo, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", objRMF.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                            SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp, paramList.ToArray());
                            if (objRMF.Action == "E")
                            {
                                sp = "CPR_ADD_BANK_ACCOUNTS";
                                SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp, paramList.ToArray());
                            }
                            paramList.Clear();
                            sp = "";
                           
                        }
                    }

                    tran.Commit();
                    return msg;
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw new Exception("Error" + ex.Message);
                }
                finally
                {
                    GetConn.CloseDbConn();
                }
            

        }

        public List<ATTBankAccount> GetBankLsts(Int32? BankId, Int32? OfficeCD)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            string SP = "CPR_GET_BANK_ACCOUNTS";
            List<ATTBankAccount> lst = new List<ATTBankAccount>();
            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_BANK_ID", BankId, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", OfficeCD, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTBankAccount obj = new ATTBankAccount();
                    obj.Bank = new ATTBank();

                    obj.EmpID = Int32.Parse(drow["EMP_ID"].ToString());
                    obj.EmployeeName = drow["EMP_NAME"].ToString();
                    obj.OfficeCD = Int32.Parse(drow["OFFICE_CD"].ToString());
                    obj.OfficeName = drow["OFFICE_NAME"].ToString();
                    obj.Bank.BankID = string.IsNullOrEmpty(drow["BANK_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["BANK_ID"].ToString());
                    obj.Bank.BankName = drow["BANK_NAME"].ToString();
                    obj.AccountNo = drow["ACCT_NO"].ToString();
                    obj.AccCode = string.IsNullOrEmpty(drow["AC_CODE"].ToString()) ? (Int32?)null : Int32.Parse(drow["AC_CODE"].ToString());
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.GLName = drow["AC_NAME"].ToString();
                   
                    obj.Action = "";
                  

                    lst.Add(obj);

                }
                return lst;
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                getConn.CloseDbConn();
            }

        }

        public List<ATTBankAccount> GetBankAccount(Int32? EmpID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            string SP = "CPR_GET_BANK_ACCOUNTS_BY_EMPID";
            List<ATTBankAccount> lst = new List<ATTBankAccount>();
            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_CD", EmpID, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTBankAccount obj = new ATTBankAccount();
                    obj.Bank = new ATTBank();

                    obj.EmpID = DBNull.Value.Equals(drow["EMP_ID"]) ? (Int32?)null:  Int32.Parse(drow["EMP_ID"].ToString());
                    obj.EmployeeName = DBNull.Value.Equals(drow["EMP_NAME"]) ? string.Empty : drow["EMP_NAME"].ToString();
                    obj.OfficeCD = DBNull.Value.Equals(drow["OFFICE_CD"]) ? (Int32?)null : Int32.Parse(drow["OFFICE_CD"].ToString());
                    obj.OfficeName = DBNull.Value.Equals(drow["OFFICE_NAME"]) ? string.Empty : drow["OFFICE_NAME"].ToString();
                    obj.Bank.BankID = DBNull.Value.Equals(drow["BANK_ID"]) ? (Int32?)null : Int32.Parse(drow["BANK_ID"].ToString());
                    obj.Bank.BankName = DBNull.Value.Equals(drow["BANK_NAME"]) ? string.Empty : drow["BANK_NAME"].ToString();
                    obj.AccountNo = DBNull.Value.Equals(drow["ACCT_NO"]) ? string.Empty: drow["ACCT_NO"].ToString();
                    obj.AccCode = DBNull.Value.Equals(drow["AC_CODE"]) ? (Int32?)null : Int32.Parse(drow["AC_CODE"].ToString());
                    obj.FromDate = DBNull.Value.Equals(drow["FROM_DATE"]) ? string.Empty : drow["FROM_DATE"].ToString();
                    obj.GLName = DBNull.Value.Equals(drow["AC_NAME"]) ? string.Empty : drow["AC_NAME"].ToString();

                    obj.Action = "";


                    lst.Add(obj);

                }
                return lst;
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                getConn.CloseDbConn();
            }

        }
    }
}
