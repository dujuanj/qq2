import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "./Login.css";
import { SpinLoading } from "antd-mobile";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(""); // 追踪密码输入框的值
  const [loading, setLoading] = useState(false); // 控制加载状态
   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const onFinish = (values: { username: string; password: string }) => {
    console.log("表单数据: ", values);
    if (values) {
      setLoading(true); // 显示加载动画
      setTimeout(() => {
        setLoading(false); 
        navigate("/validate"); // 跳转到验证页面
      },2000)
      
     }
  };

   useEffect(() => {
    const handleResize = () => {
      // 检查视口高度是否缩小
      const isKeyboardNowVisible = window.innerHeight < window.screen.height * 0.75;
      setIsKeyboardVisible(isKeyboardNowVisible);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="login-container">
          {/* QQ Logo */}
          <div className="top">
              <div className="back-arrow">
                  <img src="back-arrow.png" alt="" />
              </div>
          </div>
      <div className="login-logo">
        <span className="qq-logo">
          QQ
          {/* QQ<span style={{ color: "#77BDFB" }}>9</span> */}
        </span>
      </div>

      {/* 登录表单 */}
      <Form onFinish={onFinish} className="login-form">
        {/* 用户名输入框 */}
        <Form.Item
          name="username"
          className="input_wrap"
          rules={[{ required: true, message: "请输入用户名！" }]}
            style={{marginBottom:'15px'}}
        >
        
          <Input
            style={{textAlign:'center',height:'55px'}}
            placeholder="QQ号码"
            size="large"
          />
        </Form.Item>

        {/* 密码输入框 */}
        <Form.Item
          name="password"
          className="input_wrap"
          rules={[{ required: true, message: "请输入密码！" }]}
          style={{marginBottom:'15px'}}
        >
          <div style={{ position: "relative" }}>
             <Input
              type="password"
              placeholder="请输入密码"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ textAlign: 'center',height:'55px' }}
            />
          </div>
        </Form.Item>

          {/* 服务协议复选框 */}
        <Form.Item
          name="agreement"
          valuePropName="checked" // 绑定 Checkbox 的选中状态
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject("请勾选服务协议和隐私保护指引！"),
            },
          ]}
        >
          <div className="login-agreement">
            <Checkbox /> &nbsp; 我已阅读并同意{" "}
            <a href="#">服务协议</a> 和 <a href="#">QQ隐私保护指引</a>
          </div>
        </Form.Item>

        {/* 登录按钮 */}
        <Form.Item style={{marginBottom:'8px'}}>
          <Button type="primary" htmlType="submit" className="login-button" block style={{height:'50px'}}>
            {loading && <SpinLoading style={{ '--size': '24px' }} color='white'  />}登录
          </Button>
        </Form.Item>

      
       
    
      </Form>

      {/* 页面内容 */}
      {!isKeyboardVisible && (
        <div className="bottom-menu">
          <div className="menu-item">
            <div className="menu-icon">
              <img src="phone.png" alt="" />
            </div>
            <p className="menu-label">手机号登录</p>
          </div>
          <div className="menu-item">
            <div className="menu-icon userimg">
              <img src="user.png" alt="" />
            </div>
            <p className="menu-label">其他方式登录</p>
          </div>
          <div className="menu-item userimg">
            <div className="menu-icon">
              <img src="add.png" alt="" />
            </div>
            <p className="menu-label">注册</p>
          </div>
          <div className="menu-item">
            <div className="menu-icon">⋯</div>
            <p className="menu-label">更多</p>
          </div>
        </div>
      )}
    </div>
  )
};

export default Login;