document.addEventListener('DOMContentLoaded', () => {
    const filter = document.getElementById('filter');
    const filterItems = document.querySelectorAll('.filter-item');
    const noResults = document.getElementById('no-results');
    if (!filter) return;

    filter.addEventListener('input', e => {
        const val = e.target.value.toLowerCase().trim();
        let visibleCount = 0;
        filterItems.forEach(item => {
            const haystack = item.getAttribute('data-search') || item.textContent.toLowerCase();
            const matches = haystack.includes(val);
            item.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
        });
        if (noResults) noResults.classList.toggle('hidden', visibleCount !== 0);
    });
});
