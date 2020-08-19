const goButton=document.querySelector('.intro');
const resetButton=document.querySelector('[value="Reset!"');
const photoList=document.querySelector('.photoList');
const howManyDogs=document.querySelector('[type=number');
const title=document.querySelector('.title');
let dogs=[];

async function fetchPictures(quantity){
    dogs=[];
    const dogImg= await fetch(`https://dog.ceo/api/breeds/image/random/${quantity}`)
    .then(response=>response.json())
    .then(message=> {
        dogs.push(...message.message);
})
    .catch(()=> console.log('Failed to load pictures :('));
    populateDiv(photoList,dogs);
    console.log(dogs.length);
    if(dogs.length <= 1){
        title.textContent=`You have ${dogs.length} beautiful picture of dogs!`;
    } else {
        title.textContent=`You have ${dogs.length} beautiful pictures of dogs!`;
    }
}

function goHandle(event){
    event.preventDefault();
    if(howManyDogs.value<=50 && howManyDogs.value>=1){
    fetchPictures(howManyDogs.value);
}else {
    alert('No more than 50 and less than 0 please!!!');
    dogs=[];
    title.textContent=`Hello!`;
    goButton.reset();
    eraseDiv(photoList);
}
}

function populateDiv(list, photos){
    list.innerHTML=photos.map(photo=> {
        return `
        <li class="photo"><img src=${photo}> 
        </li>`
    }).join('')
}

function eraseDiv(list){
    list.innerHTML= `
    <li>You will see some great Dog pictures!
    </li>`
}


function resetHandle(e){
    e.preventDefault();
    dogs=[];
    title.textContent=`Hello!`
    eraseDiv(photoList)
}


goButton.addEventListener('submit', goHandle)
resetButton.addEventListener('click', resetHandle)