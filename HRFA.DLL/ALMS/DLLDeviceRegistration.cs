using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLDeviceRegistration
    {
       public string SaveDeviceRegistration(List<ATTDeviceRegistration> lst)
       {
           string SP = "";
           string msg = "No Data to Save!!!";
           
           GetConnection conn = new GetConnection();
           OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
           OracleTransaction tran = dbConn.BeginTransaction();
           try
           {

               foreach (ATTDeviceRegistration obj in lst)
               {
                   //if (obj.Status == true)
                   //{
                   //    status = "A";
                   //}
                   //else
                   //{
                   //    status = "I";
                   //}

                   if (obj.Action == "E")
                   {
                       SP = "CPR_EDIT_DEVICE_REGISTRATION";
                       msg = "Successfully Updated";
                   }
                   else
                   {
                       SP = "CPR_ADD_DEVICE_REGISTRATION";
                       msg = "Successfully Saved ";
                   }

                   if (SP != "")
                   {
                        List<OracleParameter> paramList = new List<OracleParameter>
                        {
                            //objSalaryItem.SalaryItems.SalaryItemID,
                            SqlHelper.GetOraParam(":P_OFFICE_CD", obj.Office.OfficeCode, OracleDbType.Int32, ParameterDirection.Input),
                            SqlHelper.GetOraParam(":P_IP_ADDRESS", obj.IPAddress, OracleDbType.Varchar2, ParameterDirection.Input),
                            SqlHelper.GetOraParam(":P_DEVICE_NAME", obj.DeviceName, OracleDbType.Varchar2, ParameterDirection.Input),

                            SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, ParameterDirection.Input),
                            SqlHelper.GetOraParam(":P_TO_DATE", obj.ToDate, OracleDbType.Varchar2, ParameterDirection.Input),
                            SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input),
                            SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input)
                        };

                        //                  paramList[0].Size = 50;
                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                   }
               }
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

           return msg;
       }

       
       public List<ATTDeviceRegistration> GetDeviceRegistration(int? officeCode)
       {
           GetConnection conn = new GetConnection();
           OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

           List<ATTDeviceRegistration> lst = new List<ATTDeviceRegistration>();

           try
           {
               string SP = "CPR_GET_DEVICE_REGISTRATION";

                List<OracleParameter> paramList = new List<OracleParameter>
                {
                    SqlHelper.GetOraParam(":P_OFFICE_CD", officeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input),
                    SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output)
                };

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

               foreach (DataRow drow in ds.Tables[0].Rows)
               {
                   ATTDeviceRegistration obj = new ATTDeviceRegistration();
                   obj.Office = new ATTOffice();

                   obj.Office.OfficeCode = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int32?)null : Int32.Parse(drow["OFFICE_CD"].ToString());
                     //  Int32.Parse(drow["OFFICE_CD"].ToString());
                   obj.Office.OfficeNameNep = drow["OFFICE_NAME_NEPALI"].ToString();
                   obj.DeviceName = drow["DEVICE_NAME"].ToString();
                   obj.IPAddress = drow["IP_ADDRESS"].ToString();
                   //if (drow["STATUS"].ToString() == "A")
                   //{
                   //    obj.Status = true;
                   //}
                   //else
                   //{
                   //    obj.Status = false;
                   //}
           
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

       public string DeleteDeviceRegistration(ATTDeviceRegistration objDelete)
       {

           GetConnection conn = new GetConnection();
           OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
           ATTDeviceRegistration obj = new ATTDeviceRegistration();

           string SP = "";
           string msg = "";


           try
           {
               SP = "CPR_DEL_DEVICE_REGISTRATION";
               msg = "Record Deleted Successfully";



                List<OracleParameter> paramList = new List<OracleParameter>
                {
                    SqlHelper.GetOraParam(":P_OFFICE_CD", objDelete.Office.OfficeCode, OracleDbType.Int32, ParameterDirection.InputOutput),

                    SqlHelper.GetOraParam(":P_IP_ADDRESS", objDelete.IPAddress, OracleDbType.Varchar2, ParameterDirection.Input),
                    SqlHelper.GetOraParam(":P_DEVICE_NAME", objDelete.DeviceName, OracleDbType.Varchar2, ParameterDirection.Input),

                    SqlHelper.GetOraParam("P_FROM_DATE", objDelete.FromDate, OracleDbType.Varchar2, ParameterDirection.Input),
                    SqlHelper.GetOraParam(":P_TO_DATE", objDelete.ToDate, OracleDbType.Varchar2, ParameterDirection.Input),
                    SqlHelper.GetOraParam("P_ENTRY_BY", objDelete.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input),
                    SqlHelper.GetOraParam("P_ENTRY_DATE", objDelete.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input)
                };

                paramList[0].Size = 50;
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
