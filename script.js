const API_KEY = '46167402-2251e3de48ab87bd38f61e007'; 
const imageContainer = document.getElementById('imageContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const caption = document.getElementById('caption');
const downloadLink = document.getElementById('downloadLink');
const shareBtn = document.getElementById('shareBtn');
const closeModal = document.getElementsByClassName('close')[0];


async function fetchImages(query) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`);
        const data = await response.json();

        
        if (data.hits && data.hits.length > 0) {
            displayImages(data.hits);
        } else {
            alert('No images found. Please try a different search term.');
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        alert('Failed to fetch images. Please try again later.');
    }
}


function displayImages(images) {
    imageContainer.innerHTML = ''; 
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL; 
        imgElement.alt = image.tags; 
        imgElement.classList.add('gallery-image'); 
        imgElement.addEventListener('click', () => openModal(image)); 
        imageContainer.appendChild(imgElement); 
    });
}


function openModal(image) {
    modal.style.display = 'block'; 
    modalImage.src = image.largeImageURL; 
    caption.innerText = `Title: ${image.tags} | Author: ${image.user}`; 
    
    
    downloadLink.addEventListener('click', () => downloadImage(image.largeImageURL));
    
    
    shareBtn.onclick = () => shareImage(image.largeImageURL);
}


async function downloadImage(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image_${new Date().getTime()}.jpg`; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); 
        window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.error('Error downloading image:', error);
        alert('Failed to download the image.');
    }
}


function shareImage(imageUrl) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this image!',
            url: imageUrl 
        })
        .then(() => console.log('Image shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        
        alert('Sharing is not supported in this browser. Copy the link to share: ' + imageUrl);
    }
}


closeModal.onclick = () => {
    modal.style.display = 'none'; 
};


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim(); 
    if (query) {
        fetchImages(query); 
    } else {
        alert('Please enter a search term.'); 
    }
});


fetchImages('nature'); 