using System;
using System.Collections.Generic;
using System.Data;

using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLShift
    {
        public string SaveShift(ATTShift objShift)
        {
            string sp = "";
            string msg = "No Data To Save !!!";
            //string status = "";

            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            try
            {
                if (objShift.Action == "A")
                {
                    sp = "CPR_ADD_SHIFT";
                    msg = "Successfully Saved.";
                }
                else if (objShift.Action == "E")
                {
                    sp = "CPR_EDIT_SHIFT";
                    msg = "Successfully Updated.";
                }

                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":p_SHIFT_ID", objShift.ShiftID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_SHIFT_NAME", objShift.ShiftName, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_SHIFT_START_TIME", objShift.ShiftStartTime, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_SHIFT_END_TIME", objShift.ShiftEndTime, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objShift.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objShift.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objShift.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objShift.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_STATUS ", objShift.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                    paramList.Add(SqlHelper.GetOraParam(":P_SHIFT_AM", objShift.ShiftAM, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_SHIFT_PM ", objShift.ShiftPM, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));


                    SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp, paramList.ToArray());
                    paramList.Clear();
                }
                tran.Commit();
                return msg;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return ex.Message;
            }
            finally
            {
                GetConn.CloseDbConn();
            }


        }


       //Get Shift

        public List<ATTShift> GetShift(Int32? ShiftValues)
        {

            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            string SP = "CPR_GET_SHIFT";
            List<ATTShift> lst = new List<ATTShift>();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_SHIFT_ID", ShiftValues, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTShift obj = new ATTShift();

                    obj.ShiftID = string.IsNullOrEmpty(drow["SHIFT_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["SHIFT_ID"].ToString());
                     
                    obj.ShiftName = drow["SHIFT_NAME"].ToString();
                    obj.ShiftStartTime = drow["SHIFT_START_TIME"].ToString();
                    obj.ShiftEndTime = drow["SHIFT_END_TIME"].ToString();
                    obj.ShiftAM = drow["SHIFT_AM"].ToString();
                    obj.ShiftPM = drow["SHIFT_PM"].ToString();

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

		public string DeleteShift(Int32? shiftSetup)
		{
			GetConnection conn = new GetConnection();
			OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);


			try
			{
				string SP = "CPR_DELETE_SHIFTSETUP";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":p_SHIFT_ID", shiftSetup, OracleDbType.Int32, ParameterDirection.InputOutput));
				SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, ParamList.ToArray());

				return "Deleted Successfully!!!";


			}
			catch (Exception ex)
			{

				return ex.Message;

			}
			finally
			{

				conn.CloseDbConn();
			}

		}




	}
}
