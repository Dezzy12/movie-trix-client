import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import { useState } from "react";

const Reviews = ({getMovieData, movie, reviews=[], setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovieData(movieId)
    },[])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            const response = await api.post("/reviews",{reviewBody:rev.value, imdbId:movieId});

            rev.value = "";

            const updatedReviewsResponse = await api.get(`/reviews/${movieId}`);
            const updatedReviews = updatedReviewsResponse.data;

            setReviews(updatedReviews)
        }catch (e) {
                console.log(e)
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/reviews/${movieId}`);
                const reviews = response.data;
                setReviews(reviews);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };

        fetchReviews();
    },[movieId])

  return (
     <Container>
        <Row>
            <Col>
                <h3>Reviews</h3>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt=""/>
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} label = "Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    loading ? (
                        <p>Loading reviews...</p>
                      ) : Array.isArray(reviews) && reviews.length > 0 ? (
                        reviews.map((review) => (
                          <Row key={review.id}>
                            <Col>{review.body}</Col>
                          </Row>
                        ))
                      ) : (
                        <p>No reviews available.</p>
                      )
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
     </Container>
  )
}

export default Reviews