import React, {useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Button, Popover} from 'antd';
import contentInfo from './components/PopoverProfile';
import ImageUser from '@/assets/images/logos/user_default.png';
import {useDispatch, useSelector} from 'react-redux';
import Breadcrumb from './components/Breadcrumb';
import {handleSetIsShowSideBarMobi} from '@/states/modules/app';
import IconLogo from '@/assets/images/logos/icon_zent.png';
import {useNavigate} from 'react-router-dom';
import ModalDefault from '@/components/Modal';
import LoginModal from './components/LoginModal';
import { setIsLoginModal } from '@/states/modules/home';

const Header = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpenLoginModal = useSelector((state) => state.home.isOpenLoginModal);


  const handleOpenModal = () => {
    dispatch(setIsLoginModal(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsLoginModal(false));
  };

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerLeftWrap}>
        <div className={styles.logoHeader}>
          <div className={`btn-menu`} onClick={() => dispatch(handleSetIsShowSideBarMobi(true))}>
            <i className={`icon-line`}>
              <span className={`line-top`}></span>
              <span className={`line-mid`}></span>
              <span className={`line-bottom`}></span>
            </i>
          </div>
          <div className={`${styles.imgWrap}`}>
            <img src={IconLogo} alt="" onClick={() => navigate('/')} />
          </div>
        </div>
        <Breadcrumb />
      </div>
      <div className={`${styles.headerRightWrap}`}>
        <Button type="text" onClick={handleOpenModal} size={'large'}>
          Đăng nhập
        </Button>
      </div>
      <ModalDefault isModalOpen={isOpenLoginModal} handleCancel={handleCloseModal} title="Đăng nhập">
        <LoginModal />
      </ModalDefault>
    </header>
  );
};

export default Header;
