import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [careers, setCareers] = useState([]);
  const [formData, setFormData] = useState({
    header: {
      title: '',
      subtitle: ''
    },
    addresses: [{
      street: '',
      city: '',
      state: '',
      zip: ''
    }],
    phones: [{
      number: '',
      type: ''
    }],
    fax: '',
    headerImage: null
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetch('/api/contact/getAll');
      const data = await response.json();
      setCareers(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching career data' });
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

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      headerImage: e.target.files[0]
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newAddresses = [...prev.addresses];
      newAddresses[index] = { ...newAddresses[index], [name]: value };
      return { ...prev, addresses: newAddresses };
    });
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { street: '', city: '', state: '', zip: '' }]
    }));
  };

  const removeAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handlePhoneChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newPhones = [...prev.phones];
      newPhones[index] = { ...newPhones[index], [name]: value };
      return { ...prev, phones: newPhones };
    });
  };

  const addPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, { number: '', type: '' }]
    }));
  };

  const removePhone = (index) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append header data
    formDataToSend.append('header', JSON.stringify(formData.header));
    formDataToSend.append('addresses', JSON.stringify(formData.addresses));
    formDataToSend.append('phones', JSON.stringify(formData.phones));
    formDataToSend.append('fax', formData.fax);

    if (formData.headerImage) {
      formDataToSend.append('headerImage', formData.headerImage);
    }

    try {
      if (editingId) {
        await fetch(`/api/contact/update/${editingId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Career updated successfully' });
      } else {
        await fetch('/api/contact/add', {
          method: 'POST',
          body: formDataToSend,
        });
        setMessage({ type: 'success', text: 'Career created successfully' });
      }
      
      setFormData({
        header: { title: '', subtitle: '' },
        addresses: [{ street: '', city: '', state: '', zip: '' }],
        phones: [{ number: '', type: '' }],
        fax: '',
        headerImage: null
      });
      setEditingId(null);
      fetchCareers();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving career data' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Career Entry' : 'Create Career Entry'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Header Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
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
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.header.subtitle}
                  onChange={handleHeaderChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Header Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Addresses Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Addresses</h3>
              <button
                type="button"
                onClick={addAddress}
                className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Add Address
              </button>
            </div>
            {formData.addresses.map((address, index) => (
              <div key={index} className="p-4 border rounded-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={(e) => handleAddressChange(index, e)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, e)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={(e) => handleAddressChange(index, e)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP</label>
                    <input
                      type="text"
                      name="zip"
                      value={address.zip}
                      onChange={(e) => handleAddressChange(index, e)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-600 text-sm hover:text-red-700"
                  >
                    Remove Address
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Phones Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Phone Numbers</h3>
              <button
                type="button"
                onClick={addPhone}
                className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Add Phone
              </button>
            </div>
            {formData.phones.map((phone, index) => (
              <div key={index} className="p-4 border rounded-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number</label>
                    <input
                      type="tel"
                      name="number"
                      value={phone.number}
                      onChange={(e) => handlePhoneChange(index, e)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      name="type"
                      value={phone.type}
                      onChange={(e) => handlePhoneChange(index, e)}
                      placeholder="e.g., Office, Mobile"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removePhone(index)}
                    className="text-red-600 text-sm hover:text-red-700"
                  >
                    Remove Phone
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Fax Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fax Number</label>
            <input
              type="tel"
              value={formData.fax}
              onChange={(e) => setFormData(prev => ({ ...prev, fax: e.target.value }))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingId ? 'Update Career Entry' : 'Create Career Entry'}
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

export default ContactForm;