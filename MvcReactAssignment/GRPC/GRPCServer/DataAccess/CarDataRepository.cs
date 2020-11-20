using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Dapper;
using AEPLCore.Cache;
using AEPLCore.Cache.Extensions;
using AEPLCore.Cache.Interfaces;
using AEPLCore.Logging;



namespace GRPCServer.DataAccess
{
    public class CarDataRepository : ICarData
    {
        private readonly IConfiguration _configuration;
        private static Logger _logger = LoggerFactory.GetLogger(typeof(CarDataRepository));

        public CarDataRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        public async Task<ListVersions> getDetails(int companyId, int modelId)
        {

            try
            {
                List<dbVersions> versionList = new List<dbVersions>();
                string connectionString = _configuration.GetConnectionString("carconnection");
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    string query = "select companyId,CompanyName,modelId,ModelName, modelNameCar.Rating, modelNameCar.ImageURL, versionNameCar.id, versionNameCar.VersionName, versionNameCar.Price from companyName inner join modelNameCar on companyName.id = modelNameCar.companyId inner join versionNameCar on versionNameCar.modelId = modelNameCar.id where companyId='" + companyId + "' and modelId='" + modelId + "'"; ;
                    var list = await conn.QueryAsync<dbVersions>(query);
                    versionList = list.ToList();
                }
                ListVersions VersionModel = new ListVersions();
                VersionModel.DbVersions.AddRange(versionList);
                return VersionModel;
            }

            catch (Exception ex)
            {
                _logger.LogException(ex);
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }
        }


        public async Task<ListCities> getCities()
        {
            try
            {
                List<dbCity> locationList = new List<dbCity>();
                string connectionString = _configuration.GetConnectionString("carconnection");
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    string query = "select City from CitiesName";
                    var list = await conn.QueryAsync<dbCity>(query);
                    locationList = list.ToList();
                }
                ListCities CitiesModel = new ListCities();
                CitiesModel.DbCity.AddRange(locationList);
                return CitiesModel;
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);
                Console.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }

        }


        public async Task<ListModels> getModelsDetails(int companyId)
        {

            try
            {
                List<dbModels> modelList = new List<dbModels>();
                string connectionString = _configuration.GetConnectionString("carconnection");
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    string query = "select ModelName , Rating, ImageURL, id as ModelId from `training`.`modelNameCar` where CompanyId='" + companyId + "'";

                    var list = await conn.QueryAsync<dbModels>(query);
                    modelList = list.ToList();
                }
                ListModels model = new ListModels();
                model.DbModels.AddRange(modelList);
                return model;
            }

            catch (Exception ex)
            {
                _logger.LogException(ex);
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }

        }

    }
}