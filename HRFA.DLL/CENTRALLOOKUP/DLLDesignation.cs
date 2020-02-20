using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLDesignation
   {
       /// <summary>
       /// This method Save/Update Designation Type
       /// </summary>
       /// <param name="lst"></param>
       /// <returns>String as a Message about Save/Update Designation Type</returns>
       /// 
       public string SaveDesignation(List<ATTDesignation> lst)
       {
           string msg = "No Data To Save!!! ";
           string SP = "";
           string status = "";
           
               foreach (ATTDesignation obj in lst)
               {

                   if (obj.DesStatus == true)
                   {
                       status = "A";
                   }
                   else
                   {
                       status = "I";
                   }
                    
                   if (obj.Action == "A")
                   {
                       SP = "CPR_ADD_DESIGNATION";
                       msg = "Successfully Saved.";
                   }
                   else
                   {
                       SP = "CPR_EDIT_DESIGNATION";
                       msg = "Successfully Updated.";
                   }


                       List<OracleParameter> paramlist = new List<OracleParameter>();

                       paramlist.Add(SqlHelper.GetOraParam(":p_DESIGNATION_ID ", obj.DesTypeID, OracleDbType.Int32, ParameterDirection.InputOutput));
                       paramlist.Add(SqlHelper.GetOraParam(":p_DESIGNATION_NAME", obj.DesTypeName, OracleDbType.Varchar2, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_DESIGNATION_NAME_ENG", obj.DesTypeNameEng, OracleDbType.Varchar2, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_STATUS", status, OracleDbType.Char, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.DesFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Date, ParameterDirection.Input));
                       paramlist.Add(SqlHelper.GetOraParam(":P_ALIAS", obj.DesAlias, OracleDbType.Varchar2, ParameterDirection.Input));

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
       /// This method Delete Designation Type
       /// </summary>
       /// <param name="destypeid">destypeid to be deleted</param>
       /// <returns>String as a Message about Delete Designation Type</returns>
       /// 

       public string DeleteDesignation(int? destypeid)
       {
           GetConnection conn = new GetConnection();
           OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);


           try
           {
               string SP = "CPR_DEL_DESIGNATION";
               List<OracleParameter> ParamList = new List<OracleParameter>();
               ParamList.Add(SqlHelper.GetOraParam(":p_DESIGNATION_ID", destypeid, OracleDbType.Int32, ParameterDirection.InputOutput));
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
       /// Retrives a list of Designation Type(s)
       /// </summary>
       /// <param name="destypeid"></param>
       /// <returns>Designation Type or Null if Designation Type does not exist</returns>

       public List<ATTDesignation> GetDesignation(int? destypeid)
       {
           GetConnection conn = new GetConnection();
           OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

           List<ATTDesignation> lst = new List<ATTDesignation>();

           try
           {
               string SP = "CPR_GET_DESIGNATION";

               List<OracleParameter> paramList = new List<OracleParameter>();
               paramList.Add(SqlHelper.GetOraParam(":p_DESIGNATION_ID", destypeid, OracleDbType.Int32, System.Data.ParameterDirection.Input));
               paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

               DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

               foreach (DataRow drow in ds.Tables[0].Rows)
               {
                   ATTDesignation obj = new ATTDesignation();
                   obj.DesTypeID = Int32.Parse(drow["DES_ID"].ToString());
                   obj.DesTypeName = drow["DES_NAME"].ToString();
                   obj.DesTypeNameEng = drow["DES_NAME_ENG"].ToString();

                   if (drow["STATUS"].ToString() == "A")
                   {
                       obj.DesStatus = true;
                   }
                   else
                   {
                       obj.DesStatus = false;
                   }
                   obj.DesFromDate = drow["FROM_DATE"].ToString();
                   obj.DesAlias = drow["ALIAS"].ToString();
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
