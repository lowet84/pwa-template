using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using api.Model;
using api.Schema.Results;
using HtmlAgilityPack;

namespace api.Utils
{
    public static class BigBookSearchUtil
    {
        public static CoverResult[] SearchForCovers(string searchString)
        {
            using (var client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) })
            {
                var url =
                    $"http://bigbooksearch.com/query.php?SearchIndex=books&Keywords={searchString}&ItemPage=1";
                var html = client
                    .GetStringAsync(url)
                    .Result;
                var doc = new HtmlDocument();
                doc.LoadHtml(html);
                var images = doc.DocumentNode.Descendants("img")
                    .Select(d => d.Attributes.FirstOrDefault(e => e.Name == "src")?.Value).ToList();
                var links = doc.DocumentNode.Descendants("a")
                    .Select(d => d.Attributes.FirstOrDefault(e => e.Name == "href")?.Value).ToList();

                if (images.Count != links.Count) return null;
                var result = Enumerable.Range(0, images.Count)
                    .Select(d => new CoverResult { Cover = images[d], Link = links[d], Id = d }).ToArray();

                return result;
            }
        }

        public static (string, string) SearchAmazon(string link)
        {
            using (var client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) })
            {
                var html = client
                    .GetStringAsync(link)
                    .Result;
                var doc = new HtmlDocument();
                doc.LoadHtml(html);
                var title = doc.GetElementbyId("productTitle").InnerText;
                var authorElement = doc.DocumentNode.SelectNodes("//*[contains(@class,'author')]").FirstOrDefault();
                var author = FindAuthorName(authorElement);
                return (title, author);
            }
        }

        private static string FindAuthorName(HtmlNode node)
        {
            if (node.HasAttributes && node.Attributes.Any(d => d.Name == "data-asin"))
            {
                return node.InnerText;
            }
            return node.ChildNodes.Select(FindAuthorName)
                .FirstOrDefault(temp => temp != null);
        }
    }
}
