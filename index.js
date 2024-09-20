const {
    cors,
    express
} = require('./utils/package');
const config = require('./config');
const responseMessages = require('./utils/responseMessages');
const responseHandler = require('./middlewares/responseHandler');
const logger = require('./middlewares/logger');

const app = express();

app.use(cors({ origin: '*', methods: 'GET,PUT,POST,DELETE', credentials: true, optionsSuccessStatus: 204 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger.requestLog());
app.use(responseHandler());
require('./routes')(app);

app.get('/', (req, res, next) => {
    return res.notFound({ message: responseMessages[4001] });
});

app.listen(config.appPort, () => {
    require('./config/db');
    console.log(responseMessages[4002](config.appPort));
});
