
// Show Main Section 
document.getElementById("showMainBtn").addEventListener("click", function() {
    document.getElementById("mainSection").scrollIntoView({ behavior: "smooth" });
});


// Load All Categories
const loadCategories = async () =>{
try{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
    displayCategories(data.categories)
    

}
catch(error){
    console.log("Failed to load Data", error)
}

}


// Display Categories
const displayCategories = (categories)=>{
    const catagoryContainer = document.getElementById("categories");
    catagoryContainer.innerHTML = '';
      categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
         <button onclick="loadPetByCategory('${item.category}');changeButtonColor(this)" id="${item.id}" class="  btn category-btn w-24 rounded-full" >
         <div class="flex gap-2" >
         <img class=" w-4 " src="${item.category_icon}" />
         <a>${item.category}</a>
         </div>
         </button>
        `
        catagoryContainer.append(buttonContainer)
      });
}
// Change button background color on click
const changeButtonColor = (button) => {
    // Reset background color for all buttons
    const allButtons = document.querySelectorAll(".category-btn");
    allButtons.forEach(btn => {
        btn.classList.remove('border-green-500'); 
    });

    // Set the background color for the clicked button
    button.classList.add('border-green-500');
}

// Load All Pets 
const loadPets = async() =>{
    document.getElementById('spinner').style.display='none';
try{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await response.json();
    displayAllPets(data.pets)
}catch(error){
    console.log('Mama tomi to dora khaiya geco', error)
}
    
}
// Load pet by category
const loadPetByCategory =async (category) =>{
    document.getElementById('spinner').style.display='block';

    setTimeout(async ()=>{
        
        try{
            const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
            const data = await response.json();
            // console.log(data)
                displayAllPets(data.data)
                document.getElementById('liked-pets').innerHTML = ''; 
                if(data.data.length === 0){
                    const petContainer = document.getElementById("display-pet");
                    petContainer.classList.remove("grid");
                    const div = document.createElement('div');
                    div.innerHTML=`
                    <div class="  ">
                    <div class="text-center ">
                    <img class="w-1/3 container mx-auto" src="./images/error.webp"/>
                    <h3 class="text-xl mt-4 font-bold">No Information Available</h3>
                    <p>Oops❗We couldn't find any relevant data. Please double-check your input or try again later.</p>
                    </div>
                    </div>
                    `
                    petContainer.appendChild(div)
                }
 
        }catch(error){
            console.log('Failed to load Data', error)
        }
        document.getElementById('spinner').style.display='none';
    },2000)
 
}
// Show Liked Pets
const likedPet = (image) => {
    const likeContainer = document.getElementById('liked-pets');

    // Check if the image is already liked
    const existingImage = likeContainer.querySelector(`img[src="${image}"]`);
    if (existingImage) {
        return; 
    }

    const div = document.createElement('div');
    div.innerHTML = `<img src="${image}" class=" rounded-xl m-1" />`;
    likeContainer.appendChild(div);
}
// Disible addopt button

const disable = (petId) =>{
    const adopt = document.getElementById(petId);
    adopt.innerText = `Adopted`;
    adopt.disabled = true;
}

// Show Details 
const showDetails = async(id) => {
try{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await response.json();
    console.log(data.petData)
    const pet = data.petData;
    const {pet_name, image, gender, date_of_birth, breed, price, vaccinated_status, pet_details} = pet;

    console.log(price, image, gender)
    const modalContainer = document.getElementById('my_modal_2');
    
    modalContainer.innerHTML = `
    <div class="modal-box">
        <img src="${image}" alt="" class="rounded-xl" />
        <h2 class="text-2xl font-bold ">${pet_name}</h2>
     <div class="grid grid-cols-2">
        <p class="flex gap-2"><img src="https://maxst.icons8.com/vue-static/icon/svg/detailed.svg" /> <span> Breed: ${breed}</span> </p>
        <p class="flex gap-2"><img width="20" height="15" src="https://img.icons8.com/ios-glyphs/20/calendar.png" alt="calendar"/> Birth: ${date_of_birth} </p>
        <p class="flex gap-2"><img width="16" height="16" src="https://img.icons8.com/tiny-glyph/16/gender.png" alt="gender"/>
        <span> Gender: ${gender} </span> </p>
        <p class="flex gap-2"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/us-dollar.png" alt="us-dollar"/>
        <span> Price: ${price} </span> </p>
     </div>
        <h2 class="flex gap-2"><img width="26" height="26" src="https://img.icons8.com/metro/26/syringe.png" alt="gender"/>
        <span> Vaccinated Status: ${vaccinated_status} </span> </h2>
        <h3 class="text-2xl font-bold">Details Information</h3>
        <p class=""><span>${pet_details}</span></p>
    </div>
        <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
    `;

    // Open the modal correctly
    modalContainer.showModal();
}catch(error){
    console.log('Opps😫',error)
}
};

// Display All Pets
const displayAllPets = (pets) =>{
    if(!pets || !Array.isArray(pets)){
        console.log('Wrong', pets)
        return;
    }

    const petContainer = document.getElementById("display-pet");
    petContainer.innerHTML = '';
    pets.forEach((pet) =>{
        const {breed,date_of_birth, pet_name, gender, price,image, category, petId, pet_details, vaccinated_status} = pet;
        
        const petContainer = document.getElementById("display-pet");
        const div = document.createElement('div');
        div.setAttribute("data-price", price);
            div.innerHTML=`
            <div class="col-span1 md:col-span-2 lg:col-span-3 ">
            <div class="card min-h-96 bg-base-100  shadow-xl">
                <figure class="px-10 pt-10">
                    <img
                    src="${image}"
                    alt="${category}"
                    class="rounded-xl" />
                </figure>
                <div class="card-body">
                <h2 class="text-2xl font-bold ">${pet_name}</h2>
                <p class="flex gap-2"><img src="https://maxst.icons8.com/vue-static/icon/svg/detailed.svg" /> <span> Breed: ${breed}</span> </p>
                <p class="flex gap-2"><img width="20" height="15" src="https://img.icons8.com/ios-glyphs/20/calendar.png" alt="calendar"/> Birth: ${date_of_birth?date_of_birth:"Not Available"}</span> </p>
                <p class="flex gap-2"><img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/50/gender-equality.png" alt="gender-equality"/>
                <span> Gender: ${gender?gender:"Not Available"}</span> </p>
                <p class="flex gap-2"><img width="18" height="15" src="https://img.icons8.com/material-outlined/50/us-dollar--v1.png" alt="us-dollar--v1"/>
                <span> Price: ${price?price:"Not Available"}</span> </p>
                <div class="card-actions">
                <div class="flex gap-3 items-center " >
                <button onClick="likedPet('${image}')" class="btn"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/facebook-like.png" alt="facebook-like"/></button>
                <button onClick="disable('adopt-${petId}')" id="adopt-${petId}" class="btn min-w-10 max-w-16 text-green-600">Adopt</button>
                <button onClick="showDetails('${petId}')" id="${petId}" class="btn min-w-10 max-w-14 text-green-600">Details</button>

                </div>
                </div>
                </div>
                </div>
            </div>
            `
            // category,image, gender, price, pet_name, breed,pet_details,vaccinated_status
            petContainer.appendChild(div);

        
    })
}
const sortPetsByPrice = () => {
    const petContainer = document.getElementById("display-pet");
    let pets = Array.from(petContainer.children); // Convert HTMLCollection to an array

    pets.sort((a, b) => {
        let priceA = parseFloat(a.getAttribute("data-price")); // Get price from data-price attribute
        let priceB = parseFloat(b.getAttribute("data-price"));
        return priceB - priceA; // Sort in ascending order (small to large)
    });

    petContainer.innerHTML = ""; // Clear the container
    pets.forEach(pet => petContainer.appendChild(pet)); // Re-append the sorted pets
};

loadPets()










loadCategories()