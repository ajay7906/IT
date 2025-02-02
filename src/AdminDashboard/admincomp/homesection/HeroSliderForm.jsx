import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HeroSliderForm = () => {
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: []
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/slides/getAllslides');
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching slides' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setMessage({ type: 'error', text: 'Maximum 10 images allowed' });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      images: files
    }));

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      setMessage({ type: 'error', text: 'At least one image is required' });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formData.images.forEach(image => {
      formDataToSend.append('images', image);
    });

    try {
      if (editingId) {
        await fetch(`/api/slides/updateslides/${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Slide updated successfully' });
      } else {
        await fetch('/api/slides/addslides', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Slide created successfully' });
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        images: []
      });
      setPreviewUrls([]);
      setEditingId(null);
      fetchSlides();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving slide' });
    }
  };

  const handleEdit = (slide) => {
    setEditingId(slide._id);
    setFormData({
      title: slide.title,
      description: slide.description,
      images: [] // Clear images since we can't edit existing ones directly
    });
    setPreviewUrls(slide.images); // Show existing images as previews
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/slides/deleteslides/${id}`, {
        method: 'DELETE',
      });
      setMessage({ type: 'success', text: 'Slide deleted successfully' });
      fetchSlides();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting slide' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Slide' : 'Create New Slide'}
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
            <label className="block text-sm font-medium text-gray-700">Images (Max 10)</label>
            <input
              type="file"
              onChange={handleImagesChange}
              multiple
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Image Previews */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Slide' : 'Create Slide'}
          </button>
        </form>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Slides</h3>
        {slides.map((slide) => (
          <div key={slide._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{slide.title}</h4>
                  <p className="text-gray-600">{slide.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {slide.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="h-32 w-full object-cover rounded-md"
                  />
                ))}
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

export default HeroSliderForm;