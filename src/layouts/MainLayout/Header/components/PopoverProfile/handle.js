import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {removeAuthToken, removeUserId} from "@/utils/localStorage.js";
import {startRequestGetMeFail} from "@/states/modules/auth/index.js";
import {getMe} from "@/api/auth/index.js";
import {
  setDataChangePassword,
  setErrorChangePassword,
  setErrorInformation
} from "@/states/modules/profile/index.js";

export default function Handle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowInformation, setIsShowInformation] = useState(true);
  const authUser = useSelector(state => state.auth.authUser);
  const errorInformation = useSelector(state => state.profile.errorInformation);
  const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
  
  const handleConfirmLogout = () => {
    removeAuthToken();
    removeUserId();
    dispatch(startRequestGetMeFail())
    // navigate('/login');
  }
  const handleResetError = (type) => {
    dispatch(setErrorInformation({
      ...errorInformation,
      [type]: ''
    }))
    dispatch(setErrorChangePassword({
      ...errorChangePassword,
      [type]: ''
    }))
  }
  
  const handleShowProfile = () => {
    dispatch(setErrorInformation({
      name: '',
      email: '',
      phone: '',
      avatar: '',
    }))
    dispatch(setErrorChangePassword({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }))
    dispatch(setDataChangePassword({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }));
    dispatch(getMe());
    setIsShowInformation(true)
  }
  
  const handleClearError = () => {
    dispatch(setErrorInformation({
      name: '',
      email: '',
      phone: '',
      avatar: '',
    }))
    dispatch(setErrorChangePassword({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }))
  }
  
  return {
    isShowInformation,
    setIsShowInformation,
    authUser,
    handleConfirmLogout,
    handleShowProfile,
    handleResetError,
    handleClearError
  }
}
