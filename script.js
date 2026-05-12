const billInput = document.querySelector(".split-card__input--bill");
const customTip = document.querySelector(".split-card__input--tip");
const tipButtons = document.querySelectorAll(".split-card__tip-button");
const peopleInput = document.querySelector(".split-card__input--people");
const peopleInputField = document.querySelector(
  ".split-card__input-group--people",
);
const resetButton = document.querySelector(".split-card__reset-button");
const errorMessage = document.querySelector(".split-card__error-message");
const totalTipAmount = document.querySelector(".split-card__amount--total");
const perHeadTipAmount = document.querySelector(".split-card__amount--tip");

// disabled button implementation

function disableButton() {
  if (billInput.value === "") {
    resetButton.disabled = true;
    totalTipAmount.innerText = "$0.00";
    perHeadTipAmount.innerText = "$0.00";
  } else if (peopleInput.value === "") {
    resetButton.disabled = true;
    perHeadTipAmount.innerText = "$0.00";
  } else {
    resetButton.disabled = false;
  }
}

// bill amount

let billAmount;

function addBillAmount() {
  billAmount = billInput.value;
  console.log("Bill Amount: ", billAmount);
}

// saves tip amount from initializeTipButton() or addCustomTip()
let tipAmount;

function initializeTipButton() {
  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tipButtons.forEach((btn) => {
        btn.classList.remove("split-card__tip-button--active");
      });
      customTip.value = "";

      tipAmount = button.dataset.tip;
      button.classList.add("split-card__tip-button--active");
      console.log("Tip Amount: ", tipAmount);

      calculateTotalTip();
      calculateTipPerHead();
    });
  });

  console.log("running");
}

// adding custom tip

function addCustomTip() {
  tipButtons.forEach((button) => {
    button.classList.remove("split-card__tip-button--active");
  });

  tipAmount = customTip.value;
  console.log("Tip Amount: ", tipAmount);
}

// total people

let totalPeople;

function peopleCount() {
  if (peopleInput.value < 1) {
    errorMessage.innerText = "Can't be lesser Than 1";
    peopleInputField.classList.add("error-border");
  } else {
    totalPeople = peopleInput.value;
    errorMessage.innerText = "";
    peopleInputField.classList.remove("error-border");
  }
  console.log("Total People:", totalPeople);
}

// total tip amount

let totalTip;

function calculateTotalTip() {
  console.log(billAmount);
  console.log(tipAmount);
  if (!tipAmount || !billAmount) {
    totalTipAmount.innerText = "$0.00";
    return;
  }
  totalTip = (Number(billAmount) * Number(tipAmount)) / 100;

  totalTipAmount.innerText = `$${totalTip.toFixed(2)}`;
  console.log("Total Tip: ", totalTip);
}

// tip per head

let tipPerHead;

function calculateTipPerHead() {
  if (billInput.value === "" || peopleInput.value === "") {
    perHeadTipAmount.innerText = "$0.00";
  } else {
    tipPerHead = Number(totalTip) / Number(totalPeople);
    perHeadTipAmount.innerText = `$${tipPerHead.toFixed(2)}`;
    console.log("Tip Per Head: ", tipPerHead);
  }
}

//  event listeners for billInput

function handleBillInput() {
  disableButton();
  addBillAmount();
  calculateTotalTip();
  calculateTipPerHead();
}

// event listeners for peopleInput

function handlePeopleInput() {
  disableButton();
  peopleCount();
  calculateTipPerHead();
}

// event listeners for customTip

function handleCustomTip() {
  addCustomTip();
  calculateTotalTip();
  calculateTipPerHead();
}

disableButton();

// function resetButton functionality

function handleResetButton() {
  billInput.value = "";

  tipButtons.forEach((button) => {
    button.classList.remove("split-card__tip-button--active");
  });

  customTip.value = "";
  peopleInput.value = "";

  errorMessage.innerText = "";
  peopleInputField.classList.remove("error-border");

  console.log("clicked");
  disableButton();

  billAmount = undefined;
  tipAmount = undefined;
  totalPeople = undefined;
  totalTip = undefined;
  tipPerHead = undefined;
}

// orchestration

billInput.addEventListener("input", handleBillInput);

initializeTipButton();

customTip.addEventListener("input", handleCustomTip);

peopleInput.addEventListener("input", handlePeopleInput);

resetButton.addEventListener("click", handleResetButton);
