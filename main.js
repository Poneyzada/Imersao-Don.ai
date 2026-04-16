document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Navbar fade & Scroll behavior
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }
  });

  // 2. Hero Animations
  const heroTl = gsap.timeline();
  
  heroTl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
  .from(".hero-split", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
  .from(".hero-drama", { scale: 0.8, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.4")
  .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
  .from(".hero-cta", { y: 30, opacity: 0, scale: 0.95, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.4");

  gsap.to(".floating-hologram", {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // 3. Fade-Up elements across the page via ScrollTrigger
  const fadeUpElements = gsap.utils.toArray('.gsap-fade-up');
  fadeUpElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  const staggerContainers = gsap.utils.toArray('.gsap-stagger-container');
  staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.stagger-item');
    gsap.from(items, {
      scrollTrigger: { trigger: container, start: "top 80%" },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  });

  // 4. Philosophy SplitText Reveal Mock
  const revealLines = gsap.utils.toArray('.reveal-line');
  gsap.to(revealLines, {
    scrollTrigger: { trigger: '.contrast-reveal-container', start: "top 70%" },
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power2.out"
  });

  // 5. Accordion Logic for Objections
  const accordions = document.querySelectorAll('.accordion-wrapper');
  accordions.forEach(acc => {
    const header = acc.querySelector('button');
    const content = acc.querySelector('.accordion-content');
    header.addEventListener('click', () => {
      const isActive = acc.classList.contains('active');
      accordions.forEach(a => {
        a.classList.remove('active');
        a.querySelector('.accordion-content').style.maxHeight = null;
      });
      if (!isActive) {
        acc.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // ==========================================
  // INSTRUMENT 1: DIAGNOSTIC SHUFFLER
  // ==========================================
  const shufflerData = [
    { label: "SINTOMA", value: "Dor Torácica Atrípica", info: "Iniciada há 4h" },
    { label: "BIOMETRIA", value: "Masculino, 45 Anos", info: "Fator de risco: HAS" },
    { label: "IA STATUS", value: "Alerta ECG Recomendado", info: "Confidence: 94%" }
  ];
  const shufflerContainer = document.querySelector(".shuffler-placeholder");
  
  if (shufflerContainer) {
    let cards = [];
    shufflerData.forEach((data, index) => {
      const card = document.createElement("div");
      card.className = "shuffler-card dark-glass absolute w-[80%] p-6 rounded-2xl border-l-4 border-l-matrix flex flex-col justify-center items-start";
      card.innerHTML = `
        <span class="text-[10px] text-lightgray uppercase tracking-widest font-bold">${data.label}</span>
        <span class="text-xl font-black text-white mt-1">${data.value}</span>
        <span class="text-sm text-matrix font-mono mt-2">${data.info}</span>
      `;
      shufflerContainer.appendChild(card);
      cards.push(card);
    });

    const updateShuffler = () => {
      cards.forEach((card, index) => {
        card.style.zIndex = cards.length - index;
        card.style.transform = `translateY(${index * 20}px) scale(${1 - index * 0.05})`;
        card.style.opacity = index === 0 ? 1 : 0.6;
        card.style.filter = index === 0 ? "none" : `blur(${index * 2}px)`;
      });
    };
    updateShuffler();

    setInterval(() => {
      cards.unshift(cards.pop());
      updateShuffler();
    }, 1500);
  }

  // ==========================================
  // INSTRUMENT 2: TELEMETRY TYPEWRITER
  // ==========================================
  const typewriterOut = document.getElementById("typewriter-output");
  if (typewriterOut) {
    const textToType = "[09:14:02] Análise de Voz Iniciada...\n> Paciente refere dor articular nos joelhos agudamente ao subir escadas.\n \n[09:14:05] PROCESSANDO CID-10...\n> M17 - Gonartrose rastreada.\n \n[09:14:07] GERANDO PADRÃO DE RECEITUÁRIO...\n> Fisioterapia Analgésica sugerida.\n \n[STATUS] : PRONTO PARA ASSINTATURA MÉDICA.";
    
    let i = 0;
    let isTyping = false;
    
    ScrollTrigger.create({
      trigger: typewriterOut,
      start: "top 80%",
      onEnter: () => {
        if(!isTyping) {
          isTyping = true;
          typewriterOut.innerHTML = "";
          const typingInterval = setInterval(() => {
            if (i < textToType.length) {
              typewriterOut.innerHTML += textToType.charAt(i);
              i++;
            } else {
              clearInterval(typingInterval);
            }
          }, 40);
        }
      }
    });
  }

  // ==========================================
  // INSTRUMENT 3: CURSOR PROTOCOL SCHEDULER
  // ==========================================
  const schedulerBoxes = document.querySelector("#scheduler-container .opacity-50");
  const cursor = document.getElementById("fake-cursor");
  
  if (schedulerBoxes && cursor) {
    for(let j=0; j<14; j++) {
      const box = document.createElement("div");
      box.className = "h-8 rounded-md bg-white/5 border border-white/10 transition-colors duration-300";
      schedulerBoxes.appendChild(box);
    }
    
    const boxes = schedulerBoxes.children;
    const targetBox = boxes[10]; 

    ScrollTrigger.create({
      trigger: "#scheduler-container",
      start: "top 70%",
      onEnter: () => {
        const boxRect = targetBox.getBoundingClientRect();
        const containerRect = schedulerBoxes.getBoundingClientRect();
        
        // Relative coordinates inside the container
        const targetX = boxRect.left - containerRect.left + 10;
        const targetY = boxRect.top - containerRect.top + 10;

        const tlCursor = gsap.timeline();
        tlCursor.to(cursor, { x: targetX, y: targetY, duration: 1.5, ease: "power2.inOut" })
                .to(cursor, { scale: 0.8, duration: 0.1, ease: "power2.in" }) // click press
                .to(targetBox, { backgroundColor: "rgba(0,255,65,0.4)", borderColor: "rgba(0,255,65,1)", duration: 0.1 }, "<")
                .to(cursor, { scale: 1, duration: 0.1, ease: "power2.out" }) // click release
                .to(cursor, { x: 250, y: 300, duration: 1.5, ease: "power2.inOut", delay: 0.5 });
      }
    });
  }

  // ==========================================
  // STICKY STACKING LOGIC (PIN SCROLL)
  // ==========================================
  // Only apply on Desktop to avoid breaking mobile scrolling UX
  if (window.innerWidth > 768) {
    const stackCards = gsap.utils.toArray('.stack-card');
    
    if (stackCards.length > 0) {
      stackCards.forEach((card, i) => {
        if (i < stackCards.length - 1) {
          gsap.to(card.querySelector('.dark-glass'), {
            scale: 0.9,
            filter: "blur(20px)",
            opacity: 0.3,
            scrollTrigger: {
              trigger: stackCards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: 1
            }
          });
        }
      });
    }
  }

  // ==========================================
  // VANILLA WEBGL SHADER BACKGROUND INITIALIZATION
  // ==========================================
  const canvas = document.getElementById('hero-webgl-canvas');
  if (canvas) {
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    const renderer = new WebGLRenderer(canvas, dpr);
    const pointers = new PointerHandler(canvas, dpr);
    
    renderer.setup();
    renderer.init();
    
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderer.updateScale(dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    
    if (renderer.test(defaultShaderSource) === null) {
      renderer.updateShader(defaultShaderSource);
    }
    
    const loop = (now) => {
      renderer.updateMouse(pointers.first);
      renderer.updatePointerCount(pointers.count);
      renderer.updatePointerCoords(pointers.coords);
      renderer.updateMove(pointers.move);
      renderer.render(now);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ==========================================
  // BUBBLE BUTTON EFFECT (21st.dev Vanilla Port)
  // ==========================================
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    // Wrap existing text in a span if not already to respect z-index
    if(!btn.querySelector('.btn-text')) {
      const text = btn.innerHTML;
      btn.innerHTML = `<span class="btn-text relative z-10 flex items-center justify-center w-full">${text}</span>`;
    }
    
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-container absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none';
    
    for(let i=0; i<15; i++) {
      const bubble = document.createElement('span');
      const size = Math.random() * 12 + 4;
      const left = Math.random() * 95;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 4;
      
      bubble.className = "bubble absolute bottom-[-10px] block rounded-full bg-white/20";
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animation = `bubble-rise ${duration}s ${delay}s linear infinite`;
      bubble.style.animationPlayState = 'paused';
      
      bubbleContainer.appendChild(bubble);
    }
    btn.appendChild(bubbleContainer);

    btn.addEventListener('mouseenter', () => {
      bubbleContainer.querySelectorAll('.bubble').forEach(b => b.style.animationPlayState = 'running');
    });
    btn.addEventListener('mouseleave', () => {
      bubbleContainer.querySelectorAll('.bubble').forEach(b => b.style.animationPlayState = 'paused');
    });
  });

});

// ==========================================
// WEBGL SHADER ENGINE (VANILLA PORT)
// ==========================================
const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<8.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		// MODIFIED TO MATRIX GREEN / ELECTRIC ORANGE PALETTE
		col=mix(col,vec3(bg*.1, bg*.4, bg*.05),d);
	}
	O=vec4(col,1);
}`;

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext('webgl2');
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = defaultShaderSource;
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
    this.program = null;
  }
  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }
  updateMove(deltas) { this.mouseMove = deltas; }
  updateMouse(coords) { this.mouseCoords = coords; }
  updatePointerCoords(coords) { this.pointerCoords = coords; }
  updatePointerCount(nbr) { this.nbrOfPointers = nbr; }
  updateScale(scale) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }
  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
    }
  }
  test(source) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }
  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }
  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
  }
  init() {
    const gl = this.gl;
    const program = this.program;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    program.resolution = gl.getUniformLocation(program, 'resolution');
    program.time = gl.getUniformLocation(program, 'time');
    program.move = gl.getUniformLocation(program, 'move');
    program.touch = gl.getUniformLocation(program, 'touch');
    program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
    program.pointers = gl.getUniformLocation(program, 'pointers');
  }
  render(now = 0) {
    const gl = this.gl;
    const program = this.program;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.move, ...this.mouseMove);
    gl.uniform2f(program.touch, ...this.mouseCoords);
    gl.uniform1i(program.pointerCount, this.nbrOfPointers);
    // Safety check for pointers
    let pCoords = this.pointerCoords;
    if (pCoords.length === 0) pCoords = [0,0];
    gl.uniform2fv(program.pointers, pCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  constructor(element, scale) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];
    const map = (el, s, x, y) => [x * s, el.height - y * s];
    element.addEventListener('pointerdown', (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
    });
    element.addEventListener('pointerup', (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });
    element.addEventListener('pointerleave', (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });
    element.addEventListener('pointermove', (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }
  getScale() { return this.scale; }
  updateScale(scale) { this.scale = scale; }
  get count() { return this.pointers.size; }
  get move() { return this.moves; }
  get coords() { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]; }
  get first() { return this.pointers.values().next().value || this.lastCoords; }
}

// ==========================================
// EPIC ICP MODAL LOGIC
// ==========================================
let icpState = {
  service: "",
  pain: "",
  name: "",
  email: "",
  phone: ""
};

window.openIcpModal = function() {
  const modal = document.getElementById('icp-modal');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  resetIcp();
};

window.closeIcpModal = function() {
  const modal = document.getElementById('icp-modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
};

function hideAllSteps() {
  document.querySelectorAll('.icp-step').forEach(step => {
    step.classList.add('hidden', 'opacity-0');
    step.classList.remove('opacity-100');
  });
}

function showStep(stepNumber) {
  hideAllSteps();
  const step = document.getElementById('icp-step-' + stepNumber);
  step.classList.remove('hidden');
  setTimeout(() => {
    step.classList.remove('opacity-0');
    step.classList.add('opacity-100');
  }, 50);

  // Update dots
  for(let i=1; i<=3; i++) {
    const dot = document.getElementById('step-dot-' + i);
    if (!dot) continue;
    if(i <= stepNumber) {
      dot.classList.remove('bg-white/10');
      dot.classList.add('bg-matrix', 'shadow-[0_0_10px_rgba(0,255,65,0.5)]');
    } else {
      dot.classList.remove('bg-matrix', 'shadow-[0_0_10px_rgba(0,255,65,0.5)]');
      dot.classList.add('bg-white/10');
    }
  }
}

window.selectService = function(service) {
  icpState.service = service;
  showStep(2);
};

window.selectPain = function(pain) {
  icpState.pain = pain;
  showStep(3);
};

window.backToStep = function(step) {
  showStep(step);
};

window.resetIcp = function() {
  icpState = { service: "", pain: "", name: "", email: "", phone: "" };
  const n = document.getElementById('icp-nome');
  const e = document.getElementById('icp-email');
  const t = document.getElementById('icp-telefone');
  if(n) n.value = "";
  if(e) e.value = "";
  if(t) t.value = "";
  showStep(1);
}

window.finalizeICP = function() {
  icpState.name = document.getElementById('icp-nome').value;
  icpState.email = document.getElementById('icp-email').value;
  icpState.phone = document.getElementById('icp-telefone').value;

  if(!icpState.name) {
    alert("Por favor, preencha pelo menos o seu Nome para avançar.");
    return;
  }

  const wppNumber = "5511999999999"; // SUBSTITUA PELO NUMERO REAL DE WPP
  const rawMsg = `Olá Don! Sou o(a) ${icpState.name}.\n\n` + 
                 `Passei pelo site de Imersão e tenho interesse em: *${icpState.service}*.\n` + 
                 `Meu maior gargalo na clínica hoje é: *${icpState.pain}*.\n\n` + 
                 `E-mail: ${icpState.email || 'Não informado'}\nTelefone/CRM: ${icpState.phone || 'Não informado'}\n\n` +
                 `Gostaria de fechar minha vaga / falar dos próximos passos.`;

  const encodedMsg = encodeURIComponent(rawMsg);
  const wppLink = `https://wa.me/${wppNumber}?text=${encodedMsg}`;

  // Redirect
  window.open(wppLink, '_blank');
  closeIcpModal();
};
