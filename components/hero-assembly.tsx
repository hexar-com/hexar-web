"use client"

import { useEffect, useRef } from "react"
import type * as THREE_NS from "three"

const NAVY = 0x0f1f2e
const BLUE = 0x2e7db2
const ICE = 0x8fd3f4
const VISOR = 0x060f18
const ASSEMBLE_SECONDS = 0.9
const STAGGER_SECONDS = 0.07
const WAVE_SECONDS = 2.2

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function smoothstep(t: number): number {
  const x = Math.min(Math.max(t, 0), 1)
  return x * x * (3 - 2 * x)
}

/**
 * Hero scene: loose parts fly in and click together into a small robot, which lights its eyes, waves,
 * then follows the pointer with its head. Clicking scatters and rebuilds it.
 * three.js is loaded on demand so it never weighs on first paint.
 */
export function HeroAssembly({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    let disposed = false
    let cleanup = (): void => {}

    Promise.all([import("three"), import("three/examples/jsm/geometries/RoundedBoxGeometry.js")]).then(
      ([THREE, { RoundedBoxGeometry }]: [typeof THREE_NS, typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js")]) => {
        if (disposed) return
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        el.appendChild(renderer.domElement)
        renderer.domElement.style.cssText = "width:100%;height:100%;display:block"

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.set(0, 0.3, 8.6)

        scene.add(new THREE.HemisphereLight(0xffffff, 0xd9e1e8, 2.2))
        const key = new THREE.DirectionalLight(0xffffff, 3)
        key.position.set(-4, 6, 8)
        scene.add(key)
        const rim = new THREE.DirectionalLight(ICE, 2.6)
        rim.position.set(6, 2, -5)
        scene.add(rim)

        const navy = new THREE.MeshPhysicalMaterial({ color: NAVY, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.15 })
        const blue = new THREE.MeshPhysicalMaterial({ color: BLUE, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 })
        const visor = new THREE.MeshPhysicalMaterial({ color: VISOR, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.02 })
        const glow = new THREE.MeshStandardMaterial({ color: ICE, emissive: ICE, emissiveIntensity: 0 })
        const pulse = new THREE.MeshStandardMaterial({ color: BLUE, emissive: ICE, emissiveIntensity: 0.6 })
        const materials = [navy, blue, visor, glow, pulse]
        const geometries: THREE_NS.BufferGeometry[] = []

        const root = new THREE.Group()
        root.position.y = -0.2
        scene.add(root)
        const head = new THREE.Group()
        head.position.set(0, 1.2, 0)
        const leftArm = new THREE.Group()
        leftArm.position.set(-0.98, 0.3, 0)
        const rightArm = new THREE.Group()
        rightArm.position.set(0.98, 0.3, 0)
        root.add(head, leftArm, rightArm)

        interface Part {
          mesh: THREE_NS.Mesh
          home: THREE_NS.Vector3
          homeRotation: THREE_NS.Quaternion
          from: THREE_NS.Vector3
          spin: THREE_NS.Quaternion
          delay: number
        }
        const parts: Part[] = []

        const add = (
          parent: THREE_NS.Object3D,
          geometry: THREE_NS.BufferGeometry,
          material: THREE_NS.Material,
          position: [number, number, number],
          rotation: [number, number, number] = [0, 0, 0],
        ): THREE_NS.Mesh => {
          geometries.push(geometry)
          const mesh = new THREE.Mesh(geometry, material)
          parent.add(mesh)
          parts.push({
            mesh,
            home: new THREE.Vector3(...position),
            homeRotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
            from: new THREE.Vector3(),
            spin: new THREE.Quaternion(),
            delay: parts.length * STAGGER_SECONDS,
          })
          return mesh
        }
        const box = (w: number, h: number, d: number, r: number): THREE_NS.BufferGeometry => new RoundedBoxGeometry(w, h, d, 4, r)
        const cylinder = (r: number, h: number): THREE_NS.BufferGeometry => new THREE.CylinderGeometry(r, r, h, 40)
        const ball = (r: number): THREE_NS.BufferGeometry => new THREE.SphereGeometry(r, 40, 24)

        const thruster = add(root, new THREE.TorusGeometry(0.42, 0.07, 20, 64), pulse, [0, -1.32, 0], [Math.PI / 2, 0, 0])
        add(root, new THREE.CylinderGeometry(0.5, 0.32, 0.36, 40), navy, [0, -1.05, 0])
        add(root, box(1.6, 1.35, 1.05, 0.26), navy, [0, -0.15, 0])
        add(root, cylinder(0.17, 0.06), pulse, [0, 0, 0.53], [Math.PI / 2, 0, 0])
        add(root, box(0.36, 0.07, 0.04, 0.03), blue, [0, -0.42, 0.53])
        add(leftArm, ball(0.21), blue, [0, 0, 0])
        add(leftArm, new THREE.CapsuleGeometry(0.15, 0.5, 8, 24), navy, [0, -0.48, 0])
        add(leftArm, ball(0.2), blue, [0, -0.95, 0])
        add(rightArm, ball(0.21), blue, [0, 0, 0])
        add(rightArm, new THREE.CapsuleGeometry(0.15, 0.5, 8, 24), navy, [0, -0.48, 0])
        add(rightArm, ball(0.2), blue, [0, -0.95, 0])
        add(root, cylinder(0.18, 0.3), blue, [0, 0.66, 0])
        add(head, box(1.55, 1.08, 1.08, 0.32), navy, [0, 0.12, 0])
        add(head, box(1.22, 0.64, 0.12, 0.14), visor, [0, 0.12, 0.5])
        add(head, cylinder(0.15, 0.16), blue, [-0.84, 0.12, 0], [0, 0, Math.PI / 2])
        add(head, cylinder(0.15, 0.16), blue, [0.84, 0.12, 0], [0, 0, Math.PI / 2])
        add(head, cylinder(0.03, 0.38), navy, [0, 0.84, 0])
        const antennaTip = add(head, ball(0.1), pulse, [0, 1.07, 0])
        const eyes = [
          add(head, box(0.2, 0.28, 0.06, 0.09), glow, [-0.27, 0.14, 0.57]),
          add(head, box(0.2, 0.28, 0.06, 0.09), glow, [0.27, 0.14, 0.57]),
        ]
        const assembledAt = parts.length * STAGGER_SECONDS + ASSEMBLE_SECONDS

        const scatter = (): void => {
          for (const part of parts) {
            const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() * 0.6 - 0.1).normalize()
            part.from.copy(part.home).addScaledVector(dir, 3 + Math.random() * 2.5)
            part.spin.setFromEuler(new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6))
          }
        }

        let start = performance.now()
        scatter()

        const pointer = { x: 0, y: 0 }
        const onPointer = (e: PointerEvent): void => {
          const rect = el.getBoundingClientRect()
          pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1))
          pointer.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1))
        }
        const onClick = (): void => {
          if (reduceMotion) return
          scatter()
          start = performance.now()
        }
        window.addEventListener("pointermove", onPointer, { passive: true })
        el.addEventListener("click", onClick)

        const resize = (): void => {
          const { width, height } = el.getBoundingClientRect()
          if (!width || !height) return
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
        }
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(el)
        resize()

        let visible = true
        const visibility = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
        })
        visibility.observe(el)

        let frame = 0
        const tick = (now: number): void => {
          frame = requestAnimationFrame(tick)
          if (!visible) return
          const elapsed = reduceMotion ? assembledAt + WAVE_SECONDS : (now - start) / 1000
          const time = now / 1000

          for (const part of parts) {
            const t = easeOutExpo(Math.max(0, elapsed - part.delay) / ASSEMBLE_SECONDS)
            part.mesh.position.lerpVectors(part.from, part.home, t)
            part.mesh.quaternion.slerpQuaternions(part.spin, part.homeRotation, t)
            part.mesh.scale.setScalar(0.35 + 0.65 * t)
          }

          const awake = smoothstep((elapsed - assembledAt) / 0.4)
          const blink = time % 3.6 < 0.12 ? 0.12 : 1
          glow.emissiveIntensity = 1.8 * awake
          for (const eye of eyes) eye.scale.y = awake < 1 ? eye.scale.y : blink
          pulse.emissiveIntensity = 0.5 + 0.35 * Math.sin(time * 3) * awake
          antennaTip.scale.setScalar(antennaTip.scale.x * (1 + 0.06 * Math.sin(time * 6) * awake))

          const wave = elapsed - assembledAt
          const raise = smoothstep(wave / 0.35) * smoothstep((WAVE_SECONDS - wave) / 0.35)
          rightArm.rotation.z = raise * (2.5 + 0.35 * Math.sin(wave * 11))
          leftArm.rotation.z = -0.08 * awake + Math.sin(time * 1.4) * 0.04 * awake

          if (!reduceMotion) {
            head.rotation.y += (pointer.x * 0.55 * awake - head.rotation.y) * 0.08
            head.rotation.x += (pointer.y * 0.28 * awake - head.rotation.x) * 0.08
            root.rotation.y += (Math.sin(time * 0.5) * 0.15 + pointer.x * 0.2 - root.rotation.y) * 0.05
            root.position.y = -0.2 + Math.sin(time * 1.6) * 0.08 * awake
            thruster.scale.setScalar(1 + 0.05 * Math.sin(time * 8) * awake)
          } else {
            head.rotation.set(0.05, 0.2, 0)
            root.rotation.y = 0.15
          }
          renderer.render(scene, camera)
        }
        frame = requestAnimationFrame(tick)

        cleanup = () => {
          cancelAnimationFrame(frame)
          window.removeEventListener("pointermove", onPointer)
          el.removeEventListener("click", onClick)
          resizeObserver.disconnect()
          visibility.disconnect()
          for (const geometry of geometries) geometry.dispose()
          for (const material of materials) material.dispose()
          renderer.dispose()
          renderer.domElement.remove()
        }
      },
    )

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return <div ref={host} aria-hidden="true" className={`cursor-pointer ${className}`} />
}
