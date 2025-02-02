import React, { useState, useEffect } from 'react';

const BlogForm = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    header: {
      title: '',
      subtitle: ''
    },
    title: '',
    content: '',
    image: null,
    author: '',
    category: '',
    publishedDate: '',
    metaInfo: {
      keywords: '',
      description: '',
      tags: []
    }
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog/getAll');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching blogs' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value
      }
    }));
  };

  const handleMetaInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      metaInfo: {
        ...prev.metaInfo,
        [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
      }
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append('header', JSON.stringify(formData.header));
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('publishedDate', formData.publishedDate);
    formDataToSend.append('metaInfo', JSON.stringify(formData.metaInfo));

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (editingId) {
        await fetch(`/api/blog/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Blog updated successfully' });
      } else {
        await fetch('/api/blog/add', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Blog created successfully' });
      }
      
      setFormData({
        header: { title: '', subtitle: '' },
        title: '',
        content: '',
        image: null,
        author: '',
        category: '',
        publishedDate: '',
        metaInfo: {
          keywords: '',
          description: '',
          tags: []
        }
      });
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving blog' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await fetch(`/api/blog/delete/${id}`, {
          method: 'DELETE'
        });
        setMessage({ type: 'success', text: 'Blog deleted successfully' });
        fetchBlogs();
      } catch (error) {
        setMessage({ type: 'error', text: 'Error deleting blog' });
      }
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      header: blog.header,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      publishedDate: blog.publishedDate,
      metaInfo: blog.metaInfo,
      image: null
    });
    setEditingId(blog._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Header Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Header Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.header.title}
                  onChange={handleHeaderChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Header Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.header.subtitle}
                  onChange={handleHeaderChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Blog Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Featured Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Published Date</label>
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Meta Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Meta Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Keywords</label>
              <input
                type="text"
                name="keywords"
                value={formData.metaInfo.keywords}
                onChange={handleMetaInfoChange}
                placeholder="Enter keywords separated by commas"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.metaInfo.description}
                onChange={handleMetaInfoChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.metaInfo.tags.join(', ')}
                onChange={handleMetaInfoChange}
                placeholder="Enter tags separated by commas"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Blog Post' : 'Create Blog Post'}
          </button>
        </form>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'error' 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          <p>{message.text}</p>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Blog Posts</h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-4 border rounded-md space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-sm text-gray-600">By {blog.author} in {blog.category}</p>
                  <p className="text-sm text-gray-500">{new Date(blog.publishedDate).toLocaleDateString()}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogForm;