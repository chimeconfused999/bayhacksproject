window.transitionToPage = function(href, id) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 300)
  }
  
  function createEvent1() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  preloadImages(startAfterPreload);
  function startAfterPreload(){
    setTimeout(function() {
      document.querySelector('body').style.opacity = 1;
    }, 50);
  }
  
  // Function to preload images
  function preloadImages(callback) {
    var imageUrls = [
            "Croppedbackground1.png",
    ]
    // if (document.title == "index"){
    //     var imageUrls = [
    //         "Croppedbackground1.png"
    //     ]
    // }
  
    var loadedImagesCount = 0;
    var totalImages = imageUrls.length;
  
    function loadImage(url) {
      if (!url) {
        loadedImagesCount++;
        if (loadedImagesCount === totalImages-1) {
          callback();
        }
        return;
      }
  
      var img = new Image();
      img.src = url;
  
      img.onload = function() {
  
        loadedImagesCount++;
        if (loadedImagesCount === totalImages) {
          callback();
        }
      };
  
      img.onerror = function() {
        console.error("Error loading image: " + url);
        loadedImagesCount++;
        if (loadedImagesCount === totalImages) {
          callback();
        }
      };
    }
  
    imageUrls.forEach(function(url) {
      loadImage(url);
    });
  }
  
  //json testing
  function send(bool){
      if(bool == true){
          var additional = document.getElementById("additional").value;
          additionalcomments = additional;
  
      }
    else{
      var additional = bool;
      additionalcomments = additional;
      
    }
  
        $.ajax({
          type: "POST",
          url: "calendar.php",
          contentType: "application/json",
          data: JSON.stringify(additionalcomments),
          success: function(response) {
            console.log("Data sent successfully:", response);
          },
          error: function(error) {
            console.error("Error sending data:", error);
          }
        });
      }
  place = "fremont"
  start = "8:00 AM"
  end = "10:00 AM"
  activities = "horseplay"
  purpose = "funy"
  data = {
    place: place,
    starttime: start,
    endtime: end,
    activities: activities,
    purpose: purpose
    
  }
  send(data)
  
  
  //fetching json
  // Fetch JSON data from the file
  fetch('data.json')
      .then(response => {
          // Check if the response is successful
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the JSON data
      })
      .then(data => {
          displayData(data); // Pass the data to the function to display it
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
  
  // Function to display JSON data in the HTML
  function displayData(data) {
  
      const dataContainer = document.getElementById('schedule');
      let html = '<ul>'; // Start unordered list
  
      html += `<li>Location: ${place}, Start Time: ${start}, End Time: ${end}, Activities: ${activities}, Purpose:${purpose}</li>`;
  
      html += '</ul>'; // End unordered list
      dataContainer.innerHTML = html; // Inject the generated HTML into the container
  }
  