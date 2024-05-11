function balancedBrackets(string, openArr = []) {
    let stack = openArr
    let arr = []
  
    if (typeof string === 'string') {
      arr = string.split('')
    } else {
      arr = string
    }
    
    if (stack.length === 0 && arr.length === 0) {
      return true
    } 
    const char = arr.shift()
    
    if (char === ')' || char === ']' || char === '}') {
      if (stack.length === 0) {
        return false
      } else {
        stack.push(char)
        stack = check(stack)
      }
    }
    
    if (char === '(' || char === '[' || char === '{') {
      if (arr.length === 0) {
        return false
      } else {
        stack.push(char)
        stack = check(stack)
      }
    }
    
    if (stack === false) {
      return false
    }
    
    if (stack.length > 0 && arr.length === 0) {
      return false
    } else if (balancedBrackets(arr, stack)) {
      return true
    } else {
      return false
    }
  }
  
  const check = (array) => {
    const size = array.length
    if (size > 1) {
      const prev = array[size-2]
      const last = array[size-1]
      if ((prev === '(' && last === ')') ||
          (prev === '[' && last === ']') ||
          (prev === '{' && last === '}')) {
        return popTwo(array)
      } else if (last === ')' || last === ']' || last === '}') {
        return false
      }
    }
    return array
  }
  
  const popTwo = (array) => {
    array.pop()
    array.pop()
    return array
  }