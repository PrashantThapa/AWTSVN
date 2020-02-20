using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Mail;
using System.Web.SessionState;
using HRFA.COMMON;
using HRFA.ATT;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLUserTranVerification : IRequiresSessionState
    {
        public void SendMessage(string altersource, string alterval, string msg)
        {
            switch (altersource.ToLower())
            {
                case "email":
                    sendMail(alterval, msg);
                    break;
                case "mobile":
                    break;
            }
        }
        void sendMail(string to, string msg)
        {
            string errmsg = "";
            MailMessage message = new MailMessage();
            SmtpClient smtpClient = new SmtpClient();

            try
            {
                SmtpClient SmtpServer = new SmtpClient("smtp.vianet.com.np");
                //SmtpClient SmtpServer = new SmtpClient("Mx9.nitc.gov.np");
                var mail = new MailMessage();
                mail.From = new MailAddress("standukar@pcs.com.np");//info@ssf.gov.np 202.45.144.8 port 25
                // mail.From = new MailAddress("info@ssf.gov.np");//sanjeev@pcs.com.np
                mail.To.Add(to);
                mail.Subject = "Verification Status !!!";
                mail.IsBodyHtml = true;
                mail.Body = msg;
                SmtpServer.Port = 25;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("standukar@pcs.com.np", "standukar");
                //SmtpServer.Credentials = new System.Net.NetworkCredential("info@ssf.gov.np", "social@security");
                SmtpServer.EnableSsl = false;
                SmtpServer.Send(mail);

            }
            catch (Exception ex)
            {
                errmsg = ex.Message;
                msg = msg + errmsg;
            }

        }

        //void SendSmsTo(string sentodmobileno, string fullname, string ssfid)
        //{
        //    string msg = "  Welcome to Social Security Fund \n" +
        //                     " User Name:-   " + ssfid + "\n" + "Password:-   " + ssfid + "\n" + "SSFID:-    " + ssfid.Replace("U", "") + ".\n" +
        //                     " Thank you ";
        //    SMSCOMMS SMSEngine = new SMSCOMMS("Com1");
        //    SMSEngine.Open();
        //    SMSEngine.SendSMS(sentodmobileno, msg);
        //    SMSEngine.Close();
        //}
        void sendSMSByWebservices(string sentodmobileno, string fullname, string ssfid, string msgsms)
        {

            try
            {

                //SmsTest.com.webservicex.www.SendSMSWorld smsWorld =  new SmsTest.com.webservicex.www.SendSMSWorld();
                //smsWorld.sendSMS(txtEmailId.Text.Trim(), "+977", sentodmobileno, msgsms);

            }
            catch (Exception ex)
            {
                ex.ToString();
            }

        }

		public string SaveUserTranVerification(ATTUserTranVerification objUTV)
		{

			string msg = "";
			//    string sp = "CPR_ADD_USER_TRAN_VERIFY";
			string sp = "CPR_ADD_TRAN_AUTH";
			GetConnection getConn = new GetConnection();
			OracleConnection dbConn = getConn.GetDbConn(getConn.LoginUser);


			OracleTransaction tran = dbConn.BeginTransaction();

			List<OracleParameter> paramList = new List<OracleParameter>();
			try
			{
				paramList.Add(SqlHelper.GetOraParam(":p_INSUP", "UP", OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_VERIFIED", objUTV.VerifyStatus, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":p_module_ID", objUTV.ModuleID, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":p_TRAN_NO", objUTV.TranNo, OracleDbType.Int64, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objUTV.EntryBY, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_UPDATED_BY", objUTV.UpdatedBY, OracleDbType.Varchar2, ParameterDirection.Input));

				DataSet ds = SqlHelper.ExecuteDataset(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
				

				if (objUTV.ModuleID == "EMPREG" && objUTV.VerifyStatus == "V")
					if (objUTV.ModuleID == "EMPREG")
					{
						//	//if (ds.Tables[0].Rows.Count > 0)
						//	//{

						//	//	foreach (DataRow dr in ((DataTable)ds.Tables[0]).Rows)
						//	//	{

						//	//		if (objUTV.ModuleID == "EMPREG" && objUTV.VerifyStatus == "V")//EMPREG
						//	//		{
						//	//			//ssfid = dr["USER_ID"].ToString();
						//	//			//contname = dr["c_name"].ToString();// for contributer name
						//	//			//alertsource = dr["ALERT_SOURCE"].ToString();
						//	//			//alertVal = dr["ALT_SOURCE_VAL"].ToString();
						//	//			//msg = "Welcome to AWTHR <br/> Employee registration Verified Sucessfully <br/>  on Date " + objUTV.VerifyDate.Trim() + " <br/> Please note <br/>  Name:   " + contname + ",<br/>" + " User Name:   " + ssfid + ",<br/>" + "Password:   " + ssfid + ",<br/>";
						//	//			//if (alertVal == "" || alertVal == null)
						//	//			//{
						//	//			//	msg = msg + "Email ID not found so,Verified notification not sent to email";
						//	//			//}
						//	//			//else
						//	//			//{
						//	//			//	SendMessage(alertsource, alertVal, msg);
						//	//			//}
						//	//		}

						//	//		else if (objUTV.ModuleID == "EMPREG" && objUTV.VerifyStatus == "R")//EMPREG
						//	//		{
						//	//			//ssfid = dr["USER_ID"].ToString();
						//	//			//contname = dr["c_name"].ToString();// for contributer name
						//	//			//alertsource = dr["ALERT_SOURCE"].ToString();
						//	//			//alertVal = dr["ALT_SOURCE_VAL"].ToString();
						//	//			//msg = "Welcome to AWTHR Employee registration , Rejected Sucessfully On Date " + objUTV.VerifyDate.Trim() + "Rejected submission no is " + objUTV.TranNo;
						//	//			//if (alertVal == "" || alertVal == null)
						//	//			//{
						//	//			//	msg = msg + "Email ID not found so,Verified notification not sent to email";
						//	//			//}
						//	//			//else
						//	//			//{
						//	//			//	SendMessage(alertsource, alertVal, msg);
						//	//			//}
						//	//		}
						//	//	}
						//}

					}



				if (objUTV.ModuleID == "EMPREG" && objUTV.VerifyStatus == "V")
				{
					msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Verified";
				}
				else if (objUTV.ModuleID == "EMPREG" && objUTV.VerifyStatus == "R")
				{
					msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Rejected";
				}

                if (objUTV.ModuleID == "EMPGRADE" && objUTV.VerifyStatus == "V")
                {
                    msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Verified";
                }

                if (objUTV.ModuleID == "EMPGRADESCALE" && objUTV.VerifyStatus == "V")
                {
                    msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Verified";
                }
                //}


                if (objUTV.ModuleID == "EMPATT" && objUTV.VerifyStatus == "V")
                {
                    msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Verified";
                }

                if (objUTV.ModuleID == "EMPSAL" && objUTV.VerifyStatus == "V")
                {
                    msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Verified";
                }

                if (objUTV.ModuleID == "EMPPRO" && objUTV.VerifyStatus == "V")
                {
                    msg = msg + "Submission No:  " + objUTV.TranNo + "<br/>" + "Successfully Verified";
                }

                

                tran.Commit();
				return msg;
			}
			catch (Exception ex)
			{
				tran.Rollback();
				// dbConn.Close();
				throw ex;
			}
			finally
			{
				getConn.CloseDbConn();
			}

		}

			public List<ATTUserTranVerification> GetRejectedList()
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTUserTranVerification> lstRejectedTran = new List<ATTUserTranVerification>();

            try
            {
                string SP = "CPR_GET_REJECTED_LIST";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTUserTranVerification objUTV = new ATTUserTranVerification();
                    //objUTV.ApplicationID = drow["APPLICATION_ID"].ToString();
                    objUTV.ModuleID = drow["MODULE_ID"].ToString();
                    objUTV.ModuleDesc = drow["MODULE_DESCRIPTION"].ToString();
                    objUTV.TranNo =  Int64.Parse(drow["TRAN_NO"].ToString());
                    objUTV.VerifyRemarks = drow["REASON"].ToString();
                    
                    lstRejectedTran.Add(objUTV);
                }

                return lstRejectedTran;
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

        public void SaveVerifyLog(OracleTransaction tran,string entryby, Int64? oldTranNo,Int64? newTranNo, string appID, string modID)
        {
            string sp = "";
            string remarks = "The problem has been solved.";
            try
            {
                sp = "CPR_ADD_VERIFY_LOG";

                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    paramList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", appID, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", modID, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_OLD_TRAN_NO", oldTranNo , OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_NEW_TRAN_NO", newTranNo, OracleDbType.Int64, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_REMARKS", remarks, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryby, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                    
                    paramList.Clear();

                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
