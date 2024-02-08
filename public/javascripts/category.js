document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll('.tool');
    const buttons = document.querySelectorAll('.category-btn');

    function showCategory(category) {
        categories.forEach(tool => {
            const toolCategory = tool.getAttribute('data-category');
            if (category === 'All' || toolCategory === category) {
                tool.style.display = 'block';
            } else {
                tool.style.display = 'none';
            }
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const category = event.target.getAttribute('data-category');
            showCategory(category);
        });
    });
});