import { Fragment, useEffect } from "react";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import OrderList from "../../components/OrderList";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import style from "./ToTransaction.module.scss";

function ToCustomer() {
    const navigate = useNavigate();
    let nowTime = new Date();
    const storedOutTime = new Date(JSON.parse(localStorage.getItem('outTime')));
    const storedIsLogin = JSON.parse(localStorage.getItem('isLogin'));
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    let cnt = 0;
    useEffect(() => {
        if((!storedIsLogin 
            || nowTime - storedOutTime > 3600000 
            || storedUserInfo.uRole != "6") 
            && cnt === 0
            ) {
            cnt ++;
            alert("You have to login with Transaction Teller account before access this page!");
            navigate("/login");
            localStorage.setItem('isLogin', JSON.stringify(false));
            localStorage.setItem('userInfo', JSON.stringify({
                uId : "",
                uName : "",
                uPhone : "",
                uPassword : "",
                uRole: "",
                uUnit: ""
            }));
        }
    }, [1])
    return (
        <Fragment>
            <Header />
            <div className={clsx(style.content)}>
                <OrderList data = {{
                    status: true,
                    unit: storedUserInfo.uUnit,
                }}/>
            </div>
            <Footer />
        </Fragment>
    );
}

export default ToCustomer;
