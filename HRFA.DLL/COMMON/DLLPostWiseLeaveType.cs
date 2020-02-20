using System;
using System.Collections.Generic;
using System.Data;

using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public  class DLLPostWiseLeaveType
    {
       public string SavePostWiseLeaveType(ATTPostWiseLeaveType objLeave)
        {
            string SP = "";
            string msg = "";
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            OracleTransaction tran = dbConn.BeginTransaction();
            try
            {
                if (objLeave.Action == "A")
                {
                    SP = "CPR_ADD_POST_LEAVE";
                    msg = "Successfully Saved.";
                }

                if (SP != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    string IsAccural= objLeave.IsAccural?"Y":"N";
                    paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objLeave.Office.OfficeCode, OracleDbType.Int64, ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objLeave.Post.PostID, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_LTYPE_ID", objLeave.Leave.LeaveTypeID, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objLeave.Post.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objLeave.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_PERIOD_TYPE", objLeave.PeriodType.PeriodTypeID, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_PERIOD_TIMES", objLeave.PeriodTimes, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_IS_ACCRUAL", IsAccural, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_MAX_ACCRUAL_DAYS", objLeave.MaxAccrualDays, OracleDbType.Varchar2, ParameterDirection.Input));
                    
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objLeave.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objLeave.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));

                    paramList.Add(SqlHelper.GetOraParam(":P_STATUS", objLeave.Status, OracleDbType.Varchar2, ParameterDirection.Input));
                   
                    paramList[0].Size = 50;
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
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
                conn.CloseDbConn();
            }

        }
        public List<ATTLeaveType> GetLeave(string LeaveTypeID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            try
            {
                string SP = "CPR_GET_LEAVE_TYPE";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_LEAVE_TYPE_ID", null, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTLeaveType> lst = new List<ATTLeaveType>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTLeaveType obj = new ATTLeaveType();

                    obj.LeaveTypeID = string.IsNullOrEmpty(drow["LEAVE_TYPE_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["LEAVE_TYPE_ID"].ToString());
                    obj.LeaveTypeName = drow["LEAVE_TYPE_NAME"].ToString();
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
                conn.CloseDbConn();
            }
        }
    }
}
