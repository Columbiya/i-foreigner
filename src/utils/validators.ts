import i18n from "./i18next"
import * as EmailValidator from 'email-validator'

export const min6Characters = (val: string) => val.length >= 6
export const onlyOneAt = (val: string) => val.trim().slice(val.indexOf("@") + 1).indexOf("@") === -1
export const domenNameOnlyOneDot = (val: string) => {
    const leftString = val.trim().slice(val.indexOf("@") + 1)
    return leftString.slice(leftString.indexOf(".") + 1).indexOf('.') === -1
}

export const atLeastOneAt = (val: string) => val.includes("@")

export const domainNameNoMore = (val: string) => {
    const domainName = val.trim().slice(val.indexOf("@") + 1)
    return domainName.length <= 254
}

export const maxLengthValidatorCreator = (max: number) => (val: string) => {
    return val.length <= max
}

export const minLengthValidatorCreator = (min: number) => (val: string) => {
    return val.length >= min
}

export const doesntIncludeSymbols = (val: string) => {
    const symbols = ["<", ">", "(", ")", "[", "]", ";", ":", "\\", "/", "\"", "*", " "]
    const value = val.trim()
    for (let symbol of symbols) {
        if (value.includes(symbol)) {
            return false
        }
    }

    return true
}

export const oneSpecialCharacter = (val: string) => {
    const symbols = ["<", ">", "(", ")", "[", "]", ";", ":", "\\", "/", "\"", "*", "!", "-", '_', '=', ",", '`', "'", '~', '@', '#', '№', '%', '&', '+']

    for (let symbol of symbols) {
        if (val.includes(symbol)) {
            return true
        }
    }

    return false
}

export const emailShouldHaveDomainName = (val: string) => {
    const domainName = val.trim().split('@')[1]
    return domainName.indexOf('.') !== -1
}

export const localDomainDoesntContainRussianSymbols = (val: string) => {
    const domainName = val.trim().split('@')[0]
    return !/[а-яА-Я]/.test(domainName)
}

export const atLeastOneLower = (val: string) => {
    return /[a-zа-я]/.test(val)
}

export const atLeastOneUpper = (val: string) => {
    return /[A-ZА-Я]/.test(val)
}

export const atLeastOneNumber = (val: string) => {
    return /[0-9]/.test(val)
}

export const maxLengthLocalDomain = (val :string) => {
    const localDomain = val.trim().slice(0, val.search("@"))

    return localDomain.length <= 64 && localDomain.length >= 1 
}

export const lastSymbolDomainNameIsNot = (val: string) => {
    const symbols = ["-", "_", "."]

    for (let symbol of symbols) {
        if (val[val.length - 1] === symbol) {
            return false
        }
    }

    return true
}

export const noSpaces = (val: string) => {
    return !val.trim().includes(" ")
}

export const domainNameMinimalLength2 = (val: string) => {
    const domain = val.slice(val.indexOf('@')).split('.')[1]
    return domain.length >= 2
}

export const emailValid = (val: string) => {
    return EmailValidator.validate(val.trim())
}

export const required = (val: string | boolean) => {
    return !!val
}

export const emailValidationString = i18n.t('email-validation-string')
export const wrongEmailFormat = i18n.t('Wrong email format')
