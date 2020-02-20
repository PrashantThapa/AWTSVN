using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmpLeaveApplication
    {
        public string SaveEmpLeaveApplication(ATTEmpLeaveApplication objLeaveApp)
        {
            string msg = "";
            string sp = "";

            if (objLeaveApp.Action == "A")
            {
				//string SP = "RPR_LEAVE_REQUEST";

				sp = "CPR_ADD_EMP_LEAVE_APPLICATION";
                msg = "Successfully Saved.";
            }
            else
            {
                sp = "CPR_EDIT_EMP_LEAVE_APPLICATION";
                msg = "Successfully Updated.";
            }

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            OracleTransaction tran = dbConn.BeginTransaction();

            try
            {
                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", objLeaveApp.EmpID, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_LTYPE_ID", objLeaveApp.LeaveType.LeaveTypeID, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_DATE", objLeaveApp.ApplicationDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objLeaveApp.PostID, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objLeaveApp.OfficeCD, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_EFROM_DATE", objLeaveApp.EFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_PFROM_DATE", objLeaveApp.PFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_FROM_DATE", objLeaveApp.AppFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_TO_DATE", objLeaveApp.AppToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_NO_OF_DAYS", objLeaveApp.AppNoOfDays, OracleDbType.Double, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_LEAVE_REASON", objLeaveApp.LeaveReason, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_STATUS", objLeaveApp.AppStatus, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objLeaveApp.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objLeaveApp.EntryDate, OracleDbType.Date, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objLeaveApp.RStatus, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APPROVED_TO", objLeaveApp.ForwardedTo, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ISHALFDAY", objLeaveApp.IsHalfDay, OracleDbType.Int32, ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    tran.Commit();
                    paramList.Clear();
                }
                else
                {
                    msg = "Error in Saving.";
                    throw new Exception(msg);
                }
            }
            catch (Exception)
            {
                msg = "Error in Saving.";
                tran.Rollback();
            }
            finally {
                conn.CloseDbConn();
            }
            return msg;
        }

        public List<ATTEmpLeaveApplication> GetLeaveTypePostWise(int? empID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            try
            {
                string SP = "CPR_GET_EMP_LEAVETYPE_POSTWISE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", empID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTEmpLeaveApplication> lst = new List<ATTEmpLeaveApplication>();
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTEmpLeaveApplication empLeave = new ATTEmpLeaveApplication();
                    empLeave.LeaveType = new ATTLeaveType();
                    empLeave.PostID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString()); 
                    empLeave.PFromDate = drow["FROM_DATE"].ToString();
                    empLeave.OfficeCD = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int16?)null : Int16.Parse(drow["OFFICE_CD"].ToString());
                    empLeave.LeaveType.LeaveTypeID = string.IsNullOrEmpty(drow["LEAVE_TYPE_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["LEAVE_TYPE_ID"].ToString()); 
                    empLeave.LeaveType.LeaveTypeName = drow["LEAVE_TYPE_NAME"].ToString();
                    lst.Add(empLeave);
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

        public string SavePortalEmpLeaveApplication(ATTEmpLeaveApplication objLeaveApp)
        {
            string msg = "";
            string sp = "";

            if (objLeaveApp.Action == "A")
            {
                sp = "CPR_ADD_EMP_LEAVE_APPLICATION";
                msg = "Successfully Saved.";
            }
            else
            {
                sp = "CPR_EDIT_EMP_LEAVE_APPLICATION";
                msg = "Successfully Updated.";
            }

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();
            OracleTransaction tran = dbConn.BeginTransaction();

            try
            {
                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", objLeaveApp.EmpID, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_LTYPE_ID", objLeaveApp.LeaveType.LeaveTypeID, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_DATE", objLeaveApp.ApplicationDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objLeaveApp.PostID, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objLeaveApp.OfficeCD, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_EFROM_DATE", objLeaveApp.EFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_PFROM_DATE", objLeaveApp.PFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_FROM_DATE", objLeaveApp.AppFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_TO_DATE", objLeaveApp.AppToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_NO_OF_DAYS", objLeaveApp.AppNoOfDays, OracleDbType.Double, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_LEAVE_REASON", objLeaveApp.LeaveReason, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_STATUS", objLeaveApp.AppStatus, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objLeaveApp.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objLeaveApp.EntryDate, OracleDbType.Date, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objLeaveApp.RStatus, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APPROVED_TO", objLeaveApp.ForwardedTo, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ISHALFDAY", objLeaveApp.IsHalfDay, OracleDbType.Int32, ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    tran.Commit();
                    paramList.Clear();
                }
                else
                {
                    msg = "Error in Saving.";
                    throw new Exception(msg);
                }
            }
            catch (Exception ex)
            {
                msg = "Error in Saving.";
                tran.Rollback();
                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }
            return msg;
        }

        public List<ATTEmpLeaveApplication> GetPortalLeaveTypePostWise(int? empID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn();

            try
            {
                string SP = "CPR_GET_EMP_LEAVETYPE_POSTWISE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", empID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTEmpLeaveApplication> lst = new List<ATTEmpLeaveApplication>();
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTEmpLeaveApplication empLeave = new ATTEmpLeaveApplication();
                    empLeave.LeaveType = new ATTLeaveType();
                    empLeave.PostID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString());
                    empLeave.PFromDate = drow["FROM_DATE"].ToString();
                    empLeave.OfficeCD = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int16?)null : Int16.Parse(drow["OFFICE_CD"].ToString());
                    empLeave.LeaveType.LeaveTypeID = string.IsNullOrEmpty(drow["LEAVE_TYPE_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["LEAVE_TYPE_ID"].ToString());
                    empLeave.LeaveType.LeaveTypeName = drow["LEAVE_TYPE_NAME"].ToString();
                    lst.Add(empLeave);
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
