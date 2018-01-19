using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace api.Model
{
    public class Progress : NodeBase<Progress>
    {
        public Book Book { get; }
        public User User { get; }
        public double Value { get; }
        public DateTime LastPlayed { get; }


        public Progress(Book book, User user, double value, DateTime lastPlayed)
        {
            Book = book;
            User = user;
            Value = value;
            LastPlayed = lastPlayed;
        }
    }
}
