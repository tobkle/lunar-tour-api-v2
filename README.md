
# Lunar Tour API

This is a GraphQL powered backed that is deployed using the Serverless framework onto AWS Lambda using Seed. 

## Configuration

 Install all its dependancies:

```
$ yarn install
```

Then you should be able to invoke the Lambda locally:

```
$ yarn offline
```

To deploy to AWS simply merge or commit code into the master branch and Seed will take care of the rest.

## Schema

```
type Listing {
   ID: Int
   coverPhoto: String
   listingName: String
   listingDescription: String
   listingType: String
   listingActivities: String
   specialType: String
   specialAmount: Int
   rating: Int
   guide: Guide
   price: String
   numberOfDays: Int

}

type Guide {
  ID: Int
  Name: String
  Bio: String
}

type Customer {
  name: String
  Surname: String
   country: String
  passportNumber: String
  physioScore: String
}

type Booking {
    ID: String
    listingID: String
    bookingDate: String
    size: Int
    bookingTotal: String
    customerEmail: String
    customers: [Customer]

}

input BookingInput {
 ID: String
    listingID: String
    bookingDate: String
    size: Int
    bookingTotal: String
    customerEmail: String
    customers: [Customer]

}

type Query {
  getAllListings: [Listing!]!
  getAListing(ID: String!): Listing!
}

type Mutation {
  makeABooking(input: BookingInput): Boolean

}

```



## How to execute mutation

Mutation document:
```
mutation makeABooking($customerEmail: String!,$size:Int!,$input: [InputCustomer]){
  makeABooking(customerEmail:$customerEmail,size:$size , customers: $input)
  
}
```

Query variables:

```

{
  "customerEmail": "test.com",
  "size": 4,
  "input": [
    {
    "name":"bob",
    "Surname": "wheezy",
    "physioScore": "340",
    "passportNumber": "345545454",
    "country": "spain"
  },{
    "name":"yolande",
    "Surname": "hendler",
    "physioScore": "340",
    "passportNumber": "345545454",
    "country": "spain"
  }
  
  ]
}
```