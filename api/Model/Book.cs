using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace api.Model
{
    public class Book : NodeBase<Book>
    {
        public string Title { get; }
        public string Author { get; }
        public string Path { get; }
        public string Cover { get; }
        public double Length { get; }

        public Book(string title, string author, string path, string cover, double length)
        {
            Title = title;
            Author = author;
            Path = path;
            Cover = cover;
            Length = length;
        }
    }
}
