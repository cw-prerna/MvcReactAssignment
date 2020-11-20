using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MvcModelPage.DataAccess;
using AEPLCore.Cache.Extensions;
using AEPLCore.Cache;
using AEPLCore.Cache.Interfaces;
using AEPLCore.Cache.Transcoder;
using MvcModelPage.Cache;
using Grpc.AspNetCore;
using Grpc.AspNetCore.Web;
using AEPLCore.Logging;

namespace MvcModelPage
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //string consulHost = "10.10.20.113";
            services.AddControllersWithViews(); 
            services.AddLogging();
            string consulHost = Environment.GetEnvironmentVariable("CONSUL_HOST") ?? "10.10.20.113";
            services.AddLogUpdater(consulHost + ":8500", Configuration["AppSettings:ModuleName"]);
            services.AddSingleton<ICarData, CarDataRepository>();
            services.AddSingleton<ICarDataCache, CarDataCache>();
            services.AddCacheConfiguration(Configuration);     
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();
             app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) 
                .AllowCredentials());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
