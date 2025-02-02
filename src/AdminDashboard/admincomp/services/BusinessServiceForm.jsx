import React, { useState, useEffect } from 'react';

const BusinessServicesForm = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    header: {
      title: '',
      subtitle: '',
      image: null
    },
    content: {
      title: '',
      description: '',
      image: null
    },
    features: []
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services/business/getAll');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching services' });
    }
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

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value
      }
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'header') {
      setFormData(prev => ({
        ...prev,
        header: { ...prev.header, image: file }
      }));
    } else if (type === 'content') {
      setFormData(prev => ({
        ...prev,
        content: { ...prev.content, image: file }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Add header data
    formDataToSend.append('header', JSON.stringify({
      title: formData.header.title,
      subtitle: formData.header.subtitle
    }));
    if (formData.header.image) {
      formDataToSend.append('headerImage', formData.header.image);
    }

    // Add content data
    formDataToSend.append('content', JSON.stringify({
      title: formData.content.title,
      description: formData.content.description
    }));
    if (formData.content.image) {
      formDataToSend.append('contentImage', formData.content.image);
    }

    // Add features data
    formDataToSend.append('features', JSON.stringify(formData.features));

    try {
      if (editingId) {
        await fetch(`/api/services/business/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Service updated successfully' });
      } else {
        await fetch('/api/services/business/add', {
          method: 'POST',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Service created successfully' });
      }
      
      setFormData({
        header: { title: '', subtitle: '', image: null },
        content: { title: '', description: '', image: null },
        features: []
      });
      setEditingId(null);
      fetchServices();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving service' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? 'Edit Business Service' : 'Create Business Service'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">Header Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.header.title}
                  onChange={handleHeaderChange}
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
                  value={formData.header.subtitle}
                  onChange={handleHeaderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Image
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, 'header')}
                  accept="image/*"
                  className="w-full"
                  required={!editingId}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">Content Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.content.title}
                  onChange={handleContentChange}
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
                  value={formData.content.description}
                  onChange={handleContentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Image
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, 'content')}
                  accept="image/*"
                  className="w-full"
                  required={!editingId}
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Feature
              </button>
            </div>
            
            {formData.features.map((feature, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Feature {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter feature"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingId ? 'Update Service' : 'Create Service'}
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

export default BusinessServicesForm;