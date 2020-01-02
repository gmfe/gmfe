import React, { useEffect, useState } from 'react'

const SelectContext = React.createContext({
  selected: [],
  doSelect: () => {}
})

const C = () => {
  console.log('render C')
  return (
    <SelectContext.Consumer>
      {data => {
        console.log('SelectContext.Consumer ', data)
        return (
          <div>
            <div>{data.selected}</div>
            <button
              onClick={() => {
                data.doSelect([2])
              }}
            >
              click
            </button>
          </div>
        )
      }}
    </SelectContext.Consumer>
  )
}

const B = () => {
  console.log('render B')

  return (
    <div>
      <C />
    </div>
  )
}

const A = () => {
  const [selected, setSelect] = useState([1])
  console.log('render A')

  useEffect(() => {
    setTimeout(() => {
      // setSelect()
    }, 2000)
  }, [])

  const handleSelect = nSelected => {
    console.log('handleSelected', nSelected)

    setSelect([...nSelected, ...selected])
  }

  return (
    <SelectContext.Provider
      value={{
        selected,
        doSelect: handleSelect
      }}
    >
      <B />
    </SelectContext.Provider>
  )
}

export const demo = () => {
  return (
    <div>
      <A />
    </div>
  )
}

export default {
  title: 'DEMO'
}
