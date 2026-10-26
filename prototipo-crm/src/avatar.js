// Foto redonda com as iniciais (um desenho simples, sem imagem externa).
export function avatarDe(nome, cor) {
  const inicial = nome.trim().slice(0, 1).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="${cor}"/><text x="32" y="42" font-family="Nunito,Arial,sans-serif" font-size="30" font-weight="800" text-anchor="middle" fill="#fff">${inicial}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
