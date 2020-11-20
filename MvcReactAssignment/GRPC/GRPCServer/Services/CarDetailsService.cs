using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using GRPCServer.Cache;
using AEPLCore.Logging;


namespace GRPCServer.Services
{
    public class carDetailsService : carDetails.carDetailsBase
    {
        private static Logger _logger = LoggerFactory.GetLogger(typeof(carDetailsService));
        private ListVersions carDetails;
        private ListCities locationList;
        private ListModels modelsDetails;
        private readonly ICarDataCache _ICarDataCache;

        public carDetailsService(ICarDataCache ICarDataCache)
        {
            _ICarDataCache = ICarDataCache;
            locationList = new ListCities();
            carDetails = new ListVersions();
            modelsDetails = new ListModels();
        }

        public override Task<modelData> getDetails(carName request, ServerCallContext context)
        {
            return Task.FromResult(new modelData()
            {
                CarId = 1,
                CarName = "Kia"

            });
        }


        public override async Task<ListCities> getCitiesList(newcity request, ServerCallContext context)
        {
            string cacheKey = String.Format("cities");
            try
            {
                locationList = await _ICarDataCache.getCities_Cache(cacheKey);
                return locationList;
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                return null;
            }
        }


        public override async Task<ListVersions> getVersionsList(VersionId request, ServerCallContext context)
        {

            string cacheKey = String.Format("CompanyId{0}ModelId{1}", request.CompanyId, request.ModelId);
            try
            {
                carDetails = await _ICarDataCache.getDetails_Cache(request.CompanyId, request.ModelId, cacheKey);
                return carDetails;
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                return null;
            }


        }


        public override async Task<ListModels> getModelsList(compId request, ServerCallContext context)
        {
            string cacheKey = String.Format("CompanyModel_{0}", request.CompanyId);
            try
            {
                modelsDetails = await _ICarDataCache.getModelsDetails_Cache(request.CompanyId, cacheKey);
                return modelsDetails;

            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                return null;
            }
        }


    }
}