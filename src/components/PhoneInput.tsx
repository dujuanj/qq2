import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const PhoneInput: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: { phone: string }) => {
    if (/^1[3-9]\d{9}$/.test(values.phone)) {
      // message.success("手机号验证成功！");
      localStorage.setItem('phone',values.phone)
      navigate("/health"); // 跳转到健康页面
    } else {
      message.error("请输入有效的手机号！");
    }
  };

  return (
    <div style={{ margin: "50px auto", textAlign: "center",padding:'0 2rem' }}>
      <h2>手机号验证</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="请输入手机号"
          name="phone"
          rules={[{ required: true, message: "手机号不能为空" }]}
        >
          <Input placeholder="请输入您的手机号" maxLength={11} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            下一步
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhoneInput;