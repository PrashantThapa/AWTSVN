using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLContactType
    {

        /// <summary>
        /// This method Save/Update Contact Type
        /// </summary>
        /// <param name="lst"></param>
        /// <returns>String as a Message about Save/Update Contact Type</returns>
        /// 
         public string SaveContactType(List<ATTContactType> lst)
        {
            string msg = "No Data to Save!!!";
            string SP = "";
            string status = "";

            foreach (ATTContactType obj in lst)
            {

                if (obj.Status == true)
                {
                    status = "A";
                }
                else
                {
                    status = "I";
                }



                if (obj.Action == "A")
                {
                    SP = "CPR_ADD_CONTACT_TYPE";
                    msg = "Successfully Saved.";
                }
                else if (obj.Action == "E")
                {
                    SP = "CPR_EDIT_CONTACT_TYPE";
                    msg = "Successfully Updated.";
                }


               // obj.EntryBy = "SOSYS_MAIN";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_TYPE_ID", obj.TypeID, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
                paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_TYPE_NAME", obj.TypeName, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_CONTACT_TYPE_NAME_ENG", obj.TypeNameEng, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_STATUS", status, OracleDbType.Char, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Date, System.Data.ParameterDirection.Input));

                GetConnection conn = new GetConnection();
                OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
                OracleTransaction tran = dbConn.BeginTransaction();
                try
                {

                    SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, SP, paramList.ToArray());
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
         /// Retrives a list of Contact Type(s)
         /// </summary>
         /// <param name="contacttypeid"></param>
         /// <returns>Contact Type or Null if Contact Type does not exist</returns>
         public List<ATTContactType> GetContactType(int? contacttypeid)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTContactType> lst = new List<ATTContactType>();

            try
            {
                string SP = "CPR_GET_CONTACT_TYPE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_Ctype_ID", contacttypeid, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn,CommandType.StoredProcedure, SP, paramList.ToArray());


                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTContactType obj = new ATTContactType();

                    obj.TypeID = int.Parse(drow["CTYPE_ID"].ToString());
                    obj.TypeName = drow["CTYPE_NAME"].ToString();
                    obj.TypeNameEng = drow["CTYPE_NAME_ENG"].ToString();
                    if (drow["STATUS"].ToString() == "A")
                    {
                        obj.Status = true;
                    }
                    else
                    {
                        obj.Status = false;
                    }
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.Action = "";
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
         /// <summary>
         /// This method Delete Contact Type
         /// </summary>
         /// <param name="contacttypeid">contacttypeid to be deleted</param>
         /// <returns>String as a Message about Delete Contact Type</returns>
         /// 
        public string DeleteContactType(int? contacttypeid)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            string SP = "";
            string msg = "";
            try
            {
                SP = "CPR_DEL_CONTACT_TYPE";
                msg = "Record Deleted Successfully";

                
                      List<OracleParameter> paramList = new List<OracleParameter>();
                      paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_TYPE_ID", contacttypeid, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
                      paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));

                      SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                      return msg;
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