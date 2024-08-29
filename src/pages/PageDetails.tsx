import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFecthData from "../hooks/useFecthData";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDataContext } from "../contexts/UseDataContext";

const PageDetails = () => {
  let { productID } = useParams();
  const navigate = useNavigate();
  const { singleDataProduct, getSingleProducts, addSingleProductToCart } =
    useFecthData();
  const { userToken } = useDataContext();
  useEffect(() => {
    getSingleProducts(productID);
  }, [productID]);
  console.log(singleDataProduct);
  if (!singleDataProduct) {
    return <div>Loading...</div>;
  }
  const addToCart = (id?: string | number) => {
    const accessTokenLocal: any = localStorage.getItem("access_token");
    if (accessTokenLocal !== userToken) {
      alert(`You must login first to add product to cart`);
      console.log(userToken);
      navigate("/login");
    } else {
      addSingleProductToCart(id);
    }
  };

  const renderSingleProduct = Array.isArray(singleDataProduct) ? (
    singleDataProduct.map((product, index) => (
      <Box
        component="section"
        key={index}
        sx={{
          p: 4,
          display: "flex",
          border: 1,
          borderColor: "grey.500",
          m: "2rem",
          maxWidth: "md",
          mx: "auto",
        }}
      >
        <Card
          sx={{ maxWidth: 345, maxHeight: 250, p: 1, alignContent: "center" }}
        >
          <CardMedia
            component="img"
            height="auto"
            image={product.images[0]}
            alt="Product image"
          />
        </Card>
        <div>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              fontSize: 40,
              ml: "1.5rem",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 20, m: "1.5rem" }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: 20,
              m: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {`Price: $${product.price},00`}
          </Typography>
          <Button
            sx={{ p: 1, m: "1rem" }}
            onClick={() => {
              addToCart(product.id);
            }}
            variant="contained"
          >
            Add To Cart
          </Button>
        </div>
      </Box>
    ))
  ) : (
    <Box
      component="section"
      sx={{
        p: 4,
        display: "flex",
        border: 1,
        borderColor: "grey.500",
        m: "2rem",
        maxWidth: "md",
        mx: "auto",
      }}
    >
      <Card
        sx={{ maxWidth: 345, maxHeight: 250, p: 1, alignContent: "center" }}
      >
        <CardMedia
          component="img"
          height="auto"
          image={singleDataProduct.images[0]}
          alt="Product image"
        />
      </Card>
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontSize: 40,
            ml: "1.5rem",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {singleDataProduct.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: 20, m: "1.5rem" }}
        >
          {singleDataProduct.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: 20,
            m: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {`Price: $${singleDataProduct.price},00`}
        </Typography>
        <Button
          sx={{ p: 1, m: "1rem" }}
          onClick={() => {
            if (singleDataProduct && singleDataProduct.id) {
              addToCart(singleDataProduct.id);
            } else {
              console.error("Product ID is not available");
            }
          }}
          variant="contained"
        >
          Add To Cart
        </Button>
      </div>
    </Box>
  );

  return (
    <div>
      <Navbar />
      {renderSingleProduct}
    </div>
  );
};

export default PageDetails;
