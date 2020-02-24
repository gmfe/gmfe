import _ from 'lodash'

function getLeaf(list, result = []) {
  _.each(list, v => {
    if (v.children) {
      getLeaf(v.children, result)
    } else {
      result.push(v)
    }
  })
  return result
}

function getUnLeafValues(list, result = []) {
  _.each(list, v => {
    if (v.children) {
      result.push(v.value)
      getUnLeafValues(v.children, result)
    }
  })
  return result
}

export { getLeaf, getUnLeafValues }
