using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTPerson
    {
        
        public Int64? PID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FirstNameEn { get; set; }
        public string MiddleNameEn { get; set; }
        public string LastNameEn { get; set; }

        public string DOB { get; set; }
        public string Gender { get; set; }

        public string DsIDNumber { get; set; }
        public string PSSID { get; set; }
        
        public string ToDate { get; set; }

        public string EntryBy { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }

        public Int64? SubmissionNo { get; set; }
         public Int32? SeqNo { get; set; }
         //public Int64? SeqNo { get; set; }
        public string Source { get; set; }
        public Int64? BFIID { get; set; }

        public string PersonImage { get; set; }
       // public object PersonImage { get; set; }
        
        public string AlertSource { get; set; }
        public string AlertSourceValue { get; set; }

        
        public ATTCountry _Country ;
        public ATTCountry Country
        {
            get { return _Country; }
            set { _Country = value; }
        }


        public ATTReligionType _Religion;
        public ATTReligionType Religion
        {
            get { return _Religion; }
            set { _Religion = value; }
        }

        

        private ATTMaritalStatus _PersonMaritalStatus ;
        public ATTMaritalStatus PersonMaritalStatus
        {
            get { return _PersonMaritalStatus; }
            set { _PersonMaritalStatus = value; }
        }


        private List<ATTPersonDoc> _PersonDocs;
        public List<ATTPersonDoc> PersonDocs
        {
            get { return _PersonDocs; }
            set { _PersonDocs = value; }
        }

        
        private List<ATTPersonDependent> _Dependents;
        public List<ATTPersonDependent> Dependents
        {
            get { return _Dependents; }
            set { _Dependents = value; }
        }
        
        public List<ATTPersonAddress> _PersonAddresses;
        public List<ATTPersonAddress> PersonAddresses
        {
            get { return _PersonAddresses; }
            set { _PersonAddresses = value; }
        }

        public List<ATTPersonContact> _PersonContacts ;
        public List<ATTPersonContact> PersonContacts
        {
            get { return _PersonContacts; }
            set { _PersonContacts = value; }
        }

        public List<ATTPersonQualification> _PersonQualifications ;
        public List<ATTPersonQualification> PersonQualifications
        {
            get { return _PersonQualifications; }
            set { _PersonQualifications = value; }
        }

        public List<ATTPersonLanguage> _PersonLanguages;
        public List<ATTPersonLanguage> PersonLanguages
        {
            get { return _PersonLanguages; }
            set { _PersonLanguages = value; }
        }



        // from
        public ATTDsAgency _Agency;
        public ATTDsAgency Agency
        {
            get { return _Agency; }
            set { _Agency = value; }
        }

        public ATTEthinicity _Ethnicity;
        public ATTEthinicity Ethnicity
        {
            get { return _Ethnicity; }
            set { _Ethnicity = value; }
        }

        private List<ATTSkillType> _PersonSkills;
        public List<ATTSkillType> PersonSkills
        {
            get { return _PersonSkills; }
            set { _PersonSkills = value; }
        }

        private List<ATTMedicalAtt> _PersonMedAttributes ;
        public List<ATTMedicalAtt> PersonMedAttributes
        {
            get { return _PersonMedAttributes; }
            set { _PersonMedAttributes = value; }
        }

        private List<ATTLiteracyType> _PersonLiteracy ;
        public List<ATTLiteracyType> PersonLiteracy
        {
            get { return _PersonLiteracy; }
            set { _PersonLiteracy = value; }
        }
        public ATTPerson()
        {
            _PersonQualifications = new List<ATTPersonQualification>();
            _PersonLanguages = new List<ATTPersonLanguage>();
            _PersonContacts = new List<ATTPersonContact>();
            _PersonAddresses = new List<ATTPersonAddress>();
            _Dependents = new List<ATTPersonDependent>();
            _PersonDocs = new List<ATTPersonDoc>();
            _PersonMaritalStatus = new ATTMaritalStatus();
            _Religion = new ATTReligionType();
            _Country = new ATTCountry();
            _Agency = new ATTDsAgency();
            _PersonLiteracy = new List<ATTLiteracyType>();
            _PersonMedAttributes = new List<ATTMedicalAtt>();
            _PersonSkills = new List<ATTSkillType>();
            _Ethnicity = new ATTEthinicity();
        }

    }
}

