# Blogging Platform API
API CRUD (Create, Read, Update, Delete) untuk operasi personal blogging platform.

## Fitur Utama
- Membuat post blog.
- Melakukan update blog.
- Melakukan delete pada blog.
- Dapatkan blog tertentu berdasarkan id.
- Dapatkan semua blog.
- Filter blog dengan search tertentu.

## Gambaran
### Create Blog Post
Melakukan pembuatan blog dengan GET method
```json
POST /posts
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```
Setiap blog harus memiliki field tertentu:
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}  
```
Endpoint harus melakukan validasi pada request body dan melakukan return 201 created status code dengan blog baru
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```
atau mengembalikan 400 bad request status code dengan message error

### Update Blog Post
Melakukan update blog dengan PUT method
```json
PUT /posts/1
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```
Endpoint harus melakukan validasi request body dan mengembalikan 200 OK dengan status update sebagai berikut
```json
{
  "id": 1,
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```
atau mengembalikan 400 Bad Request status code dengan error message.

###  Delete Blog Post
Melakukan delete post dengan DELETE method
```bash
DELETE /posts/1
```
Endpoint harus mengembalikan 204 No Content status code jika blog post berhasil dihapus dan 404 Not Found status code apabila blog post tidak ada.

### Get Blog Post
Dapat mengambil blog tertentu dengan id menggunakan GET method
```bash
GET /posts/1
```
Endpoint harus mengembalikan 200 OK status code dengan blog seperti berikut
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```
atau mengembalikan 404 Not Found status code jikalau blog tidak ada.

### Get All Blog Post
Mendapatkan semua blog dengan GET method
```bash
GET /posts
```
Endpoint harus mengembalikan 200 OK status code dengan array post sebagai berikut
```json
[
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
  },
  {
    "id": 2,
    "title": "My Second Blog Post",
    "content": "This is the content of my second blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2021-09-01T12:30:00Z",
    "updatedAt": "2021-09-01T12:30:00Z"
  }
]
```

Ketika mengambil sebuah post, user dapat melakukan filter berdasarkan judul, content, atau category pada blog post. Contohnya
```bash
GET /posts?term=tech 
```

## Teknologi yang Digunakan
- **Node.js**: Runtime javascript
- **MySQL**: Database relasional
- **Postman**: Testing dan dokumentasi
- **Dotenv**: Mengelola environment variables
- **Docker** (opsional): containerization 
- **GitHub**: Version control dan menyimpan proyek
 
## Struktur Database
### Blog Table
```json
{
    "id": "String primary key",
    "title": "String",
    "content": "String",
    "category": "String",
    "tags": "Array of String",
    "createdAt": "DATETIME",
    "updatedAt": "DATETIME"
}
```

## Instalasi (Coming Soon)
1. 

## Endpoint (API Routes)

| HTTP Method | Endpoint             | Deskripsi                                 |
|-------------|----------------------|-------------------------------------------|
| POST        | /posts               | Membuat blog baru                         |
| PUT         | /posts/{id}          | Melakukan update blog                     |
| DELETE      | /posts/{id}          | Melakukan delete pada blog                |
| GET         | /posts/{id}          | Melakukan pengambilan blog pada id tertentu   |
| GET         | /posts               | Melakukan pengambilan semua blog          |
| GET         | /posts?term=tech     | Melakukan filter berdasarkan judul konten, atau category  |

## Penulis
- **Muhammad Farrel Putra Pambudi** 
    - ([GitHub](https://github.com/MuhammadFarrel4148))
    - ([LinkedIn](https://www.linkedin.com/in/farrelputrapambudi/))


## Source
- ([Roadmap](https://roadmap.sh/projects/blogging-platform-api))
