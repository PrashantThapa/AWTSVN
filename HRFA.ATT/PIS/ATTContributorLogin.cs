namespace HRFA.ATT
{
    public class ATTContributorLogin
    {
        public string SSID { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfPassword { get; set; }
        public string UType { get; set; }
        public string AccountStatus { get; set; }
        public bool LoggedIn = false;
         public long EmpID { get; set; }

        //private ATTEmployee _Employee = new ATTEmployee();
        //public ATTEmployee Employee
        //{
        //    get { return _Employee; }
        //    set { _Employee = value; }
        //}

     
      
        
    }
}
