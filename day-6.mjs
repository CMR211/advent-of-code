import { initialPopulation } from "./inputs/day-6-input.mjs";

const initialState = {
    day: 0,
    population: [...initialPopulation],
};

// solve6a(initialState)
// -> After day 80: 351092.

// solve6b(initialState)
// -> After day 256 there will be 1595330616005 lanternfish

function reducePopulation(population) {
    // Reducing array with individual ages to 9 element array with quantity of each age
    const demographics = [];
    for (let age = 0; age <= 8; age++) {
        const qty = population.filter(element => element === age).length;
        demographics.push(qty);
    }
    return demographics;
}

function solve6b(initialPopulation) {
    // Redoing previous solver function because it ran out of memory after day 130
    const demographics = reducePopulation(initialPopulation);
    let day = 1;
    while (day <= 256) {
        // Assuming demographics array stores quantity of each age (from 0 to 8)
        //  when we shift it, it is like a 1 day passed
        // Const shifted is a number of freshly born fish so we push them to
        //  the end since their time to breed equal 8 days
        //  we also add them to current number of fish with 6 days to breed
        const shifted = demographics.shift();
        demographics[6] += shifted; // d: [4, 6, 8, 10, 12, 14, 18, 18] s: 2
        demographics.push(shifted); // d: [4, 6, 8, 10, 12, 14, 18, 18, 2]
        day++;
    }
    console.log(
        `After day 256 there will be ${demographics.reduce(
            (a, b) => a + b
        )} lanternfish`
    );
}

function solve6a(currentState) {
    console.log(
        `After day ${currentState.day}: ${currentState.population.length}.`
    );
    if (currentState.day === 80) return;
    const futureState = {
        day: currentState.day + 1,
        population: [],
    };
    currentState.population.forEach(age => {
        if (age < 1) {
            addToState(futureState.population);
            updateState(6, futureState.population);
        }
        if (age > 0) {
            updateState(age - 1, futureState.population);
        }
    });
    return passDay(futureState);
}

function addToState(futureState) {
    updateState(8, futureState);
}

function updateState(age, futureState) {
    futureState.push(age);
}
