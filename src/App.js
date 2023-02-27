import { useState } from "react";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";

function App() {
    const [nowServing, setNowServing] = useState(1);
    const [waiting, setWaiting] = useState(2);
    const [showButtons, setShowButtons] = useState(true);
    const [lastCalled1, setLastCalled1] = useState(3);
    const [lastCalled2, setLastCalled2] = useState(4);
    const [lastCalled3, setLastCalled3] = useState(5);
    const [lastCalled4, setLastCalled4] = useState(6);
    const [lastCalled5, setLastCalled5] = useState(0);
    const [lastCalled6, setLastCalled6] = useState(0);
    const [lastCalled7, setLastCalled7] = useState(0);

    const styles = showButtons
        ? { width: "40vw", height: "85vh" }
        : { width: "40vw", height: "90vh" };

    const styles2 = showButtons
        ? { width: "27vw", height: "25vh", marginBottom: "10px" }
        : { width: "27vw", height: "30vh", marginBottom: "10px" };
    const handleFinish = () => {
        if (nowServing === waiting) {
            setWaiting(waiting + 1);
        }
        setNowServing(waiting);
        setLastCalled5(nowServing);
        setLastCalled6(lastCalled5);
        setLastCalled7(lastCalled6);
    };

    const handleCancel = () => {
        setNowServing(waiting);
        setLastCalled5(nowServing);
        setLastCalled6(lastCalled5);
    };

    const handleNext = () => {
        let timerInterval;
        Swal.fire({
            title: "<span style='font-size: 170px;'>NEXT</span>",
            html: `<span style='font-size: 150px; color: #f58d42;'>#00${
                waiting + 1
            }</span>`,
            timer: 4000,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

        setWaiting(waiting + 1);
        setLastCalled1(lastCalled1 + 1);
        setLastCalled2(lastCalled2 + 1);
        setLastCalled3(lastCalled3 + 1);
        setLastCalled4(lastCalled4 + 1);
    };

    const handleCallAgain = () => {
        let timerInterval;
        Swal.fire({
            title: "<span style='font-size: 170px;'>LAST CALL</span>",
            html: `<span style='font-size: 150px; color: #f58d42;'>#00${waiting}</span>`,
            timer: 10000,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    };

    return (
        <>
            <Container>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 className='text-center mt-3'>LIPA CITY DISCTRICT HOSPITAL</h1>
                    {showButtons ? (
                        <Button
                            variant='danger'
                            onClick={() => setShowButtons(false)}
                            style={{ width: "130px", height: "50px", marginTop: "20px" }}
                        >
                            Hide Buttons
                        </Button>
                    ) : (
                        <Button
                            variant='success'
                            onClick={() => setShowButtons(true)}
                            style={{ width: "130px", height: "50px", marginTop: "20px" }}
                        >
                            Show Buttons
                        </Button>
                    )}
                </div>

                <Row className='mt-2'>
                    <Col>
                        <Card className='bg-secondary' style={{ ...styles }}>
                            <Card.Body
                                style={{ marginTop: "14rem" }}
                                className='text-center'
                            >
                                <Card.Title
                                    className='text-light'
                                    style={{ fontSize: "5rem" }}
                                >
                                    Now serving
                                </Card.Title>

                                <Card.Text
                                    style={{ color: "#f58d42", fontSize: "10rem" }}
                                >
                                    {"00" + nowServing}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Card
                                className='bg-secondary'
                                style={{
                                    width: "27vw",
                                    height: "25vh",
                                    marginBottom: "10px",
                                }}
                            >
                                <Card.Body
                                    style={{ marginTop: "1rem" }}
                                    className='text-center'
                                >
                                    <Card.Title
                                        className='text-light'
                                        style={{ fontSize: "3.5rem" }}
                                    >
                                        Next
                                    </Card.Title>
                                    <Card.Text
                                        style={{ color: "#f58d42", fontSize: "5rem" }}
                                    >
                                        {"00" + waiting}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card
                                className='bg-secondary'
                                style={{
                                    ...styles2,
                                }}
                            >
                                <Card.Body
                                    style={{ marginTop: "1rem" }}
                                    className='text-center'
                                >
                                    <Card.Title
                                        className='text-light'
                                        style={{ fontSize: "3.5rem" }}
                                    >
                                        Last called
                                    </Card.Title>
                                    <Card.Text
                                        style={{ color: "#f58d42", fontSize: "2rem" }}
                                    >
                                        {"00" + lastCalled5}
                                        <br />
                                        {"00" + lastCalled6}
                                        <br />
                                        {!showButtons ? `00${lastCalled7}` : ""}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card
                                className='bg-secondary'
                                style={{ width: "27vw", height: "33vh" }}
                            >
                                <Card.Body
                                    style={{ marginTop: "1rem" }}
                                    className='text-center'
                                >
                                    <Card.Title
                                        className='text-light'
                                        style={{ fontSize: "3.5rem" }}
                                    >
                                        Waiting
                                    </Card.Title>
                                    <Card.Text
                                        style={{ color: "#f58d42", fontSize: "2rem" }}
                                    >
                                        {"00" + lastCalled1} <br />
                                        {"00" + lastCalled2}
                                        <br />
                                        {"00" + lastCalled3}
                                        <br />
                                        {"00" + lastCalled4}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
                {showButtons ? (
                    <div
                        className='mt-3'
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Button
                            disabled={nowServing === waiting ? true : false}
                            variant='success'
                            size='lg'
                            style={{ flex: 1.57, marginRight: "10px" }}
                            onClick={handleFinish}
                        >
                            Finish
                        </Button>
                        <Button
                            disabled={nowServing === waiting ? true : false}
                            variant='secondary'
                            size='lg'
                            style={{ flex: 1.57, marginRight: "10px" }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='primary'
                            size='lg'
                            style={{ flex: 1, marginRight: "10px" }}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                        <Button
                            variant='warning'
                            size='lg'
                            style={{ flex: 1 }}
                            onClick={handleCallAgain}
                        >
                            Call Again
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
}

export default App;
