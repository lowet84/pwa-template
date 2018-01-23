using System;
using System.IO;
using System.Linq;
using api.Model;
using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace api.Schema
{
    [ImplementViewer(OperationType.Mutation)]
    public class Mutation
    {
        [Description("Add new user")]
        public bool AddUser(UserContext context, string username, string password, bool admin)
        {
            context.ValidateUser(true);
            if (string.IsNullOrEmpty(username)
                || string.IsNullOrEmpty(password))
                return false;
            if (UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == username)).Any())
                return false;

            UserContext.AddDefault(new User(username, password, admin));

            return true;
        }

        [Description("Delete a user")]
        public bool DeleteUser(UserContext context, string username)
        {
            context.ValidateUser(true);
            if (context.UserName == username) return false;
            var user = UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == username))
                .SingleOrDefault();
            if (user == null) return false;
            UserContext.Remove<User>(user.Id);
            return true;
        }

        [Description("Change your password")]
        public bool ChangePassword(UserContext context, string oldPass, string newPass)
        {
            var user = context.ValidateUser();
            if (!LoginUtil.ValidatePassword(oldPass, user.PasswordHash)) return false;
            var newUser = new User(user.Username, newPass, user.Admin);
            UserContext.UpdateDefault(newUser, user.Id);
            return true;
        }

        [Description("Change user type")]
        public bool ChangeUserType(UserContext context, string username, bool admin)
        {
            context.ValidateUser(true);
            var user = UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == username))
                .SingleOrDefault();
            if (user == null) return false;
            var newUser = new User(admin, user.Username, user.PasswordHash);
            UserContext.UpdateDefault(newUser, user.Id);
            return true;
        }

        [Description("Import a book")]
        public Id? ImportBook(UserContext context, Id importId, string cover, string link)
        {
            context.ValidateUser(true);
            var import = UserContext.GetShallow<Import>(importId);
            if (import == null) return null;
            var (title, author) = BigBookSearchUtil.SearchAmazon(link);
            var files = Directory.GetFiles(import.Path)
                .Where(ImportRunner.IsAudioFile)
                .ToList();
            double length;
            length = AudioFileUtil.GetLength(
                files.Count == 1 ?
                files.First() :
                AudioFileUtil.JoinFilesWithFfmpeg(import.Path));

            var book = new Book(title, author, import.Path, cover, length);
            UserContext.AddDefault(book);
            UserContext.Remove<Import>(importId);
            return book.Id;
        }

        [Description("Save changes to a book")]
        public bool SaveBook(UserContext context, Id id, string title, string author, string cover)
        {
            context.ValidateUser(true);
            var book = UserContext.GetShallow<Book>(id);
            var newBook = new Book(title, author, book.Path, cover, book.Length);
            UserContext.UpdateDefault(newBook, book.Id);
            return true;
        }

        [Description("Save progress")]
        public bool SaveProgress(UserContext context, Id id, int progress)
        {
            var progressValue = (double)progress / 1000;
            var user = context.ValidateUser();
            var oldProgress = UserContext.GetShallow<Progress>(id);
            if (oldProgress.User.Id != user.Id) return false;
            var newProgress = new Progress(oldProgress.Book, oldProgress.User, progressValue, DateTime.Now);
            UserContext.UpdateDefault(newProgress, oldProgress.Id);
            return true;
        }
    }
}
