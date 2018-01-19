using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using GraphQL.Conventions;

namespace api.Schema.Results
{
    public class BookResult
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public Id Id { get; set; }
        public string Source { get; set; }
        public string Cover { get; set; }
        public DateTime LastPlayed { get; set; }
        public double Length { get; set; }
        public double Progress { get; set; }

        public BookResult(){}

        public BookResult(Book book)
        {
            Title = book.Title;
            Author = book.Author;
            Id = book.Id;
            //Source = $"/audio/{book.Id}";
            Cover = book.Cover;

            // TODO, get real values
            Source = "/static/audio/test.mp3";
            LastPlayed = DateTime.Now;
            Length = 4201;
            Progress = 0;
        }
    }
}
