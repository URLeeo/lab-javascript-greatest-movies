// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(movie => {
    return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama');
  }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;

  const totalScore = moviesArray.reduce((sum, movie) => {
    return sum + Number(movie.score || 0);
  }, 0);

  return Number((totalScore / moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));

  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return [...moviesArray].sort((movieA, movieB) => {
    if (movieA.year === movieB.year) {
      return movieA.title.localeCompare(movieB.title);
    }

    return movieA.year - movieB.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return [...moviesArray]
    .sort((movieA, movieB) => movieA.title.localeCompare(movieB.title))
    .slice(0, 20)
    .map(movie => movie.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
    const hoursMatch = movie.duration.match(/(\d+)h/);
    const minutesMatch = movie.duration.match(/(\d+)min/);

    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

    return {
      ...movie,
      duration: hours * 60 + minutes
    };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;

  const moviesByYear = moviesArray.reduce((years, movie) => {
    if (!years[movie.year]) {
      years[movie.year] = [];
    }

    years[movie.year].push(movie.score);
    return years;
  }, {});

  const yearlyAverages = Object.keys(moviesByYear).map(year => {
    const scores = moviesByYear[year];
    const total = scores.reduce((sum, score) => sum + score, 0);

    return {
      year: Number(year),
      average: Number((total / scores.length).toFixed(2))
    };
  });

  const bestYear = yearlyAverages.sort((yearA, yearB) => {
    if (yearB.average === yearA.average) {
      return yearA.year - yearB.year;
    }

    return yearB.average - yearA.average;
  })[0];

  return `The best year was ${bestYear.year} with an average score of ${bestYear.average}`;
}
