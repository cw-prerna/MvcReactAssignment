using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MvcModelPage.Models;
using AEPLCore.Logging;
using MvcModelPage.Cache;
using Grpc.Net.Client;
using System.Net.Http;
using System.Threading.Tasks;


namespace MvcModelPage.Controllers
{
    public class HomeController : Controller
    {

        private List<CarModel> carDetails;
        private List<string> locationList;
        private List<model> modelsDetails;
        private readonly ICarDataCache _ICarDataCache;
        private static Logger _logger = LoggerFactory.GetLogger(typeof(HomeController));
        public HomeController(ICarDataCache ICarDataCache)
        {
            carDetails = new List<CarModel>();
            locationList = new List<string>();
            modelsDetails = new List<model>();
            _ICarDataCache = ICarDataCache;
        }

        public IActionResult Index()
        {
            return View();
        }


        public async Task<JsonResult> GetModelsDetails(int companyId)
         // public JsonResult GetModelsDetails(int companyId)
        {
            var httpHandler = new HttpClientHandler();
            httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            try
            {
                var channel = GrpcChannel.ForAddress("https://localhost:5001");
                var client = new carDetails.carDetailsClient(channel);
                var data = await client.getModelsListAsync(new compId { CompanyId = companyId });
                return Json(data);
            }
             catch (Exception ex)
            {
                _logger.LogException(ex);
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;
            }

          /*  
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
           */

        }

         public async Task<JsonResult> GetCities()
          // public JsonResult GetCities()
        {
               var httpHandler = new HttpClientHandler();
               httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
                AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            try
            {
                var channel = GrpcChannel.ForAddress("https://localhost:5001");
                var client = new carDetails.carDetailsClient(channel);
                var data = await client.getCitiesListAsync(new newcity());
                return Json(data);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }
           /*  try
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
           */

        }



        public async Task<JsonResult> GetCarDetails(int companyId, int modelId)
         //public JsonResult GetCarDetails(int companyId, int modelId)
        {
            var httpHandler = new HttpClientHandler();
            httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            try
            {
                var channel = GrpcChannel.ForAddress("https://localhost:5001");
                var client = new carDetails.carDetailsClient(channel);
                var data = await client.getVersionsListAsync(new VersionId { CompanyId = companyId, ModelId = modelId });
                return Json(data);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }
            /* try
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
            */

        }


        public async Task<JsonResult> x(string name)
        {

            var httpHandler = new HttpClientHandler();
            httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            try
            {
                var channel = GrpcChannel.ForAddress("https://localhost:5001");
                var client = new carDetails.carDetailsClient(channel);
                var data = await client.getDetailsAsync(new carName() { Name = "Somil" });
                return Json(data);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;
            }

            /* try
             {
                    var channel = GrpcChannel.ForAddress("https://localhost:5001");
                    var client = new carDetails.carDetailsClient(channel);
                    var data = client.getDetails(new carName{Name = name});
                    return Json(data);
             }
             catch(Exception ex)
            {
                 Debug.WriteLine("<<< Grpc exception : "+ ex.ToString());
                return Json(null);
            } */

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
