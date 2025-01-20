import React from 'react';
import {Button, Input, Tooltip} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import Handle from "./handle.js";
import IconEditAvatar from "@/assets/images/icons/duotone/pencil.svg";
import Close from "@/assets/images/icons/duotone/xmark.svg";
import avatarDefault from "@/assets/images/user/default-avatar-point.png";
import styles from "./styles.module.scss"

export default function Information(props) {
  const {
    dataInformation,
    errorInformation,
    isLoadingBtnInformation,
    handleChangeInput,
    handleConfirmUpdateInformation,
    handleFocus,
    imageUrl,
    handleChangeAvatar,
    handleChangeInputAvatar,
  } = Handle(props);
  
  return (
    <div>
      <div className={'input-wrap'}>
        <div className={`input-wrap mb-6`}>
          <div className={`flex justify-center`}>
            <input
              id={'imageUpload'}
              type="file"
              accept="image/*"
              className={`hidden`}
              onChange={(file) => handleChangeAvatar(file)}
            />        
            <div className='relative'>
              <img
                src={imageUrl ? imageUrl : avatarDefault}
                crossOrigin="anonymous"
                alt=""
                className={`${styles.avatar_profile}`}
              />
              <Tooltip title="Xóa ảnh đại diện">
                <div
                  className={`${styles.icon_profile} md:top-[110px] s:top-[86px]`}
                  onClick={handleChangeInputAvatar}
                >
                  <InlineSVG src={Close} alt="" className={`w-3.5 h-3.5`}/>
                </div>
              </Tooltip>
              <Tooltip title="Chỉnh sửa ảnh đại diện">
                <label
                  className={`${styles.icon_profile} top-[-12px]`}
                  htmlFor="imageUpload"
                >
                  <InlineSVG src={IconEditAvatar} alt="" className={`w-3.5 h-3.5`}/>
                </label>
              </Tooltip>
            </div>
          </div>
          {
            errorInformation && errorInformation.avatar &&
            <span className={`error !mt-[22px]`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInformation.avatar}
            </span>
          }
        </div>
        <div className='label-wrap'>
          <label htmlFor="name" className={'required'}>
            Họ và tên
          </label>
        </div>
        <Input
          id={'name'}
          className={`main-input ${errorInformation && errorInformation.name.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập họ và tên'}
          value={dataInformation.name}
          onChange={(e) => handleChangeInput(e, 'name')}
          onFocus={() => handleFocus('name')}
        />
        {
          errorInformation && errorInformation.name.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInformation.name}
            </span> : ''
        }
      </div>
      
      <div className={'input-wrap'}>
        <div className='label-wrap'>
          <label htmlFor="email" className={'required'}>
            Email
          </label>
        </div>
        <Input
          id={'email'}
          className={`main-input ${errorInformation && errorInformation.email.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập email'}
          value={dataInformation.email}
          onChange={(e) => handleChangeInput(e, 'email')}
          onFocus={() => handleFocus('email')}
        />
        {
          errorInformation && errorInformation.email.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInformation.email}
            </span> : ''
        }
      </div>
      
      <div className={'input-wrap'}>
        <div className='label-wrap'>
          <label htmlFor="phone" className='md:text-sm s:text-xs'>
            Số điện thoại
          </label>
        </div>
        <Input
          id={'phone'}
          className={`main-input ${errorInformation && errorInformation.phone.length > 0 ? 'error-input' : ''}`}
          placeholder={'Nhập số điện thoại'}
          value={dataInformation.phone}
          onChange={(e) => handleChangeInput(e, 'phone')}
          onFocus={() => handleFocus('phone')}
        />
        {
          errorInformation && errorInformation.phone.length > 0 ?
            <span className={'error'}>
              <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInformation.phone}
            </span> : ''
        }
      </div>
      <div className={'flex justify-end'}>
        <Button
          loading={isLoadingBtnInformation}
          type="primary"
          size={'large'}
          className={'main-btn-primary !w-auto'}
          block
          onClick={() => handleConfirmUpdateInformation()}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}
