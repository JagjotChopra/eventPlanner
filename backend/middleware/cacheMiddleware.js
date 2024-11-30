const Redis = require('ioredis');
const redis = new Redis(); // Configure your Redis connection here

// Middleware to cache responses
const cacheMiddleware = (keyGenerator) => async (req, res, next) => {
  const cacheKey = keyGenerator(req); // Generate a unique key based on the request

  try {
    const cachedData = await redis.get(cacheKey);

    if (req.method === 'GET') {
        if (cachedData) {
            console.log('I found cached data',cacheKey)
          // Send cached response if it exists
         return res.json(JSON.parse(cachedData));
        } else {
          // Otherwise, proceed to the controller and cache the result
          console.log('I dont found cached data. So i am running controller')
          res.jsonResponse = res.json;
          res.json = (body) => {
            redis.setex(cacheKey, 3600, JSON.stringify(body)); // Cache for 1 hour
            res.jsonResponse(body);
          };
          next();
        }
    }
    else{
        if(cacheKey=="eventCategory"){
            console.log("clearing cache category data")
            await redis.del('myEndpoint:/api/v1/eventcategories');
            await redis.del('myEndpoint:/api/v1/admin/EventCategory');
           
        }
        if(cacheKey=="eventVenue"){
            console.log("clearing cache venue data")
            await redis.del('myEndpoint:/api/v1/eventvenue/venues');
            await redis.del('myEndpoint:/api/v1/eventvenue/eventvenues');
            await redis.del('myEndpoint:/api/v1/eventvenue/eventvenues/cities');
            await redis.del('myEndpoint:/api/v1/admin/GetEventVenue');
        }
        next();
    }

  


  } catch (error) {
    console.error('Redis error:', error);
    next();
  }
};

module.exports = cacheMiddleware;