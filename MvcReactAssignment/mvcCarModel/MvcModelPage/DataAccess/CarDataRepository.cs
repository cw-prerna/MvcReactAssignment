using System;
using System.Collections.Generic;
using MvcModelPage.Models;
using System.Diagnostics;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Dapper;


namespace MvcModelPage.DataAccess
{
    public class CarDataRepository : ICarData
    {
        private readonly IConfiguration _configuration;

        public CarDataRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        public List<CarModel> getDetails(int companyId, int modelId)
        {
            List<CarModel> versionList = new List<CarModel>();
            try
            {
                string connectionString = _configuration.GetConnectionString("carconnection");
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    string query = "select companyId,CompanyName,modelId,ModelName, modelNameCar.Rating, modelNameCar.ImageURL, versionNameCar.id, versionNameCar.VersionName, versionNameCar.Price from companyName inner join modelNameCar on companyName.id = modelNameCar.companyId inner join versionNameCar on versionNameCar.modelId = modelNameCar.id where companyId='" + companyId + "' and modelId='" + modelId + "'"; ;

                    versionList = conn.Query<CarModel>(query).ToList();
                }
                return versionList;
            }

            catch (Exception ex)
            {
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }
        }
        public List<string> getCities()
        {
            try
            {
                List<string> locationList = new List<string>();
                string connectionString = _configuration.GetConnectionString("carconnection");
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    string query = "select City from CitiesName";
                    locationList = conn.Query<string>(query).ToList();
                }
                return locationList;
            }
            catch (Exception ex)
            {
                Console.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }

        }


        public List<model> getModelsDetails(int companyId)
        {
            try
            {
                List<model> modelList = new List<model>();
                string connectionString = _configuration.GetConnectionString("carconnection");
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    string query = "select ModelName , Rating, ImageURL, id as ModelId from `training`.`modelNameCar` where'" + companyId + "'";

                    modelList = conn.Query<model>(query).ToList();
                }
                return modelList;
            }
            catch (Exception ex)
            {
                Debug.WriteLine("<<< catch : " + ex.ToString());
                throw ex;

            }
        }
    }
}