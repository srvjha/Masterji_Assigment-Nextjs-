"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { List, Grid3x3, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Memoize `getNews` function with useCallback to prevent infinite re-renders
  const getNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=302d8c2b7e93801644dac351b551d591&page=${page}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getNews();
  }, [getNews, page]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
      <div className="flex flex-row">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
          What&apos;s happening around the world?
        </h2>
        <div className="flex flex-row p-2 ml-72 space-x-3 -mt-1">
          <div className="flex flex-row space-x-2">
            <List />
            <span className="dark:text-gray-100">List View</span>
          </div>
          <div>
            <Switch
              checked={isChecked}
              onCheckedChange={setIsChecked}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200"
            />
          </div>
          <div className="flex flex-row space-x-2">
            <Grid3x3 />
            <span className="dark:text-gray-100">Grid View</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin dark:text-gray-100" />
        </div>
      ) : (
        <div className={`grid ${isChecked ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
          {articles.map((article:any, index) => (
            <div
              key={index}
              className={`p-4 border rounded-md ${isChecked ? "h-[480px]" : "h-[400px]"} shadow-md dark:bg-gray-700 dark:border-gray-600`}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
              )}
              <h3 className="font-semibold dark:text-gray-100">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {article.author} - {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2 dark:text-gray-200">{article.description}</p>
              <div className="flex items-center justify-center mt-3">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 mt-2 inline-block"
                >
                  View Full Article
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="dark:text-gray-100"
        >
          Previous Page
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} className="dark:text-gray-100">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default News;
