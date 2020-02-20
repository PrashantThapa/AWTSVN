﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLLevel
    {
        public List<ATTLevel> GetLevel(int? levelID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTLevel> lstLevel = new List<ATTLevel>();
            
            try
            {
                string SP = "CPR_GET_LEVEL";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_LEVEL_ID", levelID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTLevel objLevel = new ATTLevel();
                    //objLevel.LevelID = string.IsNullOrEmpty(drow["LEVEL_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["LEVEL_ID"].ToString()); 
                    //objLevel.LevelDesc = drow["LEVEL_DESC"].ToString();
                    //objLevel.LevelDescEng = drow["LEVEL_DESC_ENG"].ToString();
                    objLevel.Action = "";
                    lstLevel.Add(objLevel);
                }
                return lstLevel;
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

        public object GetLevels()
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTLevel> lstLevel = new List<ATTLevel>();

            try
            {
                string SP = "CPR_GET_LEVEL";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_LEVEL_ID", null, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTLevel objLevel = new ATTLevel();
                    //objLevel.LevelID = string.IsNullOrEmpty(drow["LEVEL_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["LEVEL_ID"].ToString());
                    //objLevel.LevelDesc = drow["LEVEL_DESC"].ToString();
                    //objLevel.LevelDescEng = drow["LEVEL_DESC_ENG"].ToString();
                    objLevel.Action = "";
                    lstLevel.Add(objLevel);
                }
                return lstLevel;
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