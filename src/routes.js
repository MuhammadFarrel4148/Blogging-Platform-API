const { addBlog } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/posts',
        handler: addBlog,
    }
];

module.exports = routes;
