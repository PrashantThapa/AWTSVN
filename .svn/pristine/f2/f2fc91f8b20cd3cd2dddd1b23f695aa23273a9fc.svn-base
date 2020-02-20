using System;
using System.Text.RegularExpressions;

namespace HRFA.COMMON
{
    public class Validator
    {
        public static bool IsBlank(string temp)
	    {
	        bool result = false;
	        
            if (string.IsNullOrWhiteSpace(temp))
	        {
	            result = true;
	        }
	        return result;
	    }

        public static bool IsInteger(string temp)
        {
            bool result = false;
            int intVal;

            if (int.TryParse(temp, out intVal))
            {
                result = true;
            }

            return result;
        }

        public static bool IsFloat(string temp)
        {
            bool result = false;
            float floatVal;

            if (float.TryParse(temp, out floatVal))
            {
                result = true;
            }

            return result;
        }

        public static bool IsEmail(string temp)
        {
            bool result = false;
            string pattern = @"^[a-z][a-z|0-9|]*([_][a-z|0-9]+)*([.][a-z|0-9]+([_][a-z|0-9]+)*)?@[a-z][a-z|0-9|]*\.([a-z][a-z|0-9]*(\.[a-z][a-z|0-9]*)?)$";
            Match match = Regex.Match(temp.Trim(), pattern, RegexOptions.IgnoreCase);

            if (match.Success)
                result = true;
            else
                result = false;

            return result;
        }

        public static bool IsAlpha(string temp)
        {
            bool result = false;
            string pattern = @"^[a-z]$";
            Match match = Regex.Match(temp.Trim(), pattern, RegexOptions.IgnoreCase);

            if (match.Success)
                result = true;
            else
                result = false;

            return result;
        }

        public static bool IsAlphaNumeric(string temp)
        {
            bool result = false;
            string pattern = @"^[a-zA-Z0-9]+$";
            Match match = Regex.Match(temp.Trim(), pattern, RegexOptions.IgnoreCase);

            if (match.Success)
                result = true;
            else
                result = false;

            return result;
        }

        public static bool IsLowerCase(string temp)
        {
            bool result = false;

            if (temp == temp.ToLower())
            {
                result = true;
            }
            return result;
        }

        public static bool IsUpperCase(string temp)
        {
            bool result = false;

            if (temp == temp.ToUpper())
            {
                result = true;
            }
            return result;
        }

        public static bool IsMin(string temp,int length)
        {
            bool result = false;

            if (temp.Length <= length)
            {
                result = true;
            }
            return result;
        }

        public static bool IsMax(string temp, int length)
        {
            bool result = false;

            if (temp.Length >= length)
            {
                result = true;
            }
            return result;
        }

        public static bool IsBetween(string temp, int min,int max)
        {
            bool result = false;

            if (temp.Length >= min && temp.Length <= max)
            {
                result = true;
            }
            return result;
        }

        public static string ValidateNepaliDate(string date)
        {
            int len = date.Length;
            string errDate = "";

            if (date != "" && len == 10)
            {
                string year = "";
                string month = "";
                string day = "";

                year = date.Substring(0, 4);
                month = date.Substring(5, 2);
                day = date.Substring(8, 2);

                if (Convert.ToInt32(month) > 12)
                {
                    errDate = "Enter month between 1 to 12.";                    
                }

                if (Convert.ToInt32(day) > 32)
                {
                    errDate = "Enter day between 1 to 32";
                }

                
            }
            else
                errDate = "Enter date in YYYY.MM.DD format";

            return errDate;
        }
    }
}
