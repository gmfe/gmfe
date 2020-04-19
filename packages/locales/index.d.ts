type language = 'zh' | 'zh-HK' | 'en' | 'th'

declare function getLocale(word: string): string

declare function setLocale(language: language): void

declare function setLocaleAndStorage(language: language): void

export { getLocale, setLocale, setLocaleAndStorage }
