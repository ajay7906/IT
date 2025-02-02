import React, { useState, useEffect } from 'react';

const BusinessSectionForm = () => {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsHeading: '',
    skillsLeft: [],
    skillsRight: []
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/business/getAll');
      const data = await response.json();
      setSections(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching business sections' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e, side) => {
    const skills = e.target.value.split('\n').filter(skill => skill.trim() !== '');
    setFormData(prev => ({
      ...prev,
      [side]: skills
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch(`/api/business/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setMessage({ type: 'success', text: 'Business section updated successfully' });
      } else {
        await fetch('/api/business/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setMessage({ type: 'success', text: 'Business section created successfully' });
      }
      
      setFormData({
        title: '',
        description: '',
        skillsHeading: '',
        skillsLeft: [],
        skillsRight: []
      });
      setEditingId(null);
      fetchSections();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving business section' });
    }
  };

  const handleEdit = (section) => {
    setFormData({
      title: section.title,
      description: section.description,
      skillsHeading: section.skillsHeading,
      skillsLeft: section.skillsLeft,
      skillsRight: section.skillsRight
    });
    setEditingId(section._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this business section?')) {
      try {
        await fetch(`/api/business/${id}`, {
          method: 'DELETE'
        });
        setMessage({ type: 'success', text: 'Business section deleted successfully' });
        fetchSections();
      } catch (error) {
        setMessage({ type: 'error', text: 'Error deleting business section' });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Business Section' : 'Create Business Section'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Information */}
          <div className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700">Skills Heading</label>
              <input
                type="text"
                name="skillsHeading"
                value={formData.skillsHeading}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Left Skills List</label>
              <p className="text-sm text-gray-500 mb-1">Enter one skill per line</p>
              <textarea
                value={formData.skillsLeft.join('\n')}
                onChange={(e) => handleSkillsChange(e, 'skillsLeft')}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Right Skills List</label>
              <p className="text-sm text-gray-500 mb-1">Enter one skill per line</p>
              <textarea
                value={formData.skillsRight.join('\n')}
                onChange={(e) => handleSkillsChange(e, 'skillsRight')}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Business Section' : 'Create Business Section'}
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

      {/* Existing Sections List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Business Sections</h2>
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section._id} className="p-4 border rounded-md">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                  <div className="text-sm">
                    <p className="font-medium">{section.skillsHeading}</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="font-medium text-sm text-gray-700">Left Skills:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {section.skillsLeft.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-700">Right Skills:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {section.skillsRight.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(section)}
                    className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(section._id)}
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

export default BusinessSectionForm;