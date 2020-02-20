namespace HRFA.COMMON
{


    public abstract class CredentialManager
    {
        public static string TNSName
        {
            get { return "LISTENER "; }
        }

        public static string ServiceName
        {
            get { return "AWTDB"; }
            //get { return "KUKLHRACC"; }
        }

        public static string Host
        {
            get { return "10.10.40.203"; }
        }

        public static int PortNo
        {
            get { return 1521; } //get { return 1550; }
        }



        public static string GetModuleUserName(int ModuleID)
        {
            string username = "";
            switch (ModuleID)
            {
                //
                case 1:
                    username = "HR_OWNER_DEMO";
                    //username = "HR_OWNER";

                    break;
                //
                case 2:
                    username = "HR_ADMIN";
                    break;


            }
            return username;
        }


        public static string GetModulePassword(int ModuleID)
        {
            string password = "";
            switch (ModuleID)
            {
                //
                case 1:
                    password = "HR_OWNER_DEMO";
                    //password = "HR_OWNER";

                    break;
                //
                case 2:
                    password = "HR_ADMIN";
                    break;

            }
            return password;
        }


    }


}