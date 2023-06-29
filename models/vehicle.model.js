const mongoose = require('./mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *   Vehicle:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      required: true
 *     model:
 *      type: string
 *     vehicle_class:
 *      type: string
 *     manufacturer:
 *      type: string
 *     cost_in_credits:
 *      type: string
 *     crew:
 *      type: string
 *     passengers:
 *      type: string
 *     max_atmosphering_speed:
 *      type: string
 *     cargo_capacity:
 *      type: string
 *     consumables:
 *      type: string
 *     films:
 *      type: array
 *      items: 
 *       type: string
 *     pilots:
 *      type: array
 *      items: 
 *       type: string
 *     url:
 *       type: string
 */
const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
    },
    vehicle_class: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    cost_in_credits: {
        type: String,
    },
    crew: {
        type: String,
    },
    passengers: {
        type: String,
    },
    max_atmosphering_speed: {
        type: String,
    },
    cargo_capacity: {
        type: String,
    },
    consumables: {
        type: String,
    },
    films: [
        {
            type: String
        }
    ],
    pilots: [
        {
            type: String
        }
    ],
    url: {
        type: String,
    },
}, {timestamps: true});

const VehicleSchema = mongoose.model('vehicle', vehicleSchema);

module.exports = VehicleSchema