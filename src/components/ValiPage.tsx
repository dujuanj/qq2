import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Toast,Space,Button } from 'antd-mobile'
import SelectImage from "./SelectImage";

const ValiPage: React.FC = () => {
    const navigate = useNavigate();
    
    const back = () =>
        navigate("/login"); // 跳转到验证页面    
        Toast.show({
            content: '',
            duration: 1000,
        })


    return (
        <div>
            <NavBar onBack={back}>安全验证</NavBar>
            <SelectImage />
        </div>
    )
    
} 

export default ValiPage;