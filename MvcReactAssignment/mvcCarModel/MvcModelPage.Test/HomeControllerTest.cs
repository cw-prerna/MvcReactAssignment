using System;
using System.Collections.Generic;
using Xunit;
using MvcModelPage.Models;
using MvcModelPage.Controllers;
using MvcModelPage.Cache;
using MvcModelPage.DataAccess;
using Moq;

namespace MvcModelPage.Test
{
    public class HomeControllerTest 
    {
        private readonly Mock<ICarDataCache> _ICarDataCache;
        private HomeController home;
        public HomeControllerTest()
        {
            _ICarDataCache = new Mock<ICarDataCache>();
            home = new HomeController(_ICarDataCache.Object);
        }
        [Fact]
        public void GetCities_ValidInputs_ReturnsResult()
        {
            _ICarDataCache.Setup(cache => cache.getCities_Cache(It.IsAny<string>())).Returns(It.IsAny<List<string>>());
            var result = home.GetCities();
            Assert.NotNull(result);
        }
            [Fact]
        public void GetModelsDetails_ValidInputs_ReturnsResult()
        {
            _ICarDataCache.Setup(cache => cache.getModelsDetails_Cache(It.IsAny<int>(), It.IsAny<string>())).Returns(It.IsAny<List<model>>());
            var result = home.GetModelsDetails(It.IsAny<int>());
            Assert.NotNull(result);
        }

            [Fact]
        public void GetCarDetails_ValidInputs_ReturnsResult()
        {
            _ICarDataCache.Setup(cache => cache.getDetails_Cache(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>())).Returns(It.IsAny<List<CarModel>>());
            var result = home.GetCarDetails(It.IsAny<int>(),It.IsAny<int>());
            Assert.NotNull(result);
        }
          [Fact]
         public void GetCities_Exception_ReturnsResult()
        {
            _ICarDataCache.Setup(cache => cache.getCities_Cache(It.IsAny<string>())).Throws(new Exception());
            Assert.Throws<Exception>(() => _ICarDataCache.Object.getCities_Cache(It.IsAny<string>()));
            var result = home.GetCities();
            Assert.NotNull(result);
        }
                    [Fact]
        public void GetModelsDetails_Exception_ReturnsResult()
        {
            _ICarDataCache.Setup(cache => cache.getModelsDetails_Cache(It.IsAny<int>(), It.IsAny<string>())).Throws(new Exception());
            Assert.Throws<Exception>(() => _ICarDataCache.Object.getModelsDetails_Cache(It.IsAny<int>(),It.IsAny<string>()));
            var result = home.GetModelsDetails(It.IsAny<int>());
            Assert.NotNull(result);
        }

            [Fact]
        public void GetCarDetails_Exception_ReturnsResult()
        {
            _ICarDataCache.Setup(cache => cache.getDetails_Cache(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>())).Throws(new Exception());
             Assert.Throws<Exception>(() => _ICarDataCache.Object.getDetails_Cache(It.IsAny<int>(), It.IsAny<int>(),It.IsAny<string>()));
            var result = home.GetCarDetails(It.IsAny<int>(),It.IsAny<int>());
            Assert.NotNull(result);
        }
  
    }
}