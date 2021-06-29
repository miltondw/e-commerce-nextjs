import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { deleteItem } from "../../store/Actions";
import { deleteData } from "../../utils/fetchData";
export default function Modal() {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;
  const handleSubmit = () => {
    if (modal.type === "ADD_USERS") {
      deleteData(`user/${modal.id}`, auth.token).then((res) =>
        console.log(res)
      );
    }
    dispatch(deleteItem(modal.data, modal.id, modal.type));
    dispatch({ type: "ADD_MODAL", payload: {} });
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {Array.isArray(modal)
                ? modal.length !== 0 && modal[0].title
                : modal.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Do you want to delete this item?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Closed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
