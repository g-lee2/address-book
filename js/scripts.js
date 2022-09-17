//Buisness Logic for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id]
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}
// Buisness Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.addresses = {};
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.addAddress = function(address) {
  this.addresses = address;
}

function Address(workAddress, workEmailAddress, personalAddress, personalEmailAddress) {
  this.workAddress = workAddress;
  this.workEmailAddress = workEmailAddress;
  this.personalAddress = personalAddress;
  this.personalEmailAddress = personalEmailAddress;
}

//User Interface Logic
let addressBook = new AddressBook(); 

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
} 

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  const address = contact.addresses;
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".work-email-address").innerText = address.workAddress;
  document.querySelector(".work-physical-address").innerText = address.workEmailAddress;
  document.querySelector(".personal-email-address").innerText = address.personalAddress;
  document.querySelector(".personal-physical-address").innerText = address.personalEmailAddress;

  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
} 

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedWorkEmail = document.querySelector("input#new-work-email-address").value;
  const inputtedWorkAddress = document.querySelector("input#new-work-physical-address").value;
  const inputtedPersonalEmail = document.querySelector("input#new-personal-email-address").value;
  const inputtedPersonalAddress = document.querySelector("input#new-personal-physical-address").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  let newAddress = new Address(inputtedWorkEmail, inputtedWorkAddress, inputtedPersonalEmail, inputtedPersonalAddress);
  addressBook.addContact(newContact);
  newContact.addAddress(newAddress);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-work-email-address").value = null;
  document.querySelector("input#new-work-physical-address").value = null;
  document.querySelector("input#new-personal-email-address").value = null;
  document.querySelector("input#new-personal-physical-address").value = null; 
}

window.addEventListener("load", function () {
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});