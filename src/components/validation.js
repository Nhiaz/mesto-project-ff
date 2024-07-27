import { validationConfig } from "./validationConfig";

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputElement)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
};

export const enableValidation = () => {
  const inputForm = Array.from(
    document.querySelectorAll(validationConfig.formElement)
  );
  inputForm.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

export const clearValidation = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputElement)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.textContent = "";

  toggleButtonState(
    inputList,
    buttonElement
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.setCustomValidity("");
    inputElement.classList.remove(validationConfig.inputErrorClass);
  });
};
