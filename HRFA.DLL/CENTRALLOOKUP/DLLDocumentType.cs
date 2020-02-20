using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLDocumentType
    {
        public string SaveDocumentType(List<ATTDocumentType> lst)
        {
            string msg = "No Data To Save!!! ";
            string SP = "";
            string status = "";
            string usedfor = "";

            foreach (ATTDocumentType documentType in lst)
            {

                if (documentType.Status == true)
                {
                    status = "A";
                }
                else
                {
                    status = "I";
                }


                if (documentType.UsedFor == "Person")
                {
                    usedfor = "P";
                }
                else if (documentType.UsedFor == "Entity")
                {
                    usedfor = "E";
                }

                if (documentType.Action == "A")
                {
                    SP = "CPR_ADD_DOCUMENT_TYPE";
                    msg = "Successfully Saved.";
                    
                }
                else if (documentType.Action == "E")
                {
                    SP = "CPR_EDIT_DOCUMENT_TYPE";
                    msg = "Successfully Updated.";
                }

                

                //documentType.EntryBy = "SOSYS_MAIN";

                List<OracleParameter> paramlist = new List<OracleParameter>();

                paramlist.Add(SqlHelper.GetOraParam(":p_DOCUMENT_TYPE_ID ", documentType.TypeID, OracleDbType.Int32, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":p_DOCUMENT_TYPE_NAME", documentType.TypeName, OracleDbType.Varchar2, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_DOCUMENT_TYPE_NAME_ENG", documentType.TypeNameEng, OracleDbType.Varchar2, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_USED_FOR", usedfor, OracleDbType.Char, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_STATUS", status, OracleDbType.Char, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_FROM_DATE", documentType.FromDate, OracleDbType.Varchar2, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", documentType.EntryBy, OracleDbType.Varchar2, ParameterDirection.InputOutput));
                paramlist.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", documentType.EntryDate, OracleDbType.Date, ParameterDirection.Input));

                GetConnection conn = new GetConnection();
                OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
                OracleTransaction tran = dbConn.BeginTransaction();

                try
                {
                    SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, SP, paramlist.ToArray());
                    tran.Commit();
                   
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
            return msg;
        }


        /// <summary>
        /// This method Delete Document Type
        /// </summary>
        /// <param name="doctypeid">doctypeid to be deleted</param>
        /// <returns>String as a Message about Document Contact Type</returns>
        /// 
        public string DeleteDocumentType(int? doctypeid)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            

            try
            {
                string SP = "CPR_DEL_DOCUMENT_TYPE";
                List<OracleParameter> ParamList = new List<OracleParameter>();
                ParamList.Add(SqlHelper.GetOraParam(":p_DOCUMENT_TYPE_ID", doctypeid, OracleDbType.Int32, ParameterDirection.InputOutput));
                ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Date, ParameterDirection.Input));
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


        /// <summary>
        /// Retrives a list of Document Type(s)
        /// </summary>
        /// <param name="doctypeid"></param>
        /// <returns>Document Type or Null if Document Type does not exist</returns>
        /// 
        public List<ATTDocumentType> GetDocumentType(int? doctypeid, string usedfor)// parameter usedfor added by shanjeev for Employer DocType
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTDocumentType> lst = new List<ATTDocumentType>();

            try
            {
                string SP = "CPR_GET_DOCUMENT_TYPE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_DOCUMENT_TYPE_ID", doctypeid, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));
                paramList.Add(SqlHelper.GetOraParam(":p_USEDFOR", usedfor, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTDocumentType obj = new ATTDocumentType();
                    obj.TypeID = Int32.Parse(drow["DTYPE_ID"].ToString());
                    obj.TypeName = drow["DTYPE_NAME"].ToString();
                    obj.TypeNameEng = drow["DTYPE_NAME_ENG"].ToString();
                    //obj.UsedFor = drow["USED_FOR"].ToString();
                    if (drow["USED_FOR"].ToString() == "P")
                    {
                        obj.UsedFor = "Person";
                    }
                    else if (drow["USED_FOR"].ToString() == "E")
                    {
                        obj.UsedFor = "Entity";
                    }
                    //obj.Status = drow["STATUS"].ToString();
                    else
                    {
                        obj.UsedFor = "Entity";
                    }
                    if (drow["STATUS"].ToString() == "A")
                    {
                        obj.Status = true;
                    }
                    else
                    {
                        obj.Status = false;
                    }
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    //obj.ToDate = drow["TO_DATE"].ToString();
                    obj.Action = "";
                    lst.Add(obj);
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }

            return lst;
        }



        public List<ATTDocumentType> GetDocumentTypes(int? doctypeid)// for jasmin work
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTDocumentType> lst = new List<ATTDocumentType>();

            try
            {
                string SP = "CPR_GET_ALL_DOC_TYPE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTDocumentType obj = new ATTDocumentType();
                    obj.TypeID = Int32.Parse(drow["DTYPE_ID"].ToString());
                    obj.TypeName = drow["DTYPE_NAME"].ToString();
                    obj.TypeNameEng = drow["DTYPE_NAME_ENG"].ToString();
                    obj.UsedFor = drow["USED_FOR"].ToString();
                    if (drow["USED_FOR"].ToString() == "P")
                    {
                        obj.UsedFor = "Person";
                    }
                    else if (drow["USED_FOR"].ToString() == "E")
                    {
                        obj.UsedFor = "Entity";
                    }
                    else 
                    {
                        obj.UsedFor = "Entity";
                    }
                    // obj.Status = drow["STATUS"].ToString();
                    if (drow["STATUS"].ToString() == "A")
                    {
                        obj.Status = true;
                    }
                    else
                    {
                        obj.Status = false;
                    }
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.ToDate = drow["TO_DATE"].ToString();
                    obj.Action = "";
                    lst.Add(obj);
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }

            return lst;
        }
    }
}
       
   