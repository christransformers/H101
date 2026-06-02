/* Hacking101 — minimal behaviour */

(() => {
  const toggle = document.querySelector('.menu-toggle')
  const nav = document.querySelector('.nav')
  if (!toggle || !nav) return

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!open))
    nav.style.display = open ? '' : 'flex'
    nav.style.position = open ? '' : 'absolute'
    nav.style.top = open ? '' : '64px'
    nav.style.left = open ? '' : '0'
    nav.style.right = open ? '' : '0'
    nav.style.flexDirection = open ? '' : 'column'
    nav.style.background = open ? '' : '#0b1220'
    nav.style.padding = open ? '' : '16px'
    nav.style.borderBottom = open ? '' : '1px solid rgba(138,160,191,.12)'
  })

  document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if (nav && nav.style.display === 'flex') {
        nav.style.display = ''
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  })
})()
