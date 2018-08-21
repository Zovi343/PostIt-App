import yourArticlesFilter from '../../selectors/yourArticlesFilter';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

test('should return articles which match text in search field', () => {
    const filter = { yourArticles: false, text: "Hydro"};
    const filteredArticles = yourArticlesFilter(articles, user.id, filter);
    expect(filteredArticles).toEqual([articles[2]]);
});

test('should return articles which _creatorId match userID', () => {
    const filter = { yourArticles: true, text: ""};
    const filteredArticles = yourArticlesFilter(articles, user.id, filter);
    expect(filteredArticles.length).toBe(2);
});

test('should return articles which _creatorId match userID and they also match text in search field', () => {
    const filter = { yourArticles: true, text: "chips"};
    const filteredArticles = yourArticlesFilter(articles, user.id, filter);
    expect(filteredArticles).toEqual([articles[1]]);
});