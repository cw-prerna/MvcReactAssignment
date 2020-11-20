using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace GRPCServer.DataAccess
{
    public interface ICarData
    {
        Task<ListVersions> getDetails(int companyId, int modelId);
        Task<ListModels> getModelsDetails(int companyId);
        Task<ListCities> getCities();
    }
}