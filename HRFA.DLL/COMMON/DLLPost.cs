﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLPost
    {
        public string SavePost(ATTPost objPost)
        {
                   GetConnection conn = new GetConnection();
                    OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
                    OracleTransaction tran = dbConn.BeginTransaction();
            string msg = "";
            string sp = "";

            if (objPost.Action == "A")
            {
                sp = "CPR_ADD_POST";
                msg = "Successfully Saved.";
            }
            else
            {
                sp = "CPR_EDIT_POST";
                msg = "Successfully Updated.";  
            }

            try
            {
                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objPost.PostID, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_POST_DESC", objPost.PostDesc, OracleDbType.Varchar2, ParameterDirection.Input));
                    //paramList.Add(SqlHelper.GetOraParam(":P_UPSAMUHA_ID", objPost.UpaSamuha.UpaSamuhaID, OracleDbType.Int16, ParameterDirection.Input));
                    //paramList.Add(SqlHelper.GetOraParam(":p_SAMUHA_ID", objPost.Samuha.SamuhaID, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_AVAILABLE_LEVEL", objPost.AvailableLevel, OracleDbType.Int16, ParameterDirection.Input));
                    //paramList.Add(SqlHelper.GetOraParam(":P_PARENT_POST_ID", objPost.ParentPost.PostID, OracleDbType.Int16, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_STATUS", objPost.Status, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objPost.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objPost.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objPost.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objPost.EntryDate, OracleDbType.Date, ParameterDirection.Input));
					paramList.Add(SqlHelper.GetOraParam(":P_DEPT_ID", objPost.DeptID, OracleDbType.Int16, ParameterDirection.Input));
					paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CODE", objPost.OfficeCode, OracleDbType.Int16, ParameterDirection.Input));

					SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    tran.Commit();
                    paramList.Clear();
                }
                else
                {
                    msg = " Error in Saving.";
                    throw new Exception(msg);
                }
            }
            catch (Exception ex)
            {
                msg = "Save Failed.";
                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }
            return msg;
        }

        public List<ATTPost> GetPost(int? postID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTPost> lstPost = new List<ATTPost>();

            try
            {
                string SP = "CPR_GET_POST";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_POST_ID", postID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTPost objPost = new ATTPost();
					objPost.Level = new ATTLevel();
                    objPost.Sewa = new ATTSewa();
					objPost.Samuha = new ATTSamuha();
					objPost.UpaSamuha = new ATTUpaSamuha();
					objPost.ParentPost = new ATTPost();
					objPost.PostID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["POST_ID"].ToString()); 
                    objPost.PostDesc = drow["POST_DESC"].ToString();
                    objPost.Status = drow["STATUS"].ToString();
                    objPost.AvailableLevel = string.IsNullOrEmpty(drow["AVAILABLE_LEVEL"].ToString()) ? (Int16?)null : Int16.Parse(drow["AVAILABLE_LEVEL"].ToString());
					//objPost.DeptID = string.IsNullOrEmpty(drow["DEPT_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["DEPT_ID"].ToString());
					objPost.OfficeCode = string.IsNullOrEmpty(drow["OFFICE_CODE"].ToString()) ? (Int16?)null : Int16.Parse(drow["OFFICE_CODE"].ToString());
					objPost.Action = "";

                    lstPost.Add(objPost);
                }

                return lstPost;
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

		public string DeletePost(Int32? post)
		{
			GetConnection conn = new GetConnection();
			OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);


			try
			{
				string SP = "CPR_DELETE_POST";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":p_POST_ID", post, OracleDbType.Int32, ParameterDirection.InputOutput));
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