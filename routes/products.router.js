import express from "express";
const router = express.Router();
import Prod from "../schemas/products.schema.js";

// 상품 등록
router.post("/products", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const { title, content, author, password } = req.body;
    if (!title || !content || !author || !password) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const createProd = await Prod.create({
      title,
      content,
      author,
      password,
    });
    await createProd.save();
    return res.status(201).json({ message: "판매 상품을 등록하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "예기치 못한 에러가 발생하였습니다." });
  }
});

// 상품 목록 조회
router.get("/products", async (req, res) => {
  const products = await Prod.find().sort("-createdAt").exec();

  return res.status(200).json({ products });
});

// 상품 상세 조회
router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const selectProd = await Prod.findById(productId).exec();
  if (!selectProd) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }
  return res.status(200).json({ selectProd });
});

// 상품 정보 수정
router.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { title, content, status, password } = req.body;
  if (!title || !content || !status || !password) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  const prod = await Prod.findById(productId).exec();
  if (!prod) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  if (password) {
    const prodPw = prod["password"];
    if (prodPw !== password) {
      return res
        .status(401)
        .json({ message: "상품을 삭제할 권한이 존재하지 않습니다." });
    }
    prod.title = title;
    prod.content = content;
    prod.status = status;
  }
  await prod.save();
  return res.status(200).json({ message: "상품 정보를 수정하였습니다." });
});

// 상품 삭제
router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { password } = req.body;
  if (!password) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  const prod = await Prod.findById(productId).exec();
  if (!prod) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  if (password) {
    const prodPw = prod["password"];
    if (prodPw !== password) {
      return res
        .status(401)
        .json({ message: "상품을 삭제할 권한이 존재하지 않습니다." });
    }
  }
  await Prod.deleteOne({ _id: productId }).exec();
  return res.status(200).json({ message: "상품을 삭제하였습니다." });
});

export default router;
