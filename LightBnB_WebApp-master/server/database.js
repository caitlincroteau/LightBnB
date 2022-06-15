const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const { query } = require('express');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const values = [email];
  const queryString = `
  SELECT * FROM users WHERE email = $1`;
  
  return pool
  .query(queryString, values)
  .then(result => {
    return result.rows[0];
  })
  .catch((err) => {
    return null;
  });

  // OG CODE:
  //let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const values = [id];
  const queryString = `
  SELECT * FROM users WHERE id = $1`;
  
  return pool
  .query(queryString, values)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    return null;
  });

  // OG CODE: return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const values = [user.name, user.email, user.password];
  const queryString = `INSERT into users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  
  return pool
  .query(queryString, values)
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    return null;
  });

  // OG CODE:
  //const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const values = [guest_id, limit];
  const queryString = `
  SELECT reservations.*, properties.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`;

  return pool
  .query(queryString, values)
  .then(result => {
    console.log('reservations', result.rows);
    return result.rows;
  })
  .catch(err => {
    return null;
  });

  // OG CODE: return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {

  let values = [];
  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;

  //check for city
  if (options.city) {
    values.push(`%${options.city}%`);
    if (values.length === 1) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryString += `city LIKE $${values.length} `;
  }

  //check for owner_id
  if (options.owner_id) {
    values.push(`${options.owner_id}`);
    if (values.length === 1) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryString += `owner_id LIKE $${values.length} `; 
  }

  //check for min price/night
  if (options.minimum_price_per_night) {
    let priceFormatted = options.minimum_price_per_night * 100;
    values.push(`${priceFormatted}`);
    if (values.length === 1) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryString += `cost_per_night >= $${values.length} `;
  }

  //check for max price/night
  if (options.maximum_price_per_night) {
    let priceFormatted = options.maximum_price_per_night * 100
    values.push(`${priceFormatted}`);
    if (values.length === 1) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryString += `cost_per_night <= $${values.length} `;
  }

  //group by
  queryString += `
  GROUP BY properties.id `;

  //check for min rating
  if (options.minimum_rating) {
    values.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(rating) >= $${values.length} `;
  }

  //order and limit
  values.push(limit);
  queryString += `
  ORDER by cost_per_night
  LIMIT $${values.length};
  `;

  console.log("QUERY:", queryString, 'VALUES ', values)

  return pool
  .query(queryString, values)
  .then(result => {
    console.log("result", result.rows)
    return result.rows;
  })
  .catch(err => {
    console.log('error', err.message)
    return null;
  });
};

//   OG CODE:
//const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
