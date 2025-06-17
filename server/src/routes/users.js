const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models/database');

// 注册新用户
router.post('/register', async (req, res) => {
  try {
    console.log('收到注册请求:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('缺少用户名或密码');
      return res.status(400).json({ message: '请提供用户名和密码' });
    }

    // 检查用户是否已存在
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) {
        console.error('查询用户错误:', err);
        return res.status(500).json({ message: '服务器错误' });
      }

      if (user) {
        console.log('用户名已存在:', username);
        return res.status(400).json({ message: '用户名已存在' });
      }

      // 加密密码
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 创建新用户
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function(err) {
          if (err) {
            console.error('创建用户错误:', err);
            return res.status(500).json({ message: '服务器错误' });
          }
          console.log('用户注册成功:', username);
          res.status(201).json({ message: '注册成功' });
        }
      );
    });
  } catch (err) {
    console.error('注册错误:', err);
    res.status(500).json({ message: '服务器错误', error: err.message });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    console.log('收到登录请求:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('缺少用户名或密码');
      return res.status(400).json({ message: '请提供用户名和密码' });
    }

    // 查询用户
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) {
        console.error('查询用户错误:', err);
        return res.status(500).json({ message: '服务器错误' });
      }

      if (!user) {
        console.log('用户不存在:', username);
        return res.status(400).json({ message: '用户不存在' });
      }

      // 验证密码
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('密码错误:', username);
        return res.status(400).json({ message: '密码错误' });
      }

      console.log('登录成功:', username);
      res.json({ message: '登录成功', userId: user.id });
    });
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ message: '服务器错误', error: err.message });
  }
});

module.exports = router; 