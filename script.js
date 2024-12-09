const menu = document.querySelector('.menu');
const burgerMenuButton = document.querySelector('.menu__burgerMenu');
const editSchedule = document.querySelector('.editSchedule');

// Listen for a click event on the burger menu button
burgerMenuButton.addEventListener('click', () => {
    // Check if the menu is hidden
    if (menu.style.transform === "translateX(-95%)" || menu.style.transform === "") {
        menu.style.transform = "translateX(0)";  // If hidden, slide the menu out 
        
        // Apply translateX to aside to move it to the right when the menu opens
        editSchedule.style.transform = "translateX(60%)";  // Only horizontal move
    } else {
        menu.style.transform = "translateX(-95%)";  // If visible, slide the menu back in 
        
        // Reset the position of aside when menu is closed
        editSchedule.style.transform = "translateX(0)";  // Move the aside back to the left
    }
});

