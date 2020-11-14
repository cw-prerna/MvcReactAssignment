using System.Collections.Generic;
using MvcModelPage.Models;



namespace  MvcModelPage.Cache
{
    public interface ICarDataCache
    {
        List<CarModel> getDetails_Cache(int companyId, int modelId, string cacheKey);
        List<model> getModelsDetails_Cache(int companyId, string cacheKey);
        List<string> getCities_Cache(string cacheKey);
    }
}