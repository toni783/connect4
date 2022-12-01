import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format } from "date-fns";
import { setSelectedBoard } from "../features/board/BoardSlice";
import { useAppDispatch } from "../hooks";

// TODO: add type for bootstrap props
const CustomModal = ({ games, ...props }) => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="load-existing-games-modal-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="load-existing-games-modal-title">
          Please select your save
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "200px", overflowY: "auto" }}>
        <ListGroup variant="flush">
          {games.map((val) => (
            <ListGroup.Item
              action
              onClick={() => {
                dispatch(
                  setSelectedBoard({
                    gameBoard: val,
                  })
                );
                props.onHide();
              }}
            >
              <Container>
                <Row>
                  <Col>Bord Id: {val.id}</Col>
                  <Col>{`Game played on: ${format(
                    new Date(
                      val.updatedTime ? val.updatedTime : val.createdTime
                    ),
                    "MM/dd/yyyy HH:mm"
                  )}`}</Col>
                </Row>
              </Container>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
