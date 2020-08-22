/*
Animals Ahoy!
Given a list of REST endpoints, write an infinite scrollable page that loads farm animal
images which are not duplicate of each other.
1. Every rest endpoint will give you a URL of an image. Image of an animal
2. The animal has be shown below in the page, and based on scrollbar movement, it
should load more
3. Images will repeat in the API response (which is random). But it should not repeat
in your display.
Expectations from a good design:
1. Images will come in random sizes. You are expected to not break the page design as much as possible.
2. Arrangements of images in the page is left to your imagination and creativity You can rearrange them.
3. A good design will take care of memory consumed in the browser

Cat: https://aws.random.cat/meow 
Dog: https://random.dog/woof.json

*/

{
    let totalImagesDisplayed = 0;

    const CSS_CLASSES = {
        "main_gallery": "gallery",
        "total_image_h1": "totalImg"
    }

    // storing already rendered images
    let imageUrlMap = new Set();

    const fetchImages = async() => {

        let response = await fetch("https://aws.random.cat/meow");
        let json_response = await response.json();
        return json_response["file"];
    }

    const createImageHTML = (url) => {
 
        return `<div><img src="${url}" alt="Random Image from ${url}"></div>`;
    }

    const displayImages = (image_html) => {
        
        document.getElementsByClassName(CSS_CLASSES["main_gallery"])[0].insertAdjacentHTML('beforeend', image_html);
    }

    const updateImgCounter = () => {
        document.getElementsByClassName(CSS_CLASSES["total_image_h1"])[0].innerHTML = `Total Images are ${totalImagesDisplayed}`;
    }

    const renderNImages = (num) => {
        
        for(let i = 0 ; i < num ; i++) {

            fetchImages().then((url) => {
    
                if(!imageUrlMap.has(url)) {
    
                    imageUrlMap.add(url);
                    image_html = createImageHTML(url);
                    displayImages(image_html); 
                    totalImagesDisplayed++;
                    updateImgCounter();             
                }

                else
                console.log('Image already displayed !!');

            }).catch((error) => {
                console.log(error);
            });              
        }
    }

    document.addEventListener('scroll', function() {

        if(document.body.scrollHeight === window.scrollY + window.innerHeight) {
            console.log('Scroll Triggered !!!');
            renderNImages(5);
        }
    });

    // initialize the screen with 10 images
    renderNImages(10);
}