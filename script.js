/* ==========================================
   DRIVEX CAR DATA
========================================== */

const cars = [

    {
        id: 1,
        name: "BMW M4",
        category: "Luxury",
        price: 14800000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
        description: "A high-performance luxury coupe combining aggressive styling, powerful performance and premium comfort."
    },

    {
        id: 2,
        name: "Lamborghini Huracan",
        category: "Sports",
        price: 23000000,
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=80",
        description: "An iconic Italian supercar designed for extreme performance and an unforgettable driving experience."
    },

    {
        id: 3,
        name: "Mercedes-Benz C-Class",
        category: "Sedan",
        price: 6500000,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        description: "A premium executive sedan offering sophisticated design, technology and everyday comfort."
    },

    {
        id: 4,
        name: "audi Q7",
        category: "SUV",
        price: 14500000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
        description: "A premium luxury SUV combining commanding road presence, comfort and impressive off-road capability."
    },

    {
        id: 5,
        name: "Ferrari 458 italia",
        category: "Sports",
        price: 19000000,
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
        description: "A legendary sports car delivering exceptional handling, performance and timeless design."
    },

    {
        id: 6,
        name: "Audi A6",
        category: "Luxury",
        price: 7200000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
        description: "A sophisticated luxury sedan with advanced technology, refined comfort and elegant styling."
    }

];


/* ==========================================
   VARIABLES
========================================== */

const carContainer = document.getElementById("carContainer");

const searchInput = document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceFilter =
    document.getElementById("priceFilter");

const sortFilter =
    document.getElementById("sortFilter");

const carCount =
    document.getElementById("carCount");

const noCars =
    document.getElementById("noCars");


/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


/* ==========================================
   DISPLAY CARS
========================================== */

function displayCars(carList) {

    carContainer.innerHTML = "";

    carCount.textContent = carList.length;

    if (carList.length === 0) {

        noCars.style.display = "block";

        return;

    }

    noCars.style.display = "none";


    carList.forEach(car => {

        const card = document.createElement("div");

        card.className = "car-card";

        card.innerHTML = `

            <div
                class="car-image"
                style="background-image: url('${car.image}')"
            >

                <span class="car-category">
                    ${car.category}
                </span>

                <button
                    class="favorite-btn"
                    onclick="toggleFavorite(this)"
                >
                    ♡
                </button>

            </div>


            <div class="car-info">

                <h3>${car.name}</h3>

                <p>
                    ${car.category} • Automatic • Petrol
                </p>

                <h4>
                    ${formatPrice(car.price)}
                </h4>

                <div class="card-buttons">

                    <button
                        class="details-btn"
                        onclick="openModal(${car.id})"
                    >
                        View Details
                    </button>

                </div>

            </div>
        `;

        carContainer.appendChild(card);

    });

}


/* ==========================================
   SEARCH + FILTER
========================================== */

function filterCars() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const maxPrice =
        priceFilter.value;

    const sort =
        sortFilter.value;


    let filteredCars = cars.filter(car => {

        const matchesSearch =
            car.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            category === "all" ||
            car.category === category;

        const matchesPrice =
            maxPrice === "all" ||
            car.price <= Number(maxPrice);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        );

    });


    /* Sorting */

    if (sort === "low") {

        filteredCars.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sort === "high") {

        filteredCars.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (sort === "name") {

        filteredCars.sort(
            (a, b) => a.name.localeCompare(b.name)
        );

    }


    displayCars(filteredCars);

}


/* ==========================================
   SEARCH EVENTS
========================================== */

searchInput.addEventListener(
    "input",
    filterCars
);

categoryFilter.addEventListener(
    "change",
    filterCars
);

priceFilter.addEventListener(
    "change",
    filterCars
);

sortFilter.addEventListener(
    "change",
    filterCars
);


/* ==========================================
   FAVORITE
========================================== */

function toggleFavorite(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {

        button.innerHTML = "♥";

    } else {

        button.innerHTML = "♡";

    }

}


/* ==========================================
   MODAL
========================================== */

const modal =
    document.getElementById("carModal");

function openModal(id) {

    const car =
        cars.find(car => car.id === id);

    if (!car) return;


    document.getElementById("modalImage").src =
        car.image;

    document.getElementById("modalCategory").textContent =
        car.category;

    document.getElementById("modalTitle").textContent =
        car.name;

    document.getElementById("modalDescription").textContent =
        car.description;

    document.getElementById("modalPrice").textContent =
        formatPrice(car.price);


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}


modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeModal();

    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* ==========================================
   CONTACT FROM MODAL
========================================== */

function contactFromModal() {

    closeModal();

    document
        .getElementById("contact")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            message === ""
        ) {

            alert(
                "Please fill in all the fields."
            );

            return;

        }


        alert(
            "Thank you " +
            name +
            "! Your enquiry has been received."
        );


        contactForm.reset();

    }
);


/* ==========================================
   EMI CALCULATOR
========================================== */

function calculateEMI() {

    const price =
        Number(
            document.getElementById("carPrice").value
        );

    const downPayment =
        Number(
            document.getElementById("downPayment").value
        );

    const annualInterest =
        Number(
            document.getElementById("interest").value
        );

    const years =
        Number(
            document.getElementById("loanYears").value
        );


    if (
        !price ||
        price <= 0 ||
        downPayment < 0 ||
        downPayment >= price
    ) {

        alert(
            "Please enter a valid car price and down payment."
        );

        return;

    }


    const loanAmount =
        price - downPayment;


    const monthlyInterest =
        annualInterest / 12 / 100;


    const months =
        years * 12;


    const emi =
        (
            loanAmount *
            monthlyInterest *
            Math.pow(
                1 + monthlyInterest,
                months
            )
        )
        /
        (
            Math.pow(
                1 + monthlyInterest,
                months
            ) - 1
        );


    document.getElementById("emiResult").innerHTML = `

        <strong>
            Estimated Monthly EMI
        </strong>

        <br><br>

        <span style="
            color:#e63946;
            font-size:25px;
            font-weight:bold;
        ">
            ${formatPrice(Math.round(emi))}
        </span>

        <br><br>

        Loan Amount:
        ${formatPrice(loanAmount)}

    `;

}


/* ==========================================
   DARK MODE
========================================== */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");


        if (
            document.body.classList.contains("dark")
        ) {

            themeBtn.innerHTML = "☀️";

        } else {

            themeBtn.innerHTML = "🌙";

        }

    }
);


/* ==========================================
   INITIAL LOAD
========================================== */

displayCars(cars);