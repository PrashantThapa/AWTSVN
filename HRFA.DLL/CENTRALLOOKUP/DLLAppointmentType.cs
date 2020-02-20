using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLAppointmentType
    {
        public List<ATTAppointmentType> GetAppointmentType(Int32? ApptTypeID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            string SP = "CPR_GET_APPOINTMENT_TYPE";
            List<ATTAppointmentType> lst = new List<ATTAppointmentType>();
            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_APPT_TYPE_ID", ApptTypeID, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTAppointmentType obj = new ATTAppointmentType();

                    obj.ApptTypeID = Convert.ToInt32(drow["APPT_TYPE_ID"].ToString());
                    obj.ApptTypeDesc = drow["APPT_DESC"].ToString();
                   

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
                getConn.CloseDbConn();
            }

        }
    }
}
