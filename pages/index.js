import { getData } from "../utils/fetchData";
import { useState, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Head from "next/head";
import ProductItem from "../components/Product/ProductItem";
export default function Home(props) {
  const [products, setProducts] = useState(props.products);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [isCheck, setIsCheck] = useState(false);
  const handleCheck = (id) => {
    products.forEach((p) => {
      if (p._id === id) p.checked = !p.checked;
    });
    setProducts([...products]);
  };
  const handleCheckAll = () => {
    products.forEach((p) => (p.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };
  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((p) => {
      if (p.checked) {
        deleteArr.push({
          data: "",
          id: p._id,
          title: "Delete all selected products?",
          type: "DELETE_PRODUCT",
        });
      }
      dispatch({ type: "ADD_MODAL", payload: deleteArr });
    });
  };

  return (
    <div className="home_page">
      <Head>
        <title>Home Page</title>
      </Head>
      {auth.user &&
        auth.user.role === "admin" &&
        (products.length !== 0 ? (
          <div
            className="delete_all btn btn-danger mt-2"
            style={{ marginBottom: "-10px" }}
          >
            <input
              type="checkbox"
              style={{
                width: "25px",
                height: "25px",
                transform: "translateY(8px)",
              }}
              onChange={handleCheckAll}
            />

            <button
              className="btn btn-danger ml-2"
              aria-hidden="true"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleDeleteAll}
            >
              DELETE ALL
            </button>
          </div>
        ) : (
          ""
        ))}
      <div className="products">
        {products.length === 0
          ? <h2>No products</h2>
          : products.map((p) => (
              <ProductItem key={p._id} product={p} handleCheck={handleCheck} />
            ))}
      </div>
    </div>
  );
}
export async function getStaticProps(context) {
  const res = await getData("product");
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}
