const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('./models/database'); // 初始化数据库

dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 