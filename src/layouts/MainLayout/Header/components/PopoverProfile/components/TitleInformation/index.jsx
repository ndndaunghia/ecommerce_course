import {Col, Row} from "antd";
import emailIcon from '@/assets/images/icons/duotone/emailSvgIcon.svg'
import phoneIcon from '@/assets/images/icons/duotone/phone-svg.svg'
import InlineSVG from "react-inlinesvg";
import React from "react";
import handle from './handle.js';
import './styles.scss'
import ImageUser from '@/assets/images/logos/user_default.png';

const TitleInformation = (props) => {
  const {
    authUser,
  } = handle(props);
  
  return (
    <>
      <Row>
        <Col>
          <img
            className={'md:w-[100px] md:h-[100px] s:w-[80px] s:h-[80px] rounded-[0.8em] object-cover'}
            src={authUser.avatar ? authUser.avatar : ImageUser} alt=""
          />
        </Col>
        <Col className={'md:pl-[15px] s:pl-2.5 pt-2 leading-2'}>
          <div className={'text-l'}>
            {authUser.name}
          </div>
          <div className={'flex md:text-[13px] s:text-xs font-medium text-[#99A1B7]'}>
            <label
              className={`flex justify-center items-center !fill-[#99A1B7]`}
              htmlFor="imageUpload"
            >
              <InlineSVG src={emailIcon} alt="" className={`md:w-3.5 md:h-3.5 s:w-3 s:h-3`}/>
            </label>
            <a href={`mailto:${authUser.email}`} className={'ml-1'}>
              {authUser.email}
            </a>
          </div>
          <div className={'flex md:text-[13px] s:text-xs font-medium text-[#99A1B7]'}>
            <label
              className={`flex justify-center items-center !fill-[#99A1B7]`}
              htmlFor="imageUpload"
            >
              <InlineSVG src={phoneIcon} alt="" className={`md:w-3.5 md:h-3.5 s:w-3 s:h-3`}/>
            </label>
            {
              authUser.phone ?
                <a href={`tel:${authUser?.phone}`} className={'ml-1'}>
                  {authUser.phone}
                </a> :
                <span className="italic ml-1">Đang cập nhật</span>
            }
          </div>
        </Col>
      </Row>
    </>
  )
}

export default TitleInformation;
