class Book {
  // properties declaration
  // class variables
  title = "";
  author = null;
  pages = 0;
  releaseDate = new Date();
  // private only can be accessed within the same scope
  // local constant
  // # symbol === private property
  #type = []; 

  // constructor
  constructor(bookTitle, bookAuthor, bookPages, bookReleaseDate, bookType) {
    // "this" the indivual representation of my class
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.releaseDate = new Date(bookReleaseDate);
    this.#type = bookType;

    // we can not add or remove properties
    Object.seal(this);
  }

  // GETTERS and SETTERS
  getType() {
    return this.#type;
  }

  //SETTERS
  setType(category) {
    this.#type.push(category);
  }

  print() {
    console.log(`Book Name: ${this.title}`);
    console.log(`Book Author: ${this.author.getAuthorName()}, ${this.author.birthYear}`);
    console.log(`Book Pages: ${this.pages}`);
    console.log(`Book Release Date: ${new Date(this.releaseDate)}`);
    console.log(`Book Category: ${this.#type}`);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }
}

export default Book;
