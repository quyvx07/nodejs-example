const app = require("./src/app");
const config = require("./src/configs/config");
const PORT = config.app.PORT;

const server = app.listen(PORT, () => {
    console.log(`start with port ${PORT}`);
})

process.on('SIGILL', () => {
    server.close(() => console.log(`exit server`));
})
