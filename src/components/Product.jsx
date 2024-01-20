import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/cartSlice";
import { getProducts } from "../features/productSlice";
import StatusCodes from "./utils/StatusCodes";

const Product = () => {
  const { data: products, status } = useSelector((state) => state.products);
  //   const [products, setProducts] = useState([]); //this need for synchronous operation
  const dispatch = useDispatch();
  useEffect(() => {
    // synchronous operation
    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => setProducts(result));

    //asynchronous operation
    dispatch(getProducts());
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  if (status === StatusCodes.LOADING) {
    return <p className="text-center">Loading...</p>;
  }
  if (status === StatusCodes.ERROR) {
    return (
      <Alert className="text-center" key="danger" variant="danger">
        Something went wrong! Try Again Later
      </Alert>
    );
  }

  const cards = products.map((product) => {
    return (
      <div className="col-md-3 text-center" style={{ marginBottom: "10px" }}>
        <Card key={product.id} className="h-100">
          <div className="text-center">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: "100px", height: "130px" }}
            />
          </div>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text> PKR: {product.price}</Card.Text>
          </Card.Body>
          <Card.Footer style={{ background: "white" }}>
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add To Cart
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <>
      <h1 className="text-center">Products Dashboard</h1>
      {/* {console.log(cards)} */}
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;
