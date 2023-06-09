export interface IProd{
  id: Number,
  img1 :string,
  img2 :string,
  img3 :string,
  img4 :string,
  description: String,
  name: String,

  //main filter
  category: String, //clothing, footwear, electronics, grocery, accessories, household, stationary 

  //side filters
  price: Number,
  brand: String,
  gender: String, //Men, women
  type: String, //tshirt, shirt, watch, shoes, bag, top, jeans, stole, vegetable, fruit, cake, rice
  size: String,//XS, S, M, L, XL, XXL

  star: Number,
  ratings: String,
  discountedprice: Number,
  seller: String
}