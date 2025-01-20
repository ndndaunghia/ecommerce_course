import {useEffect, useState} from "react";
import _ from "lodash";
import { handleNotification, VALIDATE_NAME_REGEX_RULE, VALIDATE_PHONE_REGEX_RULE } from "@/utils/helper.js";
import {updateInformation} from "@/api/profile/index.js";
import {useDispatch, useSelector} from "react-redux";
import Joi from 'joi';
import {validate} from "@/utils/validates/index.js";
import {setErrorInformation} from "@/states/modules/profile/index.js";
import {TYPE_FILE} from "@/utils/constains.js";

const updateProfileValidateSchema = Joi.object({
  name: Joi.string()
    .regex(VALIDATE_NAME_REGEX_RULE)
    .trim()
    .max(255)
    .required()
    .label("Họ và tên"),
  email: Joi.string()
    .trim()
    .lowercase()
    .email({tlds: {allow: false}})
    .max(255)
    .required()
    .label("Email"),
  phone: Joi.string()
    .trim()
    .allow("", null)
    .pattern(VALIDATE_PHONE_REGEX_RULE)
    .label("Số điện thoại"),
  avatar: Joi.any()
})

export default function Handle(props) {
  
  const {handleResetError} = props;
  const [dataInformation, setDataInformation] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });
  const [imageUrl, setImageUrl] = useState(null);
  
  const errorInformation = useSelector(state => state.profile.errorInformation);
  const isLoadingBtnInformation = useSelector(state => state.profile.isLoadingBtnInformation);
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (authUser) {
      setDataInformation({
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone,
        avatar: authUser.avatar ? authUser.avatar : null
      })
    }
  }, [authUser])
  
  useEffect(() => {
    if (authUser) {
      setImageUrl(authUser.avatar)
    }
  }, [authUser])
  
  const handleChangeInput = (e, type) => {
    let value = e.target.value
    let data = _.cloneDeep(dataInformation);
    data[type] = value
    setDataInformation(data)
  }
  
  const handleFocus = (type) => handleResetError(type)
  
  const handleConfirmUpdateInformation = () => {
    validate(updateProfileValidateSchema, dataInformation, {
      onSuccess: (data) => {
        dispatch(updateInformation(data));
      },
      onError: (err) => {
        dispatch(setErrorInformation({...errorInformation, ...err}));
      }
    })
  }
  
  
  const handleChangeInputAvatar = () => {
    setDataInformation({...dataInformation, avatar: "delete"});
    setImageUrl("")
  }
  
  const handleChangeAvatar = (file) => {
    if (file.target.files[0]) {
      let dataError = ''
      let currentFile = file.target.files[0]
      let fileUrl = URL.createObjectURL(file.target.files[0])
      if (currentFile.size / 1024 / 1024 > 2.048) {
        dataError = 'Kích thước ảnh không vượt quá 2MB.'
      } else if (!TYPE_FILE.includes(currentFile.type)) {
        dataError = 'Ảnh đại diện chỉ được hỗ trợ kiểu jpg, jpeg, png, svg, webp.'
      }
      
      if (dataError) {
        handleNotification('error', dataError)
      } else {
        setDataInformation({...dataInformation, avatar: currentFile});
        setImageUrl(fileUrl)
      }
    }
  };
  
  return {
    dataInformation,
    errorInformation,
    isLoadingBtnInformation,
    imageUrl,
    handleChangeInput,
    handleConfirmUpdateInformation,
    handleFocus,
    handleChangeAvatar,
    handleChangeInputAvatar
  }
}
