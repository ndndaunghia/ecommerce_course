import React from "react";
import store from "@/states/configureStore";
import {notification} from "antd";
import moment from "moment";
import CloseIcon from '@/assets/images/icons/light/close.svg';
import success from '@/assets/images/icons/notification/success_16x16.svg';
import error from '@/assets/images/icons/notification/error_16x16.svg';
import warning from '@/assets/images/icons/notification/warning_16x16.svg';
import Swal from "sweetalert2";

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/;
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,50}$/;
export const VALIDATE_PHONE_REGEX_RULE = /^(0[235789])[0-9]{8}$/;
export const VALIDATE_NAME_REGEX_RULE = /^[\p{L} ]*$/u;
export const VALIDATE_IP_ADDRESS_REGEX = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const hasPermission = (permissions) => {
  let {auth} = store.getState();
  let isPermission = false;
  if (permissions) {
    permissions.forEach(permission => {
      if (auth.authUser && auth.authUser.permissions && auth.authUser.permissions.includes(permission)) {
        isPermission = true;
      }
    })
  }
  
  return isPermission;
}

export const getNotification = (type, content, duration = 3, align = 'top') => {
  let typeNotification = handleGetTypeNotification(type);
  notification[type]({
    message: '',
    description: (<div className={`notification-content ${typeNotification.className}`}>
      <div className={'icon-notification'}>
        <img src={typeNotification.icon} alt=""/>
      </div>
      <span className={'text-notification'}>{content}</span>
    </div>),
    closeIcon: (<img src={CloseIcon} alt=""/>),
    placement: align,
    duration: duration,
    style: {fontWeight: "normal"}
  });
};

const handleGetTypeNotification = (type) => {
  let typeNotification = {};
  switch (type) {
    case "error":
      typeNotification = {
        className: 'notification-error', icon: error,
      };
      break;
    case "warning":
      typeNotification = {
        className: 'notification-warning', icon: warning,
      };
      break;
    default:
      typeNotification = {
        className: 'notification-success', icon: success,
      };
  }
  return typeNotification;
}

export const handleCheckRoute = (routes, currentRoute, params = {}) => {
  let keys = Object.keys(params);
  let param = ''
  keys.map(key => {
    param += ('/' + params[key])
  });
  currentRoute = currentRoute.replaceAll(param, '');
  
  if (routes && routes.length > 0) {
    return routes.includes(currentRoute);
  }
};


export const convertQueryStringToObject = (queryString) => {
  if (queryString.charAt(0) === '?') {
    queryString = queryString.substring(1);
  }
  
  let pairs = queryString.split('&');
  let result = {};
  
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    let key = decodeURIComponent(pair[0]);
    let value = decodeURIComponent(pair[1] || '');
    
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

export const formatDate = (date) => {
  return moment(date * 1000).format('HH:mm DD/MM/YYYY');
}

export function classNames(...classes) {
  return classes.filter((value) => !!value).map((value) => `${value}`).join(' ')
}

export function handleNotification(type, message) {
  Swal.fire({
    position: "center",
    icon: type,
    title: `<span class="title-modal-notification">${message}</span>`,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      icon:'!mt-[50px]',
      popup: 'popup-modal-notification',
    },
  });
  
  const notification = document.querySelector(".swal2-container");
  notification.style.zIndex = 99999;
}
