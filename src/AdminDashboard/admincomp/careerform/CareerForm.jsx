import React, { useState, useEffect } from 'react';

const CareerForm = () => {
  const [careers, setCareers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    headerImage: null,
    sections: [
      {
        title: '',
        description: '',
        image: null
      }
    ],
    jobs: [
      {
        title: '',
        description: '',
        requirements: [''],
        location: '',
        type: ''
      }
    ]
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetch('/api/career/getAll');
      const data = await response.json();
      setCareers(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching careers' });
    }
  };

  const handleTitleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleSectionChange = (index, field, value) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      newSections[index] = {
        ...newSections[index],
        [field]: value
      };
      return { ...prev, sections: newSections };
    });
  };

  const handleJobChange = (index, field, value) => {
    setFormData(prev => {
      const newJobs = [...prev.jobs];
      newJobs[index] = {
        ...newJobs[index],
        [field]: value
      };
      return { ...prev, jobs: newJobs };
    });
  };

  const handleRequirementChange = (jobIndex, reqIndex, value) => {
    setFormData(prev => {
      const newJobs = [...prev.jobs];
      const newRequirements = [...newJobs[jobIndex].requirements];
      newRequirements[reqIndex] = value;
      newJobs[jobIndex] = {
        ...newJobs[jobIndex],
        requirements: newRequirements
      };
      return { ...prev, jobs: newJobs };
    });
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', description: '', image: null }]
    }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const addJob = () => {
    setFormData(prev => ({
      ...prev,
      jobs: [...prev.jobs, { title: '', description: '', requirements: [''], location: '', type: '' }]
    }));
  };

  const removeJob = (index) => {
    setFormData(prev => ({
      ...prev,
      jobs: prev.jobs.filter((_, i) => i !== index)
    }));
  };

  const addRequirement = (jobIndex) => {
    setFormData(prev => {
      const newJobs = [...prev.jobs];
      newJobs[jobIndex].requirements.push('');
      return { ...prev, jobs: newJobs };
    });
  };

  const removeRequirement = (jobIndex, reqIndex) => {
    setFormData(prev => {
      const newJobs = [...prev.jobs];
      newJobs[jobIndex].requirements = newJobs[jobIndex].requirements.filter((_, i) => i !== reqIndex);
      return { ...prev, jobs: newJobs };
    });
  };

  const handleImageChange = (e, type, index = null) => {
    const file = e.target.files[0];
    if (type === 'header') {
      setFormData(prev => ({
        ...prev,
        headerImage: file
      }));
    } else if (type === 'section') {
      setFormData(prev => {
        const newSections = [...prev.sections];
        newSections[index] = { ...newSections[index], image: file };
        return { ...prev, sections: newSections };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    
    if (formData.headerImage) {
      formDataToSend.append('headerImage', formData.headerImage);
    }

    // Add sections data
    formData.sections.forEach((section, index) => {
      if (section.image) {
        formDataToSend.append('sectionImages', section.image);
      }
    });
    formDataToSend.append('sections', JSON.stringify(formData.sections.map(section => ({
      title: section.title,
      description: section.description
    }))));

    // Add jobs data
    formDataToSend.append('jobs', JSON.stringify(formData.jobs));

    try {
      if (editingId) {
        await fetch(`/api/career/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Career section updated successfully' });
      } else {
        await fetch('/api/career/add', {
          method: 'POST',
          body: formDataToSend
        });
        setMessage({ type: 'success', text: 'Career section created successfully' });
      }
      
      setFormData({
        title: '',
        headerImage: null,
        sections: [{ title: '', description: '', image: null }],
        jobs: [{ title: '', description: '', requirements: [''], location: '', type: '' }]
      });
      setEditingId(null);
      fetchCareers();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving career section' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingId ? 'Edit Career Section' : 'Create Career Section'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Header Image Section */}
          <div className="border-b pb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
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

          {/* Sections */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Sections</h3>
              <button
                type="button"
                onClick={addSection}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Section
              </button>
            </div>

            {formData.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Section {index + 1}</h4>
                  {formData.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
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
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={section.description}
                      onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, 'section', index)}
                      accept="image/*"
                      className="w-full"
                      required={!editingId}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Jobs */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Jobs</h3>
              <button
                type="button"
                onClick={addJob}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Job
              </button>
            </div>

            {formData.jobs.map((job, jobIndex) => (
              <div key={jobIndex} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Job {jobIndex + 1}</h4>
                  {formData.jobs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeJob(jobIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => handleJobChange(jobIndex, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={job.description}
                      onChange={(e) => handleJobChange(jobIndex, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={job.location}
                      onChange={(e) => handleJobChange(jobIndex, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <input
                      type="text"
                      value={job.type}
                      onChange={(e) => handleJobChange(jobIndex, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Requirements
                      </label>
                      <button
                        type="button"
                        onClick={() => addRequirement(jobIndex)}
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Add Requirement
                      </button>
                    </div>
                    {job.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => handleRequirementChange(jobIndex, reqIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                        {job.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRequirement(jobIndex, reqIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingId ? 'Update Career Section' : 'Create Career Section'}
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

      {/* Display existing careers if any */}
      {careers.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Existing Career Sections</h3>
          <div className="space-y-4">
            {careers.map((career) => (
              <div key={career._id} className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{career.title}</h4>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(career._id);
                        setFormData({
                          title: career.title,
                          headerImage: null,
                          sections: career.sections,
                          jobs: career.jobs
                        });
                      }}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await fetch(`/api/career/delete/${career._id}`, {
                            method: 'DELETE'
                          });
                          setMessage({ type: 'success', text: 'Career section deleted successfully' });
                          fetchCareers();
                        } catch (error) {
                          setMessage({ type: 'error', text: 'Error deleting career section' });
                        }
                      }}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerForm;