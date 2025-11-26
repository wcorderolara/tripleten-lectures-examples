export default class Author {
    constructor(authorName, authorNationality, authorBirthYear, authorBiography="") {
        this.name = authorName;
        this.nationality = authorNationality;
        this.birthYear = authorBirthYear;
        this.biography = authorBiography;

        Object.seal(this);
    }

    getAuthorName() {
        return this.name;
    }
}