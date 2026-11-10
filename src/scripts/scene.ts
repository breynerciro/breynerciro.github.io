// Escena 3D del inicio: la arquitectura de un producto en cinco capas (interfaz, API, IA,
// datos, nube), cada una con sus objetos. Se iluminan las capas que toca lo que se está
// leyendo (elementos con data-layers) y la cámara se acerca a ellas.
import {
  AmbientLight, BoxGeometry, BufferGeometry, Color, CylinderGeometry, DirectionalLight, EdgesGeometry,
  Float32BufferAttribute, Group, IcosahedronGeometry, LineBasicMaterial, LineSegments, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Points, PointsMaterial,
  Scene, SphereGeometry, Vector3, WebGLRenderer, WireframeGeometry, type Material, type Object3D,
} from 'three';
import { LAYERS } from '../utils/layers';

const SIZE = 3, GAP = 1.2, CAM_Z = 14, FOV = 35;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };
const rnd = (i: number) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;

export function start(canvas: HTMLCanvasElement, hero: HTMLElement, labelEls: HTMLElement[]) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 60);
  camera.position.z = CAM_Z;

  const accent = new Color(), ink = new Color();
  scene.add(new AmbientLight(0xffffff, 1.1));
  const sun = new DirectionalLight(0xffffff, 2.2);
  sun.position.set(4, 8, 6);
  const lamp = new PointLight(0xffffff, 30, 20);
  lamp.position.set(-3, 1, 5);
  scene.add(sun, lamp);

  const stack = new Group();
  scene.add(stack);

  // Materiales por capa, para poder atenuar cada una por separado
  const layers = LAYERS.map(() => {
    const group = new Group();
    stack.add(group);
    return {
      group, glow: 1,
      slab: new MeshStandardMaterial({ transparent: true, depthWrite: false, roughness: 0.2, metalness: 0.1 }),
      line: new LineBasicMaterial({ transparent: true }),
      solid: new MeshStandardMaterial({ transparent: true, roughness: 0.45, metalness: 0.15 }),
      lit: new MeshStandardMaterial({ transparent: true, emissiveIntensity: 1.4, roughness: 0.4 }),
      dots: new PointsMaterial({ transparent: true, size: 0.06 }),
      spin: [] as Object3D[],
    };
  });
  type Layer = (typeof layers)[number];
  const put = (l: Layer, geo: BufferGeometry, mat: Material, x = 0, y = 0, z = 0) => {
    const m = new Mesh(geo, mat);
    m.position.set(x, y, z);
    l.group.add(m);
    return m;
  };
  const lines = (l: Layer, geo: BufferGeometry, x = 0, y = 0, z = 0) => {
    const s = new LineSegments(geo, l.line);
    s.position.set(x, y, z);
    l.group.add(s);
    return s;
  };

  for (const l of layers) {
    const slab = new BoxGeometry(SIZE, 0.06, SIZE);
    put(l, slab, l.slab);
    lines(l, new EdgesGeometry(slab));
  }
  const [ui, api, ai, data, cloud] = layers;

  // Interfaz: ventanas y un celular, con su barra superior encendida
  for (const [w, h, x, z, r] of [[1.5, 0.95, -0.35, -0.55, 0.15], [0.95, 0.62, 0.75, 0.35, -0.35], [0.5, 0.95, -0.95, 0.75, 0.5]]) {
    const win = put(ui, new BoxGeometry(w, h, 0.05), ui.solid, x, h / 2 + 0.12, z);
    win.rotation.y = r;
    const bar = new Mesh(new BoxGeometry(w, 0.1, 0.07), ui.lit);
    bar.position.y = h / 2 - 0.05;
    win.add(bar);
  }

  // API: servicios (prismas) conectados a una puerta de entrada central
  const services = [[0, 0], [-1, -0.8], [1, -0.7], [-0.9, 0.8], [0.9, 0.9], [0.1, -1.1]];
  const wires: number[] = [];
  services.forEach(([x, z], i) => {
    const big = i === 0;
    put(api, new CylinderGeometry(big ? 0.34 : 0.2, big ? 0.34 : 0.2, big ? 0.5 : 0.3, 6), big ? api.lit : api.solid, x, big ? 0.3 : 0.2, z);
    if (!big) wires.push(0, 0.2, 0, x, 0.2, z);
  });
  lines(api, new BufferGeometry().setAttribute('position', new Float32BufferAttribute(wires, 3)));

  // IA: un núcleo dentro de una malla, con un anillo de partículas en órbita
  ai.spin.push(lines(ai, new WireframeGeometry(new IcosahedronGeometry(0.62, 1)), 0, 0.85, 0));
  put(ai, new SphereGeometry(0.27, 24, 16), ai.lit, 0, 0.85, 0);
  const ring: number[] = [];
  for (let i = 0; i < 160; i++) {
    const a = (i / 160) * Math.PI * 2, r = 1.05 + (rnd(i) - 0.5) * 0.12;
    ring.push(Math.cos(a) * r, (rnd(i + 9) - 0.5) * 0.1, Math.sin(a) * r);
  }
  const orbit = new Points(new BufferGeometry().setAttribute('position', new Float32BufferAttribute(ring, 3)), ai.dots);
  orbit.position.y = 0.85;
  orbit.rotation.x = 0.35;
  ai.group.add(orbit);
  ai.spin.push(orbit);

  // Datos: bases de datos como discos apilados
  for (const [x, z] of [[-0.8, -0.35], [0.2, 0.5], [0.95, -0.7]]) {
    for (let d = 0; d < 3; d++) put(data, new CylinderGeometry(0.36, 0.36, 0.17, 32), data.solid, x, 0.14 + d * 0.23, z);
    put(data, new CylinderGeometry(0.36, 0.36, 0.025, 32), data.lit, x, 0.72, z);
  }

  // Nube: racks de servidores con sus luces
  for (const [x, z] of [[-0.8, -0.6], [0, -0.6], [0.8, -0.6], [-0.4, 0.6], [0.4, 0.6]]) {
    const rack = put(cloud, new BoxGeometry(0.5, 0.85, 0.5), cloud.solid, x, 0.46, z);
    for (let d = 0; d < 3; d++) {
      const led = new Mesh(new BoxGeometry(0.32, 0.035, 0.02), cloud.lit);
      led.position.set(0, 0.24 - d * 0.2, 0.26);
      rack.add(led);
    }
  }

  // Paquetes que viajan entre la interfaz y la nube: el "de punta a punta"
  const pipeMat = new LineBasicMaterial({ transparent: true, opacity: 0.25 });
  const packetMat = new MeshBasicMaterial({ transparent: true });
  const top = ((LAYERS.length - 1) / 2) * GAP, pipeXZ = [[-1.2, -1.2], [1.2, -1.2], [1.2, 1.2], [-1.2, 1.2], [-0.45, 0.1], [0.5, -0.2]];
  const pipeGeo = new BufferGeometry();
  const pipes = new LineSegments(pipeGeo, pipeMat);
  stack.add(pipes);
  const packets = Array.from({ length: 18 }, (_, i) => {
    const mesh = new Mesh(new SphereGeometry(0.055, 12, 8), packetMat);
    stack.add(mesh);
    return { mesh, pipe: pipeXZ[i % pipeXZ.length], phase: rnd(i), speed: 0.08 + rnd(i + 40) * 0.1, up: i % 3 === 0 };
  });

  // ── Estado ──
  const tagged = [...document.querySelectorAll<HTMLElement>('[data-layers]')];
  const slot = document.getElementById('scene-slot');
  let hovered: HTMLElement | null = null;
  let w = 0, h = 0, visH = 0, visW = 0;
  let p = 0, intro = reduced ? 1 : 0, mx = 0, my = 0, tx = 0, ty = 0, focusY = 0, zoom = 1, raf = 0, t0 = 0;
  const mark = new Color(), acc = new Color(), text = new Color(), white = new Color(0xffffff), v = new Vector3();
  const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const measure = () => {
    w = innerWidth; h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    visH = 2 * CAM_Z * Math.tan((FOV * Math.PI) / 360);
    visW = visH * camera.aspect;
    mark.set(css('--color-mark')); acc.set(css('--color-accent')); text.set(css('--color-text'));
  };

  const active = () => {
    const line = h * 0.45;
    const el = hovered ?? tagged.find((e) => { const r = e.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
    const set = el?.dataset.layers?.split(' ');
    return LAYERS.map((l) => !set || set.includes(l));
  };

  const frame = (ms: number) => {
    const time = reduced ? 0 : ms / 1000, ease = reduced ? 1 : 0.08;
    if (!t0) t0 = ms;
    if (!reduced) intro = smooth((ms - t0) / 1800);
    // p: 0 en el hero (grande, a la derecha), 1 en las secciones (pequeña, bajo el título)
    p = lerp(p, smooth(scrollY / (hero.offsetHeight * 0.8)), ease);
    tx = lerp(tx, mx, 0.05); ty = lerp(ty, my, 0.05);

    const on = active(), some = on.some((a) => !a);
    const gap = lerp(0.3, GAP, intro);
    // La cámara se acerca a las capas activas
    const ys = on.map((a, i) => (a ? top - i * GAP : null)).filter((y): y is number => y !== null);
    focusY = lerp(focusY, some && ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : 0, ease);
    zoom = lerp(zoom, some ? 1.18 : 1, ease);

    accent.copy(mark).lerp(acc, p);
    ink.copy(white).lerp(text, p);
    lamp.color.copy(accent);

    layers.forEach((l, i) => {
      l.glow = lerp(l.glow, on[i] ? 1 : 0.1, ease);
      const g = l.glow;
      l.group.position.y = (top / GAP - i) * gap + (on[i] && some ? 0.12 : 0) * g;
      l.slab.color.copy(accent); l.slab.opacity = 0.2 * g;
      l.line.color.copy(accent); l.line.opacity = 0.95 * g;
      l.solid.color.copy(ink); l.solid.opacity = g;
      l.lit.color.copy(accent); l.lit.emissive.copy(accent); l.lit.opacity = g;
      l.dots.color.copy(accent); l.dots.opacity = g;
      l.spin.forEach((o, n) => { o.rotation.y = time * (n ? -0.5 : 0.35); });
    });

    const yTop = top * (gap / GAP), pos: number[] = [];
    for (const [x, z] of pipeXZ) pos.push(x, yTop, z, x, -yTop, z);
    pipeGeo.setAttribute('position', new Float32BufferAttribute(pos, 3));
    pipeMat.color.copy(accent);
    packetMat.color.copy(ink);
    for (const pk of packets) {
      const t = (time * pk.speed + pk.phase) % 1;
      pk.mesh.position.set(pk.pipe[0], (pk.up ? lerp(-yTop, yTop, t) : lerp(yTop, -yTop, t)), pk.pipe[1]);
    }

    const wide = w >= 1024;
    let fx = lerp(0.79, 0.15, p), fy = lerp(0.55, 0.66, p), s = (lerp(0.74, 0.42, p) * visH) / 7;
    if (!wide) {
      // Pantalla angosta: la escena vive en su espacio del hero y se va con él al hacer scroll
      const r = slot?.getBoundingClientRect();
      if (!r || r.bottom < 0) { renderer.clear(); if (!reduced) raf = requestAnimationFrame(frame); return; }
      fx = (r.left + r.width / 2) / w; fy = (r.top + r.height / 2) / h; s = ((r.height / h) * visH) / 7 * 0.92;
    }
    s *= zoom;
    stack.scale.setScalar(s);
    stack.position.set((fx - 0.5) * visW, (0.5 - fy) * visH - focusY * s * 0.75, 0);
    stack.rotation.set(0.42 + ty * 0.25, 0.75 + Math.sin(time * 0.25) * 0.35 + tx * 0.6 + (1 - intro) * 1.4, 0);

    renderer.render(scene, camera);

    // Nombre de cada capa, junto a su esquina más a la derecha
    labelEls.forEach((el, i) => {
      let bx = -Infinity, by = 0;
      for (const [cx, cz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        v.set((cx * SIZE) / 2, 0, (cz * SIZE) / 2);
        layers[i].group.localToWorld(v).project(camera);
        const x = (v.x * 0.5 + 0.5) * w;
        if (x > bx) { bx = x; by = (0.5 - v.y * 0.5) * h; }
      }
      el.style.transform = `translate(${bx + 10}px, ${by}px) translateY(-50%)`;
      el.style.opacity = String(layers[i].glow * intro);
      el.style.color = `#${ink.getHexString()}`;
    });

    if (!reduced) raf = requestAnimationFrame(frame);
  };

  measure();
  if (reduced) {
    frame(0);
    addEventListener('scroll', () => frame(0), { passive: true });
  } else {
    raf = requestAnimationFrame(frame);
    addEventListener('pointermove', (e) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; }, { passive: true });
    // No gastar batería con la pestaña oculta
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    });
  }
  document.addEventListener('pointerover', (e) => {
    hovered = (e.target as Element).closest?.<HTMLElement>('[data-layers]') ?? null;
    if (reduced) frame(0);
  });
  addEventListener('resize', () => { measure(); if (reduced) frame(0); });
  // El cambio de tema cambia los colores de la escena
  new MutationObserver(() => { measure(); if (reduced) frame(0); }).observe(document.documentElement, { attributeFilter: ['class'] });
}
