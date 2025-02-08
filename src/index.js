import express from 'express';
import connectDB from './db/mongoose.js';
import { PORT } from './config/config.js';
import routes from './routes/index.js';
import { validateCORS } from './middlewares/middleware.js';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github2';

const app = express();

// Global middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(validateCORS);

// Session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', routes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error while running the server:', error);
    process.exit(1);
  }
};

startServer();
