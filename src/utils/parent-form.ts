function parentForm(target) {
  let p = target
  // prevents infinite loop
  for (let r = 0; r < 50; ++r) {
    p = p.parentNode
    if (!p || p.nodeName === "FORM") break
  }
  // find form and reset it
  if (p && p.reset) return p
}

export default parentForm
