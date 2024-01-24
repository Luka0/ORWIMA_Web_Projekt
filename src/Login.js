import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function onFinish(values){
    const username = values.username;
    navigate(`/game/${username}`);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button 
            type="primary" 
            style={{ background: "#32578D", borderColor: "black" }}
            htmlType="submit"
          >
            Nastavi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}