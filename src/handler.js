const { nanoid } = require('nanoid');
const db = require('./database')

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
    
        const [result] = await db.query(`INSERT INTO blog(id, title, content, category, tags, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?, ?)`, [id, title, content, category, tags, createdAt, updatedAt]);
    
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

module.exports = { addBlog };