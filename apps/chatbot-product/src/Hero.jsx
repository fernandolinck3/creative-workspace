import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function ThreeScene() {
  const containerRef = useRef()
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current || sceneReady) return

    try {
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 20)
      camera.position.set(0, 0.2, 5)

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.6))
      const light = new THREE.PointLight('#14b8a6', 2, 10)
      light.position.set(3, 2, 4)
      scene.add(light)

      // Hand group
      const hand = new THREE.Group()
      const mat = new THREE.MeshStandardMaterial({
        color: '#14b8a6',
        roughness: 0.25,
        metalness: 0.2,
        emissive: '#0d9488',
        emissiveIntensity: 0.3,
      })

      // Palm
      const palm = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.0, 8, 16), mat)
      palm.position.y = 0.1
      hand.add(palm)

      // Thumb
      const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.8, 8, 8), mat)
      thumb.position.set(0.52, 0.48, 0.15)
      thumb.rotation.set(0.3, 0, -0.6)
      hand.add(thumb)
      const thumbTip = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), mat)
      thumbTip.position.set(0.88, 1.05, 0.32)
      hand.add(thumbTip)

      // Fingers
      const fingerX = [-0.1, 0.07, 0.24, 0.41]
      fingerX.forEach(x => {
        const f = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.6, 6, 8), mat)
        f.position.set(x, -0.3, 0.3)
        f.rotation.set(-0.5, 0, 0)
        hand.add(f)
        const ft = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), mat)
        ft.position.set(x + 0.09, -0.86, 0.5)
        hand.add(ft)
      })

      // Wrist
      const wrist = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 0.5, 8, 8), mat)
      wrist.position.y = -1.0
      hand.add(wrist)

      scene.add(hand)

      // Particles
      const pCount = 50
      const pGeo = new THREE.BufferGeometry()
      const pPos = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 5
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 5
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 3
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const pMat = new THREE.PointsMaterial({ color: '#14b8a6', size: 0.04, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // Animation loop
      let mouseX = 0, mouseY = 0
      const onMouse = (e) => {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }
      containerRef.current.addEventListener('mousemove', onMouse)

      let animId
      const animate = () => {
        animId = requestAnimationFrame(animate)
        hand.rotation.y += (mouseX * 0.5 - hand.rotation.y) * 0.04
        hand.rotation.x += (mouseY * 0.3 - hand.rotation.x) * 0.04
        hand.position.y = Math.sin(Date.now() * 0.001) * 0.15
        particles.rotation.y += 0.002
        renderer.render(scene, camera)
      }
      animate()

      setSceneReady(true)

      return () => {
        cancelAnimationFrame(animId)
        containerRef.current?.removeEventListener('mousemove', onMouse)
        renderer.dispose()
      }
    } catch (e) {
      console.error('Three.js init error:', e)
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

const MESSAGES = [
  { type: 'in', text: 'Oi, queria agendar um horário 💇‍♀️', time: '10:32', delay: 800 },
  { type: 'out', text: 'Claro! Temos 10h, 14h ou 16h.', time: '10:32', delay: 2200 },
  { type: 'in', text: '14h!', time: '10:33', delay: 3800 },
  { type: 'out', text: 'Agendado! Confirmo por SMS ✅', time: '10:33', delay: 5000 },
]

export default function Hero() {
  const [visible, setVisible] = useState([])
  const [joinha, setJoinha] = useState(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduced) { setVisible(MESSAGES.map((_, i) => i)); setJoinha(true); return }
    MESSAGES.forEach((_, i) => setTimeout(() => setVisible(v => [...v, i]), MESSAGES[i].delay))
    setTimeout(() => setJoinha(true), 6000)
  }, [])

  return (
    <section style={{ background: '#0a0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

        {/* 3D Hand */}
        <div style={{ height: '550px', order: 1 }}>
          <ThreeScene />
        </div>

        {/* Phone + Text */}
        <div style={{ order: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2rem' }}>
            <div className="phone-frame" style={{ width: '260px' }}>
              <div className="phone-screen">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.5rem', marginBottom: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="/assets/logo-reference.png" alt="TaJoia" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Space Grotesk' }}>TaJoia</div>
                    <div style={{ fontSize: '0.55rem', color: '#14b8a6' }}>online</div>
                  </div>
                </div>
                {MESSAGES.map((m, i) => (
                  <div key={i} className={m.type === 'in' ? 'msg-in-bubble' : 'msg-out-bubble'}
                    style={{ fontSize: '0.7rem', padding: '7px 11px', opacity: visible.includes(i) || reduced ? 1 : 0, animation: visible.includes(i) || reduced ? 'msg-in 0.4s ease-out both' : 'none' }}>
                    {m.text}
                    <div className="msg-time" style={{ fontSize: '0.55rem' }}>{m.time}</div>
                  </div>
                ))}
                <div style={{ flex: 1 }} />
                <div style={{ textAlign: 'center', fontSize: '2.5rem', opacity: joinha ? 1 : 0, transform: joinha ? 'scale(1)' : 'scale(0.5)', transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', filter: joinha ? 'drop-shadow(0 0 10px rgba(13,148,136,0.3))' : 'none' }}>👍</div>
              </div>
            </div>
          </div>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(13,148,136,0.15)', color: '#5eead4', border: '1px solid rgba(20,184,166,0.2)', borderRadius: '999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
            🤖 Atendimento 24h no WhatsApp
          </span>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#f1f5f9', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Seu WhatsApp respondendo em <span style={{ color: '#14b8a6' }}>5 segundos</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '400px' }}>
            Enquanto você atende, a TaJoia responde. Sem perder lead. Sem contratar ninguém.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#cta" style={{ background: '#0d9488', color: '#fff', fontWeight: 700, borderRadius: '999px', padding: '0.8rem 2rem', fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 0 20px rgba(13,148,136,0.3)' }}>
              Quero 7 dias grátis
            </a>
            <a href="#como-funciona" style={{ border: '2px solid rgba(13,148,136,0.3)', color: '#94a3b8', fontWeight: 600, borderRadius: '999px', padding: '0.8rem 2rem', fontSize: '0.9rem', textDecoration: 'none' }}>
              Ver como funciona ↓
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
