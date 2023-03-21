let formFields = [];

function loadForm() {
  const formFieldsJSON = localStorage.getItem("form-fields");
  formFields = formFieldsJSON ? JSON.parse(formFieldsJSON) : [];
  renderFormFields();
}

function addFormField() {
  const fieldType = document.getElementById("field-type").value;
  const fieldLabel = document.getElementById("field-label").value;

  const field = {
    type: fieldType,
    label: fieldLabel,
  };

  formFields.push(field);
  renderFormFields();
}

function renderFormFields() {
  const formFieldsContainer = document.getElementById("form-fields");
  formFieldsContainer.innerHTML = "";
  formFields.forEach((field) => {
    const newField = document.createElement("div");
    if (field.type === "Yes/No") {
      newField.innerHTML = `
        <label>${field.label}:</label>
        <div>
          <input type="radio" id="${field.label}_yes" name="${field.label}" value="yes">
          <label for="${field.label}_yes">Yes</label>
        </div>
        <div>
          <input type="radio" id="${field.label}_no" name="${field.label}" value="no">
          <label for="${field.label}_no">No</label>
        </div>
      `;
    } else {
      newField.innerHTML = `
        <label>${field.label}:</label>
        <input type="${field.type}">
      `;
    }
    formFieldsContainer.appendChild(newField);
  });
}

function saveForm() {
  const formFieldsJSON = JSON.stringify(formFields);
  localStorage.setItem("form-fields", formFieldsJSON);
}

loadForm();

function clearForm() {
  const formFieldsElement = document.getElementById("form-fields");
  while (formFieldsElement.firstChild) {
    formFieldsElement.removeChild(formFieldsElement.firstChild);
  }
}

function clearLocalStorage() {
  localStorage.removeItem("form-fields");
  clearForm();
}
