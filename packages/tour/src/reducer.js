export const initialState = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
  w: 0,
  h: 0
}

export function reducer(state, action) {
  switch (action.type) {
    case 'HAS_DOM_NODE':
      delete action.type
      return { ...state, ...action }
    case 'NO_DOM_NODE':
      return {
        ...state,
        top: state.h + 10,
        right: state.w / 2 + 9,
        bottom: state.h / 2 + 9,
        left: action.w / 2 - state.helperWidth ? state.helperWidth / 2 : 0,
        width: 0,
        height: 0,
        w: action.w,
        h: action.h,
        helperPosition: 'center'
      }
    default:
      return state
  }
}
