import React from 'react';
import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import Handle from "./handle.js";

export default function ChangePassword(props) {
  const {
    dataChangePassword,
    errorChangePassword,
    isLoadingBtnChangePassword,
    handleChangeInput,
    handleConfirmChangePassword,
    handleFocus
  } = Handle(props);
  
  return (
    <div>
      <div className={'input-wrap'}>
        <div className='label-wrap'>
          <label htmlFor={'password'} className={'required'}>
            Mật khẩu hiện tại
          </label>
        </div>
        <Input.Password
          id={'password'}
          className={'main-input'}
          placeholder={'Nhập mật khẩu hiện tại'}
          value={dataChangePassword.password}
          onChange={(e) => handleChangeInput(e, 'password')}
          onFocus={() => handleFocus('password')}
        />
        {
          errorChangePassword && errorChangePassword.password.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorChangePassword.password}
            </span> : ''
        }
      </div>
      
      <div className={'input-wrap mt-5'}>
        <div className='label-wrap'>
          <label htmlFor={'newPassword'} className={'required'}>
            Mật khẩu mới
          </label>
        </div>
        <Input.Password
          id={'newPassword'}
          className={'main-input'}
          placeholder={'Nhập mật khẩu mới'}
          value={dataChangePassword.newPassword}
          onChange={(e) => handleChangeInput(e, 'newPassword')}
          onFocus={() => handleFocus('newPassword')}
        />
        {
          errorChangePassword && errorChangePassword.newPassword.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorChangePassword.newPassword}
            </span> : ''
        }
      </div>
      
      <div className={'input-wrap mt-5'}>
        <div className='label-wrap'>
          <label htmlFor={'confirmPassword'} className={'required'}>
            Xác nhận mật khẩu
          </label>
        </div>
        <Input.Password
          id={'confirmPassword'}
          className={'main-input'}
          placeholder={'Xác nhận mật khẩu'}
          value={dataChangePassword.confirmPassword}
          onChange={(e) => handleChangeInput(e, 'confirmPassword')}
          onFocus={() => handleFocus('confirmPassword')}
        />
        {
          errorChangePassword && errorChangePassword.confirmPassword.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorChangePassword.confirmPassword}
            </span> : ''
        }
      </div>
      
      <div className={'flex justify-end'}>
        <Button
          loading={isLoadingBtnChangePassword}
          type="primary"
          size={'large'}
          className={'main-btn-primary !w-auto'}
          block
          onClick={() => handleConfirmChangePassword()}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}
