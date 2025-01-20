import React from 'react';
import styles from "./styles.module.scss";
import {Drawer, Tabs} from "antd";
import Handle from "./handle.js";
import Information from "./components/Information";
import ChangePassword from "./components/ChangePassword";
import InlineSVG from "react-inlinesvg";
import Close from "@/assets/images/icons/duotone/times.svg";
import './styles.scss'
import TitleInformation
  from "@/layouts/MainLayout/Header/components/PopoverProfile/components/TitleInformation/index.jsx";
import ImageUser from '@/assets/images/logos/user_default.png';

function PopoverProfile() {
  const {
    isShowInformation,
    setIsShowInformation,
    authUser,
    handleConfirmLogout,
    handleShowProfile,
    handleResetError,
    handleClearError,
  } = Handle();
  
  const items = [
    {
      key: '1',
      label: <span className='md:text-sm s:text-[13px]'>Cập nhật thông tin</span>,
      children: <Information handleResetError={handleResetError}/>,
    },
    {
      key: '2',
      label: <span className='md:text-sm s:text-[13px]'>Thay đổi mật khẩu</span>,
      children: <ChangePassword handleResetError={handleResetError}/>,
    },
  ];
  
  return (
    <div className={styles.modalInfoWrap}>
      <div className={styles.personalInformationWrap}>
        <div className={'md:!w-10 md:!h-10 s:!w-9 s:!h-9 rounded-[10px] mr-1'}>
          <img
            crossOrigin="anonymous"
            src={authUser.avatar ? authUser.avatar : ImageUser}
            alt="Avatar"
            className={'w-full h-full rounded-[10px] object-cover'}
          />
        </div>
        <div className={'ml-1'}>
          <div className={styles.name}>
            {authUser.name}
          </div>
          <div className={styles.role}>
            {authUser.email || 'Chưa cập nhật'}
          </div>
        </div>
      </div>
      <div className={styles.mainModalInfoWrap}>
        <ul className={styles.menuInfoWrap}>
          <li
            className={`${styles.itemInfoWrap}`}
          >
            <div>
              <span className={styles.text}>Thông tin cá nhân</span>
            </div>
          </li>
          <li
            onClick={() => handleConfirmLogout()}
            className={styles.itemInfoWrap}
          >
            <div>
              <span className={styles.text}>Đăng xuất</span>
            </div>
          </li>
        </ul>
      </div>
      
      <Drawer
        title={<TitleInformation/>}
        placement={'right'}
        className={'drawerInformation'}
        closable={true}
        onClose={() => setIsShowInformation(false)}
        open={isShowInformation}
        key={'right'}
        width={520}
        closeIcon={<div className={'absolute top-[30px]'}><InlineSVG src={Close}/></div>}
      >
        <Tabs onChange={() => handleClearError()} defaultActiveKey="1" items={items}/>
      </Drawer>
    </div>
  );
}

export default PopoverProfile;
