using System;
using System.Collections.Generic;
using System.Data;

using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLDeptWiseShift
    {
        public string SaveDeptWiseShiftType(ATTDeptWiseShift objDept)
        {
            string SP = "";
            string msg = "";

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            OracleTransaction tran = dbConn.BeginTransaction();

            try
            {
                    for (var i = 0; i < objDept.ShiftList.Count; i++)
                    {
                        if (objDept.ShiftList[i].Action == "A")
                        {

                            SP = "CPR_ADD_DEPARTMENT_SHIFT";
                            msg = "Successfully Saved.";
                            List<OracleParameter> paramList = new List<OracleParameter>();

                            paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objDept.Office.OfficeCode, OracleDbType.Int64, ParameterDirection.InputOutput));
                            paramList.Add(SqlHelper.GetOraParam(":p_DEPT_ID", objDept.Dept.DeptID, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_SHIFT_ID", objDept.ShiftList[i].ShiftID, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_STATUS", objDept.Status, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objDept.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objDept.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objDept.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objDept.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList[0].Size = 50;
                            SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                        }
                        if (objDept.ShiftList[i].Action == "E")
                        {

                            SP = "CPR_EDIT_DEPARTMENT_SHIFT";
                            msg = "Successfully Updated.";
                            List<OracleParameter> paramList = new List<OracleParameter>();

                            paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objDept.Office.OfficeCode, OracleDbType.Int64, ParameterDirection.InputOutput));
                            paramList.Add(SqlHelper.GetOraParam(":p_DEPT_ID", objDept.Dept.DeptID, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_SHIFT_ID", objDept.ShiftList[i].ShiftID, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_STATUS", objDept.Status, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objDept.ShiftList[i].FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objDept.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objDept.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objDept.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));
                            paramList[0].Size = 50;
                            SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
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
                conn.CloseDbConn();
            }

        }
    }
}
