type NewsResponseDTO = {
  hits: {
    _highlightResult: {
      story_title: { value: string };
      author: {
        value: string;
      };
      story_url: {
        value: string;
      };
    };
    objectID: string;
    created_at: string;
  }[];
};

export type News = {
  id: string;
  createdAt: string;
  author: string;
  title: string;
  url: string;
  isFavorite: boolean;
};

function mapNewsResponseToNewsDTO(newsResponse: NewsResponseDTO) {
  return newsResponse.hits
    .filter(({ objectID, created_at, _highlightResult }) => {
      const { story_url, story_title, author } = _highlightResult;
      return (
        story_url?.value &&
        objectID &&
        created_at &&
        story_title?.value &&
        author?.value
      );
    })
    .map((news) => {
      const { author, story_title, story_url } = news._highlightResult;
      return {
        id: news.objectID,
        createdAt: news.created_at,
        author: author.value,
        title: story_title.value,
        url: story_url.value,
        isFavorite: false,
      };
    });
}

export async function getNews(
  category: string = '',
  page: number
): Promise<News[]> {
  const url = new URL(process.env.NEXT_PUBLIC_API_HOST + '/search_by_date');

  if (category) {
    url.searchParams.append('query', category);
  }

  if (page >= 0) {
    url.searchParams.append('page', page.toString());
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return new Promise((resolve) => {
    response
      .json()
      .then((data) => {
        return mapNewsResponseToNewsDTO(data);
      })
      .then((news) => {
        resolve(news);
      });
  });
}
