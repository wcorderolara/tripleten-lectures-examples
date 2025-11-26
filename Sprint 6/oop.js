import Book from './types/Book.js';
import Author from './types/Author.js';

// properties or attributes
// perform actions (methods/functions)
// OOP
// let hpbook1 = new Book('Azkban Prisioner', 'J.K. Rowling', 547,  '1999-06-25', 'magic')

// OOP
// 4 PILLARS
// ENCAPSULATION: Bunding related data and functions together.
// ABSTRACTION: Hiding complex details and showing only what's necessary.
// INHERITANCE: Creating something new based on something that exists.
// POLYMORPHISM: Use the method name for different behaviors.

// CLASS: Blueprint/Template that you only create this once.
// DRY = Dont Repeat Yorself

// OBJECT: The actual thing created from the blueprint, we can create many objects from the same template.

// Class syntax definition
// class names are always in PascalCase (BankAccount, Student, UserProfile)
// CLASS COMPOSITION

let jkRowling = new Author('J.K. Rowling', 'British', 1965, "Famous for Harry Potter Saga");

const hp1 = new Book(
  "Harry Potter and the Philosopher's Stone",
  jkRowling,
  223,
  "1997-06-26",
  ["Fantasy"]
);

// console.log(hp1);

const hp2 = new Book(
  "Harry Potter and the Chamber of Secrets",
  jkRowling,
  251,
  "1998-07-02",
  ["Fantasy"]
);

const hp3 = new Book(
  "Harry Potter and the Prisoner of Azkaban",
  jkRowling,
  317,
  "1999-07-08",
  ["Fantasy"]
);

const hp4 = new Book(
  "Harry Potter and the Goblet of Fire",
  jkRowling,
  636,
  "2000-07-08",
  ["Fantasy"]
);

const hp5 = new Book(
  "Harry Potter and the Order of the Phoenix",
  jkRowling,
  766,
  "2003-06-21",
  ["Fantasy"]
);

const hp6 = new Book(
  "Harry Potter and the Half-Blood Prince",
  jkRowling,
  607,
  "2005-07-16",
 ["Fantasy"]
);

const hp7 = new Book(
  "Harry Potter and the Deathly Hallows",
  jkRowling,
  607,
  "2007-07-21",
  ["Fantasy"]
);

let hpBooks = [hp1, hp2, hp3, hp4, hp5, hp6, hp7];

hpBooks.forEach((book) => book.print());