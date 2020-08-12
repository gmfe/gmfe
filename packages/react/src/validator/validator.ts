import TYPE from './type'

type ValidatorType = typeof TYPE[keyof typeof TYPE]

interface ValidatorRuleOptions {
  help?: string
  required?: boolean
  validate?(value: any, rule?: ValidatorRuleOptions): boolean
}

type RuleMapOptions = {
  [key in ValidatorType]?: {
    type: ValidatorType
    rules: ValidatorRuleOptions[]
  }
}

const ruleMap: RuleMapOptions = {}

const hasValue = (value: any) => !(value === '' || value === null || value === undefined)

const Validator = {
  register(type: ValidatorType, rules: ValidatorRuleOptions[]): void {
    if (ruleMap[type]) {
      console.warn(`You have already registered the type ${type},it will be overwritten!`)
    }
    if (rules.filter((rule) => !rule.help).length !== 0) {
      console.warn('Missing help in rules')
      return
    }
    ruleMap[type] = {
      type,
      rules,
    }
  },
  validate(type: ValidatorType, value: any): string {
    if (!ruleMap[type]) {
      console.warn(`Can't find the validator of ${type}`)
      return ''
    }
    const rules = ruleMap[type]!.rules
    let help: string | undefined = ''
    rules.find((rule) => {
      if (rule.required && !hasValue(value)) {
        help = rule.help
        return true
      }
      if (!hasValue(value)) {
        return true
      }
      if (rule.validate) {
        const rt = rule.validate(value, rule)
        if (!rt) {
          help = rule.help
          return true
        }
      }
      return false
    })
    return help
  },
  create(
    types: ValidatorType | ValidatorType[],
    value: any,
    nextValidate?: (value: any) => string
  ) {
    types = Array.isArray(types) ? types : [types]
    return (before: (value: any) => string): string => {
      let help = ''
      if (before) {
        help = before(value)
        if (help) {
          return help
        }
      }

      ;(types as ValidatorType[]).find((type) => {
        const rt = Validator.validate(type, value)
        if (rt) {
          help = rt
          return true
        }
        return false
      })

      if (!help && nextValidate) {
        help = nextValidate(value)
      }
      return help
    }
  },
}

export default Validator
export type { ValidatorType, ValidatorRuleOptions }
