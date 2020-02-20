using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTRole
    {
        public ATTRole()
        {
            _RoleModFunLst = new List<ATTRoleModuleFunctions>();
        }
        public string ApplicationID { get; set; }
        public string RoleID { get; set; }
        public string RoleDescription { get; set; }
        public string DbRole { get; set; }

        public string Action { get; set; }

        private List<ATTRoleModuleFunctions> _RoleModFunLst;
        public List<ATTRoleModuleFunctions> RoleModFunLst
        {
            get { return _RoleModFunLst; }
            set { _RoleModFunLst = value; }
        }       
    }
}
