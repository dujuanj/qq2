import React, { useState } from "react";
import { Button,SpinLoading, Toast } from "antd-mobile";
import { useNavigate } from 'react-router-dom';

import "./BeforeLogin.css";

const BeforeLogin: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 控制加载状态
    const [isChecked, setIsChecked] = useState(false);  // 添加状态管理
    const [isShaking, setIsShaking] = useState(false);  // 添加晃动状态

    const handleLogin = () => {
        if (!isChecked) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);  // 500ms 后停止晃动
            return;
        }
        setLoading(true); // 显示加载动画
         setTimeout(() => {
        setLoading(false); 
        navigate("/login"); // 跳转到验证页面
      },500)
      
    };

    return (
        <div className="login-container">
            <div className="header">
                <span className="back-icon">
                    <img src="back-arrow.png" alt="" />
                </span>
                <span className="more-icon">•••</span>
            </div>
            
            <div className="logo-section">
                <h1 className="title">QQ</h1>
                <div className="avatar">
                    <img src="cat.webp" alt="avatar" />
                </div>
                <div className="nickname">心跳</div>
            </div>

            <div className="button-group">
                <Button 
                    block 
                    color="primary" 
                    className="login-button"
                    onClick={handleLogin}
                >
                     {loading && <SpinLoading color='white' style={{ '--size': '32px',margin: '0 auto' }} />}  一键登录
                  
                </Button>
                <Button block className="switch-account">
                    切换账号
                </Button>
            </div>

            <div className={`agreement ${isShaking ? 'shake' : ''}`}>
                <input 
                    type="checkbox" 
                    id="agreement" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="agreement">
                    已阅读并同意
                    <a href="#">服务协议</a>
                    和
                    <a href="#">QQ隐私保护指引</a>
                </label>
            </div>
        </div>
    );
};

export default BeforeLogin;