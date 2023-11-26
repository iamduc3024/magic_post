import clsx from "clsx";
import style from "./TransactionManager.module.scss";
import { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import Header from "../../components/Header";
import TransactionManagerFormCreateAccount from "./component/TransactionManagerFormCreateAccount";
import StatisticOrdersSent from "./component/StatisticOrdersSent";
import StatisticOrdersReceived from "./component/StatisticOrdersReceived";
import ManageTransactionNav from "./component/ManageTransactionNav";
import Footer from "../../components/Footer";

function TransactionManager() {
    const navigate = useNavigate();
    const { isLogin, setIsLogin, userInfo, setUserInfo} = useContext(LoginContext)
    let cnt = 0;
    useEffect(() => {
        if(!isLogin && cnt === 0) {
            cnt ++;
            alert("You have to login before access this page!");
            navigate("/login");
        }
    }, [1])

    const [isClickCreateAccount, setIsClickCreateAccount] = useState(true);
    const [isClickStatisticOrdersSent, setIsClickStatisticOrdersSent] = useState(false);
    const [isClickStatisticOrdersReceived, setIsClickStatisticOrdersReceived] = useState(false);

    const handleIsClickCreateAccount = () => {
        setIsClickCreateAccount(true);
        if (isClickStatisticOrdersSent === true) {
            setIsClickStatisticOrdersSent(false);
        }
        if (isClickStatisticOrdersReceived === true) {
            setIsClickStatisticOrdersReceived(false);
        }
    };

    const handleIsClickStatisticOrdersSent = () => {
        setIsClickStatisticOrdersSent(true);
        if (isClickCreateAccount === true) {
            setIsClickCreateAccount(false);
        }
        if (isClickStatisticOrdersReceived === true) {
            setIsClickStatisticOrdersReceived(false);
        }
    }

    const handleIsClickStatisticOrdersReceived = () => {
        setIsClickStatisticOrdersReceived(true);
        if (isClickCreateAccount === true) {
            setIsClickCreateAccount(false);
        }
        if (isClickStatisticOrdersSent === true) {
            setIsClickStatisticOrdersSent(false);
        }
    }

    return (
        <Fragment>
            <Header />
            <ManageTransactionNav 
                onClickCreateAccount={handleIsClickCreateAccount} 
                onClickStatisticOrdersSent={handleIsClickStatisticOrdersSent}
                onClickStatisticOrdersReceived={handleIsClickStatisticOrdersReceived}
            />
            <TransactionManagerFormCreateAccount 
                className={clsx({[style["transaction-manager-form-create-account"]] : isClickCreateAccount === true}, {[style["transaction-manager-form-create-account-hidden"]] : isClickCreateAccount === false})}
            />
            <StatisticOrdersSent 
                className={clsx({[style["statistic-orders-sent"]] : isClickStatisticOrdersSent === true}, {[style["statistic-orders-sent-hidden"]] : isClickStatisticOrdersSent === false})}
            />
            <StatisticOrdersReceived 
                className={clsx({[style["statistic-orders-received"]] : isClickStatisticOrdersReceived === true}, {[style["statistic-orders-sent-hidden"]] : isClickStatisticOrdersReceived === false})}   
            />
            <Footer />
        </Fragment>
    );
}

export default TransactionManager;
