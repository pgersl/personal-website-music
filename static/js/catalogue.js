document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("catalogue-search");
    const yearTabs = document.querySelectorAll(".year-tab");
    const yearGroups = document.querySelectorAll(".catalogue-year-group");
    const noResults = document.getElementById("no-results");

    let currentYear = "all";
    let currentQuery = "";

    function filter() {
        let visibleCount = 0;

        yearGroups.forEach(group => {
            const groupYear = group.getAttribute("data-year");
            const yearMatches = currentYear === "all" || groupYear === currentYear;

            if (!yearMatches) {
                group.style.display = "none";
                return;
            }

            let groupHasVisibleItem = false;

            group.querySelectorAll(".opus-group").forEach(opusGroup => {
                let opusGroupHasVisibleItem = false;
                opusGroup.querySelectorAll(".filter-item").forEach(item => {
                    const matches = item.getAttribute("data-search").includes(currentQuery);
                    item.style.display = matches ? "" : "none";
                    if (matches) opusGroupHasVisibleItem = true;
                });
                opusGroup.style.display = opusGroupHasVisibleItem ? "" : "none";
                if (opusGroupHasVisibleItem) groupHasVisibleItem = true;
            });

            group.querySelectorAll(":scope > div > a.filter-item").forEach(item => {
                const matches = item.getAttribute("data-search").includes(currentQuery);
                item.style.display = matches ? "" : "none";
                if (matches) groupHasVisibleItem = true;
            });

            group.style.display = groupHasVisibleItem ? "" : "none";
            if (groupHasVisibleItem) visibleCount++;
        });

        noResults.classList.toggle("hidden", visibleCount !== 0);
    }

    searchInput.addEventListener("input", e => {
        currentQuery = e.target.value.toLowerCase().trim();
        filter();
    });

    yearTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            yearTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentYear = tab.getAttribute("data-year");
            filter();
        });
    });
});
