using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLMaritalStatus
    {

        /// <summary>
        /// This method Save/Update Marital Status
        /// </summary>
        /// <param name="objMaritalStat"></param>
        /// <returns>String as a Message about Save/Update Marital Status</returns>
        /// 

        public  string SaveMaritalStatus(List<ATTMaritalStatus> objMaritalStat)
        {
            string sp = "No Data To Save!!!";
            string msg = "";

            foreach (ATTMaritalStatus item in objMaritalStat)
            {
                if (item.Action == "A")
                {
                    msg = "Successfully Saved.";
                    sp = "CPR_ADD_MARITAL_STATUS";
                }
                else
                {
                    sp = "CPR_EDIT_MARITAL_STATUS";
                    msg = "Successfully Updated.";
                }

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_MED_ATTRIBUTE_ID", item.MarStatID, OracleDbType.Int32, ParameterDirection.InputOutput));
                paramList.Add(SqlHelper.GetOraParam(":p_MED_ATTRIBUTE_NAME", item.MarStatName, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_MED_ATTRIBUTE_NAME_ENG", item.MarStatNameEng, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_STATUS", item.Status, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", item.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", item.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", item.EntryDate, OracleDbType.Date, ParameterDirection.Input));

                GetConnection getConn = new GetConnection();
                OracleConnection dbConn = getConn.GetDbConn(getConn.LoginUser);
                OracleTransaction tran = dbConn.BeginTransaction();

                try
                {
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());

                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw new Exception("Error" + ex.Message);
                }
                finally
                {

                    getConn.CloseDbConn();
                }

            }

            return msg;
        }

        /// <summary>
        /// Retrives a list of Marital Status(s)
        /// </summary>
        /// <param name="MarStatID"></param>
        /// <returns>Marital Status or Null if Marital Status does not exist</returns>
        /// 

        public  List<ATTMaritalStatus> GetMaritalStatus(int? MarStatID)
        {
            string sp = "CPR_GET_MARITAL_STATUS";

            List<OracleParameter> paramList = new List<OracleParameter>();

            paramList.Add(SqlHelper.GetOraParam(":p_MARITAL_STATUS_ID", MarStatID, OracleDbType.Int32, ParameterDirection.Input));
            paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));

            GetConnection getConn = new GetConnection();
            OracleConnection dbconn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTMaritalStatus> lstMarStat = new List<ATTMaritalStatus>();

            try
            {
                DataSet ds = SqlHelper.ExecuteDataset(dbconn, CommandType.StoredProcedure, sp, paramList.ToArray());

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTMaritalStatus objMarStat = new ATTMaritalStatus();

                    objMarStat.MarStatID = int.Parse(drow["MARST_ID"].ToString());
                    objMarStat.MarStatName = drow["MARST_NAME"].ToString();
                    objMarStat.MarStatNameEng = drow["MARST_NAME_ENG"].ToString();
                    objMarStat.Status = drow["STATUS"].ToString();
                    objMarStat.FromDate = drow["FROM_DATE"].ToString();
                    objMarStat.ToDate = drow["TO_DATE"].ToString();
                    objMarStat.EntryBy = drow["ENTRY_BY"].ToString();
                    objMarStat.EntryDate = drow["ENTRY_DATE"].ToString();

                    lstMarStat.Add(objMarStat);
                }

            }
            catch (Exception ex)
            {
                throw new Exception(" " + ex.Message);
            }
            finally
            {
                getConn.CloseDbConn();
            }

            return lstMarStat;
        }


        /// <summary>
        /// This method Delete Marital Status
        /// </summary>
        /// <param name="MarStatID">MarStatID to be deleted</param>
        /// <returns>String as a Message about Delete Marital Status</returns>
        ///
        public  string DelMaritalStatus(int MarStatID)
        {

            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);


            try
            {
                string sp = "CPR_DEL_MARITAL_STATUS";
                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_MARITAL_STATUS_ID", MarStatID, OracleDbType.Int32, ParameterDirection.InputOutput));
                paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));

                SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                return "Deleted Successfully.";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
            finally
            {

                getConn.CloseDbConn();
            }
        }

        public bool SavePersonMaritalStatus(ATTMaritalStatus obj, Int64? PID, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";


                if (obj.Action == "E")
                {
                    sp = "CPR_EDIT_PERSON_MSTATUS";

                }
                else if (obj.Action == "A")
                {
                    sp = "CPR_ADD_PERSON_MSTATUS";
                }

                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_MARITAL_STATUS_ID", obj.MarStatID, OracleDbType.Int16, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Date, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    paramList.Clear();
                }
                else
                {
                    throw new Exception("Error in Saving Person Marital Status !!!");
                }


                return true;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public ATTMaritalStatus GetPersonMaritalStatus(Int64? PID, Int32? seqNo, OracleConnection conn, bool isDirty = false)
        {
            ATTMaritalStatus obj = new ATTMaritalStatus();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                string sp = "CPR_GET_PERSON_MSTATUS";

                if (isDirty)
                {
                    sp = "DCPR_GET_PERSON_MSTATUS";                    
                }

                

                paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_SEQNO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataRow dr = ds.Tables[0].Rows[0];

                    obj.MarStatID = string.IsNullOrEmpty(dr["MARST_ID"].ToString()) ? (Int32?)null : Int32.Parse(dr["MARST_ID"].ToString());
                    obj.MarStatName = dr["MARST_NAME"].ToString();
                    obj.MarStatNameEng = dr["MARST_NAME_ENG"].ToString();
                    obj.FromDate = dr["FROM_DATE"].ToString();
                    obj.RStatus = dr["R_STATUS"].ToString();

                }

                return obj;

            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }

        #region Dirty
        public bool SaveDirtyPersonMaritalStatus(ATTMaritalStatus obj, Int64? submissionNo, Int32? seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";


                if (obj.Action == "E")
                {
                    sp = "DCPR_EDIT_PERSON_MSTATUS";

                }
                else if (obj.Action == "A")
                {
                    sp = "DCPR_ADD_PERSON_MSTATUS";
                }

                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_MARITAL_STATUS_ID", obj.MarStatID, OracleDbType.Int16, System.Data.ParameterDirection.Input));
                    //paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE",  (obj.Action = 'A')?string.Empty:obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Date, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    paramList.Clear();
                }
                


                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in Saving Person Marital Status !!!");
                throw (ex);
            }
        }
        #endregion
    }
}
