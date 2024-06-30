import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchNews, setError } from '../../stores/news/slice';
import { News } from './types/types';

export const ViewNews = () => {
  const { news, loading, error } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (news.length === 0) dispatch(fetchNews());
  }, [dispatch, news]);

  const { id } = useParams();
  const [currentNews, setCurrentNews] = useState<News | null>(null);

  useEffect(() => {
    if (news.length > 0) {
      const newsFound = news.find(
        (n: News) => n.id.toString() === id?.toString(),
      );
      if (newsFound) {
        setCurrentNews(newsFound);
      } else {
        setError('Esta nota no existe');
      }
    }
  }, [news, id]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error || !currentNews ? (
        <div>{error || 'Esta nota no existe'}</div>
      ) : (
        <main className="container mx-auto p-4">
          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col lg:flex-row">
            <figure className="mb-4 lg:mb-0 lg:w-1/3 lg:mr-6">
              <img
                src={currentNews?.image}
                alt={currentNews?.title}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2 lg:mt-4">
                Source: {currentNews?.source}
              </figcaption>
            </figure>

            <div className="lg:w-2/3">
              <header className="mb-4">
                <h2 className="text-2xl font-bold">{currentNews?.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  By{' '}
                  <span className="text-blue-500 dark:text-blue-300 hover:underline">
                    {currentNews?.author}
                  </span>{' '}
                  on{' '}
                  <time
                    dateTime={`${currentNews?.published_at?.split('T')?.[0]}`}
                  >
                    {new Date(
                      currentNews?.published_at || new Date(),
                    )?.toLocaleDateString('en-US')}
                  </time>
                </p>
              </header>

              <section className="mb-4">
                <p className="mb-4">{currentNews?.article}</p>
              </section>

              <footer className="text-sm text-gray-600 dark:text-gray-400 border-t pt-4 mt-4">
                <p>
                  Category:{' '}
                  <span className="text-blue-500 dark:text-gray-300 ">
                    {currentNews?.category || 'General'}
                  </span>
                </p>
              </footer>
            </div>
          </article>
        </main>
      )}
    </>
  );
};
