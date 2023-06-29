const mongoose = require('./mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *   Film:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      required: true
 *     episode_id:
 *      type: number
 *     opening_crawl:
 *      type: string
 *     director:
 *      type: string
 *     producer:
 *      type: string
 *     release_date:
 *      type: Date
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
 *     characters:
 *      type: array
 *      items: 
 *       type: string
 *     planets:
 *      type: array
 *      items: 
 *       type: string
 *     url:
 *       type: string
 */
const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    episode_id: {
        type: Number,
    },
    opening_crawl: {
        type: String,
    },
    director: {
        type: String,
    },
    producer: {
        type: String,
    },
    release_date: {
        type: Date,
    },
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
    characters: [
        {
            type: String
        }
    ],
    planets: [
        {
            type: String
        }
    ],
    url: {
        type: String,
    },
}, {timestamps: true});

const FilmSchema = mongoose.model('film', filmSchema);

module.exports = FilmSchema