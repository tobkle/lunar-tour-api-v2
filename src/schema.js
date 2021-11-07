const schema = `

type ListingType {
  name: String
}

type ListingActivities {
  name: String
}

type Guide {
  Name: String
  Bio: String
  Avatar: String
}

type Listing {
     listingId: String
     coverPhoto: String
     listingName: String
     listingDescription: String
     listingType: [ListingType]
     listingLocation: String
     listingActivities: [ListingActivities]
     specialType: String
     specialAmount: Int
     rating: Int
     guide: Guide
     price: String
     numberOfDays: Int
  
  }
  



  
  type Booking {
      ID: String
      listingID: String
      bookingDate: String
      size: Int
      bookingTotal: String
      customerEmail: String
      customers: [Customer]
      chargeReciept: String
  
  }
  type Customer {
    name: String
    Surname: String
     country: String
    passportNumber: String
    physioScore: String
  }

  input InputCustomer {
    name: String
    Surname: String
     country: String
    passportNumber: String
    physioScore: String
  }
  input BookingInput {
      ID: String
      listingID: String
      bookingDate: String
      size: Int
      bookingTotal: String
      customerEmail: String
      customers: InputCustomer
  
  }
  
  type Query {
    getAllListings: [Listing]
    getAListing(listingId: String!): Listing!
  }
  
  type Mutation {
    makeABooking(
      listingId: String
      size: Int,
      bookingDate: String,
      customerEmail: String,
      customers: [InputCustomer]
    ): Booking
  
  }
  

`;

export { schema };
