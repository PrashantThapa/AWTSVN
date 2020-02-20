﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT;
using HRFA.ATT.COMMON;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLAddressType
    {
        public string SaveAddressType(List<ATTAddressType> lst)
        {
            string SP = "";
            string msg = "No Data to Save!!!";
            string status = "";

            foreach (ATTAddressType obj in lst)
            {
                if (obj.Status == true)
                {
                    status = "A";
                }
                else
                {
                    status = "I";
                }

                if (obj.Action == "E")
                {
                    SP = "CPR_EDIT_ADDRESS_TYPE";
                    msg = "Successfully Updated";
                }
                else
                {
                    SP = "CPR_ADD_ADDRESS_TYPE";
                    msg = "Successfully Added ";
                }

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_ID", obj.AddressTypeID, OracleDbType.Int32, ParameterDirection.InputOutput));
                paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_TYPE_NAME", obj.AddressName, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ADDRESS_TYPE_NAME_ENG", obj.AddressNameEnglish, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_STATUS", status, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Date, ParameterDirection.Input));

                GetConnection conn = new GetConnection();
                OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
                OracleTransaction tran = dbConn.BeginTransaction();


                try
                {
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                   
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

        public string SaveExtraAllowance(List<ATTExtraAllowance> lst, int? spid, OracleTransaction tran)
        {
            string SP = "";
            string msg = "No Data to Save!!!";
            GetConnection conn = new GetConnection();
            try
            {               

                foreach (ATTExtraAllowance obj in lst)
                {
               
                    if (obj.Action == "E")
                    {
                        SP = "DCPR_EDIT_EXTRAALLOWANCE";
                        msg = "Successfully Updated";
                    }
                    else
                    {
                        SP = "DCPR_ADD_EXTRAALLOWANCE";
                        msg = "Successfully Added ";
                    }

                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":P_EA_ID", obj.EAID, OracleDbType.Int32, ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":P_EA_NAME", obj.EAName, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_EA_VALUE", obj.EAValue, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_SP_ID", spid, OracleDbType.Int32, ParameterDirection.Input));
                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception("Error" + ex.Message);
            }

            
            return msg;
        }

        public List<ATTExtraAllowance> GetExtraAllowance(int? SPID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTExtraAllowance> lst = new List<ATTExtraAllowance>();

            try
            {
                string SP = "DCPR_GET_EXTRAALLOWANCE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_SP_ID", SPID, OracleDbType.Int32, ParameterDirection.InputOutput));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTExtraAllowance obj = new ATTExtraAllowance();

                    obj.EAID = Int32.Parse(drow["EA_ID"].ToString());
                    obj.EAName = drow["EA_NAME"].ToString();
                    obj.EAValue = drow["EA_VALUE"].ToString();
                    obj.Action = "";
                    obj.SPID = Int32.Parse(drow["SP_ID"].ToString());


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
        /// Retrives a list of Address Type(s)
        /// </summary>
        /// <param name="addresstypeid"></param>
        /// <returns>Address Type or Null if Address Type does not exist</returns>
        public List<ATTAddressType> GetAddressType(int? addresstypeid)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTAddressType> lst = new List<ATTAddressType>();

            try
            {
                string SP = "CPR_GET_ADDRESS_TYPE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_ADtype_ID", addresstypeid, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTAddressType obj = new ATTAddressType();

                    obj.AddressTypeID = Int32.Parse(drow["ADTYPE_ID"].ToString());
                    obj.AddressName = drow["ADTYPE_NAME"].ToString();
                    obj.AddressNameEnglish = drow["ADTYPE_NAME_ENG"].ToString();
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
        /// This method Delete Address Type
        /// </summary>
        /// <param name="addresstypeid">addresstypeid to be deleted</param>
        /// <returns>String as a Message about Delete Address Type</returns>
        /// 
        public string DeleteAddressType(int? addresstypeid)
        {

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            string SP = "";
            string msg = "";


            try
            {
                SP = "CPR_DEL_ADDRESS_TYPE";
                msg = "Record Deleted Successfully";



                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_ID", addresstypeid, OracleDbType.Int32, ParameterDirection.InputOutput));

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

        public string DeleteExtraAllowance(int? extraallowanceid)
        {

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            string SP = "";
            string msg = "";


            try
            {
                SP = "DCPR_DEL_EXTRAALLOWANCE";
                msg = "Record Deleted Successfully";



                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EA_ID", extraallowanceid, OracleDbType.Int32, ParameterDirection.InputOutput));

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