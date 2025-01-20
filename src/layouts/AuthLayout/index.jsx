import React, {useEffect} from 'react';
import './styles.scss'
import PropTypes from "prop-types";
import styles from './styles.module.scss';
import Logo from "@/assets/images/logos/zent.png";
import Upgrade from "@/assets/images/logos/upgrade.svg";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess} from "@/states/modules/app/index.js";
import InlineSVG from 'react-inlinesvg';
import noSupportIcon from "@/assets/images/icons/noSupport/no-support.svg";

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

AuthLayout.defaultProps = {
  title: '',
  description: ''
}

function AuthLayout(props) {
  const {children, title, description} = props;
  const goToPage = useSelector(state => state.app.goToPage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (goToPage.path && !goToPage.redirected) {
      dispatch(goToPageSuccess());
      navigate(goToPage.path);
    }
  }, [goToPage, navigate, dispatch]);
  
  return (
   <>
      <div className={styles.authLoginWrap}>
        <div className={styles.contentWrap}>
          <div className={styles.contentContainer}>
            <div className={styles.companyMobile}>
              <img src={Logo} alt=""/>
            </div>
            <div className={styles.formWrap}>
              <div className={styles.content}>
                <div className={styles.header}>{title}</div>
                <div className={styles.headerDetail}>{description}</div>
                <div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.viewWrap}>
          <div className={styles.logoWrap}>
            <div className={styles.company}>
              <img src={Logo} alt=""/>
            </div>
            <div className={styles.decorWrap}>
              <img src={Upgrade} alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.noSupport}`}>
        <InlineSVG className={`${styles.noSupIcon}`} src={noSupportIcon}/>
        <span className={`${styles.noSupText}`}>Không hỗ trợ!</span>
      </div>
   </>
  );
}

export default AuthLayout;
