import fastify from "fastify";
import { getRestaurants, filterRestaurant } from "../controller/restaurant.controller.js";

const getRestaurantsRoute = {
    method: 'GET',
    url: '/',
    handler:  getRestaurants
};

const filterRestaurantsRoute = {
    method: 'POST',
    url: '/filter',
    handler: filterRestaurant
};
export {getRestaurantsRoute, filterRestaurantsRoute};