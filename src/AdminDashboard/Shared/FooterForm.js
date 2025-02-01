import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const FooterForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    alert('Form submitted successfully (check console for data)');
  };

  return (
    <div style={{ marginTop: '-80px', padding: '20px', background: '#f0f2f5' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Footer Configuration Form
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          quickLinks: [{ name: '', link: '' }],
          services: [{ name: '', link: '' }],
          outsourcingServices: [{ name: '', link: '' }],
          contactInfo: {
            phone: '',
            email: '',
            socialLinks: [{ platform: '', link: '' }],
          },
        }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        {/* Quick Links */}
        <Title level={4}>Quick Links</Title>
        <Form.List name="quickLinks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Name"
                      rules={[{ required: true, message: 'Name is required' }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      label="Link"
                      rules={[{ required: true, message: 'Link is required' }]}
                    >
                      <Input placeholder="Enter link" />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  Add Quick Link
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Services */}
        <Title level={4}>Services</Title>
        <Form.List name="services">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Name"
                      rules={[{ required: true, message: 'Name is required' }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      label="Link"
                      rules={[{ required: true, message: 'Link is required' }]}
                    >
                      <Input placeholder="Enter link" />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  Add Service
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Outsourcing Services */}
        <Title level={4}>Outsourcing Services</Title>
        <Form.List name="outsourcingServices">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Name"
                      rules={[{ required: true, message: 'Name is required' }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      label="Link"
                      rules={[{ required: true, message: 'Link is required' }]}
                    >
                      <Input placeholder="Enter link" />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  Add Outsourcing Service
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Contact Info */}
        <Title level={4}>Contact Info</Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['contactInfo', 'phone']}
              label="Phone"
              rules={[{ required: true, message: 'Phone is required' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['contactInfo', 'email']}
              label="Email"
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>
        </Row>

        {/* Social Links */}
        <Title level={5}>Social Links</Title>
        <Form.List name={['contactInfo', 'socialLinks']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'platform']}
                      label="Platform"
                      rules={[{ required: true, message: 'Platform is required' }]}
                    >
                      <Input placeholder="Enter platform (e.g., Facebook)" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      label="Link"
                      rules={[{ required: true, message: 'Link is required' }]}
                    >
                      <Input placeholder="Enter link" />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  Add Social Link
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FooterForm;
