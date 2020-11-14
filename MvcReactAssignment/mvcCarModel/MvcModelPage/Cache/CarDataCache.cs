using System;
using System.Collections.Generic;
using MvcModelPage.Models;
using MvcModelPage.DataAccess;
using AEPLCore.Cache.Interfaces;



namespace  MvcModelPage.Cache
{
    public class  CarDataCache : ICarDataCache
    {
        
         private readonly ICarData _ICarData;
        private readonly ICacheManager _cacheManager;
        private List<CarModel> carList;
        private List<model> modelList;
        private List<string> locationList;

        public CarDataCache(ICacheManager cacheManager, ICarData ICarData)
        {
            _cacheManager = cacheManager;
            _ICarData = ICarData;
            carList = new List<CarModel>();
            modelList = new List<model>();
            locationList = new List<string>();
        }


        public List<model> getModelsDetails_Cache(int companyId, string cacheKey)
        {
               modelList = _cacheManager.GetFromCache<List<model>>
            (
                cacheKey,
                new TimeSpan(0,5,0),
                () => _ICarData.getModelsDetails(companyId)
            );
            return modelList;

        }


        public List<CarModel> getDetails_Cache(int companyId, int modelId, string cacheKey)
         {
              carList = _cacheManager.GetFromCache<List<CarModel>>
            (
                cacheKey,
                new TimeSpan(0,5,0),
                () => _ICarData.getDetails(companyId,modelId)
            );
            return carList;

         }

       
        public List<string> getCities_Cache(string cacheKey)
        {
            locationList = _cacheManager.GetFromCache<List<string>>
            (
                cacheKey,
                new TimeSpan(0,10,0),
                () => _ICarData.getCities()
            );
            return locationList;

        }
    }
}