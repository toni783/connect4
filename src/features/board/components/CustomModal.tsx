import { format } from "date-fns";
import {
  ModalProps,
  Modal,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useAppDispatch } from "../../../hooks";
import { setSelectedBoard } from "../BoardSlice";
import { BoardState } from "../BoardTypes";
import styles from "../../../styles/Home.module.css";

type CustomModalProps = {
  games: BoardState[];
} & ModalProps;

const CustomModal = ({ games, ...props }: CustomModalProps) => {
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
      <Modal.Body className={styles["modal-body"]}>
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
