document.addEventListener("DOMContentLoaded", () => {
  /* ano rodapé */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* cargo */
  const roleEl = document.getElementById("roleText");
  if (roleEl) roleEl.textContent = "Front-end Developer";

  /* navegação abas */
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  const sidebar = document.getElementById("sidebar");

  function activateSection(id) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.section === id));
    panels.forEach((p) => p.classList.toggle("active", p.id === id));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.section;
      activateSection(id);
      history.replaceState(null, "", "#" + id);
      document
        .querySelector(".content")
        .scrollTo({ top: 0, behavior: "smooth" });
      sidebar.classList.remove("open");
    });
  });

  const initial = window.location.hash.replace("#", "");
  if (initial && document.getElementById(initial)) {
    activateSection(initial);
  }

  /* menu celular */
  const toggleBtn = document.getElementById("sidebarToggle");
  toggleBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

  document.addEventListener("click", (e) => {
    if (window.innerWidth > 840) return;
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });

  /* filtro de projetos */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });
});
