using System;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace GRPCServer.Cache
{
    public interface ICarDataCache
    {
        Task<ListVersions> getDetails_Cache(int companyId, int modelId, string cacheKey);
        Task<ListModels> getModelsDetails_Cache(int companyId, string cacheKey);
        Task<ListCities> getCities_Cache(string cacheKey);
    }
}