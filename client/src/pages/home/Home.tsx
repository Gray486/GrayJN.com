import { motion } from "motion/react";
import { Button } from "react-bootstrap";
import { CaretDownFill } from "react-bootstrap-icons";

function Home() {
    return (
        <div style={{ textAlign: "center" }}>
            {/* Title */}

            <motion.h1
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                style={{ fontSize: "60px" }}
            >
                Welcome to GrayJN.com!
            </motion.h1>

            {/* About Me */}

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 1.5,
                    duration: 1.5
                }}
                style={{
                    padding: "0px 50px 0px 50px",
                    fontSize: "30px"
                }}
            >
                I'm Gray, a high school sophmore in Atlanta, GA. I have experience developing <u>full stack </u>
                applications in React with Node as well as general knowledge in Typescript, Javascript, JQuery, HTML
                & CSS, Java, and Python. I'm currently the chief technical officer at&nbsp;
                <a href="https://github.com/midtownrobotics" target="_blank">FRC robotics team 1648</a>, and former programming lead of two years.
            </motion.p>

            {/* Down button */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 1.5,
                    duration: 1.5
                }}
                style={{
                    position: "absolute",
                    top: "calc(100vh - 60px)",
                    left: "calc(50vw - 20px)"
                }}
            >
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Button
                        variant="link"
                        onClick={
                            () => window.scrollBy({
                                top: window.innerHeight,
                                behavior: "smooth"
                            })
                        }
                        style={{ color: "black" }}
                    >
                        <CaretDownFill
                            fontSize="40px"
                        />
                    </Button>
                </motion.div>
            </motion.div>


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div >
    )
}

export default Home;