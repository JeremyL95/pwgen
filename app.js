const output = document.querySelector(".output");
const passwordLength = document.querySelector("#length");
const uppercaseLetter = document.querySelector("#uppercase");
const lowercaseLetter = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const popup = document.querySelector(".popup");
const btnCopy = document.querySelector(".btn-copy");
const btnGenerate = document.querySelector(".btn-generate");

const randomFunc = {
  upperCase: getRandomUpperCase,
  lowerCase: getRandomLowerCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "~`!@#$%^&*()_-+=<>,./?(){}[]";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(length, upperCase, lowerCase, number, symbol) {
  let generatedPassword = "";
  const typesCount = upperCase + lowerCase + number + symbol;
  const typesArr = [{ upperCase }, { lowerCase }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return " ";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalOutput = generatedPassword.slice(0, length);
  return finalOutput;
}

function copyToClipboard() {
  const textArea = document.createElement("textarea");
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.value = output.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

btnCopy.addEventListener("click", () => {
  popup.classList.add("active");
  copyToClipboard();
});

popup.addEventListener("animationend", () => {
  popup.classList.remove("active");
});

btnGenerate.addEventListener("click", () => {
  const outputLength = parseInt(passwordLength.value);
  const hasUpperCase = uppercaseLetter.checked;
  const hasLowerCase = lowercaseLetter.checked;
  const hasNumber = numbers.checked;
  const hasSymbols = symbols.checked;

  output.innerText = generatePassword(
    outputLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSymbols
  );
});
