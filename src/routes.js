const { addBlog, getAllBlog, getBlogById, updateBlog, deleteBlog } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/posts',
        handler: addBlog,
    },
    {
        method: 'GET',
        path: '/posts',
        handler: getAllBlog,
    },
    {
        method: 'GET',
        path: '/posts/{id}',
        handler: getBlogById,
    }, 
    {
        method: 'PUT',
        path: '/posts/{id}',
        handler: updateBlog,
    },
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: deleteBlog,
    }
];

module.exports = routes;
