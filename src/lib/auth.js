import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('drivefleet');

export const auth = betterAuth({
  database: mongodbAdapter(db), // এখানে client আলাদা করে দেওয়ার প্রয়োজন নেই যদি db কানেকশন অলরেডি থাকে
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_SECRET, 
    }, // এটি socialProviders ক্লোজ করছে
  }, // এটি betterAuth এর মেইন অবজেক্ট ক্লোজ করছে
}); // এটি betterAuth ফাংশন ক্লোজ করছে