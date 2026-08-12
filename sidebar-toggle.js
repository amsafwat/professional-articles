(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const activeLink = document.querySelector('#mdbook-sidebar a.active');
        if (!activeLink) {
            return;
        }

        const chapterItem = activeLink.closest('li.chapter-item');
        if (!chapterItem) {
            return;
        }

        const onThisPage = chapterItem.querySelector('.on-this-page');
        if (!onThisPage) {
            return;
        }

        function setCollapsed(collapsed) {
            onThisPage.hidden = collapsed;
            chapterItem.classList.toggle('article-headings-collapsed', collapsed);
            activeLink.setAttribute('aria-expanded', String(!collapsed));
            activeLink.title = collapsed
                ? 'Click to expand article sections'
                : 'Click again to collapse article sections';
        }

        setCollapsed(false);

        activeLink.addEventListener('click', (event) => {
            const destination = new URL(activeLink.href, window.location.href);
            const current = new URL(window.location.href);

            if (destination.pathname !== current.pathname) {
                return;
            }

            event.preventDefault();
            setCollapsed(!chapterItem.classList.contains('article-headings-collapsed'));
        });
    });
})();
