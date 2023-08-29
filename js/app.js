const loadPhones = async (phonename, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phonename}`
  );
  const data = await res.json();
  const phones = data.data;
  getPhones(phones, isShowAll);
};

const getPhones = (phones, isShowAll) => {
  console.log(phones);

  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";

  // Show All Button hidden or display
  const showAllBtn = document.getElementById("show-all-btn");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = `card w-9/12 mx-auto bg-base-100 shadow-xl`;
    div.innerHTML = `
          <figure>
            <img
              src="${phone.image}"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}!</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h3 class="text-2xl font-semibold"> $999 </h3>
            <div class="card-actions justify-center">
              <button class="btn btn-primary">Show Details</button>
            </div>
          </div>
  `;
    phonesContainer.appendChild(div);
  });
  toggleSpinner(false);
};

const searchPhones = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-box");
  const searchValue = searchField.value;
  loadPhones(searchValue, isShowAll);
};

const toggleSpinner = (isToggle) => {
  const spinner = document.getElementById("spinner");
  if (isToggle) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const showAll = () => {
  searchPhones(true);
};
