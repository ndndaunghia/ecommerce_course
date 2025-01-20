import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {setErrorLogin} from "@/states/modules/auth/index.js";
import {VALIDATE_EMAIL_REGEX} from "@/utils/helper.js";
import {login} from "@/api/auth/index.js";
import Joi from "joi";
import {validate} from "@/utils/validates/index.js";

const loginValidateSchema = Joi.object({
  email: Joi.string()
    .required()
    .max(255)
    .label("Email")
    .regex(VALIDATE_EMAIL_REGEX),
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .label("Mật khẩu")
});

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datFormLogin, setDatFormLogin] = useState({
    email: '',
    password: ''
  })
  const errorLogin = useSelector(state => state.auth.errorLogin);
  const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);
  
  useEffect(() => {
    dispatch(setErrorLogin({
      email: '',
      password: ''
    }))
  }, [dispatch])
  
  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(datFormLogin);
    data[type] = value;
    setDatFormLogin(data);
  }
  
  const handleFocus = (event, type) => {
    dispatch(setErrorLogin({
      ...errorLogin,
      [type]: ''
    }));
  }
  
  const handleConfirmLogin = () => {
    validate(loginValidateSchema, datFormLogin, {
      onSuccess: (data) => {
        dispatch(login(data));
      },
      onError: (err) => {
        dispatch(setErrorLogin({...errorLogin, ...err}));
      }
    })
  }
  
  return {
    navigate,
    datFormLogin,
    errorLogin,
    isLoadingBtnLogin,
    handleChangeInput,
    handleFocus,
    handleConfirmLogin
  }
}
