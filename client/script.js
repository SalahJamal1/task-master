"use strict";

const originCity = document.getElementById("originCity");
const destinationCity = document.getElementById("destinationCity");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const origin = originCity.value;
  const destination = destinationCity.value;
  if (!origin && !destination) return;
  try {
    const data = await getSearchPackage(origin, destination);
    console.log(data);
  } catch (err) {
    console.log(err.message);
    console.log(err.message.error);
    alert(err.message);
  }
});

async function getSearchPackage(origin, destination) {
  const res = await fetch(
    `http://localhost:9090/api/v1/expedia/search?originCity=${origin}&destinationCity=${destination}`
  );
  const data = await res.json();
  return data;
}
