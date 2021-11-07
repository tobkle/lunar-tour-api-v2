import { getAllListings, getAListing } from "./query";
import { makeABooking } from "./mutation"
export const resolvers = {
  Query: {
    getAllListings: (root, args, context) => getAllListings(args, context),
    getAListing: (root, args, context) => getAListing(args, context)
  },
  Mutation: {
    makeABooking: (root, args, context) => makeABooking(args, context)
  }
};
