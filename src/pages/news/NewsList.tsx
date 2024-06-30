import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchNews } from '../../stores/news/slice';
import { News } from './types/types';

export const NewsList = () => {
  const { news, loading, error } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {t('news')}
      </h1>
      <div className="container">
        {loading ? (
          <div>{t('loading')}...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <section className="flex gap-5 flex-wrap justify-center mt-4">
            {news?.map((n: News) => (
              <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/news/${n.id}`}>
                  <figure>
                    <img className="rounded-t-lg w-full" src={n.image} alt="" />
                  </figure>
                </Link>
                <div className="p-5">
                  <Link to={`/news/${n.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {n.title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate ...">
                    {n.description}
                  </p>
                  <Link
                    to={`/news/${n.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t('read_more')}
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
};
