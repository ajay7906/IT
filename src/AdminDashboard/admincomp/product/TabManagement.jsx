import React, { useState, useEffect } from 'react';

const TabManagementForm = () => {
  const [tabs, setTabs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    tabs: [
      {
        title: '',
        description: '',
        image: null
      }
    ]
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTabs();
  }, []);

  const fetchTabs = async () => {
    try {
      const response = await fetch('/api/tabGetAll');
      const data = await response.json();
      setTabs(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching tabs' });
    }
  };

  const handleMainTitleChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      title: value
    }));
  };

  const handleTabChange = (index, field, value) => {
    setFormData(prev => {
      const newTabs = [...prev.tabs];
      newTabs[index] = {
        ...newTabs[index],
        [field]: value
      };
      return { ...prev, tabs: newTabs };
    });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    setFormData(prev => {
      const newTabs = [...prev.tabs];
      newTabs[index] = { ...newTabs[index], image: file };
      return { ...prev, tabs: newTabs };
    });
  };

  const addTab = () => {
    setFormData(prev => ({
      ...prev,
      tabs: [...prev.tabs, { title: '', description: '', image: null }]
    }));
  };

  const removeTab = (index) => {
    setFormData(prev => ({
      ...prev,
      tabs: prev.tabs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Add main title
    formDataToSend.append('title', formData.title);

    // Add tabs data
    formData.tabs.forEach((tab, index) => {
      if (tab.image) {
        formDataToSend.append(`tabImages[${index}]`, tab.image);
      }
    });

    formDataToSend.append('tabs', JSON.stringify(formData.tabs.map(tab => ({
      title: tab.title,
      description: tab.description
    }))));

    try {
      if (editingId) {
        await fetch(`/api/tabUpdate/${editingId}`, {
          method: 'PUT',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Tab section updated successfully' });
      } else {
        await fetch('/api/tabAdd', {
          method: 'POST',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Tab section created successfully' });
      }
      
      setFormData({
        title: '',
        tabs: [{ title: '', description: '', image: null }]
      });
      setEditingId(null);
      fetchTabs();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving tab section' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? 'Edit Tab Section' : 'Create Tab Section'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Title Section */}
          <div className="border-b pb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleMainTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Tabs Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Tabs</h3>
              <button
                type="button"
                onClick={addTab}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Tab
              </button>
            </div>
            
            {formData.tabs.map((tab, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Tab {index + 1}</h4>
                  {formData.tabs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTab(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={tab.title}
                      onChange={(e) => handleTabChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={tab.description}
                      onChange={(e) => handleTabChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tab Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, index)}
                      accept="image/*"
                      className="w-full"
                      required={!editingId}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingId ? 'Update Tab Section' : 'Create Tab Section'}
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

export default TabManagementForm;