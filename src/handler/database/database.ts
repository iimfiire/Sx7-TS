import { connect } from 'mongoose';
import colors from 'colors';

export default function(mongoURI: string) {
   connect(mongoURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err)
      throw err;
    else
      console.log('[INIT]'.green + ' Connected to database.')
  })
}
