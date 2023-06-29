const mongoose = require('./mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *   People:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     name:
 *      type: string
 *      required: true
 *     birth_year:
 *      type: string
 *     eye_color:
 *      type: string
 *     gender:
 *      type: string
 *     hair_color:
 *      type: string
 *     height:
 *      type: string
 *     mass:
 *      type: string
 *     skin_color:
 *      type: string
 *     homeworld:
 *      type: string
 *     films:
 *      type: array
 *      items: 
 *       type: string
 *     species:
 *      type: array
 *      items: 
 *       type: string
 *     starships:
 *      type: array
 *      items: 
 *       type: string
 *     vehicles:
 *      type: array
 *      items: 
 *       type: string
 */
const peopleSchema = new mongoose.Schema({
    id:{
        type: String
    },
    name: {
        type: String,
        required: true
    },
    birth_year: {
        type: String,
    },
    eye_color: {
        type: String,
    },
    gender: {
        type: String,
    },
    hair_color: {
        type: String,
    },
    height: {
        type: String,
    },
    mass: {
        type: String,
    },
    skin_color: {
        type: String,
    },
    homeworld: {
        type: String,
    },
    films: [
        {
            type: String
        }
    ],
    species: [
        {
            type: String
        }
    ],
    starships: [
        {
            type: String
        }
    ],
    vehicles: [
        {
            type: String
        }
    ],
    url: {
        type: String,
    },
}, {timestamps: true});

const PeopleSchema = mongoose.model('people', peopleSchema);

module.exports = PeopleSchema