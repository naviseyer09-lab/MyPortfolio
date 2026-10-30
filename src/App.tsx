import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react'

type IconName =
  | 'arrow'
  | 'call'
  | 'check'
  | 'code'
  | 'copy'
  | 'download'
  | 'external'
  | 'figma'
  | 'github'
  | 'globe'
  | 'home'
  | 'instagram'
  | 'layers'
  | 'linkedin'
  | 'mail'
  | 'menu'
  | 'moon'
  | 'nfc'
  | 'palette'
  | 'qr'
  | 'share'
  | 'spark'
  | 'sun'
  | 'tiktok'
  | 'tool'
  | 'user'
  | 'facebook'

const profile = {
  name: 'Ivan Lloyd N. Reyes',
  role: 'IT Student',
  initials: 'IR',
  email: 'ivanlloydreyes9@gmail.com',
  phone: '09918177027',
  smsPhone: '+639918177027',
  school: 'College of Research And Technology',
  academicYear: 'Academic year',
  bio: 'I’m an IT student passionate about turning ideas into useful digital experiences. I enjoy exploring web development, visual design, computer systems, and new technologies—always learning, experimenting, and finding creative ways to solve problems.',
  social: {
    facebook: 'https://www.facebook.com/ivan.lloyd.reyes.2025',
    github: 'https://github.com/naviseyer09-lab',
    linkedin: 'https://www.linkedin.com/in/ivan-lloyd-reyes-149721410/',
  },
}

async function prepareProfilePhoto(file: File): Promise<string> {
  const imageUrl = URL.createObjectURL(file)

  try {
    const image = new Image()
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error('Hindi mabasa ang napiling larawan.'))
      image.src = imageUrl
    })

    const maxDimension = 1200
    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.width * scale)
    canvas.height = Math.round(image.height * scale)
    const context = canvas.getContext('2d')

    if (!context) throw new Error('Hindi maihanda ang larawan sa browser na ito.')

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.85)
  } finally {
    URL.revokeObjectURL(imageUrl)
  }
}

const paths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  call: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></>,
  external: <><path d="M15 4h5v5M10 14 20 4M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" /></>,
  facebook: <><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" /></>,
  figma: <><path d="M9 3h3v6H9a3 3 0 0 1 0-6Zm3 0h3a3 3 0 1 1 0 6h-3V3Zm0 6h3a3 3 0 1 1-3 3V9Zm-3 6h3v3a3 3 0 1 1-3-3Zm0-6h3v6H9a3 3 0 1 1 0-6Z" /></>,
  github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.6a13.4 13.4 0 0 0-6 0C6.1-.4 4.9 0 4.9 0a5.4 5.4 0 0 0-.2 3A5.8 5.8 0 0 0 3.2 7.1c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 9 18v4M9 19c-3 .9-3-1.5-4.2-2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  home: <><path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  layers: <><path d="m12 3-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  linkedin: <><path d="M7 9v10M7 5v.01M11 19v-6a4 4 0 0 1 8 0v6M11 9v10" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  moon: <><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" /></>,
  nfc: <><path d="M5 8a6 6 0 0 1 0 8M9 5a10 10 0 0 1 0 14M13 2a14 14 0 0 1 0 20" /><circle cx="3" cy="12" r="1" /></>,
  palette: <><path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h5a4 4 0 0 0 4-4c0-3.3-4-6-9-6Z" /><path d="M7.5 9h.01M10 6.5h.01M15 6.5h.01M17.5 9h.01" /></>,
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM18 18h3v3h-3zM18 14h3M14 19v2" /></>,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
  spark: <><path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15ZM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6L19 13Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  tiktok: <><path d="M14 4v10a4 4 0 1 1-4-4M14 4c1 3 3 4 6 4" /></>,
  tool: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-8 8a2 2 0 1 0 2.8 2.8l8-8a4 4 0 0 0 5-5L17.7 9 15.4 6.6l2.3-2.3Z" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  )
}

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-title reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function Action({
  children,
  href,
  icon,
  variant = 'secondary',
  onClick,
  download,
}: {
  children: ReactNode
  href?: string
  icon?: IconName
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  download?: string
}) {
  const className = `button button-${variant}`
  return href ? (
    <a className={className} download={download} href={href} onClick={onClick}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </a>
  ) : (
    <button className={className} onClick={onClick} type="button">
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  )
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [copied, setCopied] = useState('')
  const [qrOpen, setQrOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem('profile-photo') || '')
  const [photoMessage, setPhotoMessage] = useState('')

  const pageUrl = useMemo(() => window.location.href.split('#')[0], [])
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=720x720&format=png&margin=20&data=${encodeURIComponent(pageUrl)}`

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!qrOpen) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setQrOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [qrOpen])

  const handleProfilePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoMessage('Pumili ng image file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setPhotoMessage('Masyadong malaki ang larawan. Pumili ng file na mas maliit sa 10 MB.')
      return
    }

    try {
      const photo = await prepareProfilePhoto(file)
      localStorage.setItem('profile-photo', photo)
      setProfilePhoto(photo)
      setPhotoMessage('Nai-save ang larawan sa browser na ito.')
    } catch (error) {
      setPhotoMessage(error instanceof Error ? error.message : 'Hindi ma-save ang larawan. Subukan ang mas maliit na file.')
    }
  }

  const removeProfilePhoto = () => {
    try {
      localStorage.removeItem('profile-photo')
      setProfilePhoto('')
      setPhotoMessage('Inalis ang larawan.')
    } catch {
      setPhotoMessage('Hindi maalis ang larawan. Subukan ulit.')
    }
  }

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    window.setTimeout(() => setCopied(''), 1800)
  }

  const downloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Reyes;Ivan Lloyd N.;;;',
      `FN:${profile.name}`,
      `TITLE:${profile.role}`,
      `TEL;TYPE=CELL:${profile.smsPhone}`,
      `EMAIL;TYPE=INTERNET:${profile.email}`,
      `URL:${pageUrl}`,
      'END:VCARD',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'Ivan-Lloyd-Reyes.vcf'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const shareProfile = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${profile.name} — ${profile.role}`, text: 'View my digital business card.', url: pageUrl })
    } else {
      await copy(pageUrl, 'profile')
    }
  }

  const navItems = ['Home', 'About', 'Skills', 'Education', 'Contact']
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Basic PHP / MySQL',
    'Figma',
    'Canva',
    'Responsive Design',
    'Prototyping',
    'Networking',
    'Hardware Troubleshooting',
    'Git / GitHub',
    'Arduino',
  ]
  const socials: { name: string; icon: IconName; href: string }[] = [
    { name: 'Facebook', icon: 'facebook', href: profile.social.facebook },
    { name: 'GitHub', icon: 'github', href: profile.social.github },
    { name: 'LinkedIn', icon: 'linkedin', href: profile.social.linkedin },
  ]

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a aria-label="Ivan Reyes, home" className="brand" href="#home">
          <span className="brand-mark"><Icon name="nfc" size={19} /></span>
          <span>ILNR</span>
        </a>
        <nav aria-label="Primary navigation" className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="icon-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="button"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button aria-label="Open menu" className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} type="button">
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-visual reveal is-visible">
            <div className="orbit orbit-one"><span><Icon name="code" /></span></div>
            <div className="orbit orbit-two"><span><Icon name="figma" /></span></div>
            <div className="orbit orbit-three"><span><Icon name="spark" /></span></div>
            <div className="avatar-shell">
              <div className="avatar-signal avatar-signal-one" />
              <div className="avatar-signal avatar-signal-two" />
              <div className="avatar">
                {profilePhoto ? (
                  <img alt={`${profile.name} profile`} src={profilePhoto} />
                ) : (
                  <>
                    <span>{profile.initials}</span>
                    <small>ADD PHOTO</small>
                  </>
                )}
              </div>
              <div className="avatar-photo-controls">
                <input
                  accept="image/*"
                  className="photo-input"
                  id="profile-photo-input"
                  onChange={handleProfilePhotoChange}
                  type="file"
                />
                <label className="photo-control" htmlFor="profile-photo-input">
                  {profilePhoto ? 'Change photo' : 'Choose photo'}
                </label>
                {profilePhoto && (
                  <button className="photo-control" onClick={removeProfilePhoto} type="button">
                    Remove
                  </button>
                )}
              </div>
              <div className="nfc-chip"><Icon name="nfc" size={17} /> TAP CONNECTED</div>
            </div>
            <p aria-live="polite" className="photo-note">
              {photoMessage || 'Saved only in this browser; it will not appear for other visitors.'}
            </p>
          </div>

          <div className="hero-copy reveal is-visible">
            <div className="availability"><span /> Open to opportunities</div>
            <p className="hero-kicker">Hello, I’m</p>
            <h1>{profile.name}</h1>
            <div className="role-row"><span>{profile.role}</span><span className="role-line" /></div>
            <p className="typing">Aspiring IT Professional <b>|</b> Creative Thinker <b>|</b> Technology Enthusiast</p>
            <p className="hero-summary">Building skills, exploring ideas, and creating thoughtful digital experiences one step at a time.</p>
            <div className="hero-actions">
              <Action icon="download" onClick={downloadVCard} variant="primary">Save contact</Action>
              <Action href="#contact" icon="mail">Contact me</Action>
              <Action href="#about" icon="user" variant="ghost">About me</Action>
            </div>
            <div className="quick-stats">
              <div><strong>13</strong><span>Skills & tools</span></div>
              <div><strong>IT</strong><span>Student journey</span></div>
              <div><strong>∞</strong><span>Curiosity</span></div>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><i /></a>
        </section>

        <section className="section" id="about">
          <SectionTitle eyebrow="01 / Profile" title="Curious by nature. Driven to create." />
          <div className="about-layout">
            <article className="glass-card about-copy reveal">
              <span className="card-index">ABOUT.TXT</span>
              <p>{profile.bio}</p>
              <div className="signature">Ivan <span>Reyes</span></div>
            </article>
            <div className="value-grid">
              {[
                { icon: 'palette' as IconName, label: 'Creativity', text: 'Finding fresh, human-centered ways to bring ideas to life.' },
                { icon: 'layers' as IconName, label: 'Problem solving', text: 'Breaking complex challenges into clear, practical steps.' },
                { icon: 'code' as IconName, label: 'Technology', text: 'Learning tools and systems that make meaningful things possible.' },
              ].map((value, index) => (
                <article className="glass-card value-card reveal" key={value.label} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                  <span className="feature-icon"><Icon name={value.icon} /></span>
                  <div><h3>{value.label}</h3><p>{value.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <SectionTitle eyebrow="02 / Capabilities" title="Tools I’m learning and creating with." copy="A growing toolkit across development, design, hardware, and digital problem solving." />
          <div className="skill-cloud reveal">
            {skills.map((skill, index) => (
              <span className="skill-pill" key={skill} style={{ '--delay': `${index * 45}ms` } as React.CSSProperties}>
                <i />{skill}
              </span>
            ))}
          </div>
          <div className="skill-note reveal"><Icon name="spark" /><span>Always learning</span> Currently exploring modern web development and creative technology.</div>
        </section>

        <section className="section education-section" id="education">
          <SectionTitle eyebrow="03 / Education" title="Learning in progress." />
          <div className="education-card glass-card reveal">
            <div className="timeline-mark"><span /><i /></div>
            <div className="education-content">
              <div className="education-top"><span className="status-badge"><i /> Currently studying</span><span>{profile.academicYear}</span></div>
              <p>Program</p>
              <h3>Information Technology</h3>
              <div className="school"><span className="feature-icon"><Icon name="home" /></span><div><small>School / University</small><strong>{profile.school}</strong></div></div>
            </div>
            <div className="education-code">IT<br /><span>EDU</span></div>
          </div>
        </section>

        <section className="section" id="contact">
          <SectionTitle eyebrow="04 / Connect" title="Let’s start a conversation." copy="Have an opportunity, an idea, or simply want to connect? My digital door is open." />
          <div className="contact-layout">
            <div className="contact-stack">
              {[
                { icon: 'mail' as IconName, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, key: 'email' },
                { icon: 'call' as IconName, label: 'Phone', value: profile.phone, href: `tel:${profile.smsPhone}`, key: 'phone' },
              ].map((item) => (
                <article className="contact-row glass-card reveal" key={item.label}>
                  <span className="feature-icon"><Icon name={item.icon} /></span>
                  <div><small>{item.label}</small><a href={item.href}>{item.value}</a></div>
                  <button aria-label={`Copy ${item.label}`} className={`copy-button ${copied === item.key ? 'copied' : ''}`} onClick={() => copy(item.value, item.key)} type="button">
                    <Icon name={copied === item.key ? 'check' : 'copy'} size={17} />
                    <span>{copied === item.key ? 'Copied!' : 'Copy'}</span>
                  </button>
                </article>
              ))}
              <div className="direct-actions reveal">
                <Action href={`mailto:${profile.email}`} icon="mail" variant="primary">Send email</Action>
                <Action href={`sms:${profile.smsPhone}`} icon="call">Message</Action>
              </div>
            </div>
          </div>

          <div className="social-section reveal">
            <span className="eyebrow">Find me online</span>
            <div className="social-grid">
              {socials.map((social) => (
                <a className="social-link" href={social.href} key={social.name} rel="noreferrer" target="_blank">
                  <Icon name={social.icon} /><span>{social.name}</span><Icon name="external" size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="share-section">
          <div className="share-card reveal">
            <div><span className="eyebrow">One tap away</span><h2>Take this profile with you.</h2><p>Save my contact details or scan the code to open this card on another device.</p></div>
            <div className="share-actions">
              <Action icon="download" onClick={downloadVCard} variant="primary">Save contact</Action>
              <Action icon="qr" onClick={() => setQrOpen(true)}>Show QR code</Action>
              <Action icon="share" onClick={shareProfile} variant="ghost">{copied === 'profile' ? 'Link copied!' : 'Share profile'}</Action>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><Icon name="nfc" size={18} /></span><div><strong>{profile.name}</strong><small>{profile.role}</small></div></div>
        <p>Designed for connection. Built with curiosity.</p>
        <a className="back-top" href="#home">Back to top <Icon name="arrow" size={17} /></a>
      </footer>

      <nav aria-label="Mobile quick navigation" className="mobile-dock">
        <a href="#home"><Icon name="home" /><span>Home</span></a>
        <a href="#about"><Icon name="user" /><span>About</span></a>
        <button aria-label="Show profile QR code" className="dock-primary" onClick={() => setQrOpen(true)} type="button"><Icon name="qr" /></button>
        <a href={`tel:${profile.smsPhone}`}><Icon name="call" /><span>Call</span></a>
        <a href="#contact"><Icon name="user" /><span>Contact</span></a>
      </nav>

      {qrOpen && (
        <div aria-label="Profile QR code" aria-modal="true" className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setQrOpen(false)} role="dialog">
          <div className="qr-modal">
            <button aria-label="Close QR code" className="modal-close" onClick={() => setQrOpen(false)} type="button">×</button>
            <span className="eyebrow">Scan to connect</span>
            <h2>My digital card</h2>
            <div className="qr-frame"><img alt={`QR code for ${profile.name}'s public profile`} src={qrUrl} /></div>
            <p>Point your phone camera at the code to open this profile.</p>
            <div className="modal-actions">
              <Action download="ivan-reyes-profile-qr.png" href={qrUrl} icon="download" variant="primary">Download QR</Action>
              <Action icon="share" onClick={shareProfile}>Share</Action>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
