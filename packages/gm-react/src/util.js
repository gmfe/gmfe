import React, { useEffect } from 'react'

function warn() {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  console.warn.apply(this, ['[react-gm warn] ', ...arguments])
}

export { warn }
