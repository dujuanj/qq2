import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Mask, NavBar, Space, SpinLoading } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";

const NewLogin: React.FC = () => {
  const rawPhoneVal: string | null = localStorage.getItem("phone"); // 原始手机号
  const phoneVal = rawPhoneVal
    ? `${rawPhoneVal.slice(0, 3)}*******${rawPhoneVal.slice(-1)}`
    : "未绑定手机号"; // 默认处理后的手机号
   const [loading, setLoading] = useState(false); // 控制遮罩层显示状态
    const navigate = useNavigate();
  const sendCode = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
       navigate("/code"); // 跳转到验证页面
    },2000)
        
    }

    return (

        <div>
             <NavBar style={{marginTop:'20px'}} />
            <div style={styles.container}>
        

      {/* 标题 */}
      <div style={styles.title}>新设备登录验证</div>

      {/* 描述文字 */}
      <div style={styles.subtitle}>
        你正在新设备登录 QQ，需要进行身份验证。
      </div>

      {/* 手机号输入框 */}
      <div style={styles.inputContainer}>
        <div style={styles.countryCode}>
          +86 <DownOutline style={{ fontSize: 16, marginLeft: 4 }} />
        </div>
        <Input
          style={styles.phoneNumber}
          value={phoneVal}
          readOnly
          disabled
          clearable={false}
        />
      </div>

      {/* 发送短信验证码按钮 */}
      <Button block color="primary" style={styles.button} onClick={sendCode}>
        发送短信验证码
      </Button>

      {/* 额外信息 */}
      <div style={styles.footerText}>
        无法接收短信？
        <a href="#" style={styles.link}>
          尝试其他验证方式
        </a>
      </div>
        </div>
         {/* 遮罩层 */}
      {loading && (
        <Mask visible>
          <div style={styles.loadingContainer}>
             <SpinLoading color="white" />
            <p style={styles.loadingText}>处理中...</p>
          </div>
        </Mask>
      )}
        </div>
      
    
  );
};

export default NewLogin;

// 样式对象
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 30px",
    // backgroundColor: "#f7f8fa",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "18px",
    cursor: "pointer",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#000",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6c6c6c",
    marginBottom: "20px",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "13px 15px",
    marginBottom: "20px",
  },
  countryCode: {
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    color: '#818183',
    marginRight:'10px'
  },
  phoneNumber: {
    flex: 1,
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    fontWeight: "500",
    color: "#000",
    textAlign: "left",
    outline: "none",
  },
  button: {
    width: "100%",
    maxWidth: "400px",
    height: "45px",
    fontSize: "16px",
      borderRadius: "8px",
    marginTop:'30px',
    marginBottom: "30px",
  },
  footerText: {
    fontSize: "14px",
    color: "#6c6c6c",
    textAlign: "center",
  },
  link: {
    color: "#1677ff",
    textDecoration: "none",
    marginLeft: "4px",
  },
   loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // 绝对定位
    top: "50%", // 垂直居中
    left: "50%", // 水平居中
    transform: "translate(-50%, -50%)", // 偏移自身宽高的一半
    width: "120px",
    height: "120px",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // 黑色背景
    borderRadius: "12px", // 圆角效果
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // 添加阴影效果
  },
  loadingText: {
    marginTop: "8px", // 文字与加载动画之间的间距
    color: "#fff", // 白色文字
    fontSize: "16px", // 文字大小
    fontWeight: "500", // 文字加粗
  },
};