/* eslint-disable no-console */
import App from './App';

const { app } = new App();

app.listen(3300, () => console.log('Server running on port 3300'));
