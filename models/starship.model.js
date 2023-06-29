const mongoose = require('./mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *   Starship:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      required: true
 *     model:
 *      type: string
 *     starship_class:
 *      type: string
 *     manufacturer:
 *      type: string
 *     cost_in_credits:
 *      type: string
 *     length:
 *      type: string
 *     crew:
 *      type: string
 *     passengers:
 *      type: string
 *     max_atmosphering_speed:
 *      type: string
 *     hyperdrive_rating:
 *      type: string
 *     MGLT:
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
const starshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
    },
    starship_class: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    cost_in_credits: {
        type: String,
    },
    length: {
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
    hyperdrive_rating: {
        type: String,
    },
    MGLT: {
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

const StarshipSchema = mongoose.model('starship', starshipSchema);

module.exports = StarshipSchema