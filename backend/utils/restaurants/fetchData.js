import {parentPort, workerData} from 'worker_threads';

async function fetchData() {
    try {
        const { limit, offset } = workerData;
        const url = `https://data.loire-atlantique.fr/api/explore/v2.1/catalog/datasets/793866443_restaurants-en-loire-atlantique/records?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);
        const data = await response.json();
        parentPort.postMessage(data);
    } catch (err) {
        parentPort.postMessage({ error: err.message });
    }
}

fetchData();
