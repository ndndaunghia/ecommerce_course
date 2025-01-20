import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import ImageUser from '@/assets/images/logos/user_default.png';
import {useDispatch, useSelector} from "react-redux";
import Breadcrumb from './components/Breadcrumb';
import { handleSetIsShowSideBarMobi } from '@/states/modules/app';
import IconLogo from '@/assets/images/logos/icon_zent.png';
import { useNavigate } from 'react-router-dom';
import ModalDefault from '@/components/Modal';

const Header = () => {
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerLeftWrap}>
        <div className={styles.logoHeader}>
          <div className={`btn-menu`}onClick={() => dispatch(handleSetIsShowSideBarMobi(true))}>
            <i className={`icon-line`}>
              <span className={`line-top`}></span>
              <span className={`line-mid`}></span>
              <span className={`line-bottom`}></span>
            </i>
          </div>
          <div className={`${styles.imgWrap}`}>
            <img src={IconLogo} alt="" onClick={() => navigate('/')}/>
          </div>
        </div>
        <Breadcrumb/>
      </div>
      <div className={`${styles.headerRightWrap}`}>
        <button className={`btn btn-icon btn-icon-only btn-icon-primary`}>Dang nhap</button>
        <div className={`${styles.itemHeaderRight}`}>
          <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo} trigger="click">
            <div className={styles.infoWrap}>
              <div className={styles.avatarWrap}>
                <img crossOrigin="anonymous" src={authUser.avatar ? authUser.avatar : ImageUser} alt=""/>
              </div>
            </div>
          </Popover>
        </div>
      </div>
      <ModalDefault isModalOpen >
        dfdfdfdfdfdfd </ModalDefault>
    </header>
  );
}

export default Header
