import Link from "next/link";
import Image from "next/image";
export default function OrderDetail({ orderDetail }) {
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      {orderDetail.map((order) => (
        <div key={order._id} className="text-uppercase my-3">
          <h2 className="text-break">Order {order._id}</h2>
          <div className="mt-4 text-secondary">
            <h3>Shipping</h3>
            <p>Name: {order.user.name}</p>
            <p>Email: {order.user.email}</p>
            <p>Address: {order.address}</p>
            <p>Mobile: {order.mobile}</p>
            <div
              className={`alert ${
                order.delivered ? "alert-success" : "alert-danger"
              }
                        d-flex justify-content-between align-items-center`}
              role="alert"
            >
              {order.delivered
                ? `Deliverd on ${order.updatedAt}`
                : "Not Delivered"}
            </div>
          </div>
          <div>
            <h3>Order Items</h3>
            {order.cart.map((item) => (
              <div
                className="row border-bottom mx-0 p-2 justify-content-betwenn
                                    align-items-center"
                key={item._id}
                style={{ maxWidth: "550px" }}
              >
                <Link href={`/product/${item._id}`}>
                  <a className="w-auto order_detail-image">
                    <Image
                      src={item.images[0].url}
                      alt={item.title}
                      width="66"
                      height="60"
                      style={{
                        objectFit: "cover",
                      }}
                      className="w-auto"
                    />
                  </a>
                </Link>

                <h5 className="flex-fill text-secondary px-3 m-0 w-auto">
                  <Link href={`/product/${item._id}`}>
                    <a>{item.title}</a>
                  </Link>
                </h5>
                {item.quantity > 1 ? (
                  <table
                    className="table-bordered table-hover w-auto text-uppercase"
                    style={{ minWidth: "220px" }}
                  >
                    <thead className="bg-light font-weight-bold">
                      <tr>
                        <td className="p-2">Quantity</td>
                        <td className="p-2">Price</td>
                        <td className="p-2">Total</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">${item.price}</td>
                        <td className="p-2">${item.price * item.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  `$${item.price}`
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
