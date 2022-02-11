const words = require("../../words.json");

const getWord = () => {
  let cleaned = words[0].words;

  let filtered = [];
  let letters = [
    "क",
    "ख",
    "ग",
    "घ",
    "च",
    "छ",
    "ज",
    "झ",
    "ञ",
    "ट",
    "ठ",
    "ड",
    "ढ",
    "ण",
    "त",
    "थ",
    "द",
    "ध",
    "न",
    "प",
    "फ",
    "ब",
    "भ",
    "म",
    "य",
    "र",
    "ल",
    "व",
    "श",
    "ष",
    "स",
    "ह",
    "ळ",
    "क",
    "ष",
    "ज्",
    "ञ",
  ];

  let sizes = [];
  let oneLetter = [];
  cleaned.map((word) => {
    if (filtered.indexOf(word) == -1) {
      let splitted = word.split("");
      let notInLetters = false;
      splitted.map((letter) => {
        if (letters.indexOf(letter) == -1) {
          notInLetters = true;
        }
      });
      filtered.push(word);
      if (notInLetters == false) {
        if (sizes.indexOf(word.length) == -1) {
          sizes.push(word.length);
        }
      }
    }
  });

  let randomWord = filtered[Math.round(Math.random() * filtered.length)];
  // return randomWord
};

module.exports = { getWord };
