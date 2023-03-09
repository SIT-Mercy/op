export class I18n {
  constructor({ defaultLocale, defaultL10n }) {
    defaultLocale = defaultLocale.toLowerCase()
    this.defaultLocale = defaultLocale
    this.defaultL10n = defaultL10n
    this.locale2L10n = new Map()
    this.locale2L10n.set(defaultLocale, defaultL10n)
  }

  get currentLocale() {
    return this._currentLocale || this.defaultLocale
  }

  set currentLocale(locale) {
    this._currentLocale = locale
  }

  get currentL10n() {
    return this.locale2L10n.get(this.currentLocale)
  }

  add(locale, l10n) {
    this.locale2L10n.set(locale.toLowerCase(), l10n)
  }

  get(key) {
    let localized
    if (this.currentL10n instanceof Map) {
      localized = this.currentL10n.get(key)
    } else {
      localized = this.currentL10n[key]
    }
    if (localized) {
      return localized
    } else {
      return `?${key}"?`
    }
  }
}

export function createI18n({ defaultLocale, defaultL10n }) {
  const i18n = new I18n({
    defaultLocale,
    defaultL10n,
  })
  const i18nProxy = new Proxy(i18n, {
    get(target, property) {
      return target.get(property)
    }
  })
  return {
    i18n,
    i18nProxy,
  }
}