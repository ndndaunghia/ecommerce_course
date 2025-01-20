import React from 'react';
import './styles.scss';
import AuthLayout from '@/layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import styles from './styles.module.scss';
import Handle from "./handle.js";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";

function ForgotPassword() {
  const {
    navigate, dataForgotPassword, errorForgotPassword, isLoadingBtnForgotPassword,
    handleChangeInput, handleFocus, handleConfirmForgotPassword
  } = Handle();
  
  return (
    <AuthLayout title={'Quên mật khẩu'} description={'Nhập vào email để thiết lập lại mật khẩu'}>
      <div className={'input-wrap'}>
        <Input
          className={`main-input ${errorForgotPassword && errorForgotPassword.email.length > 0 ? 'error-input' : ''}`}
          placeholder={'Email'}
          value={dataForgotPassword.email}
          onChange={(e) => handleChangeInput(e, 'email')}
          onFocus={(e) => handleFocus(e)}
        />
        {
          errorForgotPassword && errorForgotPassword.email.length > 0 &&
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorForgotPassword.email}
            </span>
        }
      </div>
      
      <Flex vertical gap="small" style={{width: '100%'}}>
        <Button
          loading={isLoadingBtnForgotPassword}
          type="primary"
          size={'large'}
          className={`main-btn-primary`}
          block
          onClick={() => handleConfirmForgotPassword()}
        >
          Gửi yêu cầu
        </Button>
      </Flex>
      
      <div className={styles.forgot}>
        <span className="!text-black-10 mr-1 md:!text-sm s:!text-xs">
          Trở lại trang
        </span>
        <span onClick={() => navigate('/login')} className='md:!text-sm s:!text-xs'>
          Đăng nhập
        </span>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
