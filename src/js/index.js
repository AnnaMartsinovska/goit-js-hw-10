import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
    breedSelect: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader-text'),
    errText: document.querySelector('.error'),
    divInfo: document.querySelector('.cat-info')
};

refs.breedSelect.addEventListener('change', onChangeSelect);


fetchBreeds().then(res => {
    const markup = res.map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`
    }).join('');
 
    refs.breedSelect.innerHTML = markup;

    new SlimSelect({
      select: refs.breedSelect,
    });

    refs.breedSelect.classList.remove('is-hidden')
})
    .catch(() => {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    .finally(() => refs.loader.classList.add('is-hidden'));


function renderCard(data) { 
    const markup = `<img src="${data[0].url}" alt="${data[0].breeds[0].name} width = "500" height = "350" />
    <h2>${data[0].breeds[0].name}</h2>
    <p>${data[0].breeds[0].temperament}</p>
    <p>${data[0].breeds[0].description}</p>`

    refs.divInfo.innerHTML = markup;
};


function onChangeSelect() {
    const catSelect = refs.breedSelect.value;

    refs.loader.classList.remove('is-hidden');
    refs.breedSelect.disabled = true;
    refs.divInfo.classList.add('is-hidden');

    fetchCatByBreed(catSelect).then(res =>
        renderCard(res))
    .catch(() => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
        })
    .finally(() => {
            refs.loader.classList.add('is-hidden');
            refs.breedSelect.disabled = false;
            refs.divInfo.classList.remove('is-hidden');
        });
};
 

