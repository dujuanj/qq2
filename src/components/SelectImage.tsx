import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Image, Toast, NavBar,Button, Mask, SpinLoading } from "antd-mobile";

const SelectImage: React.FC = () => {
   const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>([]);
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  // 图片数据
  const images = [
    { id: 1, src: "p1.jpg", alt: "" },
    { id: 2, src: "p2.jpg", alt: "" },
    { id: 3, src: "p3.jpg", alt: "" },
    { id: 4, src: "lan1.jpg", alt: "蓝莓" },
    { id: 5, src: "lan2.jpg", alt: "蓝莓" },
    { id: 6, src: "p4.jpg", alt: "" },
  ];

  // 选择图片事件
  const handleSelect = (id: number) => {
    if (id === 4 || id === 5) {
      // 如果已经选中则移除，否则添加
      setSelected(prev => {
        if (prev.includes(id)) {
          return prev.filter(item => item !== id);
        } else {
          return [...prev, id];
        }
      });
    }
  };

   // 确定按钮事件
  const handleConfirm = () => {
    // 检查是否同时选中了 4 和 5
  
    if (selected.includes(4) && selected.includes(5)) {
      setVisible(true);
      
      setTimeout(() => {
        navigate("/code");
      }, 2000);
    } else {
      return;
    }
  };

  return (
    <div style={{  minHeight: "100vh",padding:'10px' }}>
      {/* 顶部导航 */}
      <NavBar back={null} className="selectImage"  style={{ background: "#1677ff", color: "#fff"}}>选择最符合描述的图片</NavBar>

      {/* 标题 */}
          <div style={{
              padding: "5px 20px 10px 20px",
              background: "#1677ff",
              color: "#fff",
              fontSize: "18px",
              textAlign:'left'
          }}>
        <strong style={{fontSize:'28px'}}>“蓝莓”</strong>
      </div>

      {/* 图片网格 */}
      <div style={{ position: "relative" }} id="grid-container">
        <Grid  columns={3} gap={2} style={{ margin: "6px 0" }}>
        {images.map((img) => (
          <Grid.Item key={img.id}>
            <div
              style={{
                position: "relative",
                border: selected.includes(img.id) ? "2px solid #1677ff" : "2px solid transparent",
                        overflow: "hidden",
                        height: "120px",
                background:selected.includes(img.id) ? "rgba(0,0,0,.3)" :'unset'
              }}
              onClick={() => handleSelect(img.id)}
            >
              <Image src={img.src} alt={img.alt} style={{ width: "100%", height: "100%" }} />
              {selected.includes(img.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "25px",
                    height: "25px",
                    background: "#1c45cc",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                            <span style={{ color: "#fff", fontSize: "14px" }}>
                                <img src="right.png" width={20} alt="" />
                  </span>
                </div>
              )}
            </div>
          </Grid.Item>
        ))}
        </Grid> 
         {/* Mask 挂载到 Grid 容器上 */}
        <Mask
          visible={visible}
          onMaskClick={() => setVisible(false)}
          getContainer={() => document.getElementById("grid-container")!}
           color='rgba(242, 239, 240, 0.8)'
          style={{position:'absolute'}}
        >
          <div style={{ color: "#63c83b", textAlign: "center" }}>
            <div style={{margin:'60px 0'}}>
              <img src="sucess.png" alt="" width={55} height={55} style={{background:'#fff',borderRadius:'50%'}} />
               <p style={{fontWeight:'bold'}}>验证成功 ！</p>
            </div>
            
          </div>
        </Mask>
      </div>
     
          
          <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 0px",
          borderTop: "1px solid #f0f0f0",
          background: "#fff",
        }}
      >
        {/* 我不会 */}
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <span style={{ fontSize: "20px", color: "#888", }}>
                      <img src="wheelchair.png" alt="" width={30} />
          </span>
          <span style={{ fontSize: "14px", color: "#888", marginRight: "10px" }}>我不会</span>
        </div>

        {/* 问号 */}
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <span style={{ fontSize: "20px", color: "#888", marginRight: "10px" }}>
                      <img src="question-circle.png" width={23} alt="" />
          </span>
        </div>

        {/* 换一组 */}
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} >
                  <span style={{ fontSize: "20px", color: "#888", marginRight: "5px" }}>
                      <img src="refresh.png" width={20} alt="" />
          </span>
          <span style={{ fontSize: "14px", color: "#888" }}>换一组</span>
        </div>

        {/* 确定按钮 */}
        <Button
          color="primary"
          size="small"
          style={{ borderRadius: "4px", marginLeft: 'auto' }}
           onClick={handleConfirm} // 绑定确定功能
        >
          确定
        </Button>
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

export default SelectImage;

const styles: { [key: string]: React.CSSProperties } = {
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
}