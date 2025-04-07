import React from "react";
import { Grid, Dialog, Toast } from 'antd-mobile'
import './Health.css'
import { useNavigate } from 'react-router-dom';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Health: React.FC = () => {
    const navigate = useNavigate();
    
    return <div className="health-page">
        <div className="health-container">
            {/* 头部 */}
        <div className="health-header">
          <div className="health-header-left">
                    <img src="bj.png" alt="健康" className="bj" />
                    <div className="user">
                        <img src="cat.webp" alt="" />
                    </div>
                    <div className="user-text">
                        <h3>缕荷邢</h3>
                        <p>当前已登陆qq帐号</p>
                    </div>
                    <div className="change_wx">
                        <p
                         onClick={() =>
             Dialog.confirm({
                content: <b style={{ textAlign: 'center',width: '100%' ,display: 'block'}}>即将打开"腾讯会议"小程序</b>,
                confirmText: <span style={{ fontSize: '14px',color: '#666878' }}>允许</span>,
                cancelText: <span style={{ fontSize: '14px',color: '#000' }}>取消</span>,
                onConfirm: async () => {
                //   Toast.show({
                //     icon: 'success',
                //     position: 'bottom',
                //   })
                  navigate('/beforeLogin');
                },
              })
            }
                        >切换至微信查询 &gt;</p>
                    </div>
          </div>
            </div>
            {/* 内容 */}
            <div className="health-content">
                 <Grid columns={2} gap={16}>
                    <Grid.Item>
                        <div className="health-item">
                            <img src="i1.jpg" alt="健康" />
                            <div className="health-item-text">
                                <p>实名认证查询</p>
                            </div>
                        </div>
                           
                        </Grid.Item>
                        <Grid.Item>
                            <div className="health-item">
                                <img src="i2.jpg" alt="健康" />
                                <div className="health-item-text">
                                    <p>健康系统强制下线记录</p>
                                </div>
                            </div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="health-item">
                                <img src="i3.jpg" alt="健康" />
                                <div className="health-item-text">
                                    <p>近期登陆的游戏帐号</p>
                                </div>
                            </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className="health-item">
                            <img src="i4.jpg" alt="健康" />
                            <div className="health-item-text">
                                <p>健康系统强制下线记录</p>
                            </div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className="health-item">
                            <img src="i5.jpg" alt="健康" />
                            <div className="health-item-text">
                                <p>健康系统强制下线记录</p>
                            </div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className="health-item">
                            <img src="i6.jpg" alt="健康" />
                            <div className="health-item-text">
                                <p>健康系统强制下线记录</p>
                            </div>
                        </div>
                    </Grid.Item>
                 </Grid>
            </div>
            {/* 底部 */}
            <div className="health-footer">
                <p>
                    <img src="info.jpg" alt="健康" />
                </p>
            </div>
      </div>
  </div>;
};

export default Health;