// Lightweight confetti utility (no external deps)
export function burstConfetti({ count = 24, spread = 60, colors } = {}) {
  const body = document.body;
  const confettiColors = colors || ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
  const pieces = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    el.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
    el.style.top = `${10 + Math.random() * 10}%`;
    const rotation = Math.random() * 360;
    el.style.transform = `rotate(${rotation}deg)`;
    el.style.opacity = "1";
    body.appendChild(el);
    pieces.push(el);

    // animate using requestAnimationFrame
    const vx = (Math.random() - 0.5) * spread;
    const vy = Math.random() * 6 + 2;
    const vr = (Math.random() - 0.5) * 10;
    let x = (window.innerWidth * 0.5) + (Math.random() - 0.5) * 200;
    let y = window.innerHeight * 0.15 + Math.random() * 40;

    let t = 0;
    function step() {
      t += 1;
      x += vx;
      y += vy + t * 0.25; // gravity
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = `rotate(${rotation + vr * t}deg)`;
      el.style.opacity = `${Math.max(0, 1 - t / 80)}`;
      if (y < window.innerHeight + 50 && t < 200) requestAnimationFrame(step);
      else el.remove();
    }
    requestAnimationFrame(step);
  }
}
