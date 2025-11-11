import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'url';
import { dirname, resolve} from 'path';
import path from 'path';


/**
 * woker's directory name
 */
const __dirname = "../backend/utils/restaurants";
/**
 * worker for fetching all the data
 */
const fetchData = "fetchData.js";
/**
 * worker for fetching data by criteria
 */
const fetchByCriteria = "fetchByCriteria.js";



/**
 * call the api to get restaurants list
 * api https://data.loire-atlantique.fr/explore/dataset/793866443_restaurants-en-loire-atlantique/api/?location=9,47.31379,-1.75575&basemap=jawg.streets
 * api https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html
 * @param {*} req 
 * @param {*} res 
 */
const getRestaurants = async function(req, res) {

    const THREAD_COUNT = 4;
 
    const limit = 100;
    let offset = 0;

    let total_count = 0;
    let allResults = []

    do {
      
        const workerPromises = Array.from({length: THREAD_COUNT},(_, i) => {
            const workerData = {  limit, offset, thread_count: 4 };
            return createWorker(workerData, fetchData)
        });

        const thread_results = await Promise.all(workerPromises);
       
        const batchResults = thread_results
            .filter(obj => obj && Array.isArray(obj.results))
            .flatMap(obj => obj.results); 

        allResults.push(...batchResults);
        total_count = thread_results[0].total_count;

        offset += THREAD_COUNT * limit;
    }   while(offset < total_count);

    return res.code(200).send(allResults)
}

/**
 * https://data.loire-atlantique.fr/api/explore/v2.1/catalog/datasets/793866443_restaurants-en-loire-atlantique/records?limit=20&where=categorie!='Pizzeria'

 * @param {*} req 
 * @param {*} res 
 */
const filterRestaurant = async function(req, res) {

    const filteringString = createFilteringString(req.body);

    const THREAD_COUNT = 4;
 
    const limit = 100;
    let offset = 0;

    let total_count = 0;
    let allResults = []

    do {
      
        const workerPromises = Array.from({length: THREAD_COUNT},(_, i) => {
            const workerData = {  limit, offset, filteringString, thread_count: 4 };
            return createWorker(workerData, fetchByCriteria)
        });

        const thread_results = await Promise.all(workerPromises);
       
        const batchResults = thread_results
            .filter(obj => obj && Array.isArray(obj.results))
            .flatMap(obj => obj.results); 

        allResults.push(...batchResults);
        total_count = thread_results[0].total_count;

        offset += THREAD_COUNT * limit;
    }   while(offset < total_count);

    return res.code(200).send(allResults)
    
}

/**
 * create a string for filtering the api
 * @param {*} body 
 */
function createFilteringString(body) {
    const categoryMap = {
        pizzeria: "Pizzeria",
        cuisineTraditionnelle: "Cuisine traditionnelle",
        brasserie: "Brasserie",
        restaurationRapide: "Restauration rapide",
        bistrotBarAVin: "Bistrot / bar à vin",
        restaurantGastronomiqueCuisineRaffinee: "Restaurant gastronomique - cuisine raffinée",
        creperie: "Crêperie",
        cuisineDuMonde: "Cuisine du Monde",
        guinguette: "Guinguette",
        grillRotisserie: "Grill - Rôtisserie",
        salonDeThe: "Salon de thé",
        fruitDeMer: "Fruits de mer",
        coffeeShop: "Coffee-shop",
        cafeteria: "Cafétéria"
    };

    const criteria = Object.entries(categoryMap)
        .filter(([key]) => body[key])
        .map(([, value]) => `categorie='${value}'`);

    return criteria.join(" or ");
}



/**
 * create a worker to perform an api call with the given parameter
 * @param {*} limit the limit parameter in the api call
 * @param {*} offset the offset in the api call
 * @returns 
 */
function createWorker(workerData, workerName) {
  
    return new Promise((resolve, reject) => {

        const worker = new Worker( path.resolve(__dirname, workerName),
            {
                workerData
            }
        );
        worker.on('message', (data) => {
            resolve(data);
        });

        worker.on('error', (error) => {
            reject(error);
        });

        worker.on('exit', (code) => {
            console.log(`Worker exited with code ${code}`);
        });
    });
}


export {getRestaurants, filterRestaurant};