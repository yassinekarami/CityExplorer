import {parentPort, workerData} from 'worker_threads';

async function fetchByCriteria() {
    try {
        const { limit, offset, filteringString} = workerData;
        console.log(filteringString)
        const url = `https://data.loire-atlantique.fr/api/explore/v2.1/catalog/datasets/793866443_restaurants-en-loire-atlantique/records?limit=${limit}&offset=${offset}&where=${filteringString}`;
        const response = await fetch(url);
        const data = await response.json();
        parentPort.postMessage(data);
    } catch (err) {
        parentPort.postMessage({ error: err.message });
    }
}

fetchByCriteria();
