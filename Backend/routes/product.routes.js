import express from 'express';

const router = express.Router();
router.get("/", async(req, res) => {
try {
  const products = await Product.find({});
  res.status(200).json({success:true, data: products });
} catch (error) {
  console.log("error in fetching product:", error.message);
  res.status(500).json({success: false, message: "Server Error"});  
}
});

router.post("/",async (req,res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all required fields" });
    }

    const newProduct = new Product(product);
    
    try{
      await newProduct.save();
      return res.status(201).json({success: true, data: newProduct});   
    }
      catch (error) {
        console.error("error in Create product",error.message);
        return res.status(500).json({success: false, message: "Server Error"});
      }
    });

router.put("/:id", async (res,req ) => {
  const {id} = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, message:"Invalid Product Id"})
  }

  try {
   const updatedProduct=  await Product.findByIdAndUpdate(id,product,{new:true });
   res.status(200).json({success: true, data : updatedProduct});
  } catch (error) {
    res.status(404).json({success: false, message : "Server Error"});
  }
})
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, message: "Product Deleted "});
    } catch (error) {
      console.log("Error in deleting products:", error.mesage)
      res.status(404).json({success: false, message: "Product not found"});
    }
});

export default router;