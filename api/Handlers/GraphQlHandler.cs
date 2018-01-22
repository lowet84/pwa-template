using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQlRethinkDbLibrary.Handlers;
using Microsoft.AspNetCore.Http;

namespace api.Handlers
{
    public class GraphQlHandler : GraphQlDefaultHandler
    {
        private string _user;

        public override Task Process(HttpContext context)
        {
            var tokenHeader =
                    ((Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.FrameRequestHeaders)context.Request.Headers)
                    .HeaderAuthorization;
            var token = tokenHeader.ToString().Replace("Bearer", string.Empty).Trim();
            _user = LoginUtil.GetToken(token)?.Username;
            return base.Process(context);
        }

        public override UserContext GetUserContext(string body)
        {
            return new UserContext(body, _user);
        }

        public override void HandleError(string errorMessage)
        {
            Console.WriteLine(errorMessage);
        }
    }
}
