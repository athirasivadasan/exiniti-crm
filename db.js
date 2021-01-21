const mongoose = require('mongoose')

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
        }@cluster0.km1ey.mongodb.net/${process.env.MONGO_DB
        }?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true}
    )
    .then(() => {
        console.log('Mongodb connection succeeded.')
    })
    .catch(err => {
        console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    });



