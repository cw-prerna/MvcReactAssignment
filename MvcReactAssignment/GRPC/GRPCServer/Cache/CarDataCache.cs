using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GRPCServer.DataAccess;
using AEPLCore.Cache.Interfaces;



namespace  GRPCServer.Cache
{
    public class  CarDataCache : ICarDataCache
    {
        
         private readonly ICarData _ICarData;
        private readonly ICacheManager _cacheManager;
         private ListVersions versionList;
        private ListModels modelList;
        private ListCities locationList;

        public CarDataCache(ICacheManager cacheManager, ICarData ICarData)
        {
            _cacheManager = cacheManager;
            _ICarData = ICarData;
             versionList = new ListVersions();
              modelList = new ListModels();
            locationList = new ListCities();
        }


        public async Task<ListModels> getModelsDetails_Cache(int companyId, string cacheKey)
        {
               modelList = await _cacheManager.GetFromCacheAsync<ListModels>
            (
                cacheKey,
                new TimeSpan(0,5,0),
                async () => await _ICarData.getModelsDetails(companyId)
            );
            return modelList;

        }


        public async Task<ListVersions> getDetails_Cache(int companyId, int modelId, string cacheKey)
         {
              versionList = await _cacheManager.GetFromCacheAsync<ListVersions>
            (
                cacheKey,
                new TimeSpan(0,5,0),
                async () => await _ICarData.getDetails(companyId, modelId)
            );
            return versionList;

         }

       
        public async Task<ListCities> getCities_Cache(string cacheKey)
        {
            locationList = await _cacheManager.GetFromCacheAsync<ListCities>
            (
                cacheKey,
                new TimeSpan(0,10,0),
               async () => await _ICarData.getCities()
            );
            return locationList;

        }
      
    }
}