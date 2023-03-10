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
    this._currentLocale = locale.toLowerCase()
  }

  get currentL10n() {
    return this.locale2L10n.get(this.currentLocale)
  }

  add(locale, l10n) {
    this.locale2L10n.set(locale.toLowerCase(), l10n)
  }

  get(key) {
    const parts = key.split(".")
    let localized = this.currentL10n
    for (let part of parts) {
      if (typeof localized === "string" || localized === undefined) {
        break
      }
      localized = this.getFrom(localized, part)
    }
    if (localized) {
      return localized
    } else {
      return `?${key}?`
    }
  }
  getFrom(container, key) {
    if (container instanceof Map) {
      return container.get(key)
    } else {
      return container[key]
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