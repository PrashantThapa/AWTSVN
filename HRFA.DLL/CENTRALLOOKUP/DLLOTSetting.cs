using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLOTSetting
    {
        public List<ATTOvertimeSetup> GetOTSetting()
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTOvertimeSetup> lst = new List<ATTOvertimeSetup>();

            try
            {
                string SP = "CPR_GET_OTSETTING";

                List<OracleParameter> paramList = new List<OracleParameter>();               
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTOvertimeSetup obj = new ATTOvertimeSetup();

                    obj.Id = drow["ID"]==null? Int32.Parse(null):Int32.Parse(drow["ID"].ToString());
                    obj.LevelId = drow["LEVELID"]==null?string.Empty: drow["LEVELID"].ToString();
                    obj.Rate = drow["RATE"]==null ? string.Empty: drow["RATE"].ToString();
                    obj.Hour_Count= drow["HOUR_COUNT"] == null ? string.Empty : drow["HOUR_COUNT"].ToString();
                    obj.EnteredBy= drow["ENTER_BY"] == null ? string.Empty : drow["ENTER_BY"].ToString();
                    obj.EnteredBy = drow["ENTER_Date"] == null ? string.Empty : drow["ENTER_Date"].ToString();
                    obj.Action = "E";

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
    }
}
