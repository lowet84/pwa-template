﻿using System.IO;
using System.Linq;
using api.Model;
using api.Schema.Results;
using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;

namespace api.Schema
{
    [ImplementViewer(OperationType.Query)]
    public class Query
    {
        [Description("Log in and get login token")]
        public LoginResult Login(UserContext context, string username, string password)
        {
            var users = UserContext.GetAllShallow<User>();
            User user;
            if (!users.Any())
            {
                user = new User(username, password, true);
                UserContext.AddDefault(user);
            }
            else
            {
                user = users.SingleOrDefault(d => d.Username == username);
                if (user == null || !LoginUtil.ValidatePassword(password, user.PasswordHash)) return null;
            }
            return new LoginResult { Token = LoginUtil.CreateToken(user.Username).LoginToken, Admin = user.Admin };
        }

        [Description("Get all users")]
        public User[] AllUsers(UserContext context)
        {
            context.ValidateUser(true);
            return context.GetAll<User>();
        }

        public CoverResult[] SearchCovers(UserContext context, string searchString)
        {
            context.ValidateUser(true);
            var ret = BigBookSearchUtil.SearchForCovers(searchString);
            return ret;
        }

        public Import[] Imports(UserContext context)
        {
            context.ValidateUser();
            var ret = context.GetAll<Import>();
            return ret;
        }

        public BookResult[] Books(UserContext context)
        {
            var user = context.ValidateUser();
            var books = UserContext.GetAllShallow<Book>();
            var ret = books.Select(d => new BookResult(d)).ToArray();
            return ret;
        }

        public Import Metadata(UserContext context, Id id)
        {
            context.ValidateUser(true);
            var book = UserContext.GetShallow<Book>(id);
            var ret = new Import(Path.Combine(AudioFileUtil.DataPath,book.Path));
            return ret;
        }
    }
}
