import React, { useState, useEffect } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FeaturesForm = () => {
  const [features, setFeatures] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bgImage: null
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/features/getAllFeatures');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching features' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        bgImage: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.bgImage) {
      formDataToSend.append('bgImage', formData.bgImage);
    }

    try {
      if (editingId) {
        await fetch(`/api/features/update${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Feature updated successfully' });
      } else {
        await fetch('/api/features/addFeatures', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Feature created successfully' });
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        bgImage: null
      });
      setPreviewUrl(null);
      setEditingId(null);
      fetchFeatures();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving feature' });
    }
  };

  const handleEdit = (feature) => {
    setEditingId(feature._id);
    setFormData({
      title: feature.title,
      description: feature.description,
      bgImage: null
    });
    setPreviewUrl(feature.bgImage);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/features/delete${id}`, {
        method: 'DELETE',
      });
      setMessage({ type: 'success', text: 'Feature deleted successfully' });
      fetchFeatures();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting feature' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Feature' : 'Create New Feature'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
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
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Background Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-auto object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Feature' : 'Create Feature'}
          </button>
        </form>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Features</h3>
        {features.map((feature) => (
          <div key={feature._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
                {feature.bgImage && (
                  <img
                    src={feature.bgImage}
                    alt={feature.title}
                    className="h-24 w-auto object-cover rounded-md"
                  />
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(feature)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feature._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Alert */}
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FeaturesForm;