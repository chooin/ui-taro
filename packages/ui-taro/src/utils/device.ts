let isBrowser = false
let isNode = false
let isMiniProgram = false

if (typeof window !== 'undefined') {
  isBrowser = true;
} else if (typeof global === 'object' && global.process) {
  isNode = true;
} else {
  isMiniProgram = true;
}

export default {
  isBrowser,
  isNode,
  isMiniProgram,
}
