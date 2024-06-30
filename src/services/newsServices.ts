const BASE_URL = '/news.json';

export const getNews = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
};
