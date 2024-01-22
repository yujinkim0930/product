import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import Prod from '../schemas/products.schema.js';

// 상품 등록
router.post('/products', async (req, res) => {
  const { title, content, author, password, status, createdAt } = req.body;

  const createProd = await Prod.create({
    title,
    content,
    author,
    password,
    status: 'FOR_SALE',
    createdAt: new Date(),
  });
  await createProd.save();
  return res.status(201).json({ message: '판매 상품을 등록하였습니다.' });
});

router.get('/products', async (req, res) => {
  const products = await Prod.find('-createdAt').exec();
  return res.status(200).json({ products });
});

export default router;
