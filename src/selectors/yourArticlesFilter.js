
export default (articles, userId, {yourArticles, text}) => {
    return articles.filter((article) => {
        const matchId = article._creatorId === userId;
        const matchText  = article.title.toLowerCase().startsWith(text.toLowerCase());

        if(yourArticles) {
            return matchId && matchText;
        } else {
            return matchText;
        }
    });
};