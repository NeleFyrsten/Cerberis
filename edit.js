/** Animation når man skifter tilstand tab.
 * - Hvilken tab blev klikket på?
 * - hvilken tab kommer vi fra?
 * - hvilken keyframes animation har vi så brug for?
 */


// få fat i de enkelte tabs og sæt en eventlistener på hver enkelt
const modesTabs = document.querySelectorAll('.modesTabs__item');
console.log(modesTabs);
modesTabs.forEach(tab => {
    tab.addEventListener('click', changeTab)
    }
)  

// få fat i baggrundskassen og finde ud af, hvor den er lige nu 
const activeTab = document.querySelector('.modesTabs__active');


// hvad er den nye left position?
let activeTab__new = "0"



function changeTab(tab) {
    // finde ud af, på hvilken tab brugeren har trykket
    const target = tab.target;
    console.log(target);

    // hvilken position har active-kassen på det tidspunkt jeg klikker? 
    // -> left positionen ligger i en variabel i css, fordi det er meget nemmere at få value og at skift den
    // SKAL være inde i denne funktion, fordi værdien ellers altid er 0 -> opdaterer sig ikke udenfor funktionen
    const activePosition = getComputedStyle(document.documentElement).getPropertyValue('--tab__active--left');

    // køre en ny funktion, afhængig af click-event
    // ny: asleep
    if (target.classList.contains('modesTabs__item--asleep')){

        changeToAsleep(activePosition);
    }
    //ny: atHome
    if (target.classList.contains('modesTabs__item--atHome')){

        changeToAthome(activePosition);
    }
    //ny: away
    if (target.classList.contains('modesTabs__item--away')){

        changeToAway(activePosition);
    }
}

function changeToAsleep(activePosition) {
    // atHome --> asleep
    if (activePosition == "0"){
        activeTab.classList.add('homeToSleep') // for at få den rette transition
        // tilpas den nye position og overdrage det til css variabel
        activeTab__new = "33.33%"
        document.documentElement.style.setProperty('--tab__active--leftNEW', activeTab__new)
        console.log (getComputedStyle(document.documentElement).getPropertyValue('--tab__active--leftNEW'));
    
        // animationen tager 0.5s -> tilpasning af activePosition skal vente, fordi den ellers allerede havde den ny
        //value inden animationen starter -> ergo: ingen animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--tab__active--left', activeTab__new)
            console.log(activePosition);
            activeTab.classList.remove('homeToSleep');
         }, 500)
    }
    
    // away --> asleep
    if (activePosition == '66.66%'){
        activeTab.classList.add('awayToSleep') // for at få den rette transition
    
        // tilpas den nye position og overdrage det til css variabel
        activeTab__new = "33.33%"
        document.documentElement.style.setProperty('--tab__active--leftNEW', activeTab__new)
        console.log (getComputedStyle(document.documentElement).getPropertyValue('--tab__active--leftNEW'));
    
        // animationen tager 1s -> tilpasning af activePosition skal vente, fordi den ellers allerede havde den ny
        //value inden animationen starter -> ergo: ingen animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--tab__active--left', activeTab__new)
            console.log(activePosition)
            activeTab.classList.remove('awayToSleep');
         }, 500)
    }
}

function changeToAthome(activePosition) {
    // asleep --> athome
    if (activePosition == '33.33%' ){
        activeTab.classList.add('sleepToHome') // for at få den rette transition

        // tilpas den nye position og overdrage det til css variabel
        activeTab__new = "0"
        document.documentElement.style.setProperty('--tab__active--leftNEW', activeTab__new)
        console.log (getComputedStyle(document.documentElement).getPropertyValue('--tab__active--leftNEW'));
    
        // animationen tager 1s -> tilpasning af activePosition skal vente, fordi den ellers allerede havde den ny
        //value inden animationen starter -> ergo: ingen animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--tab__active--left', activeTab__new)
            console.log(activePosition);
            activeTab.classList.remove('sleepToHome');
         }, 500)
    }
    
    // away --> athome
    if (activePosition == '66.66%'){
        activeTab.classList.add('awayToHome') // for at få den rette transition
    
        // tilpas den nye position og overdrage det til css variabel
        activeTab__new = "0"
        document.documentElement.style.setProperty('--tab__active--leftNEW', activeTab__new)
        console.log (getComputedStyle(document.documentElement).getPropertyValue('--tab__active--leftNEW'));
    
        // animationen tager 1s -> tilpasning af activePosition skal vente, fordi den ellers allerede havde den ny
        //value inden animationen starter -> ergo: ingen animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--tab__active--left', activeTab__new)
            console.log(activePosition);
            activeTab.classList.remove('awayToHome');
         }, 500)
    }
}

function changeToAway(activePosition) {
    // asleep --> away
    
    if (activePosition == '33.33%'){
        activeTab.classList.add('sleepToAway') // for at få den rette transition

        // tilpas den nye position og overdrage det til css variabel
        activeTab__new = "66.66%"
        document.documentElement.style.setProperty('--tab__active--leftNEW', activeTab__new)
        console.log (getComputedStyle(document.documentElement).getPropertyValue('--tab__active--leftNEW'));
    
        // animationen tager 1s -> tilpasning af activePosition skal vente, fordi den ellers allerede havde den ny
        //value inden animationen starter -> ergo: ingen animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--tab__active--left', activeTab__new)
            console.log(activePosition);
            activeTab.classList.remove('sleepToAway');
         }, 500)
        
    }
    
    // athome --> away
    if (activePosition == '0'){
        activeTab.classList.add('homeToAway') // for at få den rette transition
    
        // tilpas den nye position og overdrage det til css variabel
        activeTab__new = "66.66%"
        document.documentElement.style.setProperty('--tab__active--leftNEW', activeTab__new)
        console.log (getComputedStyle(document.documentElement).getPropertyValue('--tab__active--leftNEW'));
    
        // animationen tager 1s -> tilpasning af activePosition skal vente, fordi den ellers allerede havde den ny
        //value inden animationen starter -> ergo: ingen animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--tab__active--left', activeTab__new)
            console.log(activePosition);
            activeTab.classList.remove('homeToAway');
         }, 500)
    }
}


/**________________________________________
 *           SKIFT INDHOLD
   ________________________________________*/

   const content = document.querySelector('.editSchedule__content');
    console.log(content);
   //få fat i alle buttons og tilføj eventlisteners
   const buttons__edit = document.querySelectorAll('.button__primary--big')
   console.log(buttons__edit[1]);
   
   const button__openEditModes = buttons__edit[1];
   button__openEditModes.addEventListener('click', openEditModes);

//    const button__back = document.querySelector('.button__back');
//    button__back.addEventListener('click', goPageBack)

//    const button__forth = document.querySelector('.button__forth');
//    button__forth.addEventListener('click', goPageForth);

    const aside = content.parentNode;

   // edit --> editMode-1
   function openEditModes() {
        
        // opret modesTabs
        const modesTabs = document.createElement('nav');
        modesTabs.classList.add('modesTabs')

        const tabsAthome = document.createElement('li');
        tabsAthome.classList.add('modesTabs__item', 'modesTabs__item--atHome');
        tabsAthome.textContent = 'At Home';

        const tabsAsleep = document.createElement('li');
        tabsAsleep.classList.add('modesTabs__item', 'modesTabs__item--asleep');
        tabsAsleep.textContent = 'Asleep';

        const tabsAway = document.createElement('li');
        tabsAway.classList.add('modesTabs__item', 'modesTabs__item--away');
        tabsAway.textContent = 'Away';

        const tabsActive = document.createElement('span');
        tabsActive.classList.add('modesTabs__active');

        modesTabs.appendChild(tabsAthome);
        modesTabs.appendChild(tabsAthome);
        modesTabs.appendChild(tabsAthome);
        modesTabs.appendChild(tabsActive);

        
        
        aside.insertBefore(modesTabs, content);

        //skift content
        // fetch html fil 
        fetch('html/editMode-1.html')
        .then((response) => {
            // if (!response.ok) {
            //     throw new Error(`HTTP Error! Status: ${response.status}`);
            // }
            return response.text();
        })
        .then((htmlString) => {
            console.log(htmlString);
            //create html out of string
            const newHTML = document.createRange().createContextualFragment(htmlString);
            content.innerHTML = "";
            content.appendChild(newHTML);

        })
        .catch((error) => {
            console.error("Error:", error);
        });
   }

