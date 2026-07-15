import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ArrowDown, ArrowRight, Check, Menu, MoveUpRight, Plus, X } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const projects = [
  {
    id: 'health',
    no: '01',
    ladder: '10a',
    eyebrow: '健康自主',
    short: '健康',
    title: '把日常方法，\n变成自己的节奏。',
    description: '从看懂健康信息、建立日常方法，到在专业边界内完成自我管理与持续行动。',
    outcome: '形成一套自己看得懂、愿意用、能坚持的日常方法。',
    words: ['看懂', '行动', '坚持'],
    image: '/media/kangzheng/05-health-autonomy.jpg',
  },
  {
    id: 'digital',
    no: '02',
    ladder: '10b',
    eyebrow: '数字自主',
    short: '数字',
    title: '重新连接\n重要的人。',
    description: '从看懂界面、识别风险，到独立完成一次视频联系、线上挂号或移动支付。',
    outcome: '一次不依赖代操作、由本人完成的数字任务。',
    words: ['看懂', '尝试', '完成'],
    image: '/media/kangzheng/02-digital-autonomy.jpg',
  },
  {
    id: 'value',
    no: '03',
    ladder: '10c',
    eyebrow: '价值创造',
    short: '价值',
    title: '经验还在，\n价值继续发生。',
    description: '通过兴趣、社交、志愿服务和经验分享，让能力被看见，也让人与人的连接继续生长。',
    outcome: '完成一次面向家人、社区或同伴的经验分享。',
    words: ['整理', '分享', '影响'],
    image: '/media/kangzheng/07-value-creation.jpg',
  },
  {
    id: 'home',
    no: '04',
    ladder: '10d',
    eyebrow: '居家独立',
    short: '居家',
    title: '把日常小事，\n重新握在手里。',
    description: '围绕做饭、整理、安全判断和家庭协作，把方法转化为可持续的居家行动。',
    outcome: '在熟悉的家里，独立完成一件真实而有意义的日常任务。',
    words: ['判断', '完成', '持续'],
    image: '/media/kangzheng/04-home-independence.jpg',
  },
]

const lifeMoments = [
  ['自在出行', '从路线判断到亲自抵达', '/media/kangzheng/03-independent-mobility.jpg', 'wide'],
  ['社交连接', '让关系在真实活动中生长', '/media/kangzheng/06-social-connection.jpg', ''],
  ['教练陪伴', '提示方法，但不替代完成', '/media/kangzheng/08-coach-companionship.jpg', ''],
  ['家庭信任', '让过程和成果都能被看见', '/media/kangzheng/09-family-trust.jpg', 'wide'],
  ['机构共建', '把专业能力接入清晰项目', '/media/kangzheng/10-institution-partnership.jpg', ''],
  ['城市引入', '从公共价值出发验证试点', '/media/kangzheng/11-city-collaboration.jpg', ''],
]

const audiences = [
  ['长辈与家人', '找到适合自己的生活项目，看清服务过程、边界与隐私保护。', '寻找生活项目'],
  ['机构合作方', '把专业服务接入标准项目，共同形成可交付、可复盘的成果。', '发起机构合作'],
  ['城市与政府', '从真实民生需求出发，讨论银龄生活项目的城市共建与试点。', '讨论城市共建'],
  ['教练人才', '在清晰规范与培养路径中，成为陪伴真实成果发生的人。', '了解教练发展'],
  ['战略与资方', '了解治理逻辑、平台能力、社会价值与长期建设方向。', '建立战略联系'],
]

function BrandMark({ light = false }) {
  return (
    <span className={`brand-mark ${light ? 'is-light' : ''}`} aria-hidden="true">
      <i />
      <i />
    </span>
  )
}

function PillButton({ children, dark = false, onClick, href, className = '' }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp className={`pill-button ${dark ? 'is-dark' : ''} ${className}`} onClick={onClick} href={href} type={href ? undefined : 'button'}>
      <span>{children}</span>
      <i><ArrowRight size={14} strokeWidth={1.8} /></i>
    </Comp>
  )
}

function Navbar({ menuOpen, setMenuOpen, openContact }) {
  return (
    <motion.header
      className="floating-nav"
      initial={{ x: '-50%', y: -18, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      <a className="nav-brand" href="#top" aria-label="康正首页">
        <BrandMark />
        <strong>康正</strong>
        <span className="nav-brand-label">银龄生活项目</span>
      </a>
      <button
        className={`menu-pill ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <i>{menuOpen ? <X size={14} strokeWidth={2.4} /> : <Plus size={14} strokeWidth={2.4} />}</i>
        <span>{menuOpen ? '关闭' : '菜单'}</span>
      </button>
      <div className="nav-tags" aria-label="品牌定位">
        <span>真实生活目标</span>
        <span>可验证成果</span>
      </div>
      <button className="contact-pill" type="button" onClick={() => openContact('请选择身份')}>
        <i><MoveUpRight size={14} /></i>
        <span>发起联系</span>
      </button>
    </motion.header>
  )
}

function MenuOverlay({ open, onClose, openContact }) {
  const links = [
    ['为什么可信', '#trust'],
    ['生活项目', '#projects'],
    ['合作生态', '#audiences'],
    ['关于康正', '#about'],
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          className="menu-overlay"
          initial={{ x: '-50%', opacity: 0, y: -12, scale: 0.985 }}
          animate={{ x: '-50%', opacity: 1, y: 0, scale: 1 }}
          exit={{ x: '-50%', opacity: 0, y: -8, scale: 0.985 }}
          transition={{ duration: 0.34, ease }}
        >
          <div className="menu-intro">
            <span>从这里认识康正</span>
            <p>不是课程商城，而是一套让真实生活成果持续发生的项目系统。</p>
          </div>
          <nav aria-label="网站导航">
            {links.map(([label, href], index) => (
              <a href={href} onClick={onClose} key={href}>
                <small>0{index + 1}</small><span>{label}</span><ArrowRight size={19} />
              </a>
            ))}
          </nav>
          <button className="menu-contact" type="button" onClick={() => { onClose(); openContact('请选择身份') }}>
            选择身份并发起联系 <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Hero({ openContact }) {
  return (
    <section className="hero" id="top">
      <motion.div
        className="hero-media"
        initial={{ opacity: 0, scale: 1.045 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <img src="/media/kangzheng/01-hero-autonomous-life.jpg" alt="一位银发长者自信地走在社区中" fetchPriority="high" />
      </motion.div>
      <div className="hero-wash" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 1, ease }}
      >
        <div className="hero-main">
          <p className="hero-kicker"><i /> 共建更有自主感的银龄生活</p>
          <h1>让想做的事，<br /><em>继续</em>做得到。</h1>
          <p className="hero-summary">从一个真实愿望开始，把数字生活、出行、健康、居家、社交与价值创造，变成自己亲手完成的生活成果。</p>
          <div className="hero-actions">
            <PillButton dark href="#projects">看看生活项目</PillButton>
            <PillButton onClick={() => openContact('请选择身份')}>按身份进入</PillButton>
          </div>
        </div>
        <div className="hero-aside">
          <span>不是替您完成更多</span>
          <strong>而是陪您亲手做到。</strong>
          <div className="hero-tags">
            <span>目标本人确认</span>
            <span>过程清楚可见</span>
            <span>专业服务有边界</span>
          </div>
        </div>
      </motion.div>
      <a className="scroll-cue" href="#about" aria-label="继续向下了解康正">
        <span>继续了解</span><i><ArrowDown size={14} /></i>
      </a>
    </section>
  )
}

function About({ openContact }) {
  return (
    <section className="about" id="about">
      <div className="about-top reveal-copy">
        <p>我们把家庭、教练、专业机构、合作伙伴与城市资源连接起来，但始终把长辈本人放在决定的位置。</p>
        <div>
          <PillButton dark href="#trust">了解康正</PillButton>
          <PillButton onClick={() => openContact('请选择身份')}>和我们聊聊</PillButton>
        </div>
      </div>
      <div className="soft-rule"><i /><span /><i /></div>
      <div className="about-statement">
        <div className="statement-mark"><BrandMark /><span>生活<br />继续</span></div>
        <h2>这不只是一堂课，<br />而是从“<em>我想</em>”到“<em>我做到</em>”的完整经历。</h2>
      </div>
      <div className="action-path" aria-label="生活项目发生路径">
        {['确认真实目标', '说明方案与边界', '进入真实场景', '记录可见成果', '支持持续成长'].map((item, index) => (
          <div key={item}><small>0{index + 1}</small><span>{item}</span></div>
        ))}
      </div>
    </section>
  )
}

function LifeMosaic() {
  return (
    <section className="life-mosaic" aria-labelledby="moments-title">
      <div className="mosaic-heading">
        <p className="section-kicker">REAL SCENES · 真实场景</p>
        <h2 id="moments-title">阶梯不是一条直线，<br />而是生活中的许多次<em>亲手完成。</em></h2>
        <p>出行、社交、家庭、教练、机构与城市不是额外栏目，而是让四条核心阶梯真正发生的环境。</p>
      </div>
      <div className="moment-grid">
        {lifeMoments.map(([title, copy, image, size]) => (
          <motion.figure
            className={size ? `is-${size}` : ''}
            key={title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7, ease }}
          >
            <img src={image} alt={`${title}真实生活场景`} loading="lazy" decoding="async" />
            <figcaption><span>{title}</span><small>{copy}</small></figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

function BrandWorld() {
  return (
    <section className="brand-world" aria-labelledby="brand-world-title">
      <div className="brand-world-copy">
        <p className="section-kicker">A WORLD TO BELONG · 品牌世界</p>
        <h2 id="brand-world-title">有场地，有秩序，<br />也有自己的<em>精神气质。</em></h2>
        <p>康正的视觉不只出现人物，也由空间、书法、材质与符号共同构成。它们让每次进入，都像回到一个熟悉而愿意继续探索的地方。</p>
        <div className="symbol-concept">
          <img src="/media/kangzheng/15-brand-symbol-concept.jpg" alt="康正品牌符号视觉概念" loading="lazy" decoding="async" />
          <div><span>品牌符号</span><strong>向前一步，也始终有人同行。</strong><small>视觉概念 · 正式标志仍需完成商标检索与矢量定稿</small></div>
        </div>
      </div>
      <figure className="brand-venue">
        <img src="/media/kangzheng/13-brand-venue.jpg" alt="康正生活项目空间视觉概念" loading="lazy" decoding="async" />
        <figcaption><span>生活项目空间</span><small>学习、实践、连接与出发，在同一处自然发生。</small></figcaption>
      </figure>
      <figure className="brand-ink">
        <img src="/media/kangzheng/14-calligraphy-abstraction.jpg" alt="表达继续与连接的当代书法抽象艺术" loading="lazy" decoding="async" />
        <figcaption><span>继续 · 当代书法抽象</span><small>克制的力量，开放的路径。</small></figcaption>
      </figure>
    </section>
  )
}

function ProjectVisual({ project }) {
  return (
    <div className={`project-visual visual-${project.id}`} aria-hidden="true">
      <img src={project.image} alt="" loading="lazy" decoding="async" />
      <div className="visual-shade" />
      <span className="visual-index">{project.no}</span>
      <span className="visual-ladder">{project.ladder} · 核心阶梯</span>
      <strong>{project.short}</strong>
      <div className="visual-steps">
        {project.words.map((word, index) => <span key={word}><i>{index + 1}</i>{word}</span>)}
      </div>
    </div>
  )
}

function Projects() {
  const [active, setActive] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    const observers = cardRefs.current.map((element, index) => {
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(index)
      }, { rootMargin: '-32% 0px -32% 0px', threshold: 0.15 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  const scrollTo = (index) => cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <section className="projects" id="projects">
      <div className="projects-grid">
        <aside className="projects-intro">
          <div>
            <p className="section-kicker">LIFE PROJECTS · 生活项目</p>
            <h2>生活能力，<br />在真实场景发生。</h2>
            <p>选择一个领域，看看一次生活项目如何从愿望走向可见成果。</p>
          </div>
          <nav aria-label="生活项目领域">
            {projects.map((project, index) => (
              <button className={active === index ? 'is-active' : ''} type="button" onClick={() => scrollTo(index)} key={project.id}>
                <span>{project.no}</span>{project.eyebrow}<i />
              </button>
            ))}
          </nav>
          <div className="projects-note"><i /><span>所有项目都以本人真实目标与长期成长为前提。</span></div>
        </aside>
        <div className="project-list">
          {projects.map((project, index) => (
            <motion.article
              className={`project-card ${active === index ? 'is-active' : ''}`}
              ref={(element) => { cardRefs.current[index] = element }}
              key={project.id}
              initial={{ opacity: 0, x: 42 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.75, ease }}
            >
              <ProjectVisual project={project} />
              <div className="project-copy">
                <p>{project.no} · {project.ladder} · {project.eyebrow}阶梯</p>
                <h3>{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{project.description}</p>
                <div><span>可见成果</span><strong>{project.outcome}</strong></div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="trust" id="trust">
      <div className="trust-heading">
        <p className="section-kicker">TRUST, MADE VISIBLE · 信任机制</p>
        <h2>信任不是一句口号，<br />而是一条<em>看得见</em>的过程。</h2>
      </div>
      <div className="trust-layout">
        <div className="trust-manifesto">
          <BrandMark light />
          <p>不依赖夸张承诺，不展示未经核验的规模或盈利信息。每一步都能回答：谁决定、谁服务、如何记录、边界在哪里。</p>
        </div>
        <div className="trust-list">
          {[
            ['目标由本人确认', '长辈始终是生活目标的决定者，不以家属或机构意愿替代本人。'],
            ['方案提前说清楚', '步骤、人员、时间、费用、授权与服务边界在开始前说明。'],
            ['成果来自亲手完成', '不是观看或代办，而是在真实场景中形成可重复的自主行动。'],
            ['专业服务各守边界', '涉及医疗、法律、金融等事项，由具备相应资质的主体履约。'],
          ].map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><Check size={18} /></article>
          ))}
        </div>
      </div>
      <div className="boundary-ticker">
        <span>真实人物须经授权</span><i />
        <span>隐私信息最小化呈现</span><i />
        <span>不作治疗与收益承诺</span><i />
        <span>资质与责任可核验</span>
      </div>
    </section>
  )
}

function Audiences({ openContact }) {
  return (
    <section className="audiences" id="audiences">
      <div className="audiences-head">
        <p className="section-kicker">ENTER BY YOUR ROLE · 按身份进入</p>
        <h2>每一种参与，<br />都值得被看见。</h2>
        <p>我们不把所有人塞进同一个“联系我们”。先选择您来到这里的原因。</p>
      </div>
      <div className="audience-list">
        {audiences.map(([title, copy, action], index) => (
          <button type="button" onClick={() => openContact(title)} key={title}>
            <span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><strong>{action}</strong><i><ArrowRight size={18} /></i>
          </button>
        ))}
      </div>
    </section>
  )
}

function Closing({ openContact }) {
  return (
    <section className="closing">
      <img className="closing-image" src="/media/kangzheng/12-visible-results.jpg" alt="长者把一次亲手完成的出行照片放入成果册" loading="lazy" decoding="async" />
      <div className="closing-wash" />
      <div className="closing-copy">
        <BrandMark light />
        <p>START WITH ONE REAL GOAL</p>
        <h2>从一个真实目标，<br />开始认识彼此。</h2>
        <PillButton onClick={() => openContact('请选择身份')}>选择身份并发起联系</PillButton>
      </div>
      <div className="closing-note">
        <span>官网 Demo · 内容不会发送或保存</span>
        <p>正式上线前将补充备案信息、联系方式、隐私政策与真实授权影像。</p>
      </div>
    </section>
  )
}

function ContactPanel({ open, onClose, intent, setIntent }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) setSubmitted(false)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="contact-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="contact-backdrop" type="button" aria-label="关闭联系窗口" onClick={onClose} />
          <motion.aside
            className="contact-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease }}
          >
            <button className="panel-close" type="button" onClick={onClose}><X size={18} /><span>关闭</span></button>
            {!submitted ? (
              <>
                <div className="panel-title"><span>START A CONVERSATION</span><h2 id="contact-title">请告诉我们，<br />您为什么来到这里。</h2><p>本页仅演示官网建联流程，不会发送或保存填写内容。</p></div>
                <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
                  <label><span>您的身份</span><select value={intent === '请选择身份' ? '' : intent} onChange={(event) => setIntent(event.target.value)} required><option value="">请选择</option>{audiences.map(([title]) => <option key={title}>{title}</option>)}<option>媒体与其他</option></select></label>
                  <div className="form-row"><label><span>怎么称呼您</span><input placeholder="例如：王女士" required /></label><label><span>所在城市</span><input placeholder="例如：上海" /></label></div>
                  <label><span>想沟通的事情</span><textarea rows="4" placeholder="请用一两句话说明您的目标或合作设想" required /></label>
                  <label className="consent"><input type="checkbox" required /><span>我已知晓本页为演示流程，请勿填写真实敏感信息。</span></label>
                  <button className="submit-button" type="submit"><span>完成 Demo 提交</span><ArrowRight size={17} /></button>
                </form>
              </>
            ) : (
              <div className="panel-success"><i><Check size={22} /></i><span>DEMO COMPLETE</span><h2>流程演示完成。</h2><p>正式站中，这里将显示受理编号、预计响应时间和后续查询方式。本次内容没有发送或保存。</p><button type="button" onClick={onClose}>返回首页 <ArrowRight size={17} /></button></div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer>
      <a href="#top" className="footer-brand"><BrandMark /><strong>康正</strong><span>银龄生活项目</span></a>
      <nav><a href="#trust">信任机制</a><a href="#projects">生活项目</a><a href="#audiences">合作生态</a><a href="#about">关于康正</a></nav>
      <div><p>让想做的事，继续做得到。</p><span>© 2026 康正 · 官网视觉 Demo V2</span></div>
    </footer>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [intent, setIntent] = useState('请选择身份')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  const openContact = (nextIntent) => {
    setIntent(nextIntent)
    setMenuOpen(false)
    setContactOpen(true)
  }

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setContactOpen(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = contactOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [contactOpen])

  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} openContact={openContact} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} openContact={openContact} />
      <main>
        <Hero openContact={openContact} />
        <About openContact={openContact} />
        <LifeMosaic />
        <Projects />
        <BrandWorld />
        <Trust />
        <Audiences openContact={openContact} />
        <Closing openContact={openContact} />
      </main>
      <Footer />
      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} intent={intent} setIntent={setIntent} />
    </>
  )
}
