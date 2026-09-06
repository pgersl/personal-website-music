document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const navLinks = document.querySelectorAll("a.nav-link");
    navLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });

    const navCard = document.getElementById("nav-card");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navIconOpen = document.getElementById("nav-icon-open");
    const navIconClose = document.getElementById("nav-icon-close");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("flex");
            navMenu.classList.toggle("hidden", !isOpen);
            navIconOpen.classList.toggle("hidden", isOpen);
            navIconClose.classList.toggle("hidden", !isOpen);
            navCard.classList.toggle("rounded-full", !isOpen);
            navCard.classList.toggle("rounded-3xl", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => navToggle.click());
        });
    }

    // Works dropdown: hover already opens it on mouse/trackpad devices (CSS,
    // scoped to `@media (hover: hover)` by Tailwind). Touch devices have no
    // hover, so give the trigger an explicit tap-to-toggle fallback.
    const worksTrigger = document.getElementById("works-trigger");
    const worksDropdown = document.getElementById("works-dropdown");

    if (worksTrigger && worksDropdown) {
        const setOpen = isOpen => {
            worksDropdown.classList.toggle("invisible", !isOpen);
            worksDropdown.classList.toggle("opacity-0", !isOpen);
            worksDropdown.classList.toggle("translate-y-1", !isOpen);
            worksDropdown.classList.toggle("visible", isOpen);
            worksDropdown.classList.toggle("opacity-100", isOpen);
            worksDropdown.classList.toggle("translate-y-2", isOpen);
            worksTrigger.setAttribute("aria-expanded", String(isOpen));
        };

        worksTrigger.addEventListener("click", e => {
            e.stopPropagation();
            setOpen(worksTrigger.getAttribute("aria-expanded") !== "true");
        });

        document.addEventListener("click", e => {
            if (!worksTrigger.contains(e.target) && !worksDropdown.contains(e.target)) {
                setOpen(false);
            }
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") setOpen(false);
        });

        worksDropdown.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => setOpen(false));
        });
    }
});
