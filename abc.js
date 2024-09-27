async function fetchImages() {
    const query = document.getElementById('searchQuery').value || 'nature';
    const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.status !== 200) {
            console.error("Error fetching data:", data);
            alert(`Error ${response.status}: ${data.message}`);
            return;
        }

        if (data.totalHits === 0) {
            alert("No images found!");
            return;
        }

        displayImages(data.hits);
    } catch (error) {
        console.error("Error connecting to Pixabay:", error);
        alert("There was an issue connecting to Pixabay.");
    }
}
