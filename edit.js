// tab animation: hvad er den nye left position?
let activeTab__new = "0"

/**________________________________________
 *           SKIFT INDHOLD
   ________________________________________*/

// få fat i content section, hvor indholdet skal sættes ind
const content = document.querySelector('.editSchedule__content');
console.log(content);
//få fat i parent elementet, så tabs kan sættes ind før content sektion
const aside = content.parentNode;

// load index html
fetchIndexHTML()


//          fetch funktioner for at loade indholdet
//___________________________________________________________

function fetchIndexHTML() {
    //hent filen --> return er en string
    fetch('html/edit.html')
        .then((response) => {
            // if (!response.ok) {
            //     throw new Error(`HTTP Error! Status: ${response.status}`);
            // }
            return response.text();
        })
        .then((htmlString) => {
            console.log(htmlString);
            // lave string om til html
            const newHTML = document.createRange().createContextualFragment(htmlString);
            //slet det nuværende indhold og erstat det med det nye
            content.innerHTML = "";
            content.appendChild(newHTML);
    
            // tilføj en klasse, så det er klart hvilken side er aktiv
            content.classList.add('content--edit')

            // få fat i buttons på editsiden. [1], fordi vi kun har brug for button no. 2
            // skal være herinde, fordi den ellers allerede søger efter knapperne, 
            // når siden ikke endnu er loadet.
            const buttons__edit = content.querySelectorAll('button');
            console.log(buttons__edit);
            
            const button__openEditModes = buttons__edit[1];
            button__openEditModes.addEventListener('click', openEditModes);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function fetchEditMode1() {
    // fetch html fil -> her får vi en string tilbage
    fetch('html/editMode-1.html')
    .then((response) => {
        // if (!response.ok) {
        //     throw new Error(`HTTP Error! Status: ${response.status}`);
        // }
        return response.text();
    })
    .then((htmlString) => {
        console.log(htmlString);
        // lave htmlstring om til html kode
        const newHTML = document.createRange().createContextualFragment(htmlString);
        //slet det nuværende indhold og erstat det med det nye
        content.innerHTML = "";
        content.appendChild(newHTML);

        // få fat i buttons på editMode-1 siden 
        // skal være herinde, fordi den ellers allerede søger efter knapperne, 
            // når siden ikke endnu er loadet.
        const button__back = document.querySelector('.button__back');
        button__back.addEventListener('click', goPageBack)
    
        const button__forth = document.querySelector('.button__forth');
        button__forth.addEventListener('click', goPageForth);
        
    })
    .catch((error) => {
        console.error("Error:", error);
    });

}

function fetchEditMode2() {
    //skift content
    // fetch html fil -> her får vi en string
    fetch('html/editMode-2.html')
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
        
        // få fat i knapperne på editMode-2 siden
        const button__back = document.querySelector('.button__back');
        button__back.addEventListener('click', goPageBack)
     
        const button__forth = document.querySelector('.button__forth');
        button__forth.addEventListener('click', goPageForth);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

}

    

// edit --> editMode-1
function openEditModes() {
    // opret modesTabs
    const modesTabs = document.createElement('nav');
    modesTabs.classList.add('modesTabs')

    const tabsAthome = document.createElement('li');
    tabsAthome.classList.add('modesTabs__item', 'modesTabs__item--atHome');
    tabsAthome.textContent = 'At Home';
    tabsAthome.addEventListener('click', changeTab);

    const tabsAsleep = document.createElement('li');
    tabsAsleep.classList.add('modesTabs__item', 'modesTabs__item--asleep');
    tabsAsleep.textContent = 'Asleep';
    tabsAsleep.addEventListener('click', changeTab);

    const tabsAway = document.createElement('li');
    tabsAway.classList.add('modesTabs__item', 'modesTabs__item--away');
    tabsAway.textContent = 'Away';
    tabsAway.addEventListener('click', changeTab);

    const tabsActive = document.createElement('span');
    tabsActive.classList.add('modesTabs__active');

    modesTabs.appendChild(tabsAthome);
    modesTabs.appendChild(tabsAsleep);
    modesTabs.appendChild(tabsAway);
    modesTabs.appendChild(tabsActive);

    //tilføj en ekstra class, så vi ved, hvilken indholdsside er aktiv
    content.classList.add('content--rooms')
    content.classList.remove('content--edit')
    
    // tilføj tabsene 
    aside.insertBefore(modesTabs, content);
    
    //kald funktionen for at hente editMode-1
    fetchEditMode1();
}

function goPageBack() {
/** mulighed 1: editMode-2 --> editMode-1
 *  mulighed 2: editMode-1 --> index
 * --> vi skal finde ud af hvor vi er henne
 */
const modesTabs = document.querySelector('.modesTabs')

    // editMode1 --> index
    if(content.classList.contains('content--rooms')) {
        //fjern tabs
        modesTabs.remove();
        
        content.classList.remove('content--rooms')
        content.classList.add('content--edit')
        
        // hent edit indhold
        fetchIndexHTML()
    }
    // editMode2 --> editMode1
    else if(content.classList.contains('content--temperature')) {
        //tilpas tabs
        modesTabs.classList.remove('modesTabs--single')
        const tab__atHome = document.querySelector('.modesTabs__item--atHome');
        const tab__asleep = document.querySelector('.modesTabs__item--asleep');
        const tab__away = document.querySelector('.modesTabs__item--away')

        tab__atHome.style.display = 'block';
        tab__asleep.style.display = 'block';
        tab__away.style.display = 'block';


        content.classList.remove('content--temperature')
        content.classList.add('content--rooms')

        fetchEditMode1()
    }
}

function goPageForth() {
    
    const modesTabs = document.querySelector('.modesTabs')

    // editMode1 --> editMode2
    if(content.classList.contains('content--rooms')) {
        //tilpas tabs, så der kun vises den aktive tab pa edit page 2
        modesTabs.classList.add('modesTabs--single')
        //få at vide hvilken tab er aktiv
        const activePosition = getComputedStyle(document.documentElement).getPropertyValue('--tab__active--left');
        const tab__atHome = document.querySelector('.modesTabs__item--atHome');
        const tab__asleep = document.querySelector('.modesTabs__item--asleep');
        const tab__away = document.querySelector('.modesTabs__item--away')

        if (activePosition == '0') { // == at home er aktiv
            tab__asleep.style.display = 'none';
            tab__away.style.display = 'none';
        }
        else if (activePosition == '33.33%') { // == at home er aktiv
            tab__atHome.style.display = 'none';
            tab__away.style.display = 'none';
        }
        else if (activePosition == '66.66%') { // == at home er aktiv
            tab__atHome.style.display = 'none';
            tab__asleep.style.display = 'none';
        }

        content.classList.remove('content--rooms', 'content--edit')
        content.classList.add('content--temperature')


        fetchEditMode2()
        
    }
    //editMode2 --> edit
    else if(content.classList.contains('content--temperature')) {
        modesTabs.remove();

        content.classList.remove('content--temperature')
        content.classList.add('content--edit')


        fetchIndexHTML();
    }
} 


/**_______________________________________
 *           TAB ANIMATION
   _______________________________________*/
/** Animation når man skifter tilstand tab.
 * - Hvilken tab blev klikket på?
 * - hvilken tab kommer vi fra?
 * - hvilken keyframes animation har vi så brug for?
 */

//eventlisteners til hvert enkelt tab blev allerede oprettet samtidig med 
    //selve elementet på openEditMode1()
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
    // få fat i baggrundskassen, så den kan få en ny class
    const activeTab = document.querySelector('.modesTabs__active');
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
     // få fat i baggrundskassen og finde ud af, hvor den er lige nu 
     const activeTab = document.querySelector('.modesTabs__active');
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
     // få fat i baggrundskassen og finde ud af, hvor den er lige nu 
     const activeTab = document.querySelector('.modesTabs__active');
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