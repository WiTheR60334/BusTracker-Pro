const { clientPromise } = require("@/util/DB");
const NextAuth = require("next-auth");
const GoogleProvider = require("next-auth/providers/google");

if (!process.env.GOOGLE_CLIENT_ID) {
  throw Error("GOOGLE_CLIENT_ID is not available in .env");
} else if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw Error("GOOGLE_CLIENT_SECRET is not available in .env");
}

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      const db = (await clientPromise).db("BusTrackerPro");
      const users = db.collection("Users");
      const userOnDB = await users.findOne({ email });

      if (!userOnDB) {
        await users.insertOne({
          name: user.email,
          email: user.email,
          role: "Member",
          image: user.image,
          visits: 1,
        });
      } else {
        await users.updateOne(
          { email: user.email },
          {
            $set: {
              name: user.name,
              image: user.image,
            },
            $inc: {
              visits: 1,
            },
          }
        );
      }

      return true;
    },

    async jwt({ token }) {
      const user = await (await clientPromise)
        .db("leetcodeleaderboard")
        .collection("Users")
        .findOne({
          email: token.email,
        });

      token.role = user.role;
      token.username = user.username;
      token.id = user._id;
      token.name = user.name;
      token.image = user.image;
      return token;
    },
  },
});

module.exports = authOptions;