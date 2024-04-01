import {Form, Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit, revText, label, defValue}) => {
  return (
    <Form>
        <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
          <Form.Label>{label}</Form.Label>
          <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defValue} />
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>
          Submit
        </Button>
    </Form>
  )
}

export default ReviewForm