"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { List,Grid3x3 } from 'lucide-react';
import { Switch } from "@/components/ui/switch"


const News = () => {
  const [articles, setArticles] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false)

  const getNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fbf55d12663143b9969e510dcab557c9&page=${page}`
      );
      console.log({response})
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, [page]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
    <div className=' flex flex-row'>
      <h2 className="text-xl font-semibold mb-4">What's happening around the world?</h2>
      <div className=' flex flex-row  p-2 ml-72 space-x-3 -mt-1'>
        <div className=' flex flex-row space-x-2'>
        <List/>
        <span>List View</span>
        </div>
        
        <div>
        <Switch
        checked={isChecked}
        onCheckedChange={setIsChecked}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200"
        />
        </div>

        <div className=' flex flex-row space-x-2'>
        <Grid3x3 />
        <span>Grid View</span>
        </div>
      </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={`grid ${isChecked ? "grid-cols-2 md:grid-cols-2":"grid-cols-1 md:grid-cols-1"} gap-4`}>
          {articles.map((article:any, index:any) => (
            <div key={index} className={`p-4 border rounded-md ${isChecked ? "h-[480px]" :"h-[400px]"} shadow-md`}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover mb-2 rounded-md" />
              )}
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.author} - {new Date(article.publishedAt).toLocaleDateString()}</p>
              <p className="text-sm mt-2" >{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-5 text-sm inline-block ">Read More</a>
              <div className='flex items-center justify-center mt-3 '>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">View Full Article</a>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default News;
