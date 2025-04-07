import React, { useEffect, useState } from "react";
import { Grid, Input, Button, Toast, NavBar, Mask, SpinLoading } from "antd-mobile";

const SmsVerification: React.FC = () => {
  const [values, setValues] = useState<string[]>(Array(6).fill(""));
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
   const rawPhoneVal: string | null = localStorage.getItem("phone"); // 原始手机号
  const phoneVal = rawPhoneVal
    ? `${rawPhoneVal.slice(0, 3)}*******${rawPhoneVal.slice(-1)}`
    : "未绑定手机号"; // 默认处理后的手机号
  const [countdown, setCountdown] = useState<number>(60); // 倒计时初始值为60秒
   const [loading, setLoading] = useState(false); // 控制遮罩层显示状态
  
   // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer); // 清除计时器
    }
  }, [countdown]);
  
  // 输入事件
  const handleInputChange = (value: string, index: number) => {
    const newValues = [...values];
    newValues[index] = value.slice(0, 1); // 确保单个字符
    setValues(newValues);

    // 自动聚焦到下一个输入框
    if (value && index < 5) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      nextInput?.focus();
    }
    if (index === 5 && value) {
       setLoading(true); // 显示遮罩层
      setTimeout(() => {
        setLoading(false); // 隐藏遮罩层
        // 1 秒后弹出验证码错误提示
        setTimeout(() => {
          Toast.show({
           content: (
      <div style={styles.errorToast}>
        <div style={styles.errorIcon}>!</div>
        <div style={styles.errorText}>验证码输入错误。</div>
      </div>
    ),
    duration: 2000, // 持续时间
          });


        }, 1000);

         // 2 秒后清空输入框
    setTimeout(() => {
      setValues(Array(6).fill("")); // 重置输入框的值
      setFocusedInput(0); // 清除聚焦状态
    }, 2000);
      }, 1000); // 延迟 1 秒显示加载弹窗
    }


  };

  

  const handleSubmit = () => {
    const code = values.join("");
    if (code.length === 6) {
      Toast.show({
        content: `验证码：${code}`,
        duration: 2000,
      });
    } else {
      Toast.show({
        content: "请输入完整验证码",
        duration: 2000,
      });
    }
  };

  return (
    <div id="codepage" style={styles.container}>
      {/* <NavBar style={{ marginTop: '20px' }} /> */}
      <div style={styles.wrap}>
          {/* 标题 */}
      <h3 style={styles.title}>密保手机号验证</h3>
        <p style={styles.subtitle}>已向
          <span style={styles.phone}>+86 { phoneVal}</span>
          发送验证码,</p>
        <p style={styles.subtitle}>请输入短信验证码。</p>
        
  {/* 验证码输入框 */}
      <Grid columns={6} gap={8}>
        {values.map((value, index) => (
          <Input
            key={index}
            id={`input-${index}`}
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
             style={{
                ...styles.inputBox,
              ...(focusedInput === index ? styles.focusedInputBox : {}), // 根据状态动态应用样式
             }}
            type="number"
             onFocus={() => setFocusedInput(index)} // 设置当前聚焦的输入框索引
      onBlur={() => setFocusedInput(null)} // 清除聚焦状态
          />
        ))}
      </Grid>
 {/* 倒计时和其他方式 */}
      <p style={styles.resendText}>
          <span style={{ color: "#888" }}
          onClick={() => {
      if (countdown === 0) {
        setCountdown(60); // 重置倒计时为60秒
        Toast.show({ content: "验证码已重新发送", duration: 2000 }); // 提示消息（可选）
      }
    }}
          >重新获取
            { countdown  >0 &&
              <span>({countdown})</span>
            }
           
          </span>
        </p>
       


      </div>
      {/* 其他验证方式 */}
      {/* <p style={styles.footer}>
        无法接收短信？
        <a href="#" style={styles.link}>
          尝试其他验证方式
        </a>
      </p> */}

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

export default SmsVerification;

// 样式对象
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    paddingTop: "3rem",
    boxSizing:'border-box'

  },
  wrap:{
    paddingLeft: '35px',
    paddingRight:'35px'
  },
  title: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
    marginBottom: "20px",
  },
  inputBox: {
    height: "50px",
    width: "40px",
    textAlign: "center",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "18px",
     caretColor: "transparent", // 隐藏光标
    textAlignLast: "center",
    outline: "none", // 移除默认聚焦样式
    transition: "border-color 0.3s", // 平滑过渡
  },
  focusedInputBox: {
    borderColor: "#1677ff", // 聚焦时边框变蓝
    boxShadow: "0 0 3px rgba(22, 119, 255, 0.5)", // 可选，添加聚焦时的阴影效果
  },
  resendText: {
    textAlign: "left",
    marginTop: "10px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  button: {
    marginTop: "20px",
    borderRadius: "8px",
    fontSize: "16px",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#1677ff",
    textDecoration: "none",
  },
  phone: {
    color:'#333'
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
   errorToast: {
    display: "flex",
    // alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#fff", // 白色背景
    borderRadius: "8px",
     textAlign: "left",
     top:'5%'
    //  boxShadow: "none",
  },
  errorIcon: {
    marginRight: "10px",
    width: "20px",
    height: "20px",
    backgroundColor: "#f44336", // 红色背景
    borderRadius: "50%", // 圆形
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff", // 白色图标
    fontSize: "14px", // 图标大小
  },
  errorText: {
    fontSize: "14px",
    color: "#333", // 黑色文字
  },
};