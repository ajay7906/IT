import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const NavbarForm = () => {
  const [formData, setFormData] = useState({
    tollFree: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
    },
    services: {
      applicationServices: '',
      businessServices: '',
      technologyTrainings: '',
      globalStaffing: '',
      staffAugmentation: '',
    },
    otherLinks: {
      home: '',
      aboutUs: '',
      products: '',
      career: '',
      blog: '',
      contactUs: '',
    },
    logo: null,
  });

  const [recordId, setRecordId] = useState(null); // To store the fetched record's _id

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/headers/getAll');
        if (response.data && response.data.length > 0) {
          const headerData = response.data[0]; // Assuming the first record is needed
          setRecordId(headerData._id); // Save the _id of the record
          setFormData({
            tollFree: headerData.tollFree,
            socialLinks: headerData.socialLinks,
            services: headerData.services,
            otherLinks: headerData.otherLinks,
            logo: headerData.logo,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e, section, key) => {
    if (section) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [key]: e.target.value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Handle logo upload
  const handleLogoUpload = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!recordId) {
      message.error('No record selected for update');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/headers/update/${recordId}`, formData);
      message.success('Form updated successfully.');
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error updating form:', error);
      message.error('Failed to update the form');
    }
  };

  return (
    <div style={{ marginTop: '-80px', padding: '20px', background: '#f0f2f5' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Header Configuration Form
      </Title>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Upload beforeUpload={() => false} onChange={handleLogoUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Logo</Button>
        </Upload>
        {formData.logo && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={formData.logo}
              alt="Logo Preview"
              style={{
                maxWidth: '150px',
                maxHeight: '150px',
                objectFit: 'contain',
                border: '1px solid #ddd',
                padding: '5px',
                borderRadius: '5px',
              }}
            />
          </div>
        )}
      </div>
      <Form layout="vertical" onFinish={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Form.Item label="Toll-Free Number">
          <Input
            name="tollFree"
            value={formData.tollFree}
            onChange={handleChange}
            placeholder="Enter toll-free number"
          />
        </Form.Item>

        <Title level={4}>Social Links</Title>
        <Row gutter={16}>
          {['facebook', 'twitter', 'linkedin'].map((link) => (
            <Col span={8} key={link}>
              <Form.Item label={link.charAt(0).toUpperCase() + link.slice(1)}>
                <Input
                  value={formData.socialLinks[link]}
                  onChange={(e) => handleChange(e, 'socialLinks', link)}
                  placeholder={`Enter ${link} URL`}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Title level={4}>Services</Title>
        <Row gutter={16}>
          {Object.keys(formData.services).map((service) => (
            <Col span={8} key={service}>
              <Form.Item label={service.replace(/([A-Z])/g, ' $1')}>
                <Input
                  value={formData.services[service]}
                  onChange={(e) => handleChange(e, 'services', service)}
                  placeholder={`Enter ${service}`}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Title level={4}>Other Links</Title>
        <Row gutter={16}>
          {Object.keys(formData.otherLinks).map((link) => (
            <Col span={8} key={link}>
              <Form.Item label={link.replace(/([A-Z])/g, ' $1')}>
                <Input
                  value={formData.otherLinks[link]}
                  onChange={(e) => handleChange(e, 'otherLinks', link)}
                  placeholder={`Enter ${link}`}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NavbarForm;
