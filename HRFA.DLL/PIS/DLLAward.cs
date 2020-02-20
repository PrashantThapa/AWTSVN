using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLAward
    {
        public string SaveAward(ATTAward objAward, string appID, string modID)
        {
            string sp = "";
            string msg = "";

            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            try
            {
                if (objAward.Action == "A")
                {
                    sp = "DCPR_ADD_EMP_AWARD";
                    msg = "Successfully Saved.";

                }
                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", null, OracleDbType.Int64, ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objAward.Office.OfficeCode, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objAward.Post.PostID, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_SEQ", objAward.OfficePostDarbandi.PostSeq, OracleDbType.Int32, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", objAward.EmpID, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_SEQ_NO", null, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_AWARD", objAward.Award, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_AWARD_DATE", objAward.AwardDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_REMARKS", objAward.Remarks, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objAward.RStatus, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objAward.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objAward.EntryDate, OracleDbType.Date, ParameterDirection.Input));
                    paramList[0].Size = 20;
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    objAward.SubmissionNo = Int64.Parse(paramList[0].Value.ToString());

                    if (objAward.OldSubmissionNo != null)
                    {
                        DLLUserTranVerification dllUTV = new DLLUserTranVerification();
                        dllUTV.SaveVerifyLog(tran, objAward.EntryBy, objAward.OldSubmissionNo, objAward.SubmissionNo, appID, modID);
                       
                    }
                    paramList.Clear();
                    tran.Commit();
                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw (ex);
            }
            finally
            {
                getConn.CloseDbConn();
            }
            //return msg;
            return msg + "</br> Please Note Your Submission No.</br><b>" + objAward.SubmissionNo + "</b>";				
        }

        public List<ATTAward> GetAward(Int64? submissionNo)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            try
            {
                string SP = "DCPR_GET_EMP_AWARD";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", submissionNo, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTAward> lst = new List<ATTAward>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTAward obj = new ATTAward();

                    obj.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                    obj.Award = drow["AWARD"].ToString();
                    obj.AwardDate = drow["AWARD_DATE"].ToString();
                    obj.EmployeeName = drow["EMP_NAME"].ToString();
                    obj.Remarks = drow["REMARKS"].ToString();
                    lst.Add(obj);
                }

                return lst;

            }
            catch (Exception ex)
            {
                // tran.Rollback();
                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }
        }
    }
}
