import { getData } from "../utils/fetchData";
import { useState } from "react";
import Head from "next/head";
import ProductItem from "../components/Product/ProductItem";
export default function Home(props) {
  const [products, setProducts] = useState(props.products);
  console.log(products);
  return (
    <div className="products">
      <Head>
        <title>Home Page</title>
      </Head>
      {products.length === 0 ? (
        <h2>No products</h2>
      ) : (
        products.map((p) => <ProductItem key={p._id} product={p} />)
      )}
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
