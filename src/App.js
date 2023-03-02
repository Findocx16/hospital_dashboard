import { useState, useEffect } from "react";
import { Button, Card, Col, Row, Container, Table } from "react-bootstrap";
import Swal from "sweetalert2";

function App() {
    const [nowServing, setNowServing] = useState(0);
    const [waiting, setWaiting] = useState(1);
    const [showButtons, setShowButtons] = useState(true);
    const [showLists, setShowLists] = useState(false);
    const [waitingListOne, setWatingListOne] = useState(2);
    const [waitingListTwo, setWatingListTwo] = useState(3);
    const [waitingListThree, setWatingListThree] = useState(4);

    const [lastCalledArray, setLastCalledArray] = useState([
        {
            patientNumber: 1,
            patientIn: null,
            patientOut: null,
        },
    ]);
    const [numRows, setNumRows] = useState(0);

    useEffect(() => {
        setNumRows(lastCalledArray.length);
    }, [lastCalledArray]);

    function setTimeStorage1() {
        const now = new Date();
        const options = {
            timeZone: "Asia/Manila",
            hour12: true,
            hour: "numeric",
            hourCycle: "h12",
            minute: "numeric",
        };
        const time1 = now.toLocaleString("en-US", options);
        localStorage.setItem("time1", time1);
    }

    const styles = showButtons
        ? { width: "50vw", height: "80vh" }
        : { width: "50vw", height: "88vh" };

    const styles2 = showButtons
        ? { width: "33.5vw", height: "33.5vh", marginBottom: "10px" }
        : { width: "33.5vw", height: "41.5vh", marginBottom: "10px" };

    const handleFinish = () => {
        setTimeStorage1();
        setWatingListOne(waitingListOne + 1);
        setWatingListTwo(waitingListTwo + 1);
        setWatingListThree(waitingListThree + 1);
        // update patientOut field of the current patient
        const currentPatient = lastCalledArray[nowServing - 1];
        const updatedPatient = {
            ...currentPatient,
            patientOut: localStorage.getItem("time1"),
        };
        setLastCalledArray((prevArray) =>
            prevArray.map((patient, index) =>
                index === nowServing - 1 ? updatedPatient : patient
            )
        );

        // update patientIn field of the next patient
        const nextPatient = lastCalledArray.find(
            (patient) => patient.patientNumber === waiting
        );
        if (nextPatient) {
            const updatedNextPatient = {
                ...nextPatient,
                patientIn: localStorage.getItem("time1"),
            };
            setLastCalledArray((prevArray) =>
                prevArray.map((patient) =>
                    patient.patientNumber === nextPatient.patientNumber
                        ? updatedNextPatient
                        : patient
                )
            );
        }

        // Add new patient data to the array
        setLastCalledArray((prevArray) => [
            ...prevArray,
            { patientNumber: waiting + 1, patientIn: null, patientOut: null },
        ]);

        setWaiting(waiting + 1);
        setNowServing(waiting);
    };

    const handleNext = () => {
        setTimeStorage1();
        setWatingListOne(waitingListOne + 1);
        setWatingListTwo(waitingListTwo + 1);
        setWatingListThree(waitingListThree + 1);
        let timerInterval;
        const nextPatientNumber = waiting + 1;

        const message = `Next patient number ${nextPatientNumber}`;
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = "en-US";

        speechSynthesis.speak(speech);

        if (nextPatientNumber - nowServing !== 1) {
            setLastCalledArray((prevArray) => [
                ...prevArray,
                { patientNumber: nextPatientNumber, patientIn: null, patientOut: null },
            ]);
        }

        Swal.fire({
            title: "<span style='font-size: 170px;'>NEXT</span>",
            html: `<span style='font-size: 150px; color: #f58d42;'>#00${nextPatientNumber}</span>`,
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
        });

        setWaiting(nextPatientNumber);
    };

    // const handleCancel = () => {
    //     setNowServing(waiting);
    // };
    const handlePrev = () => {
        setWaiting(waiting - 1);
    };

    const handleCallAgain = () => {
        setTimeStorage1();

        const message = `Last call for patient number ${waiting}`;
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = "en-US";

        speechSynthesis.speak(speech);

        let timerInterval;
        Swal.fire({
            title: "<span style='font-size: 160px;'>LAST CALL</span>",
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
            <Container className='pb-3'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 className='text-center mt-3'>
                        <strong>LIPA CITY DISTRICT HOSPITAL</strong>
                    </h1>
                    <div>
                        {!showLists ? (
                            <Button
                                variant='success'
                                onClick={() => setShowLists(true)}
                                style={{
                                    width: "130px",
                                    height: "50px",
                                    marginTop: "20px",
                                    marginRight: "10px",
                                }}
                            >
                                Show List
                            </Button>
                        ) : (
                            <Button
                                variant='warning'
                                onClick={() => setShowLists(false)}
                                style={{
                                    width: "130px",
                                    height: "50px",
                                    marginTop: "20px",
                                    marginRight: "10px",
                                }}
                            >
                                Hide List
                            </Button>
                        )}

                        {showButtons ? (
                            <Button
                                variant='danger'
                                onClick={() => setShowButtons(false)}
                                style={{
                                    width: "130px",
                                    height: "50px",
                                    marginTop: "20px",
                                    marginRight: "10px",
                                }}
                            >
                                Hide Buttons
                            </Button>
                        ) : (
                            <Button
                                variant='success'
                                onClick={() => setShowButtons(true)}
                                style={{
                                    width: "130px",
                                    height: "50px",
                                    marginTop: "20px",
                                    marginRight: "10px",
                                }}
                            >
                                Show Buttons
                            </Button>
                        )}
                    </div>
                </div>

                <Row className='mt-2'>
                    <Col>
                        <Card className='bg-dark' style={{ ...styles }}>
                            <Card.Body
                                style={{ marginTop: "3rem" }}
                                className='text-center'
                            >
                                <Card.Title
                                    className='text-light'
                                    style={{ fontSize: "5rem" }}
                                >
                                    NOW SERVING
                                </Card.Title>

                                <Card.Text
                                    style={{ color: "#f58d42", fontSize: "20rem" }}
                                >
                                    <strong>
                                        {nowServing === 1 ||
                                        nowServing === 2 ||
                                        nowServing === 3 ||
                                        nowServing === 4 ||
                                        nowServing === 5 ||
                                        nowServing === 6 ||
                                        nowServing === 7 ||
                                        nowServing === 8 ||
                                        nowServing === 9
                                            ? `0${nowServing}`
                                            : `${nowServing}`}
                                    </strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Card
                                className='bg-dark'
                                style={{
                                    width: "33.5vw",
                                    height: "45vh",
                                    marginBottom: "10px",
                                }}
                            >
                                <Card.Body
                                    style={{ marginTop: "1rem" }}
                                    className='text-center'
                                >
                                    <Card.Title
                                        className='text-light'
                                        style={{ fontSize: "5rem" }}
                                    >
                                        NEXT
                                    </Card.Title>
                                    <Card.Text
                                        style={{ color: "#f58d42", fontSize: "7rem" }}
                                    >
                                        <strong>
                                            {waiting === 1 ||
                                            waiting === 2 ||
                                            waiting === 3 ||
                                            waiting === 4 ||
                                            waiting === 5 ||
                                            waiting === 6 ||
                                            waiting === 7 ||
                                            waiting === 8 ||
                                            waiting === 9
                                                ? `0${waiting}`
                                                : `${waiting}`}
                                        </strong>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {!showLists ? (
                                <Card className='bg-dark mb-2' style={{ ...styles2 }}>
                                    <Card.Body className='text-center'>
                                        <Card.Title
                                            className='text-light'
                                            style={{ fontSize: "4.5rem" }}
                                        >
                                            WAITING
                                        </Card.Title>
                                        <Card.Text
                                            style={{ color: "#f58d42", fontSize: "2rem" }}
                                        >
                                            <strong>
                                                {waitingListOne < 10
                                                    ? `0${waitingListOne}`
                                                    : waitingListOne}
                                            </strong>

                                            <br />
                                            <strong>
                                                {waitingListTwo < 10
                                                    ? `0${waitingListTwo}`
                                                    : waitingListTwo}
                                            </strong>
                                            <br />
                                            <strong>
                                                {waitingListThree < 10
                                                    ? `0${waitingListThree}`
                                                    : waitingListThree}
                                            </strong>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <div
                                    style={
                                        numRows > 5
                                            ? {
                                                  maxHeight: "260px",
                                                  overflowY: "auto",
                                                  marginLeft: "-10px",
                                                  textAlign: "center",
                                              }
                                            : { marginLeft: "-10px", textAlign: "center" }
                                    }
                                >
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr className='bg-dark text-light'>
                                                <th>Patient Number</th>
                                                <th>Patient In</th>
                                                <th>Patient Out</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {lastCalledArray.map((patient, index) => (
                                                <tr key={index}>
                                                    <td>{patient.patientNumber}</td>
                                                    <td>
                                                        {patient.patientIn
                                                            ? patient.patientIn
                                                            : "-"}
                                                    </td>
                                                    <td>
                                                        {patient.patientOut
                                                            ? patient.patientOut
                                                            : "-"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Row>
                    </Col>
                </Row>
                {showButtons ? (
                    <div
                        className='mt-2'
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        {nowServing === 0 ? (
                            <Button
                                disabled={nowServing === waiting ? true : false}
                                variant='success'
                                size='lg'
                                style={{ flex: 2.6, marginRight: "10px" }}
                                onClick={handleFinish}
                            >
                                Start
                            </Button>
                        ) : (
                            <Button
                                disabled={nowServing === waiting ? true : false}
                                variant='success'
                                size='lg'
                                style={{ flex: 2.6, marginRight: "10px" }}
                                onClick={handleFinish}
                            >
                                Finish
                            </Button>
                        )}
                        <Button
                            disabled={nowServing === waiting ? true : false}
                            variant='secondary'
                            size='lg'
                            style={{ flex: 2.65, marginRight: "10px" }}
                            onClick={handleFinish}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={
                                waiting - 1 === nowServing || nowServing === waiting
                                    ? true
                                    : false
                            }
                            variant='danger'
                            size='lg'
                            style={{ flex: 1, marginRight: "10px" }}
                            onClick={handlePrev}
                        >
                            Previous
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
