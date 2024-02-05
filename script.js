document.querySelector(".click-me-btn").addEventListener("click", () => {
  document.querySelector(".main-form").classList.add("show");
  if(document.querySelector('#imagePreviewContainer')){
          document.querySelector('#imagePreviewContainer').innerHTML = ''
  }
});
document.querySelector(".hide-form").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".main-form").classList.remove("show");
});

const carData = {
  Toyota: ["Camry", "Corolla", "Hilux", "Land Cruiser", "RAV4", "Yaris"],
  Ford: ["Everest", "Fiesta", "Focus", "Mustang", "Ranger"],
  Holden: ["Commodore", "SV6", "SSV"],
  Honda: ["Accord", "Civic", "CR-V", "HR-V"],
  Mazda: ["CX-3", "CX-5", "Mazda2", "Mazda3", "MX-5"],
  Hyundai: ["Accent", "Elantra", "i30", "Kona", "Santa Fe", "Tucson"],
  Volkswagen: ["Golf", "Passat", "Polo", "Tiguan", "Touareg"],
  BMW: ["1 Series", "3 Series", "5 Series", "X1", "X3", "X5"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLC", "GLE", "S-Class"],
  Subaru: ["Forester", "Impreza", "Outback", "XV"],
  Nissan: ["Altima", "GT-R", "Navara", "Qashqai", "X-Trail"],
  Mitsubishi: ["ASX", "Eclipse Cross", "Outlander", "Pajero Sport", "Triton"],
  Kia: ["Cerato", "Optima", "Seltos", "Sorento", "Sportage", "Stinger"],
  Audi: ["A3", "A4", "Q5", "Q7", "TT"],
  Volvo: ["S60", "S90", "V40", "XC40", "XC60", "XC90"],
  Jaguar: ["E-PACE", "F-PACE", "I-PACE", "XE", "XF", "XJ"],
  "Land Rover": [
    "Defender",
    "Discovery",
    "Range Rover",
    "Range Rover Evoque",
    "Range Rover Sport",
  ],
  Lexus: ["ES", "IS", "LX", "NX", "RX", "UX"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Alfa Romeo": ["Giulia", "Stelvio"],
  Fiat: ["500", "500X", "500C"],
  Jeep: ["Cherokee", "Grand Cherokee", "Renegade", "Wrangler"],
  Skoda: ["Fabia", "Kamiq", "Karoq", "Octavia", "Superb"],
  Mini: ["3-Door Hatch", "5-Door Hatch", "Clubman", "Countryman"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Suzuki: ["Baleno", "Ignis", "Jimny", "Swift", "Vitara"],
  Peugeot: ["2008", "208", "3008", "308", "5008"],
  Renault: ["Captur", "Koleos", "Megane", "Trafic"],
  Isuzu: ["D-MAX", "MU-X"],
  "Great Wall Motors": ["Cannon", "Steed"],
  Mahindra: ["Pik-Up"],
  SsangYong: ["Korando", "Musso", "Rexton"],
  Opel: ["Astra", "Crossland X"],
  Infiniti: ["Q50", "Q60", "QX50", "QX80"],
  Citroën: ["C3", "C4 Cactus", "C5 Aircross", "Grand C4 SpaceTourer"],
  "DS Automobiles": ["DS 3 Crossback", "DS 7 Crossback"],
  "MG Motor": ["MG 3", "MG ZS", "MG HS"],
  Haval: ["H2", "H6", "H9"],
  "Ram Trucks": ["1500"],
  LDV: ["D90", "G10", "T60"],
  Foton: ["Sauvana"],
  Proton: ["Exora", "Jumbuck", "Persona", "Saga"],
  Genesis: ["G70", "G80", "G90"],
  Maserati: ["Ghibli", "Levante", "Quattroporte"],
  Bentley: ["Bentayga", "Continental GT", "Flying Spur"],
  "Aston Martin": ["DB11", "DBS Superleggera", "Vantage"],
  McLaren: ["540C", "570GT", "600LT", "720S"],
  "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"],
  Ferrari: [
    "488 GTB",
    "488 Pista",
    "812 Superfast",
    "F8 Tributo",
    "Portofino",
    "Roma",
  ],
  Lamborghini: ["Aventador", "Huracan", "Urus"],
};

const carMakeSelect = document.getElementById("carMake");
const carModelSelect = document.getElementById("carModel");
const yearSelect = document.getElementById("year");

Object.keys(carData).forEach((carMaker) => {
  const option = document.createElement("option");
  option.value = carMaker;
  option.text = carMaker;
  carMakeSelect.appendChild(option);
});

carMakeSelect.addEventListener("change", function () {
  const selectedCarMaker = this.value;
  const models = carData[selectedCarMaker] || [];

  carModelSelect.innerHTML =
    '<option value="" disabled selected>Select a car model</option>';

  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.text = model;
    carModelSelect.appendChild(option);
  });
});

carModelSelect.addEventListener("change", function () {
  const selectedCarModel = this.value;

  yearSelect.disabled = false;

  yearSelect.innerHTML =
    '<option value="" disabled selected>Select a year</option>';

  for (let year = 2024; year >= 1980; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  }
});

function previewImages(input) {
  const previewContainer = document.getElementById("imagePreviewContainer");
  previewContainer.innerHTML = "";

  const files = input.files;

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("preview-image");
      previewContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
}


let data = [];

document
  .querySelector(".main-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formDataObj = {};
    const elems = document.querySelectorAll(
      ".main-form input, .main-form select"
    );

    for (const ele of elems) {
      const label = ele.previousElementSibling.htmlFor;

      if (ele.type === "file") {
        const files = ele.files;

        if (files.length > 0) {
          const base64Images = await Promise.all(
            Array.from(files, getBase64Image)
          );
          console.log("base64Images", base64Images);
          formDataObj[label] = base64Images;
        }
      } else {
        formDataObj[label] = ele.value;
      }

      ele.value = ""; // Clear input values
    }

    data.push(formDataObj);
    // localStorage.setItem('formData', JSON.stringify(data));
    document.querySelector(".hide-form").click();

    renderCards();
  });
console.log("data", data);

function getBase64Image(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result.split(",")[1]);
    };
  });
}
let cardHtml;
function renderCards() {
  const cardsContainer = document.querySelector(".cards-container");
  cardHtml = data
    .map((card, index) => {
      const imgSrc =
        Array.isArray(card.photos) && card.photos.length > 0
          ? card.photos[0].startsWith("data:")
            ? card.photos[0]
            : `data:image/jpeg;base64,${card.photos[0]}`
          : "fallback_image_url.jpg";
      return `
            <div class="card" data-index=${index}>
                <img src="${imgSrc}" alt="Car Image">
                <div class="card-info">
                    <h2>${card.carMake}</h2>
                    <p><strong>Year:</strong> ${card.year}</p>
                    <p><strong>Fuel Type:</strong> ${card.fuelType}</p>
                    <p><strong>Transmission:</strong>${card.transmission}</p>
                    <p><strong>Seating Capacity:</strong> ${card.seatingCapacity}</p>
                    <p><strong>Price:</strong> ${card.price}</p>
                    <p><strong>Owner:</strong> ${card.owner}</p>
                    <button class="more-info">More Info</button>
                </div>
            </div>
        `;
    })
    .join("");
  cardsContainer.innerHTML = cardHtml;
}
renderCards();

const svgObj = {
    left: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
<path d="M42 25C42 15.6 34.4 8 25 8C15.6 8 8 15.6 8 25C8 34.4 15.6 42 25 42C34.4 42 42 34.4 42 25ZM10 25C10 16.7 16.7 10 25 10C33.3 10 40 16.7 40 25C40 33.3 33.3 40 25 40C16.7 40 10 33.3 10 25Z" fill="white"/>
<path d="M26.6996 33.3008L18.3996 25.0008L26.6996 16.7008L25.2996 15.3008L15.5996 25.0008L25.2996 34.7008L26.6996 33.3008Z" fill="white"/>
<path d="M17 24V26H34V24H17Z" fill="white"/>
</svg>`,
right: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
<path d="M8 25C8 15.6 15.6 8 25 8C34.4 8 42 15.6 42 25C42 34.4 34.4 42 25 42C15.6 42 8 34.4 8 25ZM40 25C40 16.7 33.3 10 25 10C16.7 10 10 16.7 10 25C10 33.3 16.7 40 25 40C33.3 40 40 33.3 40 25Z" fill="white"/>
<path d="M23.3004 33.3008L31.6004 25.0008L23.3004 16.7008L24.7004 15.3008L34.4004 25.0008L24.7004 34.7008L23.3004 33.3008Z" fill="white"/>
<path d="M33 24V26H16V24H33Z" fill="white"/>
</svg>`
} 
function moreInfoPopup() {
  const cardsContainer = document.querySelector(".cards-container");

  cardsContainer.addEventListener("click", (event) => {
    const moreInfoButton = event.target.closest(".more-info");

    if (moreInfoButton) {
      const cardIndex = moreInfoButton.closest(".card").dataset.index;
      const cardData = data[cardIndex];
      const imgSrc =
        Array.isArray(cardData.photos) && cardData.photos.length > 0
          ? cardData.photos.map((photo) =>
              photo.startsWith("data:")
                ? photo
                : `data:image/jpeg;base64,${photo}`
            )
          : ["fallback_image_url.jpg"];

      

      document.querySelector(".more-info-popup").classList.add("show");
      document.querySelector("body").classList.add("overlay");
      document.querySelector(".more-info-popup-main").innerHTML = `
              <div class='img-wrapper slick-carousel'>

                  ${imgSrc.map((img) => {
                    return ` <img src="${img}" alt="Car Image"> `
                  }).join('')}
                 
              </div>
                
                <h2>${cardData.carMake} ${cardData.carModel}</h2>
                <p><strong>Year:</strong> ${cardData.year}</p>
                <p><strong>Fuel Type:</strong> ${cardData.fuelType}</p>
                <p><strong>Transmission:</strong> ${cardData.transmission}</p>
                <p><strong>Seating Capacity:</strong> ${cardData.seatingCapacity}</p>
                <p><strong>Price:</strong> ${cardData.price}</p>
                <p><strong>Owner:</strong> ${cardData.owner}</p>
                <p><strong>KM:</strong> ${cardData.km}</p>
                <p><strong>Max Power:</strong> ${cardData.maxPower}</p>
                <p><strong>Post Code:</strong> ${cardData.postCode}</p>
                <p><strong>Registration:</strong> ${cardData.rego}</p>
                <p><strong>Seller Type:</strong> ${cardData.sellerType}</p>
                <p><strong>Torque:</strong> ${cardData.torque}</p>
            `;


            $('.slick-carousel').slick({
                prevArrow: `<div class="expertPrevfvt">
                ${svgObj.left}
             </div>`,
                nextArrow: `<div class="expertNextfvt">
                  ${svgObj.right}
                  </div>`,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
    }
  });

  document.querySelector(".close-popup").addEventListener("click", () => {
    document.querySelector(".more-info-popup").classList.remove("show");
    document.querySelector("body").classList.remove("overlay");
    document.querySelector(".more-info-popup-main").innerHTML = "";
  });
}


moreInfoPopup();



