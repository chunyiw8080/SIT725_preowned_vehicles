
document.querySelector('.click-me-btn').addEventListener('click',() => {
    document.querySelector('.main-form').classList.add('show');
})
document.querySelector('.hide-form').addEventListener('click',(e) => {
     e.preventDefault();
    document.querySelector('.main-form').classList.remove('show');
})


//Receive posts data from backend and render the post cards
document.addEventListener('DOMContentLoaded',function(){
    fetch('/posts/getallposts').then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        let cardsContainer = document.querySelector('.cards-container');

        if(!data){
            cardsContainer.innerHTML = '<h2> Nothing Here </h2>';
            return;
        }

        cardsContainer.innerHTML = data.map((card, index) => {
            const imageUrl = card.image[0] ? card.image[0] : '/userUploads/car.jpg';
            return `
                <div class="card" data-index=${index}>
                    <img src="${imageUrl}" alt="Car Image" style="width: 400px; height: 300px; object-fit: cover;}">
                    <div class="card-info">
                        <h2>${card.car_model}</h2>
                        <p><strong>Year:</strong> ${card.year}</p>
                        <p><strong>Fuel Type:</strong> ${card.fuel}</p>
                        <p><strong>Transmission:</strong> ${card.transmission}</p>
                        <p><strong>Seating Capacity: </strong> ${card.seats}</p>
                        <p><strong>Price:</strong> ${card.price}</p>
                        <p><strong>Owner:</strong> ${card.owner}</p>
                        <button class="more-info">More Info</button>
                    </div>
                </div>
            `;
        }).join('');
    }).catch(error => {
        console.error('Error: ', error);
    });
})

const carData = {
    "Toyota": ["Camry", "Corolla", "Hilux", "Land Cruiser", "RAV4", "Yaris"],
    "Ford": ["Everest", "Fiesta", "Focus", "Mustang", "Ranger"],
    "Holden": ["Commodore","SV6","SSV"], 
    "Honda": ["Accord", "Civic", "CR-V", "HR-V"],
    "Mazda": ["CX-3", "CX-5", "Mazda2", "Mazda3", "MX-5"],
    "Hyundai": ["Accent", "Elantra", "i30", "Kona", "Santa Fe", "Tucson"],
    "Volkswagen": ["Golf", "Passat", "Polo", "Tiguan", "Touareg"],
    "BMW": ["1 Series", "3 Series", "5 Series", "X1", "X3", "X5"],
    "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLC", "GLE", "S-Class"],
    "Subaru": ["Forester", "Impreza", "Outback", "XV"],
    "Nissan": ["Altima", "GT-R", "Navara", "Qashqai", "X-Trail"],
    "Mitsubishi": ["ASX", "Eclipse Cross", "Outlander", "Pajero Sport", "Triton"],
    "Kia": ["Cerato", "Optima", "Seltos", "Sorento", "Sportage", "Stinger"],
    "Audi": ["A3", "A4", "Q5", "Q7", "TT"],
    "Volvo": ["S60", "S90", "V40", "XC40", "XC60", "XC90"],
    "Jaguar": ["E-PACE", "F-PACE", "I-PACE", "XE", "XF", "XJ"],
    "Land Rover": ["Defender", "Discovery", "Range Rover", "Range Rover Evoque", "Range Rover Sport"],
    "Lexus": ["ES", "IS", "LX", "NX", "RX", "UX"],
    "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
    "Alfa Romeo": ["Giulia", "Stelvio"],
    "Fiat": ["500", "500X", "500C"],
    "Jeep": ["Cherokee", "Grand Cherokee", "Renegade", "Wrangler"],
    "Skoda": ["Fabia", "Kamiq", "Karoq", "Octavia", "Superb"],
    "Mini": ["3-Door Hatch", "5-Door Hatch", "Clubman", "Countryman"],
    "Tesla": ["Model 3", "Model S", "Model X", "Model Y"],
    "Suzuki": ["Baleno", "Ignis", "Jimny", "Swift", "Vitara"],
    "Peugeot": ["2008", "208", "3008", "308", "5008"],
    "Renault": ["Captur", "Koleos", "Megane", "Trafic"],
    "Isuzu": ["D-MAX", "MU-X"],
    "Great Wall Motors": ["Cannon", "Steed"],
    "Mahindra": ["Pik-Up"],
    "SsangYong": ["Korando", "Musso", "Rexton"],
    "Opel": ["Astra", "Crossland X"],
    "Infiniti": ["Q50", "Q60", "QX50", "QX80"],
    "Citroën": ["C3", "C4 Cactus", "C5 Aircross", "Grand C4 SpaceTourer"],
    "DS Automobiles": ["DS 3 Crossback", "DS 7 Crossback"],
    "MG Motor": ["MG 3", "MG ZS", "MG HS"],
    "Haval": ["H2", "H6", "H9"],
    "Ram Trucks": ["1500"],
    "LDV": ["D90", "G10", "T60"],
    "Foton": ["Sauvana"],
    "Proton": ["Exora", "Jumbuck", "Persona", "Saga"],
    "Genesis": ["G70", "G80", "G90"],
    "Maserati": ["Ghibli", "Levante", "Quattroporte"],
    "Bentley": ["Bentayga", "Continental GT", "Flying Spur"],
    "Aston Martin": ["DB11", "DBS Superleggera", "Vantage"],
    "McLaren": ["540C", "570GT", "600LT", "720S"],
    "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"],
    "Ferrari": ["488 GTB", "488 Pista", "812 Superfast", "F8 Tributo", "Portofino", "Roma"],
    "Lamborghini": ["Aventador", "Huracan", "Urus"]
};

const carMakeSelect = document.getElementById('carMake');
const carModelSelect = document.getElementById('carModel');
const yearSelect = document.getElementById('year');


Object.keys(carData).forEach(carMaker => {
    const option = document.createElement('option');
    option.value = carMaker;
    option.text = carMaker;
    carMakeSelect.appendChild(option);
});


carMakeSelect.addEventListener('change', function () {
    const selectedCarMaker = this.value;
    const models = carData[selectedCarMaker] || [];

    carModelSelect.innerHTML = '<option value="" disabled selected>Select a car model</option>';

    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.text = model;
        carModelSelect.appendChild(option);
    });
});

carModelSelect.addEventListener('change', function () {
    const selectedCarModel = this.value;

    yearSelect.disabled = false;

    yearSelect.innerHTML = '<option value="" disabled selected>Select a year</option>';

    for (let year = 2024; year >= 1980; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }
});

function previewImages(input) {
    const previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = ''; 

    const files = input.files;

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('preview-image');
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}

let kkk = [
{
  carMake: "Ford",
  carModel: "Everest",
  fuelType: "petrol",
  km: "99",
  maxPower: "85",
  owner: "second",
  photos: "C:\\fakepath\\Ben Greenfield .jpg",
  postCode: "95",
  price: "99",
  rego: "mk",
  seatingCapacity: "2",
  sellerType: "individual",
  torque: "94",
  transmission: "manual",
  year: "2024"
},
{

  carMake: "Ford",
  carModel: "Everest",
  fuelType: "petrol",
  km: "99",
  maxPower: "85",
  owner: "second",
  photos: "C:\\fakepath\\Ben Greenfield .jpg",
  postCode: "95",
  price: "99",
  rego: "mk",
  seatingCapacity: "2",
  sellerType: "individual",
  torque: "94",
  transmission: "manual",
  year: "2023"
}];  
    
   
let data = [];

document.querySelector('.main-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formDataObj = {};
    const elems = document.querySelectorAll('.main-form input, .main-form select');

    for (const ele of elems) {
        const label = ele.previousElementSibling.htmlFor;

        if (ele.type === 'file') {
            // Handle file input (image)
            const file = ele.files[0];

            if (file) {
                // Call getBase64Image and wait for the result
                formDataObj[label] = await getBase64Image(file);
            }
        } else {
            // Handle other input types
            formDataObj[label] = ele.value;
        }

        ele.value = ''; // Clear input values
    }

    data.push(formDataObj);
    document.querySelector('.hide-form').click();

    renderCards();
});

// Function to convert file to base64
function getBase64Image(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        };
    });
}
// let cardHtml;
// function renderCards() {
//     const cardsContainer = document.querySelector('.cards-container');
//      cardHtml = data.map((card,index) => {
//         const imgSrc = card.photos.startsWith('data:') ? card.photos : `data:image/jpeg;base64,${card.photos}`;
//         return `
//             <div class="card" data-index=${index}>
//                 <img src="${imgSrc}" alt="Car Image">
//                 <div class="card-info">
//                     <h2>${card.carMake}</h2>
//                     <p><strong>Year:</strong> ${card.year}</p>
//                     <p><strong>Fuel Type:</strong> ${card.fuelType}</p>
//                     <p><strong>Transmission:</strong>${card.transmission}</p>
//                     <p><strong>Seating Capacity:</strong> ${card.seatingCapacity}</p>
//                     <p><strong>Price:</strong> ${card.price}</p>
//                     <p><strong>Owner:</strong> ${card.owner}</p>
//                     <button class="more-info">More Info</button>
//                 </div>
//             </div>
//         `;
//     }).join('');
//     cardsContainer.innerHTML = cardHtml;
// }
// function moreInfoPopup(){
//     document.querySelector('.more-info').addEventListener('click',() => {
//         document.querySelector('.more-info-popup').classList.add('show');
//     })
//     document.querySelector('.close-popup').addEventListener('click', () => {
//         document.querySelector('.more-info-popup').classList.remove('show');

//     })

// }
//  moreInfoPopup();
function moreInfoPopup() {
    const cardsContainer = document.querySelector('.cards-container');

    cardsContainer.addEventListener('click', (event) => {
        const moreInfoButton = event.target.closest('.more-info');

        if (moreInfoButton) {
            const cardIndex = moreInfoButton.closest('.card').dataset.index;
            const cardData = data[cardIndex];
             const imgSrc = cardData.photos.startsWith('data:') ? cardData.photos : `data:image/jpeg;base64,${cardData.photos}`;
            // const imagesHtml = cardData.photos.map(photo => `<img src="${photo}" alt="Car Image">`).join('');
            // const imageSources = cardData.photos.map((photo) => {
            //     return photo.startsWith('data:') ? photo : `data:image/jpeg;base64,${photo}`;
            // }).join('');


            document.querySelector('.more-info-popup').classList.add('show');
            document.querySelector('.more-info-popup-main').innerHTML = `
                <img src="${imgSrc}" alt="Car Image">
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
            
        }
    });

    document.querySelector('.close-popup').addEventListener('click', () => {
        document.querySelector('.more-info-popup').classList.remove('show');
        document.querySelector('.more-info-popup-main').innerHTML = '';
    });
}

moreInfoPopup();


// dataIndex = document.querySelector('.card').getAttribute('data-index');
//             alert(dataIndex);
