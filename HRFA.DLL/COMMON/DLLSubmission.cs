using System;
using System.Collections.Generic;
using System.Data;

using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class   DLLSubmission
    {

        public Int64? SaveSubmission(ATTSubmission objSubmission)
        {

            string SP = "";
           
            //GetConnection conn = new GetConnection();           
            //PortalUser puser = new PortalUser() ;//= conn.LoginUser;
            //puser.DatabaseAccessPUserName = "DCGC_DIRTY";
            //puser.DatabaseAccessUserPPassword = "DCGC_DIRTY";
            //OracleConnection dbConn = conn.GetDbConn(puser);
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();
           Int64? submissionNo = null;
         try
            {
                if (objSubmission.Action == "A")
                    {
                        SP = "DCPR_add_DCTB_SUBMISSION";
                        //msg = "Successfully Added";
                    }

                    if (SP != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", objSubmission.SubmissionNo, OracleDbType.Int64, ParameterDirection.InputOutput));               
                        paramList.Add(SqlHelper.GetOraParam(":p_USER_ID", objSubmission.UserId, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_PASSWORD", objSubmission.Password, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_U_NAME", objSubmission.UserName, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS", objSubmission.Address, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_PHONE_NO", objSubmission.PhoneNo, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_EMAIL", objSubmission.Email, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_OLD_ID", objSubmission.OldId, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_FOR", objSubmission.SubmissionFor, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objSubmission.Action, OracleDbType.Varchar2, ParameterDirection.Input));
                         paramList[0].Size = 50;
                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                        submissionNo = Int64.Parse(paramList[0].Value.ToString());
                        
                    }
                
                tran.Commit();
                return submissionNo;
                    
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

        public Int64 SavebfiSubmission(ATTSubmission objSubmission)
        {

            string SP = "";

            //GetConnection conn = new GetConnection();
            //PortalUser puser = new PortalUser();//= conn.LoginUser;
            //puser.DatabaseAccessPUserName = "DCGC_DIRTY";
            //puser.DatabaseAccessUserPPassword = "DCGC_DIRTY";
            //OracleConnection dbConn = conn.GetDbConn(puser);

            //OracleTransaction tran = dbConn.BeginTransaction();
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            Int64 submissionNo = 0;
            try
            {
                if (objSubmission.Action == "A")
                {
                    SP = "DCPR_add_DCTB_SUBMISSION";
                    //msg = "Successfully Added";
                }

                if (SP != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", objSubmission.SubmissionNo, OracleDbType.Int64, ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":p_USER_ID", objSubmission.UserId, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_PASSWORD", objSubmission.Password, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_U_NAME", objSubmission.UserName, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS", objSubmission.Address, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_PHONE_NO", objSubmission.PhoneNo, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_EMAIL", objSubmission.Email, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_OLD_ID", objSubmission.OldId, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_FOR", objSubmission.SubmissionFor, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objSubmission.Action, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList[0].Size = 50;
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                    submissionNo = Int64.Parse(paramList[0].Value.ToString());

                }

                tran.Commit();
                return submissionNo;

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
        public string GetLogInBySubmissionNo(string userid, string password, Int64? subNo)
        {
           
            ATTSubmission objSubNo = new ATTSubmission();
            string msg = "";
            GetConnection conn = new GetConnection();
            PortalUser puser = new PortalUser();  //= conn.LoginUser;
            puser.DatabaseAccessUserName = "HR_OWNER";
            puser.DatabaseAccessUserPassword = "HR_OWNER";
            OracleConnection dbConn = conn.GetDbConn(puser);
            try
            {
                
                /*
                GetConnection getConn = new GetConnection();
                GenericUser user = getConn.LoginUser;
                OracleConnection dbconn =getConn.GetDbConn(user);
                */
                string SP = "DCPR_LOGIN_SubmissionNo";
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_USER_id", userid, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_PASSWORD", password, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", subNo, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_msg", null, OracleDbType.Varchar2, ParameterDirection.Output));
                SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());
                if (paramList[3].Value.ToString() == "ok")
                {
                    msg = "";

                }
                else
                {
                    msg = "This submission no does not exist for this User Name and Password";
                }

                return msg;


            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                dbConn.Close();
            }

           
        }
        public string CheckSubNoExists(Int64? subno)
        {
            ATTSubmission objsubno = new ATTSubmission();
            string msg = "";
            GetConnection getConn = new GetConnection();
            GenericUser user = getConn.LoginUser;
            OracleConnection dbConn = getConn.GetDbConn(user);
            OracleTransaction tran = dbConn.BeginTransaction();

            try
            {

                string SP = "DCPR_GET_SUBMISSION_NO";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", subno, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_msg", null, OracleDbType.Varchar2, ParameterDirection.Output));

                SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

                if (paramList[1].Value.ToString() == "ok")
                {
                    msg = "";

                }
                else
                {
                    msg = "This Submission No does not exists";
                }

                return msg;


            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                dbConn.Close();
 
            }
        }
        


    }
}
