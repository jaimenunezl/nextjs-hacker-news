export const mockNewsResponse = {
  exhaustive: {
    nbHits: false,
    typo: false,
  },
  exhaustiveNbHits: false,
  exhaustiveTypo: false,
  hits: [
    {
      _highlightResult: {
        author: {
          matchLevel: 'none',
          matchedWords: [],
          value: 'DebtDeflation',
        },
        comment_text: {
          fullyHighlighted: false,
          matchLevel: 'full',
          matchedWords: ['vue'],
          value:
            '&gt;knowledge base (files)<p>What is it actually doing with the files you upload?  Is it just pasting the full text into the prompt?  Or is it doing something RAG-like and dynamically retrieving some subset based on the <em>que</em>ry?',
        },
        story_title: {
          matchLevel: 'none',
          matchedWords: [],
          value: 'Exploring GPTs: ChatGPT in a trench coat?',
        },
        story_url: {
          matchLevel: 'none',
          matchedWords: [],
          value: 'https://simonwillison.net/2023/Nov/15/gpts/',
        },
      },
      _tags: ['comment', 'author_DebtDeflation', 'story_38277926'],
      author: 'DebtDeflation',
      children: [38280859, 38281066, 38280903],
      comment_text:
        '&gt;knowledge base (files)<p>What is it actually doing with the files you upload?  Is it just pasting the full text into the prompt?  Or is it doing something RAG-like and dynamically retrieving some subset based on the query?',
      created_at: '2023-11-15T18:59:29Z',
      created_at_i: 1700074769,
      objectID: '38280830',
      parent_id: 38280737,
      story_id: 38277926,
      story_title: 'Exploring GPTs: ChatGPT in a trench coat?',
      story_url: 'https://simonwillison.net/2023/Nov/15/gpts/',
      updated_at: '2023-11-15T19:22:26Z',
    },
  ],
};
