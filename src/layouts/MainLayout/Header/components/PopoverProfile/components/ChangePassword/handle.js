import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {VALIDATE_PASSWORD_REGEX} from "@/utils/helper.js";
import {
  setDataChangePassword,
  setErrorChangePassword
} from "@/states/modules/profile/index.js";
import {changePassword} from "@/api/profile/index.js";
import {validate} from "@/utils/validates/index.js";
import Joi from "joi";

const changePasswordValidateSchema = Joi.object({
  password: Joi.string()
    .required()
    .label("Mật khẩu hiện tại"),
  newPassword: Joi.string()
    .required()
    .min(8)
    .max(255)
    .regex(VALIDATE_PASSWORD_REGEX)
    .label("Mật khẩu mới")
    .custom((value, helpers) => {
      return helpers.prefs.context.data.password !== value ?
        value :
        helpers.message("Mật khẩu mới không được trùng khớp với mật khẩu hiện tại.")
    })
    .messages({'string.pattern.base': '{{#label}} phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.'}),
  confirmPassword: Joi.string()
    .required()
    .label("Mật khẩu xác nhận")
    .custom((value, helpers) => {
      return helpers.prefs.context.data.newPassword === value ?
        value :
        helpers.message("Mật khẩu xác nhận không trùng khớp.")
    })
});

export default function Handle(props) {
  const {handleResetError} = props;
  const dataChangePassword = useSelector(state => state.profile.dataChangePassword);
  const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
  const isLoadingBtnChangePassword = useSelector(state => state.profile.isLoadingBtnChangePassword);
  const dispatch = useDispatch();
  
  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let data = _.cloneDeep(dataChangePassword);
    data[type] = value;
    dispatch(setDataChangePassword(data));
  }
  
  const handleFocus = (type) => handleResetError(type)
  
  const handleConfirmChangePassword = () => {
    validate(changePasswordValidateSchema, dataChangePassword, {
      onSuccess: (data) => {
        dispatch(changePassword(data));
      },
      onError: (err) => {
        dispatch(setErrorChangePassword({...errorChangePassword, ...err}));
      }
    })
  }
  
  return {
    dataChangePassword,
    errorChangePassword,
    isLoadingBtnChangePassword,
    handleChangeInput,
    handleConfirmChangePassword,
    handleFocus
  }
}
