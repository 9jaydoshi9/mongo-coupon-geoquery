# mongo-coupon-geoquery

This project is setup with mongoose, node, express.
It uses mongo geoJson object, and geospatial query.

## How to run this project

* Clone this repo
* Do `npm install`
* Add .env file similar to an .example.env provided
* Change **PORT** and **MongodbUrl** in the `.env` file.
* Run command ` npm run start `

---
## This project has two apis endpoints :

* **GET** : /api/v1/coupon
  * To get coupons within a range of radius from a location.
  * require query parameter _{ latitude, longitude }_
  * In file _coupon.service.js_ , a variable  **maxDistanceInMeter** shows the search area in which the coupons will be searched based in given coordinates.
  * Shows coupons which are not expired.

* **POST** : /api/v1/coupon
  * To add new coupon with location details. 
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
*Use node *v16*
