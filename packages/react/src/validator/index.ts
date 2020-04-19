import OriginalValidator from './validator'

// 初始化默认规则
import './rules'
import TYPE from './type'

type OriginalValidatorType = typeof OriginalValidator
type ValidatorType = typeof TYPE

interface ValidatorOptions extends OriginalValidatorType {
  TYPE: ValidatorType
}

const Validator: ValidatorOptions = { ...OriginalValidator, TYPE }

export default Validator
