const fs = require('fs');
const path = require('path');

const migrationsPath = path.resolve(__dirname, 'src', 'migrations');

fs.readdirSync(migrationsPath).forEach(file => {
    if (file.endsWith('.js')) {
        require(path.join(migrationsPath, file));
    }
});
