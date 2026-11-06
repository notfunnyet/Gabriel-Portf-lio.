/* Conteúdo editável. Para adicionar um projeto, copie um objeto de "projects". */
window.SITE = {
  profile: { age: null }, // ex.: 19 — enquanto for null, a idade não aparece
  projects: [
    {
      mark: "PSBL",
      title: "PSBL: Partido Soberania Brasileira Leal",
      role: "Desenvolvimento completo",
      text: "Site institucional do partido em formação, feito do zero em HTML, CSS e JavaScript: princípios, propostas, transparência, notícias, FAQ e documentos, com menu responsivo e busca interna. Mais de 160 commits, publicado no GitHub Pages.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "./psbl.jpg",
      alt: "Página inicial do site do PSBL: título Partido Soberania Brasileira Leal sobre a bandeira do Brasil, com menu e busca no topo.",
      links: [
        { label: "Ver site", href: "https://notfunnyet.github.io/psbl/" },
        { label: "Código", href: "https://github.com/notfunnyet/psbl" }
      ]
    },
    {
      mark: "Tt",
      image: "./tetris.jpg",
      tall: true,
      alt: "Janela do jogo Tetris em Python: peça roxa em queda, peças vermelhas, azuis e roxa empilhadas na base e pontuação 100.",
      title: "Tetris em Python",
      text: "Versão do clássico jogo de blocos, escrita em Python, com pontuação e peças que caem e se empilham no tabuleiro.",
      tech: ["Python"],
      links: ["https://github.com/notfunnyet/TETRIS"]
    },
    {
      mark: "Cg",
      image: "./cognita.jpg",
      tall: true,
      alt: "Imagem do site cognitaiq feito por Gabriel.",
      title: "Cognita - Teste de QI",
      text: "Um site feito para testar sua capacidade mental e ver até aonde vocÊ vai.",
      tech: ["HTML", "CSS", "JavaScript"],
      links: ["https://cognitaiq.pages.dev/"]
    }
    /* Modelo: { mark:"Ab", title:"", role:"", text:"", tech:[""], links:[{label:"Código",href:"https://..."}] } */
  ]
};
