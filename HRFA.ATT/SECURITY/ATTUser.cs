using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTUser : GenericUser
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        //public Int32? OfficeCode { get; set; }
		public int RoleID { get; set; }
		public string UserNameNep { get; set; }
        public string AuthNo { get; set; }
        public string AuthBy { get; set; }
        public string AuthDate { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string AccountStatus { get; set; }
        public string TranDate { get; set; }
        public string Machine { get; set; }
        public string IPAddress { get; set; }
        public string Remarks { get; set; }
        public string EmpID { get; set; }
        public string EmployeeName { get; set; }
        public string Action { get; set; }
		public string OfficeCode { get; set; }

        public ATTOfficeUser OfficeUser { get; set; }

        public string Password { get; set; }

        private bool _LoggedIn = false;
        public override bool LoggedIn
        {
            get { return _LoggedIn; }
            set { _LoggedIn = value; }
        }

        public override string DatabaseAccessUserName
        {
            get { return this.UserID; }
            // set { }
        }

        public override string DatabaseAccessUserPassword
        {
            get { return this.Password; }
            // set { }
        }


        public ATTUserDesignation UserDesignation { get; set; }


        private List<ATTApplicationRole> _UserRoles ;
        public List<ATTApplicationRole> UserRoles
        {
            get
            {
                return _UserRoles;
            }
            set
            {
                _UserRoles = value;
            }
        }
        public string ApplicationID { get; set; }

        private List<ATTModuleFunction> _UserModuleFunctions ;
        public List<ATTModuleFunction> UserModuleFunctions
        {
            get
            {
                return _UserModuleFunctions;
            }
            set
            {
                _UserModuleFunctions = value;
            }
        }


        public List<ATTMenu> Menus { get; set; }

        public ATTUserStatus UserStatus { get; set; }

       public ATTUser()
        {
            _UserRoles = new List<ATTApplicationRole>();
            _UserModuleFunctions = new List<ATTModuleFunction>();
        }
    }
}
