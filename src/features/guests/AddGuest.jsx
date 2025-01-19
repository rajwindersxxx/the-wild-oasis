import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateGuestForm from './CreateGuestForm';

function AddGuest() {
  return (
    <Modal>
      <Modal.Open opens={'createGuest'}>
        <div>
          <Button>Create a Guest</Button>
        </div>
      </Modal.Open>
      <Modal.Window name={'createGuest'}>
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuest;
