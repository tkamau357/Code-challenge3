// Get movie data from API and populate UI with first movie details
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
        
        for(let i=0;i<data.length;i++){
            let Poster = data[i].poster;
            let Title = data[i].title;
            let Runtime = data[i].runtime;
            let Showtime = data[i].showtime;
            let AvailableTickets = data[i].availableTickets;
            let Description = data[i].description;
            document.querySelector(".Movielist").innerHTML+=`
               <p>${Title}</p>
               <p>${Runtime}</p>
               <p>${Showtime}</p>
               <p>${AvailableTickets}</p>
               <p>${Description}</p>
               <img src='${Poster}'>
               `;
          }
      })
      .catch(error => console.error(error));

    // Populate UI with movie details
    function populateMovieDetails(index) {
        fetch("http://localhost:3000/films",{
            method:'POST',
            headers: {
               "Content-Type": "application/json"
            },
             body: JSON.stringify(index),
        })
        .then (response => response.json())
        .then (data => console.log(data))
        
      const movie = movies[index];
      const poster = document.getElementById('poster');
      const title = document.getElementById('title');
      const runtime = document.getElementById('runtime');
      const showtime = document.getElementById('showtime');
      const availableTickets = document.getElementById('availabletickets');
      const description = document.getElementById('description');

      poster.src = movie.poster;
      title.innerText = movie.title;
      runtime.innerText = `Runtime: ${movie.runtime} minutes`;
      showtime.innerText = `Showtime: ${movie.showtime}`;
      availableTickets.innerText = `Available Tickets: ${movie.availableTickets}`;
      description.innerText = `Description: ${movie.description}`;
    }

    // Populate film list
    function populateFilmList() {
      const filmList = document.getElementById('films');
      fetch("http://localhost:3000/films",{
            method:'POST',
            headers: {
               "Content-Type": "application/json"
            },
             body: JSON.stringify(),
        })
        .then (response => response.json())
        .then (data => console.log(data))

      // Remove placeholder li element
      filmList.removeChild(filmList.firstElementChild);

      // Add each movie to film list
      movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.innerText = movie.title;
        li.classList.add('film', 'item');
        li.addEventListener('click', () => populateMovieDetails(index));
        filmList.appendChild(li);

        fetch("http://localhost:3000/films",{
            method:'POST',
            headers: {
               "Content-Type": "application/json"
            },
             body: JSON.stringify(index),
        })
        .then (response => response.json())
        .then (data => console.log(data))
      });
    }

    // Handle ticket purchase
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.addEventListener('click', () => {
        
        const availableTickets = document.getElementById('available-tickets');
      //   const numAvailableTickets = parseInt(availableTickets.innerText.split(':')[1]);
      // if (numAvailableTickets > 0) {
      //   availableTickets.innerText = `Available Tickets: ${numAvailableTickets - 1}`;
      // } else {
      //   alert('This showing is sold out.');
      // }
    });