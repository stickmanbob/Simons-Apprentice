export default function preloadImages(urls, loadedCallback) {
    let loadedCount = 0;
    let totalImages = urls.length;
    
    urls.forEach( (url) => {
        let img = new Image();
        img.src = url;
        img.onload= () => {
          
            loadedCount ++;

            // console.log("images loaded", loadedCount);

            if(loadedCount === totalImages) {
                // console.log("all images loaded")
                loadedCallback(); 
            }
        }
    });
    
}