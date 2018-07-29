import uuid from 'uuid';


export const addArticle = (article) => ( {
    type: 'ADD_ARTICLE',
    article: {
        id: uuid(),
        ...article
    }
});