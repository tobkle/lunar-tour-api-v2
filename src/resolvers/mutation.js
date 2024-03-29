import { v1 as uuidv1 } from "uuid";
import stripePackage from "stripe";
import * as dynamoDBLib from "../../libs/dynamodb-lib";
// import { transport, mailTemp } from "../../libs/mail";

export const makeABooking = async (args, context) => {
    //Get the listing that the user selected
    //from the client
    const getPrices = async () => {
        const params = {
            TableName: process.env.ListingsDB || "dev-listings",
            KeyConditionExpression: "listingId = :listingId",
            ExpressionAttributeValues: {
                ":listingId": args.listingId,
            },
        };
        try {
            const listings = await dynamoDBLib.call("query", params);
            return listings;
        } catch (e) {
            return e;
        }
    };

    //set the listing to a variables so we can resuse it
    const listingObject = await getPrices();
    //caLCULATE THE amount to be charged to the
    //customers card
    const bookingCharge = parseInt(listingObject.Items[0].price) * args.size;
    //get the name of the listing
    const listingName = listingObject.listingName;
    //create an instance of the stripe lib
    console.log(process.env.stripeSecretKey);
    const stripe = stripePackage(process.env.stripeSecretKey);
    //charge the users card
    const stripeResult = await stripe.charges.create({
        source: "tok_visa",
        amount: bookingCharge,
        description: `Charge for booking of listing ${args.listingId}`,
        currency: "usd",
    });

    //create the booking in the table
    const params = {
        TableName: process.env.BookingsDB,
        Item: {
            bookingId: uuidv1(),
            listingId: args.listingId,
            bookingDate: args.bookingDate,
            size: args.size,
            bookingTotal: bookingCharge,
            customerEmail: args.customerEmail,
            customers: args.customers,
            createdTimestamp: Date.now(),
            chargeReciept: stripeResult.receipt_url,
            paymentDetails: stripeResult.payment_method_details,
        },
    };

    try {
        //insert the booking into the table
        await dynamoDBLib.call("put", params);

        //kick off the mailer to the customers email
        // await transport
        //   .sendEmail({
        //     From: "info@zansi.co.za",
        //     To: params.Item.customerEmail,
        //     Subject: `Your order confirmation for ${listingName}`,
        //     TextBody: mailTemp(
        //       `You have successfully booked a trip for ${listingName}!  Here is your booking refernce: ${params.Item.bookingId} Here is a link to your reciept 📡: ${params.Item.chargeReciept}`
        //     )
        //   })
        //   .then(res => console.log(res));
        //return true to let us know that the mutation was successfull
        return {
            bookingId: params.Item.bookingId,
            listingId: params.Item.listingId,
            bookingDate: params.Item.bookingDate,
            size: params.Item.size,
            bookingTotal: params.Item.bookingTotal,
            customerEmail: params.Item.customerEmail,
            customers: params.Item.customers.map((c) => ({
                name: c.name,
                Surname: c.Surname,
                country: c.country,
                passportNumber: c.passportNumber,
                physioScore: c.physioScore,
            })),
            chargeReciept: params.Item.chargeReciept,
        };
    } catch (e) {
        return e;
    }
};
