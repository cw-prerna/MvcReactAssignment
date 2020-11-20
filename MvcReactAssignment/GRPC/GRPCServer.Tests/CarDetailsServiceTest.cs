using System;
using System.Collections.Generic;
using Xunit;
using Moq;
using MySql.Data.MySqlClient;
using GRPCServer.Cache;
using GRPCServer.DataAccess;
using GRPCServer.Services;
using System.Threading.Tasks;
using Grpc.Core;


namespace GRPCServer.Tests
{
    public class CarDetailsServiceTest
    {
        [Fact]
        public async Task getVersionsList_ReturnsVersions()
        {
            int CompanyId = 1;
            int ModelId = 1;
            string cacheKey = "CompanyId"+CompanyId+"ModelId"+ModelId;
            ListVersions versions = new ListVersions();
            List<dbVersions> v = new List<dbVersions>();
            v.Add(new dbVersions{CompanyId=1, CompanyName="BMW", ModelId=1, ModelName="X1", Rating=5, VersionId=1, ImageUrl="https://imgd.aeplcdn.com", VersionName="sDrive 20i SportX", Price=41});
            versions.DbVersions.AddRange(v);

            Mock<ICarDataCache> _ICarDataCache = new Mock<ICarDataCache>();
            _ICarDataCache.Setup(cache => cache.getDetails_Cache(CompanyId, ModelId, cacheKey)).ReturnsAsync(versions);
           carDetailsService carDetailsService = new carDetailsService(_ICarDataCache.Object);
            var result = await carDetailsService.getVersionsList(new VersionId{CompanyId = CompanyId, ModelId = ModelId},It.IsAny<ServerCallContext>());
            Assert.Equal(result,versions);
        }

       
        [Fact]
        public async Task getVersionsList_ReturnsNull()
        {
            int CompanyId = 1;
            int ModelId = 1;
            string cacheKey = "CompanyId"+CompanyId+"ModelId"+ModelId;
            Mock<ICarDataCache> _ICarDataCache = new Mock<ICarDataCache>();
            _ICarDataCache.Setup(cache => cache.getDetails_Cache(CompanyId, ModelId, cacheKey)).ThrowsAsync(new Exception());
           carDetailsService carDetailsService = new carDetailsService(_ICarDataCache.Object);
            var result = await carDetailsService.getVersionsList(new VersionId{CompanyId = CompanyId, ModelId = ModelId},It.IsAny<ServerCallContext>());
            Assert.Null(result);
        }


        [Fact]
        public async Task getModelsList_ReturnsModels()
        {
            int companyId = 1;
            string cacheKey = "CompanyModel_"+ companyId;
            ListModels models = new ListModels();
            List<dbModels> m = new List<dbModels>();
            m.Add(new dbModels{ModelId=1, ModelName="X1", Rating=5, ImageUrl="https://imgd.aeplcdn.com"});
            models.DbModels.AddRange(m);
           
            Mock<ICarDataCache> _ICarDataCache = new Mock<ICarDataCache>();
            _ICarDataCache.Setup(cache => cache.getModelsDetails_Cache(companyId, cacheKey)).ReturnsAsync(models);
           carDetailsService carDetailsService = new carDetailsService(_ICarDataCache.Object);
            var result = await carDetailsService.getModelsList(new compId{CompanyId = companyId}, It.IsAny<ServerCallContext>());
            Assert.Equal(result,models);
        }


      [Fact]
        public async Task getModelsList_ReturnsNull()
        {
            int companyId = 1;
            string cacheKey = "CompanyModel_"+ companyId;
            Mock<ICarDataCache> _ICarDataCache = new Mock<ICarDataCache>();
            _ICarDataCache.Setup(cache => cache.getModelsDetails_Cache(companyId, cacheKey)).ThrowsAsync(new Exception());
           carDetailsService carDetailsService = new carDetailsService(_ICarDataCache.Object);
            var result = await carDetailsService.getModelsList(new compId{CompanyId = companyId}, It.IsAny<ServerCallContext>());
            Assert.Null(result);
        }

        [Fact]
        public async Task getCitiesList_ReturnsResult()
        {
            string cacheKey = "cities";
             ListCities CitiesModel = new ListCities();
            List<dbCity> locationList = new List<dbCity>();
            locationList.Add(new dbCity{City = "Ajmer"});
            CitiesModel.DbCity.AddRange(locationList);
            
            Mock<ICarDataCache> _ICarDataCache = new Mock<ICarDataCache>();
            _ICarDataCache.Setup(cache => cache.getCities_Cache(cacheKey)).ReturnsAsync(CitiesModel);
           carDetailsService carDetailsService = new carDetailsService(_ICarDataCache.Object);
            var result = await carDetailsService.getCitiesList(new newcity(), It.IsAny<ServerCallContext>());
            Assert.Equal(result,CitiesModel);
        }


        
        [Fact]
        public async Task getCitiesList_ReturnsNull()
        {
            string cacheKey = "cities";
            Mock<ICarDataCache> _ICarDataCache = new Mock<ICarDataCache>();
            _ICarDataCache.Setup(cache => cache.getCities_Cache(cacheKey)).ThrowsAsync(new Exception());
           carDetailsService carDetailsService = new carDetailsService(_ICarDataCache.Object);
            var result = await carDetailsService.getCitiesList(new newcity(), It.IsAny<ServerCallContext>());
            Assert.Null(result);
        }
       
    }
}
