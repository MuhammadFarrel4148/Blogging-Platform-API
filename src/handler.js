const { nanoid } = require('nanoid');
const db = require('./database');
const Redis = require('ioredis');

const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

const addBlog = async(request, h) => {
    const { title, content, category, tags } = request.payload;

    try {
        if(!title || !content || !category || !tags) {
            const response = h.response({
                status: 'fail',
                message: 'Masukkan nilai yang valid',
            });
            response.code(400);
            return response;
        };
    
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();
    
        const [result] = await db.query(`INSERT INTO blog(id, title, content, category, tags, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?, ?)`, [id, title, content, category, JSON.stringify(tags), createdAt, updatedAt]);

        if(result.affectedRows === 1) {
            const response = h.response({
                status: 'success',
                result: {
                    id, title, content, category, tags, createdAt, updatedAt
                }
            });
            response.code(200);
            return response;
        };
    
        const response = h.response({
            status: 'fail',
            message: 'gagal menambahkan blog post, coba lagi',
        });
        response.code(400);
        return response;
        
    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid add blog',
        });
        response.code(400);
        return response;
    };
};

const getAllBlog = async(request, h) => {
    const { title, content, category } = request.query;

    try {
        let sqlQuery = `SELECT title, content, category, tags FROM blog WHERE 1=1`;
        let paramsQuery = [];

        if(title || content || category) {
            if(title) {
                sqlQuery += ` AND title LIKE ?`;
                paramsQuery.push(`%${title}%`);
            };
        
            if(content) {
                sqlQuery += ` AND content LIKE ?`;
                paramsQuery.push(`%${content}%`);
            };
        
            if(category) {
                sqlQuery += ` AND category LIKE ?`;
                paramsQuery.push(`%${category}%`);
            };
        };

        const [existBlog] = await db.query(sqlQuery, paramsQuery);

        existBlog.forEach(element => {
            element.tags = JSON.parse(element.tags);
        });

        const response = h.response({
            status: 'success',
            result : existBlog,
        });
        response.code(200);
        return response;

    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid get all task',
        });
        response.code(400);
        return response;
    };
};

const getBlogById = async(request, h) => {
    const { id } = request.params;

    try {
        const cacheKey = `id:${id}`;
        const cachedData = await redis.get(cacheKey);

        if(cachedData) {
            const response = h.response({
                status: 'success',
                result: JSON.parse(cachedData).map(({ title, content, category, tags }) => ({ title, content, category, tags}))
            });
            response.code(200);
            return response;
        };

        const [existBlog] = await db.query(`SELECT title, content, category, tags FROM blog WHERE id = ?`, [id]);

        existBlog[0].tags = JSON.parse(existBlog[0].tags);

        if(existBlog.length > 0) {
            await redis.set(cacheKey, JSON.stringify(existBlog), 'EX', 600);
            const response = h.response({
                status: 'success',
                result: existBlog,
            });
            response.code(200);
            return response;
        };

        const response = h.response({
            status: 'fail',
            message: 'task not found',
        });
        response.code(404);
        return response;

    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid get task by id',
        });
        response.code(400);
        return response;
    }
};

const updateBlog = async(request, h) => {
    const { id } = request.params
    const { title, content, category, tags } = request.payload;

    try{
        if(!title || !content || !category || !tags) {
            const response = h.response({
                status: 'fail',
                message: 'Masukkan nilai yang valid',
            });
            response.code(400);
            return response;
        };
        
        const updatedAt = new Date().toISOString();
        const [existBlog] = await db.query(`UPDATE blog SET title = ?, content = ?, category = ?, tags = ?, updatedAt = ? WHERE id = ?`, [title, content, category, JSON.stringify(tags), updatedAt, id]);

        if(existBlog.affectedRows === 1) {
            const response = h.response({
                status: 'success',
                result: title, content, category, tags, 
            });
            response.code(200);
            return response;
        };

        const response = h.response({
            status: 'fail',
            message: 'blog not found',
        });
        response.code(404);
        return response;

    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid update task',
        });
        response.code(400);
        return response;
    };
};

const deleteBlog = async(request, h) => {
    const { id } = request.params;

    try {
        const [existBlog] = await db.query(`DELETE FROM blog WHERE id = ?`, [id]);

        if(existBlog.affectedRows === 1) {
            const response = h.response({
                status: 'success',
                message: 'blog berhasil dihapus',
            });
            response.code(200);
            return response;
        };

        const response = h.response({
            status: 'fail',
            message: 'blog not found',
        });
        response.code(404);
        return response;

    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid delete blog',
        });
        response.code(400);
        return response;
    };
}

module.exports = { addBlog, getAllBlog, getBlogById, updateBlog, deleteBlog };