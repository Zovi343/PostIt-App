export default {
    defaults: { baseURL: 'http://localhost:3000'},
    get: jest.fn(() => Promise.resolve()),
    post: jest.fn(() => Promise.resolve())
};