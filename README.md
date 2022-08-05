# mongo-coupon-geoquery

This project is setup with mongoose, node, express.
It showcase working with mongo geoJson object, and geospatial query

## How to run this project

* Clone this repo
* Do `npm install`
* Add .env file similar to an .example.env provided
* Change PORT and MongodbUrl in the env
* Run command ` npm run start `

---
## This project has two apis endpoints :

* **GET** : /api/v1/coupon
  * require query parameter _{ latitude, longitude }_
  * In file _coupon.service.js_ , a variable  **maxDistanceInMeter** shows the search area in which the coupons will be searched based in given coordinates.

* **POST** : /api/v1/coupon
  * require req.body
  * ```
    // Example
      {
        "name": "Coupon 1",
        "couponCode": "FREE10",
        "description": "Code promo",
        "expirationDate": "2022-12-11",
        "location": {
          "type": "Point",
          "coordinates": [
            72.5324024,
            23.0355063
          ]
        }
      }
       ```