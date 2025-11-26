// Array of objects to create cards
const cardsData = [
  {
    id: 1,
    title: "Modern Conference Hall",
    date: new Date("2025-01-14"),
    description: "A sleek and modern conference hall prepared for a tech event.",
    category: "events",
    image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
  },
  {
    id: 2,
    title: "Team Brainstorming",
    date: new Date("2025-02-02"),
    description: "A creative team collaborating on a new project around a large table.",
    category: "work",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093"
  },
  {
    id: 3,
    title: "Developer Workspace",
    date: new Date("2025-01-20"),
    description: "Minimalist desk setup ideal for software development and productivity.",
    category: "tech",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    id: 4,
    title: "Audience at Presentation",
    date: new Date("2025-03-11"),
    description: "Audience paying attention during a keynote session.",
    category: "events",
    image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479"
  },
  {
    id: 5,
    title: "Coding Session",
    date: new Date("2025-01-09"),
    description: "Developer writing code on multiple monitors with focused lighting.",
    category: "tech",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: 6,
    title: "Networking Event",
    date: new Date("2025-04-01"),
    description: "Professionals exchanging ideas and creating new opportunities.",
    category: "business",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
  },
  {
    id: 7,
    title: "Workshop in Progress",
    date: new Date("2025-02-28"),
    description: "Hands-on workshop session with participants actively engaging.",
    category: "education",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984"
  },
  {
    id: 8,
    title: "Creative Studio",
    date: new Date("2025-01-30"),
    description: "A vibrant creative workspace filled with tools, notebooks, and inspiration.",
    category: "design",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  {
    id: 9,
    title: "Public Talk",
    date: new Date("2025-03-20"),
    description: "A speaker delivering an inspiring message to a large audience.",
    category: "events",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    id: 10,
    title: "Tech Expo Booth",
    date: new Date("2025-04-18"),
    description: "Futuristic tech booth showcasing new innovations.",
    category: "expo",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop"
  }
];

/**
 * DOM References
 */
let container = document.querySelector('#container');
let testForm = document.querySelector('#testForm');
const cardTemplate = document.querySelector('#card-template');

/**
 * EVENT DELEGATION LISTENERS
 */
container.addEventListener('click', function(event) {
  const target = event.target;

  const card = target.closest('.card');
  const cardId = card.getAttribute('id');

  if(target.classList.contains('card-read-button')) {
    readMore(cardId);
  } else if (target.classList.contains('card-share-button')) {
    share(cardId);
  } else if (target.classList.contains('card-delete-button')) {
    deleteCard(cardId);
  }
})


/**
 * FUNCTION TO REDER ALL THE CARDS
 */
function renderCards(cardsData) {
    // step 1: Clean the container content
    container.innerHTML = '';

    // step 2: iterate over each array object
    cardsData.forEach( cardData => {
        const card = createCard(cardData);
        container.appendChild(card);
    });

    console.log("All the cards has been renderized");
}

/**
 * FUNCTION TO CREATE A SINGLE CARD
 */
function createCard(cardData) {
    // step 1: clone the template
    const clone = cardTemplate.content.cloneNode(true)

    // step 2: Fill the clone content with my Card Data
    const cardElement = clone.querySelector('.card');
    cardElement.setAttribute('id', `card-${cardData.id}`);

    clone.querySelector('.card-image').src = cardData.image;
    clone.querySelector('.card-image').alt = cardData.title;
    clone.querySelector('.card-title').textContent = cardData.title;
    clone.querySelector('.card-subtitle').textContent = cardData.date;
    clone.querySelector('.card-description').textContent = cardData.description;
    clone.querySelector('.card-category').textContent = cardData.category;

    // return the clone
    return clone;
}

// CARDS HELPER FUNCTIONS

function readMore(cardId) {
    alert('read more button has been clicked for the card with ID:' + cardId);
}

function share(cardId) {
    alert('share button has been pressed for the card with ID: ' + cardId);
}

function deleteCard(cardId) {
    const cardToDelete = document.querySelector(`#${cardId}`);
    if(cardToDelete) {
        cardToDelete.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
   renderCards(cardsData);
})





//insertAdjacentHTML() and insertAdjacentText()

 // // container.insertAdjacentElement(postion, 'html string')
    // container.insertAdjacentHTML('beforebegin', '<h1>InsertAdjacentHTML feature</h1>');

    // // afterbegin
    // container.insertAdjacentHTML('afterbegin', '<p>Hello World!!</p>');

    // // beforeend
    // container.insertAdjacentHTML('beforeend', '<footer>this is the footer of my div</footer>');

    // // afterend
    // container.insertAdjacentHTML('afterend', '<h2>This is another section</h2>');

 // // createElement("tagName") , createTextNode()
    // // STEP 2
    // let newElement = document.createElement('h2');
    // newElement.textContent = "Secondary Title";
    // newElement.classList.add('text-3xl', 'font-bold', 'm-2', 'mt-2');
    // newElement.id = 'newParagraph';

    // let pElement = document.createElement('p');
    // pElement.textContent = "This is the content of the previous title";
    // pElement.classList.add('mt-2','mb-3', 'font-normal', 'text-xl', 'w-full');

    // // STEP 3
    // // container.appendChild(newElement); ==> append elements at the end
    // // container.prepend(newElement); ==> append elements as first
    // // container.append(newElement, pElement); ==> append more than 1 item at time
    // container.insertBefore(newElement, quote);
    // container.after(pElement,quote);