import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const btnActive = (active) => {
    if (active) return "bt-active";
    return "";
  };
  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info">View</a>
        </Link>
        <button
          className={`btn btn-success ${btnActive(
            product.inStock === 0 ? true : false
          )}`}
          onClick={() => dispatch(addToCart(product, cart))}
          // disabled={product.inStock === 0 ? true : false}
        >
          Buy
        </button>
      </>
    );
  };
  return (
    <div className="card my-3" style={{ width: " 18rem" }}>
      <Image
        src={product.images[0].url}
        alt={product.title}
        width={100}
        height={240}
        className="card-img-top"
      />

      <div className="card-body">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="row justify-content-between mx-0">
          <h6 className="text-danger" style={{ width: "auto" }}>
            ${product.price}
          </h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger" style={{ width: "auto" }}>
              In Stock: {product.inStock}
            </h6>
          ) : (
            <h6 className="text-danger" style={{ width: "auto" }}>
              Out Stock
            </h6>
          )}
        </div>

        <p className="card-text" title={product.description}>
          {product.description}
        </p>

        <div className="row justify-content-between mx-0">
          {/* {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()} */}
          {userLink()}
        </div>
      </div>
    </div>
  );
}
