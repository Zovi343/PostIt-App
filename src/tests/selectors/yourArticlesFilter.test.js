import yourArticlesFilter from '../../selectors/yourArticlesFilter';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

test('should return articles which _creatorId match userID', () => {
   const filteredArticles = yourArticlesFilter(articles, user.id);
   expect(filteredArticles.length).toBe(2);
})