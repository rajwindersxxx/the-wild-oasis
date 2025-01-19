import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateBookingForm from './CreateBookingForm';

function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens={'createBooking'}>
        <div>
          <Button>Create a Booking</Button>
        </div>
      </Modal.Open>
      <Modal.Window name={'createBooking'}>
        <CreateBookingForm/>
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
