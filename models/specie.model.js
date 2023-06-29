const mongoose = require('./mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *   Specie:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      required: true
 *     classification:
 *      type: string
 *     designation:
 *      type: string
 *     average_height:
 *      type: string
 *     average_lifespan:
 *      type: string
 *     eye_colors:
 *      type: string
 *     hair_colors:
 *      type: string
 *     skin_colors:
 *      type: string
 *     language:
 *      type: string
 *     homeworld:
 *      type: string
 *     people:
 *      type: array
 *      items: 
 *       type: string
 *     films:
 *      type: array
 *      items: 
 *       type: string
 *     url:
 *       type: string
 */
const specieShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classification: {
        type: String,
    },
    designation: {
        type: String,
    },
    average_height: {
        type: String,
    },
    average_lifespan: {
        type: String,
    },
    eye_colors: {
        type: String,
    },
    hair_colors: {
        type: String,
    },
    skin_colors: {
        type: String,
    },
    language: {
        type: String,
    },
    homeworld: {
        type: String,
    },
    people: [
        {
            type: String
        }
    ],
    films: [
        {
            type: String
        }
    ],
    url: {
        type: String,
    },
}, {timestamps: true});

const SpecieSchema = mongoose.model('specie', specieShema);

module.exports = SpecieSchema