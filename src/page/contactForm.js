import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Checkbox from 'antd/es/checkbox'

import Select from './components/select'

const { TextArea } = Input;

const IndustryData = [
  'Automotive',
  'Consulting',
  'Finance',
  'Healthcare',
  'Media/PR',
  'Retail',
  'Technology',
  'Telecommunication'
]

const OpGeoData = [
  'National',
  'Regional',
  'Global'
]

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 22,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ContactForm = (props) => {

  const [values, setValues] = useState({
    fname: '',
    lcount: '',
    email: '',
    jobTitle: '',
    company: '',
    industry: '',
    country: '',
    opGeo: '',
    msg: '',
    chkPrivacy: '',
    chkNewslatter: '',
  });

  const [allCountry, setAllCountry] = useState([])

  const [, forceUpdate] = useState({});

  const {
    fname = '',
    lname = '',
    email = '',
    jobTitle = '',
    company = '',
    msg = ''
  } = values;

  useEffect(() => {
    forceUpdate({});

    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(result => {
        let filterData = result && result.length ? result.map(item => {
          return { name: item.name, flag: item.flag }
        }) : []
        setAllCountry(filterData);
      })
      .catch(() => setAllCountry([]));

  }, []);

  const [form] = Form.useForm();

  const handleChange = name => event => {
    if (name === 'chkPrivacy' || name === 'chkNewslatter') {
      setValues({ ...values, [name]: event.target.checked });
    } else {
      setValues({ ...values, [name]: event.target.value });
    }

  };

  const onChange = (name, item) => {
    setValues({ ...values, [name]: item });
    console.log('values:', values)
  };

  const onFinish = () => {
    // CALLING SUBMIT, SHOULD WRIGHT LOGIN HERE IN FUTUR
    props.callSubmit()
  };

  return (
    <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

      <Row className="con-form">

        <Col xs={24} xl={12}>
          <label>First name*</label><br />
          <Form.Item
            name="firstname"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input onChange={handleChange('fname')} value={fname} />
          </Form.Item>

        </Col>
        <Col xs={24} xl={12}>
          <label>Last name*</label>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input onChange={handleChange('lname')} value={lname} />
          </Form.Item>

        </Col>
        <Col xs={24} xl={12}>
          <label>Email*</label>
          <Form.Item
            name="email"
            label=""
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input onChange={handleChange('email')} value={email} />
          </Form.Item>
        </Col>
        <Col xs={24} xl={12}>
          <label>Job title</label>
          <Form.Item
            name="jobtitile"
          >
            <Input onChange={handleChange('jobTitle')} value={jobTitle} />
          </Form.Item>

        </Col><br /><br /><br /><br />

        <Col xs={24} xl={12}>
          <label>Company*</label>
          <Form.Item
            name="company"
            rules={[{ required: true, message: 'Please input your Company!' }]}
          >
            <Input onChange={handleChange('company')} value={company} />
          </Form.Item>
        </Col>

        <Col xs={24} xl={12}>
          <label>Industry</label><br />
          <Form.Item
            name="industry"
          >
            <Select name='industry' onChangeHandle={(name, item) => onChange(name, item)} data={IndustryData} />
          </Form.Item>

        </Col>
        <Col xs={24} xl={12}>
          <label>Country</label><br />
          <Form.Item
            name="country"
          >
            <Select name='country' onChangeHandle={(name, item) => onChange(name, item)} data={allCountry} />
          </Form.Item>

        </Col>
        <Col xs={24} xl={12}>
          <label>Operating geography</label><br />
          <Form.Item
            name="opgeo"
          >
            <Select name='opGeo' onChangeHandle={(name, item) => onChange(name, item)} data={OpGeoData} />
          </Form.Item>
        </Col>
        <Col span={23}>
          <label style={{ lineHeight: '32px' }}>What would you like to talk about?<br /></label>
          <TextArea rows={4} onChange={handleChange('msg')} value={msg} />
        </Col>

        <Col xs={24} xl={12}>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
          >
            <Checkbox onChange={handleChange('chkPrivacy')}>By submitting this form I accept <a href="https://www.modularbank.co/privacy-policy/" className="check-txt">privacy policy and cookie policy.</a></Checkbox>
          </Form.Item>
          <Checkbox onChange={handleChange('chkNewslatter')}>I would like to receive your newsletter.</Checkbox>
        </Col>

        <Col className="btn-col" xs={24} xl={12}>
          <Form.Item shouldUpdate>
            {() => (
              <Button className="send-btn"
                type="danger"
                htmlType="Send"
                disabled={
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm
