using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MvcModelPage.Models;
using MvcModelPage.Cache;


namespace MvcModelPage.Controllers
{
    public class HomeController : Controller
    {
   
        private List<CarModel> carDetails;
        private List<string> locationList;
        private  List<model> modelsDetails; 
        private readonly ICarDataCache _ICarDataCache;
        public HomeController(ICarDataCache ICarDataCache)
        {
             carDetails = new List<CarModel> ();
            locationList = new List<string> ();
            modelsDetails = new List<model>(); 
            _ICarDataCache = ICarDataCache;
        }

        public IActionResult Index()
        {
            return View();
        }


          public JsonResult GetModelsDetails(int companyId)
        {
            
            try
           {
                 string cacheKey = String.Format("CompanyModel_{0}",companyId);
                 modelsDetails = _ICarDataCache.getModelsDetails_Cache(companyId, cacheKey);
                 return Json(modelsDetails);
           }  
           catch(Exception ex)
           {
                Debug.WriteLine("<<< catch : "+ ex.ToString());
               return Json(null);
           }                                   
           
        }

        public JsonResult GetCities()
        {
            try
            {
                string cacheKey = String.Format("cities");
                locationList = _ICarDataCache.getCities_Cache(cacheKey);
                return Json(locationList);

            }
            catch(Exception ex)
           {
                Debug.WriteLine("<<< catch : "+ ex.ToString());
               return Json(null);
           } 
        }

          public JsonResult GetCarDetails(int companyId, int modelId)
        {
            try
            {
                string cacheKey = String.Format("CompanyId{0}ModelId{1}",companyId,modelId);
                carDetails = _ICarDataCache.getDetails_Cache(companyId, modelId, cacheKey);
                 return Json(carDetails);
            }
            catch(Exception ex)
           {
                Debug.WriteLine("<<< catch : "+ ex.ToString());
               return Json(null);
           } 
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
