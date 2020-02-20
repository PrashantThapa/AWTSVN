namespace HRFA.COMMON
{


    public class ReportParameter
    {
        private string _ParamName;
        public string ParamName
        {
            get { return this._ParamName; }
            set { this._ParamName = value; }
        }

        private object _ParamValue;
        public object ParamValue
        {
            get { return _ParamValue; }
            set { _ParamValue = value; }
        }

        public ReportParameter(string name, object value)
        {
            this.ParamName = name;
            this.ParamValue = value;
        }
    }
}