document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.content-container');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const answer = accordion.querySelector('.answer');
            
            // Collapse all open accordions before expanding the clicked one
            accordions.forEach(item => {
                if (item !== accordion) {
                    item.classList.remove('active');
                    const itemAnswer = item.querySelector('.answer');
                    itemAnswer.style.maxHeight = null;
                    itemAnswer.style.opacity = null;
                    itemAnswer.style.paddingTop = null;
                }
            });

            // Toggle the clicked accordion
            accordion.classList.toggle('active');
            
            // Smooth height transition
            // Remove max-height to let the content expand naturally
            if (accordion.classList.contains('active')) {
                // answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.maxHeight = "none";
                answer.style.opacity = "1";
                answer.style.paddingTop = "15px"; // Add padding for spacing
            } else {
                answer.style.maxHeight = null;
                answer.style.opacity = "0";
                answer.style.paddingTop = null;
            }
        });
    });
});