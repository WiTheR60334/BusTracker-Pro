import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/User";
import connectDB from "../../../../util/DB";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
      scope: 'openid email profile',
      profile(profile) {
        let role = 'student'; 

        if (profile.email === 'romir.b@ahduni.edu.in') {
          role = 'admin';
        }
        console.log(role);

        return {
              id: profile.sub,
              name: profile.name,
              firstname: profile.given_name,
              lastname: profile.family_name,
              email: profile.email,
              image: profile.picture,
              role: role,
         };
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email,password, role } = user;
        try {
          await connectDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("https://bus-tracker-pro.vercel.app/api/Student", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                role
              }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };