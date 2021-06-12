import Image from "next/image";
import Link from "next/link";
export default function ProductItem({ product }) {
  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info">View</a>
        </Link>
        <button className="btn btn-success">Buy</button>
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
