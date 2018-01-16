using System;
using GraphQlRethinkDbLibrary.Database;
using GraphQlRethinkDbLibrary.Handlers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var databaseUrl = Environment.GetEnvironmentVariable("DATABASE") ?? "localhost";
            BaseHandler.Setup(
                app,
                env,
                new DatabaseName(Program.DatabaseName),
                new DatabaseUrl(databaseUrl),
                new GraphQlDefaultHandler());
        }
    }
}
