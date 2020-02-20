using System;
using System.Data;
using System.Xml;
using System.Collections;
using HRFA.ATT;
using System.Web;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.COMMON
{
    

    public sealed class GetConnection
    {
        string oradb = "Data Source=(DESCRIPTION="
               + "(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=" + CredentialManager.Host + ")(PORT=" + CredentialManager.PortNo + ")))"
               + "(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME="+ CredentialManager.ServiceName +")));";

        string pooling = "";

        OracleConnection objCon = new OracleConnection();
        
        

        private void MakeConnection()
        {
            try
            {

                string username = CredentialManager.GetModuleUserName((int)Module.ESSP);
                string password = CredentialManager.GetModulePassword((int)Module.ESSP);
               oradb = oradb + "User Id=" + username + ";Password=" + password + ";" + pooling;

                objCon.ConnectionString = oradb;
                objCon.Open();
            }
            //Catching Oracle error
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));

            }
            //catching Other Error
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);

            }
        }
        

        private void MakeConnection(GenericUser user)
        {
            try
            {

				string username = "HR_OWNER_DEMO";//user.DatabaseAccessUserName;
				string password = "HR_OWNER_DEMO"; //user.DatabaseAccessUserPassword;
                oradb = oradb + "User Id=" + username + ";Password=" + password + ";";

                objCon.ConnectionString = oradb;
                objCon.Open();
            }
            //Catching Oracle error
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));

            }
            //catching Other Error
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);

            }
        }

        private void MakeConnection(Module moduleName)
        {
            string username, password;
            username = CredentialManager.GetModuleUserName((int)moduleName);
            password = CredentialManager.GetModulePassword((int)moduleName);

            try
            {

                oradb = oradb + "User Id=" + username + ";Password=" + password + pooling;

                objCon.ConnectionString = oradb;
                objCon.Open();

            }
            //Catching Oracle error
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            //catching Other Error
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);

            }
        }

        public OracleConnection GetDbConn()
        {
            MakeConnection();
            return objCon;
        }

        public OracleConnection GetDbConn(GenericUser user)
        {
            MakeConnection(user);
            return objCon;
        }

        public OracleConnection GetDbConn(Module moduleName)
        {
            MakeConnection(moduleName);
            return objCon;
        }

        public OracleConnection GetDbConn(PortalUser user)
        {
            MakeConnection(user.DatabaseAccessUserName,user.DatabaseAccessUserPassword);
            return objCon;
        }


        public void CloseDbConn()
        {
            if (objCon.State == ConnectionState.Open)
            {
                objCon.Close();
                objCon.Dispose();
            }
        }

    

        private void MakeConnection(string username, string password)
        {
            try
            {
                oradb = oradb + "User Id=" + username + ";Password=" + password + ";" + pooling;

                objCon.ConnectionString = oradb;
                objCon.Open();
            }
            //Catching Oracle error
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));

            }
            //catching Other Error
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);

            }
        }



        public OracleConnection GetDbConn(string username, string password)
        {
            MakeConnection(username, password);
            return objCon;
        }

        public GenericUser LoginUser{
            get
            {
                GenericUser session = (GenericUser)HttpContext.Current.Session["User"];
                
                return session;
            }
        }


		public PortalUser LoginUsers
		{
			get
			{
				PortalUser session = (PortalUser)HttpContext.Current.Session["PUser"];

				return session;
			}
		}
	}


    public sealed class SqlHelper
    {
        #region private HRFA.COMMON methods & constructors

        private SqlHelper()
        {
        }
        public static OracleParameter GetOraParam(string paramName, object paramValue, OracleDbType paramDBType, ParameterDirection paramDirection)
        {
            return new OracleParameter(paramName, paramDBType, paramValue, paramDirection);
        }
        private static void AttachParameters(OracleCommand command, OracleParameter[] commandParameters)
        {
            //command.Parameters.Clear();

            foreach (OracleParameter p in commandParameters)
            {
                //check for derived output value with no value assigned
                if ((p.Direction == ParameterDirection.InputOutput) && (p.Value == null))
                {
                    p.Value = DBNull.Value;
                }

                command.Parameters.Add(p);
            }
        }

        private static void AssignParameterValues(OracleParameter[] commandParameters, object[] parameterValues)
        {
            if ((commandParameters == null) || (parameterValues == null))
            {
                //do nothing if we get no data
                return;
            }

            // we must have the same number of values as we pave parameters to put them in
            if (commandParameters.Length != parameterValues.Length)
            {
                throw new ArgumentException("Parameter count does not match Parameter Value count.");
            }

            //iterate through the OracleParameters, assigning the values from the corresponding position in the 
            //value array
            for (int i = 0, j = commandParameters.Length; i < j; i++)
            {
                commandParameters[i].Value = parameterValues[i];
            }
        }

        private static void PrepareCommand(OracleCommand command, OracleConnection connection, OracleTransaction transaction, CommandType commandType, string commandText, OracleParameter[] commandParameters)
        {
            //if the provided connection is not open, we will open it
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }

            //associate the connection with the command
            command.Connection = connection;

            //set the command text (stored procedure name or SQL statement)
            command.CommandText = commandText;

            //if we were provided a transaction, assign it.

            if (transaction != null)
            {
                //command.Transaction = transaction;
            }

            //set the command type
            command.CommandType = commandType;

            //attach the command parameters if they are provided
            if (commandParameters != null)
            {
                AttachParameters(command, commandParameters);
            }

            return;
        }

        #endregion private HRFA.COMMON methods & constructors

        #region ExecuteNonQuery
        public static int ExecuteNonQuery(GenericUser user, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn(user);
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);

            //finally, execute the command.
            try
            {
                int retval = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                return retval;
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
        }
        //smandar
        public static int ExecuteNonQuery(GenericUser user, CommandType commandType, string commandText)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn(user);
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, (OracleParameter[])null);

            //finally, execute the command.
            try
            {
                int retval = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                return retval;
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
        }
        public static int ExecuteNonQuery(OracleConnection objConn, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteNonQuery(objConn, commandType, commandText, (OracleParameter[])null);
        }

        public static int ExecuteNonQuery(OracleConnection objConn, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteNonQuery(objConn, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQuery(objConn, CommandType.StoredProcedure, spName);
            }
        }

        public static int ExecuteNonQuery(OracleConnection objConn, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);

            //finally, execute the command.
            try
            {
                int retval = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                return retval;
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
        }

        public static int ExecuteNonQuery(OracleTransaction transaction, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            try
            {
                //finally, execute the command.
                 int retval = cmd.ExecuteNonQuery();

                // detach the OracleParameters from the command object, so they can be used again.
                cmd.Parameters.Clear();
                return retval;
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

        }
        //By smandar
        public static int ExecuteNonQuery(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, (OracleParameter[])null);

            try
            {
                //finally, execute the command.
                int retval = cmd.ExecuteNonQuery();

                // detach the OracleParameters from the command object, so they can be used again.
                cmd.Parameters.Clear();
                return retval;
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

        }

        public static double ExecuteNonQuery(OracleTransaction transaction, CommandType commandType, string commandText, OracleParameter outParam, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            //finally, execute the command.
            int retval = cmd.ExecuteNonQuery();
            double dblID = double.Parse(outParam.Value.ToString());
            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            return dblID;
        }

        #endregion ExecuteNonQuery

        #region ExecuteDataSet
        //By Smandar
        public static DataSet ExecuteDataset(GenericUser user, CommandType commandType, string commandText)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn(user);
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, (OracleParameter[])null);
            DataSet ds = new DataSet();
            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);

                //fill the DataSet using default values for DataTable names, etc.
                da.Fill(ds);

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
                gc.CloseDbConn();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;
        }

		public static DataSet ExecutePortalDataset(PortalUser user, CommandType commandType, string commandText)
		{
			//create a command and prepare it for execution

			GetConnection gc = new GetConnection();
			OracleConnection objConn;

			try
			{
				objConn = gc.GetDbConn(user);
			}
			catch (OracleException oex)
			{
				gc.CloseDbConn();
				OracleError oe = new OracleError();
				throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
			}

			OracleCommand cmd = new OracleCommand();
			PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, (OracleParameter[])null);
			DataSet ds = new DataSet();
			try
			{
				OracleDataAdapter da = new OracleDataAdapter(cmd);

				//fill the DataSet using default values for DataTable names, etc.
				da.Fill(ds);

				// detach the OracleParameters from the command object, so they can be used again.			
				cmd.Parameters.Clear();
				gc.CloseDbConn();
			}
			catch (OracleException oex)
			{
				OracleError oe = new OracleError();
				throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
			}
			if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
			{
				return null;
			}
			return ds;
		}

		public static DataSet ExecuteDataset(GenericUser user, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn(user);
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);
            DataSet ds = new DataSet();
            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);

                //fill the DataSet using default values for DataTable names, etc.
                da.Fill(ds);

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
                gc.CloseDbConn();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;
        }

		public static DataSet ExecutePortalDataset(PortalUser user, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
		{
			//create a command and prepare it for execution

			GetConnection gc = new GetConnection();
			OracleConnection objConn;

			try
			{
				objConn = gc.GetDbConn(user);
			}
			catch (OracleException oex)
			{
				gc.CloseDbConn();
				OracleError oe = new OracleError();
				throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
			}

			OracleCommand cmd = new OracleCommand();
			PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);
			DataSet ds = new DataSet();
			try
			{
				OracleDataAdapter da = new OracleDataAdapter(cmd);

				//fill the DataSet using default values for DataTable names, etc.
				da.Fill(ds);

				// detach the OracleParameters from the command object, so they can be used again.			
				cmd.Parameters.Clear();
				gc.CloseDbConn();
			}
			catch (OracleException oex)
			{
				OracleError oe = new OracleError();
				throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
			}
			if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
			{
				return null;
			}
			return ds;
		}

		public static DataSet ExecuteDataset(CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn();
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);
            DataSet ds = new DataSet();
            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);

                //fill the DataSet using default values for DataTable names, etc.
                da.Fill(ds);

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
                gc.CloseDbConn();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;
        }

        public static DataSet ExecuteDataset(CommandType commandType, string commandText, int sIndex, int eIndex, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn();
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);
            DataSet ds = new DataSet();
            ds.Tables.Add(new DataTable("tbl"));
            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);

                //fill the DataSet using default values for DataTable names, etc.
                int max = da.Fill(ds, sIndex, eIndex, "tbl");

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
                gc.CloseDbConn();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;
        }

        public static DataSet ExecuteDataset(OracleConnection objConn, CommandType commandType, string commandText)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();

            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, (OracleParameter[])null);
            DataSet ds = new DataSet();
            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);


                //fill the DataSet using default values for DataTable names, etc.
                da.Fill(ds);

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
                gc.CloseDbConn();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;


        }

        public static DataSet ExecuteDataset(PortalUser user, CommandType commandType, string commandText, OracleParameter[] oracleParameter)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteDataset(commandType, commandText, (OracleParameter[])null);
        }

        public static DataSet ExecuteDataset(string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteDataset(CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteDataset(CommandType.StoredProcedure, spName);
            }
        }

        public static DataSet ExecuteDataset(OracleConnection Con, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, Con, (OracleTransaction)null, commandType, commandText, commandParameters);
            DataSet ds = new DataSet();
            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);

                //fill the DataSet using default values for DataTable names, etc.
                da.Fill(ds);

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;
        }

        public static DataSet ExecuteDataset(OracleConnection Con, CommandType commandType, string commandText, int sIndex, int eIndex, params OracleParameter[] commandParameters)
        {
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, Con, (OracleTransaction)null, commandType, commandText, commandParameters);
            DataSet ds = new DataSet();
            DataTable tbl = new DataTable("tbl");
            ds.Tables.Add(tbl);

            try
            {
                OracleDataAdapter da = new OracleDataAdapter(cmd);

                //fill the DataSet using default values for DataTable names, etc.
                da.Fill(ds, sIndex, eIndex, "tbl");

                // detach the OracleParameters from the command object, so they can be used again.			
                cmd.Parameters.Clear();
            }
            catch (OracleException oex)
            {
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            if (ds == null || ds.Tables == null || ds.Tables.Count == 0)
            {
                return null;
            }
            return ds;
        }

        public static DataSet ExecuteDataset(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteDataset(transaction, commandType, commandText, (OracleParameter[])null);
        }

        public static DataSet ExecuteDataset(OracleTransaction transaction, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            //create the DataAdapter & DataSet
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            DataSet ds = new DataSet();

            //fill the DataSet using default values for DataTable names, etc.
            da.Fill(ds);

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();

            //return the dataset
            return ds;
        }

        public static DataSet ExecuteDataset(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteDataset(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteDataset(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteDataSet

        #region ExecuteReader

        private enum OracleConnectionOwnership
        {
            /// <summary>Connection is owned and managed by SqlHelper</summary>
            Internal,
            /// <summary>Connection is owned and managed by the caller</summary>
            External
        }


        private static OracleDataReader ExecuteReader(OracleTransaction transaction, CommandType commandType, string commandText, OracleParameter[] commandParameters, OracleConnectionOwnership connectionOwnership)
        {
            //create a command and prepare it for execution

            GetConnection gc = new GetConnection();
            OracleConnection objConn;
            try
            {
                objConn = gc.GetDbConn();

            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }

            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, transaction, commandType, commandText, commandParameters);

            //create a reader
            OracleDataReader dr;

            // call ExecuteReader with the appropriate CommandBehavior
            if (connectionOwnership == OracleConnectionOwnership.External)
            {
                dr = cmd.ExecuteReader();
            }
            else
            {
                dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            gc.CloseDbConn();
            return dr;
        }

        public static OracleDataReader ExecuteReader(CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteReader(commandType, commandText, (OracleParameter[])null);
        }


        public static OracleDataReader ExecuteReader(CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create & open a OracleConnection

            //call the private overload that takes an internally owned connection in place of the connection string
            return ExecuteReader(null, commandType, commandText, commandParameters, OracleConnectionOwnership.Internal);

        }


        public static OracleDataReader ExecuteReader(string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteReader(CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteReader(CommandType.StoredProcedure, spName);
            }
        }










        public static OracleDataReader ExecuteReader(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteReader(transaction, commandType, commandText, (OracleParameter[])null);
        }

        public static OracleDataReader ExecuteReader(OracleTransaction transaction, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //pass through to private overload, indicating that the connection is owned by the caller
            return ExecuteReader(transaction, commandType, commandText, commandParameters, OracleConnectionOwnership.External);
        }

        public static OracleDataReader ExecuteReader(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                AssignParameterValues(commandParameters, parameterValues);

                return ExecuteReader(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteReader(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteReader

        #region ExecuteScalar
        public static object ExecuteScalar(GenericUser user, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {

            GetConnection gc = new GetConnection();
            OracleConnection objConn;

            try
            {
                objConn = gc.GetDbConn(user);
            }
            catch (OracleException oex)
            {
                gc.CloseDbConn();
                OracleError oe = new OracleError();
                throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
            }
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, objConn, (OracleTransaction)null, commandType, commandText, commandParameters);

            //execute the command & return the results
            object retval = cmd.ExecuteScalar();

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            return retval;

        }
        /// <summary>
        /// Execute a OracleCommand (that returns a 1x1 resultset and takes no parameters) against the database specified in 
        /// the connection string. 
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(connString, CommandType.StoredProcedure, "GetOrderCount");
        /// </remarks>
        /// <param name="connectionString">a valid connection string for a OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(string connectionString, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteScalar(connectionString, commandType, commandText, (OracleParameter[])null);
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a 1x1 resultset) against the database specified in the connection string 
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(connString, CommandType.StoredProcedure, "GetOrderCount", new OracleParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connectionString">a valid connection string for a OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command</param>
        /// <param name="commandParameters">an array of SqlParamters used to execute the command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(string connectionString, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create & open a OracleConnection, and dispose of it after we are done.
            using (OracleConnection cn = new OracleConnection(connectionString))
            {
                cn.Open();

                //call the overload that takes a connection in place of the connection string
                try
                {
                    return ExecuteScalar(cn, commandType, commandText, commandParameters);
                }
                catch
                {
                    cn.Close();
                    return null;
                }

            }
        }

        /// <summary>
        /// Execute a stored procedure via a OracleCommand (that returns a 1x1 resultset) against the database specified in 
        /// the connection string using the provided parameter values.  This method will query the database to discover the parameters for the 
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        /// 
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(connString, "GetOrderCount", 24, 36);
        /// </remarks>
        /// <param name="connectionString">a valid connection string for a OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(string connectionString, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteScalar(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteScalar(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a 1x1 resultset and takes no parameters) against the provided OracleConnection. 
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(conn, CommandType.StoredProcedure, "GetOrderCount");
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleConnection connection, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteScalar(connection, commandType, commandText, (OracleParameter[])null);
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a 1x1 resultset) against the specified OracleConnection 
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(conn, CommandType.StoredProcedure, "GetOrderCount", new OracleParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command</param>
        /// <param name="commandParameters">an array of SqlParamters used to execute the command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleConnection connection, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, (OracleTransaction)null, commandType, commandText, commandParameters);

            //execute the command & return the results
            object retval = cmd.ExecuteScalar();

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            return retval;

        }

        /// <summary>
        /// Execute a stored procedure via a OracleCommand (that returns a 1x1 resultset) against the specified OracleConnection 
        /// using the provided parameter values.  This method will query the database to discover the parameters for the 
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        /// 
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(conn, "GetOrderCount", 24, 36);
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleConnection connection, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteScalar(connection, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteScalar(connection, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a 1x1 resultset and takes no parameters) against the provided OracleTransaction. 
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(trans, CommandType.StoredProcedure, "GetOrderCount");
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteScalar(transaction, commandType, commandText, (OracleParameter[])null);
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a 1x1 resultset) against the specified OracleTransaction
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(trans, CommandType.StoredProcedure, "GetOrderCount", new OracleParameter("@prodid", 24));
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command</param>
        /// <param name="commandParameters">an array of SqlParamters used to execute the command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleTransaction transaction, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            //execute the command & return the results
            object retval = cmd.ExecuteScalar();

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            return retval;
        }

        /// <summary>
        /// Execute a stored procedure via a OracleCommand (that returns a 1x1 resultset) against the specified
        /// OracleTransaction using the provided parameter values.  This method will query the database to discover the parameters for the 
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        /// 
        /// e.g.:  
        ///  int orderCount = (int)ExecuteScalar(trans, "GetOrderCount", 24, 36);
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteScalar(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteScalar(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteScalar

        #region ExecuteXmlReader

        /// <summary>
        /// Execute a OracleCommand (that returns a resultset and takes no parameters) against the provided OracleConnection. 
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  XmlReader r = ExecuteXmlReader(conn, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command using "FOR XML AUTO"</param>
        /// <returns>an XmlReader containing the resultset generated by the command</returns>
        public static XmlReader ExecuteXmlReader(OracleConnection connection, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteXmlReader(connection, commandType, commandText, (OracleParameter[])null);
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a resultset) against the specified OracleConnection 
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  XmlReader r = ExecuteXmlReader(conn, CommandType.StoredProcedure, "GetOrders", new OracleParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command using "FOR XML AUTO"</param>
        /// <param name="commandParameters">an array of SqlParamters used to execute the command</param>
        /// <returns>an XmlReader containing the resultset generated by the command</returns>
        public static XmlReader ExecuteXmlReader(OracleConnection connection, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, (OracleTransaction)null, commandType, commandText, commandParameters);

            //create the DataAdapter & DataSet
            XmlReader retval = cmd.ExecuteXmlReader();

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            return retval;

        }

        /// <summary>
        /// Execute a stored procedure via a OracleCommand (that returns a resultset) against the specified OracleConnection 
        /// using the provided parameter values.  This method will query the database to discover the parameters for the 
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        /// 
        /// e.g.:  
        ///  XmlReader r = ExecuteXmlReader(conn, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="spName">the name of the stored procedure using "FOR XML AUTO"</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an XmlReader containing the resultset generated by the command</returns>
        public static XmlReader ExecuteXmlReader(OracleConnection connection, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteXmlReader(connection, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteXmlReader(connection, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a resultset and takes no parameters) against the provided OracleTransaction. 
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  XmlReader r = ExecuteXmlReader(trans, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command using "FOR XML AUTO"</param>
        /// <returns>an XmlReader containing the resultset generated by the command</returns>
        public static XmlReader ExecuteXmlReader(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            //pass through the call providing null for the set of OracleParameters
            return ExecuteXmlReader(transaction, commandType, commandText, (OracleParameter[])null);
        }

        /// <summary>
        /// Execute a OracleCommand (that returns a resultset) against the specified OracleTransaction
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:  
        ///  XmlReader r = ExecuteXmlReader(trans, CommandType.StoredProcedure, "GetOrders", new OracleParameter("@prodid", 24));
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-SQL command using "FOR XML AUTO"</param>
        /// <param name="commandParameters">an array of SqlParamters used to execute the command</param>
        /// <returns>an XmlReader containing the resultset generated by the command</returns>
        public static XmlReader ExecuteXmlReader(OracleTransaction transaction, CommandType commandType, string commandText, params OracleParameter[] commandParameters)
        {
            //create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            //create the DataAdapter & DataSet
            XmlReader retval = cmd.ExecuteXmlReader();

            // detach the OracleParameters from the command object, so they can be used again.
            cmd.Parameters.Clear();
            return retval;
        }

        /// <summary>
        /// Execute a stored procedure via a OracleCommand (that returns a resultset) against the specified 
        /// OracleTransaction using the provided parameter values.  This method will query the database to discover the parameters for the 
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        /// 
        /// e.g.:  
        ///  XmlReader r = ExecuteXmlReader(trans, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static XmlReader ExecuteXmlReader(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                //pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                OracleParameter[] commandParameters = SqlHelperParameterCache.GetSpParameterSet(spName);

                //assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                //call the overload that takes an array of OracleParameters
                return ExecuteXmlReader(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }
            //otherwise we can just call the SP without params
            else
            {
                return ExecuteXmlReader(transaction, CommandType.StoredProcedure, spName);
            }
        }


        #endregion ExecuteXmlReader

        /// <summary>
        /// SqlHelperParameterCache provides functions to leverage a static cache of procedure parameters, and the
        /// ability to discover parameters for stored procedures at run-time.
        /// </summary>
        public sealed class SqlHelperParameterCache
        {
            #region private methods, variables, and constructors

            //Since this class provides only static methods, make the default constructor private to prevent 
            //instances from being created with "new SqlHelperParameterCache()".
            private SqlHelperParameterCache() { }

            private static Hashtable paramCache = Hashtable.Synchronized(new Hashtable());

            /// <summary>
            /// resolve at run time the appropriate set of OracleParameters for a stored procedure
            /// </summary>
            /// <param name="connectionString">a valid connection string for a OracleConnection</param>
            /// <param name="spName">the name of the stored procedure</param>
            /// <param name="includeReturnValueParameter">whether or not to include their return value parameter</param>
            /// <returns></returns>
            //private static OracleParameter[] DiscoverSpParameterSet(string connectionString, string spName, bool includeReturnValueParameter)
            //{
            //    using (OracleConnection cn = new OracleConnection(connectionString))
            //    using (OracleCommand cmd = new OracleCommand(spName, cn))
            //    {
            //        cn.Open();
            //        cmd.CommandType = CommandType.StoredProcedure;

            //        OracleCommandBuilder.DeriveParameters(cmd);

            //        if (!includeReturnValueParameter)
            //        {
            //            cmd.Parameters.RemoveAt(0);
            //        }

            //        OracleParameter[] discoveredParameters = new OracleParameter[cmd.Parameters.Count]; ;

            //        cmd.Parameters.CopyTo(discoveredParameters, 0);

            //        return discoveredParameters;
            //    }
            //}

            //deep copy of cached OracleParameter array
            private static OracleParameter[] CloneParameters(OracleParameter[] originalParameters)
            {
                OracleParameter[] clonedParameters = new OracleParameter[originalParameters.Length];

                for (int i = 0, j = originalParameters.Length; i < j; i++)
                {
                    clonedParameters[i] = (OracleParameter)((ICloneable)originalParameters[i]).Clone();
                }

                return clonedParameters;
            }

            #endregion private methods, variables, and constructors

            #region caching functions

            /// <summary>
            /// add parameter array to the cache
            /// </summary>
            /// <param name="connectionString">a valid connection string for a OracleConnection</param>
            /// <param name="commandText">the stored procedure name or T-SQL command</param>
            /// <param name="commandParameters">an array of SqlParamters to be cached</param>
            public static void CacheParameterSet(string connectionString, string commandText, params OracleParameter[] commandParameters)
            {
                string hashKey = connectionString + ":" + commandText;

                paramCache[hashKey] = commandParameters;
            }

            /// <summary>
            /// retrieve a parameter array from the cache
            /// </summary>
            /// <param name="connectionString">a valid connection string for a OracleConnection</param>
            /// <param name="commandText">the stored procedure name or T-SQL command</param>
            /// <returns>an array of SqlParamters</returns>
            public static OracleParameter[] GetCachedParameterSet(string connectionString, string commandText)
            {
                string hashKey = connectionString + ":" + commandText;

                OracleParameter[] cachedParameters = (OracleParameter[])paramCache[hashKey];

                if (cachedParameters == null)
                {
                    return null;
                }
                else
                {
                    return CloneParameters(cachedParameters);
                }
            }

            #endregion caching functions

            #region Parameter Discovery Functions

            /// <summary>
            /// Retrieves the set of OracleParameters appropriate for the stored procedure
            /// </summary>
            /// <remarks>
            /// This method will query the database for this information, and then store it in a cache for future requests.
            /// </remarks>
            /// <param name="connectionString">a valid connection string for a OracleConnection</param>
            /// <param name="spName">the name of the stored procedure</param>
            /// <returns>an array of OracleParameters</returns>
            //public static OracleParameter[] GetSpParameterSet(string connectionString, string spName)
            public static OracleParameter[] GetSpParameterSet(string spName)
            {
                //return GetSpParameterSet(connectionString, spName, false);
                return GetSpParameterSet(spName);
            }

            /// <summary>
            /// Retrieves the set of OracleParameters appropriate for the stored procedure
            /// </summary>
            /// <remarks>
            /// This method will query the database for this information, and then store it in a cache for future requests.
            /// </remarks>
            /// <param name="connectionString">a valid connection string for a OracleConnection</param>
            /// <param name="spName">the name of the stored procedure</param>
            /// <param name="includeReturnValueParameter">a bool value indicating whether the return value parameter should be included in the results</param>
            /// <returns>an array of OracleParameters</returns>
            //public static OracleParameter[] GetSpParameterSet(string connectionString, string spName, bool includeReturnValueParameter)


            //public static OracleParameter[] GetSpParameterSet(string spName, bool includeReturnValueParameter)
            //{
            //string hashKey = connectionString + ":" + spName + (includeReturnValueParameter ? ":include ReturnValue Parameter" : "");

            //    OracleParameter[] cachedParameters;

            //cachedParameters = (OracleParameter[])paramCache[hashKey];

            //if (cachedParameters == null)
            // {
            // cachedParameters = (OracleParameter[])(paramCache[hashKey] = DiscoverSpParameterSet(connectionString, spName, includeReturnValueParameter));
            //}

            //return CloneParameters(cachedParameters);
            //  return;
            // }

            #endregion Parameter Discovery Functions
        }








      


        public static long ExecuteNonQueryInfoDevWithoutput(OracleConnection objConn, string spName, params OracleParameter[] parameterValues)
        {
            long output = 0;
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {

                try
                {
                    OracleCommand cmd = new OracleCommand();
                    cmd.BindByName = true;
                    PrepareCommand(cmd, objConn, (OracleTransaction)null, CommandType.StoredProcedure, spName, parameterValues);

                    //finally, execute the command.
                    try
                    {
                        int retval = cmd.ExecuteNonQuery();
                        foreach (OracleParameter param in parameterValues)
                        {
                            if (param.Direction == ParameterDirection.Output || param.Direction == ParameterDirection.InputOutput)
                            {
                                try
                                {
                                    output = long.Parse(param.Value.ToString());
                                }
                                catch (Exception)
                                {
                                    output = 0;
                                }
                            }
                        }
                        cmd.Parameters.Clear();
                        return output;
                    }
                    catch (OracleException oex)
                    {
                        OracleError oe = new OracleError();
                        throw new ArgumentException(oe.GetOraError(oex.Number, oex.Message));
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                finally
                {
                    objConn.Close();
                }
                //call the overload that takes an array of OracleParameters

            }
            return output;
        }

        public static int ExecuteNonQueryInfoDev(OracleConnection objConn, string spName, params OracleParameter[] parameterValues)
        {
            //if we receive parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                int output = 0;
                try
                {
                    output = ExecuteNonQuery(objConn, CommandType.StoredProcedure, spName, parameterValues);
                }
                catch (Exception)
                {
                    throw;
                }
                finally
                {
                    objConn.Close();
                }
                //call the overload that takes an array of OracleParameters
                return output;
            }
            //otherwise we can just call the SP without params
            else
            {
                int output = 0;
                try
                {
                    output = ExecuteNonQuery(objConn, CommandType.StoredProcedure, spName);
                }
                catch (Exception)
                {
                    throw;
                }
                finally
                {
                    objConn.Close();
                }
                return output;
            }
        }

        public static DataTable ExecuteDataTable(OracleConnection Con, string spName, object[] parameterValues, int pageSize = 0, int currentPage = 0)
        {
            OracleCommand cmd = Con.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.BindByName = true;
            DataTable dt = new DataTable("Table1");

            try
            {
                foreach (OracleParameter param in parameterValues)
                {
                    if (param.OracleDbType != OracleDbType.RefCursor)
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Value, param.Direction);
                    else
                    {
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Direction);
                    }
                }
                cmd.CommandText = spName;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                if (pageSize == 0 && currentPage == 0)
                    da.Fill(dt);
                else
                    da.Fill(dt.DataSet, currentPage * pageSize, pageSize, "Table1");
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                Con.Close();
            }

        }

        public static DataTable ExecuteDataTable(string username, string password, string spName, object[] parameterValues, int pageSize = 0, int currentPage = 0)
        {
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            OracleCommand cmd = con.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.BindByName = true;
            DataTable dt = new DataTable("Table1");

            try
            {
                foreach (OracleParameter param in parameterValues)
                {
                    if (param.OracleDbType != OracleDbType.RefCursor)
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Value, param.Direction);
                    else
                    {
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Direction);
                    }
                }
                cmd.CommandText = spName;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                if (pageSize == 0 && currentPage == 0)
                    da.Fill(dt);
                else
                    da.Fill(dt.DataSet, currentPage * pageSize, pageSize, "Table1");
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                con.Close();
            }

        }

        public static object ExecuteScalar(string username, string password, string spName, bool staticUser, params object[] parameterValues)
        {
            OracleCommand cmd = null;
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            cmd = con.CreateCommand();
            cmd.BindByName = true;

            cmd.FetchSize = 52428800;
            cmd.InitialLONGFetchSize = 52428800;
            try
            {
                //if we receive parameter values, we need to figure out where they go
                cmd.Parameters.Clear();
                foreach (OracleParameter param in parameterValues)
                {
                    if (param.OracleDbType != OracleDbType.RefCursor)
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Value, param.Direction);
                    else
                    {
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Direction);
                    }
                }
                cmd.CommandText = spName;
                object output = cmd.ExecuteScalar();
                cmd.Parameters.Clear();
                return output;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

        public static int ExecuteNonQuery(string username, string password, string spName, params object[] parameterValues)
        {
            OracleCommand cmd = null;
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            cmd = con.CreateCommand();
            cmd.BindByName = true;
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.FetchSize = 52428800;
            //cmd.InitialLONGFetchSize = 52428800;
            try
            {
                //if we receive parameter values, we need to figure out where they go
                cmd.Parameters.Clear();
                foreach (OracleParameter param in parameterValues)
                {
                    if (param.OracleDbType != OracleDbType.RefCursor)
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Value, param.Direction);
                    else
                    {
                        cmd.Parameters.Add(param.ParameterName, param.OracleDbType, param.Direction);
                    }
                }
                cmd.CommandText = spName;
                int output = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                return output;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }


        //below methods are from info developer

        public static object executeTextForBlob(string username, string password, string spName, string Token, string IP)
        {
            OracleCommand cmd = null;
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            cmd = con.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.BindByName = true;

            cmd.FetchSize = 52428800;
            cmd.InitialLOBFetchSize = 52428800;
            cmd.InitialLONGFetchSize = 52428800;
            try
            {
                //if we receive parameter values, we need to figure out where they go
                cmd.Parameters.Clear();
                cmd.Parameters.Add("P_TOKEN", OracleDbType.Varchar2, Token, ParameterDirection.Input);
                cmd.Parameters.Add("P_IP", OracleDbType.Varchar2, IP, ParameterDirection.Input);
                cmd.Parameters.Add("REC", OracleDbType.RefCursor, ParameterDirection.Output);
                cmd.CommandText = spName;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                DataTable dTable = new DataTable();
                da.Fill(dTable);


                byte[] output1 = new byte[52428800];
                if (dTable.Rows.Count > 0)
                {
                    output1 = (byte[])dTable.Rows[0][0];
                }

                cmd.Parameters.Clear();
                string output = System.Text.ASCIIEncoding.UTF8.GetString(output1);
                return output;
            }
            catch (Exception )
            {
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

        public static object ExecuteText(string username, string password, string query)
        {
            OracleCommand cmd = null;
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            cmd = con.CreateCommand();
            cmd.BindByName = true;

            cmd.FetchSize = 52428800;
            cmd.InitialLONGFetchSize = 52428800;
            cmd.CommandText = query;

            try
            {
                return cmd.ExecuteScalar();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }




        public static int ExecuteNonQuery(string username, string password, string spName, string Token, string IP)
        {
            OracleCommand cmd = null;
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            cmd = con.CreateCommand();
            cmd.BindByName = true;
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                //if we receive parameter values, we need to figure out where they go
                cmd.Parameters.Clear();
                cmd.Parameters.Add("P_TOKEN", OracleDbType.Varchar2, Token, ParameterDirection.Input);
                cmd.Parameters.Add("P_IP", OracleDbType.Varchar2, IP, ParameterDirection.Input);

                cmd.CommandText = spName;
                int output = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                return output;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

        public static int ExecuteNonQueryForSesssion(string username, string password, string spName, string Token, string IP, string Value)
        {
            OracleCommand cmd = null;
            GetConnection conn = new GetConnection();
            OracleConnection con = conn.GetDbConn(username, password);
            cmd = con.CreateCommand();
            cmd.BindByName = true;
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                //if we receive parameter values, we need to figure out where they go
                byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(Value);
                cmd.Parameters.Clear();
                cmd.Parameters.Add("P_TOKEN", OracleDbType.Varchar2, Token, ParameterDirection.Input);
                cmd.Parameters.Add("P_IP", OracleDbType.Varchar2, IP, ParameterDirection.Input);
                cmd.Parameters.Add("P_VALUE", OracleDbType.Blob, b, ParameterDirection.Input);
                cmd.CommandText = spName;
                int output = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                return output;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Connection.Close();
            }
        }

    }
}