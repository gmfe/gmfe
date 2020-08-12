const eventBus = {
  add(eventName: string, handler: (event: Event) => any): void {
    window.addEventListener(eventName, handler)
  },
  dispatch(eventName: string, detail?: any): void {
    window.dispatchEvent(new window.CustomEvent(eventName, { detail }))
  },
  remove(eventName: string, handler: (event: Event) => any): void {
    window.removeEventListener(eventName, handler)
  },
}

export default eventBus
