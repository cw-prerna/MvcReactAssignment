using System;
using System.Collections.Generic;
using MvcModelPage.Models;

namespace MvcModelPage.DataAccess
{
    public interface ICarData
    {
        List<CarModel> getDetails(int companyId, int modelId);
        List<model> getModelsDetails(int companyId);
        List<string> getCities();
    }
}