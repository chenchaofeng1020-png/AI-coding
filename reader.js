if (window.location.protocol === "file:") {
  const hash = window.location.hash || "#/vibecoding/01-ai-concepts.md";
  window.location.replace(`http://127.0.0.1:8001/${hash}`);
  throw new Error("Redirecting to local reader server");
}

const sections = {
  codex: {
    label: "Codex",
    base: "codex",
    docs: [
      ["01-what-is-codex.md", "认识 Codex 与四种入口"],
      ["02-core-concepts.md", "Codex 核心概念速览"],
      ["03-install.md", "安装与登录（Mac / Windows / Linux）"],
      ["04-pricing.md", "订阅与计费"],
      ["05-third-party-models.md", "接入 DeepSeek 等国产模型"],
      ["06-first-task.md", "跑通第一个任务"],
      ["07-desktop-app.md", "桌面 App 全景"],
      ["08-cli.md", "命令行 CLI 上手"],
      ["09-ide.md", "IDE 扩展（VS Code 等）"],
      ["10-cloud.md", "云端 Codex Cloud"],
      ["11-agents-md.md", "项目说明书 AGENTS.md"],
      ["12-slash-commands.md", "斜杠命令与快捷键"],
      ["13-prompting.md", "提示词写法"],
      ["14-workflows.md", "四类日常工作流"],
      ["15-permissions.md", "权限、沙箱与审批"],
      ["16-security.md", "安全与风险边界"],
      ["17-computer-use.md", "电脑操控与浏览器"],
      ["18-config.md", "config.toml 配置详解"],
      ["19-memory.md", "记忆系统"],
      ["20-mcp.md", "用 MCP 接外部工具"],
      ["21-subagents.md", "子代理"],
      ["22-skills.md", "Agent Skills 技能"],
      ["23-plugins.md", "插件"],
      ["24-hooks.md", "规则与钩子"],
      ["25-worktrees.md", "Worktrees 并行隔离"],
      ["26-git-github.md", "Git 与 GitHub 集成"],
      ["27-automation.md", "自动化与 CI/CD"],
      ["28-noninteractive.md", "非交互模式 codex exec"],
      ["29-integrations.md", "Slack / Linear 与 SDK 集成"],
      ["30-models.md", "怎么选模型"],
      ["31-speed.md", "进阶技巧与提速"],
      ["32-migrate-from-claude-code.md", "从 Claude Code 迁移"],
      ["33-windows.md", "Windows 使用要点"],
      ["34-capstone.md", "综合实战"],
      ["35-cheatsheet.md", "命令与配置速查表"],
      ["36-best-practices.md", "最佳实践"],
      ["37-faq.md", "常见问题排查"],
      ["38-glossary.md", "术语表"],
      ["39-enterprise.md", "企业管理与治理"]
    ]
  },
  claude: {
    label: "Claude Code",
    base: "claude-code",
    docs: [
      ["01-what-is-claude-code.md", "Claude Code 简介"],
      ["02-install.md", "安装与使用"],
      ["03-how-it-works.md", "Claude Code 如何工作"],
      ["04-api-config.md", "API 配置"],
      ["05-third-party-models.md", "接入第三方 / 国产模型"],
      ["06-coding-plan.md", "Coding Plan"],
      ["07-first-run.md", "第一次使用"],
      ["08-vscode.md", "VS Code 集成"],
      ["09-jetbrains.md", "JetBrains 集成"],
      ["10-desktop.md", "桌面 app"],
      ["11-web-and-cloud.md", "网页版与云端"],
      ["12-project-init.md", "项目初始化"],
      ["13-project-structure.md", "项目结构"],
      ["14-interface-and-shortcuts.md", "交互界面与快捷键"],
      ["15-prompting.md", "怎么提问和给指令"],
      ["16-common-workflows.md", "四个最常用的活儿"],
      ["17-images-multimodal.md", "图片与多模态"],
      ["18-claude-md-guide.md", "CLAUDE.md 使用指南"],
      ["19-context-management.md", "上下文管理"],
      ["20-permissions.md", "权限配置"],
      ["21-security.md", "安全与风险边界"],
      ["22-mcp.md", "MCP"],
      ["23-subagents.md", "子代理"],
      ["24-plugins.md", "插件"],
      ["25-memory.md", "记忆系统"],
      ["26-agent-skills.md", "Agent Skills"],
      ["27-skills-in-practice.md", "Skills 使用实例"],
      ["28-skill-creator.md", "skill-creator 使用"],
      ["29-agent-teams.md", "Agent teams 智能体团队"],
      ["30-choosing-features.md", "功能怎么选"],
      ["31-settings-json.md", "settings.json"],
      ["32-output-styles.md", "输出样式"],
      ["33-hooks.md", "钩子"],
      ["34-cli-reference.md", "CLI 参考手册"],
      ["35-modes-and-control.md", "控制与模式"],
      ["36-slash-commands.md", "斜杠命令"],
      ["37-checkpoints.md", "检查点"],
      ["38-plugins-reference.md", "插件参考手册"],
      ["39-getting-started-practice.md", "实战入门"],
      ["40-chrome.md", "Chrome"],
      ["41-parallel-tasks.md", "并行任务"],
      ["42-env-vars.md", "环境变量"],
      ["43-git-workflow.md", "Git 工作流"],
      ["44-github-actions.md", "GitHub Actions"],
      ["45-agent-sdk.md", "Agent SDK"],
      ["46-dev-config.md", "开发配置"],
      ["47-voice.md", "Voice 语音模式"],
      ["48-capstone-project.md", "综合实战"],
      ["49-best-practices.md", "最佳实践"],
      ["50-anti-patterns.md", "反模式"],
      ["51-troubleshooting.md", "常见问题排查"],
      ["52-glossary.md", "术语表"],
      ["53-remotion-video.md", "制作视频"]
    ]
  },
  vibecoding: {
    label: "VibeCoding 实战",
    base: "vibecoding",
    docs: [
      ["01-ai-concepts.md", "一篇文章帮你搞清楚 AI 核心概念"]
    ]
  }
};

const articleNav = document.querySelector("#articleNav");
const content = document.querySelector("#content");
const loading = document.querySelector("#loading");
const pager = document.querySelector("#pager");
const toc = document.querySelector("#toc");
const searchInput = document.querySelector("#searchInput");
const sectionSelector = document.querySelector("#sectionSelector");

let activeSection = "vibecoding";
let activePath = "";

let expandedCategories = JSON.parse(localStorage.getItem("expanded-categories") || "{}");

const categories = {
  codex: [
    { name: "基础入门", range: [0, 5] },
    { name: "多端入口详解", range: [6, 9] },
    { name: "日常开发与指令", range: [10, 13] },
    { name: "安全与权限配置", range: [14, 15] },
    { name: "工具与 Agent 扩展", range: [16, 23] },
    { name: "团队与自动化", range: [24, 28] },
    { name: "实战与最佳实践", range: [29, 38] }
  ],
  claude: [
    { name: "基础入门", range: [0, 6] },
    { name: "多端集成", range: [7, 10] },
    { name: "开发与指令", range: [11, 16] },
    { name: "上下文与安全", range: [17, 20] },
    { name: "工具与 Agent 扩展", range: [21, 28] },
    { name: "配置与高级控制", range: [29, 37] },
    { name: "实战与生产应用", range: [38, 52] }
  ],
  vibecoding: [
    { name: "AI 基础认知", range: [0, 0] }
  ]
};

function allDocs(sectionKey = activeSection) {
  const section = sections[sectionKey];
  return section.docs.map((doc, index) => ({
    section: sectionKey,
    base: section.base,
    file: doc[0],
    title: doc[1],
    index,
    path: `${section.base}/${doc[0]}`
  }));
}

function routeFromHash() {
  const route = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  if (!route) return "vibecoding/01-ai-concepts.md";
  return route.endsWith(".md") ? route : `${route}.md`;
}

function docFromPath(path) {
  return Object.keys(sections).flatMap(allDocs).find((doc) => doc.path === path);
}

function setRoute(path) {
  if (routeFromHash() !== path) location.hash = `/${path}`;
}

function renderNav() {
  const query = searchInput.value.trim().toLowerCase();
  const docs = allDocs(activeSection);
  const sectionCats = categories[activeSection];
  
  let html = "";
  
  sectionCats.forEach((cat) => {
    const catDocs = docs.slice(cat.range[0], cat.range[1] + 1).filter((doc) => {
      if (!query) return true;
      return doc.title.toLowerCase().includes(query) || doc.file.toLowerCase().includes(query);
    });
    
    if (catDocs.length > 0) {
      const catKey = `${activeSection}-${cat.name}`;
      const hasActiveDoc = catDocs.some(d => d.path === activePath);
      const isExpanded = (!!expandedCategories[catKey] || hasActiveDoc) || !!query;
      const collapsedClass = isExpanded ? "" : " collapsed";
      
      html += `
        <div class="nav-category${collapsedClass}" data-cat-name="${cat.name}">
          <div class="nav-category-title">
            <svg class="chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span>${cat.name}</span>
          </div>
          <div class="nav-category-list">
            <div class="nav-category-inner-list">
              ${catDocs.map((doc) => {
                const chapter = String(doc.index + 1).padStart(2, "0");
                const active = doc.path === activePath ? " active" : "";
                return `
                  <a class="nav-link${active}" href="#/${doc.path}">
                    <span class="nav-index">${chapter}</span>
                    <span class="nav-title">${escapeHtml(doc.title)}</span>
                  </a>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      `;
    }
  });
  
  articleNav.innerHTML = html;
}

function setActiveSection(sectionKey) {
  activeSection = sectionKey;
  if (sectionSelector) sectionSelector.value = sectionKey;
  renderNav();
}

async function loadArticle(path) {
  const doc = docFromPath(path) || allDocs("vibecoding")[0];
  activePath = doc.path;
  setActiveSection(doc.section);
  loading.style.display = "block";
  content.innerHTML = "";
  pager.innerHTML = "";
  toc.innerHTML = "";

  try {
    const response = await fetch(doc.path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    document.title = `${doc.title} - AI 编程指南`;
    content.innerHTML = markdownToHtml(markdown, doc.base);
    decorateHeadings();
    renderToc();
    renderPager(doc);
    loading.style.display = "none";
    content.focus({ preventScroll: true });
    document.querySelector(".reader").scrollTo({ top: 0, behavior: "instant" });
    renderNav();
  } catch (error) {
    loading.style.display = "none";
    content.innerHTML = `
      <h1>这篇没打开</h1>
      <p>本地文件读取失败。你可以先确认服务还在运行，再刷新页面。</p>
      <pre><code>${escapeHtml(String(error))}</code></pre>
    `;
  }
}

function markdownToHtml(markdown, basePath) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCode = false;
  let codeLines = [];
  let paragraph = [];
  let listType = "";
  let listItems = [];
  let blockquote = [];
  let table = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inline(paragraph.join(" "), basePath)}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!listItems.length) return;
    html.push(`<${listType}>${listItems.map((item) => `<li>${inline(item, basePath)}</li>`).join("")}</${listType}>`);
    listItems = [];
    listType = "";
  }

  function flushQuote() {
    if (!blockquote.length) return;
    html.push(`<blockquote>${markdownToHtml(blockquote.join("\n"), basePath)}</blockquote>`);
    blockquote = [];
  }

  function flushTable() {
    if (!table.length) return;
    const rows = table.filter((row) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(row));
    if (!rows.length) {
      table = [];
      return;
    }
    const rendered = rows.map((row, index) => {
      const cells = row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => inline(cell.trim(), basePath));
      const tag = index === 0 ? "th" : "td";
      return `<tr>${cells.map((cell) => `<${tag}>${cell}</${tag}>`).join("")}</tr>`;
    }).join("");
    html.push(`<table>${rendered}</table>`);
    table = [];
  }

  function flushAll() {
    flushParagraph();
    flushList();
    flushQuote();
    flushTable();
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        inCode = false;
        codeLines = [];
      } else {
        flushAll();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    if (/^\s*\|.+\|\s*$/.test(line)) {
      flushParagraph();
      flushList();
      flushQuote();
      table.push(line);
      continue;
    }

    flushTable();

    if (/^---+$/.test(line.trim())) {
      flushAll();
      html.push("<hr>");
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      blockquote.push(line.replace(/^>\s?/, ""));
      continue;
    }

    flushQuote();

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2], basePath)}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? "ul" : "ol";
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered || ordered)[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushAll();
  if (inCode) html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  return html.join("\n");
}

function inline(text, basePath) {
  let output = escapeHtml(text);
  output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, href) => {
    const src = normalizeUrl(href, basePath);
    return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}">`;
  });
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const url = normalizeUrl(href, basePath);
    const external = /^https?:\/\//.test(url) ? ' target="_blank" rel="noreferrer"' : "";
    return `<a href="${escapeAttribute(url)}"${external}>${label}</a>`;
  });
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return output;
}

function normalizeUrl(url, basePath) {
  if (/^(https?:)?\/\//.test(url) || url.startsWith("#") || url.startsWith("/")) return url;
  if (url.startsWith("./")) return url.slice(2);
  if (url.endsWith(".md")) return `#/${basePath}/${url}`;
  return `${basePath}/${url}`.replace(/\/\.\//g, "/");
}

function decorateHeadings() {
  const used = new Set();
  content.querySelectorAll("h1, h2, h3").forEach((heading) => {
    let id = heading.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
    if (!id) id = "section";
    let unique = id;
    let count = 2;
    while (used.has(unique)) unique = `${id}-${count++}`;
    used.add(unique);
    heading.id = unique;
  });
}

function renderToc() {
  const headings = Array.from(content.querySelectorAll("h2, h3"));
  toc.innerHTML = headings.map((heading) => {
    const level = heading.tagName === "H3" ? "level-3" : "level-2";
    return `<a class="${level}" href="#${heading.id}">${escapeHtml(heading.textContent)}</a>`;
  }).join("") || '<span class="toc-empty">暂无章节</span>';
}

function renderPager(doc) {
  const docs = allDocs(doc.section);
  const previous = docs[doc.index - 1];
  const next = docs[doc.index + 1];
  pager.innerHTML = [
    previous ? `<a href="#/${previous.path}"><small>上一篇</small><span>${escapeHtml(previous.title)}</span></a>` : "<span></span>",
    next ? `<a class="pager-next" href="#/${next.path}"><small>下一篇</small><span>${escapeHtml(next.title)}</span></a>` : "<span></span>"
  ].join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

if (sectionSelector) {
  sectionSelector.addEventListener("change", () => {
    const section = sectionSelector.value;
    setActiveSection(section);
    setRoute(allDocs(section)[0].path);
  });
}

searchInput.addEventListener("input", renderNav);
window.addEventListener("hashchange", () => loadArticle(routeFromHash()));

loadArticle(routeFromHash());

// --- 阅读器偏好设置管理 ---
const settingsToggleBtn = document.getElementById("settingsToggleBtn");
const settingsDropdown = document.getElementById("settingsDropdown");

let preferences = {
  theme: localStorage.getItem("reader-theme") || "forest-dark",
  font: localStorage.getItem("reader-font") || "sans",
  size: localStorage.getItem("reader-size") || "md"
};

function applyPreferences() {
  // 主题切换
  const themes = ["forest-dark", "deep-dark", "forest-light"];
  themes.forEach(t => {
    document.documentElement.classList.toggle(`theme-${t}`, preferences.theme === t);
  });
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === preferences.theme);
  });

  // 字体切换
  document.documentElement.classList.toggle("font-serif", preferences.font === "serif");
  document.documentElement.classList.toggle("font-sans", preferences.font === "sans");
  document.querySelectorAll(".font-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.font === preferences.font);
  });

  // 字号切换
  const sizes = ["sm", "md", "lg"];
  sizes.forEach(s => {
    document.documentElement.classList.toggle(`size-${s}`, preferences.size === s);
  });
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === preferences.size);
  });
}

// 页面加载时应用偏好
applyPreferences();

// 控制下拉菜单展开/折叠
settingsToggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsDropdown.classList.toggle("show");
  settingsToggleBtn.classList.toggle("active");
});

// 点击空白区域关闭菜单
document.addEventListener("click", (e) => {
  if (!settingsDropdown.contains(e.target) && e.target !== settingsToggleBtn && !settingsToggleBtn.contains(e.target)) {
    settingsDropdown.classList.remove("show");
    settingsToggleBtn.classList.remove("active");
  }
});

// 选项点击事件绑定
document.querySelectorAll(".theme-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    preferences.theme = btn.dataset.theme;
    localStorage.setItem("reader-theme", preferences.theme);
    applyPreferences();
  });
});

document.querySelectorAll(".font-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    preferences.font = btn.dataset.font;
    localStorage.setItem("reader-font", preferences.font);
    applyPreferences();
  });
});

document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    preferences.size = btn.dataset.size;
    localStorage.setItem("reader-size", preferences.size);
    applyPreferences();
  });
});

// 目录分类折叠点击处理（事件委托）
articleNav.addEventListener("click", (e) => {
  const title = e.target.closest(".nav-category-title");
  if (!title) return;
  
  const category = title.closest(".nav-category");
  if (!category) return;
  
  const catName = category.dataset.catName;
  const catKey = `${activeSection}-${catName}`;
  
  const isCollapsed = category.classList.toggle("collapsed");
  expandedCategories[catKey] = !isCollapsed;
  localStorage.setItem("expanded-categories", JSON.stringify(expandedCategories));
});

