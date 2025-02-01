import React, { useState, useEffect } from 'react';

const AboutUsForm = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: null
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAboutUsEntries();
  }, []);

  const fetchAboutUsEntries = async () => {
    try {
      const response = await fetch('/api/aboutus/getAll');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching entries' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'icon' && files) {
      setFormData(prev => ({ ...prev, icon: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.icon) {
      formDataToSend.append('icon', formData.icon);
    }

    try {
      if (editingId) {
        await fetch(`/api/aboutus/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Entry updated successfully' });
      } else {
        await fetch('/api/aboutus/add', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Entry created successfully' });
      }
      
      setFormData({ title: '', description: '', icon: null });
      setEditingId(null);
      fetchAboutUsEntries();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving entry' });
    }
  };

  const handleEdit = (entry) => {
    setFormData({
      title: entry.title,
      description: entry.description,
      icon: null
    });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await fetch(`/api/aboutus/delete/${id}`, {
          method: 'DELETE',
        });
        setMessage({ type: 'success', text: 'Entry deleted successfully' });
        fetchAboutUsEntries();
      } catch (error) {
        setMessage({ type: 'error', text: 'Error deleting entry' });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit About Us Entry' : 'Create About Us Entry'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <input
              type="file"
              name="icon"
              onChange={handleInputChange}
              accept="image/*"
              required={!editingId}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Entry' : 'Create Entry'}
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

      {/* Entries List Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Entries</h2>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div 
              key={entry._id} 
              className="p-4 border border-gray-200 rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="font-medium">{entry.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                {entry.icon && (
                  <img
                    src={entry.icon}
                    alt={entry.title}
                    className="mt-2 h-16 w-16 object-cover rounded"
                  />
                )}
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => handleEdit(entry)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(entry._id)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsForm;