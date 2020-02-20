﻿using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;

namespace HRFA.BLL.PAYROLL
{
    public class BLLGradeScaleSetup
    {
        public JsonResponse SaveGradeScaleSetup(ATTGradeScaleSetup GradeScale, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLGradeScaleSetup dllGardeScale = new DLLGradeScaleSetup();

                    response.Message = dllGardeScale.SaveGradeScaleSetup(GradeScale, appID, modID);
                    response.IsSucess = true;
                }

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }

            return response;
        }

        public JsonResponse GetALLGradeScaleSettings()
        {
            JsonResponse response = new JsonResponse();
            DLLGradeScaleSetup dllGardeScale = new DLLGradeScaleSetup();
           
            try
            {
                response.ResponseData = dllGardeScale.GetALLGradeScaleSettings();
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

		public JsonResponse GetAllGradesForDdl()
		{
			var response = new JsonResponse();
			var dllGradeScale = new DLLGradeScaleSetup();

			try
			{
				response.ResponseData = dllGradeScale.GetAllGradesForDdl();
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;

		}

		public JsonResponse GetGradeScaleSettingsByEmpLevel(int EmpLevel)
        {
            JsonResponse response = new JsonResponse();
            DLLGradeScaleSetup dllGardeScale = new DLLGradeScaleSetup();

            try
            {
                response.ResponseData = dllGardeScale.GetGradeScaleSettingsByEmpLevel(EmpLevel);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        private bool LevelNameUnique(string empLevel)
        {
            var objDll = new DLLGradeScaleSetup();
            return objDll.LevelNameUnique(empLevel);
        }
    }
}
