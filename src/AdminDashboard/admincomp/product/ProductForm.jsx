import React, { useState, useEffect } from 'react';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null,
    bannerBackgroundImage: null
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products/getAll');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching products' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
      e.target.value = '';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Only JPEG, JPG, PNG, and GIF images are allowed' });
      e.target.value = '';
      return;
    }

    setFormData(prev => ({
      ...prev,
      [imageType]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    formDataToSend.append('subtitle', formData.subtitle);
    formDataToSend.append('description', formData.description);

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    if (formData.bannerBackgroundImage) {
      formDataToSend.append('bannerBackgroundImage', formData.bannerBackgroundImage);
    }

    try {
      if (editingId) {
        await fetch(`/api/products/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Product updated successfully' });
      } else {
        await fetch('/api/products/add', {
          method: 'POST',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Product created successfully' });
      }
      
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image: null,
        bannerBackgroundImage: null
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving product' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? 'Edit Product' : 'Create Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4 border-t pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 'image')}
                accept="image/jpeg,image/jpg,image/png,image/gif"
                className="w-full"
                required={!editingId}
              />
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB. Allowed formats: JPEG, JPG, PNG, GIF
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Background Image
              </label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 'bannerBackgroundImage')}
                accept="image/jpeg,image/jpg,image/png,image/gif"
                className="w-full"
                required={!editingId}
              />
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB. Allowed formats: JPEG, JPG, PNG, GIF
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingId ? 'Update Product' : 'Create Product'}
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
    </div>
  );
};

export default ProductForm;