using System;

namespace HRFA.ATT
{
    public class ATTSubmission
    {
        public Int64? SubmissionNo { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string OldId { get; set; }
        public string SubmissionFor { get; set; }
        public string Address { get; set; }
        //public string SubmissionDate { get; set; }
        //public Int32 TranNo { get; set; }
        public string Action { get; set; }
    }
}
