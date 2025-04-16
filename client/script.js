"use strict";
// // // // // // // // // // // // // // // // // // // // // //
const originCity = document.getElementById("originCity");
const destinationCity = document.getElementById("destinationCity");
const submitButton = document.getElementById("submitButton");
const form = document.querySelector("form");
const offers_package = document.querySelector(".offers_package");
// // // // // // // // // // // // // // // // // // // // // //
async function getSearchPackage(origin, destination) {
  const res = await fetch(
    `http://localhost:8080/api/v1/expedia/search?originCity=${origin}&destinationCity=${destination}`
  );
  const data = await res.json();
  return data;
}
// // // // // // // // // // // // // // // // // // // // // //
function addOffers(offers) {
  if (offers.length === 0) {
    offers_package.innerHTML = `<h2 class="text-center w-100 text-danger">No offers found</h2>`;
    return;
  }
  offers_package.innerHTML = "";
  offers.forEach((offer) => {
    const html = `
    <div class="col">
    <div class="shadow-lg rounded-5 bg-white overflow-hidden h-100">
    <img src="${offer.hotelInfo.bigHotelImageUrl}" alt="${
      offer.hotelInfo.hotelName
    }" class="w-100"/>
    <div class="p-4 d-flex flex-column gap-1">
    <h2 class="text-sm-center fs-5 fw-bold text-primary">Flight + Hotel Package: ${
      offer.origin.city
    } to ${offer.destination.city}</h2>
    <p><strong>Travel Dates:</strong> ${
      offer.offerDateRange.formattedTravelStartDate
    } – ${offer.offerDateRange.formattedTravelEndDate} (${
      offer.offerDateRange.lengthOfStay
    } nights)</p>
        <ul class="list-unstyled d-flex flex-column gap-2">
        <li><strong>Flight:</strong> Round-trip from ${offer.origin.city} to ${
      offer.destination.city
    } (via ${offer.flightInfo.flightDealCarrierName})</li>
        <li class="text-success fw-bold">Hotel: ${offer.hotelInfo.hotelName}, ${
      offer.offerDateRange.lengthOfStay
    } nights</li>
        <li><strong>Per Person:</strong> $${offer.packagePricingInfo.perPsgrPackagePrice.toFixed(
          2
        )}</li>
        <li><strong>You Save:</strong> $${offer.packagePricingInfo.totalSavings.toFixed(
          2
        )} (${offer.packagePricingInfo.percentSavings}%)</li>
        <li><strong>Total Price for 2 Adults:</strong> <span class="text-success fw-bold">$${offer.packagePricingInfo.totalPackagePrice.toFixed(
          2
        )}</span></li>
        </ul>
        <div class="d-flex align-items-center justify-content-between">
        <a href="${
          offer.packageUrls.hotelDeeplinks.decodedHotelInfositeUrl
        }" class="btn btn-outline-primary" target="_blank">View Hotel</a>
        <a href="${
          offer.packageUrls.decodedPackageSearchUrl
        }" class="btn btn-outline-primary" target="_blank">Book This Package</a>
        </div>
        </div>
        </div>
    </div>
  `;
    offers_package.insertAdjacentHTML("beforeend", html);
  });
}
// // // // // // // // // // // // // // // // // // // // // //
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const origin = originCity.value;
  const destination = destinationCity.value;
  offers_package.innerHTML =
    '<p class="text-primary text-center w-100">Loading packages.</p>';

  submitButton.disabled = true;
  try {
    const data = await getSearchPackage(origin, destination);

    addOffers(data);
  } catch (err) {
    offers_package.innerHTML = "";
    offers_package.insertAdjacentHTML(
      "beforeend",
      '<p class="text-danger text-center w-100">Error fetching packages. Please try again.</p>'
    );
    console.log(err);
  } finally {
    submitButton.disabled = false;
  }
});
