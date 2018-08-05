
export default (articles, userId) => {
    return articles.filter((article) => article._creatorId === userId);
};