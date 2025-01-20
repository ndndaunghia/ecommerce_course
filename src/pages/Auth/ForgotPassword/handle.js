import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {setErrorForgotPassword} from "@/states/modules/auth/index.js";
import {VALIDATE_EMAIL_REGEX} from "@/utils/helper.js";
import {forgotPassword} from "@/api/auth/index.js";
import {useDispatch, useSelector} from "react-redux";
import Joi from "joi";
import {validate} from "@/utils/validates/index.js";

const forgotPasswordValidateSchema = Joi.object({
  email: Joi.string()
    .required()
    .max(255)
    .label("Email")
    .regex(VALIDATE_EMAIL_REGEX),
});

export default function Handle() {
  const navigate = useNavigate();
  const [dataForgotPassword, setDataForgotPassword] = useState({
    email: ''
  });
  const errorForgotPassword = useSelector(state => state.auth.errorForgotPassword);
  const isLoadingBtnForgotPassword = useSelector(state => state.auth.isLoadingBtnForgotPassword);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setErrorForgotPassword({email: ''}));
  }, [dispatch])
  
  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataForgotPassword);
    data[type] = value;
    setDataForgotPassword(data);
  }
  
  const handleFocus = (event) => {
    if (errorForgotPassword.email.length !== 0) {
      dispatch(setErrorForgotPassword({email: ''}));
    }
    
    if (event.key === 'Enter') {
      handleConfirmForgotPassword();
    }
  }
  
  const handleConfirmForgotPassword = () => {
    validate(forgotPasswordValidateSchema, dataForgotPassword, {
      onSuccess: (data) => {
        dispatch(forgotPassword(data));
      },
      onError: (err) => {
        dispatch(setErrorForgotPassword({...errorForgotPassword, ...err}));
      }
    })
  }
  
  return {
    navigate,
    dataForgotPassword,
    errorForgotPassword,
    isLoadingBtnForgotPassword,
    handleChangeInput,
    handleFocus,
    handleConfirmForgotPassword
  }
}
