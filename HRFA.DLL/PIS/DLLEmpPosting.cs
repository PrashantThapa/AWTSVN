using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmpPosting
    {
        public ATTEmpPosting GetEmpApptPromo(int? empID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            try
            {
                string SP = "CPR_GET_APPT_PROMO_EMP";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", empID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                DataRow drow = ds.Tables[0].Rows[0];
                
                ATTEmpPosting objEmpPosting = new ATTEmpPosting();
                objEmpPosting.Post = new ATTPost();

                objEmpPosting.PostingType = drow["TYPE"].ToString();
                objEmpPosting.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                objEmpPosting.EmployeeName = drow["EMP_NAME"].ToString();
                objEmpPosting.Post.PostID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString());
                objEmpPosting.Post.PostDesc = drow["POST_DESC"].ToString();
                objEmpPosting.FromDate = drow["FROM_DATE"].ToString();

                
                return objEmpPosting;
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

        public string SaveEmpPosting(ATTEmpPosting objEmpPosting, string appID, string modID)
        {
            string sp = "";
            string msg = "";

            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            try
            {

                if (objEmpPosting.Action == "A")
                {
                    sp = "DCPR_ADD_EMP_POSTING";
                    msg = "Successfully Saved.";

                }



                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", objEmpPosting.SubmissionNo, OracleDbType.Int64, System.Data.ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", objEmpPosting.Office.OfficeCode, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objEmpPosting.Post.PostID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_SEQ", objEmpPosting.OfficeDarbandi.PostSeq, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", objEmpPosting.EmpID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objEmpPosting.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objEmpPosting.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_JOINING_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_DECISION_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_LEAVE_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POSTING_TYPE_ID", objEmpPosting.PostingType, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_SALARY", null, OracleDbType.Double, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ALLOWANCE", null, OracleDbType.Double, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_REMARKS", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_RSTATUS", objEmpPosting.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpPosting.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objEmpPosting.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_PROMO_FROM_DATE", objEmpPosting.PromoFromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_APP_FROM_DATE", objEmpPosting.ApptFromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_TRAN_FROM_DATE", objEmpPosting.TranFromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                    paramList[0].Size = 16;
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    objEmpPosting.SubmissionNo = Int64.Parse(paramList[0].Value.ToString());

                    if (objEmpPosting.OldSubmissionNo != null)
                    {
                        DLLUserTranVerification dllUTV = new DLLUserTranVerification();
                        dllUTV.SaveVerifyLog(tran, objEmpPosting.EntryBy, objEmpPosting.OldSubmissionNo, objEmpPosting.SubmissionNo, appID, modID);
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
            //return msg + "Data Saved !!! </br> Please Note Submission Number</br><b>" + objEmpPosting.SubmissionNo + "</b>";
			return msg + "</br> Data Saved promise!!!</br>  Please Note Submission Number! </br><b>" + objEmpPosting.SubmissionNo + "</b>";

		}

		public object GetEmpPostingByEmpID(long? empID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);


            try
            {
                string SP = "CPR_GET_EMP_POSTING";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", empID, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                ATTEmpPosting objEmpPosting = new ATTEmpPosting();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataRow drow = ds.Tables[0].Rows[0];                   
                    objEmpPosting.EmpID = drow["EMP_ID"] == null ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                    objEmpPosting.EmployeeName = drow["EMP_NAME"] == null ? string.Empty : drow["EMP_NAME"].ToString();
                    objEmpPosting.Office.OfficeCode = drow["OFFICE_CD"].ToString() == null ? (Int16?)null : Int16.Parse(drow["OFFICE_CD"].ToString());
                    objEmpPosting.Post.PostID = drow["POST_ID"] == null ? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString());
                    objEmpPosting.Post.PostDesc = drow["POST_DESC"] == null ? string.Empty : drow["POST_DESC"].ToString();
                    objEmpPosting.OfficeDarbandi.PostSeq = drow["POST_SEQ"] == null ? (Int16?)null : Int16.Parse(drow["POST_SEQ"].ToString());
                    objEmpPosting.PostingType = drow["POSTING_TYPE_ID"] == null ? string.Empty : drow["POSTING_TYPE_ID"].ToString();
                    
                }
                else
                {
                    objEmpPosting = null;
                }




                return objEmpPosting;
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

        public ATTEmpPosting GetEmpPosting(Int64? submissionNo)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);


            try
            {
                string SP = "DCPR_GET_EMP_POSTING";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", submissionNo, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                ATTEmpPosting objEmpPosting = new ATTEmpPosting();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataRow drow = ds.Tables[0].Rows[0];
                    objEmpPosting.SubmissionNo = drow["SUBMISSION_NO"]==null ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                    objEmpPosting.EmpID = drow["EMP_ID"]==null ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                    objEmpPosting.EmployeeName = drow["EMP_NAME"] == null ? string.Empty : drow["EMP_NAME"].ToString();
                    objEmpPosting.Office.OfficeCode =  drow["OFFICE_CD"].ToString()==null ? (Int16?)null : Int16.Parse(drow["OFFICE_CD"].ToString());
                    objEmpPosting.Post.PostID = drow["POST_ID"] ==null? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString());
                    objEmpPosting.Post.PostDesc = drow["POST_DESC"]==null ? string.Empty :drow["POST_DESC"].ToString();
                    objEmpPosting.OfficeDarbandi.PostSeq = drow["POST_SEQ"]==null ? (Int16?)null : Int16.Parse(drow["POST_SEQ"].ToString());
                    objEmpPosting.PostingType = drow["POSTING_TYPE_ID"] == null ? string.Empty : drow["POSTING_TYPE_ID"].ToString();
                    objEmpPosting.PromoFromDate = drow["PROMO_FROM_DATE"] == null ? string.Empty : drow["PROMO_FROM_DATE"].ToString();
                    objEmpPosting.ApptFromDate = drow["APP_FROM_DATE"] == null ? string.Empty : drow["APP_FROM_DATE"].ToString();
                    objEmpPosting.TranFromDate = drow["TRAN_FROM_DATE"] == null ? string.Empty : drow["TRAN_FROM_DATE"].ToString();
                    objEmpPosting.FromDate = drow["FROM_DATE"] == null ? string.Empty : drow["FROM_DATE"].ToString();
                    objEmpPosting.ToDate = drow["TO_DATE"] == null ? string.Empty : drow["TO_DATE"].ToString();
                    objEmpPosting.RStatus = drow["R_STATUS"] == null ? string.Empty : drow["R_STATUS"].ToString();
                    objEmpPosting.EntryBy = drow["ENTRY_BY"] == null ? string.Empty : drow["ENTRY_BY"].ToString();
                    objEmpPosting.EntryDate = drow["ENTRY_DATE"] == null ? string.Empty : drow["ENTRY_DATE"].ToString();
                 }
                 else {
                     objEmpPosting = null;
                 }

                   
                

                return objEmpPosting;
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

        public List<ATTPost> GetEmpPostingByOffice(Int64? Office)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);


            try
            {
                string SP = "CPR_GET_EMP_POSTING_BY_OFFICE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", Office, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTPost> lsObjEmpPosting = new List<ATTPost>();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow drow = ds.Tables[0].Rows[i];
                        var objEmpPosting = new ATTPost();
                        //objEmpPosting.OfficeCode = drow["OFFICE_CD"] ==null ? (Int16?)null : Int16.Parse(drow["OFFICE_CD"].ToString());
                        objEmpPosting.PostID = drow["POST_ID"] == null ? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString());
                        objEmpPosting.PostDesc = drow["POST_DESC"] == null ? string.Empty : drow["POST_DESC"].ToString();
                        lsObjEmpPosting.Add(objEmpPosting);
                    }
                   
                    
                }
                else
                {
                    lsObjEmpPosting = null;
                }




                return lsObjEmpPosting;
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
