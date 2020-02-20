using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmployerType
    {

        /// <summary>
        /// This method Save/Update Employer Type
        /// </summary>
        /// <param name="lst"></param>
        /// <returns>String as a Message about Save/Update Employer Type</returns>
        ///
        public string SaveEmployerType(List<ATTEmployerType> lst)
        {
            string msg = "No Data To Save!!! ";
            string SP = "";

            
            string status = "";
            
                foreach (ATTEmployerType obj in lst)
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
                        SP = "CPR_ADD_EMPLOYER_TYPE";
                        msg = "Successfully Saved.";
                    }
                    else if (obj.Action == "E")
                    {
                        SP = "CPR_EDIT_EMPLOYER_TYPE";
                        msg = "Successfully Updated.";
                    }

                    // if (SP != "")
                    //{
                       // obj.EntryBy = "SOSYS_MAIN";

                        List<OracleParameter> paramlist = new List<OracleParameter>();

                        paramlist.Add(SqlHelper.GetOraParam(":p_EMPLOYER_TYPE_ID ", obj.ETypeID, OracleDbType.Int32, ParameterDirection.InputOutput));
                        paramlist.Add(SqlHelper.GetOraParam(":p_EMPLOYER_TYPE_NAME", obj.ETypeName, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramlist.Add(SqlHelper.GetOraParam(":P_EMPLOYER_TYPE_NAME_ENG", obj.ETypeNameEng, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramlist.Add(SqlHelper.GetOraParam(":P_STATUS", status, OracleDbType.Char, ParameterDirection.Input));
                        paramlist.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramlist.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramlist.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Date, ParameterDirection.Input));


                    GetConnection conn = new GetConnection();
                    OracleConnection dbConn = conn.GetDbConn();
                    OracleTransaction tran = dbConn.BeginTransaction();

                     try{
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
              
                dbConn.Close();
            }

        }
      return msg;
   }

        /// <summary>
        /// This method Delete Employer Type
        /// </summary>
        /// <param name="emptypeid">emptypeid to be deleted</param>
        /// <returns>String as a Message about Delete Employer Type</returns>
        ///
        public string DeleteEmployerType(int? emptypeid)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();


            try
            {
                string SP = "CPR_DEL_EMPLOYER_TYPE";
                List<OracleParameter> ParamList = new List<OracleParameter>();
                ParamList.Add(SqlHelper.GetOraParam(":p_EMPLOYER_TYPE_ID", emptypeid, OracleDbType.Int32, ParameterDirection.InputOutput));
                ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Date, ParameterDirection.Input));
                SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, ParamList.ToArray());

                return "Deleted Successfully.";


            }
            catch (Exception ex)
            {

                return ex.Message;

            }
            finally
            {
                
                dbConn.Close();
            }

        }

        /// <summary>
        /// Retrives a list of Employer Type(s)
        /// </summary>
        /// <param name="emptypeid"></param>
        /// <returns>Employer Type or Null if Employer Type does not exist</returns>
        ///
        public List<ATTEmployerType> GetEmployerType(int? emptypeid)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();

            List<ATTEmployerType> lst = new List<ATTEmployerType>();

            try
            {
                string SP = "CPR_GET_EMPLOYER_TYPE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_EMPLOYER_TYPE_ID", emptypeid, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTEmployerType obj = new ATTEmployerType();
                    obj.ETypeID = Int32.Parse(drow["ETYPE_ID"].ToString());
                    obj.ETypeName = drow["ETYPE_NAME"].ToString();
                    obj.ETypeNameEng = drow["ETYPE_NAME_ENG"].ToString();
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
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                dbConn.Close();
            }

            return lst;
        }
    }
}
