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
};

function mapNewsResponseToNewsDTO(newsResponse: NewsResponseDTO) {
  return newsResponse.hits
    .filter(({ _highlightResult }) => {
      const { story_url } = _highlightResult;
      return story_url?.value;
    })
    .map((news) => {
      const { author, story_title, story_url } = news._highlightResult;
      return {
        id: news.objectID,
        createdAt: news.created_at,
        author: author.value,
        title: story_title.value,
        url: story_url.value,
      };
    });
}

export async function getNews(
  category: string = '',
  page: number
): Promise<News[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/search_by_date?query=${category}&page=${page}`
  );

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
