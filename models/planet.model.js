const mongoose = require('./mongoose')

/**
 * @openapi
 * components:
 *  schemas:
 *   Planet:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      required: true
 *     diameter:
 *      type: string
 *     rotation_period:
 *      type: string
 *     orbital_period:
 *      type: string
 *     gravity:
 *      type: string
 *     population:
 *      type: string
 *     climate:
 *      type: string
 *     terrain:
 *      type: string
 *     surface_water:
 *      type: string
 *     residents:
 *      type: array
 *      items: 
 *       type: string
 *     film:
 *      type: array
 *      items: 
 *       type: string
 *     url:
 *       type: string
 */
const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    diameter: {
        type: String,
    },
    rotation_period: {
        type: String,
    },
    orbital_period: {
        type: String,
    },
    gravity: {
        type: String,
    },
    population: {
        type: String,
    },
    climate: {
        type: String,
    },
    terrain: {
        type: String,
    },
    surface_water: {
        type: String,
    },
    residents: [
        {
            type: String
        }
    ],
    film: [
        {
            type: String
        }
    ],
    url: {
        type: String,
    },
}, {timestamps: true});

const PlanetSchema = mongoose.model('planet', planetSchema);

module.exports = PlanetSchema