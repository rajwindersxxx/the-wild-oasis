import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Row from '../../ui/Row';
import CreateBookingForm from './CreateBookingForm';

function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens={'createBooking'}>
        <Row $type='flex-end'>
          <Button>Create a Booking</Button>
        </Row>
      </Modal.Open>
      <Modal.Window name={'createBooking'}>
        <CreateBookingForm/>
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
