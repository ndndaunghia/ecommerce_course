import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {setErrorResetPassword} from "@/states/modules/auth/index.js";
import {VALIDATE_PASSWORD_REGEX} from "@/utils/helper.js";
import {resetPassword} from "@/api/auth/index.js";
import Joi from 'joi';
import {validate} from "@/utils/validates/index.js";

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .regex(VALIDATE_PASSWORD_REGEX)
    .label("Mật khẩu")
    .messages({'string.pattern.base': '{{#label}} phải bao gồm có ít nhất 6 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt.'}),
  confirmPassword: Joi.string()
    .required()
    .label("Mật khẩu xác nhận")
    .custom((value, helpers) => {
      return helpers.prefs.context.data.password === value ?
        value :
        helpers.message("Mật khẩu xác nhận không trùng khớp.")
    })
});

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataResetPassword, setDataResetPassword] = useState({
    token: '',
    password: '',
    confirmPassword: ''
  });
  const errorResetPassword = useSelector(state => state.auth.errorResetPassword);
  const isLoadingBtnResetPassword = useSelector(state => state.auth.isLoadingBtnResetPassword);
  const location = useSelector(state => state.app.location);
  
  useEffect(() => {
    dispatch(setErrorResetPassword({
      password: '',
      confirmPassword: ''
    }))
  }, [dispatch])
  
  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataResetPassword);
    data[type] = value;
    setDataResetPassword(data);
  }
  
  const handleFocus = (event, type) => {
    dispatch(setErrorResetPassword({
      ...errorResetPassword,
      [type]: ''
    }));
  }
  
  const handleConfirmResetPassword = () => {
    validate(resetPasswordSchema, dataResetPassword, {
      onSuccess: (data) => {
        dispatch(resetPassword({...data, token: location.query.token}))
      },
      onError: (err) => {
        dispatch(setErrorResetPassword({...errorResetPassword, ...err}))
      }
    })
  }
  
  return {
    navigate,
    dataResetPassword,
    errorResetPassword,
    isLoadingBtnResetPassword,
    handleChangeInput,
    handleFocus,
    handleConfirmResetPassword
  }
}
