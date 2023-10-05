
const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT_BREEDS = '/breeds';
const END_POINT_BREED_ID = '/images/search';
const options = {
    headers: {
        "x-api-key": "live_AZau6ef6syEaxS26uuykS3xoUcwb6JiX2FDrkisR5x4NbAAqHGPotN2C6IvGR0WQ",
   },
};



export function fetchBreeds() { 
    return fetch(`${BASE_URL}${END_POINT_BREEDS}`, options)
        .then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        };
        return res.json();
    })
};


export function fetchCatByBreed(breedId) { 
    return fetch(`${BASE_URL}${END_POINT_BREED_ID}?breed_ids=${breedId}`, options)
    .then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        };
        return res.json();
    })
};


