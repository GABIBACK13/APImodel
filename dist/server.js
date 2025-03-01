"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
const port = 3001;
_app2.default.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Ctrl + click : http://localhost/${port}`);
});
